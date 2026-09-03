/* MyBrainAI · demo data. Presenter persona: Kevin, Green Country Adventures. */
const IMG = 'assets/img/';

const USER = {
  name:'Kevin', channel:'Green Country Adventures', avatar:IMG+'man1.jpg',
  id:'brain_7f3a…c91e', since:'Aug 2026',
  goals:[
    {id:'g1', img:IMG+'lake3.jpg', cat:'Personal',     hz:'Monthly',   t:'Log my mood every day this month', ic:'smile', type:'auto', src:'mood', due:'31 Aug 2026'},
    {id:'g2', img:IMG+'yoga1.jpg', cat:'Personal',     hz:'Annual',    t:'Get down to 185 lb', ic:'scale', type:'number', unit:'lb', dir:'down', start:258, current:204, target:185, due:'31 Dec 2026',
      history:[['Mar 1',258],['Apr 1',246],['May 1',236],['Jun 1',224],['Jul 1',214],['Aug 1',208],['Aug 28',204]]},
    {id:'g3', img:IMG+'field2.jpg', cat:'Personal',     hz:'Monthly',   t:'Read scripture every morning', ic:'book', type:'checkin', due:'31 Aug 2026',
      ratings:[['Wk 1',4,'Missed two mornings, both filming days'],['Wk 2',5,''],['Wk 3',3,'Labor Day crowd week'],['Wk 4',5,'Camper porch mornings help']]},
    {id:'g4', img:IMG+'lake4.jpg', cat:'Professional', hz:'Quarterly', t:'Grow the channel to 10k subscribers', ic:'video', type:'auto', src:'youtube', unit:'subscribers', start:2100, current:6240, target:10000, due:'30 Sep 2026',
      history:[['Mar',2100],['Apr',2900],['May',3800],['Jun',4700],['Jul',5500],['Aug',6240]]},
    {id:'g5', img:IMG+'beach2.jpg', cat:'Professional', hz:'Quarterly', t:'Reply to every comment within 24 hours', ic:'inbox', type:'auto', src:'hub', current:91, due:'30 Sep 2026'},
    {id:'g6', img:IMG+'stars.jpg', cat:'Professional', hz:'Annual',    t:'Launch MyBrainAI on both app stores', ic:'zap', type:'number', unit:'milestones', dir:'up', start:0, current:2, target:5, due:'31 Dec 2026',
      history:[['Aug 12',1,'Concept written'],['Aug 31',2,'Design sample reviewed']]},
    {id:'g7', img:IMG+'journal1.jpg', cat:'Financial',    hz:'Annual',    t:'Build residual income to $6,000 a month', ic:'dollar', type:'number', unit:'$ / month', dir:'up', start:0, current:2900, target:6000, due:'31 Dec 2026',
      history:[['Mar',800],['Apr',1400],['May',1900],['Jun',2500],['Jul',2700],['Aug',2900]]},
    {id:'g8', img:IMG+'mountains.jpg', cat:'Financial',    hz:'Quarterly', t:'Enrol 120 Medicare clients this season', ic:'users', type:'number', unit:'clients', dir:'up', start:0, current:14, target:120, due:'7 Dec 2026',
      history:[['Aug 20',6,'Pre-bookings from referrals'],['Aug 30',14,'Church group signed up']]},
    {id:'g9', img:IMG+'van.jpg', cat:'Financial',    hz:'Annual',    t:'Move to the camper and cut housing cost to zero', ic:'home', type:'checkin', due:'31 Dec 2026',
      ratings:[['Jun',2,'Land bought, nothing else'],['Jul',3,'Camper delivered'],['Aug',4,'House listed, furniture sold']]}
  ],
  foodYes:['Grilled chicken','Fish','Vegetables','Eggs','Oats'],
  foodNo:['Beef','Pork','Alcohol','Fried food'],
  voice:{ warm:72, playful:58, detail:40, signoff:'— Kevin, GCA', never:['Hey guys','LOL','Thanks for watching!!'] }
};

