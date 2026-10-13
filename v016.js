(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments)) return;
  const KEY='experiment-journal-cycle4-harness-v3';

  const harnessCopy={
    kicker:'HARNESS SYSTEM',
    title:'디자인·웹앱 검수 하네스 2종 만들기',
    summary:'AI로 디자인과 웹앱을 만들 때 무엇을 확인해야 하는지 놓치지 않도록, 목적이 다른 하네스 2종을 만들었습니다.',
    question:'AI로 디자인과 웹앱을 만들 때, 매번 같은 기준으로 확인하고 놓친 문제를 줄일 수 있을까?',
    context:'9월 무료 라이브를 참고해 PRD → 레퍼런스 → 화면 설계 → Figma 시안을 돕는 디자인 제작 하네스를 먼저 만들었습니다. 이후 사이클 4의 “나에게 딱 맞는 디자인 하네스를 직접 세팅” 실습을 따라 하며, 개인 웹앱의 반복적인 검수와 배포 과정을 위한 두 번째 하네스를 만들었습니다.',
    tried:'• 디자인 제작 하네스: 작업 순서를 정하고, 원본 Figma는 직접 건드리지 않도록 별도 작업 공간과 확인 절차를 구성\n• 공개용 저장소에는 조직명·내부 자료·개인정보를 제외한 사본만 정리\n• 웹앱 검수 하네스: 웹앱 검사 → 배포 확인 → 사용자 승인 → 릴리스 기록 순서로 검수 흐름 구성\n• sample-app으로 자동 검사를 돌린 뒤 아이폰에서 실제 화면과 홈 화면 설치까지 확인',
    friction:'자동 검사를 통과한 sample-app도 아이폰에서 보니 간격과 글자 위계가 어색했습니다. 검수 결과에 처음 보는 용어도 많아, Codex에 하나씩 물어보며 실제 의미와 결과를 확인해야 했습니다.',
    applied:'첫 모바일 검수는 승인하지 않고 화면과 검사 기준을 다시 보완했습니다. 이후 자동 테스트 261개 통과, 의도적으로 만든 오류 10개 차단, 아이폰 모바일·홈 화면 설치 확인, 민감정보 검사 0건을 확인하고 sample-app 1.0.1을 릴리스했습니다. 이후 실제 웹앱 사본에 적용하면서 외부 폰트 URL의 숫자를 앱 버전으로 잘못 읽는 문제와 고정된 아이콘 경로만 검사하던 한계도 찾아 하네스를 보완했습니다.',
    learned:'자동 테스트를 통과했다고 해서 바로 완성된 것은 아니었습니다. 실제 기기에서 직접 보고 사람이 승인하는 단계가 함께 있어야 놓친 문제를 줄일 수 있었습니다. 하네스는 AI가 대신 판단하는 도구라기보다, 확인할 순서와 기준을 빠뜨리지 않게 도와주는 체크 시스템에 가까웠습니다.',
    next:'전체 디자인 기준을 더 적용한 뒤, 실제 프로젝트에서 공식 재검수하기',
    resources:[
      {label:'디자인 제작 하네스',url:'https://github.com/continuingrace/cit-design-harness'},
      {label:'웹앱 검수 하네스',url:'https://github.com/continuingrace/re-webapp-factory-harness'},
      {label:'검증 페이지',url:'https://continuingrace.github.io/re-webapp-factory-harness/fixtures/sample-app/'}
    ]
  };

  const match06=e=>String(e?.num)==='06'||/QA SYSTEM|HARNESS/i.test(String(e?.kicker||''))||/하네스/i.test(String(e?.title||''));
  const match07=e=>String(e?.num)==='07'||/GOVERNANCE/i.test(String(e?.kicker||''));
  let first=data.experiments.find(match06)||null;
  const second=data.experiments.find(match07)||null;

  if(!localStorage.getItem(KEY)){
    const merged=first||{id:'exp-harness-system',num:'06',date:'2026-10-05',media:[],coverId:null};
    const media=[];
    const seen=new Set();
    for(const source of [first,second]) for(const item of source?.media||[]){
      const key=item.id||item.src||item.label;
      if(key&&!seen.has(key)){seen.add(key);media.push(item)}
    }
    Object.assign(merged,harnessCopy,{num:'06',cycle:'04'});
    merged.date=first?.date||second?.date||merged.date||'2026-10-05';
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