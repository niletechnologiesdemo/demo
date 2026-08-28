/* ============================================================
   KAVANAH GLOBAL — Sample data (demo)
   ============================================================ */
window.KG = {};

KG.brand = {
  name:'Kavanah Global',
  tagline:'Let Light Shine',
  com:'kavanahglobal.com',
  org:'kavanahglobal.org',
  crestFile:'brand/kavanah-global-logo.jpg',
  sanctuaryFile:'brand/kavanah-sanctuary-logo.jpg'
};

/* ---------------- Commerce categories ---------------- */
KG.categories = [
  {id:'candles',  name:'Candles & Light',   img:'cat-candles',      blurb:'Hand-poured light for intention, prayer and quiet.'},
  {id:'home',     name:'Home & Energy',     img:'cat-home',         blurb:'Objects that change the air of a room.'},
  {id:'yoga',     name:'Yoga & Movement',   img:'cat-yoga',         blurb:'Ground the body so the mind can follow.'},
  {id:'apparel',  name:'Apparel',           img:'cat-apparel',      blurb:'Wear the intention. Carry the light.'},
  {id:'accessories',name:'Accessories',     img:'cat-accessories',  blurb:'Small companions for the daily practice.'},
  {id:'books',    name:'Books & Writings',  img:'cat-books',        blurb:'Words by Daisy Pearl and the Kavanah circle.'}
];

