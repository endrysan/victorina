'use strict';

const QUIZ_MODE_KEY='viktorin-play-mode-v1';
let preferredQuizMode='standard';
try{if(localStorage.getItem(QUIZ_MODE_KEY)==='easy')preferredQuizMode='easy'}catch(e){}
function readQuizMode(){try{const value=localStorage.getItem(QUIZ_MODE_KEY);if(value==='easy'||value==='standard')preferredQuizMode=value}catch(e){}return preferredQuizMode}
function isEasyRound(){return (state.active?.mode||'easy')==='easy'}
function correctCountText(n){const t=n%100,u=n%10;return `Вы ответили правильно на ${n} ${t>=11&&t<=14?'вопросов':u===1?'вопрос':u>=2&&u<=4?'вопроса':'вопросов'}`}

const AWARD_BOOKS = {"miles": {"title": "Майлз и Найлз", "reward": "Мастер розыгрышей", "icon": "✎", "ids": ["mn001", "mn002", "mn003", "mn004", "mn005", "mn006", "mn007", "mn008", "mn009", "mn010", "mn011", "mn012", "mn013", "mn014", "mn015", "mn016", "mn017", "mn018", "mn019", "mn020", "mn021", "mn022", "mn023", "mn024", "mn025", "mn026", "mn027", "mn028", "mn029", "mn030", "mn031", "mn032", "mn033", "mn034", "mn035", "mn036", "mn037", "mn038", "mn039", "mn040", "mn041", "mn042", "mn043", "mn044", "mn045", "mn046", "mn047", "mn048", "mn049", "mn050"], "storage": "miles-niles-quiz-v1-miles"}, "montague": {"title": "Дядюшка Монтегю", "reward": "Хранитель страшных историй", "icon": "🕯", "ids": ["q001", "q002", "q003", "q004", "q005", "q006", "q007", "q008", "q009", "q010", "q011", "q012", "q013", "q014", "q015", "q016", "q017", "q018", "q019", "q020", "q021", "q022", "q023", "q024", "q025", "q026", "q027", "q028", "q029", "q030", "q031", "q032", "q033", "q034", "q035", "q036", "q037", "q038", "q039", "q040", "q041", "q042", "q043", "q044", "q045", "q046", "q047", "q048", "q049", "q050", "q051", "q052", "q053", "q054", "q055", "q056", "q057", "q058", "q059", "q060", "q061", "q062", "q063", "q064", "q065", "q066", "q067", "q068", "q069", "q070", "q071", "q072", "q073", "q074", "q075", "q076", "q077", "q078", "q079", "q080", "q081", "q082", "q083", "q084", "q085", "q086", "q087", "q088", "q089", "q090", "q091", "q092", "q093", "q094", "q095", "q096", "q097", "q098", "q099", "q100", "q101", "q102", "q103", "q104", "q105", "q106", "q107", "q108", "q109", "q110", "q111", "q112", "q113", "q114", "q115", "q116", "q117", "q118", "q119", "q120", "q121", "q122", "q123", "q124", "q125", "q126", "q127", "q128", "q129", "q130", "q131", "q132", "q133", "q134", "q135", "q136", "q137", "q138", "q139", "q140", "q141", "q142", "q143", "q144", "q145", "q146", "q147", "q148", "q149", "q150", "q151", "q152", "q153", "q154", "q155", "q156", "q157", "q158", "q159", "q160", "q161", "q162", "q163", "q164", "q165", "q166", "q167", "q168", "q169"], "storage": "priestley-quiz-v2-montague"}, "white": {"title": "Женщина в белом", "reward": "Знаток ночного поезда", "icon": "🚂", "ids": ["q170", "q171", "q172", "q173", "q174", "q175", "q176", "q177", "q178", "q179", "q180", "q181", "q182", "q183", "q184", "q185", "q186", "q187", "q188", "q189", "q190", "q191", "q192", "q193", "q194", "q195", "q196", "q197", "q198", "q199", "q200", "q201", "q202", "q203", "q204", "q205", "q206", "q207", "q208", "q209", "q210", "q211", "q212", "q213", "q214", "q215", "q216", "q217", "q218", "q219", "q220", "q221", "q222", "q223", "q224", "q225", "q226", "q227", "q228", "q229", "q230", "q231", "q232", "q233", "q234", "q235", "q236", "q237", "q238", "q239", "q240", "q241", "q242", "q243", "q244", "q245", "q246", "q247", "q248", "q249", "q250", "q251", "q252", "q253", "q254", "q255", "q256", "q257", "q258", "q259", "q260", "q352", "q353", "q354", "q355", "q356", "q357", "q358", "q359", "q360", "q361", "q362", "q363", "q364", "q365", "q366", "q367", "q368", "q369", "q370", "q371", "q372", "q373", "q374", "q375", "q376", "q377", "q378", "q379", "q380", "q381", "q382", "q383", "q384", "q385", "q386", "q387", "q388", "q389", "q390", "q391", "q392", "q393", "q394", "q395", "q396", "q397", "q398", "q399", "q400", "q401"], "storage": "priestley-quiz-v2-white"}, "ship": {"title": "Чёрный корабль", "reward": "Знаток морских тайн", "icon": "⚓", "ids": ["q261", "q262", "q263", "q264", "q265", "q266", "q267", "q268", "q269", "q270", "q271", "q272", "q273", "q274", "q275", "q276", "q277", "q278", "q279", "q280", "q281", "q282", "q283", "q284", "q285", "q286", "q287", "q288", "q289", "q290", "q291", "q292", "q293", "q294", "q295", "q296", "q297", "q298", "q299", "q300", "q301", "q302", "q303", "q304", "q305", "q306", "q307", "q308", "q309", "q310", "q311", "q312", "q313", "q314", "q315", "q316", "q317", "q318", "q319", "q320", "q321", "q322", "q323", "q324", "q325", "q326", "q327", "q328", "q329", "q330", "q331", "q332", "q333", "q334", "q335", "q336", "q337", "q338", "q339", "q340", "q341", "q342", "q343", "q344", "q345", "q346", "q347", "q348", "q349", "q350", "q351", "q402", "q403", "q404", "q405", "q406", "q407", "q408", "q409", "q410", "q411", "q412", "q413", "q414", "q415", "q416", "q417", "q418", "q419", "q420", "q421", "q422", "q423", "q424", "q425", "q426", "q427", "q428", "q429", "q430", "q431", "q432", "q433", "q434", "q435", "q436", "q437", "q438", "q439", "q440", "q441", "q442", "q443", "q444", "q445", "q446", "q447", "q448", "q449", "q450", "q451"], "storage": "priestley-quiz-v2-ship"}, "intercom": {"title": "Похититель домофонов", "reward": "Знаток весёлых историй", "icon": "⌕", "ids": ["ic001", "ic002", "ic003", "ic004", "ic005", "ic006", "ic007", "ic008", "ic009", "ic010", "ic011", "ic012", "ic013", "ic014", "ic015", "ic016", "ic017", "ic018", "ic019", "ic020", "ic021", "ic022", "ic023", "ic024", "ic025", "ic026", "ic027", "ic028", "ic029", "ic030", "ic031", "ic032", "ic033", "ic034", "ic035", "ic036", "ic037", "ic038", "ic039", "ic040", "ic041", "ic042", "ic043", "ic044", "ic045", "ic046", "ic047", "ic048", "ic049", "ic050", "ic051"], "storage": "intercom-quiz-v1-intercom"}};
// Накопительные знания и награды, общие для страниц одного браузера.
const awardMemory={};
const AWARD_KEY='viktorin-book-awards-v1-';
const AWARD_GRADES=['','Бронзовая медаль','Серебряная медаль','Золотая медаль'];
const AWARD_EMOJI=['○','🥉','🥈','🥇'];
function awardRead(key){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):null}catch(e){return null}}
function awardWrite(id,data){awardMemory[id]=data;try{localStorage.setItem(AWARD_KEY+id,JSON.stringify(data))}catch(e){}}
function awardState(id){return awardRead(AWARD_BOOKS[id].storage)}
function awardSync(id,quizState){
 const meta=AWARD_BOOKS[id],valid=new Set(meta.ids),old=awardRead(AWARD_KEY+id)||awardMemory[id]||{};
 const mastered=Array.isArray(old.mastered)?old.mastered:[];
 const s=quizState===undefined?awardState(id):quizState;
 const seen=s&&s.seen?(Array.isArray(s.seen)?s.seen:Object.values(s.seen).flat()):[];
 const data={mastered:[...new Set([...mastered,...seen])].filter(x=>valid.has(x)),notified:Number.isInteger(old.notified)?Math.max(0,Math.min(3,old.notified)):0};
 data.started=old.started===true||data.mastered.length>0||!!(s&&s.active&&Array.isArray(s.active.ids)&&s.active.ids.length);
 awardWrite(id,data);return data;
}
function awardProgress(id,quizState){
 const data=awardSync(id,quizState),total=AWARD_BOOKS[id].ids.length,n=data.mastered.length;
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
function renderCatalogAwards(){
 for(const id of Object.keys(AWARD_BOOKS)){
  const el=document.getElementById('award-'+id);if(el)el.innerHTML=awardMarkup(id);
 }
 const summary=document.getElementById('tales-completed');
 if(summary){const progress=['montague','white','ship'].map(id=>awardProgress(id));const started=progress.some(p=>p.data.started);summary.parentElement.hidden=!started;summary.textContent=started?`Пройдено ${progress.filter(p=>p.tier===3).length} из 3 книг`:''}
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
const supportLink=document.getElementById('support-link');
if(SUPPORT_URL.trim())supportLink.href=SUPPORT_URL.trim();
else supportLink.onclick=e=>e.preventDefault();

const names={1:'Лёгкий',2:'Средний',3:'Сложный'};
const SCENES={"montague": "<img src=\"assets/skazki-scene-1.webp\" width=\"1536\" height=\"1024\" alt=\"\" decoding=\"async\">", "white": "<img src=\"assets/skazki-scene-2.webp\" width=\"1536\" height=\"1024\" alt=\"\" decoding=\"async\">", "ship": "<img src=\"assets/skazki-scene-3.webp\" width=\"1536\" height=\"1024\" alt=\"\" decoding=\"async\">"};
const BOOKS={
 montague:{title:'дядюшки Монтегю',tab:'Дядюшка Монтегю',intro:'Тропа привела вас к старому дому.<br>Войдите — и узнайте, что вы запомнили.'},
 white:{title:'Женщины в белом',tab:'Женщина в белом',intro:'Поезд замер среди ночи.<br>Попутчица готова рассказать свою историю.'},
 ship:{title:'с Чёрного корабля',tab:'Чёрный корабль',intro:'За окнами бушует шторм.<br>Прислушайтесь к историям незнакомого моряка.'}
};
let memoryOnly=false,timer=null,level=1,count=10,restoreFocus=null,book='montague';
const main=document.getElementById('main'),overlay=document.getElementById('overlay'),bookTabs=document.getElementById('book-tabs');
const bookMemory={};
const emptyState=()=>({review:{},version:2,seen:{1:[],2:[],3:[]},active:null,migrated:false});
let state=emptyState();
function plural(n,one,few,many){const value=Math.abs(n)%100,last=value%10;return value>=11&&value<=14?many:last===1?one:last>=2&&last<=4?few:many}
function questionWord(n){return plural(n,'вопрос','вопроса','вопросов')}
function bookQuestions(){return QUESTIONS.filter(q=>(q.book||'montague')===book)}
function storageKey(){return 'priestley-quiz-v2-'+book}
function persist(){awardSync(book,state);bookMemory[book]=state;try{localStorage.setItem(storageKey(),JSON.stringify(state));localStorage.setItem('priestley-selected-book',book)}catch(e){memoryOnly=true}}
function load(){
 state=bookMemory[book]||emptyState();
 try{
  const raw=localStorage.getItem(storageKey());let saved=raw?JSON.parse(raw):null;
  if(!saved&&book==='montague'){
   const legacy=JSON.parse(localStorage.getItem('montague-quiz-v1'));
   if(legacy&&legacy.version===1){saved=emptyState();saved.active=legacy.active;saved.migrated=true}
  }
  if(saved&&saved.version===2&&saved.seen){
   const qs=bookQuestions();state=emptyState();state.migrated=!!saved.migrated;
   for(const l of [1,2,3])state.seen[l]=Array.isArray(saved.seen[l])?[...new Set(saved.seen[l])].filter(id=>qs.some(q=>q.id===id&&q.levels.includes(l))):[];
   const a=saved.active;
   if(a&&[1,2,3].includes(a.level)&&Array.isArray(a.ids)&&a.ids.length&&new Set(a.ids).size===a.ids.length&&a.ids.every(id=>qs.some(q=>q.id===id&&q.levels.includes(a.level)))&&Number.isInteger(a.index)&&a.index>=0&&a.index<=a.ids.length&&Array.isArray(a.answers)&&a.answers.length===a.ids.length&&a.answers.every(v=>v===null||(Number.isInteger(v)&&v>=0&&v<4))){
    state.active={...a,mode:a.mode==='standard'?'standard':'easy'};
    if(!raw)a.ids.forEach((id,i)=>{const q=qs.find(q=>q.id===id);if(a.answers[i]===q.correct&&!state.seen[a.level].includes(id))state.seen[a.level].push(id);else if(a.answers[i]!==q.correct)state.seen[a.level]=state.seen[a.level].filter(x=>x!==id)});
   }
   restoreReview(saved);
  }
 }catch(e){memoryOnly=true}
 persist();
}
// Иконки монет на вкладках — те же, что на полке главной страницы.
const TAB_ICONS={
 montague:'<path d="M9 12h6v8H9zM7 21h10M12 2c1 3 4 4 2 7-1 2-4 2-5 0s2-4 3-7z"/>',
 white:'<rect x="5" y="3" width="14" height="15" rx="4"/><path d="M6 11h12M12 5v6m-4 7-3 4m11-4 3 4M8 20h8"/><circle cx="9" cy="14.5" r=".7"/><circle cx="15" cy="14.5" r=".7"/>',
 ship:'<path d="M12 2v13H4l8-13Zm2 4 6 9h-6zM3 17h18l-4 4H7z"/>'
};
function renderBooks(){
 document.body.dataset.book=book;
 bookTabs.innerHTML=Object.entries(BOOKS).map(([id,b],i)=>{
  const p=awardProgress(id,id===book?state:undefined);
  return `<button class="book-tab" data-book="${id}" aria-pressed="${id===book}"><span class="tab-info"><small>КНИГА ${i+1}</small>${b.tab}</span><span class="tab-award"><span class="tab-medal" data-tier="${p.tier}" aria-label="${AWARD_GRADES[p.tier]||'Медаль ещё не получена'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TAB_ICONS[id]||''}</svg></span><span class="tab-count">${p.n}/${p.total}</span></span></button>`;
 }).join('');
 bookTabs.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>switchBook(b.dataset.book));
}
function switchBook(id){if(!BOOKS[id]||id===book)return;clearTimeout(timer);persist();closeModal();book=id;level=1;count=10;load();renderBooks();showHome();focusHeading()}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function pool(l){return bookQuestions().filter(q=>q.levels.includes(l)&&!state.seen[l].includes(q.id))}
function focusHeading(){const h=main.querySelector('h1,h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
function showHome(){document.body.dataset.screen="home";renderBooks();clearTimeout(timer);main.innerHTML=`<div class="home"><section class="hero"><div class="eyebrow">По ту сторону знакомых историй</div><h1>Страшные сказки<br><em>${BOOKS[book].title}</em></h1><p class="intro">${BOOKS[book].intro}</p><div class="scene" aria-hidden="true">${SCENES[book]}</div><div class="caption"><span>${new Set(bookQuestions().map(q=>q.story)).size} ГЛАВ И ИСТОРИЙ</span><span>${bookQuestions().length} ${questionWord(bookQuestions().length).toUpperCase()}</span></div></section><section><div id="resume"></div><div class="setup"><div class="eyebrow">Присядьте у огня</div><h2>Вечер начинается</h2><p class="sub">Выберите сложность и длину вашего путешествия.</p><fieldset><legend><span class="num">01</span> Сложность</legend><div class="choices">${[1,2,3].map(l=>`<button class="choice" data-level="${l}" aria-pressed="${level===l}">${names[l]}<small>${['','Сюжет','Детали','Тайны'][l]}</small></button>`).join('')}</div><div class="counts">${[1,2,3].map(l=>`<span>${pool(l).length} доступно</span>`).join('')}</div></fieldset><fieldset><legend><span class="num">02</span> Количество вопросов</legend><div class="choices">${[10,25,50].map(n=>`<button class="choice" data-count="${n}" aria-pressed="${count===n}">${n}</button>`).join('')}</div></fieldset><button class="primary start" id="start" ${!level||!count?'disabled':''}><span>Начать</span><span aria-hidden="true">→</span></button><div class="award-home">${awardMarkup(book,state,false)}</div><div class="setup-bottom"><span class="eyebrow">Ваш путь сохранён</span><button class="textbtn" id="reset">Сбросить историю вопросов</button></div></div></section></div>`;

if(memoryOnly)main.insertAdjacentHTML('afterbegin','<p class="notice">Хранилище недоступно: прогресс сохраняется только до закрытия страницы.</p>');
main.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=+b.dataset.level;updateChoices()});main.querySelectorAll('[data-count]').forEach(b=>b.onclick=()=>{count=+b.dataset.count;updateChoices()});document.getElementById('start').onclick=()=>{if(state.active&&state.active.index<state.active.ids.length){modal('Начать другой раунд?','Незавершённая игра будет заменена. Верные ответы сохранятся в истории этой книги.',[{label:'Начать другой раунд',fn:()=>{state.active=null;persist();prepare()}},{label:'Продолжить текущую',fn:showQuestion}])}else prepare()};document.getElementById('reset').onclick=()=>modal('Сбросить историю вопросов?','Все вопросы этой книги на всех уровнях снова станут доступными. Её текущий раунд, результат и медали будут удалены. История других книг сохранится.',[{label:'Да, сбросить всё',fn:()=>{state=emptyState();resetBookAwards(book);persist();showHome()}},{label:'Отмена'}]);
if(state.active){const a=state.active,done=a.index>=a.ids.length;document.getElementById('resume').innerHTML=`<div class="resume">${done?'Последний раунд завершён':`Есть незавершённая игра · ${names[a.level]} · ${a.answers.filter(x=>x!==null).length} из ${a.ids.length}`}<button class="secondary" id="continue">${done?'Посмотреть результат':'Продолжить игру →'}</button></div>`;document.getElementById('continue').onclick=()=>done?showResults():showQuestion()} }
function updateChoices(){main.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.level===level)));main.querySelectorAll('[data-count]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.count===count)));document.getElementById('start').disabled=!level||!count}
function modal(title,message,actions){clearTimeout(timer);restoreFocus=document.activeElement;overlay.innerHTML=`<div class="modal-layer"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><h2 id="modal-title">${esc(title)}</h2><p>${esc(message)}</p>${actions.map((a,i)=>`<button class="${i===0?'primary':'secondary'}">${esc(a.label)}</button>`).join('')}</section></div>`;const bs=[...overlay.querySelectorAll('button')];bs.forEach((b,i)=>b.onclick=()=>{closeModal();if(actions[i].fn)actions[i].fn()});bs[0].focus();overlay.onkeydown=e=>{if(e.key==='Escape'){closeModal()}if(e.key==='Tab'){const first=bs[0],last=bs[bs.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}
function closeModal(){overlay.innerHTML='';overlay.onkeydown=null;if(restoreFocus&&restoreFocus.isConnected)restoreFocus.focus()}
function prepare(){if(!level||!count)return;const p=pool(level);if(p.length<count){const actions=[];if(p.length)actions.push({label:`Сыграть ${p.length} ${questionWord(p.length)}`,fn:()=>begin(p.length)});actions.push({label:'Сбросить историю этого уровня',fn:()=>modal('Начать историю уровня заново?',`Будет очищена история уровня «${names[level]}». История других уровней сохранится.`,[{label:'Да, сбросить этот уровень',fn:()=>{state.seen[level]=[];delete state.review[String(level)];persist();if(pool(level).length<count)modal('Коллекция ещё пополняется',`На уровне «${names[level]}» пока ${pool(level).length} ${questionWord(pool(level).length)}. Можно пройти все доступные.`,[{label:`Сыграть ${pool(level).length} ${questionWord(pool(level).length)}`,fn:()=>begin(pool(level).length)},{label:'В главное меню',fn:showHome}]);else begin(count)}},{label:'Отмена',fn:showHome}])});actions.push({label:'В главное меню',fn:showHome});modal(`${plural(p.length,'Остался','Осталось','Осталось')} только ${p.length} ${plural(p.length,'доступный вопрос','доступных вопроса','доступных вопросов')}`,`На уровне «${names[level]}» запрошено ${count}. Верно отвеченные вопросы не повторяются на том же уровне. Вопросы с ошибками доступны снова.`,actions)}else begin(count)}

function reviewHistory(scope) {
 const key=String(scope);
 return state.review[key] ||= {pending:[],recent:[]};
}
function rememberAnswer(scope,id,correct) {
 const history=reviewHistory(scope);
 history.pending=history.pending.filter(value=>value!==id);
 history.recent=history.recent.filter(value=>value!==id);
 if(!correct){history.pending.push(id);history.recent.push(id)}
}
function restoreReview(saved) {
 state.review={};
 const valid=new Set(bookQuestions().map(q=>q.id));
 if(saved.review && typeof saved.review==='object') {
  for(const [key,entry] of Object.entries(saved.review)) {
   if(!entry || !Array.isArray(entry.pending) || !Array.isArray(entry.recent))continue;
   const pending=[...new Set(entry.pending.filter(id=>valid.has(id)))];
   state.review[key]={pending,recent:[...new Set(entry.recent.filter(id=>pending.includes(id)))]};
  }
 } else if(state.active) {
  const round=state.active;
  round.ids.forEach((id,i)=>{
   if(round.answers[i]===null)return;
   const q=QUESTIONS.find(item=>item.id===id);
   rememberAnswer(round.level||'all',id,round.answers[i]===q.correct);
  });
 }
}
function drawRound(available,n,scope) {
 const history=reviewHistory(scope);
 const pending=new Set(history.pending), recent=new Set(history.recent);
 const fresh=[],older=[],previous=[];
 for(const q of available) {
  if(!pending.has(q.id))fresh.push(q.id);
  else if(recent.has(q.id))previous.push(q.id);
  else older.push(q.id);
 }
 const latest=history.pending[history.pending.length-1];
 const ordered=[...shuffle(fresh),...shuffle(older),...shuffle(previous)];
 // Последнюю ошибку ставим после остальных доступных вопросов.
 const pos=ordered.indexOf(latest);
 if(pos>=0 && ordered.length>1)ordered.push(...ordered.splice(pos,1));
 history.recent=[];
 return ordered.slice(0,n);
}

function begin(n){const ids=drawRound(pool(level),n,level);if(!ids.length)return;state.active={mode:readQuizMode(),level,requested:count,ids,index:0,answers:ids.map(()=>null)};persist();showQuestion()}
function showQuestion(){document.body.dataset.screen="quiz";clearTimeout(timer);const a=state.active;if(!a)return showHome();if(a.index>=a.ids.length)return showResults();const q=QUESTIONS.find(q=>q.id===a.ids[a.index]);persist();const chosen=a.answers[a.index],order=shuffle([0,1,2,3]);main.innerHTML=`<section class="quiz"><div class="quiz-top"><span>Вопрос ${a.index+1} из ${a.ids.length}</span><button class="textbtn" id="pause">Пауза · В меню</button></div><div class="progress" role="progressbar" aria-label="Прогресс викторины" aria-valuemin="0" aria-valuemax="${a.ids.length}" aria-valuenow="${a.index}"><i style="width:${a.index/a.ids.length*100}%"></i></div><div class="card"><div class="eyebrow">${esc(q.story)} · ${names[a.level]}</div><h2>${esc(q.question)}</h2><div class="answers">${order.map((o,i)=>`<button class="answer" data-option="${o}"><span class="letter">${['А','Б','В','Г'][i]}</span><span>${esc(q.options[o])}</span></button>`).join('')}</div><div class="feedback" role="status" aria-live="polite">Выберите один ответ.</div></div><p class="hint">Каждый ответ открывает следующую историю.</p></section>`;document.getElementById('pause').onclick=()=>{clearTimeout(timer);showHome()};main.querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>answer(+b.dataset.option));window.scrollTo(0,0);focusHeading();if(chosen!==null)reveal()}
function answer(value){const a=state.active;if(!a||a.answers[a.index]!==null)return;a.answers[a.index]=value;const q=QUESTIONS.find(q=>q.id===a.ids[a.index]);if(value===q.correct){if(!state.seen[a.level].includes(q.id))state.seen[a.level].push(q.id)}else state.seen[a.level]=state.seen[a.level].filter(id=>id!==q.id);rememberAnswer(a.level||'all',q.id,value===q.correct);persist();reveal()}
function reveal(){const a=state.active,q=QUESTIONS.find(q=>q.id===a.ids[a.index]),chosen=a.answers[a.index];if(!isEasyRound()){main.querySelectorAll('[data-option]').forEach(b=>{b.disabled=true;if(+b.dataset.option===chosen)b.classList.add('selected-answer')});main.querySelector('.feedback').textContent='Ответ принят.';clearTimeout(timer);timer=setTimeout(()=>{a.index++;persist();showQuestion()},1200);return;}main.querySelectorAll('[data-option]').forEach(b=>{const o=+b.dataset.option;b.disabled=true;b.classList.add(o===q.correct?'good':o===chosen?'bad':'dim');if(o===q.correct)b.querySelector('.letter').textContent='✓';else if(o===chosen)b.querySelector('.letter').textContent='✕'});main.querySelector('.feedback').textContent=chosen===q.correct?'Верно. Вы помните эту историю.':'Неверно. Правильный ответ отмечен галочкой.';clearTimeout(timer);timer=setTimeout(()=>{a.index++;persist();showQuestion()},1200)}
function showResults(){document.body.dataset.screen="results";clearTimeout(timer);const a=state.active;if(!a)return showHome();const qs=a.ids.map(id=>QUESTIONS.find(q=>q.id===id));const score=qs.filter((q,i)=>q.correct===a.answers[i]).length,pct=Math.round(score/qs.length*100);main.innerHTML=`<section class="results"><div class="result-hero"><div class="eyebrow">Последняя свеча ещё горит</div>${isEasyRound()?`<div class="score">${score}<small> / ${qs.length}</small></div>`:`<p class="standard-score">${correctCountText(score)}</p>`}<h2>${pct>=85?'Хранитель страшных историй':pct>=50?'Вы нашли дорогу сквозь туман':'Дом хранит ещё немало тайн'}</h2>${isEasyRound()?`<p class="sub">${pct}% верных ответов · ${names[a.level]} уровень</p>`:``}<p class="sub" style="margin-top:12px">${pct>=85?'Рассказчик оценил бы вашу память.':pct>=50?'Некоторые двери ещё предстоит открыть.':'Вернитесь к книге — и попробуйте снова.'}</p></div><div class="award-result">${awardMarkup(book,state)}</div><div class="result-actions"><button class="primary" id="again">Играть снова</button><button class="secondary" id="menu">В главное меню</button></div>${isEasyRound()?`<h2>Ваши ответы</h2>${qs.map((q,i)=>`<article class="review"><div class="eyebrow">${i+1}. ${esc(q.story)}</div><h3>${esc(q.question)}</h3><p class="${a.answers[i]===q.correct?'correct':'incorrect'}">${a.answers[i]===q.correct?'✓':'✕'} Ваш ответ: ${esc(q.options[a.answers[i]]??'Нет ответа')}</p><p class="correct">✓ Правильный ответ: ${esc(q.options[q.correct])}</p></article>`).join('')}`:``}</section>`;document.getElementById('again').onclick=()=>{level=a.level;count=a.requested||a.ids.length;prepare()};document.getElementById('menu').onclick=showHome;window.scrollTo(0,0);focusHeading();announceBookAward()}
window.addEventListener('pagehide',persist);
// Прикреплённая пользователем музыка встроена в HTML и работает без сети.
const musicButton=document.getElementById('music-toggle');
const volumeSlider=document.getElementById('music-volume');
const musicStatus=document.getElementById('music-status');
let audioCtx=null,musicBus=null,musicPlaying=false,musicBusy=false,musicVolume=.05,selectedTrack=0;
let musicGeneration=0,currentMusicGroup=null,musicClock=null,musicStopTimer=null;
let musicWanted=true,autoMusicPending=false;
const decodedTracks=new Map(),musicGroups=new Set();
function updateMusicUI(message){
 musicButton.setAttribute('aria-pressed',String(musicWanted));
 musicButton.textContent=musicBusy?'♫ Загрузка…':musicPlaying?'♫ Музыка: вкл':autoMusicPending?'♫ Музыка: готова':'♫ Музыка: выкл';
 musicButton.setAttribute('aria-label',musicWanted?'Выключить музыку':'Включить музыку');
 musicStatus.textContent=message||'';
}
function saveMusicSettings(){try{localStorage.setItem('priestley-music-volume-v2',String(musicVolume))}catch(e){}}
function createMusicGraph(){
 const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('unsupported');
 audioCtx=new Audio();musicBus=audioCtx.createGain();musicBus.gain.value=musicVolume;musicBus.connect(audioCtx.destination);
}
function decodeTrack(index){
 if(decodedTracks.has(index))return decodedTracks.get(index);
 const data=atob(TRACKS[index].data),bytes=new Uint8Array(data.length);
 for(let i=0;i<data.length;i++)bytes[i]=data.charCodeAt(i);
 // Callback-форма совместима в том числе с Safari.
 const promise=new Promise((resolve,reject)=>audioCtx.decodeAudioData(bytes.buffer,resolve,reject));
 decodedTracks.set(index,promise);promise.catch(()=>decodedTracks.delete(index));return promise;
}
function retireMusicGroup(group,instant=false){
 if(!group||group.retired)return;group.retired=true;
 const now=audioCtx.currentTime,fade=instant?0:.65;
 group.gain.gain.cancelScheduledValues(now);
 group.gain.gain.setTargetAtTime(.0001,now,instant?.001:.12);
 for(const source of group.sources){try{source.stop(now+fade)}catch(e){}}
 if(!group.sources.size){group.gain.disconnect();musicGroups.delete(group)}
}
function scheduleMusicBuffer(group,when){
 const source=audioCtx.createBufferSource();source.buffer=group.buffer;source.loop=true;source.connect(group.gain);group.sources.add(source);
 source.onended=()=>{group.sources.delete(source);source.disconnect();if(group.retired&&!group.sources.size){group.gain.disconnect();musicGroups.delete(group)}};
 source.start(when);
}
function musicTick(){
 const group=currentMusicGroup;if(!musicPlaying||!group||group.retired)return;
 if(audioCtx.state!=='running'){stopMusic(true);return}
 if(group.next<audioCtx.currentTime-.5)group.next=audioCtx.currentTime+.05;
 while(group.next<audioCtx.currentTime+.6){scheduleMusicBuffer(group,group.next);group.next=Infinity}
}
async function playSelectedTrack(){
 const generation=++musicGeneration,index=selectedTrack;
 musicBusy=true;musicButton.disabled=true;clearTimeout(musicStopTimer);updateMusicUI('Загрузка музыки…');
 try{
  if(!audioCtx||audioCtx.state==='closed'){decodedTracks.clear();createMusicGraph()}
  await audioCtx.resume();
  const buffer=await decodeTrack(index);
  if(generation!==musicGeneration)return;
  if(document.hidden||audioCtx.state!=='running')throw Error('not-running');
  const group={buffer,gain:audioCtx.createGain(),sources:new Set(),retired:false,next:audioCtx.currentTime+.04};
  group.gain.gain.value=.0001;group.gain.connect(musicBus);group.gain.gain.setTargetAtTime(1,audioCtx.currentTime,.45);musicGroups.add(group);
  retireMusicGroup(currentMusicGroup);currentMusicGroup=group;musicPlaying=true;
  clearInterval(musicClock);musicTick();musicClock=setInterval(musicTick,200);
 }catch(e){if(generation===musicGeneration){stopMusic();updateMusicUI('Звук не запустился. Нажмите «Музыка», чтобы повторить.');return}}
 finally{if(generation===musicGeneration){musicBusy=false;musicButton.disabled=false;updateMusicUI()}}
}
function stopMusic(instant=false){
 ++musicGeneration;musicPlaying=false;musicBusy=false;musicButton.disabled=false;clearInterval(musicClock);musicClock=null;clearTimeout(musicStopTimer);
 for(const group of musicGroups)retireMusicGroup(group,instant);currentMusicGroup=null;
 const generation=musicGeneration,ctx=audioCtx;
 if(ctx){if(instant){ctx.suspend().catch(()=>{})}else musicStopTimer=setTimeout(()=>{if(generation===musicGeneration&&!musicPlaying&&ctx.state==='running')ctx.suspend().catch(()=>{})},700)}
 updateMusicUI();
}
async function toggleMusic(){
 if(musicBusy)return;
 if(musicWanted&&(musicPlaying||autoMusicPending)){musicWanted=false;autoMusicPending=false;stopMusic();return}
 musicWanted=true;autoMusicPending=false;await playSelectedTrack();
}
function armAutoMusic(){
 if(!musicWanted||document.hidden||musicPlaying||musicBusy)return;
 autoMusicPending=true;updateMusicUI();
 try{
  if(!audioCtx||audioCtx.state==='closed'){decodedTracks.clear();createMusicGraph()}
  audioCtx.resume().then(()=>{
   if(autoMusicPending&&musicWanted&&!document.hidden&&!musicPlaying&&!musicBusy&&audioCtx.state==='running'){
    autoMusicPending=false;playSelectedTrack();
   }
  }).catch(()=>{});
 }catch(e){autoMusicPending=false;musicWanted=false;updateMusicUI()}
}
function startMusicOnGesture(e){
 if(!autoMusicPending||!musicWanted||document.hidden||musicBusy||musicPlaying)return;
 if(e.target&&e.target.closest&&e.target.closest('#music-toggle'))return;
 if(e.type==='keydown'&&e.key!=='Enter'&&e.key!==' ')return;
 autoMusicPending=false;playSelectedTrack();
}
document.addEventListener('click',startMusicOnGesture);
document.addEventListener('keydown',startMusicOnGesture);
musicButton.onclick=toggleMusic;
volumeSlider.oninput=()=>{musicVolume=Math.max(.01,Math.min(.65,Number(volumeSlider.value)/100));if(musicBus&&audioCtx)musicBus.gain.setTargetAtTime(musicVolume,audioCtx.currentTime,.08);saveMusicSettings()};
document.addEventListener('visibilitychange',()=>{if(document.hidden){autoMusicPending=false;stopMusic(true)}else armAutoMusic()});
window.addEventListener('pagehide',()=>stopMusic(true));
function initMusic(){
 try{
  const raw=localStorage.getItem('priestley-music-volume-v2');if(raw!==null&&Number.isFinite(Number(raw)))musicVolume=Math.max(.01,Math.min(.65,Number(raw)));
 }catch(e){}
 volumeSlider.value=Math.round(musicVolume*100);updateMusicUI();armAutoMusic();
}

const TRACKS=window.SKAZKI_TRACKS||[];
function initialBook(search){
 const requested=new URLSearchParams(search).get('book');
 if(Object.prototype.hasOwnProperty.call(BOOKS,requested))return requested;
 try{const saved=localStorage.getItem('priestley-selected-book');if(Object.prototype.hasOwnProperty.call(BOOKS,saved))return saved}catch(e){}
 return 'montague';
}
document.addEventListener('DOMContentLoaded',()=>{book=initialBook(window.location.search);load();renderBooks();showHome();initMusic()});
// Банк вопросов. correct — индекс в options, начиная с 0.
// Банк: q001–q451. Следующий свободный ID: q452. Поле book разделяет три книги.
// Для расширения добавляйте новые объекты перед закрывающей скобкой массива.
const QUESTIONS=window.QUIZ_QUESTIONS_skazki||[];
