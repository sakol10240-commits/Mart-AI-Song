'use strict';

// Pure tempo functions are also used by the offline benchmark.
const TEMPO_MIN=40, TEMPO_MAX=230, WINDOW_SECONDS=18;
const fftSize=1024, fftHalf=fftSize/2;
const hann=Float32Array.from({length:fftSize},(_,i)=>(.5-.5*Math.cos(2*Math.PI*i/(fftSize-1)))/fftSize);
const bits=Uint16Array.from({length:fftSize},(_,i)=>{
  let reversed=0;for(let bit=1;bit<fftSize;bit*=2){reversed=reversed*2+(i&1);i>>=1;}
  return reversed;
});
const fftRe=Float64Array.from({length:fftHalf},(_,i)=>Math.cos(-2*Math.PI*i/fftSize));
const fftIm=Float64Array.from({length:fftHalf},(_,i)=>Math.sin(-2*Math.PI*i/fftSize));

function fft(real,imag){
  for(let length=2;length<=fftSize;length*=2){
    const half=length/2, stride=fftSize/length;
    for(let start=0;start<fftSize;start+=length){
      for(let inner=0;inner<half;inner++){
        const ai=start+inner, bi=ai+half, ci=inner*stride;
        const x=fftRe[ci]*real[bi]-fftIm[ci]*imag[bi];
        const y=fftIm[ci]*real[bi]+fftRe[ci]*imag[bi];
        real[bi]=real[ai]-x;imag[bi]=imag[ai]-y;real[ai]+=x;imag[ai]+=y;
      }
    }
  }
}

function windowStarts(seconds){
  if(seconds<=WINDOW_SECONDS+2)return [0];
  const span=seconds-WINDOW_SECONDS;
  const fractions=seconds<32?[0,.5,1]:seconds<60?[0,1/3,2/3,1]:[0,.25,.50,.75,1];
  return fractions.map(x=>x*span);
}

function noveltyCurves(channels,rate,start,length){
  const hop=Math.round(rate/100);
  const count=Math.max(0,Math.floor((length-fftSize)/hop)+1);
  const history=new Float64Array(fftHalf), previous=new Float64Array(fftHalf);
  const real=new Float64Array(fftSize), imag=new Float64Array(fftSize);
  const curves=Array.from({length:3},()=>new Float64Array(count));
  const energies=new Float64Array(count);
  const lowEnd=Math.ceil(172*fftSize/rate), midEnd=Math.ceil(1900*fftSize/rate);
  const endBin=Math.min(fftHalf,Math.ceil(8200*fftSize/rate));
  const right=channels[1], left=channels[0];
  let stereo=1;
  if(right){
    let correlation=0;
    for(let k=start;k<start+length;k+=43)correlation+=left[k]*right[k];
    if(correlation<0)stereo=-1;
  }
  for(let t=0;t<count;t++){
    const offset=start+t*hop;
    let squareSum=0;
    for(let k=0;k<fftSize;k++){
      const sample=right?(left[offset+k]+stereo*right[offset+k])*.5:left[offset+k];
      real[bits[k]]=sample*hann[k];
      if(k%4===0)squareSum+=sample*sample;
    }
    energies[t]=squareSum/(fftSize/4);
    imag.fill(0);
    fft(real,imag);
    for(let k=2;k<endBin;k++){
      const magnitude=Math.log1p(140*Math.hypot(real[k],imag[k]));
      // Neighboring bins damp false hits from vibrato and moving fundamentals.
      const floor=Math.max(previous[k],.9*previous[k-1],.9*previous[k+1],.84*history[k]);
      if(t>2 && magnitude>floor)curves[k<lowEnd?0:k<midEnd?1:2][t]+=magnitude-floor;
      history[k]=magnitude;
    }
    previous.set(history);
  }
  let peak=0;
  for(const energy of energies)peak=Math.max(peak,energy);
  if(peak<4e-8)return null; // silence, not a tempo
  const weights=[.47,.36,.17], attackWeights=[1,.91,.63];
  const normalized=curves.map((curve,idx)=>{
    const sorted=curve.slice().sort();
    const p80=sorted[Math.floor(.80*count)]||0;
    const p95=sorted[Math.floor(.95*count)]||0;
    const p99=sorted[Math.floor(.99*count)]||0;
    const scale=Math.max(p95,p99*.52);
    const minFlux=[.026,.045,.07][idx];
    if(scale<minFlux)return null;
    const out=new Float64Array(count);
    for(let i=2;i<count-2;i++){
      if(energies[i]<peak*.0008)continue;
      const filtered=(curve[i-1]+2*curve[i]+curve[i+1])*.25;
      out[i]=Math.min(2.6,Math.max(0,(filtered-p80*.65)/scale));
    }
    return out;
  });
  if(normalized.every(x=>!x))return null;
  let weightTotal=0;
  normalized.forEach((curve,i)=>{if(curve)weightTotal+=weights[i];});
  const mix=new Float64Array(count), accents=new Float64Array(count);
  for(let i=0;i<count;i++){
    let strongest=0;
    for(let band=0;band<3;band++)if(normalized[band]){
      mix[i]+=normalized[band][i]*weights[band]/weightTotal;
      strongest=Math.max(strongest,normalized[band][i]*attackWeights[band]);
    }
    accents[i]=.56*mix[i]+.44*strongest;
  }
  return {mix, accents, low:normalized[0], mid:normalized[1], rate:rate/hop};
}

