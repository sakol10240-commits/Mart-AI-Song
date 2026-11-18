'use strict';

const moods = {
  nostalgic:['คิดถึง', 'nostalgic'], warm:['อบอุ่น', 'warm'], bright:['สดใส', 'bright'],
  calm:['สงบ', 'calm'], hopeful:['มีความหวัง', 'hopeful'], sad:['เศร้า', 'melancholic'],
  driving:['ฮึกเหิม', 'driving'], intense:['ดุดัน', 'intense'], focus:['มีสมาธิ', 'focused']
};
const voices = {
  male:['ชาย · นุ่มใกล้ไมค์', 'an intimate male lead with a warm chest register and gentle falsetto lifts'],
  female:['หญิง · โปร่งนุ่ม', 'an airy female lead with soft phrasing and light vibrato'],
  duet:['คู่ชาย–หญิง', 'a male-female duet that trades verse lines and joins in close harmonies'],
  choir:['ประสานเสียงกอสเปล', 'a full gospel choir with a soulful tenor lead and call-and-response phrasing'],
  grit:['ชาย · ดิบทรงพลัง', 'a gritty male lead with rhythmic verses and a melodic clean chorus'],
  ornament:['ลูกทุ่ง · เอื้อนชัด', 'an expressive Thai luk thung lead with controlled wide vibrato and melodic ornaments'],
  auto:['ให้เทมเพลตเลือก', 'a warm, expressive lead with clear phrasing']
};
const stories = {
  night: { title:'แสงไฟระหว่างทาง', hook:'คืนนี้ยังคิดถึงเธอ', verse:['ไฟริมทางไหลผ่านกระจก','มือยังจับพวงมาลัย','ที่นั่งข้างกันวันนี้ว่าง','แต่เพลงเดิมยังดังข้างใน'], pre:['เลี้ยวอีกทีคงถึงบ้าน','แล้วเมื่อไรใจจะถึงเธอ'], chorus:['แค่ไฟแดงก็ช้าเกินไป','ใจเลยเผลอหันไปข้างกาย','ยังอยากรู้ว่าเธอสบายดีไหม'], next:['ถนนเส้นเดิมตอนตีสอง','ร้านที่เคยแวะปิดไฟไป','เปิดกระจกให้ลมเข้ามา','อย่างน้อยคืนนี้ยังมีลม'], bridge:['ถ้ามีอีกวันให้ย้อนคืน','จะบอกให้เธอรู้ก่อนลา'] },
  love: { title:'เพียงเธออยู่ตรงนี้', hook:'เพียงเธออยู่ตรงนี้', verse:['แดดอ่อนลงตรงขอบหน้าต่าง','เธอวางแก้วไว้ข้างข้างกัน','ไม่มีเรื่องใหญ่ให้ต้องฝัน','แค่ได้แบ่งวันธรรมดา'], pre:['ไม่ต้องรีบเดินไปไหน','ขอเก็บตอนนี้ไว้ก่อน'], chorus:['เรื่องธรรมดาก็มีความหมาย','แค่ได้มองเธอหัวเราะง่ายง่าย','ฉันก็ไม่อยากขออะไร'], next:['ฝนหยุดแล้วบนทางเท้า','เราเดินกลับช้ากว่าเมื่อวาน','ถ้าอีกวันโลกหมุนไว','ขอเดินข้างเธออย่างนี้'], bridge:['ไม่ต้องสัญญาถึงวันไกล','พรุ่งนี้ค่อยเจอกันใหม่'] },
  loss: { title:'ปล่อยให้วันพาไป', hook:'ปล่อยให้วันพาไป', verse:['แก้วสองใบยังวางข้างกัน','แต่คนนั่งตรงนั้นหายไป','ฉันยังทำกาแฟเหมือนเก่า','แล้วค่อยนึกได้ว่าเหลือใคร'], pre:['ไม่ต้องตอบว่าทำไม','ฉันแค่ขอเวลาอีกหน่อย'], chorus:['ให้เสียงฝนกลบคำที่ค้าง','ให้พรุ่งนี้ค่อยค่อยเปิดทาง','ฉันจะหัดตื่นมาเพื่อตัวเอง'], next:['ย้ายแก้วหนึ่งใบเข้าตู้','เปิดม่านให้แดดเข้าห้อง','เรื่องของเรายังอยู่ตรงนี้','แต่ฉันคงไม่ต้องเฝ้ามอง'], bridge:['ฉันไม่ต้องลืมทุกอย่าง','แค่ก้าวออกไปจากตรงนี้'] },
  onward: { title:'ก้าวต่อไป', hook:'พรุ่งนี้เราจะก้าวต่อไป', verse:['วันนี้ฟ้ายังไม่เปิด','ทางตรงหน้าก็ยังยาว','ค่อยผูกเชือกรองเท้าใหม่','ให้ตัวเองลองอีกคราว'], pre:['ยังไม่ต้องถึงปลายทาง','แค่ยกเท้าขึ้นจากตรงนี้'], chorus:['ถึงช้าหน่อยก็ไม่เป็นไร','ขอให้ใจยังเชื่อในทาง','ข้างหน้าคงมีที่ให้เรา'], next:['นาฬิกาเดินเหมือนเก่า','แต่ใจเริ่มเดินเบากว่าเดิม','หยุดพักได้ถ้าเหนื่อยเกิน','แล้วลุกขึ้นเมื่อพร้อมเดิน'], bridge:['ไม่มีใครต้องเดินแทนเรา','แต่มีมือให้จับระหว่างทาง'] }
};
const englishStories={
  night:{title:'Lights Between Us',hook:'I still miss you tonight',verse:['Streetlights slide across the glass','I let another corner pass','Your empty seat is in my sight','The radio keeps you here tonight'],pre:['One more turn and I am home','How much farther till I let go?'],chorus:['The red light holds me in its glow','I turn to tell you what you know','And catch myself before I do'],next:['The corner store has killed its sign','I roll the window down this time','A little wind comes brushing through','It moves the things I cannot move'],bridge:['If I could borrow one more day','I would not wait till you walked away']},
  love:{title:'Right Here With You',hook:'I could stay right here with you',verse:['Morning settles on the sill','Two cups warm a room gone still','There is nothing big to say','Just a little time to stay'],pre:['We can let the whole day slow','There is nowhere else to go'],chorus:['Let the ordinary shine','Put your quiet next to mine','There is nothing else to do'],next:['Rain has left the pavement clean','We walk slower than we mean','If tomorrow runs too fast','Let this little moment last'],bridge:['We do not need to name next year','I am glad that you are here']},
  loss:{title:'Let the Day Carry Me',hook:'Let the day carry me',verse:['Two cups wait beside the sink','I pour the second without thinking','You are gone and still somehow','I keep expecting you right now'],pre:['I do not need a reason why','Just a little room to try'],chorus:['Let the rain fill up the street','Let tomorrow find my feet','I am learning how to leave'],next:['One clean cup goes in the drawer','Sun comes through the open door','I need not throw our days away','To make a little room for today'],bridge:['I can keep a part of then','And still begin again']},
  onward:{title:'The Next Small Step',hook:'We can take the next small step',verse:['The sky has not cleared up yet','And the road is wet ahead','Tie your laces one more time','You do not have to see the climb'],pre:['We do not have to race the clock','Just put a foot beyond this block'],chorus:['Slow is still a way to go','There is more than what we know','We are further than we left'],next:['The old clock keeps the same time','But every breath is feeling like mine','Rest a while if you need the air','The road will still be waiting there'],bridge:['No one has to walk for you','But there is a hand to hold on to']}
};
const referenceGrooves={
  straight:['ตรง','Straight'], sync:['ซิงโคเปต','Syncopated'], swing:['สวิง','Swing'],
  four:['โฟร์ออนเดอะฟลอร์','Four-on-the-floor'], half:['ฮาล์ฟไทม์','Half-time'],
  free:['ลอย ไม่เน้นจังหวะ','Free-flowing']
};
const lengths={
  short:['สั้น · 1–2 นาที','Short · 1–2 min','a compact 1–2 minute form'],
  standard:['มาตรฐาน · 2–3 นาที','Standard · 2–3 min','a 2–3 minute song form'],
  extended:['ยาว · 3–4 นาที','Extended · 3–4 min','a 3–4 minute form with room for development']
};
const voiceLabels={
  male:'Soft male lead',female:'Airy female lead',duet:'Male–female duet',choir:'Gospel choir',grit:'Gritty male lead',
  ornament:'Ornamented luk thung lead',auto:'Template default',none:'No vocals'
};
const moodLabel=k=>moods[k] ? (language==='en'?moods[k][1][0].toUpperCase()+moods[k][1].slice(1):moods[k][0]) : '';
const voiceLabel=k=>k==='none'?tr('vocalNone'):(language==='en'?voiceLabels[k]:voices[k]?.[0]);