/* ---------------- Products ---------------- */
KG.products = [
 {id:'p01',slug:'let-light-shine-pillar',name:'Let Light Shine Pillar Candle',cat:'candles',price:38,compare:46,
  imgs:['p-pillar-1','p-pillar-2','p-pillar-3'],rating:4.9,reviews:214,badge:'Bestseller',
  blurb:'Our signature 60-hour pillar. Unscented, so it never competes with prayer.',
  desc:'Poured by hand in Queens from a coconut–soy blend that burns clean and even. The pillar was made for the moment before you begin — light it, sit, and let the room change around you. Unscented by design: we wanted nothing between you and your own attention.',
  details:['60-hour burn time','Coconut–soy blend, lead-free cotton wick','7.5in x 3in','Poured by hand in Queens, NY','Reusable glass base included'],
  variants:{label:'Size',options:['Standard — 7.5"','Tall — 10"','Sanctuary — 14"']},
  funds:'1 night of shelter',tags:['unscented','hand-poured','signature']},

 {id:'p02',slug:'kavanah-intention-candle',name:'Kavanah Intention Candle',cat:'candles',price:34,
  imgs:['p-intention-1','p-intention-2','p-intention-3'],rating:4.8,reviews:168,badge:'New',
  blurb:'Amethyst-toned wax, fig and cedar. Set an intention before you light it.',
  desc:'Kavanah means intention — the direction of the heart before the act. Each candle arrives with a folded card. Write what you are turning toward, tuck it beneath the base, and light it once a day until the wick is gone.',
  details:['45-hour burn time','Fig, cedar, soft amber','Hand-numbered ceramic vessel','Includes intention card','Refill available'],
  variants:{label:'Scent',options:['Fig & Cedar','Amber & Myrrh','Wild Fig','Unscented']},
  funds:'1 warm breakfast',tags:['scented','ceramic','gift']},

 {id:'p03',slug:'havdalah-braided-candle',name:'Havdalah Braided Candle',cat:'candles',price:26,
  imgs:['p-havdalah-1','p-havdalah-2'],rating:4.9,reviews:96,
  blurb:'A six-wick braid for the close of Shabbat and the turn of the week.',
  desc:'Braided by hand from pure beeswax, six wicks twisted into one flame. Marking the end of rest and the beginning of work is one of the oldest wellness practices we know of — a deliberate line drawn between one kind of time and another.',
  details:['Pure beeswax, six wicks','9in braided length','Burns 30–40 minutes','Traditional havdalah form','Comes boxed with a blessing card'],
  funds:'1 class seat',tags:['beeswax','ritual','handmade']},

 {id:'p04',slug:'sanctuary-candle-trio',name:'Sanctuary Candle Trio',cat:'candles',price:92,compare:114,
  imgs:['p-trio-1','p-trio-2','p-pillar-3'],rating:5.0,reviews:143,badge:'Gift set',
  blurb:'Morning, evening, night. Three candles for the three moods of a day.',
  desc:'Morning is citrus and green tea. Evening is fig and cedar. Night is myrrh, vetiver and a little smoke. Burn them in order for a week and you will start to feel your day take a shape it did not have before.',
  details:['3 x 35-hour vessels','Morning / Evening / Night','Presented in a linen-lined box','Our most-gifted set'],
  funds:'3 nights of shelter',tags:['gift','set','bestseller']},

 {id:'p05',slug:'amber-myrrh-jar',name:'Amber & Myrrh Jar Candle',cat:'candles',price:44,
  imgs:['p-amber-1','p-amber-2'],rating:4.7,reviews:88,
  blurb:'Resinous, warm, a little ancient. The scent of the room where you finally exhale.',
  desc:'Myrrh has been burned in houses of prayer for four thousand years. We paired it with amber and a thread of labdanum for something that smells less like a candle and more like a place.',
  details:['50-hour burn time','Amber, myrrh, labdanum','Amber glass vessel with lid','Wooden wick — audible crackle'],
  funds:'2 warm breakfasts',tags:['scented','wooden wick']},

 {id:'p06',slug:'shabbat-taper-pair',name:'Shabbat Taper Pair',cat:'candles',price:22,
  imgs:['p-taper-1','p-pillar-2'],rating:4.8,reviews:74,
  blurb:'Two tapers, dripless, for the Friday-night table.',
  desc:'Simple, honest, and dripless — the kind of candle that does not ask for attention while you are busy paying attention to each other.',
  details:['Pair of 10in tapers','Dripless beeswax blend','3-hour burn each','Ivory or deep plum'],
  variants:{label:'Colour',options:['Ivory','Deep Plum','Gold Leaf']},
  funds:'1 warm breakfast',tags:['ritual','pair']},

 {id:'p07',slug:'amethyst-cluster',name:'Amethyst Cluster',cat:'home',price:68,
  imgs:['p-amethyst-1','p-amethyst-2'],rating:4.8,reviews:132,
  blurb:'A hand-selected raw cluster. No two are the same, and that is the point.',
  desc:'Chosen one at a time for colour depth and clean termination. Put it where the morning light lands. We make no medical claims about stones — we simply find that a beautiful object in a considered place changes how a room is used.',
  details:['Raw Brazilian amethyst','Approx. 4–6in, 0.8–1.4kg','Hand-selected — yours will differ','Felt-based to protect surfaces'],
  funds:'2 nights of shelter',tags:['crystal','one-of-a-kind']},

 {id:'p08',slug:'hammered-singing-bowl',name:'Hand-Hammered Singing Bowl',cat:'home',price:118,
  imgs:['p-bowl-1','p-bowl-2'],rating:4.9,reviews:107,badge:'Studio favourite',
  blurb:'Seven-metal bowl with a long, honest decay. Struck once, it holds a room.',
  desc:'Hammered in Nepal from a traditional seven-metal alloy. We use these to open and close every live session — one strike at the start, one at the end, so the body learns where the practice begins and ends.',
  details:['7in diameter, seven-metal alloy','Includes suede-wrapped mallet and cushion','Fundamental tone approx. F3','Used in all Kavanah live sessions'],
  funds:'4 class seats',tags:['sound','ritual','studio']},

 {id:'p09',slug:'sage-cedar-bundle',name:'Sage & Cedar Bundle',cat:'home',price:18,
  imgs:['p-sage-1'],rating:4.6,reviews:211,
  blurb:'Ethically farmed white sage bound with cedar tips.',
  desc:'Grown on a family farm in California rather than wild-harvested, which matters — white sage has been over-picked for a decade. Cedar is added for a rounder, less astringent smoke.',
  details:['Farm-grown white sage','4in bundle, cotton-bound','Cedar tip finish','Pack of 1 or 3'],
  variants:{label:'Pack',options:['Single','Set of 3']},
  funds:'1 warm breakfast',tags:['ethically sourced']},

 {id:'p10',slug:'frankincense-incense-set',name:'Frankincense Incense Set',cat:'home',price:32,
  imgs:['p-incense-1','p-incense-2'],rating:4.7,reviews:64,
  blurb:'Forty hand-rolled sticks with a cast-brass holder.',
  desc:'Hand-rolled in small batches with real Boswellia resin rather than fragrance oil — you can tell the difference within thirty seconds of lighting one.',
  details:['40 hand-rolled sticks','Cast brass holder included','Approx. 45 min burn per stick','Low-smoke formulation'],
  funds:'1 class seat',tags:['resin','brass']},

 {id:'p11',slug:'himalayan-salt-lamp',name:'Himalayan Salt Lamp',cat:'home',price:56,
  imgs:['p-saltlamp-1'],rating:4.5,reviews:158,
  blurb:'A warm, low, orange light for the hour before sleep.',
  desc:'We recommend it for one reason we can actually stand behind: it is dim, and it is warm, and using it after nine at night is a far better signal to your body than an overhead bulb.',
  details:['Hand-carved salt crystal, 2.5–3.5kg','Dimmer switch, neem wood base','Bulb included, spare in box','Each piece unique in shape and tone'],
  funds:'1 night of shelter',tags:['lighting','sleep']},

 {id:'p12',slug:'stillness-reed-diffuser',name:'Stillness Reed Diffuser',cat:'home',price:48,
  imgs:['p-diffuser-1'],rating:4.6,reviews:71,
  blurb:'Twelve weeks of quiet scent. No flame, no attention required.',
  desc:'For the rooms you pass through rather than sit in — the hallway, the entry, the bathroom where the morning actually begins.',
  details:['200ml, approx. 12 weeks','Black rattan reeds','Fig leaf, sea salt, white cedar','Refills available'],
  funds:'2 warm breakfasts',tags:['flameless']},

 {id:'p13',slug:'kavanah-yoga-mat',name:'Kavanah Yoga Mat',cat:'yoga',price:88,compare:104,
  imgs:['p-mat-2','p-mat-1'],rating:4.9,reviews:186,badge:'Bestseller',
  blurb:'5mm natural rubber with an alignment crest at centre.',
  desc:'Natural tree rubber with a moisture-wicking top layer that gets grippier as you sweat. The crest at centre is not decoration — it is a alignment mark, so you can find your midline without looking down.',
  details:['5mm natural tree rubber','24in x 72in, 2.4kg','Closed-cell, antimicrobial surface','Alignment crest at centre','Carry strap included'],
  variants:{label:'Colour',options:['Deep Plum','Ivory','Charcoal']},
  funds:'3 class seats',tags:['natural rubber','grip']},

 {id:'p14',slug:'cork-yoga-block-pair',name:'Cork Yoga Block (Pair)',cat:'yoga',price:42,
  imgs:['p-block-1'],rating:4.8,reviews:94,
  blurb:'Dense Portuguese cork. Heavy enough to actually trust.',
  desc:'Foam blocks compress under load, which is exactly when you need them not to. These do not.',
  details:['Pair of blocks','Portuguese cork, 9x6x4in','Naturally antimicrobial','Sustainably harvested bark'],
  funds:'1 class seat',tags:['cork','pair']},

 {id:'p15',slug:'meditation-cushion',name:'Meditation Cushion',cat:'yoga',price:74,
  imgs:['p-cushion-1'],rating:4.9,reviews:129,
  blurb:'Buckwheat-filled zafu with a removable linen cover.',
  desc:'Most people quit sitting practice because their knees hurt, not because their mind wanders. Elevate the hips two inches and the whole problem changes.',
  details:['Organic buckwheat hull fill','Removable, washable linen cover','13in diameter, 6in loft','Fill adjustable via zip'],
  variants:{label:'Colour',options:['Oat Linen','Deep Plum','Charcoal']},
  funds:'2 class seats',tags:['linen','buckwheat']},

 {id:'p16',slug:'cotton-yoga-strap',name:'Cotton Yoga Strap',cat:'yoga',price:19,
  imgs:['p-strap-1'],rating:4.7,reviews:58,
  blurb:'8ft of organic cotton webbing with a D-ring buckle.',
  desc:'The least glamorous and most used object in the studio.',
  details:['8ft organic cotton webbing','Steel D-ring buckle','Machine washable'],
  funds:'1 warm breakfast',tags:['organic cotton']},

 {id:'p17',slug:'linen-eye-pillow',name:'Linen Eye Pillow',cat:'yoga',price:24,
  imgs:['p-eyepillow-1'],rating:4.8,reviews:112,
  blurb:'Flaxseed and lavender. The last two minutes of practice, improved.',
  desc:'Gentle weight across the eyes triggers a measurable drop in heart rate. It is the cheapest nervous-system intervention we know.',
  details:['Flaxseed and dried lavender','Washable linen slip','Freezer or radiator safe','9in x 4in'],
  funds:'1 warm breakfast',tags:['lavender','savasana']},

 {id:'p18',slug:'let-light-shine-tee',name:'Let Light Shine Tee',cat:'apparel',price:36,
  imgs:['p-tee-1','p-tee-2'],rating:4.7,reviews:203,
  blurb:'Heavyweight organic cotton, the tagline set in gold across the chest.',
  desc:'240gsm organic cotton, garment-dyed so it softens instead of fading. The tagline is printed in a low-sheen metallic that survives the wash.',
  details:['240gsm organic cotton','Garment-dyed, pre-shrunk','Unisex fit, XS–3XL','Metallic screen print'],
  variants:{label:'Size',options:['XS','S','M','L','XL','2XL','3XL']},
  funds:'1 class seat',tags:['organic','unisex']},

 {id:'p19',slug:'kavanah-crest-hoodie',name:'Kavanah Crest Hoodie',cat:'apparel',price:72,compare:88,
  imgs:['p-hoodie-1','p-hoodie-2'],rating:4.9,reviews:167,badge:'Bestseller',
  blurb:'Brushed-back fleece with the full crest embroidered in gold thread.',
  desc:'The crest is embroidered, not printed — eleven thousand stitches, which is why it takes an extra week to ship in December.',
  details:['400gsm brushed-back fleece','Gold-thread crest embroidery','Twin-needle hems, jersey-lined hood','Unisex fit, XS–3XL'],
  variants:{label:'Size',options:['XS','S','M','L','XL','2XL','3XL']},
  funds:'2 nights of shelter',tags:['embroidered','fleece']},

 {id:'p20',slug:'sanctuary-wrap-shawl',name:'Sanctuary Wrap Shawl',cat:'apparel',price:86,
  imgs:['p-shawl-1'],rating:4.8,reviews:78,
  blurb:'Oversized merino wrap for sitting practice and long flights.',
  desc:'Big enough to sit inside. We designed it for the first twenty minutes of a morning that is still too cold to be honest about.',
  details:['80% merino, 20% cashmere','78in x 32in oversized','Hand-finished fringe','Dry clean or cold hand wash'],
  variants:{label:'Colour',options:['Oat','Deep Plum','Storm Grey']},
  funds:'2 class seats',tags:['merino','oversized']},

 {id:'p21',slug:'movement-leggings',name:'Movement Leggings',cat:'apparel',price:64,
  imgs:['p-leggings-1'],rating:4.6,reviews:141,
  blurb:'High-rise, squat-proof, with a pocket that actually holds a phone.',
  desc:'Tested for opacity in a lit studio by people who have been let down before.',
  details:['Recycled nylon / elastane','High-rise, 26in inseam','Side pocket fits a large phone','Four-way stretch, opaque'],
  variants:{label:'Size',options:['XS','S','M','L','XL','2XL']},
  funds:'2 class seats',tags:['recycled','pocket']},

 {id:'p22',slug:'studio-grip-socks',name:'Studio Grip Socks',cat:'apparel',price:16,
  imgs:['p-socks-1'],rating:4.5,reviews:96,
  blurb:'Silicone grip, open toe, ribbed arch.',
  desc:'For hard floors, borrowed mats, and the six weeks a year when the studio heating disappoints everyone.',
  details:['Combed cotton blend','Silicone tread','Open toe and heel','Two pairs per pack'],
  variants:{label:'Size',options:['S/M','L/XL']},
  funds:'1 warm breakfast',tags:['grip','pack of 2']},

 {id:'p23',slug:'embroidered-crest-cap',name:'Embroidered Crest Cap',cat:'apparel',price:32,
  imgs:['p-cap-1'],rating:4.6,reviews:52,
  blurb:'Six-panel washed cotton with the crown mark in gold.',
  desc:'Washed, unstructured, and soft from day one.',
  details:['Washed cotton twill','Unstructured six-panel','Adjustable brass clasp','One size'],
  funds:'1 class seat',tags:['unstructured']},

 {id:'p24',slug:'mala-beads-108',name:'Mala Beads — 108',cat:'accessories',price:54,
  imgs:['p-mala-2','p-mala-1'],rating:4.9,reviews:189,badge:'Bestseller',
  blurb:'108 amethyst beads, hand-knotted on silk with a gold guru bead.',
  desc:'Hand-knotted between every bead, which takes far longer and means a broken strand loses one bead rather than all of them. Use it to count breaths when counting in your head has stopped working.',
  details:['108 x 8mm amethyst beads','Hand-knotted on silk cord','Gold-plated guru bead and tassel','Presented in a velvet pouch'],
  variants:{label:'Stone',options:['Amethyst','Rose Quartz','Black Onyx','Sandalwood']},
  funds:'2 class seats',tags:['hand-knotted','108']},

 {id:'p25',slug:'kavanah-canvas-tote',name:'Kavanah Canvas Tote',cat:'accessories',price:28,
  imgs:['p-tote-1'],rating:4.7,reviews:124,
  blurb:'16oz canvas, crest at the base, big enough for a mat.',
  desc:'The bag we hand to every new member at their first in-person session.',
  details:['16oz natural canvas','Reinforced base and straps','Interior zip pocket','Fits a rolled mat'],
  funds:'1 warm breakfast',tags:['canvas']},

 {id:'p26',slug:'insulated-steel-bottle',name:'Insulated Steel Bottle',cat:'accessories',price:34,
  imgs:['p-bottle-1'],rating:4.8,reviews:139,
  blurb:'750ml, double-walled, engraved with the crest.',
  desc:'Cold for twenty-four hours, hot for twelve, and it does not sweat onto the mat.',
  details:['750ml, 18/8 stainless steel','Double-wall vacuum insulation','Laser-engraved crest','Leakproof bamboo lid'],
  variants:{label:'Finish',options:['Matte Plum','Brushed Steel','Ivory']},
  funds:'1 class seat',tags:['insulated']},

 {id:'p27',slug:'the-gratitude-journal',name:'The Gratitude Journal',cat:'accessories',price:29,
  imgs:['p-journal-1','p-journal-2'],rating:4.9,reviews:246,badge:'Pairs with the app',
  blurb:'Ninety days of morning and night pages. Mirrors the Mood Journal in the app.',
  desc:'Structured for people who have failed at journalling before: two short prompts in the morning, three at night, and nothing on the page to make you feel behind if you miss a day. Every page mirrors the Mood Journal inside the Kavanah app, so you can move between paper and phone without losing the thread.',
  details:['90 days, morning and night spreads','Vegan leather, lay-flat binding','Ribbon marker and elastic closure','Mirrors the in-app Mood Journal','A5, 192 pages'],
  variants:{label:'Colour',options:['Deep Plum','Oat','Charcoal']},
  funds:'1 class seat',tags:['journal','90 days','app']},

 {id:'p28',slug:'let-light-shine-book',name:'Let Light Shine',cat:'books',price:24,
  imgs:['p-book-light-1'],rating:5.0,reviews:98,badge:'Signed',
  blurb:'Daisy Pearl on intention, recovery and the practice of paying attention.',
  desc:'The founding text of Kavanah Global. Forty-two short chapters written across two years, each one short enough to read before the coffee goes cold. Every copy from this store is signed.',
  details:['Hardcover, 248 pages','Signed by the author','Includes the 42-day practice appendix','Also available as audiobook in the app'],
  variants:{label:'Format',options:['Signed hardcover','Paperback','Audiobook (in app)']},
  funds:'2 class seats',tags:['signed','founding text']},

 {id:'p29',slug:'quiet-the-noise',name:'Quiet the Noise',cat:'books',price:22,
  imgs:['p-book-quiet-1'],rating:4.8,reviews:67,
  blurb:'A short field guide to stress, written for people with no time to read it.',
  desc:'Twenty-eight interventions, none longer than a page, arranged by how much time you have: sixty seconds, ten minutes, an afternoon.',
  details:['Paperback, 164 pages','28 interventions by time available','Illustrated by the author'],
  funds:'1 class seat',tags:['stress','field guide']},

 {id:'p30',slug:'nourish',name:'Nourish',cat:'books',price:28,
  imgs:['p-book-nourish-1'],rating:4.7,reviews:83,
  blurb:'Food as foundation — sixty recipes and the reasoning behind them.',
  desc:'Not a diet book. Sixty everyday recipes built around blood-sugar stability, plus the plainest explanation we could write of why the fourth cup of coffee feels necessary.',
  details:['Hardcover, 216 pages','60 recipes, photographed','Shopping lists and batch plans','Companion to the Nourish programme'],
  funds:'2 class seats',tags:['recipes','nutrition']},

 {id:'p31',slug:'forty-two-days',name:'Forty-Two Days',cat:'books',price:20,
  imgs:['p-book-days-1'],rating:4.9,reviews:112,
  blurb:'A daily reader. One page, one practice, six weeks.',
  desc:'Designed to sit on a bedside table and be opened once a day for six weeks. Most people who finish it start again.',
  details:['Paperback, 96 pages','One page per day','Ribbon marker','Pairs with the app streak'],
  funds:'1 warm breakfast',tags:['daily','42 days']}
];

