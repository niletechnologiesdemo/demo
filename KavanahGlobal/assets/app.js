/* ============ Kavanah Global — mobile app screens ============ */
(function(){
var img = KG.img, money = U.money;

function statusbar(){
  return '<div class="island"></div><div class="statusbar"><span>9:41</span>'
  + '<span class="sb-r">'+ico('trending')+ico('zap')+'<span style="width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block">'
  + '<i style="position:absolute;inset:1.5px;right:6px;background:currentColor;border-radius:1px;display:block"></i></span></span></div>';
}
function head(title,sub,opts){
  opts=opts||{};
  return '<div class="ahead">'
  + (opts.back?'<button class="aback" onclick="APP.go(\''+opts.back+'\')">'+ico('chevronLeft')+'</button>':'')
  + '<div style="flex:1;min-width:0"><h2>'+title+'</h2>'+(sub?'<div class="sub">'+sub+'</div>':'')+'</div>'
  + (opts.right||'<button class="aicon" onclick="APP.toast(\'3 new\')">'+ico('bell')+'<i class="d"></i></button>')
  + '</div>';
}
function tabs(active){
  var T=[['today','Today','home'],['practice','Practice','layers'],['journal','Journal','feather'],
         ['circles','Circles','users','12'],['shop','Shop','cart','2']];
  return '<div class="tabbar">'+T.map(function(t){
    return '<button class="tabb '+(active===t[0]?'on':'')+'" onclick="APP.go(\''+t[0]+'\')">'
    + ico(t[2]) + '<span>'+t[1]+'</span>'
    + (t[3]?'<span class="tb">'+t[3]+'</span>':'') + '</button>';
  }).join('')+'</div>';
}
function wrap(inner,tab){ return statusbar()+inner+(tab?tabs(tab):''); }

/* ============ SCREENS ============ */
var S = {};

S.onboard = function(){
  return wrap('<div class="aonb"><div class="aonb-img"><img loading="lazy" src="'+img('org-hero-2')+'" alt=""></div>'
  + '<div class="aonb-b">'
  +   '<img loading="lazy" src="'+KG.root+KG.brand.crestFile+'" style="width:62px;height:62px;border-radius:50%;box-shadow:0 0 0 1px var(--gold-400);margin-bottom:1rem">'
  +   '<span class="eyebrow no-rule" style="color:var(--gold-400)">Kavanah Global</span>'
  +   '<h2>Let light shine</h2>'
  +   '<p style="color:rgba(249,239,212,.8);font-size:.92rem;line-height:1.6;margin-bottom:0">Eight wellness programmes, a journal for your days and nights, a room with people in it, and a shop that pays for all of it.</p>'
  +   '<div class="dots"><i class="on"></i><i></i><i></i></div>'
  +   '<button class="abtn btn-gold" onclick="APP.go(\'today\')">Create a free account</button>'
  +   '<button class="abtn" style="color:var(--gold-200);margin-top:6px" onclick="APP.go(\'today\')">I already have one</button>'
  +   '<p style="font-size:.66rem;color:rgba(249,239,212,.42);text-align:center;margin:.9rem 0 0;line-height:1.5">Education and peer support. Not medical treatment.</p>'
  + '</div></div>');
};

S.today = function(){
  var e=KG.user.enrolled[0], g=KG.byId(KG.programs,e.prog);
  var next=KG.live[0];
  return wrap(
    head('Good morning,<br>Maya','Tuesday, 25 August',{right:'<button class="aicon" onclick="APP.go(\'profile\')">'+U.avatar(KG.user.name,32)+'</button>'})
  + '<div class="appbody"><div class="apad">'
  +  '<div class="ahero"><div class="glow" style="top:-160px;right:-90px"></div>'
  +   '<div class="row-between" style="position:relative;z-index:2">'
  +    '<div><span class="eyebrow no-rule" style="color:var(--gold-400);margin-bottom:.4rem">Your streak</span>'
  +     '<h3>41 days</h3>'
  +     '<p style="color:rgba(249,239,212,.75);font-size:.8rem;margin:0">Longest yet. The morning page is still blank.</p></div>'
  +    '<div style="color:var(--gold-300);flex:none">'+ico('flame')+'</div></div>'
  +   '<div class="aheat" style="margin-top:14px;position:relative;z-index:2">'
  +    Array.from({length:21},function(_,i){ var on=i>1; var v=[.3,.6,.95][(i*5+2)%3];
        return '<i style="background:'+(on?'rgba(217,177,74,'+v+')':'rgba(255,255,255,.12)')+'"></i>'; }).join('')
  +   '</div>'
  +   '<button class="abtn btn-gold" style="margin-top:14px;position:relative;z-index:2" onclick="APP.go(\'journal\')">Write the morning page</button>'
  +  '</div>'
  +  '<div class="aquick">'
  +   [['playCircle','Continue','practice'],['video','Live','live'],['feather','Journal','journal'],['users','Circles','circles']]
      .map(function(q){ return '<button class="aq" onclick="APP.go(\''+q[2]+'\')">'+ico(q[0])+'<span>'+q[1]+'</span></button>'; }).join('')
  +  '</div>'
  +  '<div class="asec">Continue<a onclick="APP.go(\'practice\')">All programmes</a></div>'
  +  '<button class="acard" style="display:flex;gap:12px;text-align:left;width:100%;align-items:center" onclick="APP.go(\'player\')">'
  +   '<img loading="lazy" src="'+img(g.cover)+'" style="width:74px;height:56px;border-radius:8px;object-fit:cover;flex:none">'
  +   '<div style="flex:1;min-width:0"><b style="display:block;font-family:\'Cormorant Garamond\',serif;font-size:1.16rem;color:var(--plum-800)">'+g.title+'</b>'
  +    '<span style="font-size:.7rem;color:var(--ink-3);display:block;margin-bottom:.4rem">'+e.next+'</span>'
  +    '<span class="bar" style="height:5px;display:block"><i style="width:'+e.progress+'%"></i></span></div>'
  +   '<span style="color:var(--gold-600);flex:none">'+ico('playCircle')+'</span></button>'
  +  '<div class="asec">Next live<a onclick="APP.go(\'live\')">Schedule</a></div>'
  +  '<div class="acard"><div class="row" style="gap:12px">'
  +   '<div style="text-align:center;flex:none;width:52px"><b style="display:block;font-family:\'Cormorant Garamond\',serif;font-size:1.3rem;color:var(--plum-800);line-height:1">6:00</b>'
  +   '<span style="font-size:.6rem;color:var(--ink-3)">AM ET</span></div>'
  +   '<div style="flex:1;min-width:0"><b style="font-size:.88rem;display:block;line-height:1.3">'+next.title+'</b>'
  +   '<span style="font-size:.7rem;color:var(--ink-3)">with '+next.guide+' · '+next.mins+' min</span></div></div>'
  +   '<button class="abtn" style="background:var(--plum-700);color:#fff;margin-top:12px" onclick="APP.toast(\'Reserved · we will remind you\')">'+ico('calendar')+'Reserve a place</button></div>'
  +  '<div class="asec">From your circles<a onclick="APP.go(\'circles\')">Open</a></div>'
  +  KG.threads.slice(0,2).map(function(t){
      return '<button class="acard" style="text-align:left;width:100%;display:block" onclick="APP.go(\'thread\')">'
      +'<span class="achip" style="background:var(--plum-100);border-color:transparent;color:var(--plum-700);margin-bottom:.5rem">'+KG.byId(KG.circles,t.circle).name+'</span>'
      +'<b style="display:block;font-size:.92rem;line-height:1.35;margin-bottom:.25rem">'+t.title+'</b>'
      +'<span style="font-size:.72rem;color:var(--ink-3);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+t.body.split('\n')[0]+'</span>'
      +'<div class="row" style="gap:12px;margin-top:.6rem;font-size:.68rem;color:var(--ink-3)">'+U.avatar(t.author,18)
      +'<span>'+t.author+'</span><span>'+t.replies+' replies</span></div></button>'; }).join('')
  +  '<div class="asec">Your impact</div>'
  +  '<div class="acard" style="background:linear-gradient(140deg,var(--gold-100),var(--plum-50));border-color:var(--gold-200)">'
  +   '<div class="row" style="gap:10px;margin-bottom:.7rem"><span style="color:var(--gold-700)">'+ico('flame')+'</span>'
  +   '<b style="font-size:.92rem">14 nights of shelter funded</b></div>'
  +   '<p style="font-size:.74rem;color:var(--ink-2);line-height:1.6;margin:0 0 .8rem">From three orders and your membership. Your sponsored seat this month went to the Still Waters cohort.</p>'
  +   '<button class="achip" onclick="APP.go(\'impact\')">See the impact report '+ico('arrowRight')+'</button></div>'
  + '</div></div>', 'today');
};

S.practice = function(){
  return wrap(
    head('Practice','8 programmes · 3 enrolled')
  + '<div class="appbody"><div class="apad">'
  +  '<div class="row" style="gap:6px;overflow-x:auto;padding-bottom:10px;margin:0 -20px;padding-inline:20px">'
  +   ['All','Enrolled','Recovery','Mind','Body','Spirit'].map(function(c,i){
       return '<button class="achip '+(i===0?'on':'')+'" onclick="APP.toast(\''+c+'\')">'+c+'</button>'; }).join('')
  +  '</div>'
  +  '<div class="asec">Your programmes</div>'
  +  KG.user.enrolled.map(function(e){
      var g=KG.byId(KG.programs,e.prog);
      return '<button class="acard" style="display:flex;gap:12px;text-align:left;width:100%;align-items:center" onclick="APP.go(\'program\')">'
      +'<img loading="lazy" src="'+img(g.cover)+'" style="width:66px;height:66px;border-radius:10px;object-fit:cover;flex:none">'
      +'<div style="flex:1;min-width:0"><b style="display:block;font-family:\'Cormorant Garamond\',serif;font-size:1.14rem;color:var(--plum-800)">'+g.title+'</b>'
      +'<span style="font-size:.7rem;color:var(--ink-3);display:block;margin:.1rem 0 .45rem">'+e.module+'</span>'
      +'<div class="row" style="gap:8px"><span class="bar" style="flex:1;height:5px"><i style="width:'+e.progress+'%"></i></span>'
      +'<span style="font-size:.66rem;color:var(--gold-700);font-weight:700">'+e.progress+'%</span></div></div></button>'; }).join('')
  +  '<div class="asec">Everything else</div>'
  +  KG.programs.filter(function(g){ return !KG.user.enrolled.some(function(e){return e.prog===g.id}); }).map(function(g){
      return '<button class="acard" style="padding:0;overflow:hidden;text-align:left;width:100%;display:block" onclick="APP.go(\'program\')">'
      +'<div style="position:relative"><img loading="lazy" src="'+img(g.cover)+'" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block">'
      +'<span class="achip" style="position:absolute;top:10px;left:10px;background:rgba(255,253,248,.94)">'+g.cat+'</span></div>'
      +'<div style="padding:14px"><b style="display:block;font-family:\'Cormorant Garamond\',serif;font-size:1.22rem;color:var(--plum-800)">'+g.title+'</b>'
      +'<span style="font-size:.74rem;color:var(--gold-700);font-weight:600;display:block;margin-bottom:.35rem">'+g.sub+'</span>'
      +'<span style="font-size:.74rem;color:var(--ink-3);line-height:1.5;display:block">'+g.blurb+'</span>'
      +'<div class="row-between" style="margin-top:.7rem"><span style="font-size:.68rem;color:var(--ink-3)">'+g.weeks+' weeks · '+g.lessonCount+' sessions</span>'
      +'<b style="font-size:.95rem;color:var(--plum-800)">'+money(g.price)+'</b></div></div></button>'; }).join('')
  + '</div></div>', 'practice');
};

S.program = function(){
  var g=KG.byId(KG.programs,'g1'), mods=KG.modulesFor(g.id);
  return wrap(
    '<div class="appbody">'
  + '<div style="position:relative"><img loading="lazy" src="'+img(g.cover)+'" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block">'
  +  '<div style="position:absolute;inset:0;background:linear-gradient(to top,var(--ivory) 3%,rgba(18,6,22,.35) 45%,rgba(18,6,22,.55))"></div>'
  +  '<button class="aback" style="position:absolute;top:14px;left:16px;background:rgba(255,253,248,.9)" onclick="APP.go(\'practice\')">'+ico('chevronLeft')+'</button>'
  +  '<button class="aback" style="position:absolute;top:14px;right:16px;background:rgba(255,253,248,.9)" onclick="APP.toast(\'Saved\')">'+ico('bookmark')+'</button>'
  +  '<div style="position:absolute;left:20px;right:20px;bottom:16px">'
  +   '<span class="achip" style="background:var(--grad-gold);border-color:transparent;color:var(--plum-900)">'+g.cat+'</span>'
  +   '<h2 style="font-size:2rem;margin:.5rem 0 .1rem;color:var(--plum-900)">'+g.title+'</h2>'
  +   '<p style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:1.05rem;color:var(--gold-700);margin:0">'+g.sub+'</p></div></div>'
  + '<div class="apad">'
  +  '<div class="row" style="gap:14px;font-size:.72rem;color:var(--ink-3);margin:14px 0 16px;flex-wrap:wrap">'
  +   '<span class="row" style="gap:.3rem">'+ico('calendar')+g.weeks+' weeks</span>'
  +   '<span class="row" style="gap:.3rem">'+ico('playCircle')+g.lessonCount+'</span>'
  +   '<span class="row" style="gap:.3rem">'+ico('users')+g.students.toLocaleString()+'</span>'
  +   '<span class="row" style="gap:.3rem">'+ico('star')+g.rating+'</span></div>'
  +  '<p style="font-size:.88rem;line-height:1.7;color:var(--ink-2)">'+g.long+'</p>'
  +  '<div class="care" style="margin:14px 0;font-size:.74rem;padding:11px 13px">'+ico('info')+'<span>'+g.care+'</span></div>'
  +  '<div class="asec">Curriculum</div>'
  +  mods.slice(0,3).map(function(m,i){
      return '<div class="acard" style="padding:0;overflow:hidden">'
      +'<div style="padding:12px 14px;background:var(--surface-2);display:flex;align-items:center;gap:10px">'
      +'<span style="color:var(--gold-600)">'+ico('layers')+'</span>'
      +'<b style="font-size:.82rem;flex:1">'+m.t+'</b>'
      +'<span style="font-size:.68rem;color:var(--ink-3)">'+m.ls.length+'</span></div>'
      + m.ls.map(function(l){
        return '<div style="display:flex;gap:10px;align-items:center;padding:10px 14px;border-top:1px solid var(--line-2)">'
        +'<span style="color:var(--'+(l.free?'gold-600':'ink-4')+');flex:none">'+ico(l.free?'playCircle':'lock')+'</span>'
        +'<div style="flex:1;min-width:0"><b style="font-size:.8rem;font-weight:500;display:block">'+l.t+'</b>'
        +'<span style="font-size:.66rem;color:var(--ink-3)">'+l.len+'</span></div>'
        +(l.free?'<span class="achip" style="background:var(--ok-bg);color:var(--ok);border-color:transparent;font-size:.6rem">Free</span>':'')+'</div>'; }).join('')
      +'</div>'; }).join('')
  +  '<button class="achip" style="width:100%;justify-content:center;padding:.7rem" onclick="APP.toast(\'3 more modules\')">Show all '+mods.length+' modules</button>'
  +  '<div class="asec">What is included</div>'
  +  '<div class="acard">'+g.includes.map(function(f){
      return '<div class="row" style="gap:10px;align-items:flex-start;padding:6px 0"><span style="color:var(--gold-600);flex:none">'+ico('check')+'</span>'
      +'<span style="font-size:.8rem;line-height:1.5">'+f+'</span></div>'; }).join('')+'</div>'
  + '</div>'
  + '<div style="padding:14px 20px 20px;border-top:1px solid var(--line-2);background:var(--surface);position:sticky;bottom:0">'
  +  '<div class="row-between" style="margin-bottom:10px"><div><b style="font-family:\'Cormorant Garamond\',serif;font-size:1.7rem;color:var(--plum-800)">'+money(g.price)+'</b>'
  +   '<span style="font-size:.7rem;color:var(--ink-3);display:block">or free with membership</span></div>'
  +   '<button class="achip" onclick="APP.go(\'player\')">'+ico('play')+'2 free</button></div>'
  +  '<button class="abtn btn-gold" onclick="APP.toast(\'Enrolled in '+g.title+'\');APP.go(\'player\')">Enrol in '+g.title+'</button></div>'
  + '</div>');
};

S.player = function(){
  var g=KG.byId(KG.programs,'g1'), ls=KG.flatLessons(g.id), l=ls[7];
  return wrap(
    '<div class="appbody"><div class="apad" style="padding-top:8px">'
  + '<div class="row" style="margin-bottom:10px"><button class="aback" onclick="APP.go(\'program\')">'+ico('chevronLeft')+'</button>'
  +  '<span style="flex:1;text-align:center;font-size:.72rem;color:var(--ink-3);font-weight:600">'+g.title+'</span>'
  +  '<button class="aicon" onclick="APP.toast(\'Audio-only mode\')">'+ico('headphones')+'</button></div>'
  + '<div class="aplayer"><img loading="lazy" src="'+img(l.th)+'" alt="">'
  +  '<button class="aplay" onclick="APP.toast(\'Playing\')">'+ico('play','','currentColor')+'</button>'
  +  '<div style="position:absolute;left:0;right:0;bottom:0;padding:12px;background:linear-gradient(to top,rgba(18,6,22,.9),transparent)">'
  +   '<div style="height:3px;border-radius:99px;background:rgba(255,255,255,.25);margin-bottom:7px"><i style="display:block;width:34%;height:100%;background:var(--grad-gold-soft);border-radius:99px"></i></div>'
  +   '<div class="row-between" style="color:rgba(255,255,255,.85);font-size:.66rem"><span>6:02</span><span>'+l.len+'</span></div></div></div>'
  + '<span class="achip" style="background:var(--plum-100);border-color:transparent;color:var(--plum-700)">'+l.module+'</span>'
  + '<h2 style="font-size:1.4rem;margin:.6rem 0 .3rem;line-height:1.2">'+l.t+'</h2>'
  + '<p style="font-size:.72rem;color:var(--ink-3);margin-bottom:1rem">Session 8 of '+ls.length+' · '+l.len+'</p>'
  + '<div class="row" style="gap:8px;margin-bottom:1rem">'
  +  '<button class="abtn btn-gold" style="flex:1" onclick="APP.toast(\'Marked complete · 44%\')">'+ico('check')+'Mark complete</button>'
  +  '<button class="aback" style="width:44px;height:44px" onclick="APP.toast(\'Downloaded for offline\')">'+ico('download')+'</button></div>'
  + '<div class="row" style="gap:6px;overflow-x:auto;padding-bottom:8px;margin:0 -20px;padding-inline:20px">'
  +  ['Notes','Transcript','Worksheet','Discussion'].map(function(t,i){
      return '<button class="achip '+(i===0?'on':'')+'" onclick="APP.toast(\''+t+'\')">'+t+'</button>'; }).join('')+'</div>'
  + '<div class="acard" style="margin-top:10px">'
  +  '<b style="font-size:.8rem;display:block;margin-bottom:.5rem">Add a note at 6:02</b>'
  +  '<div style="border:1px solid var(--line);border-radius:var(--r-sm);padding:10px;font-size:.78rem;color:var(--ink-4)">Something you want to come back to…</div>'
  +  '<button class="abtn btn-gold" style="margin-top:10px;padding:.6rem" onclick="APP.toast(\'Note saved\')">Save note</button></div>'
  + '<div class="asec">Up next</div>'
  + ls.slice(8,11).map(function(x,i){
     return '<div class="alist"><img loading="lazy" src="'+img(x.th)+'" alt="">'
     +'<div style="flex:1;min-width:0"><b style="font-size:.8rem;font-weight:500;display:block;line-height:1.3">'+x.t+'</b>'
     +'<span style="font-size:.66rem;color:var(--ink-3)">'+x.len+'</span></div>'
     +'<span style="color:var(--ink-4)">'+ico('play')+'</span></div>'; }).join('')
  + '</div></div>', 'practice');
};

S.live = function(){
  return wrap(
    head('Live','14 sessions this week',{back:'today'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="ahero"><div class="glow" style="top:-150px;right:-80px"></div>'
  +  '<div style="position:relative;z-index:2"><span class="eyebrow no-rule" style="color:var(--gold-400)">Starting in</span>'
  +  '<h3 style="font-size:2.2rem">04:12:38</h3>'
  +  '<p style="color:rgba(249,239,212,.78);font-size:.82rem;margin:.3rem 0 0">'+KG.live[0].title+'</p>'
  +  '<button class="abtn btn-gold" style="margin-top:12px" onclick="APP.toast(\'Room opens 10 min before\')">'+ico('video')+'Join the room</button></div></div>'
  + '<div class="row" style="gap:5px;overflow-x:auto;padding-bottom:10px;margin:0 -20px;padding-inline:20px">'
  +  ['Mon 1','Tue 2','Wed 3','Thu 4','Fri 5','Sat 6','Sun 7'].map(function(d,i){
      return '<button class="achip '+(i===0?'on':'')+'" onclick="APP.toast(\''+d+'\')">'+d+'</button>'; }).join('')+'</div>'
  + KG.live.slice(0,5).map(function(s){
     return '<div class="acard"><div class="row" style="gap:12px;align-items:flex-start">'
     +'<div style="text-align:center;flex:none;width:50px"><b style="display:block;font-family:\'Cormorant Garamond\',serif;font-size:1.2rem;color:var(--plum-800);line-height:1">'+s.time.replace(/ (AM|PM)/,'')+'</b>'
     +'<span style="font-size:.58rem;color:var(--ink-3)">'+(s.time.match(/AM|PM/)||[''])[0]+' ET</span></div>'
     +'<div style="flex:1;min-width:0">'
     +'<div class="row" style="gap:6px;margin-bottom:.25rem;flex-wrap:wrap"><span class="achip" style="font-size:.6rem;padding:.2rem .5rem;background:var(--gold-100);border-color:transparent;color:var(--gold-800)">'+s.type+'</span>'
     +(s.closed?'<span class="achip" style="font-size:.6rem;padding:.2rem .5rem">'+ico('lock')+'Closed</span>':'')+'</div>'
     +'<b style="font-size:.85rem;display:block;line-height:1.3">'+s.title+'</b>'
     +'<span style="font-size:.68rem;color:var(--ink-3)">'+s.mins+' min · '+s.taken+'/'+s.seats+' places</span></div></div>'
     +'<button class="abtn" style="background:var(--plum-700);color:#fff;margin-top:10px;padding:.6rem" onclick="APP.toast(\'Reserved\')">Reserve a place</button></div>'; }).join('')
  + '</div></div>', 'today');
};

S.journal = function(){
  return wrap(
    head('Mood Journal','41-day streak',{right:'<button class="aicon" onclick="APP.go(\'insights\')">'+ico('chart')+'</button>'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="row" style="gap:6px;margin-bottom:16px">'
  +  '<button class="achip on" style="flex:1;justify-content:center;padding:.6rem">'+ico('sun')+'Morning</button>'
  +  '<button class="achip" style="flex:1;justify-content:center;padding:.6rem" onclick="APP.toast(\'Night page\')">'+ico('moon')+'Night</button></div>'
  + '<div class="acard">'
  +  '<b style="font-size:.86rem;display:block;margin-bottom:.7rem">How are you, honestly?</b>'
  +  '<div class="amood">'+KG.moods.map(function(m,i){
      return '<button class="am" style="'+(i===3?'border-color:'+m.color+';border-width:2px;background:'+m.color+'14':'')+'" onclick="APP.toast(\''+m.label+'\')">'
      +'<span style="color:'+m.color+'">'+ico(m.icon)+'</span><span style="color:'+(i===3?m.color:'var(--ink-2)')+'">'+m.label+'</span></button>'; }).join('')+'</div>'
  + '</div>'
  + '<div class="acard">'
  +  '<b style="font-size:.86rem;display:block;margin-bottom:.7rem">What is present?</b>'
  +  '<div style="display:flex;flex-wrap:wrap;gap:6px">'+KG.emotions.slice(0,10).map(function(e,i){
      return '<button class="achip '+([0,2].indexOf(i)>-1?'on':'')+'" style="font-size:.68rem" onclick="APP.toast(\''+e+'\')">'+e+'</button>'; }).join('')+'</div></div>'
  + '<div class="acard">'
  +  ['Energy','Craving / urge'].map(function(l,i){
      return '<div style="margin-bottom:'+(i?0:'14px')+'"><div class="row-between" style="margin-bottom:.4rem">'
      +'<b style="font-size:.78rem">'+l+'</b><b style="font-size:.78rem;color:var(--gold-700)">'+(i?2:3)+'</b></div>'
      +'<div style="height:6px;border-radius:99px;background:var(--sand);position:relative">'
      +'<i style="display:block;width:'+(i?40:60)+'%;height:100%;background:var(--grad-gold-soft);border-radius:99px"></i>'
      +'<span style="position:absolute;left:'+(i?40:60)+'%;top:50%;transform:translate(-50%,-50%);width:18px;height:18px;border-radius:50%;background:var(--grad-gold);border:2px solid var(--paper);box-shadow:var(--sh-gold)"></span></div></div>'; }).join('')
  + '</div>'
  + '<div class="acard">'
  +  '<b style="font-size:.86rem;display:block;margin-bottom:.5rem">What is one thing I am turning toward today?</b>'
  +  '<div style="border:1px solid var(--line);border-radius:var(--r-sm);padding:12px;font-size:.78rem;color:var(--ink-4);min-height:76px;line-height:1.6">Write as much or as little as you like. Nobody else sees this.</div>'
  +  '<div class="row-between" style="margin-top:.7rem"><span class="row" style="gap:.3rem;font-size:.66rem;color:var(--ink-3)">'+ico('lock')+'Private</span>'
  +  '<button class="achip on" onclick="APP.toast(\'Saved · streak 42\')">Save entry</button></div></div>'
  + '<div class="asec">Recent<a onclick="APP.go(\'insights\')">Insights</a></div>'
  + U.Journal.all().slice(0,3).map(function(e){
     var m=KG.moods[(e.pm?e.pm.m:e.am.m)-1];
     return '<div class="acard"><div class="row-between" style="margin-bottom:.5rem">'
     +'<b style="font-family:\'Cormorant Garamond\',serif;font-size:1.05rem;color:var(--plum-800)">'
     + new Date(e.d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})+'</b>'
     +'<span class="row" style="gap:.35rem"><span style="width:9px;height:9px;border-radius:50%;background:'+m.color+';display:block"></span>'
     +'<span style="font-size:.7rem;color:'+m.color+';font-weight:600">'+m.label+'</span></span></div>'
     +'<p style="font-size:.76rem;color:var(--ink-2);line-height:1.65;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">'+(e.pm?e.pm.t:e.am.t)+'</p></div>'; }).join('')
  + '</div></div>', 'journal');
};

S.insights = function(){
  var W=310,H=110,pad=14;
  var series=[3,2,4,5,3,2,3,4,4,5,3,4,5,4,3,4,5,5,4,3,4,5,4,5,3,4,5,4,3,4];
  var path=series.map(function(v,i){
    var x=pad+i*((W-pad*2)/(series.length-1)), y=H-pad-((v-1)/4)*(H-pad*2);
    return (i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1); }).join(' ');
  return wrap(
    head('Insights','What the journal noticed',{back:'journal'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="acard"><b style="font-size:.86rem;display:block;margin-bottom:.7rem">Mood, last 30 days</b>'
  +  '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto">'
  +   '<defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9B14A" stop-opacity=".32"/><stop offset="1" stop-color="#D9B14A" stop-opacity="0"/></linearGradient></defs>'
  +   [1,3,5].map(function(v){ var y=H-pad-((v-1)/4)*(H-pad*2);
       return '<line x1="'+pad+'" x2="'+(W-pad)+'" y1="'+y+'" y2="'+y+'" stroke="#EFE6D6"/>'; }).join('')
  +   '<path d="'+path+' L'+(W-pad)+' '+(H-pad)+' L'+pad+' '+(H-pad)+' Z" fill="url(#ag)"/>'
  +   '<path d="'+path+'" fill="none" stroke="#A87C16" stroke-width="1.8" stroke-linejoin="round"/></svg>'
  +  '<div class="row-between" style="font-size:.64rem;color:var(--ink-3);margin-top:.3rem"><span>30 days ago</span><span>Today</span></div></div>'
  + '<div class="row" style="gap:10px;margin-bottom:12px">'
  +  [['3.9','Average mood'],['7.1h','Average sleep'],['41','Day streak']].map(function(t){
      return '<div class="atile" style="flex:1"><b>'+t[0]+'</b><span>'+t[1]+'</span></div>'; }).join('')+'</div>'
  + '<div class="asec">Patterns</div>'
  + [['moon','Sleep is your biggest lever','Mood is 1.4 points higher after 7+ hours.'],
     ['clock','4pm is your hard hour','Craving peaks 3–5pm on 11 of 14 weekdays.'],
     ['feather','Mornings you write end better','3.9 with a morning page, 3.1 without.'],
     ['users','You post when you are low','6 of your last 7 circle posts came on a 2 or below.']]
    .map(function(x){
      return '<div class="acard"><div class="row" style="gap:11px;align-items:flex-start">'
      +'<span style="color:var(--gold-600);flex:none">'+ico(x[0])+'</span>'
      +'<div><b style="font-size:.82rem;display:block;margin-bottom:.15rem">'+x[1]+'</b>'
      +'<span style="font-size:.72rem;color:var(--ink-3);line-height:1.55">'+x[2]+'</span></div></div></div>'; }).join('')
  + '<div class="asec">Most-named feelings</div>'
  + '<div class="acard">'+[['Calm',9],['Tired',7],['Grateful',6],['Anxious',5],['Hopeful',4]].map(function(a){
      return '<div class="row" style="gap:9px;margin-bottom:7px"><span style="font-size:.74rem;width:64px;flex:none">'+a[0]+'</span>'
      +'<span class="bar" style="flex:1;height:6px"><i style="width:'+(a[1]/9*100)+'%"></i></span>'
      +'<span style="font-size:.66rem;color:var(--ink-3);width:12px;text-align:right">'+a[1]+'</span></div>'; }).join('')+'</div>'
  + '</div></div>', 'journal');
};

S.circles = function(){
  return wrap(
    head('Circles','You post as Marigold',{right:'<button class="aicon" onclick="APP.toast(\'New post\')">'+ico('pen')+'</button>'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="acard" style="background:linear-gradient(140deg,var(--gold-100),var(--plum-50));border-color:var(--gold-200)">'
  +  '<div class="row" style="gap:10px;margin-bottom:.5rem"><span style="color:var(--gold-700)">'+ico('eyeOff')+'</span>'
  +  '<b style="font-size:.88rem">Nobody here uses their real name</b></div>'
  +  '<p style="font-size:.74rem;color:var(--ink-2);line-height:1.6;margin:0">Your handle is Marigold. No guide or moderator can see who is behind it.</p></div>'
  + '<div class="ascroll" style="margin-bottom:4px">'
  +  KG.circles.map(function(c){
      return '<button class="acourse" style="width:158px" onclick="APP.go(\'thread\')">'
      +'<div style="position:relative"><img loading="lazy" src="'+img(c.img)+'" alt="">'
      +'<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(18,6,22,.9),transparent 60%)"></div>'
      +'<div style="position:absolute;left:10px;right:10px;bottom:8px"><b style="color:#fff;font-family:\'Cormorant Garamond\',serif;font-size:1.05rem;display:block">'+c.name+'</b>'
      +'<span style="font-size:.6rem;color:var(--gold-300)">'+c.members.toLocaleString()+' members</span></div></div></button>'; }).join('')
  + '</div>'
  + '<div class="row" style="gap:6px;overflow-x:auto;padding:10px 0;margin:0 -20px;padding-inline:20px">'
  +  ['Latest','Most held','Unanswered','Mine'].map(function(t,i){
      return '<button class="achip '+(i===0?'on':'')+'" onclick="APP.toast(\''+t+'\')">'+t+'</button>'; }).join('')+'</div>'
  + KG.threads.slice(0,5).map(function(t){
     var c=KG.byId(KG.circles,t.circle);
     return '<button class="acard" style="text-align:left;width:100%;display:block" onclick="APP.go(\'thread\')">'
     +'<div class="row" style="gap:6px;margin-bottom:.45rem;flex-wrap:wrap">'
     +'<span class="achip" style="font-size:.6rem;padding:.2rem .5rem;background:var(--plum-100);border-color:transparent;color:var(--plum-700)">'+c.name+'</span>'
     +(t.pinned?'<span class="achip" style="font-size:.6rem;padding:.2rem .5rem;background:var(--gold-100);border-color:transparent;color:var(--gold-800)">Pinned</span>':'')+'</div>'
     +'<b style="display:block;font-size:.92rem;line-height:1.35;margin-bottom:.3rem">'+t.title+'</b>'
     +'<span style="font-size:.74rem;color:var(--ink-3);line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">'+t.body.split('\n')[0]+'</span>'
     +'<div class="row" style="gap:12px;margin-top:.65rem;font-size:.68rem;color:var(--ink-3)">'+U.avatar(t.author,20)
     +'<span>'+t.author+'</span><span class="row" style="gap:.25rem">'+ico('message')+t.replies+'</span>'
     +'<span class="row" style="gap:.25rem">'+ico('thumb')+t.likes+'</span></div></button>'; }).join('')
  + '</div></div>', 'circles');
};

S.thread = function(){
  var t=KG.threads[0], c=KG.byId(KG.circles,t.circle);
  return wrap(
    head(c.name,t.replies+' replies',{back:'circles'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="acard">'
  +  '<div class="row" style="gap:10px;margin-bottom:.8rem">'+U.avatar(t.author,36)
  +  '<div><b style="font-size:.84rem;display:block">'+t.author+'</b><span style="font-size:.68rem;color:var(--ink-3)">'+t.ago+'</span></div></div>'
  +  '<h2 style="font-size:1.28rem;line-height:1.25;margin-bottom:.7rem">'+t.title+'</h2>'
  +  t.body.split('\n\n').map(function(p){ return '<p style="font-size:.82rem;line-height:1.75;color:var(--ink-2);margin:0 0 .8rem">'+U.esc(p)+'</p>'; }).join('')
  +  '<div class="row" style="gap:6px;padding-top:.7rem;border-top:1px solid var(--line-2)">'
  +   '<button class="achip" onclick="APP.toast(\'Held\')">'+ico('thumb')+t.likes+'</button>'
  +   '<button class="achip" onclick="APP.toast(\'Reply\')">'+ico('message')+'Reply</button>'
  +   '<button class="achip" onclick="APP.toast(\'Saved\')">'+ico('bookmark')+'</button></div></div>'
  + '<div class="asec">'+t.replies+' replies</div>'
  + t.reps.map(function(r){
     return '<div class="acard"><div class="row" style="gap:10px;margin-bottom:.6rem">'+U.avatar(r.a,30)
     +'<div style="flex:1"><div class="row" style="gap:6px"><b style="font-size:.8rem">'+r.a+'</b>'
     +(r.badge?'<span class="achip" style="font-size:.56rem;padding:.15rem .42rem;background:var(--grad-gold);border-color:transparent;color:var(--plum-900)">'+r.badge+'</span>':'')+'</div>'
     +'<span style="font-size:.66rem;color:var(--ink-3)">'+r.ago+'</span></div></div>'
     +r.b.split('\n\n').map(function(p){ return '<p style="font-size:.78rem;line-height:1.7;color:var(--ink-2);margin:0 0 .6rem">'+U.esc(p)+'</p>'; }).join('')
     +'<button class="achip" style="font-size:.64rem" onclick="APP.toast(\'Held\')">'+ico('thumb')+r.likes+'</button></div>'; }).join('')
  + '<div class="acard" style="position:sticky;bottom:0">'
  +  '<div class="row" style="gap:10px">'+U.avatar(KG.user.handle,32)
  +  '<div style="flex:1;border:1px solid var(--line);border-radius:var(--r-pill);padding:.6rem .9rem;font-size:.76rem;color:var(--ink-4)">Reply as Marigold…</div>'
  +  '<button class="aicon" style="background:var(--grad-gold);color:var(--plum-900)" onclick="APP.toast(\'Posted\')">'+ico('send')+'</button></div></div>'
  + '</div></div>', 'circles');
};

S.shop = function(){
  return wrap(
    head('Shop','Every order funds the .org',{right:'<button class="aicon" onclick="APP.go(\'bag\')">'+ico('cart')+'<i class="d"></i></button>'})
  + '<div class="appbody"><div class="apad">'
  + '<div style="border:1px solid var(--line);border-radius:var(--r-pill);padding:.62rem 1rem;display:flex;gap:.5rem;align-items:center;color:var(--ink-4);font-size:.8rem;margin-bottom:14px;background:var(--surface-2)">'
  +  ico('search')+'Search candles, mala, journal…</div>'
  + '<div class="ascroll">'+KG.categories.map(function(c){
     return '<button class="acourse" style="width:126px" onclick="APP.toast(\''+c.name+'\')">'
     +'<div style="position:relative"><img loading="lazy" src="'+img(c.img)+'" style="aspect-ratio:1" alt="">'
     +'<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(18,6,22,.9),transparent 55%)"></div>'
     +'<b style="position:absolute;left:9px;right:9px;bottom:8px;color:#fff;font-size:.74rem;line-height:1.2">'+c.name+'</b></div></button>'; }).join('')+'</div>'
  + '<div class="acard" style="background:linear-gradient(140deg,var(--gold-100),var(--plum-50));border-color:var(--gold-200);margin-top:14px">'
  +  '<div class="row" style="gap:10px"><span style="color:var(--gold-700);flex:none">'+ico('flame')+'</span>'
  +  '<div><b style="font-size:.84rem;display:block">Every order funds the work</b>'
  +  '<span style="font-size:.72rem;color:var(--ink-2);line-height:1.5">We show you what each item pays for before you buy it.</span></div></div></div>'
  + '<div class="asec">Bestsellers<a onclick="APP.toast(\'All 31 products\')">See all</a></div>'
  + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
  + ['p01','p24','p19','p27'].map(function(id){
     var p=KG.byId(KG.products,id);
     return '<button class="aprod" style="width:auto;text-align:left" onclick="APP.go(\'product\')">'
     +'<div style="position:relative"><img loading="lazy" src="'+img(p.imgs[0])+'" alt="">'
     +(p.badge?'<span class="achip" style="position:absolute;top:8px;left:8px;font-size:.56rem;padding:.18rem .45rem;background:rgba(255,253,248,.94)">'+p.badge+'</span>':'')+'</div>'
     +'<b style="font-size:.8rem;display:block;line-height:1.3">'+p.name+'</b>'
     +'<div class="row-between" style="margin-top:.25rem"><b style="font-size:.84rem;color:var(--plum-800)">'+money(p.price)+'</b>'
     +'<span style="font-size:.62rem;color:var(--gold-700);font-weight:600">'+p.funds.replace(/^1 /,'')+'</span></div></button>'; }).join('')
  + '</div></div></div>', 'shop');
};

S.product = function(){
  var p=KG.byId(KG.products,'p01');
  return wrap(
    '<div class="appbody">'
  + '<div style="position:relative"><img loading="lazy" src="'+img(p.imgs[0])+'" style="width:100%;aspect-ratio:1;object-fit:cover;display:block">'
  +  '<button class="aback" style="position:absolute;top:14px;left:16px;background:rgba(255,253,248,.9)" onclick="APP.go(\'shop\')">'+ico('chevronLeft')+'</button>'
  +  '<button class="aback" style="position:absolute;top:14px;right:16px;background:rgba(255,253,248,.9)" onclick="APP.toast(\'Saved\')">'+ico('heart')+'</button>'
  +  '<div style="position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:5px">'
  +   p.imgs.map(function(_,i){ return '<i style="width:'+(i===0?18:6)+'px;height:6px;border-radius:99px;background:'+(i===0?'var(--grad-gold)':'rgba(255,255,255,.55)')+';display:block"></i>'; }).join('')+'</div></div>'
  + '<div class="apad" style="padding-top:16px">'
  +  '<span class="achip" style="background:var(--gold-100);border-color:transparent;color:var(--gold-800);font-size:.62rem">'+p.badge+'</span>'
  +  '<h2 style="font-size:1.5rem;margin:.5rem 0 .3rem;line-height:1.2">'+p.name+'</h2>'
  +  '<div class="row" style="gap:.5rem;margin-bottom:.7rem">'+U.stars(p.rating)+'<span style="font-size:.7rem;color:var(--ink-3)">'+p.rating+' · '+p.reviews+' reviews</span></div>'
  +  '<b style="font-family:\'Cormorant Garamond\',serif;font-size:1.9rem;color:var(--plum-800);display:block;margin-bottom:.7rem">'+money(p.price)+'</b>'
  +  '<p style="font-size:.84rem;line-height:1.7;color:var(--ink-2)">'+p.desc+'</p>'
  +  '<div class="asec">'+p.variants.label+'</div>'
  +  '<div class="row" style="gap:6px;flex-wrap:wrap">'+p.variants.options.map(function(o,i){
      return '<button class="achip '+(i===0?'on':'')+'" onclick="APP.toast(\''+o+'\')">'+o+'</button>'; }).join('')+'</div>'
  +  '<div class="acard" style="background:linear-gradient(140deg,var(--gold-100),var(--plum-50));border-color:var(--gold-200);margin-top:16px">'
  +   '<div class="row" style="gap:10px"><span style="color:var(--gold-700);flex:none">'+ico('flame')+'</span>'
  +   '<div><b style="font-size:.84rem;display:block">This order funds '+p.funds+'</b>'
  +   '<span style="font-size:.72rem;color:var(--ink-2);line-height:1.5">A bed, clean linen and a locked door for one person tonight.</span></div></div></div>'
  +  '<div class="asec">Details</div>'
  +  '<div class="acard">'+p.details.map(function(d){
      return '<div class="row" style="gap:9px;align-items:flex-start;padding:5px 0"><span style="color:var(--gold-600);flex:none">'+ico('check')+'</span>'
      +'<span style="font-size:.78rem;line-height:1.5">'+d+'</span></div>'; }).join('')+'</div>'
  + '</div>'
  + '<div style="padding:14px 20px 20px;border-top:1px solid var(--line-2);background:var(--surface);position:sticky;bottom:0">'
  +  '<button class="abtn btn-gold" onclick="APP.toast(\'Added to your bag\');APP.go(\'bag\')">'+ico('cart')+'Add to bag — '+money(p.price)+'</button></div>'
  + '</div>');
};

S.bag = function(){
  var items=[['p01','Standard — 7.5\"',1],['p24','Amethyst',1]];
  var sub=items.reduce(function(a,i){ return a+KG.byId(KG.products,i[0]).price*i[2]; },0);
  return wrap(
    head('Your bag','2 items',{back:'shop'})
  + '<div class="appbody"><div class="apad">'
  + items.map(function(i){
     var p=KG.byId(KG.products,i[0]);
     return '<div class="acard"><div class="row" style="gap:12px">'
     +'<img loading="lazy" src="'+img(p.imgs[0])+'" style="width:64px;height:64px;border-radius:10px;object-fit:cover;flex:none">'
     +'<div style="flex:1;min-width:0"><b style="font-size:.85rem;display:block;line-height:1.3">'+p.name+'</b>'
     +'<span style="font-size:.68rem;color:var(--ink-3)">'+i[1]+'</span>'
     +'<div class="row-between" style="margin-top:.5rem">'
     +'<span class="row" style="gap:0;border:1px solid var(--line);border-radius:99px">'
     +'<button style="width:26px;height:26px;display:grid;place-items:center;color:var(--ink-3)" onclick="APP.toast(\'Updated\')">'+ico('minus')+'</button>'
     +'<span style="font-size:.76rem;font-weight:700;width:22px;text-align:center">'+i[2]+'</span>'
     +'<button style="width:26px;height:26px;display:grid;place-items:center;color:var(--ink-3)" onclick="APP.toast(\'Updated\')">'+ico('plus')+'</button></span>'
     +'<b style="font-size:.9rem;color:var(--plum-800)">'+money(p.price*i[2])+'</b></div></div></div></div>'; }).join('')
  + '<div class="acard" style="background:linear-gradient(140deg,var(--gold-100),var(--plum-50));border-color:var(--gold-200)">'
  +  '<div class="row" style="gap:10px"><span style="color:var(--gold-700);flex:none">'+ico('flame')+'</span>'
  +  '<div><b style="font-size:.84rem;display:block">This bag funds 1 night of shelter and 2 class seats</b>'
  +  '<span style="font-size:.72rem;color:var(--ink-2)">You will see it on your impact ledger.</span></div></div></div>'
  + '<div class="acard">'
  +  '<div class="row-between" style="padding:.3rem 0;font-size:.82rem"><span style="color:var(--ink-3)">Subtotal</span><b>'+money(sub)+'</b></div>'
  +  '<div class="row-between" style="padding:.3rem 0;font-size:.82rem"><span style="color:var(--ink-3)">Shipping</span><span style="color:var(--ok);font-weight:600">Free</span></div>'
  +  '<div class="row-between" style="padding:.3rem 0;font-size:.82rem"><span style="color:var(--ink-3)">NY sales tax</span><span>'+money(sub*0.08875)+'</span></div>'
  +  '<div class="row-between" style="padding:.7rem 0 0;margin-top:.5rem;border-top:1px solid var(--line);font-size:1.05rem"><b>Total</b><b>'+money(sub*1.08875)+'</b></div></div>'
  + '<button class="abtn btn-gold" style="margin-top:6px" onclick="APP.toast(\'Apple Pay sheet would open\')">'+ico('lock')+'Pay '+money(sub*1.08875)+'</button>'
  + '<p style="font-size:.66rem;color:var(--ink-3);text-align:center;margin-top:.7rem">Demonstration only. No payment is taken.</p>'
  + '</div></div>', 'shop');
};

S.impact = function(){
  return wrap(
    head('Your impact','Since March 2026',{back:'today'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="ahero"><div class="glow" style="top:-160px;right:-90px"></div>'
  +  '<div style="position:relative;z-index:2"><span class="eyebrow no-rule" style="color:var(--gold-400)">You have funded</span>'
  +  '<h3 style="font-size:2.4rem">14 nights</h3>'
  +  '<p style="color:rgba(249,239,212,.78);font-size:.84rem;margin:.3rem 0 0;line-height:1.6">of shelter, plus 9 breakfasts and 6 class seats — from three orders and your membership.</p></div></div>'
  + '<div class="row" style="gap:10px;margin-bottom:14px">'
  +  [['14','Nights'],['9','Breakfasts'],['6','Seats']].map(function(t){
      return '<div class="atile" style="flex:1;text-align:center"><b>'+t[0]+'</b><span>'+t[1]+'</span></div>'; }).join('')+'</div>'
  + '<div class="asec">What a dollar buys</div>'
  + KG.impact.perDollar.map(function(d){
     return '<div class="acard"><div class="row" style="gap:11px;align-items:flex-start">'
     +'<span style="color:var(--gold-600);flex:none">'+ico(d.icon)+'</span>'
     +'<div><b style="font-size:.84rem;display:block">'+d.n+' — '+d.t+'</b>'
     +'<span style="font-size:.72rem;color:var(--ink-3);line-height:1.55">'+d.d+'</span></div></div></div>'; }).join('')
  + '<div class="asec">Your ledger</div>'
  + KG.user.orders.map(function(o){
     return '<div class="alist"><div style="flex:1"><b style="font-size:.8rem;display:block">'+o.id+'</b>'
     +'<span style="font-size:.68rem;color:var(--ink-3)">'+o.date+'</span></div>'
     +'<div style="text-align:right"><b style="font-size:.8rem;display:block">'+money(o.total)+'</b>'
     +'<span style="font-size:.66rem;color:var(--gold-700);font-weight:600">'+o.funded+'</span></div></div>'; }).join('')
  + '<button class="abtn" style="background:var(--plum-700);color:#fff;margin-top:16px" onclick="APP.go(\'shop\')">Shop and fund more</button>'
  + '</div></div>', 'today');
};

S.shelter = function(){
  return wrap(
    head('Shelter tonight','Two houses open now',{back:'today'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="acard" style="background:var(--err-bg);border-color:#EBD3D6">'
  +  '<div class="row" style="gap:10px;align-items:flex-start"><span style="color:var(--err);flex:none">'+ico('alert')+'</span>'
  +  '<div><b style="font-size:.82rem;display:block;color:#7C2833">If you are in danger right now</b>'
  +  '<span style="font-size:.74rem;color:#7C2833;line-height:1.55">Call 911. For the Suicide &amp; Crisis Lifeline, call or text 988.</span></div></div></div>'
  + '<div class="ahero"><div class="glow" style="top:-150px;right:-80px"></div>'
  +  '<div style="position:relative;z-index:2"><span class="eyebrow no-rule" style="color:var(--gold-400)">Astoria house</span>'
  +  '<h3 style="font-size:2rem">14 beds free</h3>'
  +  '<p style="color:rgba(249,239,212,.78);font-size:.82rem;margin:.3rem 0 0">Intake 7:00 – 11:00 PM, every night of the year.</p>'
  +  '<button class="abtn btn-gold" style="margin-top:12px" onclick="APP.toast(\'Calling (516) 000-0000\')">'+ico('phone')+'Call the house</button>'
  +  '<button class="abtn" style="background:rgba(255,255,255,.12);color:var(--gold-200);margin-top:6px" onclick="APP.toast(\'Bed held. Someone will call you.\')">Hold a bed for tonight</button></div></div>'
  + '<div class="asec">What happens</div>'
  + [['pin','You arrive','Ring the bell. Somebody answers it.'],
     ['bed','A bed and a locked door','Clean linen, a locker, staff until morning.'],
     ['coffee','Breakfast and a shower','Hot food from 6:30am.'],
     ['compass','Whatever comes next','No pressure at all, ever.']]
    .map(function(s,i){
      return '<div class="acard"><div class="row" style="gap:11px;align-items:flex-start">'
      +'<span style="color:var(--gold-600);flex:none">'+ico(s[0])+'</span>'
      +'<div><b style="font-size:.84rem;display:block">'+(i+1)+'. '+s[1]+'</b>'
      +'<span style="font-size:.74rem;color:var(--ink-3);line-height:1.55">'+s[2]+'</span></div></div></div>'; }).join('')
  + '<div class="acard"><b style="font-size:.84rem;display:block;margin-bottom:.6rem">We never ask about</b>'
  +  ['Immigration status','Proof of address or income','Why you need a bed','Whether you are sober']
    .map(function(x){ return '<div class="row" style="gap:9px;padding:4px 0"><span style="color:var(--err);flex:none">'+ico('close')+'</span>'
      +'<span style="font-size:.76rem">'+x+'</span></div>'; }).join('')+'</div>'
  + '</div></div>', 'today');
};

S.profile = function(){
  return wrap(
    head('You','Practitioner member',{back:'today'})
  + '<div class="appbody"><div class="apad">'
  + '<div class="acard" style="text-align:center;padding:24px">'
  +  U.avatar(KG.user.name,72)
  +  '<b style="display:block;font-family:\'Cormorant Garamond\',serif;font-size:1.5rem;color:var(--plum-800);margin-top:.7rem">'+KG.user.name+'</b>'
  +  '<span style="font-size:.74rem;color:var(--ink-3)">Posts as Marigold · member since '+KG.user.joined+'</span>'
  +  '<div class="row" style="gap:10px;margin-top:1rem">'
  +   [['41','Streak'],['128','Sessions'],['36h','Practised']].map(function(t){
       return '<div class="atile" style="flex:1;text-align:center;background:var(--surface-2)"><b>'+t[0]+'</b><span>'+t[1]+'</span></div>'; }).join('')+'</div></div>'
  + '<div class="acard" style="background:var(--grad-plum);color:var(--gold-100)">'
  +  '<div class="row-between" style="margin-bottom:.5rem"><b style="color:#fff;font-size:.95rem">Practitioner</b>'
  +  '<span class="achip" style="background:rgba(217,177,74,.2);border-color:transparent;color:var(--gold-200);font-size:.62rem">Active</span></div>'
  +  '<p style="font-size:.76rem;color:rgba(249,239,212,.75);line-height:1.6;margin:0 0 .8rem">$39/month · renews 12 September. Includes 15% off everything in the shop, and sponsors one seat a month.</p>'
  +  '<button class="abtn" style="background:rgba(255,255,255,.12);color:var(--gold-200)" onclick="APP.toast(\'Membership settings\')">Manage membership</button></div>'
  + '<div class="asec">Your practice</div>'
  + '<div class="acard" style="padding:0;overflow:hidden">'
  + [['flame','Your impact','14 nights funded','impact'],['bed','Shelter services','Two houses open tonight','shelter'],
     ['video','Live schedule','14 sessions this week','live'],['chart','Journal insights','4 patterns noticed','insights']]
    .map(function(r,i){
      return '<button style="display:flex;gap:12px;align-items:center;padding:13px 16px;width:100%;text-align:left;'+(i?'border-top:1px solid var(--line-2)':'')+'" onclick="APP.go(\''+r[3]+'\')">'
      +'<span style="color:var(--gold-600);flex:none">'+ico(r[0])+'</span>'
      +'<div style="flex:1;min-width:0"><b style="font-size:.84rem;display:block">'+r[1]+'</b>'
      +'<span style="font-size:.7rem;color:var(--ink-3)">'+r[2]+'</span></div>'
      +'<span style="color:var(--ink-4)">'+ico('chevronRight')+'</span></button>'; }).join('')+'</div>'
  + '<div class="asec">Settings</div>'
  + '<div class="acard" style="padding:0;overflow:hidden">'
  + [['user','Account and handle'],['bell','Notifications'],['lock','Privacy and journal data'],['download','Export my data'],['info','About Kavanah Global'],['logout','Sign out']]
    .map(function(r,i){
      return '<button style="display:flex;gap:12px;align-items:center;padding:13px 16px;width:100%;text-align:left;'+(i?'border-top:1px solid var(--line-2)':'')+'" onclick="APP.toast(\''+r[1]+'\')">'
      +'<span style="color:var(--ink-3);flex:none">'+ico(r[0])+'</span>'
      +'<b style="font-size:.84rem;flex:1">'+r[1]+'</b>'
      +'<span style="color:var(--ink-4)">'+ico('chevronRight')+'</span></button>'; }).join('')+'</div>'
  + '</div></div>', 'today');
};

window.APP_SCREENS = S;
window.APP_META = [
  {g:'Getting in'},
  {k:'onboard',t:'Welcome',d:'Onboarding',i:'sparkle'},
  {g:'Every day'},
  {k:'today',t:'Today',d:'Home',i:'home'},
  {k:'journal',t:'Mood Journal',d:'Morning & night check-in',i:'feather'},
  {k:'insights',t:'Journal insights',d:'Patterns it noticed',i:'chart'},
  {g:'Practice'},
  {k:'practice',t:'Programmes',d:'Browse and continue',i:'layers'},
  {k:'program',t:'Programme detail',d:'Curriculum and enrol',i:'book'},
  {k:'player',t:'Session player',d:'Watch, note, complete',i:'playCircle'},
  {k:'live',t:'Live schedule',d:'14 sessions a week',i:'video'},
  {g:'People'},
  {k:'circles',t:'Circles',d:'Pseudonymous community',i:'users'},
  {k:'thread',t:'Thread',d:'Read and reply',i:'message'},
  {g:'Shop & impact'},
  {k:'shop',t:'Shop',d:'The .com, inside the app',i:'cart'},
  {k:'product',t:'Product',d:'With what it funds',i:'gift'},
  {k:'bag',t:'Bag & pay',d:'Apple Pay checkout',i:'card'},
  {k:'impact',t:'Your impact',d:'Personal ledger',i:'flame'},
  {g:'The work'},
  {k:'shelter',t:'Shelter tonight',d:'Beds free, call, hold',i:'bed'},
  {k:'profile',t:'Profile',d:'Membership and settings',i:'user'}
];
})();
