/* ============================================================
   APEX · Sample data for demonstration mockups
   All businesses are fictional. Photography is licence-free.
   ============================================================ */

const CATEGORIES = [
  { id:'dining',   name:'Dining & Drink',    img:'assets/img/cat-dining.jpg'   },
  { id:'beauty',   name:'Beauty & Wellbeing',img:'assets/img/cat-beauty.jpg'   },
  { id:'motoring', name:'Motoring',          img:'assets/img/cat-motoring.jpg' },
  { id:'tech',     name:'Technology',        img:'assets/img/cat-tech.jpg'     },
  { id:'home',     name:'Home & Trades',     img:'assets/img/cat-home.jpg'     },
  { id:'fitness',  name:'Fitness',           img:'assets/img/cat-fitness.jpg'  },
  { id:'fashion',  name:'Fashion & Retail',  img:'assets/img/cat-fashion.jpg'  },
  { id:'leisure',  name:'Family & Leisure',  img:'assets/img/cat-leisure.jpg'  }
];

const BUSINESSES = [
  { id:'hollybush', name:'The Hollybush Kitchen', cat:'dining', area:'Battersea', dist:0.8, rating:4.8, reviews:412, followers:1284, verified:'12 Aug 2026', img:'assets/img/biz-hollybush.jpg', ad:'placement',
    about:'Neighbourhood British kitchen on Battersea Rise. Seasonal menu, small producers, open seven days.' },
  { id:'sable-rye', name:'Sable & Rye', cat:'dining', area:'Shoreditch', dist:3.4, rating:4.7, reviews:289, followers:2140, verified:'04 Aug 2026', img:'assets/img/biz-sable-rye.jpg',
    about:'Cocktail bar and listening room off Redchurch Street. Classics, low-intervention wine, late licence Thursday to Saturday.' },
  { id:'casa-pellegrino', name:'Casa Pellegrino', cat:'dining', area:'Clapham', dist:1.1, rating:4.9, reviews:631, followers:1876, verified:'29 Jul 2026', img:'assets/img/biz-casa-pellegrino.jpg', ad:'category',
    about:'Family trattoria on Abbeville Road. Fresh pasta made daily, Neapolitan wine list, family-run since 2004.' },
  { id:'fen-flour', name:'Fen & Flour Bakehouse', cat:'dining', area:'Peckham', dist:2.6, rating:4.8, reviews:204, followers:964, verified:'18 Aug 2026', img:'assets/img/biz-fen-flour.jpg',
    about:'Micro-bakery and coffee counter on Bellenden Road. Sourdough, laminated pastry, celebration cakes to order.' },

  { id:'rosewood', name:'Rosewood Salon', cat:'beauty', area:'Clapham', dist:1.4, rating:4.9, reviews:388, followers:892, verified:'14 Aug 2026', img:'assets/img/biz-rosewood.jpg', ad:'placement',
    about:'Independent salon on Clapham High Street since 2009. Colour specialists, six chairs, open seven days.' },
  { id:'ivory-room', name:'The Ivory Room', cat:'beauty', area:'Marylebone', dist:4.2, rating:4.8, reviews:517, followers:3105, verified:'02 Aug 2026', img:'assets/img/biz-ivory-room.jpg',
    about:'Day spa and treatment rooms a minute from Marylebone High Street. Massage, facials and full-day packages.' },
  { id:'barber-bell', name:'Barber & Bell', cat:'beauty', area:'Hackney', dist:4.8, rating:4.7, reviews:742, followers:1533, verified:'22 Jul 2026', img:'assets/img/biz-barber-bell.jpg',
    about:'Traditional barbering on Mare Street. Walk-ins welcome, hot towel shaves, six chairs.' },
  { id:'lumen-skin', name:'Lumen Skin Clinic', cat:'beauty', area:'Chelsea', dist:2.9, rating:4.9, reviews:163, followers:721, verified:'11 Aug 2026', img:'assets/img/biz-lumen-skin.jpg',
    about:'Advanced skin clinic on Fulham Road. Consultant-led facials, peels and laser, fully regulated.' },

  { id:'clapham-valet', name:'Clapham Valet & Detail', cat:'motoring', area:'Clapham', dist:1.2, rating:4.8, reviews:256, followers:640, verified:'09 Aug 2026', img:'assets/img/biz-clapham-valet.jpg',
    about:'Hand valeting and paint correction under the arches at Clapham North. Collection and return available.' },
  { id:'kestrel-tyres', name:'Kestrel Tyres & Servicing', cat:'motoring', area:'Wandsworth', dist:2.3, rating:4.6, reviews:498, followers:812, verified:'27 Jul 2026', img:'assets/img/biz-kestrel-tyres.jpg', ad:'category',
    about:'Independent garage on Garratt Lane. Servicing, MOT, tyres and diagnostics for all makes.' },
  { id:'southbank-auto', name:'Southbank Auto Electrics', cat:'motoring', area:'Bermondsey', dist:3.7, rating:4.7, reviews:131, followers:288, verified:'16 Aug 2026', img:'assets/img/biz-southbank-auto.jpg',
    about:'Auto electrical specialists. ECU diagnostics, wiring faults, hybrid and EV systems.' },

  { id:'techzone', name:'TechZone Accessories', cat:'tech', area:'Wandsworth', dist:2.1, rating:4.6, reviews:874, followers:4210, verified:'05 Aug 2026', img:'assets/img/biz-techzone.jpg', ad:'category',
    about:'Audio, charging and mobile accessories at Southside. Price-match promise and same-day click and collect.' },
  { id:'northbank-repair', name:'Northbank Computer Repair', cat:'tech', area:'Islington', dist:5.1, rating:4.8, reviews:356, followers:1102, verified:'31 Jul 2026', img:'assets/img/biz-northbank-repair.jpg',
    about:'Laptop and desktop repair on Upper Street. Screens, boards, data recovery, most repairs same day.' },
  { id:'pixel-port', name:'Pixel & Port', cat:'tech', area:'Camden', dist:4.6, rating:4.7, reviews:212, followers:1690, verified:'19 Aug 2026', img:'assets/img/biz-pixel-port.jpg',
    about:'Used camera and audio specialist in Camden Lock. Trade-ins, six-month warranty, studio for hire.' },

  { id:'marlow-joinery', name:'Marlow & Sons Joinery', cat:'home', area:'Dulwich', dist:3.2, rating:4.9, reviews:98, followers:341, verified:'08 Aug 2026', img:'assets/img/biz-marlow-joinery.jpg',
    about:'Bespoke fitted furniture. Alcove units, wardrobes and shelving, made in our Dulwich workshop.' },
  { id:'bramble-interiors', name:'Bramble Interiors', cat:'home', area:'Fulham', dist:3.0, rating:4.7, reviews:241, followers:1470, verified:'25 Jul 2026', img:'assets/img/biz-bramble-interiors.jpg',
    about:'Homeware shop and interior design studio on Fulham Road. Furniture, lighting and a full design service.' },
  { id:'kingfisher-plumbing', name:'Kingfisher Plumbing', cat:'home', area:'Balham', dist:1.7, rating:4.8, reviews:403, followers:522, verified:'13 Aug 2026', img:'assets/img/biz-kingfisher-plumbing.jpg',
    about:'Gas Safe registered plumbing and heating. Boilers, bathrooms and emergency callouts across south London.' },

  { id:'ironworks', name:'Ironworks Strength Club', cat:'fitness', area:'Vauxhall', dist:2.4, rating:4.9, reviews:622, followers:2860, verified:'01 Aug 2026', img:'assets/img/biz-ironworks.jpg', ad:'placement',
    about:'Strength and conditioning gym in a railway arch. Platforms, sleds, coaching, no contracts.' },
  { id:'studio-sixteen', name:'Studio Sixteen Pilates', cat:'fitness', area:'Notting Hill', dist:5.3, rating:4.9, reviews:287, followers:1955, verified:'23 Jul 2026', img:'assets/img/biz-studio-sixteen.jpg',
    about:'Reformer and mat Pilates studio off Portobello Road. Small classes, twelve reformers, beginners welcome.' },
  { id:'lido-swim', name:'The Lido Swim School', cat:'fitness', area:'Brockwell', dist:2.0, rating:4.8, reviews:176, followers:734, verified:'17 Aug 2026', img:'assets/img/biz-lido-swim.jpg',
    about:'Adult and children swim lessons at Brockwell Lido. Small groups, heated pool, term-time blocks.' },

  { id:'thread-thistle', name:'Thread & Thistle', cat:'fashion', area:'Spitalfields', dist:5.6, rating:4.7, reviews:194, followers:1288, verified:'06 Aug 2026', img:'assets/img/biz-thread-thistle.jpg',
    about:'Menswear and made-to-measure on Lamb Street. British cloth, in-house alterations, appointments welcome.' },
  { id:'ottoline', name:'Ottoline', cat:'fashion', area:'Primrose Hill', dist:5.0, rating:4.8, reviews:233, followers:2402, verified:'30 Jul 2026', img:'assets/img/biz-ottoline.jpg',
    about:'Womenswear boutique on Regents Park Road. Independent labels, personal styling by appointment.' },
  { id:'cobblers-row', name:"Cobbler's Row", cat:'fashion', area:'Borough', dist:3.1, rating:4.9, reviews:145, followers:498, verified:'15 Aug 2026', img:'assets/img/biz-cobblers-row.jpg',
    about:'Shoe repair and leather care near Borough Market. Resoling, restoration, key cutting while you wait.' },

  { id:'little-lantern', name:'Little Lantern Play Café', cat:'leisure', area:'Crouch End', dist:6.2, rating:4.8, reviews:311, followers:1611, verified:'20 Jul 2026', img:'assets/img/biz-little-lantern.jpg',
    about:'Play café for under-sevens on Park Road. Soft play, craft table, proper coffee for the grown-ups.' },
  { id:'waypoint', name:'Waypoint Climbing', cat:'leisure', area:'Hackney Wick', dist:5.4, rating:4.9, reviews:529, followers:3320, verified:'10 Aug 2026', img:'assets/img/biz-waypoint.jpg',
    about:'Bouldering and lead climbing centre. Fresh routes weekly, coaching, café and co-working space.' },
  { id:'bellevue', name:'The Bellevue Picturehouse', cat:'leisure', area:'Herne Hill', dist:2.7, rating:4.8, reviews:688, followers:2988, verified:'03 Aug 2026', img:'assets/img/biz-bellevue.jpg',
    about:'Independent two-screen cinema since 1931. New releases, Sunday classics, licensed bar.' }
];