const CAT_IMG = { Personal:IMG+'yoga1.jpg', Professional:IMG+'lake4.jpg', Financial:IMG+'journal1.jpg' };
const CAT_BLURB = { Personal:'Mind, body and the habits that hold them up.', Professional:'The channel, the inbox and the work that pays.', Financial:'Income, costs and the freedom they buy.' };
const FOCUS = [
  {id:'mind',    n:'Mental clarity',   img:IMG+'lake3.jpg'},
  {id:'fuel',    n:'Nutrition',        img:IMG+'salad1.jpg'},
  {id:'weight',  n:'Weight & body',    img:IMG+'yoga1.jpg'},
  {id:'creator', n:'Creator growth',   img:IMG+'lake4.jpg'},
  {id:'money',   n:'Finances',         img:IMG+'journal1.jpg'},
  {id:'faith',   n:'Faith & purpose',  img:IMG+'field2.jpg'},
  {id:'sleep',   n:'Sleep',            img:IMG+'stars.jpg'},
  {id:'people',  n:'Relationships',    img:IMG+'beach2.jpg'}
];

const MOODS = {
  great:{ n:'Great',   c:'var(--m-great)', t:'var(--m-great-t)', v:5 },
  good: { n:'Good',    c:'var(--m-good)',  t:'var(--m-good-t)',  v:4 },
  okay: { n:'Okay',    c:'var(--m-okay)',  t:'var(--m-okay-t)',  v:3 },
  low:  { n:'Low',     c:'var(--m-low)',   t:'var(--m-low-t)',   v:2 },
  anx:  { n:'Anxious', c:'var(--m-anx)',   t:'var(--m-anx-t)',   v:2 },
  angry:{ n:'Angry',   c:'var(--m-angry)', t:'var(--m-angry-t)', v:1 }
};
const MOOD_ORDER = ['great','good','okay','low','anx','angry'];
const TRIGGERS = ['Work','Family','Money','Sleep','Health','Social','Faith','Channel'];

