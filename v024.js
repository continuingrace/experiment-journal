(()=>{
  // Refine the growth review without overwriting custom review copy.
  const o=data?.overview;
  if(!o)return;
  const lead='반복 업무의 흐름을 만들고, 결과물의 일관성을 다듬으며, 리서치와 검수·모션 제작까지 실험을 확장했습니다.';
  const body='도구가 바뀌어도 문제를 정의하고, 직접 시도하고, 결과를 검토해 다음 작업에 활용하는 과정이 저만의 기준으로 쌓이고 있습니다.';
  const legacyLead=[
    '반복 업무를 AI와 함께 굴리는 구조를 만들고, 일관된 결과물을 설계하며, 정보의 흐름까지 연결하는 쪽으로 확장했습니다.',
    '처음에는 반복 업무를 AI와 함께 굴리는 구조를 만들었고, 이후에는 결과의 일관성과 정체성을 설계하고, 지금은 지식 흐름까지 연결하고 있습니다.',
    '반복 업무를 자동화하고, 일관성과 정체성을 설계하며, 이제는 지식의 흐름까지 연결하고 있습니다.'
  ];
  const legacyBody=[
    'WORKFLOW → DESIGN OPS → CONSISTENCY → IDENTITY → SYSTEM. 도구는 계속 바뀌지만, 문제를 작게 정의하고 직접 실행해 본 뒤 규칙을 남기고 다음 업무로 확장하는 방식은 점점 제 것이 되어가고 있습니다.',
    'WORKFLOW → CONSISTENCY → IDENTITY → SYSTEM. 도구는 계속 바뀌지만, 문제를 작게 정의하고 실제로 실행해 보고 규칙을 남긴 뒤 다음 업무로 확장하는 방식은 점점 제 것이 되어가고 있습니다.',
    '도구는 바뀌어도, 문제를 작게 정의하고 실행하며 나만의 기준을 남기는 방식은 점점 선명해지고 있습니다.'
  ];
  let changed=false;
  if(legacyLead.includes(String(o.changedLead||'').trim())){o.changedLead=lead;changed=true}
  if(legacyBody.includes(String(o.changedBody||'').trim())){o.changedBody=body;changed=true}
  if(changed){
    localStorage.setItem('experiment-journal-overview-v1',JSON.stringify(o));
    if(typeof persist==='function')persist(true);
  }
  const leadEl=document.getElementById('overviewChangedLead');
  const bodyEl=document.getElementById('overviewChangedBody');
  if(leadEl)leadEl.textContent=o.changedLead||'';
  if(bodyEl)bodyEl.textContent=o.changedBody||'';
  const section=leadEl?.closest('.section');
  if(section&&!section.querySelector('.ej-growth-steps')){
    const visual=document.createElement('div');
    visual.className='ej-growth-steps';
    visual.setAttribute('aria-label','실험을 통해 확장한 세 가지 영역');
    const stages=[['01','업무 흐름 설계'],['02','시각적 일관성'],['03','리서치 · 검수 · 모션']];
    for(const [n,title] of stages){
      const step=document.createElement('div');step.className='ej-growth-step';
      const index=document.createElement('span');index.textContent=n;
      const label=document.createElement('strong');label.textContent=title;
      step.append(index,label);visual.append(step);
    }
    if(bodyEl)bodyEl.before(visual);else section.append(visual);
    section.classList.add('ej-growth-section');
  }
  const principle=document.getElementById('overviewPrincipleText')?.closest('.section');
  if(principle)principle.classList.add('ej-principle-section');
})();