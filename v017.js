(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments))return;
  const KEY='experiment-journal-challenge-cycle5-v1';
  const newRecords=[
    {
      id:'exp-invitation-challenge',
      num:'',cycle:'CH',kind:'challenge',
      kicker:'INVITATION',title:'인터랙티브 초대장 만들기',date:'',
      summary:'챌린지 다시보기를 따라 초대장을 완성하고, Codex로 낙엽 효과와 이미지 전환을 추가해 배포했습니다.',
      question:'라이브에서 배운 내용을 따라 내 초대장을 만들고, 원하는 움직임까지 더할 수 있을까?',
      context:'1·2회차 라이브에는 참여하지 못했고, 3회차에 참여한 뒤 앞선 내용을 다시보기로 따라 했습니다.',
      tried:'• 다시보기를 참고해 초대장 제작\n• Codex와 대화하며 낙엽이 떨어지는 효과 추가\n• 가운데 이미지에 마우스를 올리면 다른 이미지로 바뀌도록 설정\n• 완성한 초대장을 Vercel에 배포',
      friction:'아직은 자료를 보며 단계별로 따라 해야 했지만, 직접 완성하며 제작 흐름을 익혔습니다.',
      applied:'기본 초대장에 계절감 있는 움직임과 이미지 반응을 더해 나만의 초대장으로 만들었습니다.',
      learned:'초대장을 이런 방식으로도 만들 수 있다는 것을 배웠습니다. 모르는 부분은 Codex에 물어보며 원하는 효과를 하나씩 더해 볼 수 있었습니다.',
      next:'다른 화면 크기에서도 애니메이션과 이미지 전환이 자연스러운지 확인하기',
      resources:[{label:'완성한 초대장',url:'https://ihiriinvitation.vercel.app/i/ihiri_invitiation'}],
      media:[],coverId:null
    },
    {
      id:'exp-motion-harness',
      num:'07',cycle:'05',kind:'cycle',
      kicker:'MOTION HARNESS',title:'모션 하네스로 영상 만들기',date:'2026-11-08',
      summary:'사이클 5에서 모션 하네스를 설정하고, 이를 활용해 약 29초 분량의 영상을 제작해 제출했습니다.',
      question:'직접 만든 모션 하네스로 영상 결과물까지 완성할 수 있을까?',
      context:'사이클 5의 실험 주제는 모션 하네스를 만들고, 그 하네스로 실제 영상까지 제작하는 것이었습니다.',
      tried:'• Claude Code에서 모션 하네스의 스킬과 제작 규칙 설정\n• 하네스를 활용해 영상 제작\n• AI 음악 생성 도구로 BGM 샘플을 만든 뒤 직접 들어보고, 추가하고 싶은 요소를 요청하며 수정\n• 완성한 영상 제출',
      friction:'제출 자료에 구체적인 시행착오는 아직 기록하지 않았습니다.',
      applied:'타이핑 장면과 ‘제출하기’ 버튼, 지식 자산 가치가 표시되는 화면, 허들링클럽 엔딩으로 이어지는 영상을 완성했습니다.',
      learned:'모션 하네스 설정부터 영상과 배경음악 제작까지 직접 진행했습니다. 샘플을 확인하고 피드백을 주며 결과물을 다듬는 과정이 중요했습니다.',
      next:'제작 과정에서 활용한 규칙과 수정 내용을 보완해 다음 영상에도 재사용하기',
      resources:[],
      media:[],coverId:null,
      pendingVideoFile:'mission-to-income-v2_2026-11-08_20-59-11.mp4'
    }
  ];
  let changed=false;
  if(!localStorage.getItem(KEY)){
    for(const record of newRecords){
      if(!data.experiments.some(e=>e.id===record.id)){
        data.experiments.push(record);changed=true;
      }
    }
    data.overview=data.overview||{};
    data.overview.cycleTopics={...(data.overview.cycleTopics||{}),'CH':'초대장 만들기','05':"클로드코드로 모션 디자인 시스템화해서 일관된 모션 만들기"};
    if(changed){let numbered=0;data.experiments.forEach(e=>{if(e.kind==='challenge'||e.cycle==='CH'){e.num='';return}numbered++;e.num=String(numbered).padStart(2,'0')});}
    localStorage.setItem(KEY,'1');
    if(typeof persist==='function')persist(true);
  }

  // Apply the confirmed official cycle topics to existing browser-saved journals.
  // Do not overwrite unrelated user-authored review fields.
  data.overview=data.overview||{};
  data.overview.cycleTopics=data.overview.cycleTopics||{};
  const officialTitles={"04":"기획부터 디자인까지 쭉! AI 디자인 하네스 만들기","05":"클로드코드로 모션 디자인 시스템화해서 일관된 모션 만들기"};
  let topicsChanged=false;
  for(const [cycle,title] of Object.entries(officialTitles)){
    if(data.overview.cycleTopics[cycle]!==title){
      data.overview.cycleTopics[cycle]=title;
      topicsChanged=true;
    }
  }
  if(topicsChanged&&typeof persist==='function')persist(true);

  // An unnumbered challenge stays between experiments 06 and 07 on every load.
  // Never overwrite the user's text or attached media.
  let normalized=false;
  const challenge=data.experiments.find(e=>e.id==='exp-invitation-challenge');
  const motionRecord=data.experiments.find(e=>e.id==='exp-motion-harness');
  if(challenge&&(challenge.kind!=='challenge'||challenge.cycle!=='CH'||challenge.num!=='')){
    challenge.kind='challenge';challenge.cycle='CH';challenge.num='';normalized=true;
  }
  if(motionRecord&&(motionRecord.num!=='07'||motionRecord.cycle!=='05')){
    motionRecord.num='07';motionRecord.cycle='05';normalized=true;
  }
  if(normalized&&typeof persist==='function')persist(true);

  // Attach authentic invitation source graphics. Do not replace user-selected media.
  const invitationRecord=data.experiments.find(e=>e.id==='exp-invitation-challenge');
  if(invitationRecord){
    const base='https://raw.githubusercontent.com/continuingrace/invitation_01/main/public/figma/';
    const pictures=[
      {id:'invitation-cover-original',type:'image',label:'초대장 커버 원본 이미지',src:base+'invitation-cover2-image.png'},
      {id:'invitation-hover-original',type:'image',label:'마우스 오버 이미지',src:base+'Image2hover.png'},
      {id:'invitation-body-original',type:'image',label:'초대장 본문 일러스트',src:base+'image2-1.png'}
    ];
    let change=false;
    invitationRecord.media=Array.isArray(invitationRecord.media)?invitationRecord.media:[];
    for(const pic of pictures){
      if(!invitationRecord.media.some(m=>m.id===pic.id)){invitationRecord.media.push(pic);change=true;}
    }
    if(!invitationRecord.coverId){invitationRecord.coverId=pictures[0].id;change=true;}
    const boardURL='https://continuingrace.github.io/experiment-journal-public/invitation-visual-board.html';
    invitationRecord.resources=Array.isArray(invitationRecord.resources)?invitationRecord.resources:[];
    if(!invitationRecord.resources.some(r=>r.url===boardURL)){
      invitationRecord.resources.push({label:'초대장 이미지 보드',url:boardURL});change=true;
    }
    if(change&&typeof persist==='function')persist(true);
  }

  // The binary is uploaded separately to the public repository.
  // Do not display a broken video before the public file is actually available.
  const movie=data.experiments.find(e=>e.id==='exp-motion-harness');
  const movieURL='https://continuingrace.github.io/experiment-journal-public/media/mission-to-income-v2_2026-11-08_20-59-11.mp4';
  const fileID='motion-20261108-video';
  if(movie){
    fetch(movieURL,{method:'HEAD',cache:'no-store'}).then(r=>{
      if(!r.ok)return;
      const existing=(movie.media||[]).find(m=>m.id===fileID||m.src===movieURL);
      if(!existing){
        movie.media=Array.isArray(movie.media)?movie.media:[];
        movie.media.push({id:fileID,type:'video',label:'사이클 5 · 모션 하네스 결과 영상',src:movieURL});
        if(!movie.coverId)movie.coverId=fileID;
        if(typeof persist==='function')persist(true);
  if(typeof render==='function')render();
      }
    }).catch(()=>{});
  }
  if(typeof render==='function')render();
})();