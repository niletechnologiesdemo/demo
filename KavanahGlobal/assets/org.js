/* ============ kavanahglobal.org — chrome & components ============ */
(function(){
  var R = KG.root, crest = R + KG.brand.crestFile;

  window.ORG = {
    /* ---------- Marketing top nav ---------- */
    nav:function(active){
      var links=[['index.html','Home','home'],['programs.html','Programmes','programs'],
                 ['live.html','Live','live'],['community.html','Community','community'],
                 ['shelter.html','Shelter','shelter'],['sanctuary.html','Sanctuary','sanctuary'],
                 ['membership.html','Membership','membership']];
      return '<div class="announce"><div class="announce-track">'
        + '<span>Non-profit · New York · <a href="'+R+'com/index.html">funded by kavanahglobal.com</a></span></div></div>'
        + '<header class="onav" id="onav"><div class="wrap onav-in">'
        + '<a class="omark" href="'+R+'org/index.html"><img src="'+crest+'" alt="">'
        + '<span><span class="bn">Kavanah Global</span><span class="bs">The non-profit</span></span></a>'
        + '<nav class="olinks">'+links.map(function(l){
            return '<a class="'+(active===l[2]?'on':'')+'" href="'+R+'org/'+l[0]+'">'+l[1]+'</a>'; }).join('')+'</nav>'
        + '<div class="otools">'
        +   '<a class="btn btn-outline btn-sm" href="'+R+'org/donate.html">'+ico('heart')+'Donate</a>'
        +   '<a class="btn btn-gold btn-sm" href="'+R+'org/dashboard.html">My practice</a>'
        +   '<button class="tool railtoggle" onclick="ORG.mnav()" aria-label="Menu">'+ico('menu')+'</button>'
        + '</div></div></header>'
        + '<div class="mnav" id="omnav"><div class="row-between" style="margin-bottom:18px">'
        + '<span class="omark"><img src="'+crest+'" alt=""><span><span class="bn">Kavanah</span></span></span>'
        + '<button class="tool" onclick="ORG.mnav()">'+ico('close')+'</button></div>'
        + links.map(function(l){ return '<a href="'+R+'org/'+l[0]+'">'+l[1]+'</a>'; }).join('')
        + '<a href="'+R+'org/dashboard.html">My practice</a><a href="'+R+'org/journal.html">Mood Journal</a>'
        + '<a href="'+R+'org/donate.html">Donate</a>'
        + '<a href="'+R+'com/index.html" style="color:var(--gold-700);font-weight:600">Shop kavanahglobal.com '+ico('arrowUpRight')+'</a></div>';
    },
    mnav:function(){ document.getElementById('omnav').classList.toggle('on'); },

    /* ---------- App rail ---------- */
    rail:function(active){
      var main=[['dashboard.html','Today','home','dashboard'],
                ['programs.html','Programmes','layers','programs'],
                ['player.html','Continue','playCircle','player'],
                ['live.html','Live schedule','video','live'],
                ['journal.html','Mood Journal','feather','journal'],
                ['community.html','Community','users','community']];
      var more=[['membership.html','Membership','award','membership'],
                ['shelter.html','Shelter services','bed','shelter'],
                ['sanctuary.html','The Sanctuary','leaf','sanctuary'],
                ['donate.html','Donate','heart','donate']];
      var link=function(l){
        var badge = l[3]==='live'? '<span class="rb">3</span>' : (l[3]==='community'? '<span class="rb">12</span>':'');
        return '<a class="rlink '+(active===l[3]?'on':'')+'" href="'+R+'org/'+l[0]+'">'+ico(l[2])+l[1]+badge+'</a>';
      };
      return '<aside class="rail" id="rail">'
      + '<a class="rail-brand" href="'+R+'org/index.html"><img src="'+crest+'" alt="">'
      +   '<span><b>Kavanah</b><span>Global · .org</span></span></a>'
      + '<div class="rail-sec">My practice</div>' + main.map(link).join('')
      + '<div class="rail-sec">The work</div>' + more.map(link).join('')
      + '<div class="rail-foot">'
      +   '<a class="rail-user" href="'+R+'org/dashboard.html">'+U.avatar(KG.user.name,38)
      +   '<span><b>'+KG.user.name+'</b><span>'+KG.user.tier+' · '+KG.user.streak+'-day streak</span></span></a>'
      +   '<a class="rlink" style="margin-top:6px" href="'+R+'com/index.html">'+ico('cart')+'Shop the .com</a>'
      + '</div></aside>';
    },
    topbar:function(title,sub,right){
      return '<div class="otop">'
      + '<button class="tool railtoggle" onclick="document.getElementById(\'rail\').classList.toggle(\'on\')" aria-label="Menu">'+ico('menu')+'</button>'
      + '<div style="min-width:0"><h1>'+title+'</h1>'+(sub?'<span class="tiny muted">'+sub+'</span>':'')+'</div>'
      + '<div class="spacer"></div>' + (right||'')
      + '<button class="tool" onclick="U.toast(\'3 new notifications\',\'bell\')" aria-label="Notifications" style="position:relative">'+ico('bell')
      +   '<span class="dot" style="display:grid">3</span></button>'
      + '</div>';
    },

    /* ---------- Programme card ---------- */
    gcard:function(g,opts){
      opts=opts||{};
      var prog = U.Enrol.has(g.id) ? U.Enrol.progress(g.id) : null;
      return '<a class="gcard rv" href="'+R+'org/program.html?g='+g.slug+'">'
      + '<div class="gcard-img"><img src="'+KG.img(g.cover)+'" alt="" loading="lazy">'
      +   '<span class="gcard-tag badge badge-gold">'+g.cat+'</span>'
      +   (g.badge?'<span class="badge badge-plum" style="position:absolute;top:12px;right:12px;z-index:2">'+g.badge+'</span>':'')
      + '</div>'
      + '<div class="gcard-b"><h3>'+g.title+'</h3><div class="gcard-sub">'+g.sub+'</div>'
      + '<p class="small muted" style="line-height:1.55;margin:0">'+g.blurb+'</p>'
      + (prog!==null
          ? '<div style="margin-top:1rem"><div class="row-between" style="margin-bottom:.35rem">'
            +'<span class="tiny" style="color:var(--gold-700);font-weight:600">Enrolled · '+prog+'% complete</span></div>'
            +'<div class="bar"><i style="width:'+prog+'%"></i></div></div>'
          : '')
      + '<div class="gmeta">'
      +   '<span>'+ico('calendar')+g.weeks+' weeks</span>'
      +   '<span>'+ico('playCircle')+g.lessonCount+' sessions</span>'
      +   '<span>'+ico('video')+g.live+'</span>'
      + '</div>'
      + '<div class="row-between" style="margin-top:.9rem;padding-top:.9rem;border-top:1px solid var(--line-2)">'
      +   '<span>'+U.stars(g.rating)+' <span class="tiny muted">'+g.students.toLocaleString()+'</span></span>'
      +   '<b class="price">'+(prog!==null?'Continue':U.money(g.price))+'</b></div>'
      + '</div></a>';
    },

    /* ---------- Session card ---------- */
    sess:function(s,compact){
      var g=KG.byId(KG.programs,s.prog);
      var going=U.Rsvp.has(s.id);
      var full=s.taken>=s.seats;
      return '<div class="sess rv">'
      + '<div class="sess-time"><b>'+s.time.replace(/ (AM|PM)/,'')+'</b><span>'+(s.time.match(/AM|PM/)||[''])[0]+' '+s.tz+'</span>'
      +   '<div class="tiny muted" style="margin-top:.3rem">'+s.mins+' min</div></div>'
      + (compact?'':'<img class="sess-img" src="'+KG.img(s.img)+'" alt="" loading="lazy">')
      + '<div class="sess-b"><div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:.35rem">'
      +   '<span class="badge badge-gold">'+s.type+'</span>'
      +   (g?'<span class="tiny muted">'+g.title+'</span>':'')
      +   (s.closed?'<span class="badge badge-plum">'+ico('lock')+'Closed circle</span>':'')
      +   (s.open?'<span class="badge badge-ok">Open to all</span>':'')
      + '</div>'
      + '<h4 style="font-size:1.06rem;margin-bottom:.3rem">'+s.title+'</h4>'
      + '<div class="tiny muted">with '+s.guide+' · '+s.date+(s.rec?' · recorded':' · not recorded')+'</div>'
      + (s.note?'<div class="care" style="margin-top:.7rem;padding:9px 12px;font-size:.76rem">'+ico('info')+s.note+'</div>':'')
      + '<div class="row-between" style="margin-top:.9rem;gap:10px;flex-wrap:wrap">'
      +   '<div style="flex:1;min-width:150px"><div class="bar" style="height:5px"><i style="width:'+Math.round(s.taken/s.seats*100)+'%"></i></div>'
      +   '<span class="tiny muted">'+s.taken+' of '+s.seats+' places taken</span></div>'
      +   '<button class="btn '+(going?'btn-outline':'btn-plum')+' btn-sm" onclick="ORG.rsvp(\''+s.id+'\',this)">'
      +   (going?ico('check')+'On your schedule':ico('calendar')+(full?'Join waitlist':'Reserve a place'))+'</button>'
      + '</div></div></div>';
    },
    rsvp:function(id,btn){
      var on=U.Rsvp.toggle(id);
      btn.className='btn '+(on?'btn-outline':'btn-plum')+' btn-sm';
      btn.innerHTML=on?ico('check')+'On your schedule':ico('calendar')+'Reserve a place';
    },

    footer:function(){
      var col=function(h,ls){ return '<div><h4>'+h+'</h4>'+ls.map(function(l){ return '<a href="'+l[1]+'">'+l[0]+'</a>'; }).join('')+'</div>'; };
      return '<footer class="ftr"><div class="wrap">'
      + '<div class="crossbar"><img src="'+crest+'" alt="">'
      +   '<div style="flex:1;min-width:240px"><h4 style="margin-bottom:.4rem">Where the money comes from</h4>'
      +   '<p style="margin:0;font-size:.88rem;color:rgba(249,239,212,.7);line-height:1.6">This non-profit is funded by kavanahglobal.com — candles, home objects, yoga, apparel and books. Buying there pays for the work here.</p></div>'
      +   '<a class="btn btn-outline-gold" href="'+R+'com/index.html">Shop kavanahglobal.com '+ico('arrowUpRight')+'</a></div>'
      + '<div class="ftr-grid">'
      +   '<div class="ftr-brand"><span class="omark" style="margin-bottom:14px"><img src="'+crest+'" alt="">'
      +     '<span><span class="bn" style="color:var(--gold-200)">Kavanah Global</span>'
      +     '<span class="bs" style="color:var(--gold-500)">Let Light Shine</span></span></span>'
      +     '<p>A New York non-profit running shelter houses, wellness programmes and — from 2027 — a residential Sanctuary.</p></div>'
      +   col('Programmes', KG.programs.slice(0,5).map(function(g){ return [g.title, R+'org/program.html?g='+g.slug]; }).concat([['All programmes',R+'org/programs.html']]))
      +   col('The platform', [['My practice',R+'org/dashboard.html'],['Live schedule',R+'org/live.html'],['Community',R+'org/community.html'],['Mood Journal',R+'org/journal.html'],['Membership',R+'org/membership.html']])
      +   col('The work', [['Shelter services',R+'org/shelter.html'],['The Sanctuary',R+'org/sanctuary.html'],['Donate',R+'org/donate.html'],['Impact report',R+'com/impact.html'],['Locations',R+'org/shelter.html#locations']])
      +   '<div><h4>Need help now?</h4>'
      +     '<p style="font-size:.86rem;color:rgba(249,239,212,.6);line-height:1.6;margin-bottom:1rem">If you are in crisis, please do not wait for us. In the US, call or text <b style="color:var(--gold-200)">988</b> for the Suicide &amp; Crisis Lifeline, or dial 911.</p>'
      +     '<a class="btn btn-outline-gold btn-sm" href="'+R+'org/shelter.html">Request shelter tonight</a></div>'
      + '</div>'
      + '<div class="ftr-bottom"><span>© <span data-year></span> Kavanah Global · A New York non-profit</span>'
      + '<span style="display:flex;gap:18px;flex-wrap:wrap"><a href="#" style="display:inline">Privacy</a><a href="#" style="display:inline">Terms</a>'
      + '<a href="#" style="display:inline">Safeguarding</a><a href="#" style="display:inline">Accessibility</a></span></div>'
      + '</div></footer>';
    },

    /* ---------- Boots ---------- */
    boot:function(active){
      document.getElementById('hdr-slot').innerHTML = ORG.nav(active);
      var f=document.getElementById('ftr-slot'); if(f) f.innerHTML = ORG.footer();
      window.addEventListener('scroll',function(){
        var h=document.getElementById('onav'); if(h) h.classList.toggle('scrolled', window.scrollY>10);
      },{passive:true});
      U.boot();
    },
    bootApp:function(active,title,sub,right){
      document.getElementById('rail-slot').innerHTML = ORG.rail(active);
      var t=document.getElementById('top-slot'); if(t) t.innerHTML = ORG.topbar(title,sub,right);
      U.boot();
    }
  };
})();