/* ---------------- Programs (.org) ---------------- */
KG.programs = [
 {id:'g1',slug:'freedom-addiction-recovery',title:'Freedom',sub:'A 12-week path through addiction',cat:'Recovery',
  cover:'prog-freedom',price:480,member:0,weeks:12,lessonCount:36,live:'2 live circles weekly',level:'All stages',
  rating:4.9,students:1284,
  blurb:'Twelve weeks, thirty-six sessions, and two live circles a week — built for the person who has tried to stop before.',
  long:'Freedom is our longest and most supported programme. It does not treat addiction as a moral failure or a disease to be managed alone. It treats it as a set of grooves worn into a life, and it spends twelve weeks helping you wear new ones. You will work through craving, shame, sleep, nutrition, relationships and relapse — in that order, because that is the order they actually arrive in.',
  outcomes:['Understand your own craving cycle and the four points where it can be interrupted','Build a daily structure that does not collapse on a bad day','Repair sleep and blood sugar — the two most underrated relapse factors','Write and rehearse a relapse plan before you need one','Rejoin a circle of people who are doing the same work'],
  includes:['36 pre-recorded sessions','2 live circles every week','Private Freedom circle in the community','Printable workbook (94 pages)','Mood Journal recovery template','Lifetime access to your cohort'],
  care:'Freedom is education and peer support. It is not medical treatment, detox or therapy.'},

 {id:'g2',slug:'still-waters-stress-anxiety',title:'Still Waters',sub:'Stress and anxiety, unwound',cat:'Mind',
  cover:'prog-stillwaters',price:280,member:0,weeks:8,lessonCount:24,live:'1 live session weekly',level:'Beginner friendly',
  rating:4.9,students:2140,
  blurb:'Eight weeks of practical nervous-system work for people whose minds will not stop.',
  long:'Most stress advice fails because it asks you to feel differently. Still Waters asks you to do differently — with the breath, the body, the calendar and the phone — and lets the feeling follow. Every session ends with one thing to do before the next.',
  outcomes:['Down-regulate a spiralling nervous system in under four minutes','Identify your three personal stress triggers and pre-decide your response','Rebuild an evening that actually ends','Separate real urgency from manufactured urgency','Hold a steadier baseline through a difficult week'],
  includes:['24 pre-recorded sessions','Weekly live session','Guided audio library (18 tracks)','Still Waters circle access','Mood Journal stress template'],
  care:'Educational wellness content. Not a substitute for care from a licensed clinician.'},

 {id:'g3',slug:'nourish-food-as-foundation',title:'Nourish',sub:'Food as foundation, not punishment',cat:'Body',
  cover:'prog-nourish',price:240,member:0,weeks:6,lessonCount:18,live:'1 live kitchen weekly',level:'All levels',
  rating:4.8,students:1673,
  blurb:'Six weeks of nutrition without a diet, a scale, or a single word about willpower.',
  long:'We built Nourish after watching too many people be handed a prescription and no education. It is about blood sugar, protein, sleep and the honest mechanics of appetite — taught in plain language, with a live cook-along every week.',
  outcomes:['Build a plate that holds you for four hours','Understand the blood-sugar swing behind the 3pm collapse','Batch-cook a week in ninety minutes','Read a label in under ten seconds','Separate hunger from habit, boredom and thirst'],
  includes:['18 pre-recorded sessions','Weekly live kitchen session','60 recipes with shopping lists','Nourish circle access','Copy of the Nourish book (posted)'],
  care:'General nutrition education. Not medical or dietetic advice for a specific condition.'},

 {id:'g4',slug:'order-your-days',title:'Order Your Days',sub:'Life and time management',cat:'Mind',
  cover:'prog-order-days',price:220,member:0,weeks:6,lessonCount:18,live:'1 live session weekly',level:'All levels',
  rating:4.8,students:1391,
  blurb:'Stop spending your life in other people\'s business. Six weeks on attention, time and self-management.',
  long:'This is the programme Daisy has taught longest and in the most rooms. It is not productivity culture. It is the older idea that a life has a shape, that the shape is made of days, and that a day is made of what you agreed to pay attention to.',
  outcomes:['Name the four places your week actually goes','Build a morning that decides the day instead of reacting to it','Say no in a way you can repeat','Protect two hours a week for the thing you keep postponing','Close the day deliberately instead of by exhaustion'],
  includes:['18 pre-recorded sessions','Weekly live session','The Days planner (printable)','Order Your Days circle','Mood Journal productivity template'],
  care:'Educational content on personal organisation and attention.'},

 {id:'g5',slug:'the-quiet-room',title:'The Quiet Room',sub:'Meditation and breath',cat:'Spirit',
  cover:'prog-quiet-room',price:180,member:0,weeks:4,lessonCount:28,live:'3 live sits weekly',level:'Beginner friendly',
  rating:5.0,students:3208,
  blurb:'Four weeks to build a sitting practice that survives contact with a real life.',
  long:'Twenty-eight short sessions, none longer than eighteen minutes, plus three live sits a week at 6am, 1pm and 9pm New York time so there is always one you can make. Most people who finish The Quiet Room are still sitting a year later.',
  outcomes:['Sit for twenty minutes without fighting yourself','Use four distinct breath patterns and know when each applies','Build a practice that survives travel, illness and a bad week','Understand what is happening physiologically, not just spiritually'],
  includes:['28 pre-recorded sits','3 live sits weekly (6am / 1pm / 9pm ET)','Guided audio library (24 tracks)','Quiet Room circle','Streak tracking in the app'],
  care:'Contemplative practice education, open to every faith and to none.'},

 {id:'g6',slug:'move-and-restore',title:'Move & Restore',sub:'Yoga for real bodies',cat:'Body',
  cover:'prog-move-restore',price:260,member:0,weeks:8,lessonCount:32,live:'2 live classes weekly',level:'All levels',
  rating:4.9,students:1846,
  blurb:'Eight weeks of yoga taught for stiff, tired, ordinary bodies — including yours.',
  long:'Every class is filmed with three people demonstrating at once: full expression, modified, and seated. You will never be left guessing what to do if your knee objects.',
  outcomes:['Move through a full practice without pain or comparison','Modify any posture three ways on the spot','Build the ten-minute practice you will actually do','Undo the specific damage of a desk and a phone'],
  includes:['32 filmed classes, 10–50 minutes','2 live classes weekly','Every posture demonstrated three ways','Move & Restore circle','Chair-based track included'],
  care:'Movement education. Speak to a clinician before starting if you are injured or pregnant.'},

 {id:'g7',slug:'after-the-storm',title:'After the Storm',sub:'Grief, loss and the year that follows',cat:'Recovery',
  cover:'prog-after-storm',price:240,member:0,weeks:8,lessonCount:20,live:'1 live circle weekly',level:'Gentle',
  rating:4.9,students:742,
  blurb:'Eight weeks for the part nobody prepares you for — the second month, and the sixth.',
  long:'Most grief support arrives in the first fortnight and disappears exactly when it is needed. After the Storm begins where the casseroles stop. It is slow, quiet, and does not ask you to move on.',
  outcomes:['Understand grief as waves rather than stages','Find language for what you are carrying','Rebuild sleep and appetite after loss','Handle anniversaries, holidays and the questions people ask','Be in a room with others who are not uncomfortable'],
  includes:['20 gentle sessions','Weekly live circle','After the Storm circle (private)','Letter-writing practice','Mood Journal grief template'],
  care:'Peer support and education. If you are in crisis, please contact emergency services or a crisis line.'},

 {id:'g8',slug:'let-light-shine-foundations',title:'Let Light Shine',sub:'Purpose and spiritual foundations',cat:'Spirit',
  cover:'prog-purpose',price:200,member:0,weeks:6,lessonCount:22,live:'1 live teaching weekly',level:'All faiths',
  rating:5.0,students:2967,badge:'Founding programme',
  blurb:'Six weeks with Daisy Pearl on intention, service and the question of what you are for.',
  long:'The programme Kavanah Global was built around, drawn from Daisy\'s writing and from twenty years of rooms. It is rooted in Jewish contemplative practice and open, deliberately and completely, to every faith and to none.',
  outcomes:['Understand kavanah — intention — as a daily discipline, not a mood','Write a personal statement of purpose you can stand behind','Build a practice of service into an ordinary week','Sit with the questions that do not resolve'],
  includes:['22 teachings with Daisy','Weekly live teaching','Signed copy of Let Light Shine (posted)','Foundations circle','42-day practice track'],
  care:'Open to every tradition. Nothing here asks you to leave your own.'}
];