function autocorrelation(curve,maxLag){
  const n=curve.length;
  let sum=0;
  for(const x of curve)sum+=x;
  const centered=Float64Array.from(curve,x=>x-sum/n);
  const ac=new Float64Array(maxLag+1);
  for(let lag=0;lag<=maxLag;lag++){
    let dot=0,squareA=0,squareB=0;
    for(let i=lag;i<n;i++){const a=centered[i],b=centered[i-lag];dot+=a*b;squareA+=a*a;squareB+=b*b;}
    ac[lag]=dot/(Math.sqrt(squareA*squareB)||1);
  }
  return ac;
}
function peakNear(series,lag,width=1.15){
  const center=Math.round(lag);
  let value=-1;
  for(let j=Math.max(1,center-Math.ceil(width));j<=Math.min(series.length-1,center+Math.ceil(width));j++){
    value=Math.max(value,series[j]-.042*Math.max(0,Math.abs(j-lag)-.5)/width);
  }
  return value;
}

function beatGrid(curve,period){
  // Coverage distinguishes alternating subdivisions from the basic pulse.
  const phaseBins=20, phase=new Float64Array(phaseBins), steps=[];
  let total=0;
  for(let i=0;i<curve.length;i++){
    const value=curve[i];if(value<.09)continue;
    const bin=(i%period)/period*phaseBins;
    const lo=Math.floor(bin), fraction=bin-lo;
    phase[lo]+=value*(1-fraction);phase[(lo+1)%phaseBins]+=value*fraction;total+=value;
  }
  if(total<1)return {alignment:0,coverage:0,evenness:0};
  let best=0,bestBin=0;
  for(let i=0;i<phaseBins;i++){
    const amount=phase[i]+.70*(phase[(i+1)%phaseBins]+phase[(i+phaseBins-1)%phaseBins]);
    if(amount>best){best=amount;bestBin=i;}
  }
  const offset=bestBin*period/phaseBins;
  const radius=Math.max(2.6,period*.095);
  function localPeak(t){
    let high=0;
    for(let i=Math.max(0,Math.ceil(t-radius));i<=Math.min(curve.length-1,Math.floor(t+radius));i++) high=Math.max(high,curve[i]);
    return high;
  }
  let on=0, off=0;
  for(let t=offset+period;t<curve.length-period/2;t+=period){
    const value=localPeak(t);steps.push(value);
    on+=value;off+=localPeak(t+period/2);
  }
  const peakLevel=steps.slice().sort((a,b)=>a-b)[Math.floor(steps.length*.70)]||.20;
  const coverage=steps.reduce((sum,x)=>sum+Math.min(1,x/Math.max(.14,peakLevel*.87)),0)/Math.max(1,steps.length);
  return {alignment:best/total,coverage,evenness:off/Math.max(on,.01)};
}

