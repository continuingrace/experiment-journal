(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments)) return;
  const KEY='experiment-journal-cycle4-harness-v2';

  const harnessCopy={
    kicker:'HARNESS SYSTEM',
    title:'디자인·웹앱 검수 하네스 2종 만들기',
    summary:'디자인 제작과 웹앱 검수에서 기준이 흔들리지 않도록, 목적이 다른 하네스 2종을 만들었습니다.',
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
  let first=data.experiments.find(match06)||null;
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
    first=merged;

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

  const harness=()=>data.experiments.find(e=>e.cycle==='04'&&(/HARNESS/i.test(e.kicker||'')||/하네스/i.test(e.title||'')))||data.experiments.find(match06);

  function resourceHTML(item){
    const links=Array.isArray(item?.resources)?item.resources:[];
    if(!links.length)return '';
    return '<div class="experiment-resources"><div class="experiment-resources-title">관련 자료</div><div class="experiment-resources-list">'+links.map(link=>'<a href="'+esc(link.url)+'" target="_blank" rel="noopener noreferrer">'+esc(link.label)+' <span aria-hidden="true">↗</span></a>').join('')+'</div></div>';
  }

  function mountResources(){
    const item=harness();if(!item)return;
    const section=document.getElementById(item.id),body=section?.querySelector('.body');if(!body)return;
    body.querySelector('.experiment-resources')?.remove();
    const lead=body.querySelector('.lead');
    if(lead)lead.insertAdjacentHTML('afterend',resourceHTML(item));
  }

  function rebuildCycleGroups(){
    const root=document.getElementById('sections');if(!root)return;
    root.querySelectorAll(':scope > .cycle-group').forEach(group=>{
      const sections=Array.from(group.children).filter(el=>el.classList?.contains('section'));
      sections.forEach(section=>root.insertBefore(section,group));
      group.remove();
    });
    const ordered=data.experiments.map(e=>document.getElementById(e.id)).filter(Boolean);
    const groups=[];
    for(const section of ordered){
      const item=data.experiments.find(e=>e.id===section.id);if(!item)continue;
      const cycle=item.cycle||'01';
      let group=groups.find(g=>g.cycle===cycle);
      if(!group){group={cycle,sections:[]};groups.push(group)}
      group.sections.push(section);
    }
    for(const entry of groups){
      const group=document.createElement('div');group.className='cycle-group';group.dataset.cycle=entry.cycle;
      const topic=data.overview?.cycleTopics?.[entry.cycle]||'';
      const heading=document.createElement('div');heading.className='cycle-group-heading';heading.innerHTML='<strong>[사이클 '+Number(entry.cycle)+']'+(topic?' '+esc(topic):'')+'</strong>';
      group.appendChild(heading);
      root.insertBefore(group,entry.sections[0]);
      entry.sections.forEach(section=>group.appendChild(section));
    }
  }

  function ensureCycle4Editor(){
    const block=document.getElementById('cycleTopicEditor');
    if(!block||block.querySelector('[data-cycle-topic="04"]'))return;
    const field=document.createElement('div');field.className='field';field.innerHTML='<label>사이클 04 주제</label><input data-cycle-topic="04" value="'+esc(data.overview?.cycleTopics?.['04']||'하네스 만들기')+'">';
    block.appendChild(field);
    const input=field.querySelector('input');
    input.oninput=()=>{data.overview=data.overview||{};data.overview.cycleTopics=data.overview.cycleTopics||{};data.overview.cycleTopics['04']=input.value;if(typeof persist==='function')persist(true);rebuildCycleGroups()};
  }

  const style=document.createElement('style');
  style.textContent='.experiment-resources{margin:24px 0 0;padding:20px;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.62)}.experiment-resources-title{margin-bottom:12px;font-size:12px;line-height:18px;font-weight:750;color:var(--muted);letter-spacing:.04em}.experiment-resources-list{display:flex;flex-wrap:wrap;gap:8px}.experiment-resources-list a{display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:8px 12px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--ink);font-size:13px;line-height:20px;text-decoration:none}.experiment-resources-list a:hover{text-decoration:underline}@media(max-width:760px){.experiment-resources{padding:16px}.experiment-resources-list{display:grid;grid-template-columns:1fr}.experiment-resources-list a{border-radius:14px}}';
  document.head.appendChild(style);

  const previousSections=sections;
  sections=()=>{previousSections();setTimeout(()=>{rebuildCycleGroups();mountResources();ensureCycle4Editor()},0)};
  const overviewEditor=document.getElementById('overviewEditor');
  if(overviewEditor)new MutationObserver(()=>setTimeout(ensureCycle4Editor,0)).observe(overviewEditor,{childList:true,subtree:true});

  if(typeof render==='function')render();
  setTimeout(()=>{rebuildCycleGroups();mountResources();ensureCycle4Editor()},0);
})();