/* August 2026 mood journal — day: [{m, time, note, tags}] */
const JOURNAL = {
  1:[{m:'good',time:'7:40 AM',note:'Early gym, lake was glass. Good start to the month.',tags:['Health']}],
  2:[{m:'anx',time:'10:15 AM',note:'Sponsor email came in — they want the video re-cut by Friday.',tags:['Work','Channel']},{m:'okay',time:'9:30 PM',note:'Got through it. Tired.',tags:['Sleep']}],
  3:[{m:'good',time:'8:05 AM',note:'Filmed the Sea-Doo oil change walkthrough. Flowed easy.',tags:['Channel']}],
  4:[{m:'low',time:'11:20 PM',note:'Couldn’t sleep. Kept thinking about the camper move.',tags:['Sleep','Money']}],
  5:[{m:'angry',time:'2:10 PM',note:'Bank changed the account terms again. Waived my two-signature rule.',tags:['Money']},{m:'okay',time:'8:00 PM',note:'Moved half the funds to the credit union. Feel more in control.',tags:['Money']}],
  6:[{m:'good',time:'7:30 AM',note:'Quiet morning. Read scripture on the porch.',tags:['Faith']}],
  7:[{m:'great',time:'6:50 PM',note:'Video crossed 20k views. Comments pouring in.',tags:['Channel']}],
  8:[{m:'anx',time:'9:45 AM',note:'200+ comments overnight. Can’t keep up by hand.',tags:['Channel','Work']}],
  9:[{m:'okay',time:'1:00 PM',note:'Four black coffees before noon. Jittery.',tags:['Health']}],
  10:[{m:'good',time:'8:15 AM',note:'Yoga class then the lake. Head clear.',tags:['Health','Social']}],
  11:[{m:'anx',time:'4:30 PM',note:'Medicare enrollment prep starting early. Lot of calls to plan.',tags:['Work']}],
  12:[{m:'low',time:'10:00 PM',note:'Skipped breakfast, ate a burger at 3. Felt heavy all evening.',tags:['Health']}],
  13:[{m:'good',time:'9:00 AM',note:'Good sleep finally. Grilled chicken and veg for lunch.',tags:['Health','Sleep']}],
  14:[{m:'great',time:'5:20 PM',note:'Amazon commission report — best month yet.',tags:['Money']}],
  15:[{m:'okay',time:'12:30 PM',note:'Neutral day. Editing.',tags:['Channel']}],
  16:[{m:'anx',time:'8:40 AM',note:'Three coffees, no breakfast, sponsor call at 9.',tags:['Work','Health']}],
  17:[{m:'good',time:'7:00 PM',note:'Sunset ride with the guys. Needed that.',tags:['Social']}],
  18:[{m:'low',time:'11:00 PM',note:'Up late replying to comments again.',tags:['Sleep','Channel']}],
  19:[{m:'okay',time:'2:00 PM',note:'Camper land visit. Signal is good up there.',tags:['Money']}],
  20:[{m:'good',time:'8:20 AM',note:'Oats and berries, gym at 5. Solid.',tags:['Health']}],
  21:[{m:'anx',time:'3:15 PM',note:'A troll thread on the lake video. Bots piling on.',tags:['Channel']}],
  22:[{m:'good',time:'6:30 PM',note:'Blocked the bots, community rallied. Grateful.',tags:['Channel','Social']}],
  23:[{m:'great',time:'9:10 AM',note:'Church then lake. Best Sunday in a while.',tags:['Faith','Social']}],
  24:[{m:'okay',time:'10:30 AM',note:'Monday admin. Fine.',tags:['Work']}],
  25:[{m:'anx',time:'9:00 AM',note:'Coffee #4. Heart racing before a call.',tags:['Health','Work']}],
  26:[{m:'good',time:'7:45 PM',note:'Sold the couch. Camper move is real now.',tags:['Money']}],
  27:[{m:'low',time:'10:45 PM',note:'Burger and fries for dinner. Regret it.',tags:['Health']}],
  28:[{m:'good',time:'8:00 AM',note:'Salmon bowl, early night planned.',tags:['Health']}],
  29:[{m:'great',time:'4:00 PM',note:'Labor Day weekend crowd at the lake. Drone footage is gold.',tags:['Channel','Social']}],
  30:[{m:'good',time:'9:30 AM',note:'Slept 8 hours. Clear head.',tags:['Sleep']}],
  31:[{m:'good',time:'7:30 PM',note:'Call with the app team. Excited about MyBrainAI.',tags:['Work']}]
};

const MEALS = [
  {id:'m1', day:'Today', time:'6:10 AM', n:'Black coffee', img:IMG+'coffee2.jpg', kcal:5,   p:0,  c:1,  f:0, items:[['Black coffee, 12 oz','5 kcal']]},
  {id:'m2', day:'Today', time:'7:35 AM', n:'Oats, berries & almond butter', img:IMG+'berries.jpg', kcal:412, p:14, c:58, f:14, items:[['Rolled oats, 1 cup','300 kcal'],['Mixed berries','45 kcal'],['Almond butter, 1 tbsp','98 kcal']]},
  {id:'m3', day:'Today', time:'12:50 PM', n:'Grilled chicken & roasted veg', img:IMG+'chicken1.jpg', kcal:548, p:46, c:32, f:22, items:[['Grilled chicken breast, 6 oz','280 kcal'],['Roasted peppers & zucchini','110 kcal'],['Olive oil, 1 tbsp','120 kcal'],['Lemon & herbs','5 kcal']]},
  {id:'m4', day:'Yesterday', time:'7:20 AM', n:'Eggs on sourdough', img:IMG+'toast.jpg', kcal:380, p:20, c:36, f:16, items:[['Fried egg ×2','180 kcal'],['Sourdough, 1 slice','120 kcal'],['Butter','80 kcal']]},
  {id:'m5', day:'Yesterday', time:'1:05 PM', n:'Salmon poke bowl', img:IMG+'salmon.jpg', kcal:610, p:38, c:64, f:20, items:[['Salmon, 5 oz','290 kcal'],['Rice, 1 cup','200 kcal'],['Edamame & veg','120 kcal']]},
  {id:'m6', day:'Yesterday', time:'8:40 PM', n:'Cheeseburger & fries', img:IMG+'burger1.jpg', kcal:1120, p:42, c:96, f:58, items:[['Double cheeseburger','760 kcal'],['Fries','360 kcal']], flag:'Beef — on your avoid list'}
];
const FUEL_TODAY = { kcal:965, goal:2100, p:60, pGoal:160, c:91, cGoal:210, f:36, fGoal:70, coffee:3 };

