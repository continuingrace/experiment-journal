(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments)) return;

  const firstExperiment={
    id:'exp0',
    num:'01',
    kicker:'WORKFLOW',
    title:'키워드 하나로 HR 인사이트 워크플로우 설계',
    date:'2026-07-14',
    summary:'HR·리더십 키워드 하나를 입력하면 전략 인사이트 문서 → Slack Canvas 반영 → 지정 채널 알림 → 대화편지체 뉴스레터 초안 → 이미지·컬러·해시태그까지 이어지는 Claude Skill 워크플로우를 만들었습니다.',
    question:'반복되는 해외 매체 리서치·구조화·Slack 공유·뉴스레터 제안을 하나의 재사용 가능한 스킬로 고정하면, 결과 편차를 줄이고 다른 팀원에게도 같은 품질로 이관할 수 있을까?',
    tried:'• 실제 키워드 Radical Integrity로 처음부터 끝까지 실전 테스트\n• HBR·Gallup·McKinsey·Russell Reynolds 등 실제 아티클과 검증된 통계만 수집\n• 강조 부호 제거, 통계 옆 출처 하이퍼링크, 검색결과 URL 금지 등 작성 규칙 고정\n• 최신 항목이 Slack Canvas 맨 위에 쌓이도록 반영하고 승인 후 채널 알림 발송\n• HR·중간관리자·리더 대상 대화편지체 뉴스레터 + Unsplash 이미지 3·컬러 3·해시태그 3 생성\n• CANVAS_ID·NOTIFY_CHANNEL·ORG_NAME·SIGNATURE 등 개인·조직 값을 설정 파라미터로 분리하고 insight-cowork SKILL.md로 문서화·패키징',
    friction:'문서에 적힌 도구 동작과 실제 Slack Canvas 동작이 달랐고, 검색결과 페이지 URL은 문단의 근거로 쓰기에 부정확했습니다. 캔버스 ID·채널·발신 명의를 하드코딩하면 보안과 재사용성도 떨어졌습니다.',
    applied:'Canvas 반영 전 현재 section_id를 읽고 실행 후 다시 검증하는 절차를 넣었습니다. 검색결과가 아니라 문단 주장과 가장 맞는 특정 아티클을 인라인 출처로 배치했고, 개인·조직 값은 설정값으로 분리했습니다. 캔버스 반영과 알림은 반드시 초안 승인 뒤 실행하도록 규칙화했습니다.',
    learned:'도구는 문서 설명보다 실제 실행 결과를 재검증해야 했습니다. 출처는 단순히 “검색됨”이 아니라 주장과 얼마나 정확히 맞는지가 중요했고, 개인값을 설정값으로 빼야 공유 가능한 스킬이 됩니다. 강조 부호 제거·승인 절차처럼 작은 규칙이 실제 팀 공유 품질을 크게 좌우했습니다.',
    next:'서브에이전트 병렬 조사 결합 검토 · 캔버스 반영/알림의 주간 스케줄 자동화 검토 · 실제 수신자 피드백으로 뉴스레터 톤과 이미지 규칙 보완 · Unsplash 검색 링크에서 특정 사진 URL을 확정하는 로직 고도화',
    media:[],
    coverId:null
  };

  let inserted=false;
  if(!data.experiments.some(e=>e.id==='exp0')){
    data.experiments.unshift(firstExperiment);
    active='exp0';
    inserted=true;
  }

  const canonical={
    exp0:{kicker:'WORKFLOW',title:'키워드 하나로 HR 인사이트 워크플로우 설계',date:'2026-07-14'},
    exp1:{kicker:'CONSISTENCY',title:'감정을 캐릭터로 만들며, 일관성을 설계'},
    exp2:{kicker:'IDENTITY',title:'나만의 캐릭터 IHIRI, 일상의 언어'},
    exp3:{kicker:'SYSTEM',title:'Zotero MCP로 논문·PDF 리서치 흐름 설계'}
  };

  data.experiments.forEach((e,i)=>{
    e.num=String(i+1).padStart(2,'0');
    if(canonical[e.id]) Object.assign(e,canonical[e.id]);
  });

  if(inserted||data.activeId!==active){
    data.activeId=active;
  }
  if(typeof persist==='function') persist(true);
  if(typeof render==='function') render();
})();