(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments)) return;
  const KEY='experiment-journal-cycle4-harness-v1';

  const harnessCopy={
    kicker:'HARNESS SYSTEM',
    title:'디자인·웹앱 QA 하네스 2종 만들기',
    summary:'디자인 제작과 웹앱 검수에서 기준이 흔들리지 않도록, 목적이 다른 하네스 2종을 만들었습니다: CiT 디자인 하네스와 RE Webapp Factory Harness.',
    question:'AI가 작업을 돕더라도 확인하지 않은 결과를 통과시키지 않고, 원본과 품질 기준을 지키게 할 수 있을까?',
    context:'AI 도구를 활용할수록 빠르게 만드는 것만큼 검증 기준과 사람의 승인 지점을 정하는 일이 중요해졌습니다. 디자인 제작에서는 Figma 원본 보호와 디자인 시스템 준수, 웹앱에서는 배포 전·후 QA와 실제 기기 확인을 반복 가능한 구조로 만들 필요가 있었습니다.',
    tried:'• CiT 디자인 하네스: Claude는 Figma를 읽기 전용으로 점검하고, Codex는 별도 staging 파일에서만 제작하도록 역할을 분리\n• 사람이 승인한 디자인 기준을 SSOT로 두고 쓰기 전 승인과 preflight 검사를 구성\n• 웹앱 검수 하네스: 입력 확인 → 정적 검사 → 브라우저 검사 → 운영 URL 검사 → 사람 승인 → 릴리스 기록의 흐름을 설계\n• sample app 검증 페이지로 실제 QA 흐름을 테스트',
    friction:'문서에 규칙을 적는 것만으로는 실제 쓰기 권한이나 배포 품질을 보장할 수 없었습니다. 자동 검사가 확인하지 못한 항목을 통과로 추정하면 오히려 위험했고, 디자인 제작과 웹앱 검수는 필요한 권한과 판정 기준도 달랐습니다.',
    applied:'두 하네스의 역할을 분리했습니다. 디자인 하네스는 SSOT·읽기 전용 점검·staging·승인 게이트로 원본을 보호하고, 웹앱 하네스는 스크립트 판정·운영 URL 확인·실제 모바일 검수·사람 승인으로 릴리스 품질을 확인합니다. 공통 원칙은 “확인하지 않은 것은 통과가 아니다”로 두었습니다.',
    learned:'하네스는 AI를 더 많이 자동화하는 장치라기보다, 무엇을 자동화하고 어디서 사람이 확인해야 하는지 경계를 만드는 장치였습니다. 같은 QA라도 제작 보호와 릴리스 검수는 목적이 달라 각각의 하네스로 설계하는 편이 더 명확했습니다.',
    next:'• 실제 프로젝트에 적용하며 오탐과 누락 기록하기\n• 반복되는 승인·검증 단계에서 자동화할 범위와 사람이 확인할 범위를 더 명확히 하기',
    resources:[
      {label:'디자인 제작 하네스',url:'https://github.com/continuingrace/cit-design-harness'},
      {label:'웹앱 검수 하네스',url:'https://github.com/continuingrace/re-webapp-factory-harness'},
      {label:'검증 페이지',url:'https://continuingrace.github.io/re-webapp-factory-harness/fixtures/sample-app/'},
      {label:'대화 자료 · CiT 디자인 하네스',url:'https://chatgpt.com/s/cx_6acdddced38c8191ab753e648b488f39'}
    ]
  };

  const match06=e=>String(e?.num)==='06'||/QA SYSTEM|HARNESS/i.test(String(e?.kicker||''))||/하네스/i.test(String(e?.title||''));
  const match07=e=>String(e?.num)==='07'||/GOVERNANCE/i.test(String(e?.kicker||''));
  const first=data.experiments.find(match06)||null;
  const second=data.experiments.find(match07)||null;

  if(!localStorage.getItem(KEY)){
    const merged=first||{
      id:'exp-harness-system',num:'06',date:'2026-09-29',media:[],coverId:null
    };
    const media=[];
    const seen=new Set();
    for(const source of [first,second]) for(const item of source?.media||[]){
      const key=item.id||item.src||item.label;
      if(key&&!seen.has(key)){seen.add(key);media.push(item)}
    }
    Object.assign(merged,harnessCopy,{num:'06',cycle:'04'});
    merged.date=first?.date||second?.date||merged.date||'2026-09-29';
    merged.media=media.length?media:(merged.media||[]);
    merged.coverId=(first?.coverId&&merged.media.some(m=>m.id===first.coverId)?first.coverId:null)||(second?.coverId&&merged.media.some(m=>m.id===second.coverId)?second.coverId:null)||merged.media[0]?.id||null;

    data.experiments=data.experiments.filter(e=>e!==first&&e!==second);
    data.experiments.push(merged);

    const cycleById={exp0:'01','exp-design-request-tracker':'01',exp1:'02',exp2:'02',exp3:'03',[merged.id]:'04'};
    data.experiments.forEach((e,i)=>{
      e.num=String(i+1).padStart(2,'0');
      e.cycle=cycleById[e.id]||e.cycle||String(i+1).padStart(2,'0');
    });
    data.overview=data.overview||{};
    data.overview.cycleTopics=Object.assign({},data.overview.cycleTopics||{}, {'04':'하네스 만들기'});
    if(active===second?.id||!data.experiments.some(e=>e.id===active)) active=merged.id;
    data.activeId=active;
    localStorage.setItem(KEY,'1');
    if(typeof persist==='function')persist(true);
  }

  if(typeof render==='function')render();
})();