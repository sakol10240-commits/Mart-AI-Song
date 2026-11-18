'use strict';

const navButtons=Array.from(document.querySelectorAll('[data-view]'));
let workspace='compose';
function showView(name) {
  workspace=name;
  $('suno-export').hidden=name!=='compose';
  navButtons.forEach(button=>{
    const on=button.dataset.view===name;
    $(button.dataset.view).hidden=!on;
    if(on)button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
  });
  if(name==='library')loadLibrary();
}
navButtons.forEach(button=>button.addEventListener('click',()=>showView(button.dataset.view)));

let dna=null, dnaState='dnaIdle', dnaIssue='', busy=false, audioCache=null;
const dnaForm=$('dna-form'), applyDnaButton=$('apply-dna');
const noteFields=['genre','mood','groove','voice','inst','arrange','prod'];
const refInput=key=>$(`ref-${key}`).value.trim();
const refNotes=()=>Object.fromEntries(noteFields.map(key=>[key,refInput(key)]));
function readyInstruments(data) {
  const notes=data.notes.inst.split(',').map(tidy).filter(v=>v&&isEnglish(v));
  return uniqueChoices(notes).slice(0,5);
}
const canApply=data=>!!(data.notes.genre||data.notes.mood||data.notes.voice||data.enteredBpm||data.audio?.bpm||readyInstruments(data).length);
function setDnaIssue(key='') {
  dnaIssue=key; $('dna-error').textContent=key?tr(key):''; $('dna-error').hidden=!key;
}
function secondsLabel(n) {
  const seconds=Math.round(n);
  return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
}
function addFact(parent,label,value) {
  const dt=document.createElement('dt'), dd=document.createElement('dd');
  dt.textContent=label;dd.textContent=value||tr('unknown');
  parent.append(dt,dd);
}
function addSection(parent,label) {
  const title=document.createElement('h3'), group=document.createElement('dl');
  title.textContent=label;group.className='dna-grid';parent.append(title,group);return group;
}
function drawWave(values) {
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 400 48');svg.setAttribute('class','audio-wave');
  svg.setAttribute('role','img');svg.setAttribute('aria-label',tr('waveform'));
  values.forEach((amplitude,i)=>{
    const line=document.createElementNS(svg.namespaceURI,'line'), x=2.5+i*5, distance=Math.min(23,Math.max(.7,amplitude*22));
    line.setAttribute('x1',x);line.setAttribute('x2',x);line.setAttribute('y1',24-distance);line.setAttribute('y2',24+distance);
    svg.append(line);
  });
  return svg;
}
function renderTempo(parent, facts, data) {
  const tempo=data.audio.tempo;
  const estimate=tempo.bpm?tr('tempoEstimated',tempo.bpm):
    tempo.quality==='variable'?tr('tempoVariable',...tempo.range):tr('tempoUnclear');
  addFact(facts,tr('tempo'),estimate);
  if(tempo.bpm) {
    const level=({strong:'tempoStrong',fair:'tempoFair',weak:'tempoWeak'})[tempo.quality];
    addFact(facts,tr('tempoAgreement'),`${tr(level)} · ${tr('tempoCoverage',tempo.matched,tempo.segments)}`);
  }
  if(!tempo.alternative)return;
  const choices=document.createElement('fieldset');choices.className='tempo-choices';
  const legend=document.createElement('legend');legend.textContent=tr('tempoChoose');choices.append(legend);
  const list=document.createElement('div');list.className='tempo-options';
  [[tempo.bpm,'tempoPrimary'],[tempo.alternative,'tempoAlternate']].forEach(([bpm,labelKey])=>{
    const label=document.createElement('label'), input=document.createElement('input');
    input.type='radio';input.name='estimated-pulse';input.value=bpm;
    input.checked=(data.chosenBpm||tempo.bpm)===bpm;input.disabled=!!data.enteredBpm||dnaState!=='dnaDone';
    input.addEventListener('change',()=>{if(input.checked)data.chosenBpm=bpm;});
    label.append(input,document.createTextNode(tr(labelKey,bpm)));list.append(label);
  });
  const helper=document.createElement('p');helper.className='helper';
  helper.textContent=tr(data.enteredBpm?'tempoManualPriority':'tempoAmbiguity');
  choices.append(list,helper);parent.append(choices);
}
function renderDna() {
  $('ref-file-name').textContent=$('ref-file').files[0]?.name||tr('noFile');
  $('dna-status').textContent=tr(dnaState);
  $('analyze').disabled=busy;
  setDnaIssue(dnaIssue);
  const root=$('dna-result');root.replaceChildren();
  applyDnaButton.hidden=!dna||!canApply(dna)||dnaState!=='dnaDone';
  if(!dna) {
    const p=document.createElement('p');p.className='recap';p.textContent=tr('dnaEmpty');root.append(p,applyDnaButton);
  } else {
    const ref=document.createElement('p');ref.className='recap';
    ref.textContent=`${tr('dnaTitle')}: ${dna.title||dna.fileName||tr('unknown')}`;root.append(ref);
    if(dna.audio){
      const facts=addSection(root,tr('audioFacts'));
      addFact(facts,tr('measured'),secondsLabel(dna.audio.duration));
      renderTempo(root,facts,dna);
      root.append(drawWave(dna.audio.waveform));
      const helper=document.createElement('p');helper.className='helper';helper.textContent=tr('bpmSource');root.append(helper);
      root.append(applyDnaButton);
    }
    const notes=addSection(root,tr('noteFacts'));
    const n=dna.notes;
    addFact(notes,tr('genre'),genreLabel(n.genre));
    addFact(notes,tr('mood'),moodLabel(n.mood));
    addFact(notes,tr('groove'),n.groove?choose(referenceGrooves[n.groove]):'');
    if(dna.enteredBpm)addFact(notes,tr('tempo'),tr('tempoManual',dna.enteredBpm));
    addFact(notes,tr('instruments'),n.inst);
    addFact(notes,tr('voice'),n.voice?voiceLabel(n.voice):'');
    addFact(notes,tr('arrangement'),n.arrange);
    addFact(notes,tr('production'),n.prod);
    if(!dna.audio)root.append(applyDnaButton);
    if(!canApply(dna)){
      const p=document.createElement('p');p.className='helper';p.textContent=tr('noApply');root.append(p);
    }
  }
  const limits=document.createElement('p');limits.className='tip';limits.textContent=tr('notesLimits');root.append(limits);
}
dnaForm.addEventListener('submit',async e=>{
  e.preventDefault();if(busy)return;
  setDnaIssue();
  const file=$('ref-file').files[0], notes=refNotes(), title=refInput('title'), enteredBpm=Number(refInput('bpm'));
  if(!file&&!enteredBpm&&!Object.values(notes).some(Boolean)){setDnaIssue('dnaMissing');return;}
  if(file){busy=true;dnaState='dnaBusy';renderDna();}
  try {
    const audio=file?(audioCache?.file===file?audioCache.audio:await measureAudio(file)):null;
    const chosenBpm=dna?.audio===audio?dna.chosenBpm:null;
    audioCache=file?{file,audio}:null;
    const unchanged=title===refInput('title')&&file===$('ref-file').files[0]&&enteredBpm===Number(refInput('bpm'))&&JSON.stringify(notes)===JSON.stringify(refNotes());
    dna={title,enteredBpm,notes,audio,chosenBpm,fileName:file?.name};
    dnaState=unchanged?'dnaDone':'dnaStale';
  } catch(error) {
    dnaState=dna?'dnaStale':'dnaIdle'; setDnaIssue(error.message==='dnaLimit'?'dnaLimit':'dnaFailed');
  } finally {
    busy=false;renderDna();
  }
});
dnaForm.addEventListener('input',()=>{
  setDnaIssue();
  $('ref-file-name').textContent=$('ref-file').files[0]?.name||tr('noFile');
  if(dna&&!busy){dnaState='dnaStale';renderDna();}
});
applyDnaButton.addEventListener('click',()=>{
  if(!dna||dnaState!=='dnaDone'||!canApply(dna))return;
  const n=dna.notes;
  if(n.genre){
    selectedGenres=[...new Set([n.genre,...selectedGenres])].slice(0,3); referenceGenre=n.genre;
  }
  if(n.mood)$('mood').value=n.mood;
  if(n.voice==='none')setMode('instrumental');
  else if(n.voice){
    if(selectedMode()==='instrumental')setMode('draft');
    $('voice').value=n.voice;
  }
  const bpm=dna.enteredBpm||dna.chosenBpm||dna.audio?.bpm;
  if(bpm){ $('bpm').value=bpm; manualBpm=true;$('bpm').setCustomValidity('');}
  const instruments=readyInstruments(dna);
  if(instruments.length)pickedInstruments=instruments;
  $('genre-search').value='';renderGenres();syncGenre(true);showView('compose');
  if(current)refreshResultState('stale');
  toast(tr('dnaApplied'));
  navButtons.find(button=>button.dataset.view==='compose').focus();
});

