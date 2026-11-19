'use strict';

const strings = {
  openSuno:['เปิด Suno','Open Suno'], installApp:['ติดตั้งลงหน้าจอ','Install app'], installTitle:['ติดตั้ง DNA SONG AI','Install DNA SONG AI'],
  installIOSHelp:['แตะปุ่มแชร์ใน Safari แล้วเลือก “เพิ่มไปยังหน้าจอโฮม”','In Safari, tap Share, then choose “Add to Home Screen”.'],
  installAndroidHelp:['เปิดเมนู ⋮ ของเบราว์เซอร์ แล้วเลือก “ติดตั้งแอป” หรือ “เพิ่มลงในหน้าจอหลัก”','Open your browser menu and choose “Install app” or “Add to Home screen”.'],
  installDesktopHelp:['เปิดเมนูของเบราว์เซอร์ แล้วเลือก “ติดตั้ง DNA SONG AI” หรือ “Install app”','Open your browser menu and choose “Install DNA SONG AI” or “Install app”.'],
  uiLanguage:['ภาษาของหน้าจอ','Interface language'], workspaces:['พื้นที่ทำงาน','Workspace'],
  intro:['ถอด DNA เพลง · แต่งเนื้อ · สร้างสไตล์สำหรับ Suno','Analyze a reference · Draft lyrics · Build a Suno style'],
  localBadge:['โหมดเทมเพลต · ไม่ใช้เครดิต AI','Template mode · No AI credits'],
  dnaTab:['ถอด DNA','Music DNA'], songTab:['สั่งเพลง','Build a song'], libraryTab:['คลังเพลง','Library'],
  dnaHeading:['ถอด DNA จากเพลงอ้างอิง','Analyze a reference track'], dnaIntro:['เลือกไฟล์เสียง หรือจดสิ่งที่ได้ยินด้วยตัวเอง','Choose an audio file or describe what you hear'],
  refTitle:['ชื่อเพลง / แหล่งอ้างอิง','Track / reference'], refTitlePh:['เช่น ชื่อเพลงและศิลปิน','For example, a song title and artist'],
  audioLabel:['ไฟล์เสียงอ้างอิง','Reference audio'], audioHelp:['ไม่เกิน 25 MB ประมวลผลในเครื่อง ไม่อัปโหลดไฟล์','Up to 25 MB. Analyzed on your device, never uploaded.'],
  chooseFile:['เลือกไฟล์','Choose file'], noFile:['ยังไม่ได้เลือกไฟล์','No file selected'],
  refBpmPh:['เว้นว่างได้','Optional'], refDetails:['โน้ตการเรียบเรียงและมิกซ์','Arrangement and mix notes'], arrangement:['การเรียบเรียง','Arrangement'], production:['ซาวด์และมิกซ์','Production / mix'],
  refArrangePh:['เช่น เวิร์สร้องเบา ฮุกเพิ่มเสียงประสาน','For example, quiet verses and layered choruses'],
  refProdPh:['เช่น กลองแห้ง เบสชัด เสียงร้องใกล้ไมค์','For example, dry drums, defined bass, close vocals'],
  analyze:['ถอด DNA','Analyze DNA'], report:['รายงาน Music DNA','Music DNA report'], applyDna:['ใช้ DNA นี้สั่งเพลง','Use this DNA in the song brief'],
  brief:['บรีฟเพลง','Song brief'], briefSub:['เลือกโทนเสียงและรายละเอียดเพลง','Set the sound and song details'], reset:['ล้างค่า','Reset'],
  mode:['ประเภทเพลง','Song type'], draft:['ร่างเนื้อร้อง','Draft lyrics'], own:['มีเนื้อแล้ว','My own lyrics'], instrumental:['บรรเลง','Instrumental'],
  idea:['ไอเดียเพลง','Song idea'], optional:['ไม่บังคับ','Optional'], ideaPh:['เช่น ขับรถกลับบ้านตอนดึกแล้วคิดถึงคนเดิม','For example, driving home late and missing someone'],
  randomIdea:['สุ่มไอเดีย','Random idea'],
  genre:['แนวเพลง','Genres'], genreHint:['เลือกได้สูงสุด 3 แนว ระบบเลือกแนวหลักให้','Select up to 3 genres. The studio picks the lead.'],
  genreSearch:['ค้นหาแนวเพลง','Search genres'], genreSearchPh:['ค้นหา เช่น ลูกกรุง, Funk, DnB','Search, e.g. Funk, DnB, luk krung'],
  genreCount:['{0} แนวใน {1} หมวด','{0} genres in {1} groups'], genreMatches:['พบ {0} แนว','{0} matching genres'],
  genreNoResults:['ไม่พบแนวเพลงนี้ ลองใช้ชื่ออื่นหรือล้างคำค้น','No genres found. Try another name or clear the search.'],
  mood:['อารมณ์เพลง','Mood'], voice:['เสียงร้อง','Vocals'], lyricLanguage:['ภาษาเนื้อร้อง','Lyrics language'], length:['ความยาวเป้าหมาย','Target length'], groove:['จังหวะ','Groove'], tempo:['ความเร็ว (BPM)','Tempo (BPM)'],
  lyricThai:['ไทย','Thai'], lyricMixed:['ไทย+Eng','Thai + English'],
  source:['เนื้อร้องของคุณ','Your lyrics'], sourcePh:['วางเนื้อร้องที่นี่ ระบบจะไม่แก้คำในแต่ละบรรทัด','Paste your lyrics here. Every line stays as written.'],
  addTags:['ใส่แท็กท่อนเมื่อยังไม่มี','Add section tags if missing'],
  advanced:['ปรับรายละเอียดเพิ่มเติม','Advanced options'], setTitle:['ชื่อเพลงที่ต้องการ','Custom title'], titlePh:['เว้นว่างเพื่อใช้ชื่อที่ระบบเสนอ','Leave blank for a suggested title'],
  hook:['ประโยคฮุก','Hook line'], hookPh:['เช่น คืนนี้ยังคิดถึงเธอ','For example, I still miss you tonight'], instruments:['เครื่องดนตรี','Instruments'], instPh:['Rhodes, melodic bass, brushed drums','Rhodes, melodic bass, brushed drums'],
  instrumentHelp:['เลือกได้หลายข้อ ถ้าไม่เลือกจะใช้เครื่องดนตรีตามแนวเพลง','Pick any of the five, or leave them unselected to use the genre defaults.'],
  excludeHelp:['เลือกได้หลายข้อ ถ้าไม่เลือกจะใช้ค่าแนะนำตามแนวเพลง','Pick any of the five, or leave them unselected to use the genre defaults.'],
  generate:['สร้างพรอมต์','Build prompt'], privacy:['สร้างจากเทมเพลตในเบราว์เซอร์ ไม่เรียก Claude หรือ Suno','Built in your browser from templates. No calls to Claude or Suno.'],
  result:['พรอมต์พร้อมใช้','Ready-to-paste prompts'], save:['เก็บในคลัง','Save to library'], copyAll:['คัดลอกทั้งหมด','Copy all'],
  libraryHeading:['คลังเพลงที่เก็บไว้','Saved songs'], search:['ค้นหาเพลง','Find a song'], searchPh:['ค้นด้วยชื่อ แนวเพลง หรือไอเดีย','Search by title, genre or idea'], retry:['ลองใหม่','Retry'],
  hostedLibraryIntro:['เมื่อกดเก็บในคลัง แอปจะส่งเฉพาะข้อความพรอมต์ไปเก็บในคลังของเบราว์เซอร์นี้ ไม่ส่งไฟล์เสียง','Save to library sends only the prompt text to the hosted library for this browser, never your audio file.'],
  footer:['DNA SONG AI เป็นเครื่องมืออิสระ ไม่ใช่ผลิตภัณฑ์ของ Suno','DNA SONG AI is independent and not affiliated with Suno.'],
  copySuno:['บันทึกเพื่อไปวางที่ Suno','Copy for Suno'], copySunoContents:['Style prompt และเนื้อร้อง','Style prompt and lyrics'],
  copySunoHelp:['คัดลอกสไตล์และเนื้อร้องพร้อมกัน หากจะวางแยกช่องใน Suno ให้ใช้ไอคอนคัดลอกข้างแต่ละหัวข้อ','Copies style and lyrics together. To paste into separate Suno fields, use the copy icon beside each heading.'],
  copySunoEmpty:['สร้างพรอมต์ก่อนคัดลอกไปวางที่ Suno','Build a prompt before copying it for Suno.'],
  copySunoStale:['กดสร้างพรอมต์อีกครั้งเพื่อคัดลอกผลจากบรีฟล่าสุด','Build again to copy prompts from your latest brief.'],
  manualTitle:['คัดลอกด้วยตนเอง','Copy manually'], manualCopy:['เลือกข้อความในช่องนี้แล้วกดคัดลอก','Select the text below and copy it.'], manualText:['ข้อความสำหรับคัดลอก','Text to copy'], close:['ปิด','Close'],
  deleteTitle:['ลบเพลงนี้จากคลัง?','Remove this song from the library?'], remove:['ลบ','Remove'], cancel:['ยกเลิก','Cancel'], openSong:['เปิดพรอมต์','Open prompts'],
  sample:['ตัวอย่างสำหรับเริ่มต้น','Starter example'], updated:['อัปเดตจากบรีฟล่าสุด','Updated from the latest brief'], stale:['บรีฟเปลี่ยนแล้ว กดสร้างเพื่ออัปเดต','Brief changed. Build again to update.'],
  notBuilt:['ยังไม่ได้สร้างพรอมต์','No prompt built yet'], emptyResult:['ตั้งค่าบรีฟ แล้วกดสร้างพรอมต์','Set up the brief, then build a prompt.'],
  fromLibrary:['พรอมต์ที่เปิดจากคลัง','Saved prompt from the library'], dnaApplied:['นำค่าจาก DNA มาใช้แล้ว ปรับบรีฟต่อได้','DNA applied. You can now refine the brief.'],
  primary:['แนวหลักที่ระบบเลือก','Auto-selected lead'], primaryHint:['พิจารณาจากแนวที่เลือก อารมณ์ และข้อมูลอ้างอิง','Based on your genre choices, mood, and reference'],
  titleSub:['ชื่อเพลง',''], styleSub:['สไตล์เพลง',''], excludeSub:['สิ่งที่ไม่อยากได้','Styles to exclude'], lyricsSub:['เนื้อร้อง / โครงเพลง',''], freeStyle:['Style สำหรับแผนฟรี','Free-plan Style'], freeTitle:['เวอร์ชันแผนฟรี','Free-plan version'], freeNote:['รวม Style + ข้อที่ไม่อยากได้','Style with exclusions inline'],
  songBrief:['บรีฟ','Brief'], char:['ตัวอักษร','characters'], notSpecified:['ไม่ระบุ','Not specified'], lyricsPreview:['ตัวอย่างเนื้อร้อง','Lyrics preview'],
  ownNote:['ใช้คำร้องเดิม','Original lines preserved'], instrumentalNote:['ไม่มีเสียงร้อง','No vocals'], thaiTemplate:['เนื้อไทยจากเทมเพลต','Thai template lyrics'], enTemplate:['เนื้ออังกฤษจากเทมเพลต','English template lyrics'],
  mixedTemplate:['เนื้อไทย+อังกฤษจากเทมเพลต','Thai + English template lyrics'],
  tipDraft:['ทิป: เนื้อร้องเป็นจุดเริ่มต้น ปรับคำให้ตรงเรื่องของคุณก่อนนำไปใช้ใน Suno','Tip: Use the draft as a starting point. Adjust the wording to your story before pasting into Suno.'],
  tipInstrumental:['ทิป: ใน Suno เปิด Instrumental แล้ววางแท็กโครงเพลงหรือเว้นช่อง Lyrics ว่างได้','Tip: In Suno, turn on Instrumental, then use the structure tags or leave Lyrics blank.'],
  tipOwn:['ทิป: ถ้าจะปรับเทกถัดไป ลองเปลี่ยนทีละอย่าง เช่น BPM หรือเสียงร้อง','Tip: Change one element at a time when refining a take, such as tempo or vocal delivery.'],
  lengthHelp:['ความยาวเป็นคำแนะนำในพรอมต์ ไม่ใช่เวลาที่รับประกัน','Length is a prompt target, not a guaranteed runtime.'],
  sourceBlank:['ใส่เนื้อร้องของคุณก่อนสร้างพรอมต์','Enter your lyrics before building a prompt.'], sourceOver:['เนื้อร้องยาว {0} ตัวอักษร กรุณาลดให้เหลือไม่เกิน 5,000','Lyrics are {0} characters. Shorten them to 5,000 or fewer.'],
  bpmInvalid:['ใส่ BPM เป็นจำนวนเต็ม 35–240','Enter a whole number from 35 to 240 BPM.'],
  untitledOwn:['เพลงของฉัน','My song'], restTitle:['จังหวะพักใจ','A Quiet Moment'], instrumentalTitle:['บรรเลง {0}','{0} Instrumental'],
  all:['ทั้งหมด','all fields'], copyOne:['คัดลอก {0}','Copy {0}'], copied:['คัดลอก {0} แล้ว','Copied {0}'],
  saved:['เก็บเพลงไว้ในคลังแล้ว','Saved to your library'], saving:['กำลังเก็บเพลง…','Saving…'], saveError:['ยังเก็บเพลงไม่ได้ ลองใหม่อีกครั้ง','Could not save this song. Try again.'], libraryFull:['คลังเต็มแล้ว (100 เพลง) ลบเพลงที่ไม่ใช้ก่อน','Your library is full (100 songs). Remove a song first.'],
  libraryBusy:['กำลังโหลดคลังเพลง…','Loading your library…'], libraryError:['เปิดคลังไม่สำเร็จ ลองใหม่อีกครั้ง','Could not load the library. Try again.'],
  libraryEmpty:['ยังไม่มีเพลงที่เก็บไว้ สร้างพรอมต์แล้วกด «เก็บในคลัง»','No saved songs yet. Build a prompt, then choose Save to library.'],
  libraryNone:['ไม่พบเพลงที่ตรงกับการค้นหา','No songs match your search.'], libraryCount:['{0} เพลง','{0} matches'], deleted:['ลบเพลงจากคลังแล้ว','Song removed'], deleteError:['ลบเพลงไม่ได้ ลองใหม่อีกครั้ง','Could not remove this song. Try again.'],
  unknown:['ยังไม่ระบุ','Not supplied'], vocalNone:['ไม่มีเสียงร้อง','No vocals'],
  dnaEmpty:['เพิ่มไฟล์เสียงหรือโน้ตอ้างอิง แล้วกดถอด DNA','Add an audio file or reference notes, then analyze.'],
  dnaIdle:['รอข้อมูลอ้างอิง','Waiting for a reference'], dnaBusy:['กำลังอ่านไฟล์เสียงในเครื่อง…','Analyzing the audio on your device…'], dnaDone:['รายงานจากข้อมูลอ้างอิงล่าสุด','Report from the latest reference'],
  dnaStale:['ข้อมูลเปลี่ยนแล้ว กดถอด DNA เพื่ออัปเดต','Reference changed. Analyze again to update the report.'],
  dnaMissing:['เพิ่มไฟล์เสียงหรือข้อมูลดนตรีอย่างน้อยหนึ่งอย่าง ชื่อเพลงอย่างเดียวไม่พอให้วิเคราะห์','Add audio or at least one musical detail. A title alone is not enough to analyze.'],
  dnaFailed:['เปิดไฟล์เสียงไม่ได้ ลองใช้ MP3 หรือ WAV หรือกรอกโน้ตเอง','Could not decode the audio. Try MP3 or WAV, or enter notes instead.'],
  dnaLimit:['ไฟล์เกิน 25 MB โปรดเลือกไฟล์ที่เล็กลง','File exceeds 25 MB. Choose a smaller recording.'],
  dnaTitle:['เพลงอ้างอิง','Reference track'], measured:['ความยาวไฟล์','Audio duration'], tempoEstimated:['ประมาณ {0} BPM','About {0} BPM'],
  tempoUnclear:['ไม่พบจังหวะที่สม่ำเสมอพอจะประเมิน BPM','No stable pulse detected; BPM could not be estimated.'], tempoManual:['{0} BPM · จากข้อมูลที่กรอก','{0} BPM · provided by you'],
  tempoVariable:['ความเร็วต่างกันในแต่ละช่วง ({0}–{1} BPM) ไม่เลือกค่าเดียวให้','Sections suggest different tempos ({0}–{1} BPM). No single tempo was chosen.'],
  tempoAgreement:['ความสอดคล้องของจังหวะ','Pulse consistency'], tempoStrong:['สูง','High'], tempoFair:['ปานกลาง','Moderate'], tempoWeak:['ต่ำ · ควรตรวจด้วยการฟัง','Low · check by listening'],
  tempoCoverage:['รองรับค่าหลัก {0} จาก {1} ช่วงที่ตรวจ','Main estimate supported in {0} of {1} sampled sections'],
  tempoChoose:['เลือกความเร็วที่จะใช้ในบรีฟ','Choose a tempo for the brief'], tempoAlternate:['{0} BPM · อีกแบบที่เป็นไปได้','{0} BPM · alternate pulse'], tempoPrimary:['{0} BPM · ค่าหลัก','{0} BPM · main estimate'],
  tempoAmbiguity:['สองค่านี้ต่างกัน 2 เท่า ลองฟังแล้วเลือก BPM ที่ตรงกับจังหวะที่ต้องการ','The same rhythm can be counted at either tempo. Pick the pulse that fits what you hear.'],
  tempoManualPriority:['เมื่อระบุ BPM เอง แอปจะใช้ค่าที่กรอกแทนค่าจากไฟล์','A manually entered BPM takes priority over the audio estimate.'],
  audioFacts:['วัดจากไฟล์เสียง','Measured from audio'], noteFacts:['ข้อมูลที่คุณกรอก','Your reference notes'], notesLimits:['ไม่เดาแนวเพลง เครื่องดนตรี หรือเสียงร้องจากไฟล์ และไม่ดึงเสียงจากชื่อเพลงหรือลิงก์','The app does not infer genre, instruments or vocals from audio, or fetch audio from titles or links.'],
  waveform:['รูปคลื่นเสียง','Audio waveform'], bpmSource:['จับเสียงกระทบแยกตามย่านความถี่ และเทียบสูงสุด 5 ช่วงของไฟล์','Compares rhythmic transients across frequency bands and up to five sections.'], noApply:['ยังไม่มีค่าแนวเพลง อารมณ์ เสียงร้อง BPM หรือเครื่องดนตรีที่นำไปใช้ได้','No genre, mood, vocal, BPM or instrument settings to apply yet.'],
  arrangementNotes:['โน้ตการเรียบเรียงจากเพลงอ้างอิง','Reference arrangement notes'], productionNotes:['โน้ตซาวด์จากเพลงอ้างอิง','Reference mix notes'],
  unavailable:['ไม่ระบุ','Unspecified']
};
let language = 'th';
const choose = (pair) => pair[language==='en' ? 1 : 0];
const tr = (key,...parts) => (choose(strings[key]||[key,key])).replace(/\{(\d+)\}/g,(_,i)=>parts[i] ?? '');
function translateStatic() {
  document.documentElement.lang=language;
  document.title=language==='th'?'DNA SONG AI | สตูดิโอพรอมต์ Suno':'DNA SONG AI | Suno Prompt Studio';
  for(const [attr, prop] of [['t','textContent'],['ph','placeholder'],['a11y','aria-label']]) {
    document.querySelectorAll(`[data-${attr}]`).forEach(el=>{
      const value=tr(el.dataset[attr]);
      if(prop==='aria-label') el.setAttribute(prop,value);
      else el[prop]=value;
    });
  }
  document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
}