const limit = { title:80, style:1000, free:1000, lyrics:5000 };
const $ = id => document.getElementById(id);
const form = $('brief');
const points = str => Array.from(str).length;
const shorten = (str,n) => Array.from(str).slice(0,n).join('');
const tidy = str => str.trim().replace(/\s+/g,' ');
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const fields = ['idea','source','title','hook'];
const selectedMode = () => form.elements.mode.value;
let current = null;
let timer;
let resultState='notBuilt', sourceIssue=null;
let selectedGenres=['neo'], referenceGenre='', manualBpm=false;
let pickedInstruments=[], pickedExclusions=[], remainingIdeas=[], lastIdea=-1;

function withOptions(id, data, label, initial, optional=false) {
  const select=$(id), value=select.value || initial;
  select.replaceChildren();
  if(optional)select.add(new Option(tr('unavailable'),''));
  for(const key of Object.keys(data)) select.add(new Option(label(key),key));
  select.value=value;
}
function refreshOptions(){
  withOptions('mood',moods,moodLabel,'warm');
  withOptions('voice',voices,voiceLabel,'male');
  withOptions('length',lengths,k=>choose(lengths[k]),'standard');
  const refGenre=$('ref-genre'), value=refGenre.value;
  refGenre.replaceChildren(new Option(tr('unavailable'),''));
  for(const [name,keys] of genreGroups){
    const group=document.createElement('optgroup');
    group.label=choose(name);
    for(const key of keys)group.append(new Option(genreLabel(key),key));
    refGenre.append(group);
  }
  refGenre.value=value;
  withOptions('ref-mood',moods,moodLabel,'',true);
  withOptions('ref-voice',{...voices,none:[]},voiceLabel,'',true);
  withOptions('ref-groove',referenceGrooves,k=>choose(referenceGrooves[k]),'',true);
}
const genreFit = {warm:['neo','bossa','gospel','folk','motown','lukk'],calm:['ambient','bossa','neo','piano','acoustic'],focus:['ambient','bossa','house','lofi','piano'],nostalgic:['city','luk','disco','synthwave','lukk'],bright:['disco','city','mor','pop','funk','kpop'],hopeful:['gospel','neo','city','poprock','orchestral'],sad:['luk','neo','ambient','blues','acoustic','shoegaze'],driving:['house','mor','disco','metal','dnb','techno','reggaeton'],intense:['metal','house','mor','hardrock','drill','dubstep']};
function primaryGenre() {
  if(selectedGenres.includes(referenceGenre))return referenceGenre;
  const matches=genreFit[$('mood').value]||[];
  return matches.find(g=>selectedGenres.includes(g))||selectedGenres[0]||'neo';
}
function syncGenre(updateTempo=false) {
  const lead=primaryGenre();
  $('genre-summary').textContent=selectedGenres.map(genreLabel).join(' + ');
  $('primary-genre').textContent=`${tr('primary')}: ${genreLabel(lead)}`;
  $('primary-genre').title=tr('primaryHint');
  if(updateTempo&&!manualBpm)$('bpm').value=genres[lead][2];
  renderChoices('instruments',instrumentOptions(lead,pickedInstruments).map(value=>[value,instrumentLabel(value)]),pickedInstruments);
}
function genreChoiceLocked(key){
  const selected=selectedGenres.includes(key);
  return (selectedGenres.length>=3&&!selected)||(selectedGenres.length===1&&selected);
}
function syncGenreChoices(){
  for(const option of $('genre-options').querySelectorAll('input')){
    option.checked=selectedGenres.includes(option.value);
    option.disabled=genreChoiceLocked(option.value);
  }
}
function renderGenres() {
  const root=$('genre-options'), query=$('genre-search').value.trim();
  root.replaceChildren();
  let count=0;
  for(const [name,keys] of genreGroups){
    const results=keys.filter(key=>genreMatches(key,query,name));
    if(!results.length)continue;
    count+=results.length;
    const section=document.createElement('section'), heading=document.createElement('h3'), grid=document.createElement('div');
    heading.textContent=choose(name);
    grid.className='genre-grid';
    for(const key of results){
      const label=document.createElement('label'), option=document.createElement('input');
      option.type='checkbox';option.value=key;option.dataset.genre=key;
      label.append(option,document.createTextNode(genreLabel(key)));
      grid.append(label);
    }
    section.append(heading,grid);root.append(section);
  }
  root.hidden=!count;
  root.scrollTop=0;
  $('genre-status').textContent=tr(count?(query?'genreMatches':'genreCount'):'genreNoResults',count,genreGroups.length);
  syncGenreChoices();
  syncGenre();
}

