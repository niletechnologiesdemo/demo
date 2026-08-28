/* ============ kavanahglobal.com — chrome & components ============ */
(function(){
  var R = KG.root, A = KG.assets;
  var crest = R + KG.brand.crestFile;

  window.COM = {
    /* ---------- Header ---------- */
    header:function(active){
      var cats = KG.categories.map(function(c){
        return '<a class="mega-link" href="'+R+'com/shop.html?cat='+c.id+'">'
             + '<img src="'+KG.img(c.img)+'" alt="'+c.name+'">'
             + '<span><b>'+c.name+'</b><span>'+c.blurb+'</span></span></a>';
      }).join('');

      var links = [
        {h:'index.html',t:'Home',k:'home'},
        {h:'shop.html',t:'Shop',k:'shop',mega:1},
        {h:'impact.html',t:'Our Impact',k:'impact'},
        {h:'story.html',t:'The Story',k:'story'},
        {h:'writings.html',t:'Writings',k:'writings'},
        {h:'gifting.html',t:'Gifting',k:'gifting'}
      ].map(function(l){
        if(l.mega) return '<span class="navitem"><a class="'+(active===l.k?'on':'')+'" href="'+R+'com/'+l.h+'">'+l.t+ico('chevronDown')+'</a>'
          + '<div class="mega"><div class="mega-grid">'+cats+'</div>'
          + '<div class="mega-foot"><span class="small muted">Every order funds the work at kavanahglobal.org</span>'
          + '<a class="btn btn-outline btn-sm" href="'+R+'com/shop.html">Shop everything '+ico('arrowRight')+'</a></div></div></span>';
        return '<a class="'+(active===l.k?'on':'')+'" href="'+R+'com/'+l.h+'">'+l.t+'</a>';
      }).join('');

      return ''
      + '<div class="announce"><div class="announce-track">'
      +   '<span>Every purchase funds shelter, breakfasts and class seats — <a href="'+R+'org/index.html">see the work at kavanahglobal.org</a></span>'
      + '</div></div>'
      + '<header class="hdr" id="hdr"><div class="wrap hdr-in">'
      +   '<a class="brandmark" href="'+R+'com/index.html">'
      +     '<img src="'+crest+'" alt="Kavanah Global crest">'
      +     '<span class="bt"><span class="bn">Kavanah Global</span><span class="bs">Let Light Shine</span></span></a>'
      +   '<nav class="nav">'+links+'</nav>'
      +   '<div class="hdr-tools">'
      +     '<button class="tool desk" onclick="COM.search()" aria-label="Search">'+ico('search')+'</button>'
      +     '<a class="tool desk" href="'+R+'com/account.html" aria-label="Account">'+ico('user')+'</a>'
      +     '<button class="tool" onclick="COM.openCart()" aria-label="Bag">'+ico('cart')+'<span class="dot" data-cart-count>0</span></button>'
      +     '<button class="tool burger" onclick="COM.mnav()" aria-label="Menu">'+ico('menu')+'</button>'
      +   '</div>'
      + '</div></header>'
      + '<div class="mnav" id="mnav"><div class="row-between" style="margin-bottom:18px">'
      +   '<span class="brandmark"><img src="'+crest+'" alt=""><span class="bt"><span class="bn">Kavanah</span></span></span>'
      +   '<button class="tool" onclick="COM.mnav()">'+ico('close')+'</button></div>'
      +   '<a href="'+R+'com/index.html">Home</a><a href="'+R+'com/shop.html">Shop</a>'
      +   '<a href="'+R+'com/impact.html">Our Impact</a><a href="'+R+'com/story.html">The Story</a>'
      +   '<a href="'+R+'com/writings.html">Writings</a><a href="'+R+'com/gifting.html">Gifting</a>'
      +   '<a href="'+R+'com/account.html">My Account</a>'
      +   '<a href="'+R+'org/index.html" style="color:var(--gold-700);font-weight:600">Visit kavanahglobal.org '+ico('arrowUpRight')+'</a>'
      + '</div>';
    },

    /* ---------- Footer ---------- */
    footer:function(){
      var col = function(h,ls){ return '<div><h4>'+h+'</h4>'+ls.map(function(l){ return '<a href="'+l[1]+'">'+l[0]+'</a>'; }).join('')+'</div>'; };
      return '<footer class="ftr"><div class="wrap">'
      + '<div class="crossbar">'
      +   '<img src="'+R+KG.brand.sanctuaryFile+'" alt="Kavanah Global Sanctuary crest">'
      +   '<div style="flex:1;min-width:240px"><h4 style="margin-bottom:.4rem">The other half of Kavanah</h4>'
      +   '<p style="margin:0;font-size:.88rem;color:rgba(249,239,212,.7);line-height:1.6">kavanahglobal.org is our non-profit — shelter, wellness programmes and the Sanctuary. Everything you buy here pays for it.</p></div>'
      +   '<a class="btn btn-outline-gold" href="'+R+'org/index.html">Go to kavanahglobal.org '+ico('arrowUpRight')+'</a>'
      + '</div>'
      + '<div class="ftr-grid">'
      +   '<div class="ftr-brand"><span class="brandmark" style="margin-bottom:14px">'
      +     '<img src="'+crest+'" alt=""><span class="bt"><span class="bn" style="color:var(--gold-200)">Kavanah Global</span>'
      +     '<span class="bs" style="color:var(--gold-500)">Let Light Shine</span></span></span>'
      +     '<p>A commerce company that exists to fund a wellness company. Founded in New York by Daisy Pearl.</p>'
      +     '<div class="row" style="margin-top:16px;gap:8px">'
      +       '<a class="tool" style="color:var(--gold-300)" href="#" aria-label="Instagram">'+ico('sparkle')+'</a>'
      +       '<a class="tool" style="color:var(--gold-300)" href="#" aria-label="Email">'+ico('mail')+'</a>'
      +       '<a class="tool" style="color:var(--gold-300)" href="#" aria-label="Phone">'+ico('phone')+'</a>'
      +     '</div></div>'
      +   col('Shop', KG.categories.map(function(c){ return [c.name, R+'com/shop.html?cat='+c.id]; }).concat([['Gift cards',R+'com/gifting.html']]))
      +   col('Kavanah', [['Our Impact',R+'com/impact.html'],['The Story',R+'com/story.html'],['Writings',R+'com/writings.html'],['Locations',R+'org/shelter.html'],['Contact',R+'com/story.html#contact']])
      +   col('The .org', [['Wellness programmes',R+'org/programs.html'],['Live schedule',R+'org/live.html'],['Community',R+'org/community.html'],['Shelter services',R+'org/shelter.html'],['The Sanctuary',R+'org/sanctuary.html'],['Donate',R+'org/donate.html']])
      +   '<div><h4>The weekly letter</h4><p style="font-size:.86rem;color:rgba(249,239,212,.6);line-height:1.6;margin-bottom:1rem">One piece of Daisy\'s writing, every Sunday morning. Nothing else.</p>'
      +     '<form onsubmit="event.preventDefault();U.toast(\'You are on the list. Look for Sunday.\',\'mail\');this.reset()">'
      +     '<input class="input" type="email" required placeholder="you@email.com" style="background:rgba(255,255,255,.07);border-color:rgba(217,177,74,.3);color:#fff;margin-bottom:8px">'
      +     '<button class="btn btn-gold btn-block btn-sm">Subscribe</button></form></div>'
      + '</div>'
      + '<div class="ftr-bottom"><span>© <span data-year></span> Kavanah Global · KPG Enterprises LLC · New York</span>'
      + '<span style="display:flex;gap:18px;flex-wrap:wrap"><a href="#" style="display:inline">Privacy</a><a href="#" style="display:inline">Terms</a><a href="#" style="display:inline">Shipping &amp; returns</a><a href="#" style="display:inline">Accessibility</a></span></div>'
      + '</div></footer>';
    },

    /* ---------- Cart drawer ---------- */
    cartDrawer:function(){
      return '<div class="drawer" id="cartdrawer">'
      + '<div class="drawer-head"><div><h3 style="font-size:1.3rem">Your bag</h3>'
      + '<span class="small muted" data-cart-line></span></div>'
      + '<button class="tool" onclick="U.closeAll()">'+ico('close')+'</button></div>'
      + '<div class="drawer-body" id="cartbody"></div>'
      + '<div class="drawer-foot" id="cartfoot"></div></div>';
    },
    openCart:function(){ window.renderCartDrawer(); U.openDrawer('cartdrawer'); },
    mnav:function(){ document.getElementById('mnav').classList.toggle('on'); },
    search:function(){ location.href = R+'com/shop.html#search'; },

    /* ---------- Product card ---------- */
    pcard:function(p,cls){
      var cat = KG.categories.filter(function(c){ return c.id===p.cat; })[0];
      var alt = p.imgs[1] || p.imgs[0];
      return '<article class="pcard rv '+(cls||'')+'">'
      + '<a class="pcard-img" href="'+R+'com/product.html?p='+p.slug+'">'
      +   '<img class="main" src="'+KG.img(p.imgs[0])+'" alt="'+U.esc(p.name)+'" loading="lazy">'
      +   '<img class="alt" src="'+KG.img(alt)+'" alt="" loading="lazy">'
      + '</a>'
      + (p.badge?'<span class="pcard-badge badge badge-gold">'+p.badge+'</span>':'')
      + '<button class="wish" data-wish="'+p.id+'" onclick="U.Wish.toggle(\''+p.id+'\')" aria-label="Save">'+ico('heart')+'</button>'
      + '<div class="quickadd"><button class="btn btn-plum btn-sm btn-block" onclick="U.Cart.add(\''+p.id+'\',1)">'+ico('cart')+'Quick add</button></div>'
      + '<div class="pcard-body">'
      +   '<div class="pcard-cat">'+(cat?cat.name:'')+'</div>'
      +   '<h3><a href="'+R+'com/product.html?p='+p.slug+'">'+p.name+'</a></h3>'
      +   '<p class="pcard-blurb">'+p.blurb+'</p>'
      +   '<div class="pcard-foot"><span class="price">'+U.money(p.price)+(p.compare?'<s>'+U.money(p.compare)+'</s>':'')+'</span>'
      +   U.stars(p.rating)+'</div>'
      +   '<div class="funds">'+ico('flame')+'Funds '+p.funds+'</div>'
      + '</div></article>';
    },

    /* ---------- Voices ---------- */
    voices:function(list){
      return (list||KG.voices).map(function(v){
        return '<div class="voice rv">'+ico('quote','qm','currentColor')
        + '<p>'+v.q+'</p><cite><b>'+v.n+'</b>'+v.m+'</cite></div>';
      }).join('');
    },

    /* ---------- Boot ---------- */
    boot:function(active){
      document.getElementById('hdr-slot').innerHTML = COM.header(active);
      document.getElementById('ftr-slot').innerHTML = COM.footer() + COM.cartDrawer();
      window.addEventListener('scroll',function(){
        var h=document.getElementById('hdr'); if(h) h.classList.toggle('scrolled', window.scrollY>10);
      },{passive:true});
      U.boot();
    }
  };

  /* ---------- Cart drawer renderer ---------- */
  window.renderCartDrawer = function(){
    var body=document.getElementById('cartbody'), foot=document.getElementById('cartfoot');
    if(!body) return;
    var items=U.Cart.all();
    document.querySelectorAll('[data-cart-line]').forEach(function(e){
      e.textContent = items.length? U.Cart.count()+' item'+(U.Cart.count()>1?'s':'') : 'Nothing here yet';
    });
    if(!items.length){
      body.innerHTML = '<div class="center" style="padding:56px 10px">'
        + '<span style="color:var(--gold-400);display:block;margin-bottom:14px">'+ico('cart','','none')+'</span>'
        + '<h4 style="margin-bottom:.4rem">Your bag is empty</h4>'
        + '<p class="small muted" style="margin-bottom:1.2rem">Every order funds a night of shelter or a class seat.</p>'
        + '<a class="btn btn-gold btn-sm" href="'+R+'com/shop.html">Start shopping</a></div>';
      foot.innerHTML=''; return;
    }
    body.innerHTML = items.map(function(i){
      var p=KG.byId(KG.products,i.id); if(!p) return '';
      return '<div class="citem"><img src="'+KG.img(p.imgs[0])+'" alt="">'
      + '<div class="citem-b"><div class="row-between" style="align-items:flex-start">'
      + '<div><h4>'+p.name+'</h4>'+(i.v?'<span class="citem-v">'+i.v+'</span>':'')+'</div>'
      + '<button class="tool" style="width:28px;height:28px" onclick="U.Cart.remove(\''+i.id+'\','+JSON.stringify(i.v)+')">'+ico('trash')+'</button></div>'
      + '<div class="row-between" style="margin-top:.3rem"><span class="qty-sm">'
      + '<button onclick="U.Cart.set(\''+i.id+'\','+JSON.stringify(i.v)+','+(i.q-1)+')">'+ico('minus')+'</button>'
      + '<span>'+i.q+'</span>'
      + '<button onclick="U.Cart.set(\''+i.id+'\','+JSON.stringify(i.v)+','+(i.q+1)+')">'+ico('plus')+'</button></span>'
      + '<b class="price">'+U.money(p.price*i.q)+'</b></div></div></div>';
    }).join('');
    var funded=U.Cart.fundedSummary();
    foot.innerHTML = '<div class="sumrow"><span>Subtotal</span><b>'+U.money(U.Cart.total())+'</b></div>'
      + '<div class="sumrow"><span>Shipping</span><span>'+(U.Cart.total()>75?'Free':U.money(6.50))+'</span></div>'
      + (funded.length?'<div class="funds" style="border-top:1px dashed var(--line);margin-top:.6rem;padding-top:.7rem">'+ico('flame')+'This bag funds '+funded.join(', ')+'</div>':'')
      + '<a class="btn btn-gold btn-block btn-lg" style="margin-top:14px" href="'+R+'com/checkout.html">Checkout '+ico('arrowRight')+'</a>'
      + '<a class="btn btn-ghost btn-block btn-sm" style="margin-top:6px" href="'+R+'com/cart.html">View full bag</a>';
  };
})();
