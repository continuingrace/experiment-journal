(()=> {
  if (typeof data === 'undefined') return;
  const KEY='experiment-journal-hero-copy-v0.3.50';
  if (localStorage.getItem(KEY)) return;
  data.overview=data.overview||{};
  data.overview.hero="날마다 밀려오는 파도처럼 새로운 것이 쏟아지는 AI 시대, 허들링클럽의 사이클 라이브와 실험을 통해 역량을 기르고 성장하고 있어요.\n\n지금까지 실험한 결과물들을 정리했습니다.";
  localStorage.setItem(KEY,'1');
  try{
    localStorage.setItem('experiment-journal-overview-v1',JSON.stringify(data.overview));
    if(typeof persist==='function')persist(true);
    const hero=document.getElementById('heroCopy');
    if(hero)hero.innerHTML=String(data.overview.hero).replace(/\n/g,'<br>');
  }catch(error){console.warn('v0.3.50 hero migration skipped:',error);}
})();