function renderChoices(id,options,selected){
  const group=$(id);
  group.replaceChildren(...options.map(([value,label])=>{
    const button=document.createElement('button');
    button.type='button';button.className='choice';button.dataset.choice=value;
    button.setAttribute('aria-pressed',String(selected.includes(value)));
    button.textContent=label;
    return button;
  }));
}
function renderExclusions(){
  renderChoices('exclusions',excludeChoices.map(([value,label])=>[value,choose(label)]),pickedExclusions);
}
for(const id of ['instruments','exclusions']){
  $(id).addEventListener('click',event=>{
    const button=event.target.closest('button[data-choice]');
    if(!button)return;
    const value=button.dataset.choice;
    const currentChoices=id==='instruments'?pickedInstruments:pickedExclusions;
    const pressed=!currentChoices.includes(value);
    const next=pressed?[...currentChoices,value]:currentChoices.filter(choice=>choice!==value);
    if(id==='instruments')pickedInstruments=next;else pickedExclusions=next;
    button.setAttribute('aria-pressed',String(pressed));
    if(current)refreshResultState('stale');
  });
}

$('random-idea').addEventListener('click',()=>{
  if(!remainingIdeas.length)remainingIdeas=songIdeas.map((_,index)=>index);
  const eligible=remainingIdeas.filter(index=>index!==lastIdea);
  const pool=eligible.length?eligible:remainingIdeas;
  lastIdea=pool[Math.floor(Math.random()*pool.length)];
  remainingIdeas.splice(remainingIdeas.indexOf(lastIdea),1);
  $('idea').value=choose(songIdeas[lastIdea].text);
  if(current)refreshResultState('stale');
});

