/* SFM Demo Data — single source of truth across Admin / Coach / Parent */

const SFM_DATA = {
  org: {
    name: "San Francisco Merionettes",
    short: "SFM",
    domain: "sfmerionettes.org",
    season: "2026 Season",
    boardPresident: "Eileen Horng"
  },

  pools: [
    { code: "JB",      name: "JB Pool" },
    { code: "HL",      name: "HL Pool" },
    { code: "Coffman", name: "Coffman Pool" },
    { code: "Balboa",  name: "Balboa Pool" }
  ],

  coaches: [
    { id: "lolli",    name: "Lolli",     role: "Head Coach",     teams: ["jy","10u"],     hours: 18 },
    { id: "emily",    name: "Emily",     role: "Coach",          teams: ["12ua"],         hours: 9 },
    { id: "heidi",    name: "Heidi",     role: "Coach",          teams: ["12ua"],         hours: 9 },
    { id: "niloo",    name: "Niloo",     role: "Coach",          teams: ["12ub"],         hours: 12 },
    { id: "sophia_t", name: "Sophia T.", role: "Coach",          teams: ["10u"],          hours: 10 },
    { id: "sophia_m", name: "Sophia M.", role: "Coach",          teams: ["nov"],          hours: 7 },
    { id: "trina",    name: "Trina",     role: "Coach",          teams: ["int"],          hours: 4 },
    { id: "sofie",    name: "Sofie",     role: "Coach",          teams: ["int"],          hours: 9 },
    { id: "cameron",  name: "Cameron",   role: "Assistant Coach",teams: ["nov"],          hours: 4 },
    { id: "sandra",   name: "Sandra",    role: "Assistant Coach",teams: ["jy"],           hours: 5 },
    { id: "lys",      name: "Lys",       role: "Assistant Coach",teams: ["jy"],           hours: 5 },
    { id: "eve",      name: "Eve",       role: "Assistant Coach",teams: ["10u"],          hours: 3 },
    { id: "lucy",     name: "Lucy",      role: "Assistant Coach",teams: ["nov"],          hours: 3 }
  ],

  teams: [
    {
      id: "jy", code: "jy", name: "Juniors & Youth", tier: "Highest Level",
      monthlyFee: 630, headCoaches: ["lolli"], assistantCoaches: ["sandra","lys"],
      practicesPerWeek: 6, color: "navy",
      roster: ["Lexie","Aurelia","Mari","Emmy","Keira C."]
    },
    {
      id: "12ua", code: "12ua", name: "12U A", tier: "Competitive — A Squad",
      monthlyFee: 600, headCoaches: ["emily","heidi"], assistantCoaches: [],
      practicesPerWeek: 5, color: "aqua",
      roster: ["Ellie","Jade","Jasmine","Keira","Lumi","Sebastian","Annabelle","Caitlin","Eloise","Alison"]
    },
    {
      id: "12ub", code: "12ub", name: "12U B", tier: "Competitive — B Squad",
      monthlyFee: 600, headCoaches: ["niloo"], assistantCoaches: [],
      practicesPerWeek: 5, color: "purple",
      roster: ["Luna","Myka","Juhi","Lucinda","Brianne","Josie","Emerald","Valentina","Toni"]
    },
    {
      id: "10u", code: "10u", name: "10U", tier: "Age-Group",
      monthlyFee: 550, headCoaches: ["sophia_t"], assistantCoaches: ["eve","lolli"],
      practicesPerWeek: 4, color: "green",
      roster: ["Kaiden","Adeline","Noemi","Lily","Carlie","Elsie","Maya","Amada","Giorgia","Chloe G."]
    },
    {
      id: "int", code: "int", name: "Intermediates", tier: "Skill Development",
      monthlyFee: 500, headCoaches: ["sofie"], assistantCoaches: ["trina"],
      practicesPerWeek: 4, color: "pink",
      roster: ["Moha","Vera","Penelope","Brynn","Lucia","Charlotte","Maeve","Janelle","Avalon"]
    },
    {
      id: "nov", code: "nov", name: "Novice", tier: "Beginner",
      monthlyFee: 420, headCoaches: ["sophia_m"], assistantCoaches: ["cameron","lucy"],
      practicesPerWeek: 3, color: "gold",
      roster: ["Han","Andrew","Syleste","Noreen","Kaia","Chloe","Nina","Stella","Penny","Coraline","Frances","Noe","Tilly"]
    }
  ],

  // Featured family for parent demo
  families: [
    {
      id: "fam_kelly",
      parentName: "Kelly Chen",
      parentEmail: "kelly.chen@example.com",
      parentPhone: "+1 (415) 555-0182",
      address: "421 Cole St, San Francisco, CA",
      emergencyContact: "Marcus Chen — Spouse — (415) 555-0184",
      children: [
        { id: "sw_brianne", name: "Brianne Chen", age: 11, team: "12ub", initial: "B", color: "purple" },
        { id: "sw_janelle", name: "Janelle Chen", age: 13, team: "int",  initial: "J", color: "pink"   },
        { id: "sw_syleste", name: "Syleste Chen", age: 9,  team: "nov",  initial: "S", color: "gold"   }
      ]
    }
  ],

  // Week of June 1, 2026 — verbatim from Eileen's schedule
  schedule: [
    // June 1 — Monday
    { id: "p1", date: "2026-06-01", day: "Mon", start: "19:30", end: "21:30", team: "jy",   pool: "JB",      coaches: ["lolli"] },
    { id: "p2", date: "2026-06-01", day: "Mon", start: "17:00", end: "20:00", team: "12ua", pool: "HL",      coaches: ["emily"] },
    { id: "p2b",date: "2026-06-01", day: "Mon", start: "17:00", end: "20:00", team: "12ub", pool: "HL",      coaches: ["emily"] },

    // June 2 — Tuesday
    { id: "p3", date: "2026-06-02", day: "Tue", start: "16:30", end: "19:00", team: "jy",   pool: "Coffman", coaches: ["lolli"] },
    { id: "p4", date: "2026-06-02", day: "Tue", start: "16:30", end: "19:00", team: "12ua", pool: "Coffman", coaches: ["heidi"] },
    { id: "p5", date: "2026-06-02", day: "Tue", start: "16:30", end: "19:00", team: "12ub", pool: "Coffman", coaches: ["niloo"] },
    { id: "p6", date: "2026-06-02", day: "Tue", start: "17:00", end: "19:30", team: "10u",  pool: "Balboa",  coaches: ["sophia_t"] },
    { id: "p7", date: "2026-06-02", day: "Tue", start: "17:30", end: "19:30", team: "int",  pool: "Balboa",  coaches: ["trina","sofie"] },
    { id: "p8", date: "2026-06-02", day: "Tue", start: "17:30", end: "19:30", team: "nov",  pool: "Balboa",  coaches: ["cameron","sophia_m"] },

    // June 3 — Wednesday
    { id: "p9",  date: "2026-06-03", day: "Wed", start: "18:00", end: "21:30", team: "jy",   pool: "JB",      coaches: ["lolli","sandra","lys"] },
    { id: "p10", date: "2026-06-03", day: "Wed", start: "17:30", end: "20:00", team: "12ub", pool: "HL",      coaches: ["niloo"] },
    { id: "p11", date: "2026-06-03", day: "Wed", start: "17:00", end: "19:30", team: "10u",  pool: "Balboa",  coaches: ["lolli","eve"] },
    { id: "p12", date: "2026-06-03", day: "Wed", start: "17:30", end: "19:30", team: "int",  pool: "Balboa",  coaches: ["sofie"] },
    { id: "p13", date: "2026-06-03", day: "Wed", start: "17:30", end: "19:30", team: "nov",  pool: "Balboa",  coaches: ["lucy","sophia_m"] },

    // June 4 — Thursday
    { id: "p14", date: "2026-06-04", day: "Thu", start: "16:30", end: "19:00", team: "jy",   pool: "Coffman", coaches: ["lolli"] },
    { id: "p15", date: "2026-06-04", day: "Thu", start: "16:30", end: "19:00", team: "12ua", pool: "Coffman", coaches: ["heidi"] },
    { id: "p16", date: "2026-06-04", day: "Thu", start: "16:30", end: "19:00", team: "12ub", pool: "Coffman", coaches: ["niloo"] },

    // June 5 — Friday
    { id: "p17", date: "2026-06-05", day: "Fri", start: "17:00", end: "19:00", team: "jy",   pool: "Coffman", coaches: ["lolli"] },
    { id: "p18", date: "2026-06-05", day: "Fri", start: "17:00", end: "19:00", team: "12ua", pool: "Coffman", coaches: ["emily"] },
    { id: "p19", date: "2026-06-05", day: "Fri", start: "17:00", end: "19:00", team: "12ub", pool: "Coffman", coaches: ["niloo"] },
    { id: "p20", date: "2026-06-05", day: "Fri", start: "17:00", end: "19:00", team: "10u",  pool: "Coffman", coaches: ["sophia_t"] },

    // June 7 — Sunday (long sessions)
    { id: "p21", date: "2026-06-07", day: "Sun", start: "14:00", end: "19:00", team: "jy",   pool: "JB", coaches: ["lolli","sandra","lys"] },
    { id: "p22", date: "2026-06-07", day: "Sun", start: "15:00", end: "20:00", team: "12ua", pool: "JB", coaches: ["heidi","emily"] },
    { id: "p23", date: "2026-06-07", day: "Sun", start: "15:00", end: "19:00", team: "12ub", pool: "JB", coaches: ["niloo"] },
    { id: "p24", date: "2026-06-07", day: "Sun", start: "14:00", end: "17:00", team: "10u",  pool: "JB", coaches: ["sophia_t"] },
    { id: "p25", date: "2026-06-07", day: "Sun", start: "16:00", end: "19:00", team: "int",  pool: "JB", coaches: ["sofie"] },
    { id: "p26", date: "2026-06-07", day: "Sun", start: "15:00", end: "17:00", team: "nov",  pool: "JB", coaches: ["sophia_m"] }
  ],

  // Sample upcoming competitions
  competitions: [
    {
      id: "comp1",
      name: "Pacific Coast Sectionals",
      date: "2026-06-20",
      location: "Concord Community Pool",
      teams: ["12ua","12ub","10u","int"],
      entryFee: 50,
      routineFees: { team: 70, duet: 70, solo: 105, combo: 140 }
    },
    {
      id: "comp2",
      name: "USAAS Junior Nationals",
      date: "2026-07-15",
      location: "Stanford Aquatic Center",
      teams: ["jy"],
      entryFee: 75,
      routineFees: { team: 90, duet: 90, solo: 140, combo: 180 }
    }
  ],

  // 12U A competition charges (from Eileen's example email)
  competitionCharges_12UA: [
    { swimmer: "Ellie",     entry: 50, routine: 140 },
    { swimmer: "Jade",      entry: 50, routine: 70  },
    { swimmer: "Jasmine",   entry: 50, routine: 70  },
    { swimmer: "Keira",     entry: 50, routine: 70  },
    { swimmer: "Lumi",      entry: 50, routine: 140 },
    { swimmer: "Sebastian", entry: 50, routine: 105 },
    { swimmer: "Annabelle", entry: 50, routine: 70  },
    { swimmer: "Caitlin",   entry: 50, routine: 70  },
    { swimmer: "Eloise",    entry: 50, routine: 70  },
    { swimmer: "Alison",    entry: 50, routine: 70  }
  ],

  // Recent billing transactions (admin view)
  transactions: [
    { date: "2026-05-19", member: "Brianne Chen",   parent: "Kelly Chen",     amount: 600, type: "Dues — 12U B",                method: "Card",   status: "Paid" },
    { date: "2026-05-19", member: "Janelle Chen",   parent: "Kelly Chen",     amount: 500, type: "Dues — Intermediates",        method: "Card",   status: "Paid" },
    { date: "2026-05-19", member: "Syleste Chen",   parent: "Kelly Chen",     amount: 420, type: "Dues — Novice",                method: "Card",   status: "Paid" },
    { date: "2026-05-18", member: "Lexie Park",     parent: "Diana Park",     amount: 630, type: "Dues — Juniors & Youth",       method: "ACH",    status: "Paid" },
    { date: "2026-05-18", member: "Ellie Wong",     parent: "Karen Wong",     amount: 600, type: "Dues — 12U A",                 method: "Card",   status: "Paid" },
    { date: "2026-05-17", member: "Sebastian Ruiz", parent: "Maria Ruiz",     amount: 155, type: "Sectionals entry + solo",      method: "Card",   status: "Paid" },
    { date: "2026-05-17", member: "Lumi Tanaka",    parent: "Akiko Tanaka",   amount: 190, type: "Sectionals entry + combo",     method: "Card",   status: "Paid" },
    { date: "2026-05-16", member: "Han Liu",        parent: "Sarah Liu",      amount: 420, type: "Dues — Novice",                method: "Cash",   status: "Paid" },
    { date: "2026-05-15", member: "Avalon Greene",  parent: "Renee Greene",   amount: 500, type: "Dues — Intermediates",        method: "Link",   status: "Outstanding" },
    { date: "2026-05-15", member: "Carlie Ng",      parent: "Patrick Ng",     amount: 550, type: "Dues — 10U",                   method: "Card",   status: "Failed" },
    { date: "2026-05-14", member: "Annabelle Ho",   parent: "Grace Ho",       amount: 120, type: "Warm-up jacket order",         method: "Card",   status: "Paid" },
    { date: "2026-05-14", member: "Coraline West",  parent: "Helen West",     amount: 420, type: "Dues — Novice",                method: "ACH",    status: "Paid" }
  ],

  // Announcements feed
  announcements: [
    {
      id: "a1",
      from: "Eileen Horng",
      role: "Board President",
      title: "Pool Maintenance — Coffman Closed Thu June 11",
      body: "Heads up: Coffman Pool will be closed Thursday June 11 for emergency tile work. All Coffman practices that day move to JB Pool (same times). Please double-check the in-app calendar — it has already been updated.",
      time: "2 hours ago",
      channels: ["app","email","sms"],
      pinned: true,
      teams: ["all"]
    },
    {
      id: "a2",
      from: "Coach Emily",
      role: "12U A Coach",
      title: "12U A — Routine Fees Posted",
      body: "Sectionals routine fees for 12U A are now live on the billing page. Solo swimmers (Ellie, Lumi) have a $140 routine fee — everyone else $70. Please clear balances before June 12.",
      time: "Yesterday",
      channels: ["app","email"],
      pinned: false,
      teams: ["12ua"]
    },
    {
      id: "a3",
      from: "Coach Lolli",
      role: "Head Coach — J&Y / 10U",
      title: "Sunday June 7 — Long Practice Reminder",
      body: "Reminder Juniors & Youth has a 5-hour practice this Sunday at JB Pool. Please pack a snack and a second swimsuit. We will break at 4:30pm for 20 minutes.",
      time: "2 days ago",
      channels: ["app","sms"],
      pinned: false,
      teams: ["jy"]
    },
    {
      id: "a4",
      from: "Eileen Horng",
      role: "Board President",
      title: "New Skill Videos Posted — 12U Required Elements",
      body: "Coach Niloo and I have posted the full USAAS 12U skill library in Resources. Required for all 12U A and 12U B swimmers to review before next Sunday.",
      time: "3 days ago",
      channels: ["app","email"],
      pinned: false,
      teams: ["12ua","12ub"]
    },
    {
      id: "a5",
      from: "Eileen Horng",
      role: "Board President",
      title: "April Newsletter — Now Available",
      body: "Our April newsletter is live in Resources. Highlights: spring carnival results, new coach welcome, fundraising recap, and competition schedule through summer.",
      time: "1 week ago",
      channels: ["app","email"],
      pinned: false,
      teams: ["all"]
    }
  ],

  // Resource library — skill videos
  resources: [
    { id: "r1", title: "Eggbeater Kick — Foundations", category: "12U Required", duration: "4:12", coach: "USAAS Library", thumb: "navy" },
    { id: "r2", title: "Ballet Leg — Single", category: "12U Required", duration: "3:48", coach: "USAAS Library", thumb: "aqua" },
    { id: "r3", title: "Vertical Position — Hold", category: "12U Required", duration: "5:30", coach: "USAAS Library", thumb: "purple" },
    { id: "r4", title: "Boost — Vertical to Surface", category: "12U Required", duration: "4:55", coach: "USAAS Library", thumb: "navy" },
    { id: "r5", title: "Figure 142 — Walkover Front", category: "12U Required", duration: "6:20", coach: "USAAS Library", thumb: "gold" },
    { id: "r6", title: "Sculling — Stationary Support", category: "Beginner", duration: "3:15", coach: "Coach Sophia M.", thumb: "green" },
    { id: "r7", title: "Sculling — Travel Front", category: "Novice", duration: "4:02", coach: "Coach Sophia M.", thumb: "green" },
    { id: "r8", title: "Routine Counts — 8-count Drill", category: "Intermediates", duration: "5:45", coach: "Coach Sofie", thumb: "pink" },
    { id: "r9", title: "Free Routine — 2025 Sectionals", category: "Team Footage", duration: "3:00", coach: "Coach Lolli", thumb: "navy" }
  ],

  // Inventory / shop
  products: [
    { id: "sk1", name: "Team Suit — 2026 Competition",  price: 120, stock: 18, sizes: "JR 22 → Adult 38" },
    { id: "sk2", name: "Team Warm-up Jacket",           price: 95,  stock: 22, sizes: "YS → AXL" },
    { id: "sk3", name: "Team Warm-up Pants",            price: 65,  stock: 24, sizes: "YS → AXL" },
    { id: "sk4", name: "SFM Logo Cap (Silicone)",       price: 18,  stock: 47, sizes: "One Size" },
    { id: "sk5", name: "SFM Logo Goggles",              price: 28,  stock: 32, sizes: "Junior / Adult" },
    { id: "sk6", name: "Team T-shirt",                  price: 22,  stock: 38, sizes: "YS → AXL" }
  ],

  // Activity feed entries for admin
  activity: [
    { icon: "check",   tone: "green", title: "Coach Heidi marked attendance for 12U A — Tue Jun 2",  meta: "9 present · 1 absent (Jade) — 4 min ago" },
    { icon: "dollar",  tone: "green", title: "Payment received from Kelly Chen — $1,520 (3 children)", meta: "Card ending 4421 · 18 min ago" },
    { icon: "alert",   tone: "red",   title: "Payment failed — Carlie Ng dues",                       meta: "Card declined · 42 min ago" },
    { icon: "user",    tone: "info",  title: "New swimmer added: Tilly Brennan — Novice",             meta: "Onboarded by Eileen · 1 hr ago" },
    { icon: "calendar",tone: "gold",  title: "Practice rescheduled — Intermediates Wed Jun 3",        meta: "Balboa → Coffman by Coach Sofie · 2 hr ago" },
    { icon: "mail",    tone: "info",  title: "Announcement sent — Pool Maintenance",                  meta: "Sent to all families · 2 hr ago" },
    { icon: "shop",    tone: "info",  title: "Order placed — Annabelle Ho — Warm-up jacket",          meta: "Pickup at next practice · 3 hr ago" }
  ]
};

// Helpers reused across pages
function teamById(id)  { return SFM_DATA.teams.find(t => t.id === id); }
function coachById(id) { return SFM_DATA.coaches.find(c => c.id === id); }
function coachNames(ids) { return (ids||[]).map(id => coachById(id)?.name).filter(Boolean).join(" & "); }
function initials(name) {
  const parts = (name||"").trim().split(/\s+/);
  return ((parts[0]?.[0]||"") + (parts[1]?.[0]||"")).toUpperCase();
}
function fmtTime(t) {
  if (!t) return "";
  const [h,m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2,"0")} ${period}`;
}
function teamColor(id) {
  return ({
    jy:    "var(--navy-700)",
    "12ua":"var(--aqua-600)",
    "12ub":"#7C3AED",
    "10u": "var(--green-500)",
    int:   "#DB2777",
    nov:   "var(--gold-500)"
  })[id] || "var(--gray-500)";
}
function dollar(n) { return "$" + Number(n).toLocaleString(); }