const localOrigin=location.hostname==='127.0.0.1'||location.hostname==='localhost';
const configuredApi=document.querySelector('meta[name=library-api]').content;
const service=configuredApi.startsWith('__PORT_')?(localOrigin?'http://127.0.0.1:8932':''):configuredApi.replace(/\/+$/,'');
async function api(path,options={}) {
  if(!service)throw new Error('unavailable');
  const response=await fetch(`${service}/api/library${path}`,{credentials:'same-origin',...options,signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw new Error(String(response.status));
  return response.status===204?null:response.json();
}
async function saveToLibrary(song){
  const save=async()=>{
    await api('/session');
    return api('',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(song)});
  };
  // Serialize initial cookie setup across tabs on standalone browsers. Embeds can lack Web Locks.
  if(window.top===window&&navigator.locks)return navigator.locks.request('dna-song-ai-library-save',save);
  return save();
}
let savedSongs=[], libraryState='idle', saveBusy=false, removing=null;
function renderLibrary() {
  const root=$('library-list'), status=$('library-status'), retry=$('retry-library');
  root.replaceChildren();retry.hidden=libraryState!=='error';
  $('library-compose').hidden=libraryState!=='ready'||savedSongs.length>0;
  if(libraryState==='busy'||libraryState==='error') {status.textContent=tr(libraryState==='busy'?'libraryBusy':'libraryError');return;}
  const query=tidy($('library-search').value).toLocaleLowerCase();
  const found=savedSongs.filter(s=>[s.title,s.idea].filter(Boolean).some(term=>term.toLocaleLowerCase().includes(query))||genreMatches(s.primary,query));
  status.textContent=tr(!savedSongs.length?'libraryEmpty':!found.length?'libraryNone':'libraryCount',found.length);
  for(const song of found){
    const row=document.createElement('article');row.className='library-row';
    const desc=document.createElement('div'), name=document.createElement('h3'), data=document.createElement('p');
    name.textContent=song.title;
    const date=new Intl.DateTimeFormat(language==='th'?'th-TH':'en-GB',{dateStyle:'medium'}).format(new Date(song.savedAt));
    data.textContent=[genreLabel(song.primary),`${song.bpm} BPM`,date].filter(Boolean).join(' · ');
    desc.append(name,data);
    const actions=document.createElement('div');actions.className='row-actions';
    const open=document.createElement('button');open.type='button';open.className='button';open.textContent=tr('openSong');
    open.addEventListener('click',()=>{
      const {id,savedAt,...settings}=song;
      current=settings;showView('compose');render('fromLibrary');
      $('result-heading').setAttribute('tabindex','-1');$('result-heading').focus();
    });
    const remove=document.createElement('button');remove.type='button';remove.className='button quiet';remove.textContent=tr('remove');
    remove.addEventListener('click',()=>{
      removing=song;$('delete-name').textContent=song.title;$('delete-dialog').returnValue='cancel';$('delete-dialog').showModal();
    });
    actions.append(open,remove);row.append(desc,actions);root.append(row);
  }
}
async function loadLibrary() {
  if(libraryState==='busy')return;
  libraryState='busy';renderLibrary();
  try {savedSongs=await api('');libraryState='ready';}
  catch {libraryState='error';}
  renderLibrary();
}
$('library-search').addEventListener('input',renderLibrary);
$('retry-library').addEventListener('click',loadLibrary);
$('library-compose').addEventListener('click',()=>{
  showView('compose');navButtons.find(button=>button.dataset.view==='compose').focus();
});
$('save-song').addEventListener('click',async()=>{
  if(!current||saveBusy||resultState==='stale'||resultState==='fromLibrary')return;
  const snapshot=current;
  saveBusy=true;$('save-song').disabled=true;$('save-song').setAttribute('aria-busy','true');
  toast(tr('saving'));
  try {
    await saveToLibrary(snapshot);
    toast(tr('saved'));
    if(workspace==='library')loadLibrary();
  } catch(error) {toast(tr(error.message==='409'?'libraryFull':'saveError'));}
  finally {
    saveBusy=false;$('save-song').removeAttribute('aria-busy');
    $('save-song').disabled=!current||resultState==='stale'||resultState==='fromLibrary';
  }
});
$('delete-dialog').addEventListener('close',async()=>{
  const song=removing;removing=null;
  if(!song||$('delete-dialog').returnValue!=='delete')return;
  try {
    await api('/'+encodeURIComponent(song.id),{method:'DELETE'});
    savedSongs=savedSongs.filter(item=>item.id!==song.id);renderLibrary();toast(tr('deleted'));
  } catch {toast(tr('deleteError'));}
});

document.addEventListener('studio-language',()=>{renderDna();if(workspace==='library')renderLibrary();});
renderDna();
