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

(()=>{
  const OVERVIEW_KEY='experiment-journal-overview-v1';
  const nl=String.fromCharCode(10);
  const defaults={
    hero:['허들링클럽을 통해 배우고 얻은 것을 사이클 실험 미션을 통해 시도하면서','날마다 변화하고 파도 같이 새로운 것이 쏟아지는 AI 시대에','불안이 아닌 파도타기를 하듯 역량을 기르고 성장하고 있어요.','','지금까지 실험한 결과물들을 정리해 보았습니다.'].join(nl),
    changedLead:'처음에는 반복 업무를 AI와 함께 굴리는 구조를 만들었고, 이후에는 결과의 일관성과 정체성을 설계하고, 지금은 지식 흐름까지 연결하고 있습니다.',
    changedBody:'WORKFLOW → CONSISTENCY → IDENTITY → SYSTEM. 도구는 계속 바뀌지만, 문제를 작게 정의하고 실제로 실행해 보고 규칙을 남긴 뒤 다음 업무로 확장하는 방식은 점점 제 것이 되어가고 있습니다.',
    principleLabel:'나만의 기준',
    principle:['모든 파도를 따라잡을 필요는 없다.','계속 타보면서 나만의 균형을 찾으면 된다.'].join(nl),
    style:{letterSpacing:'0.02',lineHeight:'1.35',fontSize:'56',fontWeight:'400'}
  };
  let overview=structuredClone(defaults);
  try{
    const saved=JSON.parse(localStorage.getItem(OVERVIEW_KEY)||'null');
    if(saved) overview=Object.assign({},overview,saved,{style:Object.assign({},overview.style,saved.style||{})});
  }catch{}
  if(data.overview) overview=Object.assign({},overview,data.overview,{style:Object.assign({},overview.style,data.overview.style||{})});
  data.overview=overview;
  const text=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value||''};
  function syncOverview(){
    text('heroCopy',overview.hero);
    text('overviewChangedLead',overview.changedLead);
    text('overviewChangedBody',overview.changedBody);
    text('overviewPrincipleLabel',overview.principleLabel);
    text('overviewPrincipleText',overview.principle);
    const s=overview.style;
    document.documentElement.style.setProperty('--overview-letter-spacing',s.letterSpacing+'em');
    document.documentElement.style.setProperty('--overview-line-height',s.lineHeight);
    document.documentElement.style.setProperty('--overview-font-size',s.fontSize+'px');
    document.documentElement.style.setProperty('--overview-font-weight',s.fontWeight);
  }
  function updateOutput(key,value){
    const out=document.querySelector('[data-overview-output="'+key+'"]');
    if(!out)return;
    out.textContent=key==='letterSpacing'?Number(value).toFixed(2)+'em':key==='lineHeight'?Number(value).toFixed(2):key==='fontSize'?value+'px':value;
  }
  function buildEditor(){
    const el=document.getElementById('overviewEditor');if(!el)return;
    const s=overview.style;
    el.innerHTML='<div class="overview-editor-title">페이지 문구와 글자 스타일</div>'+ '<div class="field"><label>메인 소개 문구</label><textarea data-overview-k="hero">'+esc(overview.hero)+'</textarea></div>'+ '<div class="field"><label>What changed 문장</label><textarea data-overview-k="changedLead">'+esc(overview.changedLead)+'</textarea></div>'+ '<div class="field"><label>What changed 설명</label><textarea data-overview-k="changedBody">'+esc(overview.changedBody)+'</textarea></div>'+ '<div class="field"><label>기준 제목</label><input data-overview-k="principleLabel" value="'+esc(overview.principleLabel)+'"></div>'+ '<div class="field"><label>기준 문장</label><textarea data-overview-k="principle">'+esc(overview.principle)+'</textarea></div>'+ '<div class="overview-style-title">큰 문장 스타일</div>'+ '<div class="style-control"><span>자간 <output data-overview-output="letterSpacing">'+Number(s.letterSpacing).toFixed(2)+'em</output></span><input type="range" min="-0.04" max="0.12" step="0.01" value="'+esc(s.letterSpacing)+'" data-overview-k="letterSpacing"></div>'+ '<div class="style-control"><span>행간 <output data-overview-output="lineHeight">'+Number(s.lineHeight).toFixed(2)+'</output></span><input type="range" min="1" max="2.2" step="0.05" value="'+esc(s.lineHeight)+'" data-overview-k="lineHeight"></div>'+ '<div class="style-control"><span>글자 크기 <output data-overview-output="fontSize">'+esc(s.fontSize)+'px</output></span><input type="range" min="28" max="76" step="1" value="'+esc(s.fontSize)+'" data-overview-k="fontSize"></div>'+ '<div class="style-control"><span>글자 굵기 <output data-overview-output="fontWeight">'+esc(s.fontWeight)+'</output></span><select data-overview-k="fontWeight"><option value="300"'+(s.fontWeight==='300'?' selected':'')+'>가늘게</option><option value="400"'+(s.fontWeight==='400'?' selected':'')+'>보통</option><option value="500"'+(s.fontWeight==='500'?' selected':'')+'>중간</option><option value="600"'+(s.fontWeight==='600'?' selected':'')+'>굵게</option><option value="700"'+(s.fontWeight==='700'?' selected':'')+'>아주 굵게</option></select></div>'+ '<button class="btn primary" id="overviewSave" type="button">소개와 스타일 저장</button>';
    el.querySelectorAll('[data-overview-k]').forEach(input=>input.oninput=()=>{
      const key=input.dataset.overviewK;
      if(['letterSpacing','lineHeight','fontSize','fontWeight'].includes(key))overview.style[key]=input.value;else overview[key]=input.value;
      updateOutput(key,input.value);syncOverview();
    });
    document.getElementById('overviewSave').onclick=()=>{data.overview=overview;localStorage.setItem(OVERVIEW_KEY,JSON.stringify(overview));persist();toast('소개와 스타일이 저장되었습니다')};
  }
  function setMode(mode){
    const isOverview=mode==='overview';
    document.getElementById('editor').hidden=isOverview;
    document.getElementById('overviewEditor').hidden=!isOverview;
    document.getElementById('manager').hidden=isOverview;
    document.querySelector('.upload').hidden=isOverview;
    document.getElementById('save').hidden=isOverview;
    document.getElementById('experimentTab').classList.toggle('active',!isOverview);
    document.getElementById('overviewTab').classList.toggle('active',isOverview);
    if(isOverview)buildEditor();
    syncOverview();
  }
  function init(){
    if(!document.getElementById('overviewEditor'))return;
    const style=document.createElement('style');style.id='overview-editor-style';style.textContent='.overview-copy{white-space:pre-line;letter-spacing:var(--overview-letter-spacing,0em);line-height:var(--overview-line-height,1.35);font-weight:var(--overview-font-weight,400)}.overview-big{font-size:var(--overview-font-size,clamp(32px,4.4vw,72px))!important}.panel-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:18px 0 12px}.panel-tabs .tab{margin:0}.panel-tabs .tab.active{background:#252723;color:#f5f2ea}.overview-editor-title,.overview-style-title{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#71808b;margin:16px 0 10px}.overview-editor-title{margin-top:0}.overview-style-title{padding-top:10px;border-top:1px solid #d8d5cc}.style-control{margin:12px 0}.style-control span{display:flex;justify-content:space-between;font-size:12px;color:#596875;margin-bottom:6px}.style-control output{color:#252723;font-variant-numeric:tabular-nums}.style-control input[type=range]{width:100%;accent-color:#252723}.style-control select{width:100%}#overviewEditor textarea{min-height:78px}#overviewEditor .field{margin-bottom:12px}#overviewEditor #overviewSave{width:100%;margin-top:12px}';document.head.appendChild(style);
    document.getElementById('experimentTab').onclick=()=>setMode('experiment');
    document.getElementById('overviewTab').onclick=()=>setMode('overview');
    setMode('experiment');syncOverview();
  }
  init();
})();