/* ---------------- Lesson structure ---------------- */
KG.modules = {
 g1:[
  {t:'Module 1 — Seeing Clearly',ls:[
    {t:'Why willpower was never the problem',len:'14:20',free:1,th:'les-7'},
    {t:'The craving cycle, mapped',len:'18:05',free:1,th:'les-1'},
    {t:'Your four interruption points',len:'16:40',th:'les-11'}]},
  {t:'Module 2 — The Body First',ls:[
    {t:'Sleep is the first intervention',len:'15:10',th:'les-4'},
    {t:'Blood sugar and the 4pm collapse',len:'19:30',th:'les-5'},
    {t:'Movement as a craving interrupt',len:'12:55',th:'les-8'}]},
  {t:'Module 3 — Shame and Story',ls:[
    {t:'The story you tell about yourself',len:'21:15',th:'les-2'},
    {t:'Shame keeps the cycle running',len:'17:45',th:'les-12'},
    {t:'Writing a truer account',len:'16:20',th:'les-11'}]},
  {t:'Module 4 — People',ls:[
    {t:'Who to tell, and how',len:'14:50',th:'les-6'},
    {t:'Boundaries that hold on a bad day',len:'18:10',th:'les-3'},
    {t:'Building your circle',len:'15:35',th:'les-6'}]},
  {t:'Module 5 — The Relapse Plan',ls:[
    {t:'Relapse is data, not defeat',len:'20:05',th:'les-9'},
    {t:'Writing the plan before you need it',len:'22:40',th:'les-11'},
    {t:'Rehearsing the hard hour',len:'17:25',th:'les-1'}]},
  {t:'Module 6 — Forward',ls:[
    {t:'What a year from now looks like',len:'19:00',th:'les-8'},
    {t:'Service as the last step',len:'16:15',th:'les-7'},
    {t:'Closing circle',len:'24:30',th:'les-6'}]}
 ],
 g5:[
  {t:'Week 1 — Sitting Down',ls:[
    {t:'What we are actually doing here',len:'11:20',free:1,th:'les-7'},
    {t:'Posture: five points, no mysticism',len:'09:45',free:1,th:'les-10'},
    {t:'Your first eight minutes',len:'08:00',th:'les-1'},
    {t:'When the mind wanders (it will)',len:'12:30',th:'les-12'},
    {t:'Evening sit — winding down',len:'10:15',th:'les-4'},
    {t:'Week 1 close',len:'07:40',th:'les-9'}]},
  {t:'Week 2 — The Breath',ls:[
    {t:'Four patterns and when to use them',len:'16:50',th:'les-1'},
    {t:'Box breathing under pressure',len:'09:10',th:'les-1'},
    {t:'The physiological sigh',len:'07:25',th:'les-12'},
    {t:'Extended exhale for sleep',len:'11:05',th:'les-4'},
    {t:'Breath and craving',len:'13:15',th:'les-3'},
    {t:'Week 2 close',len:'08:20',th:'les-9'}]},
  {t:'Week 3 — Attention',ls:[
    {t:'Focused attention vs open awareness',len:'14:35',th:'les-11'},
    {t:'Noting practice',len:'12:00',th:'les-2'},
    {t:'Sitting with discomfort',len:'15:20',th:'les-10'},
    {t:'Walking practice',len:'13:40',th:'les-3'},
    {t:'The 90-second rule',len:'10:50',th:'les-12'},
    {t:'Week 3 close',len:'08:55',th:'les-9'}]},
  {t:'Week 4 — A Practice That Lasts',ls:[
    {t:'Building the minimum viable sit',len:'12:20',th:'les-7'},
    {t:'Travel, illness, and bad weeks',len:'14:10',th:'les-8'},
    {t:'Kavanah — sitting with intention',len:'17:30',th:'les-7'},
    {t:'Practice for the rest of your life',len:'15:45',th:'les-12'},
    {t:'Closing sit — 20 minutes',len:'20:00',th:'les-1'},
    {t:'Where to go next',len:'09:30',th:'les-6'}]}
 ]
};
KG.defaultModules = [
  {t:'Module 1 — Foundations',ls:[
    {t:'Where we are starting from',len:'14:20',free:1,th:'les-7'},
    {t:'The one idea this rests on',len:'16:05',free:1,th:'les-11'},
    {t:'Your baseline, measured honestly',len:'12:40',th:'les-2'}]},
  {t:'Module 2 — The Daily Work',ls:[
    {t:'A practice small enough to keep',len:'15:10',th:'les-1'},
    {t:'What to do on the bad days',len:'18:30',th:'les-12'},
    {t:'Tracking without obsessing',len:'11:55',th:'les-2'}]},
  {t:'Module 3 — Body and Rhythm',ls:[
    {t:'Sleep, light and the shape of a day',len:'17:15',th:'les-4'},
    {t:'Eating for a steady afternoon',len:'19:45',th:'les-5'},
    {t:'Movement you will actually do',len:'13:20',th:'les-10'}]},
  {t:'Module 4 — People and Place',ls:[
    {t:'Telling the people around you',len:'14:50',th:'les-6'},
    {t:'Boundaries, plainly',len:'16:10',th:'les-3'},
    {t:'Finding your circle',len:'15:35',th:'les-6'}]},
  {t:'Module 5 — Keeping It',ls:[
    {t:'The plan for when it slips',len:'20:05',th:'les-9'},
    {t:'A year from now',len:'18:40',th:'les-8'},
    {t:'Closing circle',len:'22:25',th:'les-7'}]}
];

