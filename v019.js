(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments))return;
  const record=data.experiments.find(e=>e.id==='exp-motion-harness');
  if(!record)return;
  const cleanSummary='사이클 5에서 모션 하네스를 설정하고, 이를 활용해 약 29초 분량의 영상을 제작해 제출했습니다.';
  const bgm='AI 음악 생성 도구로 BGM 샘플을 만들고 직접 들어본 뒤, 추가하고 싶은 요소를 요청하며 수정';
  let changed=false;
  let summary=String(record.summary||'');
  if(/Mission to Income/i.test(summary)){
    summary=summary.replace(/사이클 5에서 모션 하네스를 만들고, 이를 활용한 약 29초 분량의 영상 「Mission to Income」을 제작해 제출했습니다\./g,cleanSummary)
      .replace(/「Mission to Income」/gi,'영상').replace(/Mission to Income/gi,'');
    record.summary=summary.replace(/\s{2,}/g,' ').trim();changed=true;
  }
  if(!String(record.tried||'').includes('BGM')){
    const old=String(record.tried||'').trim();
    record.tried=old+(old?'\n':'')+'• '+bgm;changed=true;
  }
  if(!String(record.learned||'').includes('배경음악')){
    record.learned=String(record.learned||'').trim()+' 영상과 배경음악 샘플을 확인하고 원하는 부분을 피드백하며 완성도를 높이는 과정을 경험했습니다.';
    changed=true;
  }
  for(const media of record.media||[]){
    const old=String(media.label||'');
    const label=old.replace(/Mission to Income/gi,'모션 하네스 결과 영상');
    if(label!==old){media.label=label;changed=true}
  }
  if(changed){if(typeof persist==='function')persist(true);if(typeof render==='function')render()}
})();