/* ============================================================
   KAVANAH GLOBAL — shared UI runtime
   ============================================================ */
window.U = (function(){

  /* localStorage is blocked on file:// in Chrome — fall back to memory so the demo
     still behaves correctly when the folder is opened by double-clicking. */
  var MEM = {};
  var HAS_LS = (function(){
    try { localStorage.setItem('kg_t','1'); localStorage.removeItem('kg_t'); return true; }
    catch(e){ return false; }
  })();
  var LS = {
    get:function(k,d){
      try{
        var v = HAS_LS ? localStorage.getItem('kg_'+k) : MEM[k];
        return (v==null) ? d : JSON.parse(v);
      }catch(e){ return d; }
    },
    set:function(k,v){
      var s = JSON.stringify(v);
      try{ if(HAS_LS) localStorage.setItem('kg_'+k, s); else MEM[k]=s; }catch(e){ MEM[k]=s; }
    }
  };

  /* ---------- toast ---------- */
  function toast(msg, icon){
    var t = document.getElementById('toaster');
    if(!t){ t = document.createElement('div'); t.id='toaster'; document.body.appendChild(t); }
    var el = document.createElement('div');
    el.className='toast';
    el.innerHTML = ico(icon||'checkCircle') + '<span>'+msg+'</span>';
    t.appendChild(el);
    setTimeout(function(){ el.style.transition='opacity .3s, transform .3s'; el.style.opacity='0'; el.style.transform='translateY(8px)'; setTimeout(function(){ el.remove(); },320); }, 2900);
  }

  /* ---------- cart ---------- */
  var Cart = {
    all:function(){ return LS.get('cart',[]); },
    count:function(){ return Cart.all().reduce(function(n,i){ return n+i.q; },0); },
    total:function(){ return Cart.all().reduce(function(n,i){ var p=KG.byId(KG.products,i.id); return n + (p?p.price*i.q:0); },0); },
    add:function(id,q,variant){
      var c=Cart.all(), f=null;
      for(var i=0;i<c.length;i++) if(c[i].id===id && c[i].v===variant) f=c[i];
      if(f) f.q += (q||1); else c.push({id:id,q:q||1,v:variant||null});
      LS.set('cart',c); Cart.sync();
      var p=KG.byId(KG.products,id);
      toast((p?p.name:'Item')+' added to your bag','cart');
    },
    set:function(id,variant,q){
      var c=Cart.all().map(function(i){ if(i.id===id&&i.v===variant) i.q=q; return i; }).filter(function(i){ return i.q>0; });
      LS.set('cart',c); Cart.sync();
    },
    remove:function(id,variant){
      LS.set('cart', Cart.all().filter(function(i){ return !(i.id===id&&i.v===variant); })); Cart.sync();
    },
    clear:function(){ LS.set('cart',[]); Cart.sync(); },
    sync:function(){
      var n=Cart.count();
      document.querySelectorAll('[data-cart-count]').forEach(function(e){
        e.textContent=n; e.style.display = n? 'grid':'none';
      });
      if(typeof window.renderCartDrawer==='function') window.renderCartDrawer();
      document.dispatchEvent(new CustomEvent('cart:change'));
    },
    fundedSummary:function(){
      var SING = {'nights of shelter':'night of shelter','warm breakfasts':'warm breakfast','class seats':'class seat'};
      var PLUR = {'night of shelter':'nights of shelter','warm breakfast':'warm breakfasts','class seat':'class seats'};
      var map = {}, order = [];
      Cart.all().forEach(function(i){
        var p = KG.byId(KG.products, i.id); if(!p || !p.funds) return;
        var m = p.funds.match(/^(\d+)\s+(.*)$/); if(!m) return;
        var key = SING[m[2]] || m[2];
        if(map[key] == null){ map[key] = 0; order.push(key); }
        map[key] += parseInt(m[1], 10) * i.q;
      });
      return order.map(function(k){
        var n = map[k];
        return n + ' ' + (n === 1 ? k : (PLUR[k] || k));
      });
    }
  };

  /* ---------- wishlist ---------- */
  var Wish = {
    all:function(){ return LS.get('wish', KG.user.saved.slice()); },
    has:function(id){ return Wish.all().indexOf(id)>-1; },
    toggle:function(id){
      var w=Wish.all(), i=w.indexOf(id);
      if(i>-1){ w.splice(i,1); toast('Removed from saved','heart'); }
      else { w.push(id); toast('Saved for later','heart'); }
      LS.set('wish',w); Wish.sync(); return i===-1;
    },
    sync:function(){
      var w=Wish.all();
      document.querySelectorAll('[data-wish]').forEach(function(e){
        e.classList.toggle('on', w.indexOf(e.getAttribute('data-wish'))>-1);
      });
      document.querySelectorAll('[data-wish-count]').forEach(function(e){ e.textContent=w.length; });
    }
  };

  /* ---------- enrolment (.org) ---------- */
  var Enrol = {
    all:function(){ return LS.get('enrol', KG.user.enrolled.map(function(e){ return e.prog; })); },
    has:function(id){ return Enrol.all().indexOf(id)>-1; },
    add:function(id){ var e=Enrol.all(); if(e.indexOf(id)<0){ e.push(id); LS.set('enrol',e);} },
    progress:function(id){
      var p=LS.get('prog',{});
      if(p[id]!=null) return p[id];
      var m=null; KG.user.enrolled.forEach(function(x){ if(x.prog===id) m=x.progress; });
      return m==null?0:m;
    },
    setProgress:function(id,v){ var p=LS.get('prog',{}); p[id]=v; LS.set('prog',p); },
    done:function(pid){
      var stored = LS.get('done_'+pid, null);
      if(stored) return stored;
      /* seed completed sessions from the member's stored progress % */
      var total = KG.flatLessons(pid).length, pc = Enrol.progress(pid);
      var n = Math.round(total * pc / 100), seed = [];
      for(var i=0;i<n;i++) seed.push(i);
      LS.set('done_'+pid, seed);
      return seed;
    },
    complete:function(pid,n){
      var d=Enrol.done(pid); if(d.indexOf(n)<0) d.push(n); LS.set('done_'+pid,d);
      var total=KG.flatLessons(pid).length;
      Enrol.setProgress(pid, Math.round(d.length/total*100));
      return d;
    }
  };

  /* ---------- RSVP ---------- */
  var Rsvp = {
    all:function(){ return LS.get('rsvp',['l01','l04']); },
    has:function(id){ return Rsvp.all().indexOf(id)>-1; },
    toggle:function(id){
      var r=Rsvp.all(), i=r.indexOf(id);
      if(i>-1){ r.splice(i,1); toast('Removed from your schedule','calendar'); }
      else { r.push(id); toast('Added to your schedule','calendar'); }
      LS.set('rsvp',r); return i===-1;
    }
  };

  /* ---------- journal ---------- */
  var Journal = {
    all:function(){ return LS.get('journal', KG.journal.slice()); },
    save:function(entry){
      var j=Journal.all(), f=-1;
      for(var i=0;i<j.length;i++) if(j[i].d===entry.d) f=i;
      if(f>-1) j[f]=Object.assign({},j[f],entry); else j.unshift(entry);
      j.sort(function(a,b){ return a.d<b.d?1:-1; });
      LS.set('journal',j); return j;
    },
    streak:function(){
      var extra = Journal.all().length - KG.journal.length;
      return KG.user.streak + Math.max(0, extra);
    }
  };

  /* ---------- misc ---------- */
  function stars(r,cls){
    var out=''; for(var i=1;i<=5;i++) out += ico('star', i<=Math.round(r)?'':'off','currentColor');
    return '<span class="stars '+(cls||'')+'">'+out+'</span>';
  }
  function money(n){ return '$'+Number(n).toFixed(2).replace(/\.00$/,''); }
  function reveal(){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.08,rootMargin:'0px 0px -40px 0px'});
    var els = document.querySelectorAll('.rv');
    els.forEach(function(e,i){ e.style.transitionDelay=(Math.min(i%6,5)*60)+'ms'; io.observe(e); });
    /* failsafe: never leave content invisible if the observer misses anything */
    setTimeout(function(){
      els.forEach(function(e){
        var r=e.getBoundingClientRect();
        if(r.top < window.innerHeight + 200) e.classList.add('in');
      });
    }, 1400);
  }
  function countUp(el,to,dur){
    var start=null, from=0;
    function step(ts){
      if(!start) start=ts;
      var p=Math.min((ts-start)/(dur||1400),1);
      var e=1-Math.pow(1-p,3);
      el.textContent=Math.round(from+(to-from)*e).toLocaleString();
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function counters(){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){ countUp(e.target, parseInt(e.target.getAttribute('data-count'),10)); io.unobserve(e.target); }
      });
    },{threshold:.4});
    document.querySelectorAll('[data-count]').forEach(function(e){ io.observe(e); });
  }
  function qs(k){ return new URLSearchParams(location.search).get(k); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function initials(n){ return n.split(/[\s_]+/).map(function(w){return w[0];}).join('').slice(0,2).toUpperCase(); }
  function avatarColor(n){
    var h=0; for(var i=0;i<n.length;i++) h=(h*31+n.charCodeAt(i))%360;
    return 'hsl('+h+',34%,42%)';
  }
  function avatar(name,size){
    var s=size||38;
    return '<span class="avatar" style="width:'+s+'px;height:'+s+'px;background:'+avatarColor(name)+';font-size:'+(s*0.36)+'px">'+initials(name)+'</span>';
  }

  /* ---------- overlay / drawer ---------- */
  function overlay(){
    var o=document.getElementById('ovl');
    if(!o){ o=document.createElement('div'); o.id='ovl'; o.className='ovl'; document.body.appendChild(o);
      o.addEventListener('click', closeAll); }
    return o;
  }
  function openDrawer(id){ overlay().classList.add('on'); var d=document.getElementById(id); if(d) d.classList.add('on'); document.body.style.overflow='hidden'; }
  function closeAll(){
    overlay().classList.remove('on');
    document.querySelectorAll('.drawer.on').forEach(function(d){ d.classList.remove('on'); });
    document.querySelectorAll('.modal.on').forEach(function(d){ d.classList.remove('on'); });
    document.body.style.overflow='';
  }
  function openModal(id){ var m=document.getElementById(id); if(m){ m.classList.add('on'); document.body.style.overflow='hidden'; } }

  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeAll(); });

  function seed(){
    /* first ever visit: put a couple of things in the bag so the demo has state */
    if(LS.get('seeded',false)) return;
    LS.set('seeded',true);
    LS.set('cart',[{id:'p01',q:1,v:'Standard — 7.5"'},{id:'p24',q:1,v:'Amethyst'}]);
  }

  function boot(){
    seed();
    reveal(); counters(); Cart.sync(); Wish.sync();
    document.querySelectorAll('[data-ico]').forEach(function(e){
      if(!e.querySelector('svg')) e.insertAdjacentHTML(e.hasAttribute('data-ico-after')?'beforeend':'afterbegin', ico(e.getAttribute('data-ico')));
    });
    document.querySelectorAll('[data-year]').forEach(function(e){ e.textContent='2026'; });
  }

  return {LS:LS,toast:toast,Cart:Cart,Wish:Wish,Enrol:Enrol,Rsvp:Rsvp,Journal:Journal,
          stars:stars,money:money,reveal:reveal,counters:counters,countUp:countUp,qs:qs,esc:esc,
          initials:initials,avatar:avatar,avatarColor:avatarColor,
          openDrawer:openDrawer,openModal:openModal,closeAll:closeAll,boot:boot};
})();