const PLATFORMS = [
  {id:'yt',  n:'YouTube',   s:'Connected · auto-fetch', lg:'lg-yt',  ic:'yt',  live:true,  cnt:14},
  {id:'fb',  n:'Facebook',  s:'Paste comments & DMs',  lg:'lg-fb',  ic:'fb'},
  {id:'ig',  n:'Instagram', s:'Paste comments & DMs',  lg:'lg-ig',  ic:'ig'},
  {id:'tt',  n:'TikTok',    s:'Paste comments',        lg:'lg-tt',  ic:'tt'},
  {id:'x',   n:'X',         s:'Paste replies & DMs',   lg:'lg-x',   ic:'xs'},
  {id:'wa',  n:'WhatsApp',  s:'Paste messages',        lg:'lg-wa',  ic:'wa'},
  {id:'mail',n:'Email',     s:'Paste any email',       lg:'lg-mail',ic:'mail'},
  {id:'sms', n:'Text / SMS',s:'Paste a thread',        lg:'lg-sms', ic:'msg'},
  {id:'li',  n:'LinkedIn',  s:'Paste messages',        lg:'lg-li',  ic:'briefcase'}
];

const VIDEOS = {
  v1:{t:'Sea-Doo oil change — full walkthrough', img:IMG+'lake4.jpg'},
  v2:{t:'Labor Day at Keystone Lake (drone)',    img:IMG+'beach2.jpg'},
  v3:{t:'5 Sea-Doo safety mistakes beginners make', img:IMG+'boat.jpg'},
  v4:{t:'Camper life: why I sold my house',     img:IMG+'van.jpg'}
};

