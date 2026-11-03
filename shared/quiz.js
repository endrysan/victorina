
'use strict';
// Настройки конкретной страницы приходят из window.QUIZ_CONFIG (см. оболочку книги).
const CFG=window.QUIZ_CONFIG||{};
// Общий режим показа ответов: standard — без подсветки и разбора, easy — прежнее поведение.
const QUIZ_MODE_KEY='viktorin-play-mode-v1';
let preferredQuizMode='standard';
try{if(localStorage.getItem(QUIZ_MODE_KEY)==='easy')preferredQuizMode='easy'}catch(e){}
function readQuizMode(){try{const value=localStorage.getItem(QUIZ_MODE_KEY);if(value==='easy'||value==='standard')preferredQuizMode=value}catch(e){}return preferredQuizMode}
function isEasyRound(){return (state.active?.mode||'easy')==='easy'}
function correctCountText(n){const t=n%100,u=n%10;return `Вы ответили правильно на ${n} ${t>=11&&t<=14?'вопросов':u===1?'вопрос':u>=2&&u<=4?'вопроса':'вопросов'}`}
const AWARD_BOOKS={};
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
const SCENES={};
const BOOKS={};
let memoryOnly=false,timer=null,level=1,count=10,restoreFocus=null,book=CFG.book||'hp1';
const main=document.getElementById('main'),overlay=document.getElementById('overlay'),bookTabs=document.getElementById('book-tabs');
const bookMemory={};
const emptyState=()=>({review:{},version:2,seen:{1:[],2:[],3:[]},active:null,migrated:false});
let state=emptyState();
function plural(n,one,few,many){const value=Math.abs(n)%100,last=value%10;return value>=11&&value<=14?many:last===1?one:last>=2&&last<=4?few:many}
function questionWord(n){return plural(n,'вопрос','вопроса','вопросов')}
function bookQuestions(){return QUESTIONS.filter(q=>(q.book||CFG.book)===book)}
function storageKey(){return 'hp-quiz-v1-'+book}
function persist(){awardSync(book,state);bookMemory[book]=state;try{localStorage.setItem(storageKey(),JSON.stringify(state));localStorage.setItem('hp-selected-book',book)}catch(e){memoryOnly=true}}
function load(){
 state=bookMemory[book]||emptyState();
 try{
  const raw=localStorage.getItem(storageKey());let saved=raw?JSON.parse(raw):null;

  if(saved&&saved.version===2&&saved.seen){
   const qs=bookQuestions();state=emptyState();state.migrated=!!saved.migrated;
   for(const l of [1,2,3])state.seen[l]=Array.isArray(saved.seen[l])?[...new Set(saved.seen[l])].filter(id=>qs.some(q=>q.id===id&&q.levels.includes(l))):[];
   const a=saved.active;
   if(a&&[1,2,3].includes(a.level)&&Array.isArray(a.ids)&&a.ids.length&&new Set(a.ids).size===a.ids.length&&a.ids.every(id=>qs.some(q=>q.id===id&&q.levels.includes(a.level)))&&Number.isInteger(a.index)&&a.index>=0&&a.index<=a.ids.length&&Array.isArray(a.answers)&&a.answers.length===a.ids.length&&a.answers.every(v=>v===null||(Number.isInteger(v)&&v>=0&&v<4))){
    state.active=a;
    if(!raw)a.ids.forEach((id,i)=>{const q=qs.find(q=>q.id===id);if(a.answers[i]===q.correct&&!state.seen[a.level].includes(id))state.seen[a.level].push(id);else if(a.answers[i]!==q.correct)state.seen[a.level]=state.seen[a.level].filter(x=>x!==id)});
   }
   restoreReview(saved);
  }
 }catch(e){memoryOnly=true}
 persist();
}
function renderBooks(){
 document.body.dataset.book=book;
 if(!bookTabs)return;
 // Вкладки строятся из реестра серии (questions/index.js): у каждой книги своя страница.
 bookTabs.innerHTML=SERIES.map((s,i)=>{
  const isCurrent=s.id===book,tier=isCurrent?awardProgress(s.id,state).tier:seriesAwardTier(s);
  return `<button class="book-tab" data-book="${s.id}" aria-pressed="${isCurrent}"><small>КНИГА ${i+1}</small>${s.tab}<span class="tab-medal" aria-label="${AWARD_GRADES[tier]||'Медаль ещё не получена'}"> ${AWARD_EMOJI[tier]}</span></button>`;
 }).join('');
 bookTabs.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>{const target=SERIES.find(s=>s.id===b.dataset.book);if(target&&target.id!==book)location.href=target.url});
}
// Медаль чужой книги без загрузки её банка: читаем сохранённый прогресс и total из реестра.
function seriesAwardTier(s){
 if(!s.total)return 0;
 const stored=awardRead(AWARD_KEY+s.id),n=stored&&Array.isArray(stored.mastered)?stored.mastered.length:0;
 return n>=s.total?3:n>=Math.ceil(s.total*.8)?2:n>=Math.ceil(s.total*.5)?1:0;
}
// Реестр серии подключается отдельно: questions/index.js выставляет window.QUIZ_SERIES.
const SERIES=(window.QUIZ_SERIES&&window.QUIZ_SERIES.length?window.QUIZ_SERIES:[{id:CFG.book||'hp1',tab:CFG.tab||CFG.title||'',url:'',total:(window['QUIZ_QUESTIONS_'+(CFG.book||'hp1')]||[]).length}]);
function switchBook(id){const target=SERIES.find(s=>s.id===id);if(target&&target.url&&id!==book)location.href=target.url}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function pool(l){return bookQuestions().filter(q=>q.levels.includes(l)&&!state.seen[l].includes(q.id))}
function focusHeading(){const h=main.querySelector('h1,h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
function showHome(){document.body.dataset.screen="home";renderBooks();clearTimeout(timer);main.innerHTML=`<div class="home"><section class="hero"><div class="eyebrow">${CFG.eyebrow||''}</div><h1>Гарри Поттер и<br><em>${BOOKS[book].title}</em></h1><p class="intro">${BOOKS[book].intro}</p><div class="scene" aria-hidden="true">${SCENES[book]}</div><div class="caption"><span>${new Set(bookQuestions().map(q=>q.story)).size} ГЛАВ</span><span>${bookQuestions().length} ${questionWord(bookQuestions().length).toUpperCase()}</span></div></section><section><div id="resume"></div><div class="setup"><div class="eyebrow">Хогвартс</div><h2>Начать викторину</h2><p class="sub">Выберите сложность и длину вашего путешествия.</p><fieldset><legend><span class="num">01</span> Сложность</legend><div class="choices">${[1,2,3].map(l=>`<button class="choice" data-level="${l}" aria-pressed="${level===l}">${names[l]}<small>${['','Сюжет','Детали','Тайны'][l]}</small></button>`).join('')}</div><div class="counts">${[1,2,3].map(l=>`<span>${pool(l).length} доступно</span>`).join('')}</div></fieldset><fieldset><legend><span class="num">02</span> Количество вопросов</legend><div class="choices">${[10,25,50].map(n=>`<button class="choice" data-count="${n}" aria-pressed="${count===n}">${n}</button>`).join('')}</div></fieldset><button class="primary start" id="start" ${!level||!count?'disabled':''}><span>Начать</span><span aria-hidden="true">→</span></button><div class="award-home">${awardMarkup(book,state,false)}</div><div class="setup-bottom"><span class="eyebrow">Ваш путь сохранён</span><button class="textbtn" id="reset">Сбросить историю вопросов</button></div></div></section></div>`;

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
function showResults(){document.body.dataset.screen="results";clearTimeout(timer);const a=state.active;if(!a)return showHome();const qs=a.ids.map(id=>QUESTIONS.find(q=>q.id===id));const score=qs.filter((q,i)=>q.correct===a.answers[i]).length,pct=Math.round(score/qs.length*100);main.innerHTML=`<section class="results"><div class="result-hero"><div class="eyebrow">Раунд завершён</div>${isEasyRound()?`<div class="score">${score}<small> / ${qs.length}</small></div>`:`<p class="standard-score">${correctCountText(score)}</p>`}<h2>${pct>=85?'Знаток Хогвартса':pct>=50?'Хорошая память':'Ещё есть что вспомнить'}</h2>${isEasyRound()?`<p class="sub">${pct}% верных ответов · ${names[a.level]} уровень</p>`:`<p class="sub">${names[a.level]} уровень</p>`}<p class="sub" style="margin-top:12px">${pct>=85?CFG.praise||'Вы отлично помните эту книгу.':pct>=50?'Некоторые двери ещё предстоит открыть.':'Вернитесь к книге — и попробуйте снова.'}</p></div><div class="award-result">${awardMarkup(book,state)}</div><div class="result-actions"><button class="primary" id="again">Играть снова</button><button class="secondary" id="menu">В главное меню</button></div><p class="history-note">Вопросы с ошибками вернутся после новых.</p>${isEasyRound()?`<h2>Ваши ответы</h2>${qs.map((q,i)=>`<article class="review"><div class="eyebrow">${i+1}. ${esc(q.story)}</div><h3>${esc(q.question)}</h3><p class="${a.answers[i]===q.correct?'correct':'incorrect'}">${a.answers[i]===q.correct?'✓':'✕'} Ваш ответ: ${esc(q.options[a.answers[i]]??'Нет ответа')}</p><p class="correct">✓ Правильный ответ: ${esc(q.options[q.correct])}</p><p class="sub">${esc(q.explanation)}</p></article>`).join('')}`:''}</section>`;document.getElementById('again').onclick=()=>{level=a.level;count=a.requested||a.ids.length;prepare()};document.getElementById('menu').onclick=showHome;window.scrollTo(0,0);focusHeading();announceBookAward()}
window.addEventListener('pagehide',persist);
// Музыка живёт в assets/music/tracks.js и работает без сети.
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
function saveMusicSettings(){try{localStorage.setItem('hp-series-volume-v1',String(musicVolume))}catch(e){}}
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
  const raw=localStorage.getItem('hp-series-volume-v1');if(raw!==null&&Number.isFinite(Number(raw)))musicVolume=Math.max(.01,Math.min(.65,Number(raw)));
 }catch(e){}
 volumeSlider.value=Math.round(musicVolume*100);updateMusicUI();armAutoMusic();
}

// Треки подключаются отдельно: assets/music/tracks.js выставляет window.HP_TRACKS.
const TRACKS=window.HP_TRACKS||[];
document.addEventListener('DOMContentLoaded',()=>{
 BOOKS[book]={title:CFG.title,tab:CFG.tab||CFG.title,intro:CFG.intro||''};
 SCENES[book]=`<img class="book-image" width="900" height="600" alt="${CFG.alt||CFG.title}" src="${CFG.image}">`;
 AWARD_BOOKS[book]={title:CFG.title,reward:CFG.reward||'Знаток Хогвартса',icon:'✦',ids:QUESTIONS.map(q=>q.id),storage:storageKey()};
 if(!QUESTIONS.length){renderBooks();main.innerHTML=`<div class="home"><section class="hero"><div class="eyebrow">${CFG.eyebrow||''}</div><h1>Гарри Поттер и<br><em>${BOOKS[book].title}</em></h1><p class="intro">${BOOKS[book].intro}</p><div class="scene" aria-hidden="true">${SCENES[book]}</div></section><section><p class="notice">Вопросы для этой книги ещё в работе — загляните позже.</p></section></div>`;initMusic();return}
 load();renderBooks();showHome();initMusic()
});
// Банк вопросов подключается до движка: questions/<книга>.js выставляет window.QUIZ_QUESTIONS_<книга>.
const QUESTIONS=window['QUIZ_QUESTIONS_'+CFG.book]||[];