function scoreWindow(channels,rate,startSeconds,duration){
  const start=Math.round(startSeconds*rate), length=Math.min(channels[0].length-start,Math.round(duration*rate));
  if(length<rate*3.8)return null;
  const curves=noveltyCurves(channels,rate,start,length);
  if(!curves)return null;
  const {accents,low,mid,rate:frameRate}=curves;
  const maxLag=Math.ceil(frameRate*60/TEMPO_MIN*4)+4;
  const broad=autocorrelation(accents,maxLag);
  const bass=low?autocorrelation(low,maxLag):null, mids=mid?autocorrelation(mid,maxLag):null;
  const share=.82+(bass?.length ? .13 : 0)+(mids?.length ? .05 : 0);
  const combined=broad.map((x,i)=>(x*.82+(bass?.[i]||0)*.13+(mids?.[i]||0)*.05)/share);
  const lo=Math.floor(frameRate*60/TEMPO_MAX),hi=Math.ceil(frameRate*60/TEMPO_MIN);
  const candidates=[];
  for(let j=lo;j<=hi;j++){
    const center=combined[j], left=combined[j-1], right=combined[j+1];
    if(center<.042||center<left||center<=right)continue;
    const fraction=.5*(left-right)/Math.min(-.000001,left-2*center+right);
    const period=j+Math.max(-.5,Math.min(.5,fraction));
    const bpm=60*frameRate/period;
    if(bpm<TEMPO_MIN-1||bpm>TEMPO_MAX+1)continue;
    const s2=peakNear(combined,2*period,1.4),s3=peakNear(combined,3*period,1.9),s4=peakNear(combined,4*period,2.4);
    const recurrence=.56*center+.23*Math.max(0,s2)+.12*Math.max(0,s3)+.09*Math.max(0,s4);
    if(recurrence<.083)continue;
    const grid=beatGrid(accents,period);
    const preference=Math.exp(-.5*(Math.log2(bpm/121)/.52)**2);
    const score=recurrence*(.70+.30*grid.coverage)+.065*grid.alignment+.125*preference;
    candidates.push({bpm,score,strength:recurrence,coverage:grid.coverage,alignment:grid.alignment,evenness:grid.evenness});
  }
  for(const slow of candidates){
    const fast=candidates.find(x=>sameTempo(x.bpm,slow.bpm*2));
    if(!fast||slow.evenness<.41||fast.coverage<.62||fast.strength<slow.strength*.55)continue;
    // When the off-beats contain comparable attacks and those attacks also
    // recur in their own right, they are likely part of the faster pulse.
    const counterEvidence=Math.min(1,Math.max(0,(slow.evenness-.37)/.45))*
      Math.min(1,Math.max(0,(fast.coverage-.55)/.27));
    const lowPulseDiscount=slow.bpm<80 && fast.bpm<166?.085:0;
    slow.score-=(.37*counterEvidence+lowPulseDiscount)*slow.strength;
  }
  candidates.sort((a,b)=>b.score-a.score);
  if(!candidates.length||candidates[0].strength<.105)return null;
  return {start:startSeconds,length:length/rate,candidates:candidates.slice(0,10)};
}

