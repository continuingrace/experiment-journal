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

(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments)) return;
  const n=String.fromCharCode(10);
  const secondExperiment={
    id:'exp-design-request-tracker',
    num:'02',
    kicker:'DESIGN OPS',
    title:'슬랙 디자인 요청을 자동으로 관리하는 트래커 구축',
    date:'2026-07-21',
    summary:'슬랙으로 들어오는 디자인 요청을 Claude 기반 자동화 워크플로우로 연결해 접수 · 분류 · 누락 점검 · 기록 · 회고까지 자동 처리하는 디자인 요청 트래커를 구축했습니다.',
    question:'슬랙으로 들어오는 디자인 요청을 자동으로 정리하고, 필요한 정보를 빠짐없이 확인하며, 완료 후 회고까지 연결할 수 있을까?',
    tried:['트랙 B — 내 데이터 기반 반복 작업 자동화','Slack: 디자인 요청 수집 및 완료 감지','Notion: 트래커 DB 및 대시보드','Obsidian: 플레이북 · 요청 노트 · 회고 기록','Gmail: 브리핑 백업 알림'].join(n),
    friction:'기존에는 요청 내용 분류, 사용처 · 규격 · 마감일 등 누락 자료 확인, Notion 트래커 등록, 마감 일정 관리, 완료 후 회고 기록을 수동으로 처리했습니다. 되묻기와 정리 시간이 반복되면서, 내가 어떤 지점에서 계속 불편함을 느끼는지 먼저 발견하는 일이 필요했습니다.',
    applied:['Notion 트래커에 카테고리 · 요청자 · 상태 · 마감희망일 · 배정 스킬 · 누락 자료를 자동 기록했습니다.','배운 점 · 깨달은 점 · 만족한 점 · 아쉬운 점 · 도움 된 자료/소스 · 성과로 구성한 회고 6항목도 함께 축적했습니다.','미완료 작업, 마감 임박 작업(D-3), 카테고리별 누적 현황, 분기별 리뷰, 연간 리뷰를 확인하는 라이브 대시보드를 만들었습니다.','매일 오후 6시에 디자인-완료 이모지와 [디자인 최종 완료] 문구를 감지해 상태를 완료로 바꾸고, 회고가 없는 완료 건만 1회 알림하도록 했습니다.','웹툰 · 컷만화 · 카드뉴스 · insight-cowork · 일러스트 등 카테고리에 따라 기존 제작 스킬을 자동 연결했습니다.','Slack은 입력, Notion은 상태 저장, Obsidian은 규칙 · 플레이북 · 회고, Gmail은 백업 알림으로 역할을 분리했습니다.'].join(n),
    learned:['반복 업무 자체보다 내가 어떤 지점에서 반복적으로 불편함을 느끼는지 인식하는 것이 더 중요했습니다.','Claude를 단순한 도구가 아니라 역할과 규칙을 명확히 정의한 협업자로 대할수록 결과 품질이 높아졌습니다.','Notion 트래커 구조와 tracker.md를 직접 설계하며 업무 기록과 회고까지 연결하는 운영 기반을 만들 수 있었습니다.','외부 저장소에 규칙과 기록을 축적하면 세션이 바뀌어도 같은 판단 기준으로 업무를 이어갈 수 있었습니다.'].join(n),
    next:'디자인 요청 1건당 평균 내용 파악과 정리 시간을 약 5~10분 절감하고, 누락 자료 확인 항목을 표준화하며, 요청자와의 커뮤니케이션 반복 횟수를 줄이기.',
    media:[],
    coverId:null
  };
  if(!data.experiments.some(e=>e.id===secondExperiment.id)) data.experiments.splice(1,0,secondExperiment);
  data.experiments.forEach((e,i)=>e.num=String(i+1).padStart(2,'0'));
  if(typeof persist==='function') persist(true);
  if(typeof render==='function') render();
  const relabel=()=>document.querySelectorAll('.eyebrow').forEach(el=>{const next=el.textContent.replace(/^Experiment /,'사이클 실험 ');if(next!==el.textContent)el.textContent=next});
  const sectionsEl=document.getElementById('sections');
  if(sectionsEl){new MutationObserver(relabel).observe(sectionsEl,{childList:true,subtree:true});relabel()}
})();


