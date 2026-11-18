'use strict';

// Label, style, default BPM, instruments, production, optional English label, search aliases.
const genres = {
  city: ['City Pop', '1980s Japanese city pop', 108, 'bright electric piano, slap bass, clean rhythm guitar, crisp drum machine', 'a tight syncopated groove, polished stereo layering and a clear, warm mix', '', 'ซิตี้ป๊อป ซิตีป๊อป'],
  pop: ['ป๊อป', 'Contemporary pop', 116, 'bright synth keys, electric bass, crisp electronic drums', 'a clear danceable backbeat, an intimate verse and a wide hook', 'Pop'],
  indiepop: ['อินดี้ป๊อป', 'Indie pop', 110, 'jangly electric guitar, warm bass, live drums', 'a gentle pushing backbeat, close room sound and layered chorus textures', 'Indie Pop'],
  synthpop: ['ซินธ์ป๊อป', 'Synth-pop with 1980s influences', 118, 'analog polysynth, sequenced bass, drum machine', 'a straight drum machine groove, bright hooks and gated snare ambience', 'Synth-pop'],
  kpop: ['เคป๊อป', 'K-pop dance pop', 122, 'glossy synth stabs, sub bass, tight electronic drums', 'a tightly edited groove, dynamic section changes and a polished chorus', 'K-pop', 'เกาหลี'],
  tpop: ['ทีป๊อป', 'Contemporary Thai pop', 112, 'synth pads, muted guitar, punchy electronic drums', 'a clean pop backbeat, close production and an open hook', 'T-pop', 'ไทยป๊อป thai pop'],

  neo: ['Neo-soul / R&B', 'Neo-soul with modern R&B', 88, 'Rhodes electric piano, warm melodic bass, brushed drum kit', 'a loose syncopated pocket, dry upfront transients and warm analog saturation', '', 'นีโอโซล อาร์แอนด์บี'],
  gospel: ['Soul Gospel', 'Soul gospel with chamber soul influences', 86, 'acoustic piano, string quartet, handclaps, Hammond organ', 'a breathing backbeat and a dynamic, spacious room mix', '', 'โซล กอสเปล ประสานเสียง choir'],
  funk: ['ฟังก์', '1970s funk', 104, 'syncopated electric bass, muted rhythm guitar, brass stabs, tight drums', 'a sixteenth-note pocket, dry drum transients and warm tape color', 'Funk'],
  motown: ['โมทาวน์ / โซล', 'Motown-style 1960s soul', 110, 'melodic electric bass, tambourine, upright piano, brass ensemble', 'a strong backbeat, tight hand percussion and warm mono-style production', 'Motown / Soul'],
  blues: ['บลูส์', 'Electric Chicago blues', 82, 'overdriven blues guitar, harmonica, bass, live drums', 'a relaxed shuffle, call-and-response licks and a small live-room sound', 'Blues'],

  metal: ['Nu Metal', 'Nu metal with alternative metal influences', 98, 'drop-tuned electric guitars, distorted bass, punchy live drums', 'a heavy half-time pocket, a wide guitar mix and sharp dynamic contrast', '', 'นูเมทัล ร็อกหนัก'],
  altrock: ['อัลเทอร์เนทีฟร็อก', 'Alternative rock', 120, 'clean and overdriven guitars, electric bass, live drums', 'a driving backbeat, quiet-to-loud dynamics and wide guitar layers', 'Alternative Rock'],
  poprock: ['ป๊อปร็อก', 'Melodic pop rock', 122, 'crunchy rhythm guitars, electric bass, punchy drums', 'a steady backbeat, a clear lead melody and a wide chorus', 'Pop Rock'],
  poppunk: ['ป๊อปพังก์', 'Pop punk', 164, 'palm-muted power chords, picked bass, fast live drums', 'a brisk straight beat, quick section changes and raw stereo guitars', 'Pop Punk'],
  hardrock: ['ฮาร์ดร็อก', 'Guitar-driven hard rock', 116, 'overdriven guitar riffs, electric bass, big live drums', 'a muscular backbeat, a wide amp sound and a dynamic guitar break', 'Hard Rock'],
  shoegaze: ['ชูเกซ', 'Dreamy shoegaze', 108, 'layered fuzz guitars, melodic bass, live drums', 'a steady backbeat, long reverb and a dense wash of guitars', 'Shoegaze'],

  hiphop: ['ฮิปฮอป', 'Sample-based hip hop', 92, 'chopped soul samples, sub bass, drum machine', 'a laid-back drum pocket, dry snare and roomy sample texture', 'Hip-hop', 'แร็ป rap'],
  trap: ['แทรป', 'Southern trap', 142, '808 bass, rolling hi-hats, minor synth bells', 'a half-time trap groove, tight low end and sparse melodic space', 'Trap', 'แร็ป rap'],
  lofi: ['โลไฟฮิปฮอป', 'Lo-fi hip hop', 78, 'detuned electric piano, muted bass, dusty sampled drums', 'a loose swung groove, soft vinyl noise and mellow filtering', 'Lo-fi Hip-hop', 'โลไฟ lofi chillhop'],
  boom: ['บูมแบป', '1990s boom bap', 92, 'chopped jazz samples, deep bass, punchy sampled drums', 'a swung boom-bap pocket, dry snare and gritty sample color', 'Boom Bap', 'แร็ป rap'],
  drill: ['ดริลล์', 'UK drill', 142, 'sliding 808 bass, clipped drums, dark bell plucks', 'a syncopated half-time groove, austere space and strong bass movement', 'UK Drill', 'แร็ป rap'],

  disco: ['Nu-disco', 'Nu-disco with 1970s disco influences', 118, 'octave bass, muted funk guitar, string ensemble, crisp drum kit', 'a steady four-on-the-floor pulse and a clean, analog-leaning mix', '', 'ดิสโก้ นูดิสโก้'],
  house: ['Melodic House', 'Melodic house', 124, 'sidechained synth bass, plucked synth arpeggios, analog pads, electronic drums', 'a steady four-on-the-floor groove, gradual builds and a wide club mix', '', 'เฮาส์ เมโลดิกเฮาส์ edm อีดีเอ็ม'],
  techno: ['เทคโน', 'Hypnotic techno', 134, 'drum machine kick, gritty synth stab, rolling bass', 'a relentless four-on-the-floor groove, gradual filtering and a focused club mix', 'Techno', 'edm อีดีเอ็ม'],
  trance: ['แทรนซ์', 'Uplifting trance', 138, 'supersaw chords, rolling bass, gated pads, electronic drums', 'a steady four-on-the-floor drive, long builds and a wide melodic release', 'Trance', 'edm อีดีเอ็ม'],
  dnb: ['ดรัมแอนด์เบส', 'Drum and bass', 174, 'chopped breakbeat drums, deep sub bass, atmospheric synth pads', 'a fast syncopated breakbeat, tight transients and a wide sub-driven drop', 'Drum & Bass', 'dnb d&b drum and bass edm อีดีเอ็ม'],
  dubstep: ['ดับสเต็ป', 'Bass-heavy dubstep', 140, 'modulated bass synth, deep sub bass, punchy electronic drums', 'a half-time kick-snare groove, strong bass modulation and heavy drops', 'Dubstep', 'edm อีดีเอ็ม'],
  synthwave: ['ซินธ์เวฟ', 'Retro 1980s synthwave', 106, 'analog arpeggiator, sequenced bass, drum machine, sweeping pads', 'a straight driving groove, gated snare and hazy analog layers', 'Synthwave'],
  futurebass: ['ฟิวเจอร์เบส', 'Melodic future bass', 146, 'wide supersaw chords, sub bass, sharp electronic drums, pitched vocal chops', 'a bouncy half-time groove, pumping chords and melodic drops', 'Future Bass', 'edm อีดีเอ็ม'],

  bossa: ['Bossa Nova', 'Bossa nova with acoustic lounge influences', 94, 'fingerpicked nylon-string guitar, upright bass, soft shakers', 'a gently swaying pulse, steady dynamics and an intimate, organic mix', '', 'บอสซาโนวา บอสซา'],
  jazz: ['แจ๊สสวิง', 'Small-ensemble swing jazz', 132, 'upright bass, ride cymbal, acoustic piano, tenor saxophone', 'a swung pulse, space for improvisation and natural room acoustics', 'Swing Jazz', 'แจ๊ส jazz'],
  folk: ['อินดี้โฟล์ก', 'Acoustic indie folk', 90, 'fingerpicked acoustic guitar, upright bass, light percussion', 'a gently flowing pulse, close-miked acoustic detail and restrained layers', 'Indie Folk'],
  country: ['คันทรี', 'Americana country', 102, 'acoustic guitar, pedal steel, bass, brushed drums', 'a relaxed two-step groove, organic room capture and clean lead detail', 'Country'],
  acoustic: ['อะคูสติกบัลลาด', 'Acoustic ballad', 75, 'fingerpicked acoustic guitar, felt piano, cello', 'a soft pulse, natural dynamics and intimate dry production', 'Acoustic Ballad', 'อะคูสติก'],

  luk: ['ลูกทุ่ง', 'Thai luk thung ballad', 78, 'clean electric guitar, alto saxophone, warm strings, live bass', 'a gentle swaying groove, a clear lead and organic room ambience', 'Thai luk thung'],
  mor: ['หมอลำซิ่ง', 'Isan mor lam sing', 140, 'electric phin, khaen, pong lang percussion, driving drum kit', 'a quick dancing groove with a clear rhythmic pocket and a lively ensemble mix', 'Isan mor lam sing', 'อีสาน หมอลำ'],
  phuea: ['เพลงเพื่อชีวิต', 'Thai phuea chiwit folk rock', 92, 'strummed acoustic guitar, harmonica, electric bass, live drums', 'an earthy backbeat, an open live-room sound and story-first phrasing', 'Thai Folk Rock', 'เพื่อชีวิต phleng phuea chiwit'],
  lukk: ['ลูกกรุง', 'Vintage Thai luk krung', 80, 'acoustic piano, upright bass, lush strings, brushed drums', 'a subtle ballroom sway, graceful phrasing and warm vintage room ambience', 'Thai luk krung'],
  reggae: ['เร็กเก้', 'Roots reggae', 82, 'offbeat rhythm guitar, organ bubble, deep bass, rim-click drums', 'a relaxed one-drop groove, open dynamics and warm tape ambience', 'Roots Reggae', 'เรกเก้'],
  reggaeton: ['เร็กเกตอน', 'Latin reggaeton', 96, 'dembow drum machine, deep bass, plucked synth, hand percussion', 'a tight dembow groove, clear low end and a hook-forward mix', 'Reggaeton', 'ละติน'],

  ambient: ['Ambient', 'Ambient downtempo', 70, 'soft analog pads, felt piano, muted electronic percussion', 'a sparse steady pulse, slow textural changes and long reverb tails', '', 'แอมเบียนต์ บรรยากาศ'],
  cinematic: ['ซาวด์แทร็กภาพยนตร์', 'Cinematic score', 86, 'low strings, felt piano, cinematic percussion, soft pads', 'a gradual dynamic build, long phrases and a deep orchestral space', 'Cinematic Score', 'ประกอบหนัง soundtrack film'],
  piano: ['เปียโนเดี่ยว', 'Solo neoclassical piano', 68, 'felt grand piano, subtle pedal resonance', 'a free-flowing pulse, natural dynamics and an intimate room sound', 'Solo Piano', 'เปียโน คลาสสิก'],
  orchestral: ['ออร์เคสตราคลาสสิก', 'Classical orchestral', 96, 'bowed strings, woodwinds, French horns, timpani', 'a flowing pulse, expressive dynamics and natural concert hall depth', 'Classical Orchestral', 'คลาสสิก วงออร์เคสตรา']
};

