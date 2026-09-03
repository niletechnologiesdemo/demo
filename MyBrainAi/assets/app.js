/* ==========================================================
   MyBrainAI · demo interaction layer
   ========================================================== */
const ico = (n,s=20,cls='') => `<svg width="${s}" height="${s}" class="${cls}"><use href="#i-${n}"/></svg>`;
const esc = s => String(s??'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nl = s => esc(s).replace(/\n/g,'<br>');
const TODAY = 31, TODAY_LABEL = 'Monday, 31 August';
const DOW_AUG1 = 6; // Aug 1 2026 = Saturday (0 = Sun)

/* ---------- mood faces (drawn, not emoji) ---------- */
function faceSVG(id, size=46){
  const m = MOODS[id]; const eye = '#1E2A24';
  let mouth='', brows='', eyes=`<circle cx="15" cy="19" r="2.2" fill="${eye}"/><circle cx="29" cy="19" r="2.2" fill="${eye}"/>`;
  switch(id){
    case 'great': eyes=`<path d="M11.5 19.5c1.3-2.6 5.2-2.6 6.5 0M26 19.5c1.3-2.6 5.2-2.6 6.5 0" stroke="${eye}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
      mouth=`<path d="M13.5 26.5c2 6 15 6 17 0z" fill="${eye}"/><path d="M17 30.2c2.2 1.6 7.8 1.6 10 0" fill="#fff" opacity=".9"/>`; break;
    case 'good': mouth=`<path d="M14.5 27c2.5 4.5 12.5 4.5 15 0" stroke="${eye}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`; break;
    case 'okay': mouth=`<path d="M15.5 29h13" stroke="${eye}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`; break;
    case 'low': mouth=`<path d="M15 31c2.5-4 11.5-4 14 0" stroke="${eye}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
      brows=`<path d="M11.5 13.5l6 2M32.5 13.5l-6 2" stroke="${eye}" stroke-width="2.2" stroke-linecap="round"/>`; break;
    case 'anx': mouth=`<path d="M15 30c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="${eye}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
      brows=`<path d="M11 14c2-2.5 5-2.5 7-1M33 14c-2-2.5-5-2.5-7-1" stroke="${eye}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
      eyes=`<circle cx="15" cy="20" r="2.6" fill="${eye}"/><circle cx="29" cy="20" r="2.6" fill="${eye}"/>`; break;
    case 'angry': mouth=`<path d="M15.5 31c2.5-3.5 10.5-3.5 13 0" stroke="${eye}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
      brows=`<path d="M11.5 12.5l7 3.5M32.5 12.5l-7 3.5" stroke="${eye}" stroke-width="2.4" stroke-linecap="round"/>`; break;
  }
  return `<svg viewBox="0 0 44 44" width="${size}" height="${size}"><defs><radialGradient id="fg-${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <circle cx="22" cy="22" r="21" fill="${m.c}"/><circle cx="22" cy="22" r="21" fill="url(#fg-${id})"/>${brows}${eyes}${mouth}</svg>`;
}

/* ---------- state ---------- */
let S;
function freshState(){
  return {
    stack:[{n:'welcome'}], tab:'home',
    name:'', focus:new Set(['mind','fuel','creator']), goals:[{id:'s1',cat:'Personal',hz:'Monthly',t:'Log my mood every day this month',ic:'smile',type:'auto',src:'mood'},{id:'s2',cat:'Professional',hz:'Quarterly',t:'Grow the channel to 10k subscribers',ic:'video',type:'auto',src:'youtube',unit:'subscribers',start:2100,current:2100,target:10000},{id:'s3',cat:'Financial',hz:'Annual',t:'Build residual income to $6,000 a month',ic:'dollar',type:'number',unit:'$ / month',dir:'up',start:0,current:0,target:6000,history:[]}], goalHz:'Monthly', goalCat:'Personal', goalSeg:'Personal', 
    voice:{warm:72, playful:58, detail:40}, foodNo:new Set(['Beef','Pork','Alcohol']), foodYes:new Set(['Grilled chicken','Fish','Eggs']),
    connected:{}, theme:'green', mode:'light',
    journal:{}, moodToday:null, selDay:TODAY,
    meals:[], comments:[], accuracy:76, hubSeg:'review',
    chat:[], log:{m:null, note:'', tags:new Set(), live:false},
    reply:{}, paste:{}, month:'August 2026'
  };
}
function seedKevin(){
  S.name = USER.name;
  S.goals = USER.goals.map(g => ({...g, history:(g.history||[]).map(h=>[...h]), ratings:(g.ratings||[]).map(r=>[...r])}));
  S.journal = JSON.parse(JSON.stringify(JOURNAL));
  S.meals = MEALS.map(m => ({...m}));
  S.comments = COMMENTS.map(c => ({...c}));
  S.connected = {yt:true};
  S.moodToday = 'good';
  S.chat = [];
}

/* ---------- navigation ---------- */
const cur = () => S.stack[S.stack.length-1];
let animating = false;
function go(n, p){ if(animating) return; S.stack.push({n, p}); render('push'); }
function back(){ if(animating || S.stack.length < 2) return; S.stack.pop(); render('pop'); }
function setTab(t){ if(animating) return; S.tab = t; S.stack = [{n:t}]; render('fade'); }
function replace(n, p){ S.stack[S.stack.length-1] = {n, p}; render('fade'); }
function rerender(){ render('none'); }

function render(mode){
  const host = document.getElementById('app');
  const old  = host.querySelector('.screen');
  const el   = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = SCREENS[cur().n](cur().p);
  host.appendChild(el);
  syncChip();
  if(old && mode === 'push'){
    animating = true; el.classList.add('enter-r'); old.classList.add('exit-l');
    setTimeout(() => { old.remove(); el.classList.remove('enter-r'); animating = false; }, 360);
  } else if(old && mode === 'pop'){
    animating = true; el.classList.add('enter-l'); old.classList.add('exit-r'); host.insertBefore(el, old);
    setTimeout(() => { old.remove(); el.classList.remove('enter-l'); animating = false; }, 360);
  } else if(old && mode === 'fade'){
    old.remove(); el.classList.add('fade');
  } else if(old){ const sc = old.querySelector('.scroll'); const top = sc ? sc.scrollTop : 0; old.remove(); const nsc = el.querySelector('.scroll'); if(nsc) nsc.scrollTop = top; }
  if(mode !== 'none'){ const sc = el.querySelector('.scroll'); if(sc) sc.scrollTop = 0; }
  const fill = () => el.querySelectorAll('[data-w]').forEach(b => b.style.width = b.dataset.w);
  requestAnimationFrame(fill); setTimeout(fill, 60);
  el.querySelectorAll('[data-dash]').forEach(c => setTimeout(() => c.style.strokeDashoffset = c.dataset.dash, 60));
  el.querySelectorAll('[data-count]').forEach(countUp);
  const hook = AFTER[cur().n]; if(hook) hook(el, cur().p);
  const f = el.querySelector('[data-focus]'); if(f) setTimeout(() => f.focus(), 400);
}

/* ---------- chrome ---------- */
function syncChip(){
  const t = document.getElementById('statetext');
  if(t) t.textContent = `Brain accuracy ${S.accuracy.toFixed(0)}%`;
}
function toast(msg, icon='check'){
  const host = document.getElementById('toasts');
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = ico(icon,17) + `<span>${esc(msg)}</span>`;
  host.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2400);
}
function openSheet(html, after){
  const w = document.getElementById('sheet');
  w.className = 'sheetwrap on';
  w.innerHTML = `<div class="scrim" data-closesheet></div><div class="sheet"><div class="grab"></div>${html}</div>`;
  if(after) after(w);
}
function closeSheet(){
  const w = document.getElementById('sheet');
  if(!w.classList.contains('on')) return;
  w.classList.add('closing');
  setTimeout(() => { w.className = 'sheetwrap'; w.innerHTML = ''; }, 280);
}
function countUp(el){
  const to = parseFloat(el.dataset.count), pre = el.dataset.prefix||'', suf = el.dataset.suffix||'';
  const fmt = v => pre + Math.round(v).toLocaleString('en-US') + suf;
  el.textContent = fmt(to); const dur = 1100, t0 = performance.now();
  const tick = now => { const k = Math.min(1,(now-t0)/dur), e = 1-Math.pow(1-k,3); el.textContent = fmt(to*e); if(k<1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
function typeInto(el, text, speed=9, done){
  el.value = ''; let i = 0;
  const tick = () => { i += 4; el.value = text.slice(0, i); if(i < text.length) setTimeout(tick, speed); else if(done) done(); };
  tick();
}

/* ---------- shared partials ---------- */
const statusbar = (light) => `<div class="statusbar ${light?'light':''}"><span>9:41</span><span class="dots"><b></b><b></b><b></b><b></b></span></div>`;
function tabbar(){
  const t = (id,icon,label) => `<button class="tb ${S.tab===id?'on':''}" data-tab="${id}">${ico(icon,21)}<span>${label}</span></button>`;
  return `<div class="tabbar">
    ${t('home','home','Home')}${t('goals','target','Goals')}${t('mood','smile','Mood')}
    <button class="tb coach ${S.tab==='coach'?'on':''}" data-tab="coach"><span class="orb">${ico('sparkle',22)}</span><span>Sage</span></button>
    ${t('fuel','leaf','Fuel')}${t('hub','inbox','Hub')}
  </div>`;
}
const navbar = (title, right='') => `<div class="navbar"><button class="backbtn" data-back>${ico('left',19)}</button><span class="ttl">${esc(title)}</span>${right}</div>`;
const obHead = (step, total, h, lead) => `<div class="ob-head">
  <div class="progress">${Array.from({length:total},(_,i)=>`<i class="${i<step-1?'done':i===step-1?'cur':''}"></i>`).join('')}</div>
  <h2>${h}</h2>${lead?`<p class="lead">${lead}</p>`:''}</div>`;
const obFoot = (next, label='Continue', extra='') => `<div class="ob-foot">${S.stack.length>1?`<button class="btn btn-ghost" data-back>${ico('left',16)}</button>`:''}${extra}<button class="btn btn-primary" style="flex:1" data-go="${next}">${label} ${ico('right',16)}</button></div>`;

const LOGO = (light) => `${IMG}logo-${S.theme}${light?'-light':''}.png`;
const MARK = () => `${IMG}mark-${S.theme}.png`;
const GOAL_CATS = ['Personal','Professional','Financial'];
const CAT_ICON = {Personal:'heart', Professional:'briefcase', Financial:'dollar'};
const goalImg = g => g.img || CAT_IMG[g.cat] || IMG+'lake3.jpg';
const goalOf = id => S.goals.find(g => g.id===id);
function goalPct(g){
  if(g.done) return 100;
  let p = 0;
  if(g.type==='auto'){
    if(g.src==='mood') p = dayCount()/31;
    else if(g.src==='hub') p = (g.current||0)/100;
    else if(g.src==='youtube') p = ((g.current||0)-(g.start||0))/((g.target||1)-(g.start||0));
  } else if(g.type==='number'){
    const s=g.start??0, c=g.current??s, t=g.target??1;
    p = g.dir==='down' ? (s-c)/(s-t) : (c-s)/(t-s);
  } else if(g.type==='checkin'){
    const r=(g.ratings||[]).slice(-4); p = r.length ? r.reduce((a,x)=>a+x[1],0)/(r.length*5) : 0;
  }
  return Math.max(0, Math.min(100, Math.round((isFinite(p)?p:0)*100)));
}
const goalStatus = pc => pc>=100?'Done':pc>=85?'Nearly there':pc>=60?'On track':pc>0?'Needs a push':'Not started';
const goalSource = g => g.src==='mood'?'Mood Journal':g.src==='youtube'?'YouTube':'Communication Hub';
const goalAutoLine = g => g.src==='mood'?`${dayCount()} of 31 days logged this month`:g.src==='youtube'?`${(g.current||0).toLocaleString()} of ${(g.target||0).toLocaleString()} subscribers`:`${g.current}% of comments answered inside 24 hours`;
const fmtVal = (g,v) => g.unit&&g.unit.startsWith('$') ? '$'+Number(v).toLocaleString() : Number(v).toLocaleString();
const goalTypeLabel = g => g.type==='auto'?'Tracked automatically':g.type==='number'?'You log a number':'Weekly check-in';
const catPct = c => { const l=S.goals.filter(g=>g.cat===c); return l.length ? Math.round(l.reduce((a,g)=>a+goalPct(g),0)/l.length) : 0; };
const allPct = () => S.goals.length ? Math.round(S.goals.reduce((a,g)=>a+goalPct(g),0)/S.goals.length) : 0;
function miniRing(pc, size=54, stroke=6){
  const r=(size-stroke)/2, c=2*Math.PI*r;
  return `<svg class="mring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--accent)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" data-dash="${c-c*pc/100}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`;
}
function todaysFocus(){
  const items = [];
  const moodGoal = S.goals.find(g => g.src==='mood');
  const todayLogged = (S.journal[TODAY]||[]).length > 0;
  if(moodGoal) items.push(todayLogged
    ? {ic:'smile', c:'var(--m-good-t)', col:'#1F7A55', t:'Mood logged today', s:`Keeps “${moodGoal.t}” at ${goalPct(moodGoal)}%`, done:true, go:'mood'}
    : {ic:'smile', c:'var(--m-anx-t)', col:'#B8483A', t:'Log today’s mood', s:`Your 27-day streak and “${moodGoal.t}”`, act:'log-mood'});
  const num = S.goals.filter(g => g.type==='number' && !g.done).sort((a,b) => goalPct(a)-goalPct(b))[0];
  if(num) items.push({ic:num.ic, c:'var(--accent-tint)', col:'var(--accent)', t:`Log an update on “${num.t}”`, s:`${num.cat} · ${goalPct(num)}% · last update ${(num.history||[]).slice(-1)[0]?.[0]||'never'}`, go:'goal', p:num.id});
  const chk = S.goals.filter(g => g.type==='checkin' && !g.done && !(g.ratings||[]).some(r => r[0]==='This week'))[0];
  if(chk) items.push({ic:chk.ic, c:'var(--honey-tint)', col:'var(--honey)', t:`Weekly check-in: ${chk.t}`, s:`${chk.cat} · ${goalPct(chk)}% · takes ten seconds`, go:'goal', p:chk.id});
  const hubGoal = S.goals.find(g => g.src==='hub'); const rev = S.comments.filter(c => c.st==='review').length;
  if(hubGoal && rev) items.push({ic:'inbox', c:'#FBE6E3', col:'#E53935', t:`${rev} comments need you`, s:`“${hubGoal.t}” holds at ${goalPct(hubGoal)}% if you clear them today`, tab:'hub'});
  return items.slice(0,4);
}
function feedsChips(ids){
  const gs = ids.map(goalOf).filter(Boolean); if(!gs.length) return '';
  return `<div class="feeds rise"><span class="lb">${ico('target',12)} Feeds</span>${gs.map(g => `<button class="fchip" data-go="goal" data-p="${g.id}">${esc(g.t)}<b>${goalPct(g)}%</b></button>`).join('')}</div>`;
}
const firstName = () => (S.name||'there').split(' ')[0];
const dayCount = () => Object.keys(S.journal).length;
const moodAvg = () => { let t=0,n=0; Object.values(S.journal).forEach(es => es.forEach(e => { t += MOODS[e.m].v; n++; })); return n ? (t/n) : 0; };
const learnedCount = () => 312 + Math.round((S.accuracy-76)*10);

/* ==========================================================
   SCREENS
   ========================================================== */
const SCREENS = {};

SCREENS.welcome = () => `
  <div class="hero-full"><img src="${IMG}lake1.jpg" alt=""><div class="sc"></div></div>
  ${statusbar(true)}
  <div class="welcome-body">
    <img class="welcome-logo" src="${LOGO(true)}" alt="MyBrainAI">
    <h1>Your mind.<br>Your data.<br><em>Your coach.</em></h1>
    <p>Log how you feel and what you eat. Paste in the messages that pile up. One private brain learns you — and answers with your own facts, not platitudes.</p>
    <div class="btns">
      <button class="btn btn-white btn-block" data-go="ob-name">Build my brain ${ico('right',16)}</button>
      <button class="btn btn-glass btn-block" data-act="signin">Sign in to MyBrain</button>
    </div>
    <div class="trust"><span>${ico('lock',13)}Private to you</span><span>${ico('shield',13)}Facts only</span><span>${ico('sparkle',13)}Learns every day</span></div>
  </div>`;

SCREENS['ob-name'] = () => `${statusbar()}<div class="ob">
  ${obHead(1,7,'What should your brain <em>call you?</em>','This is the name your coach will use. Nothing else is shared with anyone.')}
  <div class="ob-body">
    <input class="bigname" placeholder="Your first name" value="${esc(S.name)}" data-bind="name" data-focus>
    <div class="lbl" style="margin-top:28px">A private brain, under your ID only</div>
    <div class="card" style="display:flex;gap:12px;align-items:flex-start">
      <div style="width:36px;height:36px;border-radius:11px;background:var(--accent-tint);color:var(--accent);display:grid;place-items:center;flex:0 0 auto">${ico('db',18)}</div>
      <p class="sub">Everything you log is stored encrypted against your own user ID. Your brain is never pooled with anyone else’s, and you can export or delete it at any time.</p>
    </div>
  </div>
  ${obFoot('ob-goals')}</div>`;

SCREENS['ob-goals'] = () => `${statusbar()}<div class="ob">
  ${obHead(2,7,'What do you want to <em>take control of?</em>','Pick what matters. Your coach weighs every insight against these.')}
  <div class="ob-body">
    <div class="focus-grid">${FOCUS.map(f => `<button class="focus ${S.focus.has(f.id)?'on':''}" data-focus-id="${f.id}"><img src="${f.img}" alt=""><span class="n">${f.n}</span><span class="ck">${ico('check',13)}</span></button>`).join('')}</div>
  </div>
  ${obFoot('ob-goalset')}</div>`;

SCREENS['ob-goalset'] = () => `${statusbar()}<div class="ob">
  ${obHead(3,7,'Set your <em>goals.</em>','Personal, professional and financial. Monthly, quarterly or annual. Sage measures everything against these.')}
  <div class="ob-body">
    <div class="catband"><img src="${CAT_IMG[S.goalCat]}" alt=""><div class="sc"></div><div class="in"><span class="kick">${S.goalCat}</span><b>${esc(CAT_BLURB[S.goalCat])}</b></div></div>
    <div class="seg">${GOAL_CATS.map(c => `<button class="${S.goalCat===c?'on':''}" data-cat="${c}">${ico(CAT_ICON[c],13)} ${c}<span class="n">${S.goals.filter(g=>g.cat===c).length}</span></button>`).join('')}</div>
    ${S.goals.filter(g => g.cat===S.goalCat).map(g => `<button class="goalrow rise" data-act="goal-sheet" data-p="${g.id}" style="width:100%;text-align:left"><div class="ic">${ico(g.ic||'target',16)}</div><div class="g"><b>${esc(g.t)}</b><span>${goalTypeLabel(g)} · tap to change</span></div><span class="hz">${g.hz}</span></button>`).join('') || `<div class="empty" style="padding:22px 14px"><div class="ic">${ico(CAT_ICON[S.goalCat],20)}</div>No ${S.goalCat.toLowerCase()} goals yet. Add one below.</div>`}
    <div class="lbl">Add a ${S.goalCat.toLowerCase()} goal</div>
    <div class="chips" style="margin-bottom:8px">${['Monthly','Quarterly','Annual'].map(h => `<button class="chip soft btn-xs ${S.goalHz===h?'on':''}" data-hz="${h}">${h}</button>`).join('')}</div>
    <div class="addrow"><input class="field" placeholder="e.g. ${S.goalCat==='Financial'?'Build residual income to $6,000 a month':S.goalCat==='Professional'?'Grow the channel to 10k subscribers':'Get down to 185 lb'}" data-goal-input data-focus><button class="btn btn-primary" data-act="addgoal">${ico('plus',16)}</button></div>
    <div class="card" style="margin-top:18px;display:flex;gap:12px;align-items:flex-start">
      <div style="width:36px;height:36px;border-radius:11px;background:var(--accent-tint);color:var(--accent);display:grid;place-items:center;flex:0 0 auto">${ico('target',18)}</div>
      <p class="sub">Each goal is measured one of three ways: automatically from your journal, meals or inbox; by a number you log, like weight or dollars; or by a quick weekly check-in. Tap a goal to choose.</p>
    </div>
  </div>
  ${obFoot('ob-voice')}</div>`;

SCREENS['ob-voice'] = () => `${statusbar()}<div class="ob">
  ${obHead(4,7,'Teach your brain <em>how you talk.</em>','This is the seed. Every reply you edit from here on makes it more you.')}
  <div class="ob-body">
    ${[['warm','Direct','Warm'],['playful','Serious','Playful'],['detail','Short','Detailed']].map(([k,a,b]) => `
      <div class="slider" data-slider="${k}"><div class="ends"><span>${a}</span><span>${b}</span></div><div class="track" style="--w:${S.voice[k]}%"><i style="left:${S.voice[k]}%"></i></div></div>`).join('')}
    <div class="lbl">How would you answer this?</div>
    <div class="voice-sample">
      <div class="q">“Great video. Which oil do you run? The dealer says full synthetic only but it’s expensive.”</div>
      <textarea class="field" placeholder="Type or dictate the way you’d really reply…" data-bind="sample">Appreciate it! I run the XPS synthetic blend — full synthetic is what the manual wants and it’s cheap insurance. Linked the exact one in the description so you skip the dealer markup.</textarea>
    </div>
    <div class="lbl">Things you never say</div>
    <div class="chips">${USER.voice.never.map(w => `<span class="chip on" style="background:var(--m-angry-t);color:#B8483A;border-color:transparent">${ico('x',12)}${esc(w)}</span>`).join('')}<button class="chip">${ico('plus',12)}Add</button></div>
    <div class="lbl">Sign-off (email only)</div>
    <input class="field" value="${esc(USER.voice.signoff)}">
  </div>
  ${obFoot('ob-fuel')}</div>`;

SCREENS['ob-fuel'] = () => `${statusbar()}<div class="ob">
  ${obHead(5,7,'What goes on <em>your plate?</em>','Your coach will flag meals that break these, and never suggest food you avoid.')}
  <div class="ob-body">
    <div class="lbl" style="margin-top:0">I avoid</div>
    <div class="chips">${['Beef','Pork','Dairy','Gluten','Alcohol','Fried food','Sugar','Shellfish','Nuts'].map(f => `<button class="chip ${S.foodNo.has(f)?'on':''}" data-food="no" data-v="${f}" style="${S.foodNo.has(f)?'background:#B8483A;border-color:#B8483A;color:#fff':''}">${f}</button>`).join('')}</div>
    <div class="lbl">I love</div>
    <div class="chips">${['Grilled chicken','Fish','Eggs','Oats','Vegetables','Rice','Fruit','Salads','Coffee'].map(f => `<button class="chip soft ${S.foodYes.has(f)?'on':''}" data-food="yes" data-v="${f}">${f}</button>`).join('')}</div>
    <div class="lbl">Daily targets</div>
    <div class="row3">
      ${[['2,100','kcal'],['160 g','protein'],['3','coffees max']].map(([v,l]) => `<div class="card" style="padding:12px;text-align:center"><b class="h-serif" style="font-size:1.35rem;display:block">${v}</b><span class="eyebrow">${l}</span></div>`).join('')}
    </div>
    <p class="sub" style="margin-top:14px">Targets start from your goals and adjust as your coach sees what actually works for you.</p>
  </div>
  ${obFoot('ob-connect')}</div>`;

SCREENS['ob-connect'] = () => `${statusbar()}<div class="ob">
  ${obHead(6,7,'Bring your <em>conversations</em> in.','YouTube connects with one tap. Everything else works by paste — no logins, nothing scraped.')}
  <div class="ob-body">
    <div class="plat" style="flex-direction:column;align-items:stretch;gap:12px;padding:14px">
      <div style="display:flex;align-items:center;gap:12px"><div class="lg lg-yt">${ico('yt',22)}</div><div class="g"><b>YouTube</b><span>Comments from every video, replies posted back for you</span></div>${S.connected.yt?`<span class="st done">${ico('check',12)} Connected</span>`:''}</div>
      ${S.connected.yt ? `<div class="sub" style="display:flex;align-items:center;gap:8px;color:var(--accent);font-weight:700">${ico('check',14)} Green Country Adventures · 41 videos · 2,113 past replies imported to your brain</div>` : `<button class="googlebtn" data-act="connect-yt">${ico('google',18)} Continue with Google</button>`}
    </div>
    ${PLATFORMS.filter(p => p.id!=='yt').map(p => `<div class="plat"><div class="lg ${p.lg}">${ico(p.ic,20)}</div><div class="g"><b>${p.n}</b><span>${p.s}</span></div><span class="st paste">Paste-in</span></div>`).join('')}
    <p class="sub" style="margin-top:6px">${ico('info',13)} Facebook Pages and Instagram business accounts can be connected in a later phase, subject to Meta app review.</p>
  </div>
  ${obFoot('ob-theme')}</div>`;

SCREENS['ob-theme'] = () => `${statusbar()}<div class="ob">
  ${obHead(7,7,'Make it <em>easy on the eyes.</em>','Pick a palette. Switch between light and dark any time — or let it follow the sun.')}
  <div class="ob-body">
    <div class="themecards">
      ${[['green','Green','Fresh mint'],['lavender','Lavender','Calm violet'],['sage','Sage','Soft olive']].map(([id,n,s]) => `<button class="tcard ${id} ${S.theme===id?'on':''}" data-theme-pick="${id}"><div class="prev"><img src="${IMG}mark-${id}.png" alt=""></div><b>${n}</b><span>${s}</span></button>`).join('')}
    </div>
    <div class="modeswitch">
      <button class="${S.mode==='light'?'on':''}" data-mode-pick="light">${ico('sun',15)} Light</button>
      <button class="${S.mode==='dark'?'on':''}" data-mode-pick="dark">${ico('moon',15)} Dark</button>
      <button data-mode-pick="auto">${ico('clock',15)} Auto</button>
    </div>
    <div class="lbl" style="margin-top:24px">Preview</div>
    <div class="checkin"><div class="q">How are you right now?</div><div class="s">Tap a face — that’s the whole check-in.</div>
      <div class="faces">${MOOD_ORDER.map(m => `<span class="face">${faceSVG(m,40)}<span>${MOODS[m].n}</span></span>`).join('')}</div></div>
  </div>
  ${obFoot('ob-ready','Build my brain')}</div>`;

SCREENS['ob-ready'] = () => `${statusbar()}
  <div class="ready"><div class="glow"></div>
    <div class="orb"><img src="${MARK()}" alt=""></div>
    <h2 class="h-serif" style="font-size:2rem">Your brain is <em>ready,</em><br>${esc(firstName())}.</h2>
    <p class="sub" style="margin-top:12px;max-width:280px">It starts small and gets sharper every time you log a mood, snap a meal or edit a reply. Nothing is shared. Nothing is guessed.</p>
    <div class="stats"><div><b>${S.focus.size}</b><span>Focus areas</span></div><div><b>${S.goals.length}</b><span>Goals</span></div><div><b>${S.connected.yt?'2,113':'0'}</b><span>Replies learned</span></div></div>
  </div>
  <div class="ob-foot"><button class="btn btn-primary btn-block" data-act="enter">Open MyBrainAI ${ico('right',16)}</button></div>`;

/* ---------- HOME ---------- */
SCREENS.home = () => {
  const today = S.journal[TODAY] || [];
  const reviewN = S.comments.filter(c => c.st==='review').length, autoN = S.comments.filter(c => c.st==='auto').length;
  const mealsToday = S.meals.filter(m => m.day==='Today');
  const kcal = mealsToday.reduce((t,m) => t+m.kcal, 0);
  const focus = todaysFocus();
  const push = S.goals.filter(g => !g.done).sort((a,b) => goalPct(a)-goalPct(b)).slice(0,3);
  const onTrack = S.goals.filter(g => goalPct(g)>=60).length, done = S.goals.filter(g => goalPct(g)>=100).length;
  return `${statusbar()}
  <div class="appbar">
    <img class="mk" src="${MARK()}" alt="">
    <div class="grow"><div class="hi">${TODAY_LABEL}</div><div class="nm">Morning, ${esc(firstName())}.</div></div>
    <button class="iconbtn" data-go="notifs">${ico('bell',18)}<span class="pip">${NOTIFS.length}</span></button>
    <button class="avatar" data-go="brain"><img src="${USER.avatar}" alt=""></button>
  </div>
  <div class="scroll"><div class="pad pb">
    <button class="ghome rise" data-tab="goals">
      <img class="bgi" src="${IMG}lake3.jpg" alt=""><div class="veil"></div>
      <div class="ghome-top">
        <div><div class="eyebrow" style="color:var(--accent)">Your goals</div><div class="big"><span data-count="${allPct()}" data-suffix="%">${allPct()}%</span> <small>of the way</small></div><div class="s">${S.goals.length} goals · ${onTrack} on track · ${done} done</div></div>
        <div class="ghome-all">All goals ${ico('right',14)}</div>
      </div>
      <div class="catrings">${GOAL_CATS.map(c => `<span class="cr" data-cat-go="${c}"><span class="rw">${miniRing(catPct(c))}<b>${catPct(c)}%</b></span><span>${c}</span></span>`).join('')}</div>
    </button>
    <div class="sech rise rise-1"><span class="t">Today’s focus</span><span class="a muted" style="font-weight:700">Chosen by Sage</span></div>
    <div class="card rise rise-1" style="padding:4px 14px">
      ${focus.map(f => `<button class="focusrow ${f.done?'done':''}" ${f.act?`data-act="${f.act}"`:f.tab?`data-tab="${f.tab}"`:`data-go="${f.go}"${f.p?` data-p="${f.p}"`:''}`}>
        <span class="ic" style="background:${f.c};color:${f.col}">${ico(f.ic,16)}</span>
        <span class="g"><b>${esc(f.t)}</b><span>${esc(f.s)}</span></span>
        <span class="ck">${f.done?ico('check',14):ico('right',16)}</span></button>`).join('')}
    </div>
    <div class="checkin rise rise-2" style="margin-top:14px">
      <div class="q">${S.moodToday ? 'Logged. How’s it going now?' : 'How are you right now?'}</div>
      <div class="s">${S.moodToday ? 'Tap again any time — every check-in is a data point.' : 'Tap a face. Add a word or two if you want.'}</div>
      <div class="faces">${MOOD_ORDER.map(m => `<button class="face ${S.moodToday===m?'on':''} ${S.moodToday&&S.moodToday!==m?'dim':''}" data-mood="${m}">${faceSVG(m,44)}<span>${MOODS[m].n}</span></button>`).join('')}</div>
    </div>
    <div class="sech rise rise-2"><span class="t">Sage noticed</span><button class="a" data-tab="coach">Ask Sage</button></div>
    <button class="insight rise rise-2" data-tab="coach">
      <img src="${IMG}forest2.jpg" alt=""><div class="sc"></div>
      <div class="inner"><div class="who"><span class="orb">${ico('sparkle',14)}</span><span>Insight · from your data</span></div>
        <h3>Your coffee-first mornings are costing two goals at once.</h3>
        <p>Four of five anxious mornings this month followed three coffees and no breakfast. Those are also the days the late burgers show up — the ones holding “Get down to 185 lb” at ${goalPct(goalOf('g2')||{type:'number',start:1,current:1,target:1})}%.</p>
        <div class="evs"><span>${ico('target',11)} Get down to 185 lb</span><span>${ico('target',11)} Log my mood every day</span></div>
      </div>
    </button>
    <div class="sech rise rise-3"><span class="t">Needs a push</span><button class="a" data-tab="goals">All ${S.goals.length}</button></div>
    <div class="rise rise-3">${push.map((g,i) => goalCard(g,i)).join('')}</div>
    <div class="sech rise rise-4"><span class="t">What feeds your goals</span></div>
    <div class="modtiles rise rise-4">
      <button class="mod" data-tab="mood"><img src="${IMG}lake3.jpg" alt=""><span class="ct">${today.length} today</span><div class="in"><b>Mood Journal</b><span>Feeds 2 personal goals</span></div></button>
      <button class="mod" data-tab="fuel"><img src="${IMG}chicken1.jpg" alt=""><span class="ct">${kcal.toLocaleString()} kcal</span><div class="in"><b>Fuel</b><span>Feeds your weight goal</span></div></button>
      <button class="mod" data-tab="hub"><img src="${IMG}beach2.jpg" alt=""><span class="ct">${reviewN+autoN} drafted</span><div class="in"><b>Communication Hub</b><span>Feeds 2 professional goals</span></div></button>
      <button class="mod" data-go="brain"><img src="${IMG}stars.jpg" alt=""><span class="ct">${S.accuracy.toFixed(0)}% accurate</span><div class="in"><b>My Brain</b><span>What it knows about you</span></div></button>
    </div>
    <div class="streak rise rise-5" style="margin-top:12px"><div class="fl">${ico('flame',20)}</div><div><b>27-day check-in streak</b><span>Longest yet. Log tonight to keep it.</span></div><div class="days">${[1,1,1,1,1,1,0].map(d => `<i class="${d?'on':''}"></i>`).join('')}</div></div>
  </div></div>${tabbar()}`;
};

/* ---------- MOOD ---------- */
function calendar(){
  const cells = [];
  for(let i=0;i<DOW_AUG1;i++) cells.push(`<span class="day empty"></span>`);
  for(let d=1; d<=31; d++){
    const es = S.journal[d] || [];
    const has = es.length > 0;
    cells.push(`<button class="day ${has?'has':''} ${S.selDay===d?'sel':''} ${d===TODAY?'today':''} ${d>TODAY?'future':''}" data-day="${d}">${d}<span class="dots">${es.slice(0,3).map(e => `<i style="background:${MOODS[e.m].c}"></i>`).join('')}</span></button>`);
  }
  return `<div class="cal">
    <div class="hd"><b>${S.month}</b><div class="nav"><button data-act="cal-prev">${ico('left',15)}</button><button data-act="cal-next">${ico('right',15)}</button></div></div>
    <div class="dow"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
    <div class="grid">${cells.join('')}</div>
    <div class="legend">${MOOD_ORDER.map(m => `<span><i style="background:${MOODS[m].c}"></i>${MOODS[m].n}</span>`).join('')}</div>
  </div>`;
}
function dayLabel(d){ const dows=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; return `${dows[(DOW_AUG1+d-1)%7]}, ${d} August`; }
function entryCard(e){
  return `<div class="entry"><div class="fc">${faceSVG(e.m,44)}</div><div class="g">
    <div class="top"><b>${MOODS[e.m].n}</b><span>${e.time}</span></div>
    <p>${esc(e.note)}</p>
    <div class="tags">${e.tags.map(t => `<span class="trig">${t}</span>`).join('')}</div></div></div>`;
}
SCREENS.mood = () => {
  const es = S.journal[S.selDay] || [];
  const trig = {}; Object.values(S.journal).forEach(list => list.forEach(e => { if(MOODS[e.m].v<=2) e.tags.forEach(t => trig[t]=(trig[t]||0)+1); }));
  const top = Object.entries(trig).sort((a,b)=>b[1]-a[1]).slice(0,4); const max = top[0]?.[1]||1;
  const weeks = [[1,7],[8,14],[15,21],[22,28],[29,31]].map(([a,b]) => { let t=0,n=0; for(let d=a;d<=b;d++) (S.journal[d]||[]).forEach(e=>{t+=MOODS[e.m].v;n++}); return n?t/n:0; });
  return `${statusbar()}
  <div class="appbar"><div class="grow"><div class="hi">Mood Journal</div><div class="nm">${dayCount()} days, ${moodAvg().toFixed(1)} avg</div></div><button class="iconbtn" data-act="mood-insights">${ico('chart',18)}</button></div>
  <div class="scroll"><div class="pad pb">
    ${feedsChips(['g1','g3'])}
    <div class="rise">${calendar()}</div>
    <div class="dayhead"><b>${S.selDay===TODAY?'Today':dayLabel(S.selDay)}</b><span>${es.length} ${es.length===1?'check-in':'check-ins'}</span></div>
    ${es.length ? es.map(entryCard).join('') : `<div class="empty"><div class="ic">${ico('smile',22)}</div>${S.selDay>TODAY?'That day hasn’t happened yet.':'Nothing logged this day.'}</div>`}
    <div class="sech"><span class="t">August at a glance</span><button class="a" data-act="mood-insights">Details</button></div>
    <div class="card rise rise-2">
      <div class="eyebrow">Weekly mood average</div>
      <div class="moodline">${weeks.map((v,i) => `<i style="height:${Math.max(8,v/5*100)}%;background:${v>=3.8?'var(--m-good)':v>=3?'var(--m-okay)':'var(--m-anx)'};animation-delay:${i*.08}s"></i>`).join('')}</div>
      <div class="wk-lbl"><span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span><span>Wk 5</span></div>
      <div class="divider"></div>
      <div class="eyebrow" style="margin-bottom:10px">What’s behind the low days</div>
      <div class="trigbars">${top.map(([t,n]) => `<div class="trigbar"><span>${t}</span><div class="tr"><i data-w="${n/max*100}%"></i></div><span class="n">${n}</span></div>`).join('')}</div>
    </div>
  </div></div>
  <button class="fab" data-act="log-mood">${ico('plus',18)} Log mood</button>
  ${tabbar()}`;
};

function moodSheet(pre){
  S.log = {m:pre||null, note:'', tags:new Set(), live:false};
  const html = () => `
    <div class="eyebrow">Check-in · ${TODAY_LABEL}</div>
    <h3 class="h-serif" style="font-size:1.6rem;margin:6px 0 12px">How are you <em>right now?</em></h3>
    <div class="logfaces">${MOOD_ORDER.map(m => `<button class="face ${S.log.m===m?'on':''} ${S.log.m&&S.log.m!==m?'dim':''}" data-log-mood="${m}">${faceSVG(m,48)}<span>${MOODS[m].n}</span></button>`).join('')}</div>
    <div class="lbl">What’s going on? <span class="muted" style="font-weight:600">(optional)</span></div>
    <div class="mic"><textarea class="field" rows="3" placeholder="Say it or type it — “boss moved the deadline again”" data-log-note>${esc(S.log.note)}</textarea><button class="micbtn ${S.log.live?'live':''}" data-act="mic">${ico('mic',22)}</button></div>
    <div class="listening" data-listen>${S.log.live?`<span class="bars"><i></i><i></i><i></i><i></i></span> Listening…`:''}</div>
    <div class="lbl">Trigger</div>
    <div class="chips">${TRIGGERS.map(t => `<button class="chip soft ${S.log.tags.has(t)?'on':''}" data-log-tag="${t}">${t}</button>`).join('')}</div>
    <button class="btn btn-primary btn-block" style="margin-top:20px" data-act="save-mood" ${S.log.m?'':'disabled'}>Save check-in</button>`;
  openSheet(html());
  return html;
}
let moodSheetHtml = null;
function refreshMoodSheet(){ const w = document.getElementById('sheet'); const sh = w.querySelector('.sheet'); if(sh && moodSheetHtml){ const ta = sh.querySelector('[data-log-note]'); if(ta) S.log.note = ta.value; sh.innerHTML = `<div class="grab"></div>` + moodSheetHtml(); } }

function moodInsightsSheet(){
  openSheet(`
    <div class="eyebrow">Sage · August analysis</div>
    <h3 class="h-serif" style="font-size:1.6rem;margin:6px 0 12px">What your month <em>actually says</em></h3>
    <div class="evcards">
      <div class="ev"><div class="ic" style="background:var(--m-anx-t);color:#B8483A">${ico('smile',15)}</div><div><b>Anxious check-ins cluster before 10 AM</b>5 of 6 anxious entries were morning</div></div>
      <div class="ev"><div class="ic" style="background:#F3E7D8;color:#8A5A2B">${ico('coffee',15)}</div><div><b>Coffee-first mornings: 4 of 5 anxious</b>Oats-first mornings: 0 of 6 anxious</div></div>
      <div class="ev"><div class="ic" style="background:var(--m-low-t);color:#3B6FB0">${ico('sleep',15)}</div><div><b>Every “Low” was after 10 PM</b>3 of 4 tagged Sleep or Channel</div></div>
      <div class="ev"><div class="ic" style="background:var(--m-great-t);color:#9A7A1C">${ico('users',15)}</div><div><b>“Great” days share one tag: Social</b>Lake, church, riding with friends</div></div>
    </div>
    <p class="sub" style="margin-top:14px">These are counts from your own journal, not a model’s opinion. Ask Sage to go deeper on any of them.</p>
    <button class="btn btn-primary btn-block" style="margin-top:14px" data-act="ask-sage-why">Ask Sage why ${ico('right',16)}</button>`);
}

/* ---------- FUEL ---------- */
SCREENS.fuel = () => {
  const t = FUEL_TODAY; const pct = Math.min(1, t.kcal/t.goal);
  const days = ['Today','Yesterday'];
  return `${statusbar()}
  <div class="appbar"><div class="grow"><div class="hi">Fuel</div><div class="nm">${t.kcal.toLocaleString()} of ${t.goal.toLocaleString()} kcal</div></div><button class="iconbtn" data-act="fuel-prefs">${ico('cog',18)}</button></div>
  <div class="scroll"><div class="pad pb">
    <div class="fuelhero rise">
      <div class="ring"><svg viewBox="0 0 110 110"><circle class="bg" cx="55" cy="55" r="50"/><circle class="fg" cx="55" cy="55" r="50" data-dash="${314-314*pct}"/></svg><div class="c"><b>${Math.round(pct*100)}%</b><span>of goal</span></div></div>
      <div class="macros">
        ${[['p','Protein',t.p,t.pGoal],['c','Carbs',t.c,t.cGoal],['f','Fat',t.f,t.fGoal]].map(([k,n,v,g]) => `<div class="macro ${k}"><div class="lb"><span style="color:var(--ink)">${n}</span><span>${v} / ${g} g</span></div><div class="tr"><i data-w="${v/g*100}%"></i></div></div>`).join('')}
      </div>
    </div>
    <button class="snapbtn rise rise-1" data-go="camera"><div class="ic">${ico('camera',22)}</div><div><b>Snap a meal</b><span>Photo in, macros out. Sage logs it for you.</span></div><span style="margin-left:auto">${ico('right',18)}</span></button>
    ${feedsChips(['g2'])}
    <div class="card rise rise-2" style="margin-top:12px;display:flex;gap:12px;align-items:center;padding:12px 14px">
      <div style="width:38px;height:38px;border-radius:12px;background:#F3E7D8;color:#8A5A2B;display:grid;place-items:center;flex:0 0 auto">${ico('coffee',18)}</div>
      <div style="flex:1"><b style="font-size:.84rem;display:block">Coffee: ${t.coffee} of 3 today</b><span class="sub" style="font-size:.7rem">One more crosses the line Sage tied to your anxious mornings.</span></div>
    </div>
    ${days.map(d => `<div class="timeline-day">${d}</div>${S.meals.filter(m => m.day===d).map(m => `
      <button class="meal" data-go="meal" data-p="${m.id}"><span class="ph"><img src="${m.img}" alt=""></span><span class="g"><span class="tm">${m.time}</span><b>${esc(m.n)}</b>
        <span class="mm"><span><i style="background:var(--protein)"></i>${m.p}g</span><span><i style="background:var(--carbs)"></i>${m.c}g</span><span><i style="background:var(--fat)"></i>${m.f}g</span>${m.flag?`<span style="color:#B8483A">${ico('warn',11)} flagged</span>`:''}</span></span><span class="kc">${m.kcal}</span></button>`).join('')}`).join('')}
  </div></div>${tabbar()}`;
};

SCREENS.meal = (id) => {
  const m = S.meals.find(x => x.id===id) || S.meals[0];
  return `<div class="hero-full" style="height:300px;inset:auto 0 auto 0;top:0"><img src="${m.img}" alt="" style="animation:none"><div class="sc" style="background:linear-gradient(to top,var(--paper) 0%,transparent 50%)"></div></div>
  ${statusbar(true)}
  <div class="navbar" style="position:relative;z-index:3"><button class="backbtn" data-back>${ico('left',19)}</button><span class="ttl" style="color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.5)">${m.day} · ${m.time}</span></div>
  <div class="scroll" style="position:relative;z-index:2"><div class="pad pb-sm" style="padding-top:150px">
    <div class="result" style="position:relative;animation:none;padding:20px 20px 30px">
      <h3>${esc(m.n)}</h3>
      <div class="conf">${ico('sparkle',13)} Sage identified ${m.items.length} items · 93% confidence</div>
      ${m.flag?`<div class="learned" style="background:var(--m-angry-t);color:#B8483A;margin-top:12px">${ico('warn',16)} ${esc(m.flag)}. Sage will weigh this when you ask how you feel tomorrow.</div>`:''}
      <div class="kcal"><b>${m.kcal.toLocaleString()}</b><span>kcal</span></div>
      <div class="mrow"><div class="m"><b>${m.p}g</b><span><i style="background:var(--protein)"></i>Protein</span></div><div class="m"><b>${m.c}g</b><span><i style="background:var(--carbs)"></i>Carbs</span></div><div class="m"><b>${m.f}g</b><span><i style="background:var(--fat)"></i>Fat</span></div></div>
      <div class="items">${m.items.map(([n,k]) => `<div><span style="color:var(--ink)">${esc(n)}</span><span>${k}</span></div>`).join('')}</div>
      <div class="actions"><button class="btn btn-ghost" data-act="toast" data-msg="Edit portion sizes">${ico('edit',15)} Edit</button><button class="btn btn-primary" data-tab="coach">${ico('sparkle',15)} Ask Sage about this</button></div>
    </div>
  </div></div>`;
};

SCREENS.camera = () => `
  <div class="cam" id="cam">
    <img src="${IMG}chicken1.jpg" alt="">
    <div class="hint">Frame the whole plate</div>
    <div class="frame"><i></i><i></i><i></i><i></i><div class="beam"></div></div>
    <div class="tags" id="camtags"></div>
    <div class="shutterrow"><button class="sideb" data-back>${ico('x',20)}</button><button class="shutter" data-act="shutter"></button><button class="sideb" data-act="toast" data-msg="Choose from library">${ico('image',20)}</button></div>
  </div>
  ${statusbar(true)}`;

function fuelPrefsSheet(){
  openSheet(`<div class="eyebrow">Fuel · preferences</div>
    <h3 class="h-serif" style="font-size:1.6rem;margin:6px 0 12px">What Sage knows about <em>your plate</em></h3>
    <div class="lbl" style="margin-top:8px">Avoids</div><div class="prefs">${USER.foodNo.map(f => `<span class="no">${f}</span>`).join('')}</div>
    <div class="lbl">Loves</div><div class="prefs">${USER.foodYes.map(f => `<span class="yes">${f}</span>`).join('')}</div>
    <div class="lbl">Targets</div>
    <div class="row3">${[['2,100','kcal'],['160 g','protein'],['3','coffees']].map(([v,l]) => `<div class="card" style="padding:12px;text-align:center"><b class="h-serif" style="font-size:1.3rem;display:block">${v}</b><span class="eyebrow">${l}</span></div>`).join('')}</div>
    <div class="learned" style="margin-top:16px">${ico('sparkle',16)} Learned: you skip lunch on filming days. Sage now reminds you at 12:30 on those days.</div>
    <button class="btn btn-quiet btn-block" style="margin-top:16px" data-closesheet>Done</button>`);
}

/* ---------- HUB ---------- */
SCREENS.hub = () => {
  const yt = PLATFORMS[0]; const reviewN = S.comments.filter(c => c.st==='review').length, autoN = S.comments.filter(c => c.st==='auto').length;
  const stage = S.accuracy>=90?'Auto':S.accuracy>=65?'Assisted':'Learning';
  return `${statusbar()}
  <div class="appbar"><div class="grow"><div class="hi">Communication Hub</div><div class="nm">${reviewN+autoN} replies waiting</div></div><button class="iconbtn" data-go="brain">${ico('brain',18)}</button></div>
  <div class="scroll"><div class="pad pb">
    <div class="brainmeter rise">
      <div class="lb">Your brain · reply accuracy</div>
      <div class="big"><b>${S.accuracy.toFixed(0)}%</b><span>${stage} mode</span></div>
      <div class="track"><i data-w="${S.accuracy}%"></i><em style="left:65%" data-l="65 · Assisted"></em><em style="left:90%" data-l="90 · Auto"></em></div>
      <div class="gates"><span>Every reply needs you</span><span>Simple ones auto-send</span></div>
      <div class="note">Right now: your brain drafts everything, auto-approves the easy ones, and always hands you anything sensitive. At 90% it starts posting simple replies on its own — you still see every one.</div>
    </div>
    ${feedsChips(['g5','g4'])}
    <div class="sech rise rise-1"><span class="t">Your platforms</span><span class="a muted" style="font-weight:700">Tap to open</span></div>
    <div class="platgrid rise rise-1">
      <button class="ptile" data-go="inbox" style="grid-column:1/-1;display:flex;align-items:center;gap:13px"><div class="lg lg-yt">${ico('yt',22)}</div><div style="flex:1;text-align:left"><b style="margin-top:0">${yt.n}</b><span>${S.connected.yt?`${yt.s} · ${reviewN+autoN} new`:'Tap to connect'}</span></div>${S.connected.yt?`<span class="st live" style="position:static">Live</span>`:''}<span class="cnt" style="position:static">${reviewN+autoN}</span></button>
      ${PLATFORMS.slice(1).map(p => `<button class="ptile" data-go="paste" data-p="${p.id}"><div class="lg ${p.lg}">${ico(p.ic,20)}</div><b>${p.n}</b><span>${p.s}</span><span class="st">Paste</span></button>`).join('')}
    </div>
    <button class="pastehero rise rise-2" data-go="paste" data-p="any"><div class="ic">${ico('paste',20)}</div><div style="flex:1"><b>Paste anything</b><span>Mixed comments, a DM thread, an email — Sage sorts it out</span></div>${ico('right',18)}</button>
    <div class="sech rise rise-3"><span class="t">What your brain learned this week</span></div>
    <div class="card rise rise-3" style="padding:6px 16px">
      ${RULES.slice(0,3).map(r => `<div class="rule"><div class="ic">${ico('sparkle',13)}</div><div class="g">${esc(r.t)}<div class="src">${r.src}</div></div></div>`).join('')}
    </div>
  </div></div>${tabbar()}`;
};

function commentCard(c){
  const v = VIDEOS[c.vid];
  const st = c.st==='auto'?`<span class="stt auto">${ico('check',10)} Auto-drafted</span>`:c.st==='review'?`<span class="stt review">${ico('user',10)} Needs you</span>`:`<span class="stt done">Posted</span>`;
  return `<button class="cmt" data-go="reply" data-p="${c.id}">
    <span class="av ${c.av?'':'ini'}" style="${c.av?'':'background:'+c.col}">${c.av?`<img src="${c.av}" alt="">`:c.ini}</span>
    <span class="g"><span class="top"><b>${esc(c.who)}</b><span>${c.when}</span></span><p>${esc(c.txt)}</p>
    <span class="vid"><img src="${v.img}" alt=""><em>${esc(v.t)}</em>${st}</span></span></button>`;
}
SCREENS.inbox = () => {
  const lists = {review:S.comments.filter(c=>c.st==='review'), auto:S.comments.filter(c=>c.st==='auto'), done:S.comments.filter(c=>c.st==='done')};
  const list = lists[S.hubSeg];
  return `${statusbar()}${navbar('YouTube comments', `<button class="iconbtn" data-act="fetch">${ico('refresh',17)}</button>`)}
  <div class="scroll"><div class="pad pb-sm">
    <div class="seg">${[['review','Needs you'],['auto','Auto-drafted'],['done','Posted']].map(([k,l]) => `<button class="${S.hubSeg===k?'on':''}" data-seg="${k}">${l}<span class="n">${lists[k].length}</span></button>`).join('')}</div>
    ${S.hubSeg==='auto'?`<div class="learned" style="margin:0 0 12px">${ico('zap',16)} These passed your brain’s confidence bar. One tap posts them all — or open any to change it.</div>`:''}
    ${list.length ? list.map(commentCard).join('') : `<div class="empty"><div class="ic">${ico('check',22)}</div>All caught up.</div>`}
    ${S.hubSeg==='auto'&&list.length?`<button class="btn btn-primary btn-block" data-act="post-all">${ico('send',16)} Post all ${list.length}</button>`:''}
    <p class="sub" style="text-align:center;margin-top:16px;font-size:.68rem">Fetched from every video on your channel through the YouTube Data API · last sync 2 min ago</p>
  </div></div>`;
}

SCREENS.reply = (id) => {
  const c = S.comments.find(x => x.id===id); const v = VIDEOS[c.vid];
  return `${statusbar()}${navbar(c.who, `<span class="badge badge-soft">${ico('yt',11)} YouTube</span>`)}
  <div class="scroll"><div class="pad pb-sm">
    <div class="orig"><div class="who"><span class="av">${c.av?`<img src="${c.av}" alt="">`:`<span style="display:grid;place-items:center;width:100%;height:100%;background:${c.col};color:#fff;font-size:.6rem;font-weight:800">${c.ini}</span>`}</span><div><b>${esc(c.who)}</b><span>${c.when} ago · on “${esc(v.t)}”</span></div></div><p>${esc(c.txt)}</p></div>
    <div class="suggest">
      <div class="hd"><span class="orb">${ico('sparkle',14)}</span><b>Sage drafted this in your voice</b><span id="conf"></span></div>
      <div id="draftwrap"><div class="thinking"><span class="dots"><i></i><i></i><i></i></span> Reading your past replies…</div></div>
      <div class="why" id="why" style="display:none">${ico('info',13)}<span>${esc(c.why)}</span></div>
    </div>
    <div class="tonechips"><div class="chips rail">${[['warmer','Warmer'],['shorter','Shorter'],['detail','More detail'],['joke','Lighter'],['link','Add the link']].map(([k,l]) => `<button class="chip" data-tone="${k}">${l}</button>`).join('')}</div></div>
    <div class="nudge"><input class="field" placeholder="Tell your brain what to change…" data-nudge><button class="btn btn-quiet" data-act="nudge">${ico('refresh',17)}</button></div>
    <div class="actions"><button class="btn btn-ghost" data-act="copy">${ico('copy',15)} Copy</button><button class="btn btn-primary" data-act="approve">${ico('send',15)} ${c.st==='done'?'Posted':'Approve & post'}</button></div>
    <div class="learned" id="learnnote" style="display:none">${ico('sparkle',16)}<span></span></div>
    <p class="sub" style="text-align:center;margin-top:14px;font-size:.68rem">Every edit you make is saved to your brain. Your brain never posts without you until it earns 90%.</p>
  </div></div>`;
};

SCREENS.paste = (pid) => {
  const p = PLATFORMS.find(x => x.id===pid);
  const title = p ? p.n : 'Paste anything';
  const st = S.paste;
  return `${statusbar()}${navbar(title, p?`<span class="badge badge-soft">${ico(p.ic,11)} Paste-in</span>`:'')}
  <div class="scroll"><div class="pad pb-sm">
    ${st.results ? `
      <div class="learned" style="margin:0 0 12px">${ico('sparkle',16)}<span>${st.results.length} ${st.results.length===1?'reply':'replies'} drafted from ${st.items.length} pasted ${st.items.length===1?'message':'messages'}. Copy one, or copy all.</span></div>
      ${st.items.map((it,i) => `<div class="pasted" style="animation-delay:${i*.08}s"><div class="in">${nl(it)}</div><div class="out"><div class="k">${ico('sparkle',11)} Your reply</div>${nl(st.results[i]||'')}</div><div class="bt"><button class="btn btn-ghost btn-sm" data-act="copy-one" data-i="${i}">${ico('copy',14)} Copy</button><button class="btn btn-quiet btn-sm" data-act="toast" data-msg="Opened for editing">${ico('edit',14)} Edit</button></div></div>`).join('')}
      <div class="actions"><button class="btn btn-ghost" data-act="paste-reset">${ico('paste',15)} Paste more</button><button class="btn btn-primary" data-act="copy-all">${ico('copy',15)} Copy all</button></div>
    ` : `
      <div class="card" style="display:flex;gap:12px;align-items:center;margin-bottom:12px"><div class="lg ${p?p.lg:''}" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;color:#fff;flex:0 0 auto;${p?'':'background:var(--accent)'}">${ico(p?p.ic:'paste',20)}</div><p class="sub">Copy comments, DMs or a whole thread from ${p?p.n:'anywhere'} and paste below. One per line, or all at once — Sage separates them.</p></div>
      <div class="pastebox"><textarea class="field" placeholder="Paste here…" data-paste data-focus>${esc(st.text||'')}</textarea><span class="cnt" id="pcount">${(st.text||'').split('\n').filter(Boolean).length} lines</span></div>
      <div class="quickpaste">${PASTE_SAMPLES[pid]?`<button data-act="sample" data-p="${pid}">${ico('paste',12)} Paste a ${p.n} sample</button>`:Object.keys(PASTE_SAMPLES).slice(0,4).map(k => `<button data-act="sample" data-p="${k}">${PLATFORMS.find(x=>x.id===k).n} sample</button>`).join('')}</div>
      <button class="btn btn-primary btn-block" style="margin-top:16px" data-act="gen-paste">${ico('sparkle',16)} Draft replies in my voice</button>
      <div id="pastethink"></div>
      <div class="lbl" style="margin-top:22px">Why paste?</div>
      <p class="sub">Platforms like WhatsApp and Instagram DMs don’t let apps read your messages — and you wouldn’t want one that could. Pasting keeps you in control: nothing is connected to your accounts, and only the text you choose reaches your brain.</p>
    `}
  </div></div>`;
};

/* ---------- COACH ---------- */
function evCards(ev){
  if(!ev||!ev.length) return '';
  return `<div class="evcards">${ev.map(e => `<div class="ev"><div class="ic" style="background:${e.t};color:${e.c}">${ico(e.ic,14)}</div><div><b>${esc(e.b)}</b>${esc(e.s)}</div><div class="sp">${e.sp.map(h => `<i style="height:${h*4+3}px" class="${h>=4?'hi':''}"></i>`).join('')}</div></div>`).join('')}</div>`;
}
function msgHTML(m, i){
  if(m.role==='me') return `<div class="msg me" style="animation-delay:0s"><div class="b">${esc(m.txt)}</div><div class="t">You · ${m.time}</div></div>`;
  if(m.role==='typing') return `<div class="msg ai typing"><div class="b"><i></i><i></i><i></i></div></div>`;
  return `<div class="msg ai"><div class="b">${esc(m.txt)}${evCards(m.ev)}${m.act&&m.act.length?`<div class="act">${m.act.map(a => `<button data-ask="${esc(a)}">${esc(a)}</button>`).join('')}</div>`:''}</div><div class="t">Sage · ${m.time}</div></div>`;
}
SCREENS.coach = () => {
  if(!S.chat.length) S.chat.push({role:'ai', time:'8:02 AM', ...COACH_SCRIPT.opening, act:['How am I doing on my goals?','Why do I feel off in the mornings?']});
  return `<div class="coachbg"><img src="${IMG}hills.jpg" alt=""></div>${statusbar()}
  <div class="coachhead"><div class="orb">${ico('sparkle',22)}</div><div style="flex:1"><b>Sage</b><span>Your coach · reads your goals, mood, meals and inbox</span></div><button class="iconbtn" data-go="brain">${ico('brain',18)}</button></div>
  <div class="scroll" id="chatscroll"><div class="chat pb-sm" id="chat">${S.chat.map(msgHTML).join('')}</div></div>
  <div class="prompts">${['How am I doing on my goals?','Why do I feel off in the mornings?','How was my week?','What should I eat before the gym?'].map(p => `<button data-ask="${esc(p)}">${p}</button>`).join('')}</div>
  <div class="composer"><input class="field" placeholder="Ask Sage anything about you…" data-chat-input><button class="iconbtn" data-act="chat-send">${ico('send',18)}</button></div>
  ${tabbar()}`;
};
function askSage(q){
  const stamp = '8:0' + (3 + (S.chat.length % 6)) + ' AM';
  S.chat.push({role:'me', txt:q, time:stamp});
  S.chat.push({role:'typing'});
  rerender(); scrollChat();
  const key = /goal/i.test(q) ? 'goals' : /morning|feel|off|anx|why/i.test(q) ? 'why' : /week/i.test(q) ? 'week' : /eat|gym|food|dinner|lunch|breakfast/i.test(q) ? 'gym' : 'default';
  setTimeout(() => {
    S.chat.pop();
    const a = COACH_SCRIPT.answers[key];
    if(/sponsor|draft/i.test(q)) S.chat.push({role:'ai', time:stamp, txt:'Here’s a draft for Chase, in your email voice:\n\n“Chase — Sept 12 is locked. You’ll have the cut Wednesday by 5pm CT. Anything specific you want in the first 30 seconds?\n\n— Kevin, GCA”\n\nWant me to send it to the Hub so you can copy it?', ev:[], act:['Copy it','Make it warmer']});
    else if(key==='goals'){ const worst = S.goals.filter(g=>!g.done).sort((a,b)=>goalPct(a)-goalPct(b))[0]; const best = S.goals.slice().sort((a,b)=>goalPct(b)-goalPct(a))[0];
      S.chat.push({role:'ai', time:stamp, txt:`Across your ${S.goals.length} goals you are ${allPct()}% of the way. Personal is strongest at ${catPct('Personal')}%, then Professional at ${catPct('Professional')}% and Financial at ${catPct('Financial')}%. The one that needs you most is “${worst.t}” at ${goalPct(worst)}% — ${worst.type==='number'?'you haven’t logged an update since '+((worst.history||[]).slice(-1)[0]?.[0]||'you set it'):worst.type==='checkin'?'no check-in this week yet':'it is tracked automatically'}. “${best.t}” is your best at ${goalPct(best)}%. Want me to plan the week around the weak one?`,
        ev:GOAL_CATS.map(c => ({ic:CAT_ICON[c], c:'var(--accent)', t:'var(--accent-tint)', b:`${c}: ${catPct(c)}%`, s:`${S.goals.filter(g=>g.cat===c).length} goals`, sp:S.goals.filter(g=>g.cat===c).map(g=>Math.max(1,Math.round(goalPct(g)/20)))})), act:['Plan my week','Open “'+worst.t+'”']}); }
    else S.chat.push({role:'ai', time:stamp, txt:a.txt, ev:a.ev, act:a.act});
    rerender(); scrollChat();
  }, 1500);
}
function scrollChat(){ setTimeout(() => { const s = document.getElementById('chatscroll'); if(s) s.scrollTop = s.scrollHeight; }, 30); }

/* ---------- MY BRAIN / NOTIFS ---------- */
SCREENS.brain = () => `${statusbar()}${navbar('My Brain', `<button class="iconbtn" data-act="toast" data-msg="Settings">${ico('cog',17)}</button>`)}
  <div class="scroll"><div class="pad pb-sm">
    <div class="brainhero rise">
      <img class="wmark" src="${MARK()}" alt="">
      <div class="top"><span class="avatar"><img src="${USER.avatar}" alt=""></span><div><div class="nm">${esc(S.name||'Kevin')}’s brain</div><div class="id">${USER.id} · since ${USER.since}</div></div><span class="badge" style="margin-left:auto;background:rgba(255,255,255,.16);color:#fff">${ico('lock',10)} Private</span></div>
      <div class="stats"><div><b>${learnedCount()}</b><span>Replies learned</span></div><div><b>${RULES.length + Math.round((S.accuracy-76))}</b><span>Style rules</span></div><div><b>${dayCount()}</b><span>Mood days</span></div><div><b>${S.meals.length + 90}</b><span>Meals</span></div></div>
    </div>
    <div class="sech"><span class="t">Reply accuracy</span><span class="a">${S.accuracy.toFixed(0)}%</span></div>
    <div class="card rise rise-1">
      <div class="quota" style="display:flex;align-items:center;gap:10px;font-size:.7rem;font-weight:800;color:var(--ink-3)"><span>Learning</span><div style="flex:1;height:7px;border-radius:99px;background:var(--sunk);overflow:hidden"><i style="display:block;height:100%;background:var(--accent);border-radius:99px;transition:width 1s var(--ease)" data-w="${S.accuracy}%"></i></div><span>Auto at 90</span></div>
      <p class="sub" style="margin-top:10px">Accuracy is how often you post Sage’s draft unchanged. It climbs every time you approve, and adjusts every time you edit — that’s the loop.</p>
    </div>
    <div class="sech"><span class="t">What it knows about how you talk</span><button class="a" data-act="toast" data-msg="Edit rules">Edit</button></div>
    <div class="card rise rise-2" style="padding:4px 16px">${RULES.map(r => `<div class="rule"><div class="ic">${ico('sparkle',13)}</div><div class="g">${esc(r.t)}<div class="src">${r.src}</div></div></div>`).join('')}</div>
    <div class="sech"><span class="t">Your goals</span><button class="a" data-go="goals">Manage</button></div>
    ${GOAL_CATS.map(c => { const list=S.goals.filter(g=>g.cat===c); return list.length?`<div class="eyebrow" style="margin:10px 0 6px">${c}</div><div class="card rise rise-3" style="padding:4px 16px">${list.map(g => `<button class="setrow" data-go="goal" data-p="${g.id}"><div class="ic" style="background:var(--accent-tint);color:var(--accent)">${ico(g.ic||'target',16)}</div><div class="g">${esc(g.t)}<span>${g.hz} · ${goalPct(g)}% · ${goalTypeLabel(g)}</span></div>${ico('right',16,'muted')}</button>`).join('')}</div>`:''; }).join('')}
    <div class="sech"><span class="t">Appearance</span></div>
    <div class="card rise rise-4" style="padding:4px 16px">
      <div class="setrow"><div class="ic">${ico('image',16)}</div><div class="g">Palette<span>Green · Lavender · Sage</span></div><div class="chips">${['green','lavender','sage'].map(t => `<button class="swatch ${S.theme===t?'on':''}" data-theme-pick="${t}" data-t="${t}" style="padding:5px 7px"><i></i></button>`).join('')}</div></div>
      <button class="setrow" data-act="toggle-mode"><div class="ic">${ico('moon',16)}</div><div class="g">Dark mode<span>Easier at night</span></div><span class="toggle ${S.mode==='dark'?'on':''}"></span></button>
    </div>
    <div class="sech"><span class="t">Data & privacy</span></div>
    <div class="card rise rise-5" style="padding:4px 16px">
      <div class="setrow"><div class="ic">${ico('db',16)}</div><div class="g">Stored under your ID only<span>Encrypted at rest · never pooled · never used to train anyone else</span></div>${ico('check',16,'')}</div>
      <button class="setrow" data-act="toast" data-msg="Brain export queued — you’ll get a file"><div class="ic">${ico('download',16)}</div><div class="g">Export my brain<span>Every rule, memory and log as a file you own</span></div>${ico('right',16,'muted')}</button>
      <button class="setrow" data-act="toast" data-msg="Connected: YouTube"><div class="ic">${ico('yt',16)}</div><div class="g">Connected platforms<span>YouTube · Green Country Adventures</span></div><span class="v">Manage</span></button>
    </div>
    <div class="sech"><span class="t">Membership</span></div>
    <div class="planbox rise rise-6"><div class="ic" style="width:38px;height:38px;border-radius:12px;background:var(--honey);color:#fff;display:grid;place-items:center">${ico('star',18)}</div><div><b>MyBrainAI Plus</b><span>Unlimited coach, replies and meal scans</span></div><div class="pr">$9.99<small style="font-family:var(--sans);font-size:.62rem;color:var(--ink-3)">/mo</small></div></div>
    <button class="btn btn-ghost btn-block" style="margin-top:16px" data-act="restart">Sign out</button>
  </div></div>`;

/* ---------- GOALS ---------- */
function goalCard(g, i=0){
  const pc = goalPct(g);
  return `<button class="goalcard" data-go="goal" data-p="${g.id}" style="animation-delay:${i*.07}s">
    <div class="th"><img src="${goalImg(g)}" alt=""><span class="ic">${ico(g.ic||'target',15)}</span></div>
    <div class="g"><div class="top"><b>${esc(g.t)}</b><span class="hz">${g.hz}</span></div>
      <div class="meta">${goalTypeLabel(g)}${g.type==='auto'?' · '+goalSource(g):''} · due ${g.due||'—'}</div>
      <div class="bar"><i data-w="${pc}%" class="${pc>=100?'done':''}"></i></div>
      <div class="pc"><span>${pc}%</span><span>${goalStatus(pc)}</span></div></div></button>`;
}
SCREENS.goals = () => {
  const list = S.goals.filter(g => g.cat===S.goalSeg);
  const onTrack = S.goals.filter(g => goalPct(g)>=60).length, done = S.goals.filter(g => goalPct(g)>=100).length;
  const isTab = S.stack.length===1;
  return `${statusbar()}${isTab ? `<div class="appbar"><div class="grow"><div class="hi">Personal · Professional · Financial</div><div class="nm">Your goals</div></div><button class="iconbtn" data-act="goal-sheet">${ico('plus',18)}</button></div>` : navbar('My goals', `<button class="iconbtn" data-act="goal-sheet">${ico('plus',18)}</button>`)}
  <div class="scroll"><div class="pad ${isTab?'pb':'pb-sm'}">
    <div class="cathero rise" key="${S.goalSeg}">
      <img class="bgi" src="${CAT_IMG[S.goalSeg]}" alt=""><div class="sc"></div>
      <div class="seg glass">${GOAL_CATS.map(c => `<button class="${S.goalSeg===c?'on':''}" data-seg-goal="${c}">${ico(CAT_ICON[c],13)} ${c}</button>`).join('')}</div>
      <div class="plate">
        <div class="ring sm light"><svg viewBox="0 0 110 110"><circle class="bg" cx="55" cy="55" r="50"/><circle class="fg" cx="55" cy="55" r="50" data-dash="${314-314*catPct(S.goalSeg)/100}"/></svg><div class="c"><b data-count="${catPct(S.goalSeg)}" data-suffix="%">${catPct(S.goalSeg)}%</b></div></div>
        <div class="g"><div class="kick">${S.goalSeg} goals</div><h3>${esc(CAT_BLURB[S.goalSeg])}</h3><div class="stats"><span><b>${list.length}</b> goals</span><span><b>${list.filter(g=>goalPct(g)>=60).length}</b> on track</span><span><b>${list.filter(g=>goalPct(g)>=100).length}</b> done</span></div></div>
      </div>
    </div>
    ${list.length ? list.map((g,i) => goalCard(g,i)).join('') : `<div class="empty"><div class="ic">${ico('target',22)}</div>No ${S.goalSeg.toLowerCase()} goals yet.</div>`}
    <button class="pastehero" data-act="goal-sheet" style="margin-top:6px"><div class="ic">${ico('plus',20)}</div><div style="flex:1"><b>New ${S.goalSeg.toLowerCase()} goal</b><span>Pick a horizon and how you want to measure it</span></div>${ico('right',18)}</button>
    <p class="sub" style="margin-top:16px;font-size:.72rem">${ico('sparkle',12)} Sage reads these goals when it answers you, and flags when your mood, meals or inbox are working against one.</p>
  </div></div>${isTab?tabbar():''}`;
};
SCREENS.goal = (id) => {
  const g = goalOf(id); if(!g) return SCREENS.goals();
  const pc = goalPct(g);
  let body = '';
  if(g.type==='number'){
    const hist = g.history||[]; const mx = Math.max(g.target||0, g.start||0, ...hist.map(h=>h[1]));
    body = `
    <div class="card"><div class="eyebrow">Where you are</div>
      <div class="gval"><b data-count="${g.current??g.start??0}" data-prefix="${g.unit&&g.unit.startsWith('$')?'$':''}">${fmtVal(g,g.current??g.start??0)}</b><span>${esc(g.unit||'')}</span><em>target ${fmtVal(g,g.target)}${g.dir==='down'?' or below':''}</em></div>
      <div class="lbl">Log an update</div>
      <div class="addrow"><input class="field" type="number" placeholder="New value in ${esc(g.unit||'units')}" data-goal-val><button class="btn btn-primary" data-act="goal-log" data-p="${g.id}">${ico('check',16)} Log</button></div>
      <input class="field" style="margin-top:8px;padding:11px 14px;font-size:.8rem" placeholder="A note, optional" data-goal-note>
    </div>
    <div class="sech"><span class="t">History</span><span class="a muted" style="font-weight:700">${hist.length} updates</span></div>
    <div class="card">${hist.length ? `<div class="ghist">${hist.slice().reverse().map((h,i) => `<div class="hrow rise" style="animation-delay:${i*.06}s"><span class="d">${esc(h[0])}</span><div class="tr"><i data-w="${Math.round(h[1]/mx*100)}%"></i></div><b>${fmtVal(g,h[1])}</b>${h[2]?`<p>${esc(h[2])}</p>`:''}</div>`).join('')}</div>` : `<div class="empty" style="padding:14px">No updates yet. Log the first one above.</div>`}</div>`;
  } else if(g.type==='auto'){
    const src = goalSource(g); const hist = g.history||[];
    body = `
    <div class="card srcbox"><div class="ic">${ico(g.src==='mood'?'smile':g.src==='youtube'?'yt':'inbox',20)}</div>
      <div><div class="eyebrow">Counted automatically</div><b>${goalAutoLine(g)}</b><span>Read from your ${src}${g.src==='youtube'?' · updated 2 min ago':''}. Nothing to enter, Sage keeps this current.</span></div></div>
    ${g.src==='mood' ? `<div class="card" style="margin-top:12px"><div class="eyebrow" style="margin-bottom:8px">This week</div><div class="wkdots">${[1,1,1,1,1,1,1].map((d,i)=>`<i class="on"><span>${'SMTWTFS'[i]}</span></i>`).join('')}</div></div>` : ''}
    ${hist.length ? `<div class="sech"><span class="t">Trend</span></div><div class="card"><div class="moodline" style="height:80px">${hist.map((h,i) => `<i style="height:${Math.max(8,h[1]/(g.target||1)*100)}%;background:var(--accent-soft);animation-delay:${i*.06}s"></i>`).join('')}</div><div class="wk-lbl">${hist.map(h=>`<span>${esc(h[0])}</span>`).join('')}</div></div>` : ''}`;
  } else {
    const rs = g.ratings||[];
    body = `
    <div class="card"><div class="eyebrow">This week’s check-in</div>
      <p class="sub" style="margin:6px 0 10px">How is this going? Be honest, Sage only uses it to help.</p>
      <div class="rate">${[1,2,3,4,5].map(n => `<button class="${S.rateSel===n?'on':''}" data-rate="${n}">${n}</button>`).join('')}</div>
      <div class="rate-lbl"><span>Off track</span><span>Nailed it</span></div>
      <input class="field" style="margin-top:10px;padding:11px 14px;font-size:.8rem" placeholder="What helped or got in the way?" data-goal-note>
      <button class="btn btn-primary btn-block" style="margin-top:10px" data-act="goal-rate" data-p="${g.id}" ${S.rateSel?'':'disabled'}>Save check-in</button>
    </div>
    <div class="sech"><span class="t">Past check-ins</span></div>
    <div class="card">${rs.length ? `<div class="ghist">${rs.slice().reverse().map((r,i) => `<div class="hrow rise" style="animation-delay:${i*.06}s"><span class="d">${esc(r[0])}</span><div class="tr"><i data-w="${r[1]*20}%" style="background:${r[1]>=4?'var(--m-good)':r[1]>=3?'var(--m-okay)':'var(--m-anx)'}"></i></div><b>${r[1]} / 5</b>${r[2]?`<p>${esc(r[2])}</p>`:''}</div>`).join('')}</div>` : `<div class="empty" style="padding:14px">No check-ins yet.</div>`}</div>`;
  }
  return `<div class="gcover"><img src="${goalImg(g)}" alt=""><div class="sc"></div></div>
  ${statusbar(true)}
  <div class="floatnav"><button class="backbtn" data-back>${ico('left',19)}</button><span style="flex:1"></span><button class="iconbtn" data-act="goal-sheet" data-p="${g.id}">${ico('edit',17)}</button></div>
  <div class="scroll" style="position:relative;z-index:2"><div class="pad pb-sm" style="padding-top:118px">
    <div class="gplate rise">
      <div class="ring sm"><svg viewBox="0 0 110 110"><circle class="bg" cx="55" cy="55" r="50"/><circle class="fg" cx="55" cy="55" r="50" data-dash="${314-314*pc/100}"/></svg><div class="c"><b data-count="${pc}" data-suffix="%">${pc}%</b></div></div>
      <div class="g"><div class="eyebrow" style="color:var(--accent)">${g.cat} · ${g.hz}${g.done?' · Completed':''}</div><h3 class="h-serif">${esc(g.t)}</h3><div class="meta">${goalTypeLabel(g)} · due ${g.due||'—'} · <span style="color:var(--accent);font-weight:800">${goalStatus(pc)}</span></div></div>
    </div>
    ${body}
    <div class="learned" style="margin-top:14px">${ico('sparkle',16)}<span>${g.src==='mood'?'Sage: your streak is the longest yet. Evening check-ins are the ones you miss most.':g.type==='checkin'?'Sage: your best weeks on this goal line up with your “Great” mood days.':g.id==='g2'?'Sage: weight drops fastest on weeks you skipped the late burgers. Two of those in August.':g.id==='g7'?'Sage: Amazon commissions carried the last two months. The channel goal feeds this one.':'Sage weighs this goal when it answers you.'}</span></div>
    <div class="actions"><button class="btn btn-ghost" data-act="goal-done" data-p="${g.id}">${ico('check',15)} ${g.done?'Reopen':'Mark complete'}</button><button class="btn btn-ghost" style="color:#B8483A" data-act="goal-delete" data-p="${g.id}">${ico('x',15)} Delete</button></div>
  </div></div>`;
};
function goalSheet(id){
  const g = id ? goalOf(id) : null;
  S.gform = g ? {...g} : {cat:S.goalSeg||S.goalCat||'Personal', hz:S.goalHz||'Monthly', type:'number', dir:'up', unit:'', start:0, target:'', t:'', due:''};
  const f = S.gform;
  const html = () => `
    <div class="eyebrow">${g?'Edit goal':'New goal'}</div>
    <h3 class="h-serif" style="font-size:1.6rem;margin:6px 0 12px">${g?'Adjust <em>this goal</em>':'What do you want to <em>achieve?</em>'}</h3>
    <input class="field" placeholder="Name the goal, e.g. Get down to 185 lb" value="${esc(f.t)}" data-gf="t">
    <div class="lbl">Category</div>
    <div class="chips">${GOAL_CATS.map(c => `<button class="chip soft ${f.cat===c?'on':''}" data-gf-cat="${c}">${ico(CAT_ICON[c],12)}${c}</button>`).join('')}</div>
    <div class="lbl">Horizon</div>
    <div class="chips">${['Monthly','Quarterly','Annual'].map(h => `<button class="chip soft ${f.hz===h?'on':''}" data-gf-hz="${h}">${h}</button>`).join('')}</div>
    <div class="lbl">How should it be measured?</div>
    <div class="mtype">${[['auto','Automatically','From your journal, meals or inbox'],['number','A number','You log a value, like weight or dollars'],['checkin','Weekly check-in','You rate it out of five each week']].map(([k,n,d]) => `<button class="${f.type===k?'on':''}" data-gf-type="${k}"><b>${n}</b><span>${d}</span></button>`).join('')}</div>
    ${f.type==='number' ? `<div class="row3" style="margin-top:12px"><input class="field" placeholder="Unit" value="${esc(f.unit||'')}" data-gf="unit"><input class="field" type="number" placeholder="Start" value="${esc(f.start??'')}" data-gf="start"><input class="field" type="number" placeholder="Target" value="${esc(f.target??'')}" data-gf="target"></div>
      <div class="chips" style="margin-top:8px">${[['up','Higher is better'],['down','Lower is better']].map(([k,n]) => `<button class="chip soft btn-xs ${f.dir===k?'on':''}" data-gf-dir="${k}">${n}</button>`).join('')}</div>` : ''}
    ${f.type==='auto' ? `<div class="chips" style="margin-top:12px">${[['mood','Mood Journal'],['youtube','YouTube'],['hub','Communication Hub']].map(([k,n]) => `<button class="chip soft btn-xs ${f.src===k?'on':''}" data-gf-src="${k}">${n}</button>`).join('')}</div>` : ''}
    <div class="lbl">Due</div>
    <input class="field" placeholder="e.g. 31 Dec 2026" value="${esc(f.due||'')}" data-gf="due">
    <button class="btn btn-primary btn-block" style="margin-top:18px" data-act="goal-save">${g?'Save changes':'Add goal'}</button>`;
  openSheet(html()); return html;
}
let goalSheetHtml = null;
function refreshGoalSheet(){ const sh = document.querySelector('#sheet .sheet'); if(!sh||!goalSheetHtml) return; sh.querySelectorAll('[data-gf]').forEach(i => S.gform[i.dataset.gf] = i.value); sh.innerHTML = '<div class="grab"></div>' + goalSheetHtml(); }

SCREENS.notifs = () => `${statusbar()}${navbar('Notifications')}
  <div class="scroll"><div class="pad pb-sm">${NOTIFS.map(n => `<div class="notif"><div class="ic" style="background:${n.t};color:${n.c}">${ico(n.ic,16)}</div><div><b>${esc(n.h)}</b><p>${esc(n.p)}</p><span>${n.when}</span></div></div>`).join('')}</div></div>`;

/* ==========================================================
   AFTER-RENDER HOOKS
   ========================================================== */
const AFTER = {};
AFTER.reply = (el, id) => {
  const c = S.comments.find(x => x.id===id);
  S.reply = {id, text:c.reply, variant:'base'};
  setTimeout(() => {
    const w = el.querySelector('#draftwrap'); if(!w) return;
    w.innerHTML = `<textarea data-draft></textarea>`;
    const ta = w.querySelector('textarea');
    typeInto(ta, c.reply, 7, () => { const y = el.querySelector('#why'); if(y) y.style.display='flex'; });
    const cf = el.querySelector('#conf'); if(cf) cf.textContent = (c.st==='auto'?'94':c.st==='done'?'Posted':'81') + (c.st==='done'?'':'% match');
  }, 1100);
};
AFTER.camera = (el) => { /* nothing until shutter */ };
AFTER.coach = () => scrollChat();

/* ==========================================================
   REPLY VARIANTS (demo)
   ========================================================== */
function variant(kind, base, c){
  const first = c.who.split(' ')[0];
  const sentences = base.match(/[^.!?]+[.!?]+/g) || [base];
  switch(kind){
    case 'shorter': return sentences.slice(0, Math.max(1, Math.ceil(sentences.length/2))).join('').trim();
    case 'warmer':  return `Really glad you're here, ${first}. ` + base.replace(/^Appreciate it, [^!]+! /,'').replace(/^Ha, /,'');
    case 'detail':  return base + ` If you want, I can put the exact steps in a pinned comment — just say the word.`;
    case 'joke':    return base + ` (And yes, I learned that one the hard way — more than once.)`;
    case 'link':    return base + ` Link's in the description.`;
    default:        return base;
  }
}
function applyNudge(text, base, c){
  const t = text.toLowerCase();
  if(/short|brief|less/.test(t)) return variant('shorter', base, c);
  if(/warm|nice|kind|friend|soft/.test(t)) return variant('warmer', base, c);
  if(/detail|more|explain|step/.test(t)) return variant('detail', base, c);
  if(/joke|fun|light|laugh/.test(t)) return variant('joke', base, c);
  if(/link|amazon|description/.test(t)) return variant('link', base, c);
  if(/name/.test(t)) return base.replace(/^[^,!.]+[,!] /,'') .replace(/^./, m => m.toUpperCase());
  return variant('warmer', base, c);
}
function regen(el, newText, note){
  const w = el.querySelector('#draftwrap'); const why = el.querySelector('#why');
  w.innerHTML = `<div class="thinking"><span class="dots"><i></i><i></i><i></i></span> Rewriting…</div>`; if(why) why.style.display='none';
  setTimeout(() => {
    w.innerHTML = `<textarea data-draft></textarea>`;
    typeInto(w.querySelector('textarea'), newText, 6, () => { if(why) why.style.display='flex'; });
    S.reply.text = newText;
    const ln = el.querySelector('#learnnote'); if(ln && note){ ln.style.display='flex'; ln.querySelector('span').textContent = note; }
  }, 900);
}

/* ==========================================================
   EVENTS
   ========================================================== */
const vp = document.getElementById('vp');
function applyTheme(){ vp.dataset.theme = S.theme; vp.dataset.mode = S.mode;
  const sl = document.getElementById('stagelogo'); if(sl) sl.src = LOGO(false);
  document.querySelectorAll('#themes .swatch').forEach(b => b.classList.toggle('on', b.dataset.t===S.theme));
  document.querySelectorAll('#modes .pill').forEach(b => b.classList.toggle('on', b.dataset.m===S.mode)); }

document.addEventListener('click', e => {
  const t = x => e.target.closest(x);
  let b;
  if(t('[data-closesheet]')){ closeSheet(); return; }
  if(b = t('[data-back]')){ back(); return; }
  if(b = t('[data-tab]')){ closeSheet(); setTab(b.dataset.tab); return; }
  if(b = t('[data-go]')){ if(b.dataset.go==='paste'){ S.paste = {}; } go(b.dataset.go, b.dataset.p); return; }
  if(b = t('[data-hz]')){ S.goalHz = b.dataset.hz; rerender(); return; }
  if(b = t('[data-cat]')){ S.goalCat = b.dataset.cat; rerender(); return; }
  if(b = t('[data-cat-go]')){ e.stopPropagation(); S.goalSeg = b.dataset.catGo; setTab('goals'); return; }
  if(b = t('[data-seg-goal]')){ S.goalSeg = b.dataset.segGoal; rerender(); return; }
  if(b = t('[data-rate]')){ S.rateSel = +b.dataset.rate; rerender(); return; }
  if(b = t('[data-gf-cat]')){ S.gform.cat = b.dataset.gfCat; refreshGoalSheet(); return; }
  if(b = t('[data-gf-hz]')){ S.gform.hz = b.dataset.gfHz; refreshGoalSheet(); return; }
  if(b = t('[data-gf-type]')){ S.gform.type = b.dataset.gfType; if(S.gform.type==='auto'&&!S.gform.src) S.gform.src='mood'; refreshGoalSheet(); return; }
  if(b = t('[data-gf-dir]')){ S.gform.dir = b.dataset.gfDir; refreshGoalSheet(); return; }
  if(b = t('[data-gf-src]')){ S.gform.src = b.dataset.gfSrc; refreshGoalSheet(); return; }
  if(b = t('[data-focus-id]')){ const id=b.dataset.focusId; S.focus.has(id)?S.focus.delete(id):S.focus.add(id); b.classList.toggle('on'); return; }
  if(b = t('[data-food]')){ const set = b.dataset.food==='no'?S.foodNo:S.foodYes; set.has(b.dataset.v)?set.delete(b.dataset.v):set.add(b.dataset.v); rerender(); return; }
  if(b = t('[data-theme-pick]')){ S.theme = b.dataset.themePick; applyTheme(); rerender(); return; }
  if(b = t('[data-mode-pick]')){ S.mode = b.dataset.modePick==='dark'?'dark':'light'; applyTheme(); rerender(); if(b.dataset.modePick==='auto') toast('Follows sunrise and sunset','clock'); return; }
  if(b = t('[data-slider]')){ const tr = b.querySelector('.track'); const r = tr.getBoundingClientRect(); const pc = Math.round(Math.min(100,Math.max(0,(e.clientX-r.left)/r.width*100))); S.voice[b.dataset.slider]=pc; tr.style.setProperty('--w',pc+'%'); tr.querySelector('i').style.left=pc+'%'; return; }
  if(b = t('[data-mood]')){ moodSheetHtml = moodSheet(b.dataset.mood); return; }
  if(b = t('[data-log-mood]')){ S.log.m = b.dataset.logMood; refreshMoodSheet(); return; }
  if(b = t('[data-log-tag]')){ const tg=b.dataset.logTag; S.log.tags.has(tg)?S.log.tags.delete(tg):S.log.tags.add(tg); refreshMoodSheet(); return; }
  if(b = t('[data-day]')){ S.selDay = parseInt(b.dataset.day); rerender(); return; }
  if(b = t('[data-seg]')){ S.hubSeg = b.dataset.seg; rerender(); return; }
  if(b = t('[data-tone]')){ const el = cur().n==='reply' && document.querySelector('#app .screen:last-child'); const c = S.comments.find(x=>x.id===S.reply.id); document.querySelectorAll('[data-tone]').forEach(x=>x.classList.toggle('on',x===b)); regen(el, variant(b.dataset.tone, c.reply, c), `Noted: you prefer “${b.textContent.trim().toLowerCase()}” for ${c.who.split(' ')[0]}-style comments. Your brain will lean that way next time.`); return; }
  if(b = t('[data-ask]')){ askSage(b.dataset.ask); return; }
  if(b = t('[data-act]')) { act(b.dataset.act, b, e); return; }
});

document.addEventListener('input', e => {
  const b = e.target;
  if(b.dataset.bind === 'name') S.name = b.value;
  if(b.hasAttribute('data-paste')){ S.paste.text = b.value; const c = document.getElementById('pcount'); if(c) c.textContent = b.value.split('\n').filter(Boolean).length + ' lines'; }
  if(b.hasAttribute('data-draft')) S.reply.text = b.value;
  if(b.hasAttribute('data-log-note')) S.log.note = b.value;
  if(b.hasAttribute('data-gf')) S.gform[b.dataset.gf] = b.value;
});
document.addEventListener('keydown', e => {
  if(e.key !== 'Enter') return;
  if(e.target.hasAttribute('data-chat-input')){ const q = e.target.value.trim(); if(q){ e.target.value=''; askSage(q); } }
  if(e.target.hasAttribute('data-goal-input')) act('addgoal');
  if(e.target.hasAttribute('data-nudge')) act('nudge');
  if(e.target.dataset.bind === 'name'){ e.preventDefault(); go('ob-goals'); }
});

function act(a, b, e){
  const el = document.querySelector('#app .screen:last-child');
  switch(a){
    case 'signin': seedKevin(); S.stack=[{n:'home'}]; S.tab='home'; render('fade'); toast('Welcome back, Kevin','brain'); break;
    case 'enter': { const name = S.name, added = S.goals.filter(g => !/^s\d$/.test(String(g.id))); seedKevin(); if(name) S.name = name; added.forEach(g => S.goals.push(g)); S.stack=[{n:'home'}]; S.tab='home'; render('fade'); break; }
    case 'restart': S = freshState(); applyTheme(); S.stack=[{n:'welcome'}]; render('fade'); closeSheet(); break;
    case 'addgoal': { const inp = document.querySelector('[data-goal-input]'); const v = inp && inp.value.trim(); if(!v) return; const ng = {id:'g'+Date.now(), cat:S.goalCat, hz:S.goalHz, t:v, ic:CAT_ICON[S.goalCat], type:'checkin', ratings:[], history:[], due:''}; S.goals.push(ng); rerender(); toast('Goal added','target'); setTimeout(() => { goalSheetHtml = goalSheet(ng.id); }, 350); break; }
    case 'goal-sheet': goalSheetHtml = goalSheet(b.dataset.p); break;
    case 'goal-save': { const sh = document.querySelector('#sheet .sheet'); sh.querySelectorAll('[data-gf]').forEach(i => S.gform[i.dataset.gf] = i.value); const f = S.gform; if(!f.t || !f.t.trim()){ toast('Give the goal a name','warn'); return; }
      ['start','target','current'].forEach(k => { if(f[k]!==''&&f[k]!=null) f[k]=Number(f[k]); }); if(f.type==='number'&&(f.current==null||f.current==='')) f.current=f.start||0; if(f.type==='number'&&!f.target) { toast('Set a target','warn'); return; }
      if(!f.ic) f.ic = CAT_ICON[f.cat]; if(!f.history) f.history=[]; if(!f.ratings) f.ratings=[];
      if(f.id){ const i = S.goals.findIndex(x=>x.id===f.id); S.goals[i] = f; } else { f.id='g'+Date.now(); S.goals.push(f); }
      closeSheet(); S.goalSeg = f.cat; S.goalCat = f.cat; rerender(); toast(f.id&&goalOf(f.id)?'Goal saved':'Goal added','check'); break; }
    case 'goal-log': { const g = goalOf(b.dataset.p); const inp = document.querySelector('[data-goal-val]'); const v = inp && inp.value.trim(); if(!v) return; const note = (document.querySelector('[data-goal-note]')||{}).value||''; g.current = Number(v); (g.history=g.history||[]).push(['Today', Number(v), note]); rerender(); toast(`Logged ${fmtVal(g,v)} ${g.unit||''} · ${goalPct(g)}%`,'check'); break; }
    case 'goal-rate': { const g = goalOf(b.dataset.p); if(!S.rateSel) return; const note = (document.querySelector('[data-goal-note]')||{}).value||''; (g.ratings=g.ratings||[]).push(['This week', S.rateSel, note]); S.rateSel = null; rerender(); toast('Check-in saved · Sage will factor it in','check'); break; }
    case 'goal-done': { const g = goalOf(b.dataset.p); g.done = !g.done; rerender(); toast(g.done?'Marked complete':'Reopened','check'); break; }
    case 'goal-delete': { S.goals = S.goals.filter(x => x.id!==b.dataset.p); back(); setTimeout(()=>toast('Goal deleted','x'),380); break; }
    case 'connect-yt': { b.innerHTML = `<span class="thinking" style="min-height:0;gap:6px"><span class="dots"><i></i><i></i><i></i></span> Signing in with Google…</span>`; setTimeout(() => { S.connected.yt = true; rerender(); toast('YouTube connected · importing 2,113 replies','yt'); }, 1400); break; }
    case 'mic': { S.log.live = !S.log.live; refreshMoodSheet(); if(S.log.live){ const ta = document.querySelector('[data-log-note]'); const phrase = 'Sponsor moved the deadline again and I had three coffees before I even opened the laptop.'; let i=0; const tick=()=>{ if(!S.log.live) return; i+=3; ta.value = phrase.slice(0,i); S.log.note = ta.value; if(i<phrase.length) setTimeout(tick,45); else { S.log.live=false; S.log.tags.add('Work'); refreshMoodSheet(); } }; setTimeout(tick,500); } break; }
    case 'log-mood': moodSheetHtml = moodSheet(); break;
    case 'save-mood': { const ta = document.querySelector('[data-log-note]'); if(ta) S.log.note = ta.value; const entry = {m:S.log.m, time:'9:41 AM', note:S.log.note || 'No note.', tags:[...S.log.tags]}; (S.journal[TODAY] = S.journal[TODAY]||[]).push(entry); S.moodToday = S.log.m; S.selDay = TODAY; closeSheet(); rerender(); toast(`${MOODS[S.log.m].n} logged · mood goal stays at ${goalPct(S.goals.find(g=>g.src==='mood')||{type:'auto',src:'mood'})}%`,'smile'); break; }
    case 'mood-insights': moodInsightsSheet(); break;
    case 'ask-sage-why': closeSheet(); S.tab='coach'; S.stack=[{n:'coach'}]; render('fade'); setTimeout(() => askSage('Why do I feel off in the mornings?'), 350); break;
    case 'cal-prev': case 'cal-next': toast(a==='cal-prev'?'July 2026 — 19 days logged':'September starts tomorrow','cal'); break;
    case 'fuel-prefs': fuelPrefsSheet(); break;
    case 'shutter': { const cam = el.querySelector('#cam'); if(!cam || cam.classList.contains('scanning')) return; cam.classList.add('scanning'); el.querySelector('.hint').textContent = 'Sage is reading the plate…';
      const tags = ['Grilled chicken breast','Roasted peppers','Zucchini','Olive oil','Lemon'];
      tags.forEach((tg,i) => setTimeout(() => { const s=document.createElement('span'); s.textContent=tg; el.querySelector('#camtags').appendChild(s); }, 700+i*260));
      setTimeout(() => { cam.classList.remove('scanning'); cam.classList.add('scanned'); el.querySelector('.hint').textContent=''; const m = MEALS[2];
        cam.insertAdjacentHTML('beforeend', `<div class="result"><div class="grab"></div><h3>${esc(m.n)}</h3><div class="conf">${ico('sparkle',13)} 5 items identified · 93% confidence</div>
          <div class="kcal"><b>${m.kcal}</b><span>kcal</span></div>
          <div class="mrow"><div class="m"><b>${m.p}g</b><span><i style="background:var(--protein)"></i>Protein</span></div><div class="m"><b>${m.c}g</b><span><i style="background:var(--carbs)"></i>Carbs</span></div><div class="m"><b>${m.f}g</b><span><i style="background:var(--fat)"></i>Fat</span></div></div>
          <div class="items">${m.items.map(([n,k]) => `<div><span style="color:var(--ink)">${esc(n)}</span><span>${k}</span></div>`).join('')}
          <div class="learned">${ico('check',16)}<span>Fits your plate: grilled chicken is on your “love” list, nothing from your avoid list.</span></div>
          <div class="actions"><button class="btn btn-ghost" data-act="toast" data-msg="Portion editor">${ico('edit',15)} Not quite</button><button class="btn btn-primary" data-act="save-meal">${ico('check',15)} Log it</button></div></div>`); }, 2300);
      break; }
    case 'save-meal': { const m = {...MEALS[2], id:'m'+Date.now(), time:'9:41 AM', n:'Grilled chicken & roasted veg'}; S.meals.unshift(m); FUEL_TODAY.kcal += m.kcal; FUEL_TODAY.p += m.p; FUEL_TODAY.c += m.c; FUEL_TODAY.f += m.f; S.stack=[{n:'fuel'}]; S.tab='fuel'; render('fade'); toast('Logged · 548 kcal · 46g protein','leaf'); break; }
    case 'fetch': { b.style.animation='spin .8s linear'; setTimeout(()=>{ b.style.animation=''; toast('Up to date · 0 new since 2 min ago','check'); }, 800); break; }
    case 'copy': { navigator.clipboard && navigator.clipboard.writeText(S.reply.text||'').catch(()=>{}); toast('Copied — paste it anywhere','copy'); break; }
    case 'approve': { const c = S.comments.find(x=>x.id===S.reply.id); if(c.st==='done') return; const edited = S.reply.text !== c.reply; c.reply = S.reply.text; c.st='done'; S.accuracy = Math.min(99, S.accuracy + (edited ? 0.2 : 0.6)); syncChip(); back(); setTimeout(()=>toast(edited?'Posted · your edit was saved to your brain':'Posted to YouTube · brain +0.6%','send'),380); break; }
    case 'post-all': { S.comments.forEach(c => { if(c.st==='auto') c.st='done'; }); S.accuracy = Math.min(99, S.accuracy+1.2); syncChip(); S.hubSeg='done'; rerender(); toast('Posted 2 replies to YouTube','send'); break; }
    case 'nudge': { const inp = document.querySelector('[data-nudge]'); const v = inp && inp.value.trim(); if(!v) return; const c = S.comments.find(x=>x.id===S.reply.id); inp.value=''; regen(el, applyNudge(v, c.reply, c), `Saved to your brain: “${v}”. It’ll apply this the next time a similar comment comes in.`); break; }
    case 'sample': { S.paste.text = PASTE_SAMPLES[b.dataset.p]; S.paste.src = b.dataset.p; rerender(); break; }
    case 'gen-paste': { const ta = document.querySelector('[data-paste]'); const text = (ta && ta.value.trim()) || ''; if(!text){ toast('Paste something first','paste'); return; }
      const src = S.paste.src || cur().p; const isMail = src==='mail' || /^from:/im.test(text);
      const items = isMail ? [text] : text.split('\n').map(s=>s.trim()).filter(Boolean);
      const bank = PASTE_REPLIES[src] || PASTE_REPLIES.ig;
      const think = el.querySelector('#pastethink'); think.innerHTML = `<div class="thinking" style="justify-content:center;margin-top:14px"><span class="dots"><i></i><i></i><i></i></span> Reading ${items.length} ${items.length===1?'message':'messages'} against your brain…</div>`;
      setTimeout(() => { S.paste = {text, src, items, results: items.map((_,i) => bank[i % bank.length])}; rerender(); }, 1500); break; }
    case 'paste-reset': S.paste = {}; rerender(); break;
    case 'copy-one': navigator.clipboard && navigator.clipboard.writeText(S.paste.results[+b.dataset.i]||'').catch(()=>{}); toast('Copied','copy'); break;
    case 'copy-all': navigator.clipboard && navigator.clipboard.writeText((S.paste.results||[]).join('\n\n')).catch(()=>{}); toast(`Copied ${S.paste.results.length} replies`,'copy'); break;
    case 'chat-send': { const inp = document.querySelector('[data-chat-input]'); const q = inp && inp.value.trim(); if(!q) return; inp.value=''; askSage(q); break; }
    case 'toggle-mode': S.mode = S.mode==='dark'?'light':'dark'; applyTheme(); rerender(); break;
    case 'toast': toast(b.dataset.msg || 'Done'); break;
  }
}

/* stage controls */
document.getElementById('themes').addEventListener('click', e => { const b = e.target.closest('.swatch'); if(!b) return; S.theme = b.dataset.t; applyTheme(); rerender(); });
document.getElementById('modes').addEventListener('click', e => { const b = e.target.closest('.pill'); if(!b) return; S.mode = b.dataset.m; applyTheme(); rerender(); });
document.getElementById('restart').addEventListener('click', () => act('restart'));
document.getElementById('skip').addEventListener('click', () => { const th=S.theme, md=S.mode; S = freshState(); S.theme=th; S.mode=md; seedKevin(); S.stack=[{n:'home'}]; S.tab='home'; render('fade'); });

const style = document.createElement('style'); style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}'; document.head.appendChild(style);

/* boot */
S = freshState(); applyTheme(); render('none');