const DEALS = [
  { id:'d01', biz:'hollybush', value:'2 FOR 1', title:'Two-for-one on all mains, Sunday to Thursday', ends:'21 Sept', img:'assets/img/biz-hollybush.jpg', hot:true,
    terms:'Cheapest main free. Dine-in only. Not valid on bank holidays or with other offers.' },
  { id:'d02', biz:'hollybush', value:'£15 OFF', title:'Sunday roast for two', ends:'28 Sept', img:'assets/img/hero-dining.jpg',
    terms:'Sundays only, 12pm to 5pm. Booking recommended. One redemption per member.' },
  { id:'d03', biz:'sable-rye', value:'25% OFF', title:'Cocktail flights, Tuesday to Thursday', ends:'30 Sept', img:'assets/img/deal-cocktail.jpg',
    terms:'Available 5pm to 9pm. Over 18s only. One flight per member per visit.' },
  { id:'d04', biz:'sable-rye', value:'FREE', title:'Bar snack with any two cocktails', ends:'12 Oct', img:'assets/img/biz-sable-rye.jpg',
    terms:'Choose any one snack from the bar menu. Over 18s only.' },
  { id:'d05', biz:'casa-pellegrino', value:'30% OFF', title:'The full pasta menu, weekday lunch', ends:'24 Sept', img:'assets/img/deal-pizza.jpg', hot:true,
    terms:'Monday to Friday, 12pm to 3pm. Dine-in only. Excludes specials board.' },
  { id:'d06', biz:'casa-pellegrino', value:'FREE', title:'Dessert with any two main courses', ends:'05 Oct', img:'assets/img/biz-casa-pellegrino.jpg',
    terms:'One dessert per table of two. Dine-in only.' },
  { id:'d07', biz:'fen-flour', value:'£5 OFF', title:'Any celebration cake ordered in store', ends:'18 Oct', img:'assets/img/biz-fen-flour.jpg',
    terms:'Minimum spend £25. Seventy-two hours notice required on all cake orders.' },
  { id:'d08', biz:'fen-flour', value:'BUY 6 GET 12', title:'Saturday pastry box', ends:'27 Sept', img:'assets/img/deal-bread.jpg',
    terms:'Saturdays from 8am while stocks last. Collection only.' },

  { id:'d09', biz:'rosewood', value:'20% OFF', title:'Any colour service, midweek', ends:'30 Sept', img:'assets/img/biz-rosewood.jpg', hot:true,
    terms:'Tuesday to Thursday. New and existing clients. Patch test required 48 hours before.' },
  { id:'d10', biz:'rosewood', value:'FREE', title:'Gloss treatment with any cut', ends:'22 Aug', img:'assets/img/cat-beauty.jpg', ending:true,
    terms:'Add-on to any cut and finish. Subject to stylist availability.' },
  { id:'d11', biz:'rosewood', value:'15% OFF', title:'Student Tuesdays', ends:'Ongoing', img:'assets/img/biz-rosewood.jpg',
    terms:'Valid student ID required in salon alongside your deal code.' },
  { id:'d12', biz:'ivory-room', value:'35% OFF', title:'Sixty-minute deep tissue massage', ends:'26 Sept', img:'assets/img/biz-ivory-room.jpg', hot:true,
    terms:'Monday to Wednesday only. Advance booking essential. Twenty-four hour cancellation policy.' },
  { id:'d13', biz:'ivory-room', value:'2 FOR 1', title:'Full spa day passes', ends:'10 Oct', img:'assets/img/deal-facial.jpg',
    terms:'Both guests must attend the same day. Excludes Saturdays.' },
  { id:'d14', biz:'barber-bell', value:'£8 OFF', title:'Cut and hot towel shave', ends:'03 Oct', img:'assets/img/biz-barber-bell.jpg',
    terms:'Walk-ins subject to availability. One redemption per member per month.' },
  { id:'d15', biz:'barber-bell', value:'FREE', title:'Beard trim with any cut', ends:'19 Sept', img:'assets/img/biz-barber-bell.jpg',
    terms:'Add-on to any full cut. Not valid with other offers.' },
  { id:'d16', biz:'lumen-skin', value:'40% OFF', title:'First consultation and signature facial', ends:'29 Sept', img:'assets/img/biz-lumen-skin.jpg',
    terms:'New clients only. Consultation required before any treatment.' },

  { id:'d17', biz:'clapham-valet', value:'30% OFF', title:'Full valet and interior detail', ends:'25 Sept', img:'assets/img/biz-clapham-valet.jpg', hot:true,
    terms:'Vehicles up to large SUV. Booking required. Allow three hours.' },
  { id:'d18', biz:'clapham-valet', value:'£20 OFF', title:'Ceramic wax protection', ends:'11 Oct', img:'assets/img/deal-carwash.jpg',
    terms:'Applied over a full valet only. Twelve-month protection.' },
  { id:'d19', biz:'kestrel-tyres', value:'25% OFF', title:'Full service and MOT bundle', ends:'02 Oct', img:'assets/img/biz-kestrel-tyres.jpg',
    terms:'Parts extra where required. Courtesy car subject to availability.' },
  { id:'d20', biz:'kestrel-tyres', value:'FREE', title:'Tyre check and four-wheel alignment', ends:'20 Sept', img:'assets/img/cat-motoring.jpg',
    terms:'No purchase necessary. Adjustments quoted separately.' },
  { id:'d21', biz:'southbank-auto', value:'£40 OFF', title:'Diagnostics and ECU fault repair', ends:'08 Oct', img:'assets/img/biz-southbank-auto.jpg',
    terms:'Applies to labour only. Parts quoted before work begins.' },

  { id:'d22', biz:'techzone', value:'25% OFF', title:'Every audio accessory in store', ends:'23 Sept', img:'assets/img/biz-techzone.jpg', hot:true,
    terms:'In store only. Excludes items already reduced. One transaction per member.' },
  { id:'d23', biz:'techzone', value:'£15 OFF', title:'Any charging bundle over £40', ends:'07 Oct', img:'assets/img/cat-tech.jpg',
    terms:'Bundle must include a cable and a plug or power bank.' },
  { id:'d24', biz:'northbank-repair', value:'FREE', title:'Diagnostics on any laptop repair', ends:'Ongoing', img:'assets/img/biz-northbank-repair.jpg',
    terms:'Normally £35. No obligation to proceed with the repair.' },
  { id:'d25', biz:'northbank-repair', value:'20% OFF', title:'Screen replacement, parts and labour', ends:'16 Oct', img:'assets/img/deal-laptop.jpg',
    terms:'Subject to parts availability. Twelve-month warranty on all screens.' },
  { id:'d26', biz:'pixel-port', value:'£50 OFF', title:'Any used lens over £250', ends:'04 Oct', img:'assets/img/biz-pixel-port.jpg',
    terms:'Six-month warranty included. Trade-ins valued separately.' },
  { id:'d27', biz:'pixel-port', value:'15% OFF', title:'Studio hire, weekdays', ends:'31 Oct', img:'assets/img/biz-pixel-port.jpg',
    terms:'Minimum two-hour booking. Lighting included, assistant extra.' },

  { id:'d28', biz:'marlow-joinery', value:'10% OFF', title:'Fitted wardrobes and alcove shelving', ends:'30 Oct', img:'assets/img/biz-marlow-joinery.jpg',
    terms:'Applies to orders over £1,500. Free survey and quotation.' },
  { id:'d29', biz:'bramble-interiors', value:'20% OFF', title:'All full-price homeware', ends:'26 Sept', img:'assets/img/biz-bramble-interiors.jpg',
    terms:'In store only. Excludes furniture and lighting.' },
  { id:'d30', biz:'bramble-interiors', value:'FREE', title:'One-hour interior design consultation', ends:'14 Oct', img:'assets/img/cat-home.jpg',
    terms:'In studio or by video call. Normally £120.' },
  { id:'d31', biz:'kingfisher-plumbing', value:'£30 OFF', title:'Annual boiler service', ends:'21 Oct', img:'assets/img/biz-kingfisher-plumbing.jpg',
    terms:'Gas Safe certificate included. South London postcodes only.' },
  { id:'d32', biz:'kingfisher-plumbing', value:'FREE', title:'Callout on your first booking', ends:'Ongoing', img:'assets/img/biz-kingfisher-plumbing.jpg',
    terms:'Normally £60. Labour and parts charged as quoted.' },

  { id:'d33', biz:'ironworks', value:'50% OFF', title:'Your first month of membership', ends:'28 Sept', img:'assets/img/biz-ironworks.jpg', hot:true,
    terms:'New members only. No joining fee, no contract, cancel any time.' },
  { id:'d34', biz:'ironworks', value:'FREE', title:'Induction and twelve-week programme', ends:'12 Oct', img:'assets/img/cat-fitness.jpg',
    terms:'One session with a coach. Available to all new members.' },
  { id:'d35', biz:'studio-sixteen', value:'3 FOR £30', title:'Intro pack of reformer classes', ends:'09 Oct', img:'assets/img/deal-yoga.jpg',
    terms:'New clients only. Valid for thirty days from first class.' },
  { id:'d36', biz:'lido-swim', value:'20% OFF', title:'A block of eight lessons', ends:'01 Oct', img:'assets/img/biz-lido-swim.jpg',
    terms:'Term-time blocks. Adults and children. Subject to availability.' },

  { id:'d37', biz:'thread-thistle', value:'25% OFF', title:'All full-price shirting', ends:'27 Sept', img:'assets/img/biz-thread-thistle.jpg',
    terms:'In store only. Excludes made-to-measure.' },
  { id:'d38', biz:'thread-thistle', value:'FREE', title:'Alterations on any suit purchase', ends:'17 Oct', img:'assets/img/biz-thread-thistle.jpg',
    terms:'Trouser and sleeve length, waist adjustment. Allow seven days.' },
  { id:'d39', biz:'ottoline', value:'30% OFF', title:'The end of season rail', ends:'22 Aug', img:'assets/img/biz-ottoline.jpg', ending:true,
    terms:'While stocks last. Marked items only. No returns on sale stock.' },
  { id:'d40', biz:'cobblers-row', value:'£12 OFF', title:'Full resole and polish', ends:'06 Oct', img:'assets/img/biz-cobblers-row.jpg',
    terms:'Leather soles only. Allow five working days.' },
  { id:'d41', biz:'cobblers-row', value:'20% OFF', title:'Leather care kits and conditioners', ends:'13 Oct', img:'assets/img/deal-leather.jpg',
    terms:'In store only. While stocks last.' },

  { id:'d42', biz:'little-lantern', value:'2 FOR 1', title:'Weekday play sessions', ends:'24 Sept', img:'assets/img/biz-little-lantern.jpg',
    terms:'Monday to Friday before 3pm. One adult free per paying child.' },
  { id:'d43', biz:'little-lantern', value:'FREE', title:'Hot drink with any play session', ends:'15 Oct', img:'assets/img/deal-coffee.jpg',
    terms:'One per adult. Any drink from the coffee menu.' },
  { id:'d44', biz:'waypoint', value:'40% OFF', title:'Day pass with full gear hire', ends:'29 Sept', img:'assets/img/biz-waypoint.jpg', hot:true,
    terms:'Shoes, harness and chalk included. Induction required for first visit.' },
  { id:'d45', biz:'bellevue', value:'2 FOR 1', title:'Tickets, Monday to Wednesday', ends:'19 Oct', img:'assets/img/biz-bellevue.jpg',
    terms:'All screenings. Excludes special events and premieres.' },
  { id:'d46', biz:'bellevue', value:'£4 OFF', title:'Any Sunday classic screening', ends:'02 Nov', img:'assets/img/cat-leisure.jpg',
    terms:'Sundays only. Bar open one hour before each screening.' }
];

