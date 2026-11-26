(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments))return;
  const KEY='experiment-journal-challenge-cycle5-v1';
  const newRecords=[
    {
      id:'exp-invitation-challenge',
      num:'07',cycle:'CH',kind:'challenge',
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
      num:'08',cycle:'05',kind:'cycle',
      kicker:'MOTION HARNESS',title:'모션 하네스로 영상 만들기',date:'2026-11-08',
      summary:'사이클 5에서 모션 하네스를 만들고, 이를 활용한 약 29초 분량의 영상 「Mission to Income」을 제작해 제출했습니다.',
      question:'직접 만든 모션 하네스로 영상 결과물까지 완성할 수 있을까?',
      context:'사이클 5의 실험 주제는 모션 하네스를 만들고, 그 하네스로 실제 영상까지 제작하는 것이었습니다.',
      tried:'• 모션 하네스 구성\n• 하네스를 활용해 영상 제작\n• 완성한 결과물 제출',
      friction:'제출 자료에 구체적인 시행착오는 아직 기록하지 않았습니다.',
      applied:'타이핑 장면과 ‘제출하기’ 버튼, 지식 자산 가치가 표시되는 화면, 허들링클럽 엔딩으로 이어지는 영상을 완성했습니다.',
      learned:'모션 하네스를 만드는 데 그치지 않고, 실제 영상 결과물로 연결해 본 실험이었습니다.',
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
    data.overview.cycleTopics={...(data.overview.cycleTopics||{}),'CH':'초대장 만들기','05':'모션 하네스와 영상 만들기'};
    if(changed){data.experiments.forEach((e,i)=>{e.num=String(i+1).padStart(2,'0')});}
    localStorage.setItem(KEY,'1');
    if(typeof persist==='function')persist(true);
  }
  if(typeof render==='function')render();
})();