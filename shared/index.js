'use strict';

const PLAY_MODE_KEY='viktorin-play-mode-v1';
let selectedPlayMode='standard';
function renderPlayMode(){try{const saved=localStorage.getItem(PLAY_MODE_KEY);if(saved==='easy'||saved==='standard')selectedPlayMode=saved}catch(e){}const t=document.getElementById('mode-toggle');if(t){t.setAttribute('aria-checked',String(selectedPlayMode==='easy'));t.title=selectedPlayMode==='easy'?'Лёгкий — правильный ответ подсвечивается, в конце подробный разбор':'Стандартный — ответы скрыты'}}
document.getElementById('mode-toggle').onclick=()=>{selectedPlayMode=selectedPlayMode==='easy'?'standard':'easy';try{localStorage.setItem(PLAY_MODE_KEY,selectedPlayMode)}catch(e){}renderPlayMode()};
window.addEventListener('pageshow',renderPlayMode);window.addEventListener('storage',renderPlayMode);renderPlayMode();

const AWARD_BOOKS = {"miles": {"title": "Майлз и Найлз", "reward": "Мастер розыгрышей", "icon": "✎", "ids": ["mn001", "mn002", "mn003", "mn004", "mn005", "mn006", "mn007", "mn008", "mn009", "mn010", "mn011", "mn012", "mn013", "mn014", "mn015", "mn016", "mn017", "mn018", "mn019", "mn020", "mn021", "mn022", "mn023", "mn024", "mn025", "mn026", "mn027", "mn028", "mn029", "mn030", "mn031", "mn032", "mn033", "mn034", "mn035", "mn036", "mn037", "mn038", "mn039", "mn040", "mn041", "mn042", "mn043", "mn044", "mn045", "mn046", "mn047", "mn048", "mn049", "mn050"], "storage": "miles-niles-quiz-v1-miles"}, "montague": {"title": "Дядюшка Монтегю", "reward": "Хранитель страшных историй", "icon": "🕯", "ids": ["q001", "q002", "q003", "q004", "q005", "q006", "q007", "q008", "q009", "q010", "q011", "q012", "q013", "q014", "q015", "q016", "q017", "q018", "q019", "q020", "q021", "q022", "q023", "q024", "q025", "q026", "q027", "q028", "q029", "q030", "q031", "q032", "q033", "q034", "q035", "q036", "q037", "q038", "q039", "q040", "q041", "q042", "q043", "q044", "q045", "q046", "q047", "q048", "q049", "q050", "q051", "q052", "q053", "q054", "q055", "q056", "q057", "q058", "q059", "q060", "q061", "q062", "q063", "q064", "q065", "q066", "q067", "q068", "q069", "q070", "q071", "q072", "q073", "q074", "q075", "q076", "q077", "q078", "q079", "q080", "q081", "q082", "q083", "q084", "q085", "q086", "q087", "q088", "q089", "q090", "q091", "q092", "q093", "q094", "q095", "q096", "q097", "q098", "q099", "q100", "q101", "q102", "q103", "q104", "q105", "q106", "q107", "q108", "q109", "q110", "q111", "q112", "q113", "q114", "q115", "q116", "q117", "q118", "q119", "q120", "q121", "q122", "q123", "q124", "q125", "q126", "q127", "q128", "q129", "q130", "q131", "q132", "q133", "q134", "q135", "q136", "q137", "q138", "q139", "q140", "q141", "q142", "q143", "q144", "q145", "q146", "q147", "q148", "q149", "q150", "q151", "q152", "q153", "q154", "q155", "q156", "q157", "q158", "q159", "q160", "q161", "q162", "q163", "q164", "q165", "q166", "q167", "q168", "q169"], "storage": "priestley-quiz-v2-montague"}, "white": {"title": "Женщина в белом", "reward": "Знаток ночного поезда", "icon": "🚂", "ids": ["q170", "q171", "q172", "q173", "q174", "q175", "q176", "q177", "q178", "q179", "q180", "q181", "q182", "q183", "q184", "q185", "q186", "q187", "q188", "q189", "q190", "q191", "q192", "q193", "q194", "q195", "q196", "q197", "q198", "q199", "q200", "q201", "q202", "q203", "q204", "q205", "q206", "q207", "q208", "q209", "q210", "q211", "q212", "q213", "q214", "q215", "q216", "q217", "q218", "q219", "q220", "q221", "q222", "q223", "q224", "q225", "q226", "q227", "q228", "q229", "q230", "q231", "q232", "q233", "q234", "q235", "q236", "q237", "q238", "q239", "q240", "q241", "q242", "q243", "q244", "q245", "q246", "q247", "q248", "q249", "q250", "q251", "q252", "q253", "q254", "q255", "q256", "q257", "q258", "q259", "q260", "q352", "q353", "q354", "q355", "q356", "q357", "q358", "q359", "q360", "q361", "q362", "q363", "q364", "q365", "q366", "q367", "q368", "q369", "q370", "q371", "q372", "q373", "q374", "q375", "q376", "q377", "q378", "q379", "q380", "q381", "q382", "q383", "q384", "q385", "q386", "q387", "q388", "q389", "q390", "q391", "q392", "q393", "q394", "q395", "q396", "q397", "q398", "q399", "q400", "q401"], "storage": "priestley-quiz-v2-white"}, "ship": {"title": "Чёрный корабль", "reward": "Знаток морских тайн", "icon": "⚓", "ids": ["q261", "q262", "q263", "q264", "q265", "q266", "q267", "q268", "q269", "q270", "q271", "q272", "q273", "q274", "q275", "q276", "q277", "q278", "q279", "q280", "q281", "q282", "q283", "q284", "q285", "q286", "q287", "q288", "q289", "q290", "q291", "q292", "q293", "q294", "q295", "q296", "q297", "q298", "q299", "q300", "q301", "q302", "q303", "q304", "q305", "q306", "q307", "q308", "q309", "q310", "q311", "q312", "q313", "q314", "q315", "q316", "q317", "q318", "q319", "q320", "q321", "q322", "q323", "q324", "q325", "q326", "q327", "q328", "q329", "q330", "q331", "q332", "q333", "q334", "q335", "q336", "q337", "q338", "q339", "q340", "q341", "q342", "q343", "q344", "q345", "q346", "q347", "q348", "q349", "q350", "q351", "q402", "q403", "q404", "q405", "q406", "q407", "q408", "q409", "q410", "q411", "q412", "q413", "q414", "q415", "q416", "q417", "q418", "q419", "q420", "q421", "q422", "q423", "q424", "q425", "q426", "q427", "q428", "q429", "q430", "q431", "q432", "q433", "q434", "q435", "q436", "q437", "q438", "q439", "q440", "q441", "q442", "q443", "q444", "q445", "q446", "q447", "q448", "q449", "q450", "q451"], "storage": "priestley-quiz-v2-ship"}, "intercom": {"title": "Похититель домофонов", "reward": "Знаток весёлых историй", "icon": "⌕", "ids": ["ic001", "ic002", "ic003", "ic004", "ic005", "ic006", "ic007", "ic008", "ic009", "ic010", "ic011", "ic012", "ic013", "ic014", "ic015", "ic016", "ic017", "ic018", "ic019", "ic020", "ic021", "ic022", "ic023", "ic024", "ic025", "ic026", "ic027", "ic028", "ic029", "ic030", "ic031", "ic032", "ic033", "ic034", "ic035", "ic036", "ic037", "ic038", "ic039", "ic040", "ic041", "ic042", "ic043", "ic044", "ic045", "ic046", "ic047", "ic048", "ic049", "ic050", "ic051"], "storage": "intercom-quiz-v1-intercom"}, "hp1": {"title": "Философский камень", "reward": "Знаток Хогвартса", "icon": "✦", "ids": ["hp1-001", "hp1-002", "hp1-003", "hp1-004", "hp1-005", "hp1-006", "hp1-007", "hp1-008", "hp1-009", "hp1-010", "hp1-011", "hp1-012", "hp1-013", "hp1-014", "hp1-015", "hp1-016", "hp1-017", "hp1-018", "hp1-019", "hp1-020", "hp1-021", "hp1-022", "hp1-023", "hp1-024", "hp1-025", "hp1-026", "hp1-027", "hp1-028", "hp1-029", "hp1-030", "hp1-031", "hp1-032", "hp1-033", "hp1-034", "hp1-035", "hp1-036", "hp1-037", "hp1-038", "hp1-039", "hp1-040", "hp1-041", "hp1-042", "hp1-043", "hp1-044", "hp1-045", "hp1-046", "hp1-047", "hp1-048", "hp1-049", "hp1-050", "hp1-051", "hp1-052", "hp1-053", "hp1-054", "hp1-055", "hp1-056", "hp1-057", "hp1-058", "hp1-059", "hp1-060", "hp1-061", "hp1-062", "hp1-063", "hp1-064", "hp1-065", "hp1-066", "hp1-067", "hp1-068", "hp1-069", "hp1-070", "hp1-071", "hp1-072", "hp1-073", "hp1-074", "hp1-075", "hp1-076", "hp1-077", "hp1-078", "hp1-079", "hp1-080", "hp1-081", "hp1-082", "hp1-083", "hp1-084", "hp1-085", "hp1-086", "hp1-087", "hp1-088", "hp1-089", "hp1-090", "hp1-091", "hp1-092", "hp1-093", "hp1-094", "hp1-095", "hp1-096", "hp1-097", "hp1-098", "hp1-099", "hp1-100", "hp1-101", "hp1-102", "hp1-103", "hp1-104", "hp1-105", "hp1-106", "hp1-107", "hp1-108", "hp1-109", "hp1-110", "hp1-111", "hp1-112", "hp1-113", "hp1-114", "hp1-115", "hp1-116", "hp1-117"], "storage": "hp-quiz-v1-hp1"}};
// Остальные книги серии «Гарри Поттер» берём из реестра questions/index.js:
// полного списка id на главной нет, поэтому храним только total и ключ хранилища.
(window.QUIZ_SERIES||[]).forEach(s=>{if(!AWARD_BOOKS[s.id]&&s.total>0)AWARD_BOOKS[s.id]={title:s.tab,reward:'Знаток Хогвартса',icon:'✦',ids:null,total:s.total,storage:'hp-quiz-v1-'+s.id,svg:s.icon}});
// Накопительные знания и награды, общие для страниц одного браузера.
const awardMemory={};
const AWARD_KEY='viktorin-book-awards-v1-';
const AWARD_GRADES=['','Бронзовая медаль','Серебряная медаль','Золотая медаль'];
const AWARD_EMOJI=['○','🥉','🥈','🥇'];
function awardRead(key){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):null}catch(e){return null}}
function awardWrite(id,data){awardMemory[id]=data;try{localStorage.setItem(AWARD_KEY+id,JSON.stringify(data))}catch(e){}}
function awardState(id){return awardRead(AWARD_BOOKS[id].storage)}
function awardSync(id,quizState){
 const meta=AWARD_BOOKS[id],valid=meta.ids?new Set(meta.ids):null,old=awardRead(AWARD_KEY+id)||awardMemory[id]||{};
 const mastered=Array.isArray(old.mastered)?old.mastered:[];
 const s=quizState===undefined?awardState(id):quizState;
 const seen=s&&s.seen?(Array.isArray(s.seen)?s.seen:Object.values(s.seen).flat()):[];
 const data={mastered:[...new Set([...mastered,...seen])].filter(x=>!valid||valid.has(x)),notified:Number.isInteger(old.notified)?Math.max(0,Math.min(3,old.notified)):0};
 data.started=old.started===true||data.mastered.length>0||!!(s&&s.active&&Array.isArray(s.active.ids)&&s.active.ids.length);
 awardWrite(id,data);return data;
}
function awardProgress(id,quizState){
 const meta=AWARD_BOOKS[id],total=meta.ids?meta.ids.length:(meta.total||0);
 const data=awardSync(id,quizState);
 let n=data.mastered.length;if(total&&n>total)n=total;
 if(!total)return {data,n:0,total:0,tier:0,remaining:0};
 const limits=[0,Math.ceil(total*.5),Math.ceil(total*.8),total];
 const tier=n>=limits[3]?3:n>=limits[2]?2:n>=limits[1]?1:0;
 return {data,n,total,tier,remaining:tier===3?0:limits[tier+1]-n};
}
function resetBookAwards(id){awardWrite(id,{mastered:[],notified:0,started:false})}
function awardMarkup(id,quizState,withTitle=true){
 const p=awardProgress(id,quizState),meta=AWARD_BOOKS[id];
 if(!p.data.started)return '';
 const next=['До бронзы','До серебра','До золота'][p.tier];
 return `<div class="book-achievement" data-award-book="${id}" data-tier="${p.tier}"><span class="award-mini" aria-hidden="true">${AWARD_EMOJI[p.tier]}</span><div class="award-details">${withTitle?`<span class="award-book-name">${meta.title}</span>`:''}<span class="award-summary">${p.tier===3?'Книга пройдена':p.tier?AWARD_GRADES[p.tier]:'На пути к медали'} · ${p.n}/${p.total}</span><div class="award-meter" role="progressbar" aria-label="Освоено вопросов: ${meta.title}" aria-valuemin="0" aria-valuemax="${p.total}" aria-valuenow="${p.n}"><i style="width:${p.n/p.total*100}%"></i></div>${p.tier<3?`<span class="award-next">${next} — ${p.remaining}</span>`:''}</div></div>`;
}
const shelfSymbols = {
 hp1: ['Философский камень','<path d="m3 11 5-6h8l5 6-9 9zM3 11h18m-13-6 4 15 4-15"/>'],
 miles: ['Майлз и Найлз', '<path d="M5 4h13v16H5zM8 4v16m3-11h4m-4 4h4"/>'],
 montague: ['Монтегю', '<path d="M9 12h6v8H9zM7 21h10M12 2c1 3 4 4 2 7-1 2-4 2-5 0s2-4 3-7z"/>'],
 white: ['Женщина в белом', '<rect x="5" y="3" width="14" height="15" rx="4"/><path d="M6 11h12M12 5v6m-4 7-3 4m11-4 3 4M8 20h8"/><circle cx="9" cy="14.5" r=".7"/><circle cx="15" cy="14.5" r=".7"/>'],
 ship: ['Чёрный корабль', '<path d="M12 2v13H4l8-13Zm2 4 6 9h-6zM3 17h18l-4 4H7z"/>'],
 intercom: ['Похититель домофонов', '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M9 6h6m-6 3h6m-6 4h2m2 0h2m-6 4h2m2 0h2"/>']
};
function renderCatalogAwards(){
 const series=['montague','white','ship'];
 const hpSeries=(window.QUIZ_SERIES||[]).map(s=>s.id);
 let started=0,completed=0,hpStarted=0,hpCompleted=0;
 for(const id of Object.keys(AWARD_BOOKS)){
  const slot=document.getElementById('award-'+id);
  if(!slot)continue;
  const progress=awardProgress(id);
  if(!progress.data.started){slot.innerHTML='';continue;}
  const isTales=series.includes(id),isHp=hpSeries.includes(id),inSeries=isTales||isHp;
  if(isTales){started++;if(progress.tier===3)completed++;}
  if(isHp){hpStarted++;if(progress.tier===3)hpCompleted++;}
  const [label,paths]=shelfSymbols[id]||[AWARD_BOOKS[id].title,AWARD_BOOKS[id].svg||'<path d="m3 11 5-6h8l5 6-9 9zM3 11h18m-13-6 4 15 4-15"/>'];
  const grade=progress.tier?AWARD_GRADES[progress.tier]:'На пути к бронзе';
  const detail=`${AWARD_BOOKS[id].title} · ${grade} · ${progress.n}/${progress.total}`+(progress.tier===3?' · Книга пройдена':` · До следующей медали: ${progress.remaining}`);
  const icon=`<span class="shelf-coin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg></span>`;
  const contents=`${icon}<span class="shelf-count">${progress.n}/${progress.total}</span>`;
  const attrs=`class="book-achievement shelf-badge" data-award-book="${id}" data-tier="${progress.tier}" title="${detail}"`;
  const href=isHp?'harry-potter-'+id.slice(2)+'.html':'strashnye-skazki.html?book='+id;
  slot.innerHTML=inSeries?`<a ${attrs} href="${href}" aria-label="Открыть викторину. ${detail}">${contents}</a>`:`<span ${attrs} aria-label="${detail}">${contents}</span>`;
 }
 const summary=document.getElementById('tales-completed');
 if(summary){summary.parentElement.hidden=!started;summary.hidden=completed===0;summary.textContent=completed?`Пройдено ${completed} из 3 книг`:'';}
 const hpSummary=document.getElementById('hp-completed');
 if(hpSummary){hpSummary.parentElement.hidden=!hpStarted;hpSummary.hidden=hpCompleted===0;hpSummary.textContent=hpCompleted?`Пройдено ${hpCompleted} из 7 книг`:'';}
}
function announceBookAward(){
 const p=awardProgress(book,state);if(!p.tier||p.tier<=p.data.notified)return;
 p.data.notified=p.tier;awardWrite(book,p.data);
 const meta=AWARD_BOOKS[book];
 const next=p.tier===3?'Книга пройдена — на все вопросы найден правильный ответ.':`${['','До серебра','До золота'][p.tier]} осталось ${p.remaining} ${questionWord(p.remaining)}.`;
 modal(AWARD_GRADES[p.tier],`${meta.reward}! Вы освоили ${p.n} из ${p.total} вопросов по книге «${meta.title}». ${next}`,[{label:'Отлично!',fn:()=>{}}]);
 const box=overlay.querySelector('.modal');
 if(box)box.insertAdjacentHTML('afterbegin',`<div class="award-medal tier-${p.tier}" aria-hidden="true"><span>${meta.icon}</span><b>${['','III','II','I'][p.tier]}</b></div>`);
}

// Вставьте между кавычками адрес своей платёжной страницы.
const SUPPORT_URL = 'https://pay.cloudtips.ru/p/e399721e';
const support=document.getElementById('support-link');
if(SUPPORT_URL.trim())support.href=SUPPORT_URL.trim();else support.onclick=e=>e.preventDefault();
renderCatalogAwards();
window.addEventListener('pageshow',renderCatalogAwards);
window.addEventListener('storage',()=>{for(const id of Object.keys(awardMemory))delete awardMemory[id];renderCatalogAwards()});