const rapGenres = new Set(['hiphop','trap','boom','drill']);
function exclusionsFor(genre,mode) {
  const list = genre === 'metal' ? ['EDM drop','lo-fi'] :
    genre === 'house' ? ['rap','heavy distortion'] : ['heavy autotune','rap','EDM drop'];
  const compatible=list.filter(x=>!(
    (x==='rap'&&selectedGenres.some(g=>rapGenres.has(g)||g==='metal'||g==='lofi'))||
    (x==='EDM drop'&&selectedGenres.some(g=>['house','techno','trance','dnb','dubstep','futurebass'].includes(g)))||
    (x==='lo-fi'&&selectedGenres.includes('lofi'))||
    (x==='heavy distortion'&&selectedGenres.some(g=>['metal','hardrock','shoegaze','dubstep'].includes(g)))||
    (x==='heavy autotune'&&selectedGenres.some(g=>['trap','drill','futurebass'].includes(g)))
  ));
  return mode==='instrumental'?['vocals','spoken word',...compatible.filter(x=>x!=='rap')]:compatible;
}

function setMode(mode) {
  form.elements.mode.value = mode;
  $('source-field').hidden = mode !== 'own';
  $('voice-field').hidden = mode === 'instrumental';
  $('lyric-lang-field').hidden = mode === 'instrumental';
  $('hook-field').hidden = mode !== 'draft';
}