/* ---------------- Live schedule ---------------- */
KG.live = [
 {id:'l01',prog:'g5',title:'Morning Sit — 20 minutes',guide:'Daisy Pearl',day:0,date:'Mon 1 Sep',time:'6:00 AM',tz:'ET',mins:20,seats:60,taken:41,img:'live-3',type:'Sit',rec:1},
 {id:'l02',prog:'g2',title:'Still Waters — Live Session 3: The Evening That Ends',guide:'Daisy Pearl',day:0,date:'Mon 1 Sep',time:'7:00 PM',tz:'ET',mins:60,seats:120,taken:96,img:'live-5',type:'Session'},
 {id:'l03',prog:'g5',title:'Midday Sit — 12 minutes',guide:'Daisy Pearl',day:1,date:'Tue 2 Sep',time:'1:00 PM',tz:'ET',mins:12,seats:60,taken:28,img:'live-3',type:'Sit',rec:1},
 {id:'l04',prog:'g1',title:'Freedom Circle — Week 4',guide:'Daisy Pearl',day:1,date:'Tue 2 Sep',time:'8:00 PM',tz:'ET',mins:75,seats:24,taken:22,img:'live-6',type:'Circle',closed:1,
  note:'Closed circle — Freedom members only. Not recorded.'},
 {id:'l05',prog:'g6',title:'Move & Restore — Live Class: Hips and Low Back',guide:'Daisy Pearl',day:2,date:'Wed 3 Sep',time:'7:30 AM',tz:'ET',mins:45,seats:100,taken:63,img:'live-4',type:'Class',rec:1},
 {id:'l06',prog:'g3',title:'Nourish Kitchen — Batch Cooking a Week',guide:'Daisy Pearl',day:2,date:'Wed 3 Sep',time:'6:00 PM',tz:'ET',mins:60,seats:150,taken:118,img:'live-2',type:'Kitchen',rec:1},
 {id:'l07',prog:'g5',title:'Evening Sit — 15 minutes',guide:'Daisy Pearl',day:3,date:'Thu 4 Sep',time:'9:00 PM',tz:'ET',mins:15,seats:60,taken:37,img:'live-3',type:'Sit',rec:1},
 {id:'l08',prog:'g4',title:'Order Your Days — Live Session 2: Saying No',guide:'Daisy Pearl',day:3,date:'Thu 4 Sep',time:'12:30 PM',tz:'ET',mins:55,seats:120,taken:74,img:'live-5',type:'Session',rec:1},
 {id:'l09',prog:'g8',title:'Let Light Shine — Weekly Teaching',guide:'Daisy Pearl',day:4,date:'Fri 5 Sep',time:'11:00 AM',tz:'ET',mins:60,seats:200,taken:171,img:'live-5',type:'Teaching',rec:1},
 {id:'l10',prog:'g7',title:'After the Storm — Circle',guide:'Daisy Pearl',day:4,date:'Fri 5 Sep',time:'6:30 PM',tz:'ET',mins:75,seats:20,taken:16,img:'live-6',type:'Circle',closed:1,
  note:'Closed circle. Not recorded, by request of members.'},
 {id:'l11',prog:'g6',title:'Move & Restore — Slow Saturday',guide:'Daisy Pearl',day:5,date:'Sat 6 Sep',time:'9:00 AM',tz:'ET',mins:50,seats:100,taken:52,img:'live-4',type:'Class',rec:1},
 {id:'l12',prog:'g1',title:'Freedom Circle — Week 4 (Second Sitting)',guide:'Daisy Pearl',day:5,date:'Sat 6 Sep',time:'11:00 AM',tz:'ET',mins:75,seats:24,taken:19,img:'live-6',type:'Circle',closed:1},
 {id:'l13',prog:'g5',title:'Sunday Long Sit — 45 minutes',guide:'Daisy Pearl',day:6,date:'Sun 7 Sep',time:'8:00 AM',tz:'ET',mins:45,seats:80,taken:44,img:'live-3',type:'Sit',rec:1},
 {id:'l14',prog:'g2',title:'Open Q&A — Anything You Like',guide:'Daisy Pearl',day:6,date:'Sun 7 Sep',time:'5:00 PM',tz:'ET',mins:45,seats:250,taken:133,img:'live-1',type:'Open',rec:1,open:1,
  note:'Open to every member, on any programme.'}
];

