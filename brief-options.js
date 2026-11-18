'use strict';

const songIdeas = [
  {story:'night', text:['ส่งเพื่อนคนสุดท้ายขึ้นรถไฟเที่ยวดึก แล้วเดินกลับคนเดียวในเมืองที่เริ่มเงียบ','See your last friend off on a late train, then walk home through the city as it falls quiet.']},
  {story:'night', text:['ขับรถเลียบทะเลตอนฝนลง แล้วบังเอิญได้ยินเพลงที่เคยเปิดด้วยกัน','Drive along the coast in the rain and hear a song you used to play together.']},
  {story:'love', text:['สองคนทำอาหารเช้าด้วยกันในวันหยุด แม้ฝนตกจนแผนเที่ยวต้องพับไป','Make breakfast for two on a day off after the rain cancels your plans.']},
  {story:'love', text:['เขียนจดหมายสั้น ๆ ให้คนที่คอยเปิดไฟหน้าบ้านรอทุกคืน','Write a short letter to the person who always leaves the porch light on for you.']},
  {story:'love', text:['ตกหลุมรักอีกครั้งในร้านแผ่นเสียงที่กำลังจะปิดเป็นวันสุดท้าย','Fall in love again on a record shop’s last day before it closes for good.']},
  {story:'loss', text:['คืนกุญแจห้องเก่า แล้วเก็บแก้วกาแฟใบหนึ่งกลับมาเป็นของชิ้นสุดท้าย','Return the keys to the old apartment and keep one coffee cup as the last souvenir.']},
  {story:'loss', text:['เจอกล่องโปสต์การ์ดที่ไม่เคยส่ง แล้วตัดสินใจปล่อยเรื่องเก่าไป','Find a box of postcards you never sent and decide to let the old story go.']},
  {story:'onward', text:['เริ่มฝึกทักษะใหม่ทีละวัน แม้ยังทำได้ช้าแต่เริ่มเห็นความเปลี่ยนแปลง','Learn a new skill one day at a time, slowly noticing how far you have come.']},
  {story:'onward', text:['เพื่อนกลุ่มเดิมมาช่วยเปิดร้านเล็ก ๆ หลังจากที่เกือบถอดใจ','Your old friends show up to help open a little shop after you nearly give up.']},
  {story:'onward', text:['เก็บกระเป๋าไปอยู่เมืองใหม่ และสัญญากับตัวเองว่าจะไม่กลัวการเริ่มต้น','Pack a bag for a new city and promise yourself not to fear starting over.']}
];

const excludeChoices = [
  ['heavy autotune',['ออโต้จูนหนัก','Heavy autotune']],
  ['heavy distortion',['เสียงแตกหนัก','Heavy distortion']],
  ['harsh cymbals',['เสียงฉาบบาดหู','Harsh cymbals']],
  ['EDM drop',['ท่อนดรอป EDM','EDM drop']],
  ['rap',['แร็ป','Rap']]
];

const instrumentExtras = [
  ['synth pads','analog synth','handclaps'],
  ['Hammond organ','tambourine','electric piano'],
  ['electric guitar','live drums','electric bass'],
  ['808 bass','hi-hats','synth keys'],
  ['synth lead','electronic percussion','analog pads'],
  ['acoustic guitar','upright bass','brushed drums'],
  ['hand percussion','acoustic guitar','warm strings'],
  ['felt piano','cello','soft pads']
];
const instrumentLabels = {
  'bright electric piano':'เปียโนไฟฟ้าเสียงใส','electric piano':'เปียโนไฟฟ้า','rhodes electric piano':'เปียโนไฟฟ้า Rhodes',
  'acoustic piano':'เปียโนอะคูสติก','felt piano':'เปียโนเสียงนุ่ม','felt grand piano':'แกรนด์เปียโนเสียงนุ่ม',
  'synth pads':'ซินธ์แพด','analog pads':'แพดแอนะล็อก','soft pads':'แพดเสียงนุ่ม','analog synth':'ซินธ์แอนะล็อก',
  'synth lead':'ซินธ์ลีด','synth keys':'คีย์ซินธ์','sub bass':'ซับเบส','808 bass':'เบส 808','electric bass':'เบสไฟฟ้า',
  'slap bass':'สแลปเบส','upright bass':'ดับเบิลเบส','warm melodic bass':'เบสเมโลดิกโทนอุ่น',
  'acoustic guitar':'กีตาร์อะคูสติก','electric guitar':'กีตาร์ไฟฟ้า','clean electric guitar':'กีตาร์ไฟฟ้าเสียงคลีน',
  'clean rhythm guitar':'กีตาร์ริทึ่มเสียงคลีน','fingerpicked nylon-string guitar':'กีตาร์สายไนลอนเกา',
  'live drums':'กลองชุด','live drum kit':'กลองชุด','brushed drums':'กลองแปรง','brushed drum kit':'กลองชุดเล่นด้วยแปรง',
  'crisp drum machine':'ดรัมแมชชีนเสียงคม','electronic percussion':'เพอร์คัสชันไฟฟ้า','hand percussion':'เครื่องเคาะมือ',
  'handclaps':'เสียงปรบมือ','tambourine':'แทมบูรีน','hammond organ':'ออร์แกน Hammond','hi-hats':'ไฮแฮต',
  'warm strings':'เครื่องสายโทนอุ่น','cello':'เชลโล','alto saxophone':'อัลโตแซกโซโฟน','electric phin':'พิณไฟฟ้า',
  'khaen':'แคน','pong lang percussion':'โปงลาง','soft shakers':'เชกเกอร์เสียงเบา'
};

function uniqueChoices(items) {
  const seen=new Set();
  return items.filter(item=>{
    const key=item.toLowerCase();
    if(!key||seen.has(key))return false;
    seen.add(key);
    return true;
  });
}
function instrumentOptions(genre,kept=[]) {
  const group=genreGroups.findIndex(([,keys])=>keys.includes(genre));
  return uniqueChoices([...kept,...genres[genre][3].split(',').map(x=>x.trim()),
    ...(instrumentExtras[group]||[]),'piano','bass','drums']).slice(0,5);
}
function instrumentLabel(value) {
  return language==='th'&&instrumentLabels[value.toLowerCase()] || value[0].toUpperCase()+value.slice(1);
}