function loadExample() {
  selectedGenres=['city'];
  Object.entries({idea:'ขับรถกลับบ้านตอนดึก แล้วเพลงในรถทำให้นึกถึงคนเดิม',bpm:genres.city[2],mood:'nostalgic',voice:'male',length:'standard'})
    .forEach(([id,value])=>{$(id).value=value;});
  setMode('draft');
  renderGenres();
  generate('sample');
}

function findStory(idea,mood) {
  const example=songIdeas.find(item=>item.text.includes(idea));
  if(example)return example.story;
  if (/เลิก|อกหัก|จากลา|สูญเสีย|แยกทาง|ลืมเธอ|breakup|heartbreak|goodbye/i.test(idea)) return 'loss';
  if (/กลางคืน|ตอนดึก|ขับรถ|คิดถึง|คนเดิม|late.at.night|driv|miss you|miss someone|streetlight/i.test(idea)) return 'night';
  if (/เริ่มใหม่|เริ่มต้น|กำลังใจ|ความฝัน|สู้|ฮึกเหิม|start over|start again|keep going|encourag|start new/i.test(idea)) return 'onward';
  if (/รัก|คู่|แต่งงาน|\blove\b|wedding/i.test(idea)) return 'love';
  return ({nostalgic:'night',sad:'loss',driving:'onward',hopeful:'onward',intense:'onward'})[mood] || 'love';
}

function bilingualStory(th,en){
  return {...th,
    verse:[th.verse[0],th.verse[1],th.verse[2],en.verse[3]],
    pre:[th.pre[0],en.pre[1]],
    chorus:[en.hook,th.chorus[0],en.chorus[1],th.chorus[2]],
    next:[th.next[0],th.next[1],th.next[2],en.next[3]],
    bridge:[th.bridge[0],en.bridge[1]]
  };
}

function draftLyrics(story,customHook,length) {
  const hook=customHook || story.hook;
  const chorus=[hook,...story.chorus,hook].join('\n');
  const intro=`[Intro]\n\n[Verse 1]\n${story.verse.join('\n')}\n\n[Pre-Chorus]\n${story.pre.join('\n')}\n\n[Chorus]\n${chorus}`;
  const outro=`\n\n[Outro]\n${hook}`;
  if(length==='short')return intro+outro;
  const body=`\n\n[Verse 2]\n${story.next.join('\n')}\n\n[Chorus]\n${chorus}\n\n[Bridge]\n${story.bridge.join('\n')}`;
  return intro+body+(length==='extended'?'\n\n[Instrumental Break]\n':'')+`\n\n[Final Chorus]\n${chorus}`+outro;
}

function preserveLyrics(source,tag) {
  if (!tag || /^\s*\[[^\]\n]+\]\s*$/m.test(source)) return source;
  const labels=['Verse 1','Chorus','Verse 2','Bridge','Final Chorus','Outro'];
  let index=0;
  const tagged='[Verse 1]\n'+source.replace(/\n(?:[ \t]*\n)+(?=[ \t]*\S)/g,()=>{
    index++;
    return `\n\n[${labels[index]||'Verse '+(index+1)}]\n`;
  });
  return points(tagged)<=limit.lyrics ? tagged : source;
}

