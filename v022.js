(()=>{
  if(typeof data==='undefined'||!Array.isArray(data.experiments))return;
  const record=data.experiments.find(e=>e.id==='exp-motion-harness');
  if(!record)return;
  const wavURL="https://continuingrace.github.io/experiment-journal-public/kpitUoswh-ZYoagd4MWNcA.wav";
  const licenseURL='https://huggingface.co/facebook/musicgen-small';
  const note='음원 이용 주의 · facebook/musicgen-small 모델 가중치에 CC BY-NC 4.0이 적용됩니다. 상업적 이용 전 별도 권리 확인이 필요하며, 공개·재배포 시 출처 표시와 라이선스 조건을 확인해 주세요.';
  const target={src:wavURL,label:'업로드된 BGM WAV',generator:'facebook/musicgen-small',license:'CC BY-NC 4.0'};
  if(JSON.stringify(record.bgm)!==JSON.stringify(target)){
    record.bgm=target;
    if(typeof persist==='function')persist(true);
  }
  if(typeof sections!=='function')return;
  function mountAudio(){
    const body=document.querySelector('#exp-motion-harness .body');
    if(!body)return;
    body.querySelector('#cycle5-bgm-production')?.remove();
    const panel=document.createElement('section');
    panel.id='cycle5-bgm-production';panel.className='motion-bgm-panel';
    panel.innerHTML=`<div class="motion-bgm-eyebrow">03 · ORIGINAL BGM</div>
      <h3>직접 만든 배경음악</h3>
      <p>MusicGen으로 다섯 가지 음악 시안을 만들고, 멜로디 시안을 골라 영상에 맞게 편집했습니다. Python으로 반복 구간과 변주를 만들고 FFmpeg로 음량을 다듬었습니다.</p>
      <audio controls preload="metadata" aria-label="사이클 5에서 제작한 BGM WAV 음원" src="${wavURL}"></audio>
      <div class="motion-bgm-file">WAV 원본 · <a href="${wavURL}" target="_blank" rel="noopener noreferrer">음원 파일 열기</a></div>
      <details><summary>음악 제작 과정 자세히 보기</summary>
        <p><strong>생성</strong> · MusicGen small을 Python으로 로컬 CPU에서 실행, 약 14초 음악 생성 (seed 41). 메모리 부족을 피하기 위해 짧은 음원을 만들었습니다.</p>
        <p><strong>선택</strong> · 시안 5개 중 candidate-melodic-2.wav 채택. 재즈 힙합·플루트·바이올린, 100 BPM의 연주곡을 요청했습니다.</p>
        <p><strong>편집</strong> · Python/NumPy로 세 구간을 이어 붙이고, 필터·되감기·스터터·바이닐 노이즈로 변주했습니다.</p>
        <p><strong>마무리</strong> · FFmpeg 2단 압축과 loudnorm, alimiter로 음량을 정돈했습니다. 작업 기록상 최종 길이는 41.2초이며 영상에는 약 29.3초를 사용했습니다.</p>
      </details>
      <p class="motion-bgm-license"><strong>이용 주의</strong> · ${note.replace('음원 이용 주의 · ','')} <a href="${licenseURL}" target="_blank" rel="noopener noreferrer">공식 모델 카드</a></p>`;
    body.appendChild(panel);
  }
  const originalSections=sections;
  sections=()=>{originalSections();mountAudio()};
  const style=document.createElement('style');
  style.textContent='.motion-bgm-panel{border-top:1px solid var(--line);margin-top:38px;padding-top:32px}.motion-bgm-eyebrow{color:var(--muted);font-size:12px;font-weight:750;letter-spacing:.1em}.motion-bgm-panel h3{font-size:clamp(22px,2.2vw,30px);margin:12px 0 14px;letter-spacing:-.02em}.motion-bgm-panel p{font-size:16px;line-height:1.75;color:var(--muted)}.motion-bgm-panel audio{display:block;width:100%;margin:22px 0 12px}.motion-bgm-file{font-size:13px;color:var(--muted)}.motion-bgm-file a,.motion-bgm-panel a{color:var(--ink);text-underline-offset:3px}.motion-bgm-panel details{border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin:28px 0 24px;padding:18px 0}.motion-bgm-panel summary{cursor:pointer;font-weight:700;font-size:15px}.motion-bgm-panel details p{margin:14px 0}.motion-bgm-license{padding:16px 18px;background:#f1eee7;border-radius:14px;color:#403f3b!important;font-size:14px!important}@media(max-width:760px){.motion-bgm-panel{margin-top:26px;padding-top:26px}.motion-bgm-panel p{font-size:15px}}';
  document.head.appendChild(style);
  mountAudio();
})();