const relativeDistance=(a,b)=>Math.abs(Math.log2(a/b));
const sameTempo=(a,b)=>relativeDistance(a,b)<.045;
const sameOctaveFamily=(a,b)=>{
  const distance=relativeDistance(a,b);return distance<.057||Math.abs(distance-1)<.057;
};
function consolidateTempo(windows,count){
  const result={bpm:null,alternative:null,quality:'none',matched:0,segments:count,pulseSegments:windows.length,range:null};
  if(!windows.length)return result;
  const tempos=windows.flatMap(w=>w.candidates.map(c=>c.bpm));
  const tracks=tempos.map(bpm=>{
    const hits=[];
    let sum=0;
    for(const win of windows){
      const best=win.candidates[0];
      const match=win.candidates.find(c=>sameTempo(c.bpm,bpm)&&c.score>=best.score*.69);
      if(match){
        const stability=Math.max(0,1-relativeDistance(match.bpm,bpm)/.11);
        sum+=match.score*(.68+.32*match.score/best.score)*(.82+.18*stability);
        hits.push(match);
      }
    }
    const consensus=hits.reduce((s,x)=>s+x.bpm*x.score,0)/(hits.reduce((s,x)=>s+x.score,0)||1);
    return {sum,hits,bpm:consensus};
  }).sort((a,b)=>b.sum-a.sum);
  const best=tracks[0];
  if(!best?.hits.length)return result;
  const nonHarmonics=tracks.filter(t=>t.hits.length&&!sameOctaveFamily(t.bpm,best.bpm)&&relativeDistance(t.bpm,best.bpm)>.077);
  const nonHarmonic=nonHarmonics[0];
  const bestStrength=best.hits.reduce((s,x)=>s+x.strength,0)/best.hits.length;
  const match=best.hits.length/windows.length;
  const harmonics=tracks.filter(t=>t.hits.length&&Math.abs(relativeDistance(t.bpm,best.bpm)-1)<.06&&t.sum>=.64*best.sum);
  const harmonic=harmonics.sort((a,b)=>
    (b.sum*(b.bpm>=65&&b.bpm<=200?1:.83))-(a.sum*(a.bpm>=65&&a.bpm<=200?1:.83))
  )[0];
  const distinctA=windows.filter(w=>sameTempo(w.candidates[0].bpm,best.bpm)).length;
  const otherKey=nonHarmonics.find(t=>t.sum>=.55*best.sum&&windows.filter(w=>sameOctaveFamily(w.candidates[0].bpm,t.bpm)).length>=2);
  const variable=windows.length>=4&&distinctA>=1&&otherKey&&
    windows.filter(w=>sameOctaveFamily(w.candidates[0].bpm,best.bpm)).length>=2&&
    (best.hits.length/windows.length<.80||otherKey.hits.length/windows.length<.80);
  if(variable){
    result.quality='variable';result.range=[best.bpm,otherKey.bpm].sort((a,b)=>a-b).map(Math.round);
    return result;
  }
  if(bestStrength<.115 || (match<.46&&bestStrength<.31) || (windows.length===1&&bestStrength<.14))return result;
  const strengthCompetition=nonHarmonic?.sum/best.sum||0;
  result.bpm=Math.round(best.bpm);result.matched=best.hits.length;
  result.alternative=harmonic?Math.round(harmonic.bpm):null;
  result.quality=(bestStrength>=.25&&match>=.72&&!harmonic&&strengthCompetition<.81&&(count===1||best.hits.length>=2))?'strong':
    (bestStrength<.17||match<.59||strengthCompetition>.91||(count>=3&&windows.length===1))?'weak':'fair';
  return result;
}

async function estimateTempo(channels,rate,yieldBetween){
  const duration=channels[0].length/rate;
  if(duration<4)return consolidateTempo([],0);
  const starts=windowStarts(duration), windows=[];
  for(const start of starts){
    if(yieldBetween)await yieldBetween();
    const result=scoreWindow(channels,rate,start,starts.length===1?duration:WINDOW_SECONDS);
    if(result)windows.push(result);
  }
  return consolidateTempo(windows,starts.length);
}

async function measureAudio(file){
  if(file.size>25*1024*1024)throw new Error('dnaLimit');
  const AudioClass=window.AudioContext||window.webkitAudioContext;
  if(!AudioClass)throw new Error('dnaFailed');
  const context=new AudioClass({sampleRate:22050});
  try {
    const decoded=await context.decodeAudioData(await file.arrayBuffer());
    const channels=Array.from({length:Math.min(2,decoded.numberOfChannels)},(_,i)=>decoded.getChannelData(i));
    const tempo=await estimateTempo(channels,decoded.sampleRate,()=>new Promise(resolve=>setTimeout(resolve,0)));
    const waveform=[];
    for(let i=0;i<80;i++){
      const a=Math.floor(i*decoded.length/80), b=Math.floor((i+1)*decoded.length/80);
      let amp=0;
      for(let k=a;k<b;k+=Math.max(1,Math.floor((b-a)/320)))for(const channel of channels)amp=Math.max(amp,Math.abs(channel[k]));
      waveform.push(amp);
    }
    return {duration:decoded.duration,bpm:tempo.bpm,tempo,waveform};
  } catch {
    throw new Error('dnaFailed');
  } finally {
    await context.close().catch(()=>{});
  }
}