function clearSourceError() {
  sourceIssue=null;
  $('source-error').hidden=true;
  $('source').removeAttribute('aria-invalid');
}
function sourceError(key,...parts) {
  sourceIssue=[key,...parts];
  $('source-error').textContent=tr(key,...parts);
  $('source-error').hidden=false;
  $('source').setAttribute('aria-invalid','true');
  $('source').focus();
}

function generate(status='updated') {
  const mode=selectedMode(), genre=primaryGenre(), mood=$('mood').value;
  const [,genreEN,,instrumentDefaults,production]=genres[genre];
  const idea=tidy($('idea').value), source=$('source').value;
  if(mode==='own' && !source.trim()) { sourceError('sourceBlank'); return false; }
  if(mode==='own' && points(source)>limit.lyrics) { sourceError('sourceOver',points(source).toLocaleString(language)); return false; }
  clearSourceError();
  const bpm=Number($('bpm').value), voice=$('voice').value, lyricLang=$('lyric-lang').value, length=$('length').value;
  const lyricLanguage=lyricLang==='th-en'?'Thai and English':lyricLang==='en'?'English':'Thai';
  const rapLead=rapGenres.has(genre)&&voice!=='choir'&&voice!=='ornament';
  const vocal=mode==='instrumental'?'Instrumental arrangement.':rapLead?
    `Feature ${voice==='duet'?'alternating male and female rap leads':`a ${voice==='female'?'female ':voice==='male'||voice==='grit'?'male ':''}rap lead`} with clear rhythmic delivery in ${lyricLanguage}.`:
    `Feature ${voices[voice][1]} singing in ${lyricLanguage}.`;
  const moodEN=moods[mood][1];
  const other=selectedGenres.filter(g=>g!==genre).map(g=>genres[g][1]);
  const genrePhase=other.length ? `${genreEN.split(' with ')[0]}, drawing on ${other.map(g=>g.split(' with ')[0]).join(' and ')}` : genreEN;
  const bilingualDirection=mode==='draft'&&lyricLang==='th-en'?' Use Thai-led verses with English lines and a bilingual chorus.':'';
  const style=`${genrePhase}, ${/^[aeiou]/i.test(moodEN)?'an':'a'} ${moodEN} feel. Build around ${pickedInstruments.length?pickedInstruments.join(', '):instrumentDefaults}. ${vocal}${bilingualDirection} Set it at ${bpm} BPM with ${production}. Aim for ${lengths[length][2]}.`;
  const defaults=exclusionsFor(genre,mode);
  const specific=pickedExclusions.length?[...(mode==='instrumental'?['vocals','spoken word']:[]),...pickedExclusions]:defaults;
  const excludes=specific.map(x=>x.toLowerCase());
  const exclude=excludes.join(', ');
  const free=exclude ? `${style.slice(0,-1)}, ${excludes.map(x=>`no ${x}`).join(', ')}` : style;
  const storyKey=findStory(idea,mood);
  const story=lyricLang==='th-en'?bilingualStory(stories[storyKey],englishStories[storyKey]):(lyricLang==='en'?englishStories:stories)[storyKey];
  const hook=tidy($('hook').value);
  const firstLine=source.split('\n').find(line=>line.trim()&&!/^\s*\[.*\]\s*$/.test(line));
  const suggestedTitle=mode==='draft' ? (hook || story.title) :
    mode==='own' ? (firstLine ? shorten(firstLine.trim(),38) : tr('untitledOwn')) :
    (idea && points(idea)<=30 ? idea : mood==='calm'||mood==='focus'?tr('restTitle'):tr('instrumentalTitle',genreLabel(genre)));
  const title=shorten(tidy($('title').value)||suggestedTitle,limit.title);
  const lyrics=mode==='instrumental' ? (length==='extended'?'[Intro]\n[Instrumental Theme]\n[Development]\n[Breakdown]\n[Theme Reprise]\n[Outro]':'[Intro]\n[Instrumental]\n[Outro]') :
    mode==='own' ? preserveLyrics(source,$('add-tags').checked) : draftLyrics(story,hook,length);
  current={title,style,exclude,free,lyrics,mode,lyricLang,idea,primary:genre,mood,bpm,length,selected:[...selectedGenres]};
  console.assert(Object.entries(limit).every(([key,n])=>points(current[key])<=n),'Output exceeds limit');
  render(status);
  return true;
}