/* ---------------- Community ---------------- */
KG.circles = [
 {id:'c1',name:'The Front Step',img:'circ-1',members:4820,posts:12640,blurb:'Where everyone starts. Introductions, questions, and the first honest post.',open:1},
 {id:'c2',name:'Freedom',img:'circ-4',members:1284,posts:9310,blurb:'Private circle for Freedom members. Addiction, craving, relapse, and the days in between.',locked:1,prog:'g1'},
 {id:'c3',name:'Still Waters',img:'circ-5',members:2140,posts:7420,blurb:'Stress, anxiety, and the nervous system. Practical, not preachy.',prog:'g2'},
 {id:'c4',name:'The Quiet Room',img:'circ-6',members:3208,posts:5180,blurb:'Sitting practice. Streaks, struggles, and the twelve-minute mornings.',prog:'g5'},
 {id:'c5',name:'The Table',img:'circ-3',members:1673,posts:6240,blurb:'Nourish members trading recipes, wins, and 4pm survival strategies.',prog:'g3'},
 {id:'c6',name:'After the Storm',img:'circ-2',members:742,posts:3110,blurb:'Grief and loss. Slow, gentle, no advice unless asked.',locked:1,prog:'g7'}
];

KG.threads = [
 {id:'t1',circle:'c2',title:'Day 41. I did not think I would get here.',author:'RiverStone',ago:'2h',replies:34,likes:212,pinned:1,
  body:'Forty-one days. I have started counting three times before and never got past nine.\n\nWhat changed this time was small and stupid: I moved the kettle. My whole evening used to start at the cupboard next to it, and now it does not. Module 2 called it an interruption point and I remember thinking that was too simple to work.\n\nIt worked.\n\nThe hard hour is still 9pm to 10pm. I sit with the app open and I write in the night page and mostly it passes. Twice it did not pass and I called someone from this circle instead, which I would not have done in March.\n\nThank you for being here at midnight when I needed a room with people in it.',
  reps:[
   {a:'QuietOak',ago:'2h',likes:41,b:'Forty-one days is not nothing. Moving the kettle is not stupid — it is exactly the work. Most of us are looking for a big dramatic change and it turns out to be furniture.'},
   {a:'M. in Queens',ago:'1h',likes:28,b:'The hard hour for me is 4pm, which I did not believe until I tracked it for two weeks in the journal and it was 4pm eleven days out of fourteen. Seeing it on the chart made it feel like weather instead of character.'},
   {a:'Lantern',ago:'1h',likes:19,b:'Calling someone instead of not calling someone. That is the whole thing. Well done.'},
   {a:'RiverStone',ago:'44m',likes:12,b:'The weather thing is right. It stops being "what is wrong with me" and starts being "ah, it is 4pm again."'}
  ]},
 {id:'t2',circle:'c4',title:'Does anyone else sit better in the afternoon than the morning?',author:'Halcyon',ago:'5h',replies:22,likes:88,
  body:'Everything I read says morning. Every teacher says morning. I have tried morning for six weeks and I am fighting myself the entire time.\n\nThe 1pm live sit is the only one where I am not white-knuckling it. Am I doing this wrong or is the morning thing just a convention?',
  reps:[
   {a:'Daisy Pearl',badge:'Guide',ago:'4h',likes:96,b:'It is a convention, and a useful one for many people, and not a law. The best time to sit is the time you will actually sit. Six weeks of fighting yourself at 6am is worth less than six weeks of showing up at 1pm.\n\nKeep the 1pm. Come back to mornings in a year if you feel like it, or do not.'},
   {a:'Wren',ago:'3h',likes:24,b:'Afternoon person here. Two years in. Never once managed a morning sit and I have stopped apologising for it.'},
   {a:'Halcyon',ago:'2h',likes:18,b:'This is a genuine relief. Thank you both.'}
  ]},
 {id:'t3',circle:'c1',title:'New here. Nervous. Not sure what to say.',author:'Someone_New',ago:'8h',replies:47,likes:164,
  body:'My sister sent me a link three weeks ago and I have opened this page about nine times without posting.\n\nI do not have a dramatic story. I am just tired in a way that sleeping does not fix and I have been for maybe two years. I do not know if that qualifies for anything here.',
  reps:[
   {a:'QuietOak',ago:'7h',likes:58,b:'It qualifies. "Tired in a way sleeping does not fix" is a more precise description than most of us managed on our first post.'},
   {a:'Marigold',ago:'7h',likes:44,b:'Nine times before posting. I did eleven. Welcome.'},
   {a:'Daisy Pearl',badge:'Guide',ago:'6h',likes:87,b:'You do not need a dramatic story and there is no bar to clear. Start with Still Waters or The Quiet Room — both are gentle and both are short. And post here again in a week and tell us how it went. Someone will answer. Someone always does.'},
   {a:'Someone_New',ago:'4h',likes:31,b:'Okay. Starting The Quiet Room tonight.'}
  ]},
 {id:'t4',circle:'c5',title:'The 4pm collapse is real and I have proof',author:'BatchCookBex',ago:'1d',replies:29,likes:141,
  body:'Tracked my energy every hour for two weeks like the module said. Charted it. It is a cliff at 3:40pm every single weekday and completely absent at weekends.\n\nThe difference is lunch. Weekdays I eat a sandwich at my desk at noon. Weekends I eat properly at one.\n\nAdded protein to weekday lunch. Cliff is now a slope.',
  reps:[
   {a:'Wren',ago:'1d',likes:33,b:'"Cliff is now a slope" is going on my wall.'},
   {a:'M. in Queens',ago:'22h',likes:21,b:'What are you actually eating? My weekday lunch imagination died some years ago.'},
   {a:'BatchCookBex',ago:'20h',likes:26,b:'Boring but: eggs or leftover chicken, something green, and a piece of fruit. The batch session in week 3 is what made it possible — ninety minutes on Sunday and I stop making decisions at noon.'}
  ]},
 {id:'t5',circle:'c3',title:'Four minutes actually works and I am annoyed about it',author:'Fennel',ago:'1d',replies:18,likes:97,
  body:'I have been dismissive of breathwork for years. Signed up for Still Waters for the sleep content and skipped ahead.\n\nHad a genuinely bad meeting on Tuesday, went to the stairwell, did the extended exhale thing for four minutes because I had nothing else. Heart rate came down. Went back in and was fine.\n\nI do not enjoy being wrong this cheaply.',
  reps:[
   {a:'Halcyon',ago:'1d',likes:29,b:'The stairwell is the unofficial Kavanah meditation hall.'},
   {a:'Daisy Pearl',badge:'Guide',ago:'22h',likes:38,b:'Being wrong cheaply is the best kind. It is not mystical — a long exhale loads the vagus nerve and the heart slows. That is all it is, and it is enough.'}
  ]},
 {id:'t6',circle:'c6',title:'Six months today. Nobody mentioned it.',author:'Ember',ago:'2d',replies:26,likes:188,
  body:'Six months since my mother died. Everybody remembered at one month. A few remembered at three.\n\nToday: nothing. Which I understand, and which is also the loneliest thing that has happened yet.\n\nI am not asking for anything. I just wanted to write it somewhere it would be read.',
  reps:[
   {a:'Lantern',ago:'2d',likes:64,b:'Read. Six months today. I am sorry about your mother.'},
   {a:'Marigold',ago:'2d',likes:47,b:'Read. The second six months were harder than the first for me, and nobody warns you.'},
   {a:'QuietOak',ago:'1d',likes:39,b:'Read. Thinking of you today.'}
  ]},
 {id:'t7',circle:'c1',title:'What do you do in the first ten minutes after waking?',author:'Marigold',ago:'2d',replies:52,likes:119,
  body:'Collecting answers. Mine is currently: phone, dread, phone again. Trying to replace it and curious what actually works for people rather than what sounds good.',
  reps:[
   {a:'Wren',ago:'2d',likes:31,b:'Water, curtains open, ten minutes outside even in February. The February part is what makes it work.'},
   {a:'BatchCookBex',ago:'2d',likes:22,b:'Kettle on, night page from yesterday reread, morning page written. Four minutes.'},
   {a:'Fennel',ago:'1d',likes:17,b:'Phone charges in the kitchen now. That was the entire intervention.'}
  ]},
 {id:'t8',circle:'c4',title:'Streak broke at 88 days and I want to quit',author:'Wren',ago:'3d',replies:31,likes:126,
  body:'Eighty-eight days. Missed yesterday because of a flight delay and now the number says 1 and I genuinely considered deleting the app.\n\nI know this is not rational. Posting it anyway.',
  reps:[
   {a:'Daisy Pearl',badge:'Guide',ago:'3d',likes:112,b:'You did not lose eighty-eight days. You sat for eighty-eight days. The number is a tool for getting you to the cushion and the moment it becomes a reason to leave the cushion, it has stopped doing its job.\n\nSit today. The counter is not the practice.'},
   {a:'Halcyon',ago:'3d',likes:28,b:'Broke at 140 last year. Sat the next day anyway. Two hundred and something now and I care about the number much less, which is probably the actual progress.'}
  ]}
];