(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments)) return;
  const assignCycles=()=>data.experiments.forEach((e,i)=>e.cycle=String(Math.floor(i/2)+1).padStart(2,'0'));
  const relabel=()=>document.querySelectorAll('#sections .eyebrow').forEach(el=>{
    const section=el.closest('.section');
    const item=section&&data.experiments.find(e=>e.id===section.id);
    if(!item)return;
    const next='사이클 실험 '+(item.cycle||'01')+' · '+item.kicker;
    if(el.textContent!==next)el.textContent=next;
  });
  assignCycles();
  if(typeof persist==='function')persist(true);
  if(typeof render==='function')render();
  const sectionsEl=document.getElementById('sections');
  if(sectionsEl){new MutationObserver(relabel).observe(sectionsEl,{childList:true,subtree:true});relabel()}
})();


(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments)) return;
  const OVERVIEW_KEY='experiment-journal-overview-v1';
  const defaults={
    changedTitle:'실험을 하며 달라진 점',
    changedLead:'반복 업무를 자동화하고, 일관성과 정체성을 설계하며, 이제는 지식의 흐름까지 연결하고 있습니다.',
    changedBody:'도구는 바뀌어도, 문제를 작게 정의하고 실행하며 나만의 기준을 남기는 방식은 점점 선명해지고 있습니다.',
    style:{letterSpacing:'0.02',lineHeight:'1.35',fontSize:'56',fontWeight:'400',fontFamily:"Noto Sans KR,Apple SD Gothic Neo,Arial,sans-serif"}
  };
  const state=data.overview||{};
  state.style=Object.assign({},defaults.style,state.style||{});
  if(state.overviewVersion!=='2'){
    state.changedTitle=defaults.changedTitle;
    state.changedLead=defaults.changedLead;
    state.changedBody=defaults.changedBody;
    state.overviewVersion='2';
  }
  data.overview=state;
  localStorage.setItem(OVERVIEW_KEY,JSON.stringify(state));
  const text=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value||''};
  const changedSection=()=>document.getElementById('overviewChangedLead')?.closest('.section');
  function applyOverview(){
    text('overviewChangedLead',state.changedLead);
    text('overviewChangedBody',state.changedBody);
    const title=changedSection()?.querySelector('.eyebrow');
    if(title)title.textContent=state.changedTitle;
    const s=state.style;
    document.documentElement.style.setProperty('--overview-letter-spacing',s.letterSpacing+'em');
    document.documentElement.style.setProperty('--overview-line-height',s.lineHeight);
    document.documentElement.style.setProperty('--overview-font-size',s.fontSize+'px');
    document.documentElement.style.setProperty('--overview-font-weight',s.fontWeight);
    document.documentElement.style.setProperty('--overview-font-family',s.fontFamily);
  }
  function output(key,value){
    const el=document.querySelector('[data-overview-output="'+key+'"]');if(!el)return;
    el.textContent=key==='letterSpacing'?Number(value).toFixed(2)+'em':key==='lineHeight'?Number(value).toFixed(2):key==='fontSize'?value+'px':key==='fontWeight'?value:'적용 중';
  }
  function buildEditorV2(){
    const el=document.getElementById('overviewEditor');if(!el)return;
    const s=state.style;
    el.innerHTML='<div class="overview-editor-title">페이지 문구와 글자 스타일</div>'+
      '<div class="field"><label>메인 소개 문구</label><textarea data-overview-v2="hero">'+esc(state.hero||'')+'</textarea></div>'+
      '<div class="field"><label>실험을 하며 달라진 점</label><textarea data-overview-v2="changedLead">'+esc(state.changedLead)+'</textarea></div>'+
      '<div class="field"><label>달라진 과정 설명</label><textarea data-overview-v2="changedBody">'+esc(state.changedBody)+'</textarea></div>'+
      '<div class="field"><label>기준 제목</label><input data-overview-v2="principleLabel" value="'+esc(state.principleLabel||'')+'"></div>'+
      '<div class="field"><label>기준 문장</label><textarea data-overview-v2="principle">'+esc(state.principle||'')+'</textarea></div>'+
      '<div class="overview-style-title">달라진 점과 기준의 글자 스타일</div>'+
      '<div class="style-control"><span>글꼴</span><select data-overview-style="fontFamily"><option value="Noto Sans KR,Apple SD Gothic Neo,Arial,sans-serif">기본 산세리프</option><option value="Malgun Gothic,Arial,sans-serif">맑은 고딕</option><option value="Arial,sans-serif">Arial</option></select></div>'+
      '<div class="style-control"><span>자간 <output data-overview-output="letterSpacing">'+Number(s.letterSpacing).toFixed(2)+'em</output></span><input type="range" min="-0.04" max="0.12" step="0.01" value="'+esc(s.letterSpacing)+'" data-overview-style="letterSpacing"></div>'+
      '<div class="style-control"><span>행간 <output data-overview-output="lineHeight">'+Number(s.lineHeight).toFixed(2)+'</output></span><input type="range" min="1" max="2.2" step="0.05" value="'+esc(s.lineHeight)+'" data-overview-style="lineHeight"></div>'+
      '<div class="style-control"><span>글자 크기 <output data-overview-output="fontSize">'+esc(s.fontSize)+'px</output></span><input type="range" min="28" max="76" step="1" value="'+esc(s.fontSize)+'" data-overview-style="fontSize"></div>'+
      '<div class="style-control"><span>글자 굵기 <output data-overview-output="fontWeight">'+esc(s.fontWeight)+'</output></span><select data-overview-style="fontWeight"><option value="300">가늘게</option><option value="400">보통</option><option value="500">중간</option><option value="600">굵게</option><option value="700">아주 굵게</option></select></div>'+
      '<button class="btn primary" id="overviewSaveV2" type="button">소개와 스타일 저장</button>';
    const family=el.querySelector('[data-overview-style="fontFamily"]');if(family)family.value=s.fontFamily;
    const weight=el.querySelector('[data-overview-style="fontWeight"]');if(weight)weight.value=s.fontWeight;
    el.querySelectorAll('[data-overview-v2]').forEach(input=>input.oninput=()=>{state[input.dataset.overviewV2]=input.value;applyOverview()});
    el.querySelectorAll('[data-overview-style]').forEach(input=>input.oninput=()=>{state.style[input.dataset.overviewStyle]=input.value;output(input.dataset.overviewStyle,input.value);applyOverview()});
    document.getElementById('overviewSaveV2').onclick=()=>{localStorage.setItem(OVERVIEW_KEY,JSON.stringify(state));data.overview=state;persist();toast('소개와 스타일이 저장되었습니다')};
  }
  function setModeV2(mode){
    const isOverview=mode==='overview';
    document.getElementById('editor').hidden=isOverview;
    document.getElementById('overviewEditor').hidden=!isOverview;
    document.getElementById('manager').hidden=isOverview;
    document.querySelector('.upload').hidden=isOverview;
    document.getElementById('save').hidden=isOverview;
    document.getElementById('experimentTab').classList.toggle('active',!isOverview);
    document.getElementById('overviewTab').classList.toggle('active',isOverview);
    if(isOverview)buildEditorV2();
    applyOverview();
  }
  const style=document.createElement('style');
  style.textContent='.overview-copy{font-family:var(--overview-font-family,Noto Sans KR,Apple SD Gothic Neo,Arial,sans-serif)}.cycle-gallery{margin:0 0 56px;padding:20px 0 0;border-top:1px solid #d8d5cc}.cycle-gallery-title{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#71808b;margin-bottom:12px}.cycle-gallery-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.cycle-gallery figure{margin:0}.cycle-gallery img,.cycle-gallery video,.cycle-image-empty{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#e7e3d9}.cycle-image-empty{display:grid;place-items:center;padding:16px;text-align:center;color:#71808b;font-size:12px}.cycle-gallery figcaption{padding-top:8px;font-size:12px;color:#596875}@media(max-width:700px){.cycle-gallery-grid{grid-template-columns:1fr 1fr;gap:8px}.cycle-gallery{margin-bottom:40px}}';
  document.head.appendChild(style);
  document.getElementById('experimentTab').onclick=()=>setModeV2('experiment');
  document.getElementById('overviewTab').onclick=()=>setModeV2('overview');
  function renderCycleGalleries(){
    const root=document.getElementById('sections');if(!root)return;
    root.querySelectorAll('.cycle-gallery').forEach(el=>el.remove());
    data.experiments.forEach((first,i)=>{
      if(i%2!==0)return;
      const second=data.experiments[i+1]||null;
      const pair=[first,second];
      const anchor=document.getElementById((second||first).id);if(!anchor)return;
      const gallery=document.createElement('div');gallery.className='cycle-gallery';
      const cycle=first.cycle||String(Math.floor(i/2)+1).padStart(2,'0');
      gallery.innerHTML='<div class="cycle-gallery-title">사이클 실험 '+cycle+' · 대표 이미지 2개</div><div class="cycle-gallery-grid">'+pair.map((item,j)=>{if(!item)return '<figure><div class="cycle-image-empty">두 번째 실험을 추가하면<br>대표 이미지가 표시됩니다.</div><figcaption>사이클 실험 '+cycle+' · 두 번째 실험</figcaption></figure>';const media=cover(item),s=src(media),visual=s?(media.type==='video'?'<video src="'+s+'" muted loop playsinline controls></video>':'<img src="'+s+'" alt="">'):'<div class="cycle-image-empty">대표 이미지를<br>추가해 주세요.</div>';return '<figure>'+visual+'<figcaption>사이클 실험 '+cycle+' · '+esc(item.kicker)+'</figcaption></figure>'}).join('')+'</div>';
      anchor.insertAdjacentElement('afterend',gallery);
    });
  }
  const originalSections=sections;
  sections=()=>{originalSections();renderCycleGalleries()};
  const originalEditor=editor;
  editor=(target='editor',mgr='manager')=>{originalEditor(target,mgr);if(target==='editor'){const upload=document.querySelector('.upload');if(upload&&!upload.querySelector('.cycle-upload-note')){const note=document.createElement('small');note.className='cycle-upload-note';note.textContent='사이클마다 각 실험의 대표 이미지를 1개씩 추가하면 아래에 이미지 2개가 함께 표시됩니다.';upload.insertBefore(note,upload.firstChild)}}};
  data.experiments.forEach((e,i)=>e.cycle=String(Math.floor(i/2)+1).padStart(2,'0'));
  sections();
  applyOverview();
})();