function isEnglish(value){return /^[\u0020-\u007e–—‘’“”]+$/.test(value);}
function recap(song) {
  const note=song.mode==='own'?'ownNote':song.mode==='instrumental'?'instrumentalNote':song.lyricLang==='th-en'?'mixedTemplate':song.lyricLang==='en'?'enTemplate':'thaiTemplate';
  return [genreLabel(song.primary),moodLabel(song.mood),`${song.bpm} BPM`,lengths[song.length]?choose(lengths[song.length]):'',tr(note),song.idea].filter(Boolean).join(' · ');
}
const labels={title:'Title',style:'Style prompt',exclude:'Exclude Styles',lyrics:'Lyrics'};
const labelFor=k=>k==='free'?tr('freeStyle'):labels[k];
const subtitles={title:'titleSub',style:'styleSub',exclude:'excludeSub',lyrics:'lyricsSub'};
function outputBlock(key) {
  const item=document.createElement('div');
  item.className='out-item';
  const heading=document.createElement('div');
  heading.className='out-head';
  const h=document.createElement('h3'); h.textContent=labelFor(key);
  if(subtitles[key]&&language==='th') {
    const sub=document.createElement('span'); sub.textContent=tr(subtitles[key]); h.append(sub);
  }
  const tools=document.createElement('div'); tools.className='out-tools';
  const count=document.createElement('span'); count.className='count'; count.textContent=`${points(current[key])}${limit[key]?` / ${limit[key]}`:` ${tr('char')}`}`;
  const copy=document.createElement('button');
  copy.type='button'; copy.className='button mini'; copy.innerHTML=icon('copy');
  copy.title=tr('copyOne',labelFor(key)); copy.setAttribute('aria-label',copy.title);
  copy.addEventListener('click',()=>copyText(current[key],labelFor(key))); copy.disabled=!current[key];
  tools.append(count,copy);
  heading.append(h,tools);
  const value=document.createElement('div'); value.className=`out-value${key==='lyrics'?' lyrics':key==='title'?' out-title':''}`;
  value.dataset.output=key; value.textContent=current[key]||tr('notSpecified');
  if(['style','exclude','free'].includes(key)) value.lang='en';
  if(key==='lyrics') { value.lang=current.lyricLang==='th-en'?'th':current.lyricLang; value.tabIndex=0; value.setAttribute('aria-label',tr('lyricsPreview')); }
  item.append(heading,value); return item;
}

function refreshResultState(status=resultState){
  resultState=status;
  $('result-status').textContent=tr(status);
  $('copy-all').disabled=!current;
  $('save-song').disabled=!current||status==='fromLibrary'||status==='stale';
  $('copy-suno').disabled=!current||status==='stale';
  $('suno-copy-help').textContent=tr(!current?'copySunoEmpty':status==='stale'?'copySunoStale':'copySunoHelp');
}
function render(status=resultState) {
  refreshResultState(status);
  const out=$('output');
  const freeOpen=out.querySelector('.free')?.open;
  out.replaceChildren();
  if(!current) {
    const empty=document.createElement('p');
    empty.className='recap'; empty.textContent=tr('emptyResult');
    out.append(empty); return;
  }
  const brief=document.createElement('p'); brief.className='recap';
  const bold=document.createElement('b'); bold.textContent=`${tr('songBrief')}: `;
  brief.append(bold,recap(current)); out.append(brief);
  out.append(outputBlock('title'),outputBlock('style'),outputBlock('exclude'));
  const details=document.createElement('details'); details.className='free'; details.open=!!freeOpen;
  const summary=document.createElement('summary'); summary.innerHTML=`<span>${tr('freeTitle')} <span class="free-note">${tr('freeNote')}</span></span>${icon('chevron')}`;
  const freeBody=document.createElement('div'); freeBody.className='free-body'; freeBody.append(outputBlock('free'));
  details.append(summary,freeBody); out.append(details,outputBlock('lyrics'));
  const tip=document.createElement('p'); tip.className='tip';
  tip.textContent=tr(current.mode==='draft'?'tipDraft':current.mode==='instrumental'?'tipInstrumental':'tipOwn')+' '+tr('lengthHelp');
  out.append(tip);
}

