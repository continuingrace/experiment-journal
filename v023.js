(()=>{
  if(!Array.isArray(data?.experiments))return;
  const id='ej-visual-v0366';
  const motion=data.experiments.find(e=>e.id==='exp-motion-harness');
  if(motion&&Array.isArray(motion.resources)){
    const before=motion.resources.length;
    motion.resources=motion.resources.filter(r=>!/figma\.com\/design\/RSoltcenpXX4Wn1jn4TwdS/i.test(String(r.url||'')));
    if(before!==motion.resources.length&&typeof persist==='function')persist(true);
  }
  const sample='https://continuingrace.github.io/experiment-journal-public/release.json';
  const safePoster=(()=>{
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><rect width="960" height="540" fill="#F5F5F5"/><rect x="250" y="216" width="460" height="108" rx="15" fill="#3C54DF"/><text x="480" y="283" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="white">제출하기</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  })();
  if(typeof mediaHTML==='function'){
    const originalMediaHTML=mediaHTML;
    mediaHTML=(m)=>{
      if(m.type!=='video')return originalMediaHTML(m);
      const url=src(m),label=esc(m.label||'영상 결과물');
      return url?`<figure class="ej-video-item"><video controls playsinline preload="metadata" poster="${safePoster}" src="${previewVideoSrc(url)}" aria-label="${label}"></video><figcaption>${label}</figcaption></figure>`:'';
    };
  }
  const motionVisual=`<div class="ej-visual-board ej-motion-board">
    <div class="ej-board-identity"><span>EXPERIMENT 07 · MOTION HARNESS</span><strong>모션 제작을 위한 구성과 결과</strong><p>제작 규칙을 정리한 뒤, 실제 영상에 적용했습니다.</p></div>
    <div class="ej-board-columns">
      <div class="ej-board-track"><div class="ej-board-track-label">01 · SETUP</div><h3>모션 하네스 설정</h3><p>Claude Code 안에서 재사용할 스킬과 작업 기준 정리</p>
        <div class="ej-code-tree" aria-label="모션 하네스 폴더 구조">
        <div><strong>▾ .agents / skills</strong><span>hyperframes · media-use<br>slideshow · remotion-to-hyperframes</span></div>
        <div><strong>▾ .claude</strong><span>agents · skills · launch.json</span></div>
        <div><strong>▾ huddling-motion-start</strong><span>docs / design.md · motion.md · video.md<br>out · references · src · CLAUDE.md</span></div>
        </div>
      </div>
      <div class="ej-board-track"><div class="ej-board-track-label">02 · OUTPUT</div><h3>모션 결과 영상</h3><p>장면표 작성, 초안 검토, 움직임과 소리 보정</p>
       <div class="ej-motion-stage"><div class="ej-stage-label">VIDEO OUTPUT</div><strong>약 29초</strong><p>수정과 검토를 거쳐 완성한 결과물</p><span class="ej-stage-play" aria-hidden="true">▶</span></div>
       <p class="ej-board-foot">아래 플레이어에서 실제 영상을 볼 수 있습니다.</p>
      </div>
    </div>
  </div>`;
  const harnessVisual=`<div class="ej-visual-board ej-harness-board">
    <div class="ej-board-identity"><span>EXPERIMENT 06 · HARNESS SYSTEM</span><strong>디자인 제작에서 웹앱 검수까지</strong><p>목적이 다른 두 하네스를 실제 작업에 적용했습니다.</p></div>
    <div class="ej-board-columns">
      <div class="ej-board-track"><div class="ej-board-track-label">01 · DESIGN</div><h3>디자인 제작 하네스</h3><p>기획에서 Figma 시안까지 일관된 작업 기준 적용</p>
        <div class="ej-flow-list"><span>PRD 정리</span><b>↓</b><span>레퍼런스</span><b>↓</b><span>화면 설계</span><b>↓</b><span>Figma 시안</span></div>
      </div>
      <div class="ej-board-track"><div class="ej-board-track-label">02 · WEBAPP QA</div><h3>웹앱 검수 하네스</h3><p>실제 기기에서 확인하고 배포를 승인하는 흐름</p>
        <div class="ej-flow-list"><span>웹앱 자동 검사</span><b>↓</b><span>배포 확인</span><b>↓</b><span>모바일 승인</span><b>↓</b><span>릴리스 기록</span></div>
      </div>
    </div>
    <div class="ej-board-metrics"><span>자동 테스트 261개 통과</span><span>의도 오류 10개 차단</span><span>민감정보 검출 0건</span></div>
  </div>`;
  function decorate(){
    const content=document.getElementById('sections');
    if(!content)return;
    for(const [experiment,html] of [['exp-motion-harness',motionVisual],['exp-harness-system',harnessVisual]]){
      const section=document.getElementById(experiment);if(!section)continue;
      const cover=section.querySelector(':scope .cover');
      if(cover){cover.classList.add('ej-semantic-cover');cover.innerHTML=html;}
      if(experiment==='exp-motion-harness'){
        section.querySelectorAll('.experiment-resources-list a').forEach(a=>{if(/figma\.com\/design\/RSoltcenpXX4Wn1jn4TwdS/i.test(a.href))a.remove();});
        section.querySelectorAll('.gallery .media').forEach(m=>{const isBoard=Array.from(m.querySelectorAll('.cap')).some(el=>/Figma 구성 시안/.test(el.textContent));if(isBoard)m.remove()});
        const videos=section.querySelectorAll('.gallery video');
        videos.forEach((video,i)=>{
          video.controls=true;video.playsInline=true;video.loop=false;video.muted=false;
          video.preload='metadata';
          video.poster=safePoster;
          const parent=video.closest('.ej-video-item');
          if(parent&&i===0){
            parent.classList.add('ej-featured-video');
            if(!parent.previousElementSibling?.classList?.contains('ej-video-heading')){
              const hd=document.createElement('h3');hd.className='ej-video-heading';hd.textContent='모션 하네스로 완성한 영상';parent.before(hd);
            }
          }
        });
      }
    }
  }
  if(typeof sections==='function'){
    const previous=sections;
    sections=()=>{previous();decorate()};
  }
  const style=document.createElement('style');style.id=id;style.textContent=`
    #sections .cycle-group-heading{font-size:clamp(21px,2.3vw,28px)!important;line-height:1.42!important;letter-spacing:-.025em!important;font-weight:750!important;color:var(--ink)!important;padding:0 0 26px!important;margin:0 0 22px!important;max-width:980px!important;text-wrap:pretty;word-break:keep-all}
    #sections .cycle-group-heading strong{font:inherit!important}
    #sections .cycle-group{padding-top:72px!important}
    #sections .cycle-group>.section:first-of-type{padding-top:0!important}
    #sections .ej-semantic-cover{aspect-ratio:auto!important;height:auto!important;background:#eeebe4!important;overflow:hidden!important}
    .ej-visual-board{width:100%;padding:clamp(22px,3.1vw,44px);display:flex;flex-direction:column;gap:22px;color:#252d29;background:#efede7}
    .ej-board-identity>span{display:block;font-size:12px;letter-spacing:.08em;font-weight:750;color:#637368;margin-bottom:10px}
    .ej-board-identity>strong{display:block;font-size:clamp(21px,2.5vw,31px);line-height:1.3;letter-spacing:-.025em}
    .ej-board-identity>p{font-size:15px;line-height:1.65;margin:8px 0 0;color:#616a63}
    .ej-board-columns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(12px,2vw,24px)}
    .ej-board-track{border-radius:16px;background:#fff;padding:clamp(16px,2.1vw,28px);min-width:0}
    .ej-board-track-label{font-size:12px;font-weight:750;color:#6c766e;letter-spacing:.055em}
    .ej-board-track h3{font-size:clamp(18px,1.9vw,25px);line-height:1.35;margin:10px 0;letter-spacing:-.025em}
    .ej-board-track>p{font-size:14px;line-height:1.55;margin:0 0 18px;color:#5c665f}
    .ej-code-tree{display:flex;flex-direction:column;gap:10px;background:#20242b;color:#f1f3f2;padding:18px 20px;border-radius:12px}
    .ej-code-tree>div{display:flex;flex-direction:column;gap:4px;border-bottom:1px solid #3b4146;padding-bottom:10px}
    .ej-code-tree>div:last-child{border:0;padding:0}
    .ej-code-tree strong{font-size:14px;line-height:1.5}
    .ej-code-tree span{font-size:13px;line-height:1.6;color:#c4cdc8;overflow-wrap:anywhere}
    .ej-motion-stage{border-radius:13px;background:#27312d;color:#fff;min-height:234px;padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px;position:relative}
    .ej-stage-label{font-size:11px;font-weight:650;color:#b7c2b9;letter-spacing:.12em}
    .ej-motion-stage strong{font-size:clamp(27px,3vw,42px);line-height:1.3;letter-spacing:-.025em}
    .ej-motion-stage p{color:#d7dfd7;font-size:14px;line-height:1.5;margin:0}
    .ej-stage-play{font-size:18px;color:#fff;opacity:.85;margin-top:10px}
    .ej-board-foot{font-size:13px!important;margin:14px 0 0!important}
    .ej-flow-list{display:flex;align-items:center;flex-direction:column;gap:5px}
    .ej-flow-list span{width:100%;text-align:center;background:#f3f5f1;padding:11px 12px;border-radius:8px;font-size:15px;line-height:1.4;font-weight:650}
    .ej-flow-list b{color:#8a9a8d;font-size:15px}
    .ej-board-metrics{display:flex;flex-wrap:wrap;gap:10px}
    .ej-board-metrics span{font-size:13px;font-weight:650;border:1px solid #cbd2c9;border-radius:99px;padding:8px 13px}
    #exp-motion-harness .gallery{grid-template-columns:minmax(0,1fr)!important}
    #exp-motion-harness .ej-video-item{margin:0;min-width:0;background:transparent;border:0;overflow:visible}
    #exp-motion-harness .ej-video-item video{display:block;width:100%;aspect-ratio:16/9;height:auto;object-fit:contain;background:#f6f6f6;border-radius:14px;overflow:hidden}
    #exp-motion-harness .ej-video-item figcaption{position:static!important;margin-top:12px;padding:0;background:transparent!important;color:var(--muted);font-size:14px;line-height:1.6;min-height:0;max-width:none;border-radius:0}
    #exp-motion-harness .ej-video-heading{margin:20px 0 14px;font-size:clamp(20px,2.2vw,27px);line-height:1.35}
    @media(max-width:680px){#sections .cycle-group-heading{font-size:20px!important;line-height:1.45!important;padding-bottom:20px!important}#sections .cycle-group{padding-top:50px!important}.ej-board-columns{grid-template-columns:1fr}.ej-visual-board{padding:18px;gap:16px}.ej-board-identity>p{font-size:14px}.ej-motion-stage{min-height:180px}.ej-code-tree span{font-size:12px}.ej-board-track{padding:18px}}
  `;
  if(!document.getElementById(id))document.head.append(style);
  if(typeof render==='function')render();
})();