/* ---------------- Mood Journal ---------------- */
KG.moods = [
  {v:1,label:'Very low',color:'#9C2F3A',icon:'frown'},
  {v:2,label:'Low',color:'#B4762A',icon:'frown'},
  {v:3,label:'Level',color:'#8A7C4A',icon:'meh'},
  {v:4,label:'Good',color:'#5B8C5A',icon:'smile'},
  {v:5,label:'Bright',color:'#3F7D58',icon:'smile'}
];
KG.emotions = ['Calm','Grateful','Hopeful','Focused','Restless','Anxious','Tired','Irritable','Lonely','Overwhelmed','Craving','Sad','Content','Proud','Numb','Energised'];
KG.journalPrompts = {
  morning:['What is one thing I am turning toward today?','What would make today feel honest?','Where is my attention likely to leak today?'],
  night:['What actually happened today?','What is one thing I am grateful for?','What would I do differently tomorrow?']
};
KG.journal = [
 {d:'2026-08-25',am:{m:3,e:['Tired','Hopeful'],t:'Slept badly again but I am up before the alarm, which counts. Turning toward: finishing the Freedom module instead of leaving it at 2 of 3.'},pm:{m:4,e:['Proud','Calm'],t:'Finished the module. The bit about the four interruption points is going to stay with me. Ate properly at 1pm and the afternoon did not collapse.',sleep:6,energy:3,craving:2}},
 {d:'2026-08-24',am:{m:2,e:['Anxious','Restless'],t:'Sunday dread arriving on a Monday schedule. Turning toward: doing the 6am sit even though I do not want to.'},pm:{m:3,e:['Calm','Tired'],t:'Did the sit. Twelve minutes, mostly fidgeting, but did it. Work was work.',sleep:5,energy:2,craving:3}},
 {d:'2026-08-23',am:{m:4,e:['Grateful','Energised'],t:'Slept eight hours. Astonishing what that does.'},pm:{m:5,e:['Content','Proud'],t:'Walked to the market, cooked properly, called my sister. The kind of day I used to think was a fluke and am starting to think is a result.',sleep:8,energy:5,craving:1}},
 {d:'2026-08-22',am:{m:3,e:['Focused'],t:'Straightforward day ahead. Turning toward: not checking my phone before the kettle boils.'},pm:{m:4,e:['Calm','Content'],t:'Managed it. Small thing, but the first ten minutes were mine.',sleep:7,energy:4,craving:1}},
 {d:'2026-08-21',am:{m:2,e:['Overwhelmed','Anxious'],t:'Too much on. Turning toward: doing one thing at a time and writing the rest down.'},pm:{m:3,e:['Tired','Calm'],t:'Wrote the list. It was nine things, not the ninety it felt like. Four minutes of extended exhale in the stairwell at 3pm.',sleep:6,energy:3,craving:3}},
 {d:'2026-08-20',am:{m:3,e:['Restless'],t:'Restless without a reason. Turning toward: movement before noon.'},pm:{m:4,e:['Energised','Grateful'],t:'Move & Restore live class at 7:30. Hips and low back. Completely different person afterwards.',sleep:7,energy:4,craving:2}},
 {d:'2026-08-19',am:{m:1,e:['Sad','Lonely'],t:'Bad morning. No particular cause. Turning toward: getting through it without making it worse.'},pm:{m:2,e:['Tired','Numb'],t:'Hard day. Did not make it worse, which was the goal. Posted in the circle and three people answered within an hour.',sleep:5,energy:2,craving:4}},
 {d:'2026-08-18',am:{m:3,e:['Hopeful','Focused'],t:'Week 4 starts today. Turning toward: the Tuesday circle, even though I am tempted to skip.'},pm:{m:4,e:['Grateful','Calm'],t:'Went to the circle. Spoke, which I have not done for three weeks. Nobody made it a thing and that was exactly right.',sleep:7,energy:4,craving:2}}
];

/* ---------------- Impact ---------------- */
KG.impact = {
  nights:14286, breakfasts:31940, seats:8412, sanctuaryDays:1120,
  households:2867, volunteers:184, raised:1284600,
  perDollar:[
    {icon:'bed',n:'$18',t:'One night of shelter',d:'A bed, clean linen, a locked door and someone at the desk until morning.'},
    {icon:'coffee',n:'$6',t:'One warm breakfast',d:'Hot food, coffee, and a shower before the day starts.'},
    {icon:'book',n:'$40',t:'One class seat',d:'A full programme seat for someone who could not otherwise pay for one.'},
    {icon:'leaf',n:'$120',t:'One sanctuary day',d:'A day of residential care, meals and practice at the Sanctuary.'}
  ],
  months:[
    {m:'Sep',v:820},{m:'Oct',v:960},{m:'Nov',v:1140},{m:'Dec',v:1680},
    {m:'Jan',v:1320},{m:'Feb',v:1210},{m:'Mar',v:1390},{m:'Apr',v:1450},
    {m:'May',v:1520},{m:'Jun',v:1610},{m:'Jul',v:1740},{m:'Aug',v:1846}
  ]
};