function toast(message) {
  clearTimeout(timer);
  $('toast').textContent=message; $('toast').hidden=false;
  timer=setTimeout(()=>{$('toast').hidden=true;},2400);
}

async function copyText(value,label) {
  if(!value) return;
  try {
    if(navigator.clipboard) {
      await navigator.clipboard.writeText(value);
      toast(tr('copied',label)); return;
    }
  } catch {}
  const manual=$('manual-copy');
  manual.value=value;
  $('copy-dialog').showModal();
  manual.focus(); manual.select();
  try {
    if(document.execCommand('copy')) {
      $('copy-dialog').close();
      toast(tr('copied',label));
    }
  } catch {}
}

$('copy-all').addEventListener('click',()=>{
  if(!current)return;
  const order=['title','style','exclude','free','lyrics'];
  copyText(`${tr('songBrief')}: ${recap(current)}\n\n${order.map(key=>`${labelFor(key)}\n${current[key]}`).join('\n\n')}`,tr('all'));
});
$('copy-suno').addEventListener('click',()=>{
  if(!current||resultState==='stale')return;
  copyText(`Style prompt\n${current.style}\n\nLyrics\n${current.lyrics}`,tr('copySunoContents'));
});

form.addEventListener('submit',event=>{
  event.preventDefault();
  if(generate() && matchMedia('(max-width:700px)').matches) $('results').scrollIntoView({block:'start'});
});
function onFormEdit(event) {
  const target=event.target;
  if(target.id==='genre-search'){renderGenres();return;}
  if(target.name==='mode') setMode(selectedMode());
  if(target.id==='source') clearSourceError();
  if(target.id==='mood') syncGenre(true);
  if(target.id==='bpm') {manualBpm=true;target.setCustomValidity('');}
  if(target.dataset.genre) {
    selectedGenres=target.checked?[...selectedGenres,target.value]:selectedGenres.filter(k=>k!==target.value);
    syncGenreChoices(); syncGenre(true);
    if(target.disabled)$('genre-search').focus();
  }
  if(current)refreshResultState('stale');
}
form.addEventListener('input',onFormEdit);
$('genre-search').addEventListener('keydown',event=>{if(event.key==='Enter')event.preventDefault();});
form.addEventListener('invalid',event=>{
  if(event.target.id==='bpm') $('bpm').setCustomValidity(tr('bpmInvalid'));
},true);
function resetBrief(){
  form.reset();
  for(const id of fields) $(id).value='';
  selectedGenres=['neo']; referenceGenre=''; manualBpm=false;
  pickedInstruments=[];pickedExclusions=[];
  $('mood').value='warm'; $('voice').value='male'; $('bpm').value='88'; $('length').value='standard'; $('lyric-lang').value='th';
  $('bpm').setCustomValidity('');
  $('genre-picker').open=false;
  $('adjust').open=false;
  setMode('draft'); clearSourceError();
  current=null; renderGenres(); renderExclusions(); render('notBuilt');
}
$('clear-brief').addEventListener('click',resetBrief);
function refreshLanguage() {
  translateStatic(); refreshOptions(); renderGenres(); renderExclusions(); render();
  if(sourceIssue) $('source-error').textContent=tr(...sourceIssue);
  $('bpm').setCustomValidity('');
}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{
  language=button.dataset.lang; refreshLanguage();
  document.dispatchEvent(new Event('studio-language'));
}));
refreshLanguage();
loadExample();