const genreGroups = [
  [['ป๊อป','Pop'], ['city','pop','indiepop','synthpop','kpop','tpop']],
  [['โซล อาร์แอนด์บี และบลูส์','Soul, R&B & blues'], ['neo','gospel','funk','motown','blues']],
  [['ร็อกและเมทัล','Rock & metal'], ['metal','altrock','poprock','poppunk','hardrock','shoegaze']],
  [['ฮิปฮอปและแร็ป','Hip-hop & rap'], ['hiphop','trap','lofi','boom','drill']],
  [['อิเล็กทรอนิกส์และแดนซ์','Electronic & dance'], ['disco','house','techno','trance','dnb','dubstep','synthwave','futurebass']],
  [['แจ๊ส โฟล์ก และอะคูสติก','Jazz, folk & acoustic'], ['bossa','jazz','folk','country','acoustic']],
  [['เพลงไทยและเวิลด์มิวสิก','Thai & world'], ['luk','mor','phuea','lukk','reggae','reggaeton']],
  [['ภาพยนตร์และคลาสสิก','Film & classical'], ['ambient','cinematic','piano','orchestral']]
];

const genreLabel = key => genres[key] ? (language==='en'&&genres[key][5] || genres[key][0]) : '';
function genreSearchKey(value) {
  return value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu,'');
}
function genreMatches(key, query, group=[]) {
  const g=genres[key];
  if(!g)return false;
  const text=[g[0],g[1],g[5],g[6],...group].filter(Boolean).map(genreSearchKey);
  const words=query.trim().split(/\s+/).map(genreSearchKey).filter(Boolean);
  return words.every(word=>text.some(value=>value.includes(word)));
}