const JOBS = [
  { id:'j01', biz:'rosewood', title:'Senior Colour Technician', type:'Full time', pay:'£32,000 – £38,000 + tips', posted:'2 days ago',
    desc:'Three or more years in a colour-focused role. NVQ Level 3 preferred. Four-day week available, product training paid.' },
  { id:'j02', biz:'hollybush', title:'Head Chef', type:'Full time', pay:'£45,000 – £52,000', posted:'4 days ago',
    desc:'Running a brigade of six across a changing seasonal menu. Full control of specials and supplier relationships.' },
  { id:'j03', biz:'casa-pellegrino', title:'Front of House Supervisor', type:'Part time', pay:'£14.50 per hour + service', posted:'1 day ago',
    desc:'Four shifts a week including weekends. Wine knowledge welcome but not essential, full training given.' },
  { id:'j04', biz:'ironworks', title:'Personal Trainer', type:'Self-employed', pay:'Chair rental from £180/week', posted:'6 days ago',
    desc:'Build your own client base in a fully equipped strength facility. Free membership and marketing support included.' },
  { id:'j05', biz:'techzone', title:'Retail Sales Assistant', type:'Part time', pay:'£12.60 per hour', posted:'3 days ago',
    desc:'Weekends and late-night Thursdays. Product training provided, staff discount across the range.' },
  { id:'j06', biz:'kestrel-tyres', title:'Vehicle Technician', type:'Full time', pay:'£34,000 – £40,000', posted:'1 week ago',
    desc:'Level 3 qualified with MOT tester status preferred. Modern four-bay workshop, overtime available.' },
  { id:'j07', biz:'bramble-interiors', title:'Interior Design Assistant', type:'Full time', pay:'£28,000', posted:'5 days ago',
    desc:'Supporting two senior designers on residential projects. CAD skills essential, portfolio required.' },
  { id:'j08', biz:'little-lantern', title:'Barista & Play Host', type:'Part time', pay:'£12.80 per hour', posted:'2 days ago',
    desc:'Split between the coffee counter and the play floor. Paediatric first aid training paid for.' },
  { id:'j09', biz:'bellevue', title:'Duty Manager', type:'Full time', pay:'£29,500', posted:'1 week ago',
    desc:'Evenings and weekends on a rota. Running screenings, the bar and a team of eight.' },
  { id:'j10', biz:'barber-bell', title:'Barber — chair rental', type:'Self-employed', pay:'£150 per week', posted:'3 days ago',
    desc:'Two chairs available on Mare Street. Established walk-in trade, keep one hundred per cent of takings.' },
  { id:'j11', biz:'fen-flour', title:'Pastry Chef de Partie', type:'Full time', pay:'£31,000', posted:'4 days ago',
    desc:'Early starts, no evenings. Laminated doughs and viennoiserie. Sundays and Mondays off.' },
  { id:'j12', biz:'waypoint', title:'Route Setter', type:'Part time', pay:'£140 per setting day', posted:'6 days ago',
    desc:'Two setting days a week across boulder and lead walls. CWDI qualification preferred.' },
  { id:'j13', biz:'northbank-repair', title:'Repair Technician', type:'Full time', pay:'£30,000 – £35,000', posted:'1 week ago',
    desc:'Board-level diagnostics and micro-soldering. Training provided for the right candidate.' },
  { id:'j14', biz:'ottoline', title:'Weekend Sales Advisor', type:'Part time', pay:'£13.20 per hour + commission', posted:'2 days ago',
    desc:'Saturdays and Sundays. Personal styling experience an advantage. Generous clothing allowance.' }
];

