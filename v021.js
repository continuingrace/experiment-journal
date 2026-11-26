(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments))return;
  const e=data.experiments.find(item=>item.id==='exp-motion-harness');
  if(!e)return;
  const root='https://continuingrace.github.io/experiment-journal-public/media/';
  const files=[
    {id:'motion-cycle5-figma-board',type:'image',label:'모션 하네스 설정 · Figma 구성 시안',src:root+'cycle5-motion-figma-board.png'},
    {id:'motion-cycle5-bgm-a',type:'video',label:'모션 하네스 완성 영상',src:root+'mission-to-income-v2_2026-11-08_20-59-11.mp4'}
  ];
  const isMatchingFile=(m,item)=>String(m.src||'').split('?')[0]===item.src||m.id===item.id||
    String(m.label||'').includes(item.src.split('/').pop());
  const inScope=(m)=>files.some(item=>isMatchingFile(m,item))||
    ['motion-20261108-video','motion-cycle5-bgm-b'].includes(m.id)||
    String(m.src||'').includes('mission-to-income-v2_2026-11-08_21-00-22.mp4')||
    /mission-to-income-v2_2026-11-08_21-00-22\.mp4/i.test(String(m.label||''));
  e.media=Array.isArray(e.media)?e.media:[];
  const unrelated=e.media.filter(m=>!inScope(m));
  const current=e.media.filter(inScope);
  const ordered=files.map(item=>{
    const old=current.find(m=>isMatchingFile(m,item));
    const keep=old?{...old,...item}:item;
    delete keep.key;
    delete keep.objectUrl;
    return keep;
  });
  const updated=[...ordered,...unrelated];
  const changed=JSON.stringify(e.media.map(m=>({id:m.id,src:m.src,label:m.label})))!==
    JSON.stringify(updated.map(m=>({id:m.id,src:m.src,label:m.label})))||
    e.coverId!=='motion-cycle5-figma-board';
  e.media=updated;
  e.coverId='motion-cycle5-figma-board';
  const figma='https://www.figma.com/design/RSoltcenpXX4Wn1jn4TwdS/?node-id=872-656';
  e.resources=Array.isArray(e.resources)?e.resources:[];
  let resourceAdded=false;
  if(!e.resources.some(r=>r.url===figma)){
    e.resources.push({label:'Figma 모션 하네스 구성 시안',url:figma});resourceAdded=true;
  }
  if(changed||resourceAdded){
    if(typeof persist==='function')persist(true);
    if(typeof render==='function')render();
  }
})();