/* YouTube inbox — fetched via API in the real app */
const COMMENTS = [
  {id:'c1', who:'Marcus T.', av:IMG+'man2.jpg', when:'12m', vid:'v1', txt:'Great vid man. Which oil are you running? Dealer told me full synthetic only but that’s $$$', st:'review',
    reply:'Appreciate it, Marcus! I run the Sea-Doo XPS synthetic blend — full synthetic is what the manual calls for and honestly it’s cheap insurance on a supercharged motor. I linked the exact one in the description so you’re not paying dealer markup.',
    why:'Matched your rule: always point product questions to the Amazon link. Kept it warm, no “hey guys”.'},
  {id:'c2', who:'Danielle R.', av:IMG+'woman1.jpg', when:'38m', vid:'v2', txt:'That drone shot over the cove at 4:12!! How high were you flying that thing?', st:'auto',
    reply:'Ha, that cove shot is my favorite too. I keep it under the 400 ft limit — that one was around 350. Learned the rules the hard way early on, so I always mention it now.',
    why:'High confidence (94%). Similar to 11 replies you’ve approved about drone altitude.'},
  {id:'c3', who:'Beau Whitfield', av:IMG+'man3.jpg', when:'1h', vid:'v3', txt:'Lost my nephew on a jet ski in 2019. Thank you for making safety videos like this. More people need to hear it.', st:'review',
    reply:'Beau, I’m so sorry for your loss. That’s exactly why I make these — if one person straps on a lanyard or a vest because of a video, it’s worth it. Thank you for sharing him with us. Praying for your family.',
    why:'Flagged for your review — sensitive topic. Your brain never auto-sends on grief or loss.'},
  {id:'c4', who:'Jenna K.', av:IMG+'woman2.jpg', when:'2h', vid:'v4', txt:'Wait you really sold the house for a camper?? What does your family think lol', st:'review',
    reply:'Really did! Land is paid for, camper’s set up with satellite internet, and I can see the stars every night. Family thought I was crazy for about a week — now they visit more than they did before.',
    why:'Personal question. Used facts from your profile only; nothing invented.'},
  {id:'c5', who:'Tyler B.', av:'', ini:'TB', col:'#5B6FD6', when:'3h', vid:'v1', txt:'first', st:'auto',
    reply:'Fastest hands on the lake — appreciate you, Tyler.',
    why:'Auto-approved. Low-stakes comment pattern you’ve replied to 40+ times.'},
  {id:'c6', who:'Rosa Alvarez', av:IMG+'woman4.jpg', when:'5h', vid:'v2', txt:'Is that beach open to the public or private? Planning a trip up from Dallas', st:'review',
    reply:'Public — it’s the Keystone Lake side, Corps of Engineers land. Get there before 10 on a holiday weekend or you’ll be parking a mile out. Bring shade, there isn’t much.',
    why:'Local knowledge from your past replies. Verified the beach name against your video description.'},
  {id:'c7', who:'Grant O.', av:'', ini:'GO', col:'#C99A45', when:'6h', vid:'v3', txt:'Would you ever do a video on winterizing? Season’s ending here in Minnesota', st:'done',
    reply:'It’s on the list for October, Grant — I’ll pin it when it’s up. Minnesota winters are no joke on a hull.',
    why:''}
];