const POSTS = [
  { id:'p01', biz:'rosewood', time:'2 hours ago', img:'assets/img/cat-beauty.jpg',
    text:"Our autumn colour menu is live. Members get the gloss treatment included on any cut right through October — just show your deal code at the desk." },
  { id:'p02', biz:'casa-pellegrino', time:'5 hours ago', img:'assets/img/deal-pizza.jpg',
    text:"Fresh crab tagliolini is on the specials board all week. Nonna approved. Weekday lunch deal applies." },
  { id:'p03', biz:'ironworks', time:'Yesterday',
    text:"New calibrated platforms landed this morning. Six of them. Come and put some weight on the floor." },
  { id:'p04', biz:'bellevue', time:'Yesterday', img:'assets/img/biz-bellevue.jpg',
    text:"Sunday classics for September: Rear Window, The Third Man, Local Hero and Some Like It Hot. Bar opens an hour before each." },
  { id:'p05', biz:'techzone', time:'2 days ago',
    text:"The 25% member discount now covers the new open-back range that landed this week. In store only, as always." },
  { id:'p06', biz:'fen-flour', time:'2 days ago', img:'assets/img/deal-bread.jpg',
    text:"Saturday boxes are back — order six pastries and take home twelve. Get in before nine, they go quickly." },
  { id:'p07', biz:'waypoint', time:'3 days ago',
    text:"Full reset on the comp wall this weekend. Thirty new problems from V2 up to V9." },
  { id:'p08', biz:'hollybush', time:'3 days ago', img:'assets/img/hero-dining.jpg',
    text:"Game season starts Monday. Partridge, venison and a proper suet pudding back on the menu." },
  { id:'p09', biz:'sable-rye', time:'4 days ago', img:'assets/img/deal-cocktail.jpg',
    text:"New autumn list is up. Six new drinks, three old favourites we could not take off. Flights are 25% for members midweek." },
  { id:'p10', biz:'ivory-room', time:'5 days ago',
    text:"We have added two more treatment rooms upstairs, so midweek availability is much better from next month." },
  { id:'p11', biz:'rosewood', time:'5 days ago',
    text:"Welcoming Nadia to the team — she is taking bookings from Thursday and has a few introductory slots left." },
  { id:'p12', biz:'clapham-valet', time:'6 days ago', img:'assets/img/deal-carwash.jpg',
    text:"Collection and return is now running as far as Balham and Tooting at no extra charge." },
  { id:'p13', biz:'bramble-interiors', time:'1 week ago', img:'assets/img/cat-home.jpg',
    text:"The autumn lighting collection is in. Members get 20% across all full-price homeware." },
  { id:'p14', biz:'little-lantern', time:'1 week ago',
    text:"Half term timetable is published. Weekday sessions are two-for-one for members before three o'clock." },
  { id:'p15', biz:'ottoline', time:'1 week ago', img:'assets/img/biz-ottoline.jpg',
    text:"End of season rail is now 30% for members. Once it is gone it is gone — no returns on sale stock." },
  { id:'p16', biz:'studio-sixteen', time:'1 week ago', img:'assets/img/deal-yoga.jpg',
    text:"Two new reformers arriving next week, which means four more spaces in every class." }
];

