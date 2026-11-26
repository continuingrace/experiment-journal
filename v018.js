(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments))return;
  const expected=[
    {id:'exp0',cycle:'01',num:'01'},
    {id:'exp-design-request-tracker',cycle:'01',num:'02'},
    {id:'exp1',cycle:'02',num:'03'},
    {id:'exp2',cycle:'02',num:'04'},
    {id:'exp3',cycle:'03',num:'05'},
    {id:'exp-harness-system',cycle:'04',num:'06'},
    {id:'exp-invitation-challenge',cycle:'CH',num:'',kind:'challenge'},
    {id:'exp-motion-harness',cycle:'05',num:'07'}
  ];
  // Recover only a missing cycle 4 record from the previously published archive.
  // Existing user-edited text and uploaded media remain authoritative.
  const harnessBackup={"id":"exp-harness-system","num":"06","cycle":"04","kicker":"HARNESS SYSTEM","title":"디자인·웹앱 검수 하네스 2종 만들기","date":"2026-10-05","summary":"디자인 제작과 웹앱 검수에서 확인할 기준을 놓치지 않도록, 목적이 다른 하네스 두 개를 만들었습니다.","question":"AI로 만든 디자인과 웹앱을 매번 같은 기준으로 검수할 수 있을까?","context":"9월 무료 라이브를 참고해 디자인 제작 하네스를 먼저 만들었습니다. 사이클 4에서는 내 웹앱의 검사와 배포까지 확인하는 웹앱 검수 하네스를 추가했습니다.","tried":"• 디자인 제작 하네스: 기획서(PRD) → 레퍼런스 → 화면 설계 → Figma 시안 제작 흐름 정리\n• 웹앱 검수 하네스: 검사 → 배포 확인 → 사용자 승인 → 릴리스 기록으로 검수 과정 구성\n• 자동 검사와 아이폰 실기기 점검을 함께 실행","friction":"자동 검사를 통과한 샘플 웹앱도 아이폰에서는 간격과 글자 위계가 어색했습니다. 첫 모바일 승인을 거절하고 화면과 검사 기준을 다시 보완했습니다.","applied":"자동 테스트 261개 통과, 의도적으로 만든 오류 10개 차단, 아이폰·홈 화면 설치 확인, 민감정보 검출 0건을 확인하고 sample-app 1.0.1을 릴리스했습니다. 이후 실제 웹앱 사본을 검수하면서 폰트 주소의 숫자를 앱 버전으로 오인하는 문제와 고정 아이콘 경로만 확인하던 한계도 보완했습니다.","learned":"자동 검사 통과만으로 사용 경험까지 검증되는 것은 아니었습니다. 직접 확인하고 이해되지 않는 결과는 질문하며 다시 점검하는 과정이 필요했습니다.","next":"전체 디자인 기준 적용과 공식 재검수는 다음 작업으로 남겨 두었습니다.","resources":[{"label":"디자인 제작 하네스","url":"https://github.com/continuingrace/cit-design-harness"},{"label":"웹앱 검수 하네스","url":"https://github.com/continuingrace/re-webapp-factory-harness"},{"label":"검증 페이지","url":"https://continuingrace.github.io/re-webapp-factory-harness/fixtures/sample-app/"}],"media":[],"coverId":null};
  let changed=false;
  if(!data.experiments.some(e=>e.id==='exp-harness-system')){
    const similar=data.experiments.find(e=>e.id!=='exp-motion-harness'&&e.cycle!=='CH'&&
      (/디자인.*웹앱.*하네스/.test(e.title||'')||e.kicker==='HARNESS SYSTEM'));
    if(similar){
      similar.id='exp-harness-system';changed=true;
    }else{
      data.experiments.push(structuredClone(harnessBackup));changed=true;
    }
  }
  for(const item of expected){
    const record=data.experiments.find(e=>e.id===item.id);
    if(!record)continue;
    if(record.cycle!==item.cycle){record.cycle=item.cycle;changed=true}
    if(record.num!==item.num){record.num=item.num;changed=true}
    if(item.kind&&record.kind!==item.kind){record.kind=item.kind;changed=true}
  }
  const rank=new Map(expected.map((e,i)=>[e.id,i]));
  const existing=data.experiments.slice();
  const sorted=existing.slice().sort((a,b)=>
    (rank.has(a.id)?rank.get(a.id):expected.length+existing.indexOf(a))-
    (rank.has(b.id)?rank.get(b.id):expected.length+existing.indexOf(b))
  );
  if(sorted.some((e,i)=>e!==existing[i])){data.experiments=sorted;changed=true}
  if(!data.experiments.some(e=>e.id===active)){
    active=data.experiments[0]?.id||active;changed=true;
  }
  if(changed&&typeof persist==='function')persist(true);
  if(typeof render==='function')render();
})();