/* ---------------- Locations ---------------- */
KG.locations = [
 {name:'Queens House',addr:'Astoria, Queens, NY',type:'Shelter & Centre',status:'Open',beds:18,img:'nyc-2',
  hours:'Shelter intake 7:00 PM – 11:00 PM daily · Centre 9:00 AM – 6:00 PM',
  blurb:'Our first house. Eighteen beds, a full kitchen, and the room where the Tuesday circle meets.'},
 {name:'Great Neck Centre',addr:'Great Neck, Long Island, NY',type:'Centre & Studio',status:'Open',beds:0,img:'nyc-3',
  hours:'Mon–Sat 8:00 AM – 8:00 PM',
  blurb:'Where most live sessions are filmed and where the in-person Move & Restore classes run.'},
 {name:'Manhattan Office',addr:'Midtown, New York, NY',type:'Office & Meeting Rooms',status:'Opening soon',beds:0,img:'nyc-1',
  hours:'From Q1',
  blurb:'Meeting rooms and a small studio for weekday sessions in Manhattan.'},
 {name:'Kavanah Global Sanctuary',addr:'Hudson Valley, NY',type:'Residential Sanctuary',status:'In development',beds:24,img:'sanct-1',
  hours:'Residential stays from 2027',
  blurb:'The residential programme. Land, quiet, and a place to stay while you rebuild.'}
];

/* ---------------- Membership ---------------- */
KG.membership = [
 {id:'m1',name:'Seeker',price:0,per:'free',blurb:'Start here. No card needed.',
  feats:['The Front Step community circle','Three free preview sessions per programme','Mood Journal — 7 days of history','Open Sunday Q&A','Weekly letter from Daisy'],cta:'Create free account'},
 {id:'m2',name:'Practitioner',price:39,per:'month',blurb:'Everything, every month.',popular:1,
  feats:['Every programme, all 8 — unlimited','All live sessions, sits and classes','Full Mood Journal with insights and export','All community circles','Session recordings for 90 days','15% off everything on kavanahglobal.com','Cancel any time'],cta:'Start 14-day trial'},
 {id:'m3',name:'Circle',price:390,per:'year',blurb:'Two months free, plus the things we cannot repeat monthly.',save:'Save $78',
  feats:['Everything in Practitioner','Two 1:1 sessions with Daisy each year','Priority seat in closed circles','Signed copy of Let Light Shine','Early access to Sanctuary stays','25% off everything on kavanahglobal.com','Sponsors one class seat every month'],cta:'Join the Circle'}
];

KG.donationTiers = [
 {amt:18,t:'One night',d:'A bed and a locked door for one person tonight.'},
 {amt:54,t:'Three nights',d:'A weekend off the street, with breakfast each morning.'},
 {amt:126,t:'A week',d:'Seven nights, seven breakfasts, seven showers.'},
 {amt:480,t:'A full programme seat',d:'Twelve weeks of Freedom for someone who cannot pay.'}
];

/* ---------------- Writings ---------------- */
KG.posts = [
 {id:'w1',t:'The kettle, and other small furniture',by:'Daisy Pearl',date:'22 Aug 2026',read:'4 min',img:'les-9',cat:'Practice',
  ex:'We keep looking for the large change. In eleven years of rooms I have almost never seen one work. What works is moving the kettle.'},
 {id:'w2',t:'What kavanah actually means',by:'Daisy Pearl',date:'14 Aug 2026',read:'6 min',img:'les-7',cat:'Foundations',
  ex:'It is usually translated as intention, which is close and not quite right. It is nearer to direction — where the heart is pointed before the hands begin.'},
 {id:'w3',t:'On being sold a medication instead of an education',by:'Daisy Pearl',date:'2 Aug 2026',read:'7 min',img:'les-5',cat:'Nutrition',
  ex:'A woman told me she would be on it forever. I asked her what the leaflet said. The leaflet said: continue to exercise, continue to eat well. Nobody had read it to her.'},
 {id:'w4',t:'The second six months',by:'Daisy Pearl',date:'27 Jul 2026',read:'5 min',img:'les-12',cat:'Grief',
  ex:'Everybody comes at one month. Some come at three. Almost nobody comes at six, which is when the house is quietest and the help has gone home.'},
 {id:'w5',t:'Why our candles have no scent',by:'Daisy Pearl',date:'19 Jul 2026',read:'3 min',img:'les-1',cat:'Craft',
  ex:'Because there should be nothing between you and your own attention, including something pleasant.'},
 {id:'w6',t:'We are all illegal on this planet',by:'Daisy Pearl',date:'8 Jul 2026',read:'6 min',img:'les-3',cat:'Service',
  ex:'We have a shelf life. Anything with a shelf life is meant to be on the shelf, not to own it. That is the whole argument for compassion, and I have never needed another.'}
];

/* ---------------- Testimonials ---------------- */
KG.voices = [
 {q:'I had tried to stop four times. What was different was that at 11pm there were people in the room. That is not a small thing — that is the whole thing.',n:'R.',m:'Freedom, week 12'},
 {q:'I signed up for the sleep content and stayed for everything else. Six weeks in, my evenings end. They did not used to end.',n:'Fennel',m:'Still Waters'},
 {q:'Nobody had ever explained blood sugar to me. Nobody. Forty-one years old and one live kitchen session changed how I eat.',n:'B.',m:'Nourish'},
 {q:'The journal is the part I did not expect to matter. Seeing that my worst hour is always 4pm turned a character flaw into weather.',n:'M. in Queens',m:'Practitioner member'},
 {q:'I came for yoga and found a room where I could say my mother had died and nobody flinched.',n:'Ember',m:'After the Storm'},
 {q:'Two hundred and forty days of sitting. I have never kept anything up for two hundred and forty days in my life.',n:'Wren',m:'The Quiet Room'}
];

/* ---------------- Demo user ---------------- */
KG.user = {
  name:'Maya Ellison', handle:'Marigold', initials:'ME', joined:'March 2026',
  tier:'Practitioner', streak:41, sits:128, minutes:2140,
  enrolled:[
    {prog:'g1',progress:38,module:'Module 3 — Shame and Story',next:'Shame keeps the cycle running',nextId:8},
    {prog:'g5',progress:76,module:'Week 4 — A Practice That Lasts',next:'Kavanah — sitting with intention',nextId:21},
    {prog:'g3',progress:12,module:'Module 1 — Foundations',next:'The one idea this rests on',nextId:2}
  ],
  saved:['p01','p24','p27'],
  orders:[
    {id:'KG-24815',date:'12 Aug 2026',total:126,items:2,status:'Delivered',funded:'7 nights of shelter'},
    {id:'KG-23902',date:'28 Jun 2026',total:54,items:1,status:'Delivered',funded:'2 class seats'},
    {id:'KG-22740',date:'3 May 2026',total:188,items:4,status:'Delivered',funded:'5 nights of shelter'}
  ]
};

/* ---------------- Helpers ---------------- */
KG.assets = (function(){
  var sc = document.currentScript;
  if (sc && sc.src) return sc.src.replace(/data\.js(\?.*)?$/,'');
  return 'assets/';
})();
KG.root = KG.assets.replace(/assets\/$/,'');
KG.img = function(n){ return KG.assets + 'img/' + n + '.jpg'; };
KG.url = function(p){ return KG.root + p; };
KG.money = function(n){ return '$' + Number(n).toFixed(2).replace(/\.00$/,''); };
KG.byId = function(arr,id){ for(var i=0;i<arr.length;i++) if(arr[i].id===id) return arr[i]; return null; };
KG.bySlug = function(arr,s){ for(var i=0;i<arr.length;i++) if(arr[i].slug===s) return arr[i]; return null; };
KG.modulesFor = function(pid){ return KG.modules[pid] || KG.defaultModules; };
KG.flatLessons = function(pid){
  var out=[], mods=KG.modulesFor(pid), n=0;
  mods.forEach(function(m,mi){ m.ls.forEach(function(l,li){ out.push(Object.assign({},l,{mi:mi,li:li,n:n++,module:m.t})); }); });
  return out;
};