/* ---- The demo member ---- */
const MEMBER = {
  name:'Sajjad Kassamali', first:'Sajjad', initials:'SK',
  avatar:'assets/img/person-2.jpg',
  location:'Clapham, London',
  memberSince:'March 2026',
  plan:'free',                 // 'free' | 'standard' | 'unlimited'
  quotaUsedSeed:9,             // unlocks used in the current month
  following:['rosewood','casa-pellegrino','ironworks','bellevue','techzone','fen-flour','waypoint','hollybush','sable-rye','ivory-room','clapham-valet','bramble-interiors','little-lantern','ottoline','studio-sixteen'],
  // five months of history — what an established member looks like
  wallet:[
    { deal:'d44', code:'APX-VT38-1174', on:'17 Aug 2026', saved:15.60, status:'active'   },
    { deal:'d35', code:'APX-QK92-5530', on:'15 Aug 2026', saved:21.00, status:'active'   },
    { deal:'d09', code:'APX-9QM2-4417', on:'18 Aug 2026', saved:38.00, status:'active'   },
    { deal:'d29', code:'APX-5TK3-9046', on:'14 Aug 2026', saved:38.00, status:'redeemed' },
    { deal:'d22', code:'APX-7HB4-2093', on:'11 Aug 2026', saved:26.25, status:'redeemed' },
    { deal:'d17', code:'APX-3PL7-8261', on:'06 Aug 2026', saved:42.00, status:'redeemed' },
    { deal:'d12', code:'APX-5RT1-8834', on:'02 Aug 2026', saved:31.50, status:'redeemed' },
    { deal:'d19', code:'APX-8ND5-3092', on:'28 Jul 2026', saved:45.25, status:'redeemed' },
    { deal:'d33', code:'APX-2WF6-7715', on:'19 Jul 2026', saved:32.50, status:'redeemed' },
    { deal:'d31', code:'APX-6CJ4-2248', on:'11 Jul 2026', saved:30.00, status:'redeemed' },
    { deal:'d05', code:'APX-4XB9-9503', on:'02 Jul 2026', saved:28.40, status:'redeemed' },
    { deal:'d01', code:'APX-7GD2-6187', on:'21 Jun 2026', saved:24.50, status:'redeemed' },
    { deal:'d45', code:'APX-2LD8-6620', on:'09 Jun 2026', saved:14.00, status:'redeemed' }
  ]
};