/* pasted-in sample sets for the other platforms */
const PASTE_SAMPLES = {
  ig:`@laketime_ok: bro that sunset clip!! where is this??
@sarah.m.reads: My dad has the same Sea-Doo model, he says the seat cracks after 2 summers, true?
@bigmike_fishing: you should collab with us, we fish keystone every weekend`,
  fb:`Debbie Harmon: Kevin your videos got my husband back on the water after his surgery. Thank you honey.
Ron Peltier: What sound system is that? Can hear it from the other side of the cove lol
Amy Castillo: Do you rent these out? Coming in from Tulsa in Sept`,
  wa:`Mom: Are you coming Sunday? Bring the drone, your uncle wants to see it
Chase (Sponsor): Hey Kevin — can we lock the Sept 12 upload? Need the cut by Wed
Josh: bro the lake this weekend or nah`,
  mail:`From: Melissa Grant <melissa@brightpath-medicare.com>
Subject: Enrollment season prep — call this week?

Hi Kevin, wanted to get ahead of Oct 15. Do you have 30 minutes Thursday or Friday to walk through the new plan comparison sheet? Also — are you still doing the text reminders for your existing book? Our compliance team had a question.`,
  tt:`user8823: what jet ski is this
kaylaaa_r: POV you live in oklahoma and this is the only thing to do
jdub_ridez: how fast does it go tho`,
  x:`@okwaterlife: Underrated channel. Keep going @GreenCountryAdv
@tulsa_tim: Any tips for first time buyer? Looking at a used 2021 GTI`,
  li:`Priya Natarajan (Agency Owner, Tulsa): Kevin — saw you're doing Medicare enrollments again this fall. Would you be open to referring overflow leads our way? Happy to reciprocate on life policies.
Derek Holloway: Congrats on the channel growth. Any chance you'd speak at our Tulsa creators meetup in October?`,
  sms:`+1 (918) 555-0142: Hi Kevin this is Carol from church, my husband's Medicare card expired do we need to do anything?
+1 (405) 555-0199: Yo it's Derek, still good for the 7am ride Saturday?`
};
const PASTE_REPLIES = {
  ig:[
    'That’s Keystone Lake, just west of Tulsa — the cove by the Corps beach. Best light is about 30 min before sunset.',
    'Your dad’s not wrong — the stock seat vinyl can split by year two if it sits in the sun. A $30 cover fixes it. I linked the one I use in my bio.',
    'I’m down. DM me which weekend — I’m usually out there Saturday mornings.'
  ],
  fb:[
    'Debbie, that made my whole day. Tell him to take it easy on the throttle for the first few weeks — the water’s not going anywhere.',
    'Ha, it’s the JL Audio tower setup, Ron. I did a full install video back in May if you want to hear it up close.',
    'I don’t rent, Amy, but Keystone Marina does — tell them Kevin from Green Country sent you and they’ll take care of you.'
  ],
  wa:[
    'Yes ma’am, I’ll be there by noon. Drone’s coming — tell Uncle Ray to charge his phone for the photos.',
    'Chase — Sept 12 is locked. You’ll have the cut Wednesday by 5pm CT. Anything specific you want in the first 30 seconds?',
    'Lake. 7am. Don’t be late this time.'
  ],
  mail:[
    'Hi Melissa,\n\nThursday at 10am CT works — send the invite and the comparison sheet ahead so I can mark it up.\n\nOn the text reminders: yes, still running them weekly for my existing book. Happy to walk compliance through the exact wording on the call.\n\nKevin'
  ],
  tt:[
    '2024 Sea-Doo GTX — full build list is in my bio.',
    'Not wrong but at least it’s a good thing to do.',
    'Stock it’ll do about 65 mph. Mine’s tuned a bit higher — video on that coming.'
  ],
  x:[
    'Appreciate that more than you know. Big things coming.',
    'A used 2021 GTI is a great first ski. Check hours (under 100 is ideal), ask for service records, and look at the hull for stress cracks near the ride plate. Happy to look at a listing if you send it.'
  ],
  li:[
    'Priya — appreciate you reaching out. October 15 to December 7 I’m at capacity, so overflow could work. Let’s talk terms before enrollment opens; I’m free Thursday morning.',
    'Thanks, Derek. October is my busiest stretch, but if it’s an evening slot I’ll make it work. Send me the date.'
  ],
  sms:[
    'Hi Carol! No action needed — Medicare cards don’t expire, that date is just the coverage start. If you want, bring it Sunday and I’ll double-check it for you.',
    'Yes sir. 7am, boat ramp. Coffee’s on me.'
  ]
};

/* learned style rules — the visible part of the “brain” */
const RULES = [
  {t:'Never open with “Hey guys” — start with the person’s name or the point.', src:'Learned from 23 edits'},
  {t:'Product questions always get the Amazon link, never a dealer recommendation.', src:'Learned from 17 edits'},
  {t:'Never auto-send on grief, loss, illness or faith — always hand to Kevin.', src:'Set by Kevin at onboarding'},
  {t:'Sign off with “— Kevin, GCA” on email, never on YouTube comments.', src:'Learned from 9 edits'},
  {t:'Mention the 400 ft drone limit whenever altitude comes up.', src:'Learned from 11 approvals'},
  {t:'Keep YouTube replies under 3 sentences unless it’s a safety question.', src:'Learned from 31 approvals'},
  {t:'Facts only — if the brain isn’t sure, it asks Kevin instead of guessing.', src:'Core principle'}
];

const NOTIFS = [
  {ic:'target', c:'var(--accent)', t:'var(--accent-tint)', h:'Two goals need an update', p:'“Get down to 185 lb” has no weigh-in since 28 Aug, and “Read scripture” is waiting for this week’s check-in.', when:'Just now'},
  {ic:'inbox', c:'#E53935', t:'#FBE6E3', h:'14 new YouTube comments', p:'9 auto-drafted, 3 need your review, 2 sensitive.', when:'12 min ago'},
  {ic:'sparkle', c:'var(--accent)', t:'var(--accent-tint)', h:'Sage noticed a pattern', p:'Anxious mornings line up with 3+ coffees and no breakfast, 5 times this month.', when:'Today, 8:02 AM'},
  {ic:'smile', c:'#C99A45', t:'#FBF2DF', h:'Evening check-in', p:'How did the afternoon go? Log a mood before bed to keep your 27-day streak.', when:'Yesterday'},
  {ic:'leaf', c:'#5B9E7C', t:'#DDF1E7', h:'Meal logged', p:'Cheeseburger & fries — beef is on your avoid list. Want Sage to plan tomorrow’s lunch?', when:'Yesterday'}
];