(()=>{
  const PUBLIC_RELEASE_URL='https://continuingrace.github.io/experiment-journal-public/';
  const style=document.createElement('style');
  style.textContent='.cycle-gallery{display:none!important}#sections .cycle-group{border-top:1px solid #d8d5cc;padding:48px 0 64px;margin:0}#sections .cycle-group:last-child{border-bottom:1px solid #d8d5cc}.cycle-group-heading{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:28px}.cycle-group-heading strong{font-size:12px;letter-spacing:.08em;color:#71808b;font-weight:600}.cycle-group-heading span{font-size:12px;color:#9a988f}.cycle-group .section{margin:0!important;padding:0 0 40px!important}.cycle-group .section+.section{padding-top:40px!important;border-top:1px solid #e2ded5}.cycle-group .section:last-child{padding-bottom:0!important}.cycle-group img,.cycle-group video{cursor:zoom-in}@media(max-width:700px){#sections .cycle-group{padding:32px 0 44px}.cycle-group-heading{margin-bottom:20px}.cycle-group .section{padding-bottom:28px!important}.cycle-group .section+.section{padding-top:28px!important}}';
  document.head.appendChild(style);
  function openMedia(media){
    let box=document.getElementById('releaseLightbox');
    if(!box){box=document.createElement('div');box.id='releaseLightbox';box.innerHTML='<button type="button" aria-label="확대 화면 닫기">×</button><div></div>';box.style.cssText='position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:rgba(20,22,19,.86);cursor:zoom-out';box.firstElementChild.style.cssText='position:absolute;top:16px;right:20px;border:0;background:none;color:#fff;font-size:36px;cursor:pointer';box.lastElementChild.style.cssText='max-width:min(1100px,92vw);max-height:88vh';document.body.appendChild(box);box.onclick=()=>box.remove()}
    const target=media.tagName==='VIDEO'?document.createElement('video'):document.createElement('img');
    target.src=media.currentSrc||media.src;target.alt=media.alt||'';target.style.cssText='display:block;max-width:100%;max-height:88vh;object-fit:contain';
    if(target.tagName==='VIDEO'){target.controls=true;target.autoplay=true;target.playsInline=true}
    box.lastElementChild.replaceChildren(target);box.style.display='grid';
  }
  function groupCycles(){
    const root=document.getElementById('sections');if(!root)return;
    root.querySelectorAll('.cycle-gallery').forEach(el=>el.remove());
    if(root.querySelector('.cycle-group'))return;
    const items=Array.from(root.children).filter(el=>/^exp/.test(el.id));
    for(let i=0;i<items.length;i+=2){
      const pair=items.slice(i,i+2);const first=data.experiments.find(e=>e.id===pair[0].id);const cycle=first?.cycle||String(Math.floor(i/2)+1).padStart(2,'0');
      const group=document.createElement('div');group.className='cycle-group';group.dataset.cycle=cycle;
      const heading=document.createElement('div');heading.className='cycle-group-heading';heading.innerHTML='<strong>사이클 실험 '+cycle+'</strong><span>실험 '+(i+1)+'–'+Math.min(i+2,items.length)+'</span>';group.appendChild(heading);
      root.insertBefore(group,pair[0]);pair.forEach(el=>group.appendChild(el));
    }
  }
  const previousSections=sections;
  sections=()=>{previousSections();setTimeout(groupCycles,0)};
  groupCycles();
  const root=document.getElementById('sections');
  if(root){root.addEventListener('click',event=>{const media=event.target.closest('img,video');if(media&&media.closest('.cycle-group'))openMedia(media)});new MutationObserver(()=>setTimeout(groupCycles,0)).observe(root,{childList:true})}
  const publish=document.getElementById('publishBtn');
  if(publish)publish.onclick=()=>window.open(PUBLIC_RELEASE_URL,'_blank','noopener');
})();
(()=>{
  const RELEASE_VERSION='0.3.0';
  const SNAPSHOT_KEY='ej-release-snapshot-v1';
  const CONFIG_KEY='ej-publish-config-v1';
  const htmlEsc=(value)=>String(value==null?'':value).replace(/[&<>"']/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const htmlText=(value)=>htmlEsc(value).replace(/\n/g,'<br>');
  const pad=(value)=>String(value).padStart(2,'0');
  const notify=(message)=>{if(typeof toast==='function')toast(message);else console.log(message)};
  const clone=(value)=>JSON.parse(JSON.stringify(value));
  const blobToDataUrl=(blob)=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob)});
  async function mediaSrc(media){
    const raw=media&&(media.src||media.url||media.data||media.dataUrl||'');
    if(!raw||String(raw).startsWith('data:'))return raw||'';
    try{const response=await fetch(raw);if(!response.ok)return raw;return await blobToDataUrl(await response.blob())}catch{return raw}
  }
  async function snapshotNow(){
    const savedAt=new Date().toISOString();
    const snapshot={savedAt,version:RELEASE_VERSION,data:clone(data)};
    const experiments=snapshot.data.experiments||[];
    for(const item of experiments){
      if(!Array.isArray(item.media))continue;
      for(const media of item.media){const src=await mediaSrc(media);if(src)media.src=src}
    }
    return snapshot;
  }
  async function saveVersion(){
    try{
      const snapshot=await snapshotNow();
      localStorage.setItem(SNAPSHOT_KEY,JSON.stringify(snapshot));
      localStorage.setItem(SNAPSHOT_KEY+':savedAt',snapshot.savedAt);
      notify('완성본이 저장되었습니다. 이제 웹페이지로 발행할 수 있습니다.');
    }catch(error){notify('완성본 저장에 실패했습니다. 이미지 용량을 확인해 주세요.');console.error(error)}
  }
  const mediaMarkup=(item)=>{
    const media=Array.isArray(item.media)?item.media:[];
    return media.map((entry)=>{const source=entry.src||entry.url||entry.data||entry.dataUrl||'';if(!source)return '';const type=entry.type==='video'||String(source).startsWith('data:video/')?'video':'img';return type==='video'?'<video src="'+htmlEsc(source)+'" controls playsinline></video>':'<img src="'+htmlEsc(source)+'" alt="'+htmlEsc(item.title||'')+'">'}).join('');
  };
  function buildReleaseHtml(snapshot){
    const info=snapshot.data||{};const overview=info.overview||{};const experiments=Array.isArray(info.experiments)?info.experiments:[];let groups='';
    for(let i=0;i<experiments.length;i+=2){
      const cycle=pad(Math.floor(i/2)+1);const pair=experiments.slice(i,i+2);let cards='';
      pair.forEach((item,index)=>{cards+='<article class="experiment"><div class="eyebrow">사이클 실험 '+cycle+' · '+htmlText(item.kicker||('실험 '+(i+index+1)))+'</div><h2>'+htmlText(item.title||'')+'</h2><p class="date">'+htmlEsc(item.date||'')+'</p><div class="media">'+mediaMarkup(item)+'</div><dl><div><dt>한 줄 요약</dt><dd>'+htmlText(item.summary||'')+'</dd></div><div><dt>질문</dt><dd>'+htmlText(item.question||'')+'</dd></div><div><dt>시도</dt><dd>'+htmlText(item.tried||'')+'</dd></div><div><dt>막힌 지점</dt><dd>'+htmlText(item.friction||'')+'</dd></div><div><dt>바꾼 점</dt><dd>'+htmlText(item.applied||'')+'</dd></div><div><dt>배운 점</dt><dd>'+htmlText(item.learned||'')+'</dd></div><div><dt>다음 실험</dt><dd>'+htmlText(item.next||'')+'</dd></div></dl></article>'});
      groups+='<section class="cycle"><header><strong>사이클 실험 '+cycle+'</strong><span>실험 '+(i+1)+'–'+Math.min(i+2,experiments.length)+'</span></header><div class="pair">'+cards+'</div></section>';
    }
    return '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>허들링클럽 1기 AI Experiment Archive · 2026</title><link rel="stylesheet" href="styles.css"></head><body><main><p class="archive">허들링클럽 1기 AI Experiment Archive · 2026</p><section class="hero"><p class="label">Riding the Wave.</p><h1>'+htmlText(overview.hero||'')+'</h1></section><section class="changed"><p class="eyebrow">'+htmlText(overview.changedTitle||'실험을 하며 달라진 점')+'</p><h2>'+htmlText(overview.changedLead||'')+'</h2><p>'+htmlText(overview.changedBody||'')+'</p></section>'+groups+'<section class="principle"><p class="eyebrow">'+htmlText(overview.principleLabel||'나만의 기준')+'</p><h2>'+htmlText(overview.principle||'')+'</h2></section><footer>저장일시 · '+htmlEsc(snapshot.savedAt)+' · '+htmlEsc(snapshot.version)+'</footer></main></body></html>';
  }
  function buildReleaseCss(){return ':root{color-scheme:light;--ink:#252723;--muted:#71808b;--line:#d8d5cc;--paper:#f5f2ea}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:Arial,"Malgun Gothic",sans-serif;line-height:1.65}main{max-width:1180px;margin:0 auto;padding:48px 6vw 96px}.archive,.label,.eyebrow{font-size:12px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase}.hero{padding:72px 0 96px;border-bottom:1px solid var(--line)}.hero h1{max-width:980px;margin:24px 0 0;font-size:clamp(34px,5vw,72px);line-height:1.35;font-weight:400;white-space:pre-line;letter-spacing:.01em}.changed{padding:72px 0;border-bottom:1px solid var(--line)}.changed h2,.principle h2{max-width:980px;margin:20px 0;font-size:clamp(26px,3.5vw,52px);line-height:1.4;font-weight:400;white-space:pre-line}.changed>p:last-child{max-width:850px;color:#596875;white-space:pre-line}.cycle{padding:64px 0;border-bottom:1px solid var(--line)}.cycle>header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:32px}.cycle>header strong{font-size:14px;letter-spacing:.08em;color:var(--muted)}.cycle>header span{font-size:12px;color:#9a988f}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px}.experiment{min-width:0}.experiment+.experiment{border-left:1px solid var(--line);padding-left:40px}.experiment h2{font-size:clamp(24px,3vw,42px);line-height:1.25;font-weight:400;margin:14px 0 8px}.date{color:var(--muted);font-size:13px}.media{display:grid;gap:12px;margin:28px 0}.media img,.media video{display:block;width:100%;max-height:560px;object-fit:contain;background:#e7e3d9}.experiment dl{margin:0}.experiment dl>div{padding:16px 0;border-top:1px solid #e2ded5}.experiment dt{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.experiment dd{margin:6px 0 0;white-space:pre-line}.principle{padding:72px 0}.principle h2{margin-bottom:0}footer{padding-top:32px;color:var(--muted);font-size:12px}@media(max-width:760px){main{padding:28px 20px 64px}.hero{padding:48px 0 64px}.pair{grid-template-columns:1fr;gap:40px}.experiment+.experiment{border-left:0;border-top:1px solid var(--line);padding:40px 0 0}.cycle{padding:48px 0}.cycle>header{margin-bottom:24px}}'}
  const utf8Base64=(value)=>btoa(unescape(encodeURIComponent(value)));
  async function github(path,options,token){
    const response=await fetch('https://api.github.com'+path,Object.assign({headers:{Accept:'application/vnd.github+json','Content-Type':'application/json','Authorization':'Bearer '+token,'X-GitHub-Api-Version':'2022-11-28'}},options||{}));
    const body=await response.json();if(!response.ok)throw new Error(body.message||('GitHub API '+response.status));return body;
  }
  async function publishVersion(){
    let snapshot=null;try{snapshot=JSON.parse(localStorage.getItem(SNAPSHOT_KEY)||'null')}catch{}
    if(!snapshot){notify('먼저 완성본 저장을 눌러 주세요.');return}
    const oldConfig=JSON.parse(localStorage.getItem(CONFIG_KEY)||'{}');
    const owner=window.prompt('GitHub 사용자 이름',oldConfig.owner||'continuingrace');if(!owner)return;
    const repo=window.prompt('공개 저장소 이름',oldConfig.repo||'experiment-journal-public');if(!repo)return;
    const token=window.prompt('GitHub Fine-grained 토큰을 입력하세요. 저장하지 않고 이번 발행에만 사용합니다.');if(!token)return;
    try{
      notify('웹페이지 발행을 준비하고 있습니다.');
      const date=new Date(snapshot.savedAt);const folder='releases/'+date.getFullYear()+'-'+pad(date.getMonth()+1)+'-'+pad(date.getDate())+'/'+pad(date.getHours())+pad(date.getMinutes())+'-v'+snapshot.version;
      const files=[{path:folder+'/index.html',content:buildReleaseHtml(snapshot)},{path:folder+'/styles.css',content:buildReleaseCss()},{path:folder+'/release.json',content:JSON.stringify(snapshot,null,2)},{path:folder+'/README.md',content:'# '+folder+'\\n\\n완성본 저장 후 웹페이지로 발행한 정적 아카이브입니다.\\n'}];
      const ref=await github('/repos/'+owner+'/'+repo+'/git/ref/heads/main',{method:'GET'},token);const parent=ref.object.sha;const commit=await github('/repos/'+owner+'/'+repo+'/git/commits/'+parent,{method:'GET'},token);const blobs=[];
      for(const file of files){const blob=await github('/repos/'+owner+'/'+repo+'/git/blobs',{method:'POST',body:JSON.stringify({content:utf8Base64(file.content),encoding:'base64'})},token);blobs.push({path:file.path,mode:'100644',type:'blob',sha:blob.sha})}
      const tree=await github('/repos/'+owner+'/'+repo+'/git/trees',{method:'POST',body:JSON.stringify({base_tree:commit.tree.sha,tree:blobs})},token);const created=await github('/repos/'+owner+'/'+repo+'/git/commits',{method:'POST',body:JSON.stringify({message:'publish: '+folder,tree:tree.sha,parents:[parent]})},token);await github('/repos/'+owner+'/'+repo+'/git/refs/heads/main',{method:'PATCH',body:JSON.stringify({sha:created.sha,force:false})},token);
      localStorage.setItem(CONFIG_KEY,JSON.stringify({owner,repo}));const url='https://'+owner+'.github.io/'+repo+'/'+folder+'/';notify('웹페이지 발행이 완료되었습니다.');window.open(url,'_blank','noopener');
    }catch(error){console.error(error);notify('발행에 실패했습니다: '+error.message)}
  }
  function mountReleaseActions(){
    const publish=document.getElementById('publishBtn');if(!publish)return;
    publish.textContent='웹페이지로 발행';publish.onclick=publishVersion;
    if(!document.getElementById('saveVersionBtn')){const save=document.createElement('button');save.id='saveVersionBtn';save.className=publish.className||'btn desktop';save.type='button';save.textContent='완성본 저장';save.onclick=saveVersion;publish.parentElement.insertBefore(save,publish)}
  }
  mountReleaseActions();
})();