const PLANS = [
  { id:'standard', name:'Apex Standard', price:'£10', per:'per month', annual:'£100 a year',
    unlocks:'15 deal unlocks every month',
    lines:['15 deal unlocks every month','Every offer across all categories','Full access to Apex Network','Follow businesses and get offers first'],
    note:'Members on Standard save an average of £104 a month.' },
  { id:'unlimited', name:'Apex Unlimited', price:'£24.99', per:'per month', annual:'£250 a year',
    unlocks:'Unlimited deal unlocks',
    lines:['Unlimited deal unlocks','Early access 24 hours before Standard','Priority interest on Apex Network roles','Members-only partner events'],
    note:'Best for households using Apex several times a week.', featured:true }
];

/* ---- helpers ---- */
const byId    = (arr,id) => arr.find(x => x.id === id);
const biz     = id => byId(BUSINESSES, id);
const deal    = id => byId(DEALS, id);
const cat     = id => byId(CATEGORIES, id);
const dealsOf = id => DEALS.filter(d => d.biz === id);
const jobsOf  = id => JOBS.filter(j => j.biz === id);
const postsOf = id => POSTS.filter(p => p.biz === id);
const catOf   = id => CATEGORIES.filter(c => c.id === id)[0];
const dealCount = c => DEALS.filter(d => biz(d.biz).cat === c).length;
