// Медали книг серии на странице каталога: читает прогресс из localStorage,
// размеры банков и иконки — из реестра questions/index.js (window.QUIZ_SERIES).
// Значок появляется, когда викторину хотя бы раз запускали; монетка окрашивается
// в цвет заработанной медали (бронза/серебро/золото).
(function(){
'use strict';
const AWARD_KEY='viktorin-book-awards-v1-';
const GRADES=['','Бронзовая медаль','Серебряная медаль','Золотая медаль'];
function read(key){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):null}catch(e){return null}}
function progress(id,total){
 if(!total)return null;
 const award=read(AWARD_KEY+id)||{};
 const state=read('hp-quiz-v1-'+id)||{};
 const mastered=Array.isArray(award.mastered)?award.mastered:[];
 const seen=state.seen?(Array.isArray(state.seen)?state.seen:Object.values(state.seen).flat()):[];
 let n=[...new Set([...mastered,...seen])].length;if(n>total)n=total;
 const started=award.started===true||n>0||!!(state.active&&Array.isArray(state.active.ids)&&state.active.ids.length);
 const tier=n>=total?3:n>=Math.ceil(total*.8)?2:n>=Math.ceil(total*.5)?1:0;
 return {n,total,tier,started};
}
function render(){
 const series=window.QUIZ_SERIES||[];
 for(const s of series){
  const card=document.querySelector(`a.book[href="${s.url}"]`);
  if(!card)continue;
  const top=card.querySelector('.book-top');
  if(!top)continue;
  const old=top.querySelector('.book-medal');if(old)old.remove();
  if(!s.total)continue;
  const p=progress(s.id,s.total);
  if(!p||!p.started)continue;
  const grade=p.tier?GRADES[p.tier]:'Медаль ещё не получена';
  const detail=`${s.tab} · ${grade} · ${p.n}/${p.total}`;
  const badge=document.createElement('span');
  badge.className='book-medal';
  badge.dataset.tier=p.tier;
  badge.title=detail;
  badge.setAttribute('aria-label',detail);
  badge.innerHTML=`<span class="medal-coin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${s.icon||''}</svg></span><span class="medal-count">${p.n}/${p.total}</span>`;
  top.appendChild(badge);
 }
}
render();
window.addEventListener('pageshow',render);
window.addEventListener('storage',render);
})();