/* coach conversation (scripted) */
const COACH_SCRIPT = {
  opening:{ txt:'Morning, Kevin. You logged “Anxious” Tuesday at 9:00, right after coffee number four. That’s the fifth time this month the same pattern showed up. Want to look at it together? It matters for your weight goal as much as your mood.',
    ev:[{ic:'smile',c:'var(--m-anx)',t:'var(--m-anx-t)',b:'5 anxious mornings in August',s:'All before 10 AM',sp:[2,4,3,5,4,5,3]},
        {ic:'coffee',c:'#8A5A2B',t:'#F3E7D8',b:'3+ coffees on 4 of those days',s:'No breakfast on 3',sp:[1,3,2,4,3,4,2]}] },
  answers:{
    'why':{ txt:'Looking at your data, not a hunch: on the 9th, 16th and 25th you had three or more black coffees before 10 AM with no breakfast, and each of those mornings you logged anxious or jittery. On the 13th and 20th you ate oats first and logged “good”. The trigger tags on the anxious days were Work and Channel — but the food pattern came first every time. I’d start with breakfast before coffee for one week and we’ll compare.',
      ev:[{ic:'coffee',c:'#8A5A2B',t:'#F3E7D8',b:'Coffee-first mornings: 4 of 5 anxious',s:'Oats-first mornings: 0 of 6 anxious',sp:[4,1,4,1,4,1,4]},
          {ic:'target',c:'var(--accent)',t:'var(--accent-tint)',b:'Goal: stay under 200 lb',s:'On track — 74%',sp:[2,3,3,4,4,5,5]}],
      act:['Set a breakfast reminder','Show me the days'] },
    'week':{ txt:'Good week, honestly. Four “good” or “great” days out of seven, one anxious morning (Tuesday, the coffee thing again), and you slept 8 hours twice. Comments are under control — your brain drafted 61 replies and you only changed 9 of them. Protein has been under target on three days; that’s the one thing I’d fix.',
      ev:[{ic:'chart',c:'var(--m-good)',t:'var(--m-good-t)',b:'Mood average 3.9 / 5',s:'Up from 3.2 last week',sp:[3,4,2,4,5,4,4]},
          {ic:'inbox',c:'#E53935',t:'#FBE6E3',b:'61 replies drafted, 9 edited',s:'Brain accuracy now 76%',sp:[2,3,3,4,4,5,5]}],
      act:['What should I eat before the gym?'] },
    'gym':{ txt:'Based on what’s worked for you: oats with berries about 90 minutes before, or eggs on sourdough if it’s an early one. Both logged “good” afterwards every time. Skip the coffee-only mornings — that’s the pattern behind your jittery sessions. You’ve got 100g of protein left to hit today, so grilled chicken tonight would close it.',
      ev:[{ic:'leaf',c:'#5B9E7C',t:'#DDF1E7',b:'Protein: 60 of 160g today',s:'100g to go',sp:[2,2,3,3,3,4,2]}],
      act:['Plan tonight’s dinner','Log a mood'] },
    'default':{ txt:'I only answer from what you’ve actually logged — mood, meals, goals and the replies you’ve approved. I don’t have enough data to answer that confidently yet. Log a few more days and ask me again, or ask me about your week, your mornings, or what to eat before the gym.',
      ev:[], act:['How was my week?','Why do I feel off in the mornings?'] }
  }
};
