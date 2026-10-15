/* Open points for Airtel: the context and question behind each UI.tbc marker in the wireframes, the ways it could be resolved,
   the design team's suggestion (for discussion, not a requirement), what the wireframe shows until it is answered, who should
   answer, and the sources. Each entry's keys are the exact marker texts it covers (UI.tbc text, a category's tbc in
   {module}-data.js, or an access note in page.js). Read by open-points.html and, on the pages, by page.js. Edit this file when
   a marker is added or reworded; build/open_points.py lists markers without an entry. The array is JSON. */
window.OPEN_POINT_DETAILS = [
 {
  "id": "PA-01",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "Provision basis: the list of values"
  ],
  "title": "Provision basis: the list of values a maker chooses from",
  "context": "Every provision a business user raises (single entry or bulk template) carries a 'Provision basis' field that says how the amount was arrived at. The BRD of 9-Sep-2026 (section 9, input template) and the P&A HLD (Table 6) list it among the fields the user enters, but neither gives the values to choose from. The GPA input tracking sheet shows several bases in use today: a fixed amount per month or an amount as per agreement (scenario 7), a fixed or variable trend (scenario 8), and billed or unbilled inputs from the RR team (scenario 1). Without a list the field cannot be validated or reported on, and it cannot drive which evidence the attachment must carry.",
  "question": "What values should 'Provision basis' offer, and should the list differ by activity? Is the field mandatory on every provision?",
  "options": [
   {
    "option": "A single list kept in a portal master, for example: as per agreement, rate x quantity, trend (last month's actual), estimate or quotation, billed or unbilled.",
    "effect": "Values can be validated, filtered and reported, and the attachment rule can follow the basis. Someone must own the list under maker-checker; the sample values come partly from the tracking sheet and partly from general practice."
   },
   {
    "option": "A short list per activity in the activity master, with a default the maker can change.",
    "effect": "Makers see only the bases that fit the activity (for example 'as per agreement' for the data centre rent cross-charge), so fewer wrong picks; more set-up across the 213 tracked inputs."
   },
   {
    "option": "Free text.",
    "effect": "Nothing to maintain, but the field cannot be validated or reported on and adds little beyond the annotation and remarks fields."
   },
   {
    "option": "Drop the field and derive the basis from the activity and its scenario.",
    "effect": "Less typing; the basis becomes a fixed attribute of the activity, so a maker cannot record that one month's amount is an estimate rather than per agreement."
   }
  ],
  "suggested": "Option 2, a list per activity with a default: quick to fill and reportable, while still letting the maker record a different basis for a particular month; the GPA team would supply the values.",
  "wireframe": "pa-04 shows 'Provision basis' as a required drop-down with no values; the bulk template on pa-05 has a 'provision basis' column with no validation.",
  "ask": "GPA team; business finance",
  "refs": "BRD 9-Sep-2026 section 9 (input template); P&A HLD 4.4 Table 6; GPA input tracking sheet, Scenario-1, Scenario-7 and Scenario-8 sheets"
 },
 {
  "id": "PA-02",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "Provision bulk upload: file size and row limits"
  ],
  "title": "Provision bulk upload: largest file size and number of rows",
  "context": "Besides single entry, a business user can raise many provisions at once by filling an Excel template and uploading it; the platform checks every row like a single entry, and each valid row then goes to its own approvers under the DOA (delegation of authority, the approval matrix). The BRD (9-Sep-2026, module 2 'Bulk Upload') and the P&A HLD (3.1, 4.1) require bulk upload but give no limit on file size or number of rows; the only volume figure is the non-functional requirement of 100,000 or more transactions a month (BRD section 18, HLD section 8). The limits decide whether today's largest monthly inputs fit in one file, how long the row check takes, and how many approval items one upload creates.",
  "question": "What is the largest number of rows and the largest file size one provision upload must accept? Which inputs produce the biggest monthly files today, and how many rows do they have?",
  "options": [
   {
    "option": "A fixed limit per file sized from today's largest monthly input, for example a few thousand rows and 10 MB.",
    "effect": "General practice: predictable performance and a clear error for oversize files; users split larger inputs. The figures are placeholders until the GPA team gives current volumes."
   },
   {
    "option": "Accept large files and check them in the background, notifying the user when the row results are ready.",
    "effect": "General practice: no splitting for users; needs a queued job and a 'checking' status, and one file can put thousands of items in approvers' inboxes."
   },
   {
    "option": "Keep bulk upload small (for example up to 500 rows) and bring any very large recurring input in through a feed, as TOCO (tower company) provisions come from DARTS.",
    "effect": "General practice: the approval load per file stays manageable; each large input outside TOCO needs its own integration."
   }
  ],
  "suggested": "Option 1, a fixed limit sized from current volumes: simplest to build and test; the GPA team's figures for the largest monthly inputs, plus headroom, should set the numbers.",
  "wireframe": "pa-05 shows a sample file DG_AMC_Sep26.xlsx with 48 rows (212 KB), one activity per file, and states no limit; batch BLK-26-0412 submits 44 valid rows (Rs 5,29,20,000.00), each approved separately on pa-08.",
  "ask": "GPA team; IT team",
  "refs": "BRD 9-Sep-2026 module 2 and section 18; P&A HLD 3.1, 4.1, section 8 (assumptions)"
 },
 {
  "id": "PA-03",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "URN separators and exact format to be fixed in detailed design"
  ],
  "title": "URN format: separator, component formats, and a second provision for the same key",
  "context": "The URN (unique reference number) identifies a provision from input through the Oracle journal line to the invoice that settles it. The P&A HLD (Table 7) fixes the components, BU + vendor code + item code + month, plus the locator (site) for TOCO (tower company) provisions and the debit note number for TOCO debit-note provisions, but leaves 'separators and exact format' to detailed design. The sources differ: both BRDs (section 12) show VEN123-IT001-JAN26-001 with hyphens and a sequence number, the GPA tracking sheet examples join BU, item code, vendor name and month with no separator (111Security001Jones LangMar'26), and the HLD illustration uses dots (111 · 412885 · ELEC-AOR · JUN-26 · 11106). Item codes such as ELEC-AOR contain hyphens and debit note numbers contain slashes, so the separator must never occur inside a component. The HLD drops the sequence number, so a second provision for the same BU, vendor, item and month is a duplicate; HLD open point 1 asks what happens when an override allows one.",
  "question": "Which separator and component formats (month as MON-YY, vendor code with or without leading zeros, upper case) should the URN use, given that it sits in an Oracle flexfield and is searched and typed by invoice bookers? When an override allows a second provision for the same key, how is it told apart from the first?",
  "options": [
   {
    "option": "Middle dot '·' between components, month as MON-YY (the wireframe's form).",
    "effect": "Readable and never part of a code, but not a keyboard character; it may be mangled in Excel, CSV and Oracle WebADI files and in emails."
   },
   {
    "option": "Hyphen '-' between components.",
    "effect": "Easy to type, but item codes such as ELEC-AOR already contain hyphens, so the URN cannot be split back into its components reliably."
   },
   {
    "option": "Another ASCII character that never occurs inside a component, for example '|' or '~', with month as MON-YY.",
    "effect": "General practice: safe in files, flexfields and searches, and always splits cleanly; less readable than the dot."
   },
   {
    "option": "For a permitted second provision on the same key, add a short suffix (for example '-2') to that provision only.",
    "effect": "The first URN stays unchanged and every URN stays unique; invoices matched on the rebuilt key need a rule for which of the two they settle first."
   }
  ],
  "suggested": "Option 3, an ASCII separator not used in any component, with Option 4 for the rare permitted second provision: works in Oracle flexfields and upload files and can always be split; the Oracle ERP team should confirm the flexfield length and allowed characters.",
  "wireframe": "pa-19 (URN builder tab) shows the four URN forms with '·' and MON-YY, for example 111·410022·SECURITY001·AUG-26 and 111·412885·ELEC-AOR·AUG-26·11106, each editable under maker-checker; pa-04 blocks an exact duplicate on the same key.",
  "ask": "GPA team; Oracle ERP team; P2P team",
  "refs": "P&A HLD 4.4 Table 7, 5.4.1, open point 1; BRD 9-Sep-2026 and 25-Aug-2026 section 12 (URN); BRD 9-Sep-2026 TOCO URN generation; GPA input tracking sheet, Actualisation sheets"
 },
 {
  "id": "PA-04",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "Scenario 4: whether deferment % is a user input or a parameter"
  ],
  "title": "Scenario 4: is the deferment % entered with each input or held as a parameter?",
  "context": "Scenario 4 ('partial expense and deferment') takes a period-to-date amount from the GPA team (the accounting control team that owns provisioning in Oracle), splits it by entity (Mobile, Homes, IPTV) and circle, expenses part of it and defers the rest as prepaid (an asset released to expense month by month). The BRD of 9-Sep-2026 says 'Calculate the Deferment % as per user Inputs: DG 72%, XFE 90%, OR 78%', while the P&A HLD treats percentages as effective-dated configuration, with a master 'Deferment parameters (percentage and life by category)' owned by business finance and GPA (4.1, 6.2), yet its scenario table repeats 'from user inputs' (5.2). So it is unclear whether the % is typed with each monthly input or picked from a master. The BRD also lists the same three percentages for IPTV and Homes, although it says the split into categories (own retail, DG promoter, XFE) applies only to Mobile; the categories are not defined.",
  "question": "Is the deferment % entered by the GPA team with each monthly input, or a parameter per category that changes only occasionally? Which percentages apply to IPTV and Homes?",
  "options": [
   {
    "option": "Parameter: % by category in an effective-dated master, applied automatically.",
    "effect": "Matches HLD 4.1 and 6.2; results are consistent and a past month re-runs with that month's %. A change needs a master update under maker-checker before the input is raised."
   },
   {
    "option": "User input: GPA enters the % with each monthly input.",
    "effect": "Matches the BRD wording and suits a % recalculated every month, but the approver must check it each time and nothing keeps months consistent."
   },
   {
    "option": "Both: the master gives a default and GPA may override it with a reason.",
    "effect": "Flexible and auditable: the override and its reason go to the audit trail and the approver sees the difference from the master."
   }
  ],
  "suggested": "Option 3, a master default with a logged override: follows the HLD's configuration approach while allowing the BRD's 'user input'; if GPA confirms the % never changes month to month, Option 1 is enough.",
  "wireframe": "pa-19 (Deferment parameters tab) holds DG promoter 72%, XFE 90% and own retail 78% for Mobile, Homes and IPTV, with lives of 35, 36 and 55 months; pa-04 (Scenario 4 state) shows '72% · 35 months' read-only from that master for a Rs 36,00,000.00 input.",
  "ask": "GPA team; business finance",
  "refs": "BRD 9-Sep-2026 provision scenario 4; GPA input tracking sheet, Scenario-4 sheet; P&A HLD 4.1, 5.2 Table 12, 6.2 Table 23, dependency 9"
 },
 {
  "id": "PA-05",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "Scenario 4: 15 days expensed at once, the life convention, and the GL for DG promoter deferment (HLD open point 4)"
  ],
  "title": "Scenario 4: the 15-day expense, how the deferment life is counted, and GL 4563005",
  "context": "In scenario 4 the deferred part of the GPA team's input is held as prepaid (an asset released to expense monthly) over a life by category: 55 months for IPTV and Homes; for Mobile, own retail 35 or 36, DG promoter 35 ('GL 4563005 for specific vendors') and XFE 36 months. The BRD of 9-Sep-2026 says 'the amount pertaining to 15 days is expensed off', the next 12 months go to current prepaid and the rest to non-current, with an example: of 1,000 deferred, 16 to expense, 375 current, 609 non-current. That example implies a 32-month life (375 for 12 months is 31.25 a month, and 16 is about half a month), which matches none of the listed lives, and the BRD does not say whether the 15 days fall within the life or are added to it. It also does not say which vendors are 'specific' or whether 4563005 is the expense, deferment or prepaid account. HLD open point 4 asks for corrected prepaid examples and dependency 9 for signed-off deferment lives.",
  "question": "Is the '15 days' half of one month's release, expensed in the input month, and does it count within the 35- or 36-month life (so the last month is also a half month) or come on top of it? For DG promoter, which vendors use GL 4563005, and is it the expense, deferment or prepaid account?",
  "options": [
   {
    "option": "Half-month convention within the life: half a month's release in the first month, full months after, a half month at the end.",
    "effect": "The wireframe's assumption; every schedule ends exactly at its stated life. The BRD example would be corrected to the stated lives."
   },
   {
    "option": "15 days on top of the life: half a month expensed now, then 35 (or 36) full monthly releases.",
    "effect": "Easy to explain, but the total period becomes 35.5 months and the BRD figures still do not reconcile."
   },
   {
    "option": "15 days by actual days: deferred amount x 15 / days in the life.",
    "effect": "Exact by days, but needs a day-count rule (actual days or 30-day months) and releases vary slightly by month length."
   },
   {
    "option": "For GL 4563005: it replaces the activity's expense GL for DG promoter vendors held on a GPA-maintained vendor list.",
    "effect": "Turns 'specific vendors' into a master the platform can apply; if 4563005 is instead a prepaid account, it is set up as such and not as an expense GL."
   }
  ],
  "suggested": "Option 1, half-month convention within the life: matches the BRD's '15 days' and the shape of its example while keeping each schedule to its stated life; GPA should confirm it with a corrected example and, separately, name the vendors and the role of GL 4563005.",
  "wireframe": "pa-23 (schedule PPD-26-0201: 72% of Rs 36,00,000.00 over 35 months, Aug-26 to Jul-29) expenses Rs 37,029 (half of the Rs 74,057 monthly release) in Aug-26 and puts Rs 8,88,686 to current and Rs 16,66,285 to non-current prepaid; pa-19 uses 4563005 as the expense GL of activity ACT-0063 (DG / XFE deferment) and lists it in the prepaid GL quality plan.",
  "ask": "GPA team; business finance",
  "refs": "BRD 9-Sep-2026 provision scenario 4 (table and example); GPA input tracking sheet, Scenario-4 sheet; P&A HLD 5.2 Table 12, open point 4, dependency 9"
 },
 {
  "id": "PA-06",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "TOCO manual override: the two scenarios to be defined by the business (HLD open point 9)"
  ],
  "title": "TOCO manual override: the two scenarios the business is to define",
  "context": "TOCO (tower company) provisions for site rent, electricity and diesel are calculated per site in DARTS (the system, on Metabase, that calculates them) and reach the platform as a feed. Both BRDs (section 13, ageing and auto-reversal engine) list 'Manual Override' as an option next to forced closure and reversal hold, and a client note on the 25-Aug-2026 BRD adds 'for TOCO (2 scenarios: need to include in BRD)'. The 9-Sep-2026 BRD keeps the heading without detail, and the P&A HLD records only that 'two TOCO override scenarios are to be defined by the business' (5.6, open point 9). Nothing says what is overridden (the automatic reversal, a DARTS amount, or the matching), by whom, or with whose approval.",
  "question": "What are the two TOCO manual override scenarios: what triggers each, what does the user override, and who may do it and approve it? Does an override change the accounting, or only stop or delay an automatic step?",
  "options": [
   {
    "option": "The business documents both scenarios (trigger, action, role, approval, accounting) before detailed design.",
    "effect": "They can then be built in this phase; until then nothing specific can be designed."
   },
   {
    "option": "Treat them as overrides of the automatic PBR reversal (reversal of an open provision after the PBR window, 13 months today) for TOCO provisions.",
    "effect": "Fits where the BRD lists the option; can reuse the hold mechanism with TOCO-specific reasons and approvals."
   },
   {
    "option": "Treat them as manual corrections of DARTS lines (amount or site mapping) before the feed is sent to Oracle.",
    "effect": "General practice: GPA fixes a wrong site line without waiting for a new DARTS run; needs maker-checker and an audit trail, and the platform and DARTS can then disagree."
   },
   {
    "option": "Leave manual override out of this phase and use hold, force reversal and force closure meanwhile.",
    "effect": "Nothing new to build; any TOCO exception goes through the existing controls with CFR (financial review team) approval."
   }
  ],
  "suggested": "Option 1, the business documents them: the sources give no basis for either scenario; if they concern ageing, as the BRD's placement suggests, Option 2 can reuse the hold design.",
  "wireframe": "pa-06 shows the open point under the Sep-26 DARTS feed (18,420 site lines); no override function is drawn.",
  "ask": "GPA team; TOCO business owners",
  "refs": "BRD 25-Aug-2026 section 13 with review note; BRD 9-Sep-2026 section 13; P&A HLD 5.6 Table 21, open point 9"
 },
 {
  "id": "PA-07",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "TOCO debit-note provisions: rules, master and the inputs from invoicing (HLD open point 8)"
  ],
  "title": "TOCO debit-note provisions: which notes, when, with which data, and how they end",
  "context": "A ToCo debit note (DN) records a deduction from a tower company's bill for an energy or rental dispute; it is approved and booked through Non-PO Invoicing, and a DN reversal ('/REV') later cancels it (Invoicing HLD 6.4). The BRD of 9-Sep-2026 says that once a DN is validated the platform creates a corresponding provision, and once the DN reversal is validated it reverses that provision; notes in the 25-Aug-2026 BRD add 'only for TOCO: master required', URN plus DN number, 'month end activity' and 'pending, need to discuss with P2P team'. The P&A HLD repeats this (4.3, 5.3; a 'TOCO debit note master' owned by P2P and GPA in 6.2) and leaves the rules, master and inputs from invoicing open (open point 8). Not defined: whether ToCo Finance DNs ('/DNF') count, which month and locator go into the URN, which accounts are used, and what happens on a partial reversal or a DN never reversed; no source explains the accounting purpose of the provision.",
  "question": "Which debit-note types create a provision, on which event (each validation, or a month-end run), and with which month, locator, item code and accounts? What does the TOCO debit-note master hold, and how are a partial reversal and a DN that is never reversed treated?",
  "options": [
   {
    "option": "Event-driven: invoicing sends each validated ToCo DN and DN reversal; the platform creates or reverses the provision at once and the journal goes in the next batch to Oracle.",
    "effect": "The wireframe's assumption; provisions are always current. Needs an interface from invoicing carrying DN number, original invoice, vendor, locator, service month, nature and amount."
   },
   {
    "option": "Month-end run: invoicing hands over the month's validated DNs and reversals once and the platform processes them together.",
    "effect": "Matches the 'month end activity' note and needs only a file interface; provisions lag by up to a month."
   },
   {
    "option": "Scope: ToCo debit notes only, or ToCo debit notes and ToCo Finance debit notes.",
    "effect": "Decides which invoicing categories feed the master; manual and GST non-compliance debit notes stay out either way under the 'only for TOCO' note."
   },
   {
    "option": "A partial reversal reverses only its amount; a DN provision never reversed ages and is reversed under PBR (the 13-month window for open provisions) like any other.",
    "effect": "General practice: no special rule to build; GPA and P2P must confirm that DN provisions should age out."
   }
  ],
  "suggested": "Option 1, event-driven, limited to ToCo debit notes: the BRD ties creation to the validation of each DN, which the invoicing portal already records; P2P and GPA then supply the master mapping each dispute nature to an item code and accounts.",
  "wireframe": "pa-06 (debit-note tab) and pa-09 show DNP-26-0031, provision 151·322600·RENT-AOR·JUL-26·15104·GTL/AP/2026/JUL/4452/DN for Rs 18,600, created when NPO-2627-004466 was validated on 20-Aug-2026, and a June DN reversed when its '/REV' note was validated on 25-Sep-2026; pa-19 (TOCO DN master tab) holds note type, item code by nature, URN suffix and timing.",
  "ask": "P2P team; GPA team; Non-PO invoicing workstream",
  "refs": "BRD 9-Sep-2026 TOCO requirements (rent items 7-8, electricity and diesel items 6-7); BRD 25-Aug-2026 review notes on the same items; P&A HLD 4.3 Table 5, 5.3, 6.1 row 10, 6.2 Table 23, dependency 6, open point 8; Invoicing HLD 6.4"
 },
 {
  "id": "PA-08",
  "mod": "pa",
  "area": "Provision input and URN",
  "keys": [
   "Owned and Homes leases: lease payment data and hold handling from the PM lease module (HLD open point 10)"
  ],
  "title": "Owned and Homes leases: what lease data the platform reads and what a payment hold does",
  "context": "For Owned and Homes sites there is no tower-company invoice: the rent provision from DARTS (the system that calculates TOCO provisions per site) is settled by the rent Airtel pays the site owner through a lease in the Oracle PM (Property Manager) lease module, paid on scheduled dates as per the agreement. The BRD of 9-Sep-2026 states this and asks for an exception report of 'leases scheduled but on hold'; client notes on the 25-Aug-2026 BRD say the lease module process still has to be explained and to 'check the process for hold scenarios'. The P&A HLD plans a feed of scheduled lease payments and hold status (6.1 row 5, dependency 8), notes that lease payments match on a configurable URN with the vendor optional (5.4.2 client note), and leaves the data and hold handling open (open point 10). Not known: which lease fields can be read, which event counts as the actual (schedule approved, payment made, or accounted in GL), and what a held payment does to the provision.",
  "question": "Which lease-module data can the platform read for Owned and Homes sites (lease, locator, landlord, scheduled date, amount, service period, payment and hold status), and which event settles the provision? When a scheduled payment is on hold, should the provision only be reported, or also be kept from the automatic PBR reversal (the reversal of open provisions after 13 months)?",
  "options": [
   {
    "option": "Settle on the lease payment once it is accounted in Oracle GL, matched on parent BU, item code, month and locator, vendor optional.",
    "effect": "Consistent with HLD 5.4 (only documents accounted in Oracle settle provisions); a payment held in PM leaves the provision open."
   },
   {
    "option": "Settle on the scheduled lease payment as soon as it is scheduled, before it is paid.",
    "effect": "Earlier settlement and fewer open provisions, but a payment later put on hold would already have settled a provision for rent not yet paid."
   },
   {
    "option": "Held lease payments: report only, on the 'leases scheduled but on hold' exception report; the provision follows normal ageing.",
    "effect": "Does what the BRD asks; GPA places a hold by hand if a long-held lease risks the PBR reversal."
   },
   {
    "option": "Held lease payments: the platform puts the matching provision on hold automatically while the lease hold lasts.",
    "effect": "No manual follow-up, but it creates holds without the GPA (and possibly CFR) decision the hold process otherwise needs."
   }
  ],
  "suggested": "Option 1 with Option 3 for holds: keeps the rule that only accounted documents settle provisions and does what the BRD asks for held leases; the Oracle ERP and P2P teams need to confirm which lease fields are available.",
  "wireframe": "pa-06 (leases on hold tab) lists LSE-OWN-13102 (site KA-13102-0910, Rs 64,000.00 due 05-Oct-2026, landlord bank details under verification) and LSE-HOM-14077; pa-19 shows a lease matching URN without vendor, for example 141·RENT-OWN·AUG-26·14031, and pa-23 a quarterly Homes rent advance paid in the lease module (PPD-26-0377).",
  "ask": "Oracle ERP team; P2P team; GPA team",
  "refs": "BRD 9-Sep-2026 TOCO rent actualization item 2 and item 16; BRD 25-Aug-2026 review notes on the same; P&A HLD 5.3 Table 13, 5.4.2 (client note), 6.1 row 5, dependency 8, open point 10"
 },
 {
  "id": "PA-09",
  "mod": "pa",
  "area": "Approval, access and masters",
  "keys": [
   "Whether notification-only activities remain, given DOA approval for every provision (HLD open point 17)"
  ],
  "title": "Notification-only activities: do any remain, now that every provision needs DOA approval?",
  "context": "The BRD's workflow step is 'Approval or Notification Workflow' (9-Sep-2026, section 12), and the P&A HLD says each activity is configured either for approval or for notification only, where the provision proceeds without an approval step (4.2 Table 4 stage 4, 4.5; activity master in 6.2). HLD open point 17 asks which activities need approval, which only notification, and the approval SLA. A later design decision (October 2026 wireframe review, not in the BRD or HLD) sends every provision, including each bulk-upload row, to the approvers the DOA (delegation of authority, the approval matrix) returns, and generates the URN (the provision's unique reference number) only after the last approval. It is therefore unclear whether any activity may still skip approval.",
  "question": "Should any provision go ahead without approval (notification only), and if so for which activities or amounts?",
  "options": [
   {
    "option": "No notification-only route: every provision goes through DOA approval.",
    "effect": "One rule and the strongest control; fixed recurring amounts (for example a membership fee of Rs 1,04,583 a month) still wait for approvers every month."
   },
   {
    "option": "Notification only for named low-risk recurring activities, set per activity in the activity master.",
    "effect": "Matches HLD 4.5 and cuts approval load for fixed, agreement-based amounts; GPA must keep the list under maker-checker and approvers must actually read the notifications."
   },
   {
    "option": "Notification only below an amount threshold per activity, approval above it.",
    "effect": "General practice: approval effort follows value; needs thresholds agreed with Finance and a check against splitting a provision to stay under the limit."
   },
   {
    "option": "Notification only for provisions fed from sources controlled elsewhere: the DARTS feed (reviewed by GPA before sending) and provisions from debit notes approved in invoicing.",
    "effect": "Avoids approving the same amount twice; all provisions entered by users keep DOA approval."
   }
  ],
  "suggested": "Option 4: keeps the October decision for every provision a user enters while not re-approving amounts already controlled elsewhere, which is what the wireframe already does for DARTS and debit-note provisions; Option 2 can be added if GPA names specific activities.",
  "wireframe": "pa-07 has a 'Notification only' tab with two samples (industry membership fee 101·410790·MEMBFEE01·AUG-26 and data centre rent cross-charge 111·200014·DCRENT02·SEP-26) whose activities are set to 'Notification' on pa-19, while pa-04 and pa-05 send every user-entered provision to DOA approvers; DARTS and debit-note provisions on pa-06 have no DOA step.",
  "ask": "GPA team; CFR; Finance (DOA owner)",
  "refs": "BRD 9-Sep-2026 section 12 (step 3); P&A HLD 4.2 Table 4, 4.5, 6.2 Table 23, open point 17"
 },
 {
  "id": "PA-10",
  "mod": "pa",
  "area": "Approval, access and masters",
  "keys": [
   "If the DOA API is not provided, an approval matrix is set up and maintained in the portal"
  ],
  "title": "DOA approvers: an API from Airtel, or an approval matrix kept in the portal",
  "context": "Every provision needs maker-checker approval, and who approves depends on Airtel's DOA (delegation of authority: who may approve what, up to which amount). The P&A HLD says approvers come from the HRMS (HR system) hierarchy and the DOA matrix (4.5), takes the DOA matrix from its source with approval limits by purpose (6.1 row 13; master owned by Finance, 6.2), and lists 'HRMS hierarchy and DOA matrix in a usable form' as a dependency on HR, Finance and the IT team (dependency 5); the BRD only lists 'DOA - for different purpose' among the masters. The wireframe's design (October 2026 review) calls a DOA API that returns up to 10 approvers per provision, in order. Whether Airtel can provide such an API is not confirmed; if not, the portal needs its own approval matrix and an owner for it.",
  "question": "Can Airtel provide a DOA service the platform calls for each provision, sending activity or purpose, amount, BU and department and receiving the ordered approvers? If not, who maintains the approval matrix in the portal, and on which dimensions?",
  "options": [
   {
    "option": "DOA API: the platform calls Airtel's DOA service for each provision.",
    "effect": "One source of truth with no copy to keep in step; depends on the service being available, with an exception path when it returns no approvers (the wireframe's 'DOA exception' queue)."
   },
   {
    "option": "DOA matrix feed: Finance's matrix is loaded into the portal on a schedule and is read-only there.",
    "effect": "No real-time dependency; the portal applies the matrix rules itself, and changes reach it only with the next load."
   },
   {
    "option": "Portal matrix: Finance or GPA maintains the matrix in the portal under maker-checker.",
    "effect": "Ready at go-live without an integration, but it duplicates the DOA held elsewhere and can drift from it, so it needs periodic reconciliation."
   }
  ],
  "suggested": "Option 1, the DOA API, with Option 3 only as a fallback if the API is not ready at go-live: the HLD treats the DOA as an external source, and an API avoids a second copy of the approval rules.",
  "wireframe": "pa-04 shows two approvers returned by DOA (B0CHK155, then B0CHK090) and a 'No DOA approvers' state that puts the provision in a 'DOA exception' queue on pa-03 for GPA to retrigger; pa-19 (Synced from ERP tab) lists the DOA master as coming from Finance, and pa-21 assigns no approvers.",
  "ask": "Finance (DOA owner); IT team; HR (HRMS)",
  "refs": "BRD 9-Sep-2026 masters list; P&A HLD 4.5, 6.1 rows 12-13, 6.2 Table 23, dependency 5"
 },
 {
  "id": "PA-11",
  "mod": "pa",
  "area": "Approval, access and masters",
  "keys": [
   "Circle mapping from HRMS is under discussion; until then it is set up here"
  ],
  "title": "User circles and BUs: taken from HRMS, kept in the portal, or both",
  "context": "A business user may raise provisions only for the BUs they are responsible for. In the wireframe's design (October 2026 review), each user is given one or more circles (operating units), the BUs follow from the circles, and a user with one BU sees it read-only. The BRD lists SSO (single sign-on), role-based, entity, cost centre and department access (9-Sep-2026, module 1), and the P&A HLD takes role, entity, cost centre and department access from SSO and user details and the approver hierarchy from HRMS, the HR system (6.1 rows 12 and 15); neither mentions circles. The wireframe notes that mapping circles from HRMS is under discussion and, until settled, has an administrator assign them in the portal.",
  "question": "Can HRMS (or single sign-on) give each user's circles or BUs, and should the portal take them from there, keep them as a portal set-up, or combine both?",
  "options": [
   {
    "option": "From HRMS: the circle is derived from the employee's location or cost centre in the HRMS feed and is read-only in the portal.",
    "effect": "No manual set-up and access follows transfers automatically; works only if HRMS holds a circle, or a cost centre that maps to one, for every user, including those who cover several circles."
   },
   {
    "option": "From SSO groups: circles granted as groups in Airtel's identity system.",
    "effect": "General practice: access is managed and reviewed with Airtel's other applications; IT must create and maintain a group per circle."
   },
   {
    "option": "Portal set-up: an administrator assigns circles to each user under maker-checker (the current wireframe).",
    "effect": "Works from day one and handles users with several circles; access must be updated by hand when people move and reviewed periodically."
   },
   {
    "option": "Hybrid: home circle from HRMS, further circles granted in the portal with approval.",
    "effect": "Automatic for most users and explicit for central or multi-circle users; two sources to reconcile."
   }
  ],
  "suggested": "Option 4, hybrid: keeps access in step with HR moves for most users while allowing the multi-circle and all-circle access central teams (GPA, CFR, business finance) need; use Option 3 until HRMS data is confirmed.",
  "wireframe": "pa-21 assigns circles per user with 'Mapped from: Portal set-up', for example B0MKR412 with Delhi, Karnataka and Telangana (BUs 111, 131, 165); pa-04 then offers only those BUs, and pa-05 rejects a bulk row for a BU outside the user's access.",
  "ask": "HR (HRMS); IT team; GPA team",
  "refs": "BRD 9-Sep-2026 module 1 (user access management); P&A HLD 6.1 rows 12 and 15, dependency 5"
 },
 {
  "id": "PA-12",
  "mod": "pa",
  "area": "Approval, access and masters",
  "keys": [
   "Hold: CFR approval for every hold, or only where the PBR policy mapping requires it"
  ],
  "title": "Hold on a provision: CFR approval for every hold, or only where the PBR policy requires it",
  "context": "An open provision older than the PBR window (13 months today) is reversed automatically unless it is on hold; the GPA team (accounting control) places a hold for exception cases such as a dispute (P&A HLD 3.3, 4.6, 5.6). The HLD gives CFR (the financial review team) the approval of force reversal and force closure but not of holds, while a client note on HLD 5.6 adds 'Configurable mapping (Provision on hold after CFR approval)' next to 'as per the PBR policy'. A review note on the 25-Aug-2026 BRD ('Reversal Hold: exception scenarios, force reversal (if any dispute), CFR approval required') can be read either way. The PBR policy itself, and what its mapping contains, is not among the sources.",
  "question": "Does every hold need CFR approval before it takes effect, or only the holds the PBR policy mapping lists? If the mapping decides, what does it key on (reason, amount, vendor type)?",
  "options": [
   {
    "option": "CFR approves every hold.",
    "effect": "Simple and strict; every exception reaches CFR, adding work and a risk that a hold is still pending when the PBR run reverses the provision."
   },
   {
    "option": "CFR approves only the holds a configurable PBR policy mapping requires (for example by reason or amount); others take effect when GPA places them.",
    "effect": "Follows the HLD client note and keeps routine holds moving; the mapping must be defined and maintained."
   },
   {
    "option": "GPA places holds without CFR; CFR reviews a periodic report of holds.",
    "effect": "Least friction; weaker control over provisions kept on the books beyond the policy window."
   },
   {
    "option": "A hold takes effect at once and lapses unless CFR approves it before the next PBR run.",
    "effect": "General practice: nothing is reversed while approval is pending; needs a lapse rule and reminders."
   }
  ],
  "suggested": "Option 2, CFR only where the mapping requires it: matches the HLD client note and GPA's ownership of holds in HLD 3.3; Airtel needs to share the PBR policy so the mapping can be set up.",
  "wireframe": "Placing a hold on pa-03, pa-09 or pa-14 sends a request to CFR (for example CFR-26-0109 for 141·410387·AMCDG004·DEC-25, Rs 7,60,000.00, in the CFR tab of pa-07 and on pa-08), and pa-19 (PBR & escalation tab) has a 'Hold needs CFR approval: as per PBR policy mapping' setting.",
  "ask": "CFR; GPA team",
  "refs": "P&A HLD 3.3 Table 3, 4.6 Table 9, 5.6 Table 21 (with client note); BRD 25-Aug-2026 section 13 review note; BRD 9-Sep-2026 TOCO requirements ('Ref PBR Policy')"
 },
 {
  "id": "PA-13",
  "mod": "pa",
  "area": "Approval, access and masters",
  "keys": [
   "Access to Users, roles & access: Admin rights to be confirmed by the P2P team; controls to be checked with GRC"
  ],
  "title": "P&A user administration: who holds admin rights, and which controls GRC requires",
  "context": "On the users, roles and access page an administrator assigns roles and circles to users who sign in with single sign-on; approvers are not assigned there because the DOA (delegation of authority, the approval matrix) returns them. Neither the P&A BRD nor the P&A HLD says who holds administrator rights. The note comes from client review notes on the Invoicing HLD (5.1): the P2P team (which books invoices in Oracle AP and PM) will confirm which internal users get admin or super-admin rights, and how to give access and controls to users is to be checked with GRC (governance, risk and compliance); that HLD's section 9 also says 'Check with GRC'. The wireframe applies the same note to the P&A page.",
  "question": "Who should hold administrator and super-administrator rights on the P&A platform (assigning roles and circles)? Which access controls does GRC require, for example approval of access changes, segregation of duties and periodic access review?",
  "options": [
   {
    "option": "The P2P team administers access for both portals.",
    "effect": "One owner for access across Non-PO, as the invoicing note suggests; but P2P does not run provisioning, so it would grant P&A roles it does not use."
   },
   {
    "option": "The GPA team administers P&A access; the P2P team administers invoicing.",
    "effect": "Each module's process owner controls its own access, and GPA already owns the P&A masters (HLD 3.3, 6.2); two admin groups to coordinate."
   },
   {
    "option": "The IT team holds super-admin; a business admin per module assigns roles, and each change is approved by a second person.",
    "effect": "General practice: separates technical and business control and gives GRC maker-checker on every access change."
   },
   {
    "option": "Access is requested and approved in Airtel's identity system (SSO groups); the portal only reads roles.",
    "effect": "General practice: access reviews and leaver removal follow Airtel's standard process; every role or circle change needs an IT request."
   }
  ],
  "suggested": "Option 3, IT super-admin with a GPA business admin for P&A under maker-checker: the module's process owner decides who does what, and GRC gets a separation of duties and an approval trail to review; GRC should confirm.",
  "wireframe": "pa-21 is open only to the 'Portal administrator' role (B0ADM001) and shows the warning 'To confirm: which users get admin or super-admin rights (P2P team), and the access controls to be checked with GRC'.",
  "ask": "P2P team; GPA team; GRC; IT team",
  "refs": "Invoicing HLD 5.1 (client notes) and section 9 (client note); P&A HLD 3.3 Table 3, 6.1 row 15, section 8 (SSO and role-based access); BRD 9-Sep-2026 module 1"
 },
 {
  "id": "PA-14",
  "mod": "pa",
  "area": "Oracle journals",
  "keys": [
   "Journal status from Oracle: how often the platform reads the import result, the posted status and the document numbers"
  ],
  "title": "Journal status from Oracle: how often the platform reads it back",
  "context": "The platform does not post journals: it writes them to staging tables, a database package inserts them into the Oracle GL interface with a group ID per batch and submits Journal Import, and the GPA managers review and post the imported journals in Oracle EBS (P&A HLD 4.1, 6.3). The platform reads back the import result, posted status, ERP document number and error reasons (6.1 row 2), polling by group ID (6.3), and a daily reconciliation compares counts, values and document numbers. The provision's status depends on this read-back: 'Approved' once imported, 'Interface error' if rejected, 'Open' only once posted (4.6), and a review note on HLD 4.2 says a line is picked again in the next run only if the status synced back shows Oracle did not process it successfully. The HLD leaves interface frequencies to detailed design, and another client note asks about ERP latency: the GL interface time limit and how much data is processed in how much time.",
  "question": "How often should the platform read the import result, posted status and document numbers from Oracle, and should that change during month-end close? How many journal lines can the GL interface and Journal Import take per run?",
  "options": [
   {
    "option": "Scheduled poll by group ID at a short interval (for example every 15 to 30 minutes) until each batch reaches a final status.",
    "effect": "General practice: statuses are near-current and errors reach the GPA analyst quickly; adds regular queries on Oracle that the Oracle ERP team must accept."
   },
   {
    "option": "Read after each import run, then hourly for the posted status, more often during month-end close.",
    "effect": "General practice: light load on normal days; the posted status can lag by up to an hour outside close."
   },
   {
    "option": "Oracle pushes the status: a step in the database package or a concurrent program writes results back to the platform's staging tables.",
    "effect": "General practice: no polling and immediate status; needs custom work in Oracle EBS by the Oracle ERP team."
   },
   {
    "option": "Read once a day with the daily reconciliation.",
    "effect": "Lowest load; provisions stay 'Approved' for up to a day after posting and import errors surface a day late, which is risky at month-end."
   }
  ],
  "suggested": "Option 2, after each import and hourly, faster at month-end: fits the HLD's poll-by-group-ID design and the hourly AP processing cycle the Invoicing HLD uses (8.1), with low load on Oracle; the Oracle ERP team should confirm the interval and volumes.",
  "wireframe": "pa-10 shows batches with their read-back status (NPP-26-10-0004, 18,419 TOCO journals 'Imported - waiting to post'; NPP-26-09-0118 rejected by Journal Import; NPP-26-09-0117 posted as GL-26-0930118) and a daily reconciliation tab, with no read-back interval stated.",
  "ask": "Oracle ERP team; IT team; GPA team",
  "refs": "P&A HLD 4.1, 4.2 (client notes), 4.6 Table 9, section 6 introduction, 6.1 rows 1-2, 6.3; BRD 9-Sep-2026 section 14; Invoicing HLD 8.1"
 },
 {
  "id": "PA-15",
  "mod": "pa",
  "area": "Matching invoices to provisions",
  "keys": [
   "Invoice data pickup: at day-end or at month-end (HLD open point 11)"
  ],
  "title": "Invoice data pickup from Oracle: at day-end or at month-end",
  "context": "Provisions are settled (actualized) only with invoices that are booked, validated and accounted in Oracle AP or PM: the platform reads these invoices from Oracle and matches each one to its provision by URN (the reference a provision carries from input to Oracle journal to invoice) (P&A HLD 5.4, integration touch point 4). A client review note on the 25-Aug-2026 BRD asks whether the invoice's accounting status is checked in Oracle at day-end or at month-end, and HLD open point 11 leaves the timing open. The timing decides how soon a provision shows as settled, and so the open balances, the ageing escalations and the review queues during the month.",
  "question": "How often should the platform pick up booked and accounted invoices from Oracle: every day at day-end, or once at month-end? If daily, should a month-end run check them again before close?",
  "options": [
   {
    "option": "Day-end: each night, pick up the invoices accounted that day and match them.",
    "effect": "Provisions settle the day after booking, so open balances, escalations and review queues stay current; an invoice cancelled or adjusted later in the month has to be unmatched again."
   },
   {
    "option": "Month-end: one run after AP and PM are closed for the month.",
    "effect": "One batch on final accounted data, but during the month provisions that are already invoiced still look open, escalations can fire on them, and the review work piles up at close."
   },
   {
    "option": "Day-end pickup plus a month-end sweep before close.",
    "effect": "General practice: daily matching as in the first option, with a final run that picks up late accounting and re-checks invoices changed or cancelled during the month; one more scheduled job to build and monitor."
   }
  ],
  "suggested": "Option 3, daily with a month-end sweep: it keeps the platform current, in line with the daily PO fetch the HLD already asks for, and the sweep closes each month on final Oracle data.",
  "wireframe": "pa-12 assumes a daily pickup: invoices are matched the day after booking (PPS/26-27/0811 booked 18-Sep-2026, matched 19-Sep-2026), and the page states that only invoices booked, validated and accounted in Oracle are used.",
  "ask": "GPA team; Oracle ERP team; P2P team",
  "refs": "P&A HLD open point 11; P&A HLD 5.4 and 6.1 (touch point 4); P&A HLD 4.6 (client note on the daily PO fetch); BRD 25-Aug-2026 TOCO actualization item 1 (client note)"
 },
 {
  "id": "PA-16",
  "mod": "pa",
  "area": "Matching invoices to provisions",
  "keys": [
   "Nearest match: order of relaxation, ranking, and whether a confident candidate settles without review (HLD open point 5)"
  ],
  "title": "Nearest match: relaxation order, ranking, and settling a confident candidate without review",
  "context": "When an invoice's URN (the reference a provision carries from input to Oracle journal to invoice), or the key rebuilt from BU, vendor code, item code and service month, equals no open provision, the platform looks for the nearest candidates. P&A HLD 5.4.2 says it searches within the same vendor and category, relaxing the item code and then the period, ranks the candidates and never matches across categories; a user then force-matches, that is picks the right provision, and the choice is recorded in the audit trail. HLD open point 5 records that the order of relaxation, the ranking and whether a confident candidate can be accepted without review are not defined. A client note on the 25-Aug-2026 BRD says actualization is done on the nearest URN match with force match available to the user, which can be read as automatic settlement, while HLD Table 10 has the user force-match.",
  "question": "In what order should the match keys be relaxed, and how should candidates be ranked? Can a single, clearly right candidate settle automatically, and under what conditions?",
  "options": [
   {
    "option": "Keep the HLD order and ranking, and have the GPA team (accounting control, owner of provisioning in Oracle) confirm every candidate.",
    "effect": "Item code first, then period; same service month first, then oldest open first. Full control, but every invoice that is not an exact match waits for a person, so the workload depends on the exact-match rate."
   },
   {
    "option": "Same order and ranking; settle automatically when there is exactly one candidate, it differs only in the item code, it is for the same service month, and the invoice is not above its open balance.",
    "effect": "General practice: the commonest clean case (a wrong item code) leaves the queue, while anything with a period or amount difference is still reviewed; the conditions must be agreed and shown in the audit trail."
   },
   {
    "option": "Settle the top-ranked candidate automatically and let users correct it with force match.",
    "effect": "Least manual work, as the 25-Aug BRD note can be read; a wrong pick changes which provision stays open, so ageing, escalation and the PBR reversal (automatic reversal of provisions open beyond 13 months) act on the wrong record until someone notices."
   }
  ],
  "suggested": "Option 1, review every candidate, at go-live, moving to Option 2 once the matching-health figures show how often the top candidate is right: it starts safe and removes the clean cases later on evidence.",
  "wireframe": "pa-12 (Nearest tab) lists candidates of the same vendor or PAN in the invoice's BU, relaxing the item code and then the period, ranked by same service month and then oldest first, and each needs a GPA force match with a reason; for example LEX/26/0187, booked with item code LEGAL009, has one candidate, 101·410612·LEGAL007·JUL-26.",
  "ask": "GPA team",
  "refs": "P&A HLD open point 5; P&A HLD 5.4.2, 4.7 (Table 10) and section 8 (assumptions); BRD 25-Aug-2026, client note under the auto provision suggestion engine"
 },
 {
  "id": "PA-17",
  "mod": "pa",
  "area": "Matching invoices to provisions",
  "keys": [
   "Expected exact-match rate, and a target for it (HLD open point 5)"
  ],
  "title": "Expected exact-match rate, and a target for it",
  "context": "An exact match is an invoice whose URN (the reference a provision carries from input to Oracle journal to invoice), or the key rebuilt from BU, vendor code, item code and service month, equals an open provision, so it settles with no review; everything else goes to nearest-match review or the unmatched queue. P&A HLD 7.2 recommends an exact-match rate KPI, with force-match and force-closure rates, to show where matching or estimating needs attention at source, and HLD open point 5 notes that the expected rate is not known. The HLD also assumes that exact matching will not cover most invoices (section 8); the rate depends largely on how many invoices carry the URN, selected on the invoicing portal or held in the Oracle URN flexfield (HLD 5.4.1, dependency 2). Without an estimate, the review workload of the GPA team (accounting control, owner of provisioning in Oracle) cannot be sized and the dashboard has nothing to compare against.",
  "question": "What share of invoices does Airtel expect to match exactly at go-live, and what target should the matching dashboard track?",
  "options": [
   {
    "option": "Estimate the rate before go-live by running the matching rules over recent months of provisions and booked invoices.",
    "effect": "An evidence-based baseline that also sizes the review team; needs historical provision and invoice data, which has no URNs, so it measures the rebuilt-key rate only."
   },
   {
    "option": "The GPA team sets a target now from its experience of today's manual knock-off.",
    "effect": "Quick, and the dashboard can show it from day one; the figure may be far from reality until it is measured."
   },
   {
    "option": "No target at go-live: measure for the first three months, then set it.",
    "effect": "General practice: avoids an invented number; the dashboard shows only the trend at first, and staffing for the review queue is a guess."
   }
  ],
  "suggested": "Option 1, measure a baseline: it answers both halves of the open point with data and tells Airtel how many invoices the GPA team will review each month.",
  "wireframe": "pa-17 (Matching health tab) shows an illustrative exact-match rate of 91.7% (1,284 of 1,400 invoices in weeks 36 to 39) with no target; the figures are samples, not requirements.",
  "ask": "GPA team; P2P team",
  "refs": "P&A HLD open point 5; P&A HLD 7.2 (Table 25), 5.4.1, section 8 (assumptions) and section 9 (dependency 2)"
 },
 {
  "id": "PA-18",
  "mod": "pa",
  "area": "Matching invoices to provisions",
  "keys": [
   "Nearest match by PAN: scope, and how a vendor not on the provision is added (HLD open point 12)"
  ],
  "title": "Nearest match by PAN, and adding a vendor that is not on the provision",
  "context": "One business, identified by its PAN (the Indian income-tax number), can have several vendor codes in Oracle, so an invoice may arrive under a vendor code that differs from the one on its provision, and its URN (BU, vendor code, item code and month) then does not match. A client note on P&A HLD Table 10 asks for nearest match on the basis of PAN, mapping vendor, vendor code and PAN. Separately, HLD Table 17 says that when the vendor was not available when the provision was raised, vendor details are added from invoice validation before matching (rule to be confirmed), and HLD open point 12 lists this case as having no handling rule. The sources do not say how wide a PAN search goes (same BU, category, month), whether a PAN match can settle without review, or what the URN of a provision raised without a vendor looks like.",
  "question": "When an invoice's vendor code is on no open provision, should the platform look at provisions of other vendor codes with the same PAN, within what limits, and with or without review? How is a vendor that did not exist when the provision was raised added to it?",
  "options": [
   {
    "option": "PAN as a nearest-match candidate only: same PAN, same BU and category, confirmed by the GPA team (accounting control, owner of provisioning in Oracle) with force match.",
    "effect": "Safe and needs no new master; each such invoice costs a review, and the invoice's vendor code is recorded against the provision in the audit trail while the URN stays as raised."
   },
   {
    "option": "A vendor-code-to-PAN mapping, kept by the GPA or MDM team, under which mapped codes count as the same vendor for exact matching.",
    "effect": "Mapped invoices settle automatically; the mapping must be kept current, and a PAN that covers unrelated lines of business could settle the wrong provision."
   },
   {
    "option": "For a provision raised before the vendor existed, allow a placeholder vendor and fill the vendor code from the first invoice validated in Oracle, with GPA confirmation, before matching.",
    "effect": "Follows HLD Table 17; needs a URN form with a placeholder vendor and a rule for when the URN is rewritten, which also affects the Oracle journal line that carries the URN."
   }
  ],
  "suggested": "Option 1, PAN as a reviewed candidate, for vendor codes that differ, with Option 3 for vendors created after the provision: both follow the HLD and keep a person in the loop until Airtel sees how often these cases occur.",
  "wireframe": "pa-12 (Nearest tab) shows SHK/2026/551 from Shakti Security Services (vendor code 410029, Rs 4,10,000.00, Aug-26, BU 121), which has no provision; its candidate is SecureOne's 121·410022·SECURITY001·AUG-26 (same PAN AAJCS7712K), settled only by a GPA force match. No page shows a provision raised without a vendor.",
  "ask": "GPA team; MDM team; P2P team",
  "refs": "P&A HLD open point 12; P&A HLD 4.7 (Table 10, client note) and 5.4.3 (Table 17); BRD 9-Sep-2026 actualization scenarios (master data exceptions)"
 },
 {
  "id": "PA-19",
  "mod": "pa",
  "area": "Matching invoices to provisions",
  "keys": [
   "Invoice without a service period: settled automatically by FIFO (HLD 5.4.2) or after review"
  ],
  "title": "Invoice without a service period: settled automatically by FIFO, or after review",
  "context": "Matching uses the invoice's service period (the months in which the service was delivered) to find the provision for the right month. For an invoice with no service period, the sources say it settles the oldest open provision first (FIFO): P&A HLD 5.4.2, the client-highlighted row in HLD Table 10, and actualization scenario 4 of the 9-Sep-2026 BRD, which also says the from and to period is mandatory when the invoice is booked. HLD open point 5, however, leaves open whether any candidate may be accepted without review, and FIFO picks the wrong provision when the invoice is really for a later month.",
  "question": "Should an invoice without a service period settle the oldest open provision automatically, or should the FIFO candidate wait for confirmation by the GPA team (accounting control, owner of provisioning in Oracle)?",
  "options": [
   {
    "option": "Automatic FIFO, as the sources state.",
    "effect": "No manual step; when the invoice belongs to a later month, the older provision is closed wrongly and the right one ages towards PBR reversal (automatic reversal after 13 months) until someone force-matches it."
   },
   {
    "option": "FIFO proposes the candidate and the GPA team confirms it.",
    "effect": "Every such invoice is checked, and the reviewer can read the month from the invoice copy or covering letter; adds work to the nearest-match queue."
   },
   {
    "option": "Automatic FIFO only when the invoice amount equals the oldest open balance; otherwise review.",
    "effect": "General practice: clear cases settle by themselves and doubtful ones are checked; needs an amount condition, and perhaps a tolerance, agreed with the GPA team."
   },
   {
    "option": "Make the service period mandatory at booking in AP and PM, so the case rarely arises, and review the rest.",
    "effect": "Follows the BRD statement that the period is mandatory; needs the P2P and Oracle ERP teams to enforce the fields, and invoices booked outside the portal may still lack them."
   }
  ],
  "suggested": "Option 3, FIFO when the amount fits: it keeps the sources' FIFO rule for the clear cases and sends the rest to review; Option 4 reduces the volume in any case.",
  "wireframe": "pa-12 sends VCS/26/1176 (Vertex Call Solutions, BU 131, Rs 20,75,000.00, no service period) to the Nearest tab with the FIFO candidate 131·410455·CCSVC002·JUN-26, settled only by a GPA force match; the review step is the wireframe's assumption.",
  "ask": "GPA team; P2P team",
  "refs": "P&A HLD 5.4.2, 4.7 (Table 10, client note), 5.4.3 (Table 17); P&A HLD open point 5; BRD 9-Sep-2026 actualization scenario 4"
 },
 {
  "id": "PA-20",
  "mod": "pa",
  "area": "Matching invoices to provisions",
  "keys": [
   "PO raised after provision: matching keys, automatic or confirmed settlement, PO amount different from the open balance, and partially actualized provisions"
  ],
  "title": "PO raised after a provision: matching keys, confirmation, and amount differences",
  "context": "A business user sometimes raises a non-PO provision because the agreement is not final, and later a purchase order (PO) is raised in Oracle for the same cost, which would then be provided twice. The 9-Sep-2026 BRD (actualization scenario 5) asks for a list of Oracle POs on the provision so the user can enter the PO number, and says the provision is reversed as soon as the PO is created; a client note on P&A HLD 4.6 adds a daily fetch of new POs and reversal of the provision when one is found. HLD Tables 9, 10 and 17 say the provision is settled on the platform (status Cancelled) when the PO is raised or when its PO-based invoice is booked in AP. None of the sources say which fields link a PO to a provision, whether a person confirms the link, or what is settled when the PO amount differs from the open balance or invoices have already settled part of the provision.",
  "question": "Which fields should link an Oracle PO to an open provision, and should the provision be settled automatically when a PO is found or only after the GPA team (accounting control, owner of provisioning in Oracle) confirms? When the PO amount differs from the open balance, or the provision is already partly settled by invoices, what is settled?",
  "options": [
   {
    "option": "Automatic: the daily fetch links POs by vendor, item code and BU and cancels the provision at once.",
    "effect": "Follows the HLD 4.6 client note and needs no manual step; a vendor with several open months for the same item cannot be told apart by these fields, so the wrong month may be cancelled."
   },
   {
    "option": "The daily fetch proposes the link; the GPA team confirms it and the whole open balance is settled, whatever the PO amount.",
    "effect": "One check per PO and the provision closes cleanly as the cost moves to the PO process; if the PO covers less than the open balance, part of the cost is no longer provided anywhere."
   },
   {
    "option": "As the second option, but settle only up to the PO amount and leave any remainder open for invoices.",
    "effect": "The open balance stays consistent with what the PO covers; a remainder that is never invoiced ages until PBR reversal (automatic reversal after 13 months) or force closure."
   },
   {
    "option": "Manual link only: the user picks the PO from the list of values on the provision (BRD scenario 5), with no daily fetch.",
    "effect": "Simplest to build; depends on users remembering to link the PO, so double provisioning is caught late or not at all."
   }
  ],
  "suggested": "Option 2, confirmed link that settles the open balance: one GPA check guards against a wrong match on vendor, item and BU, and settling the whole balance matches the BRD's intent that the cost moves to the PO process; the reviewer sees any amount difference.",
  "wireframe": "pa-12 (PO raised after provision tab) shows a daily PO fetch at 06:00 matching on vendor, item code and BU, then a GPA confirmation that settles the open balance and sets the provision to Cancelled; for example PO 4500921107 for Rs 1,40,000.00 against 121·410387·AMCDG004·AUG-26, which is partly settled with an open balance of Rs 1,26,000.00. pa-09 shows the PO link on the provision.",
  "ask": "GPA team; P2P team; Oracle ERP team",
  "refs": "P&A HLD 4.6 (client note), 4.6 (Table 9), 4.7 (Table 10), 5.4.3 (Table 17), 6.1 (touch point 11); BRD 9-Sep-2026 actualization scenario 5"
 },
 {
  "id": "PA-21",
  "mod": "pa",
  "area": "Actualization entries",
  "keys": [
   "Knock-off at the invoice taxable value or at the total including GST"
  ],
  "title": "Knock-off at the invoice taxable value or at the total including GST",
  "context": "Knock-off is the settlement of a provision by its invoice: the amount applied reduces the provision's open balance and, for standing-mode provisions (liability kept until settled), it is also the Liability Dr / Expense Cr journal (P&A HLD 5.4.4). An invoice has a taxable value plus GST (18% on the wireframe samples). The 9-Sep-2026 BRD lists invoice amount and GST as separate fields, but neither the BRD nor the HLD says whether provisions are raised net of GST or which amount the knock-off uses, and the worked examples show no GST. If the two sides use different bases, every invoice shows an 18% excess or leaves 18% of its provision open.",
  "question": "Should a provision be settled at the invoice's taxable value (excluding GST) or at the invoice total including GST, and on which basis should makers raise provisions?",
  "options": [
   {
    "option": "Taxable value, with provisions raised net of GST.",
    "effect": "General practice where Airtel claims the GST as input credit, so only the taxable value is expense; simple and consistent, but GST that cannot be claimed is never provided for and shows as an excess."
   },
   {
    "option": "Total including GST, with provisions raised gross.",
    "effect": "The provision equals what will be paid to the vendor, but the GST part is not expense when credit is claimed, so expense is overstated until settled; reverse-charge invoices (RCM: Airtel pays the GST itself, so the vendor's invoice shows none) would be on a different basis."
   },
   {
    "option": "The amount Oracle charges to expense: the taxable value plus any GST that cannot be claimed as input credit.",
    "effect": "General practice: provision, knock-off and excess are all on the cost basis; the invoice data from Oracle must carry the expense and tax distribution lines, and makers must know when GST is not creditable."
   }
  ],
  "suggested": "Option 3, the amount charged to expense: a provision estimates expense, so settling it with the expense Oracle actually books keeps balances and excesses meaningful; where non-creditable GST is rare this is the same as Option 1.",
  "wireframe": "pa-12 and pa-09 show and apply invoice amounts excluding GST (for example IND/26/AUG/77120 at Rs 5,58,610.17, whose total with 18% GST is Rs 6,59,160.00), and provisions are entered without GST; this is the wireframe's assumption.",
  "ask": "GPA team; Tax team",
  "refs": "BRD 9-Sep-2026 section 12 (invoice entry fields); P&A HLD 4.4 (Table 6, input template), 5.4.4 (Table 18), 5.5 (Table 20)"
 },
 {
  "id": "PA-22",
  "mod": "pa",
  "area": "Actualization entries",
  "keys": [
   "BU reclass of a reversal-mode provision: which journal moves the cost from the invoice BU to the provision BU"
  ],
  "title": "BU reclass of a reversal-mode provision: which journal moves the cost to the provision BU",
  "context": "The BU (business unit) is the first segment of the accounting code. When an invoice is booked in a different BU from its provision, for example because the provision's operating unit does not exist in Oracle Payables, the 9-Sep-2026 BRD (actualization scenario 3) and P&A HLD 5.4.3 say it is reclassed automatically to the provision BU using a mapping table, and HLD Appendix B shows the entry as Liability Dr in the provision BU / Expense Cr in the invoice BU. That entry works in standing mode, where the liability stays on the books until settled. In reversal mode, Oracle reverses the provision journal at the start of the next period and actualization posts no knock-off journal (HLD 5.4.4), so there is no liability to debit and the cost stays in the invoice BU; a client note on HLD 5.4.4 asks the GPA team how to actualize in auto-reversal mode.",
  "question": "For a reversal-mode provision settled by an invoice booked in another BU, should the platform post a journal that moves the cost to the provision BU, and which accounts should it use?",
  "options": [
   {
    "option": "Post an expense reclass for the amount applied: Expense Dr in the provision BU / Expense Cr in the invoice BU.",
    "effect": "The cost lands in the provision BU as BRD scenario 3 intends, and the activity keeps reversal mode; one extra journal per mismatched invoice, sent to Oracle like the others."
   },
   {
    "option": "Post nothing: close the URN (the reference a provision carries from input to invoice) and leave the cost in the invoice BU.",
    "effect": "No extra journal, but BU-level profit and loss is wrong for these costs (the provision BU loses the cost when Oracle reverses the provision and the invoice BU keeps it), which defeats the mapping table."
   },
   {
    "option": "Put activities that are billed in another BU in standing mode, so the HLD entry (Liability Dr provision BU / Expense Cr invoice BU) applies.",
    "effect": "Reuses the documented entry; those provisions then need knock-off journals, and their PBR reversal (automatic reversal after 13 months) must post a journal too."
   }
  ],
  "suggested": "Option 1, expense reclass: it keeps the reversal mode chosen for the activity and still delivers the BU result that BRD scenario 3 and the mapping table exist for.",
  "wireframe": "pa-12 (Auto-matched tab) and pa-09 show PPS/26-27/0890 (Prism Power Systems, Rs 3,24,000.00, booked in BU 127) settling the reversal-mode provision 121·410387·AMCDG004·AUG-26 in BU 121 through the BU reclass mapping, with no journal shown for the reclass.",
  "ask": "GPA team",
  "refs": "BRD 9-Sep-2026 actualization scenario 3; P&A HLD 5.4.3 (Table 17), 5.4.4 (Table 18 and client note), Appendix B entry 3; P&A HLD open point 2"
 },
 {
  "id": "PA-23",
  "mod": "pa",
  "area": "Actualization entries",
  "keys": [
   "Multi-month invoice: split by days or by months (HLD open point 6)"
  ],
  "title": "Multi-month invoice: split the amount by days or by months",
  "context": "When an invoice covers several months, its amount has to be divided by month: each month's share settles that month's provision, and the shares for future months go to prepaid (an asset released to expense month by month). A client note on the 25-Aug-2026 BRD (TOCO, that is tower company, actualization) says to divide the invoice amount by the number of days in the service period, perhaps differently by segment, and P&A HLD 5.3 and open point 6 repeat this; the 9-Sep-2026 BRD says only that the split is to be discussed. The BRD's prepaid worked examples and HLD Tables 19 and 20 divide by months instead (Rs 24,000 over 12 months is Rs 2,000 a month; Rs 36,000 for March to May is Rs 12,000 a month). Provisions are usually a fixed monthly amount, so a split by days leaves small differences in every month.",
  "question": "Should the platform split a multi-month invoice equally by months or in proportion to days, and should the rule differ by segment (for example TOCO rent and electricity versus other services)?",
  "options": [
   {
    "option": "Equal months.",
    "effect": "Matches the BRD and HLD worked examples and monthly provisions, so whole-month invoices settle exactly; an invoice that starts or ends mid-month (such as 10-Aug to 12-Aug) has no sensible monthly share."
   },
   {
    "option": "Days.",
    "effect": "Matches the client note and HLD 5.3 and handles part months exactly; months of 30 and 31 days get different shares, so equal monthly provisions are left with small open balances or excesses."
   },
   {
    "option": "Equal months for whole months, days for part months.",
    "effect": "General practice: whole-month invoices give the BRD's figures and part months are pro-rated; slightly more logic to build and explain."
   },
   {
    "option": "A rule per segment, kept in a master (for example days for TOCO, months for others).",
    "effect": "Follows the HLD's remark that the approach may differ by segment; each segment's owner must choose its rule and the GPA team must maintain the master."
   }
  ],
  "suggested": "Option 3, months with days for part months: it reproduces the worked examples, keeps monthly provisions settling exactly, and still handles the part-month invoices the days rule was meant for.",
  "wireframe": "pa-12, pa-09 and pa-23 split by equal months: TIA/26/MEM/19 (Rs 12,55,000.00 for Apr-26 to Mar-27) gives Rs 1,04,583.00 a month, so Apr-26 to Aug-26 settle Rs 5,22,915.00 and Rs 7,32,085.00 goes to prepaid schedule PPD-26-0418; by days the split would be Rs 5,26,068.49 (153 of 365 days) and Rs 7,28,931.51.",
  "ask": "GPA team; business finance (TOCO segments)",
  "refs": "P&A HLD open point 6; P&A HLD 5.3, 5.5 (Tables 19 and 20); BRD 25-Aug-2026 TOCO actualization item 3 (client note); BRD 9-Sep-2026 TOCO actualization item 3 and prepaid scenarios 1 to 3"
 },
 {
  "id": "PA-24",
  "mod": "pa",
  "area": "Actualization entries",
  "keys": [
   "Excess invoice: rule for splitting an excess between prepaid and expense (HLD open point 19)"
  ],
  "title": "Excess invoice: rule for splitting an excess between prepaid and expense",
  "context": "An excess arises when an invoice is larger than the open balance of the provisions it settles. P&A HLD Tables 10 and 15 and the 9-Sep-2026 BRD say an excess goes to finance review, with any future-period part treated as prepaid (an asset released to expense month by month), and HLD open point 19 asks for the rule that splits it. An excess can mean that the month cost more than estimated (under-provision, which belongs in expense now) or that the invoice also covers future months (which belongs in prepaid). The excess is already in expense whatever the provision's mode (in reversal mode Oracle has reversed the provision; in standing mode only the provision amount is knocked off), so what is undecided is how the prepaid part is identified and whether the finance review comes before or after the accounting.",
  "question": "When an invoice exceeds its provisions, should the excess be split by the invoice's service period (future months to prepaid, the rest left in expense), or decided by business finance invoice by invoice? Does that review hold the settlement or follow it?",
  "options": [
   {
    "option": "Split automatically by service period: future months to prepaid, the rest stays in expense as under-provision; business finance gets a report.",
    "effect": "No waiting and a clear rule; an excess caused by a billing error is reported, not stopped."
   },
   {
    "option": "Business finance decides each excess before anything is posted.",
    "effect": "Every excess is checked, but the provision stays unsettled and the accounting incomplete until the review ends."
   },
   {
    "option": "Split automatically by service period, and send an excess above a threshold (amount or percentage of the provision) to business finance.",
    "effect": "General practice: small differences flow through and large ones are checked; Airtel must set and maintain the thresholds."
   }
  ],
  "suggested": "Option 3, automatic split with a review threshold: the service period already shows what is prepaid, so only large unexplained excesses need a person.",
  "wireframe": "pa-12 (Excess or future period tab) and pa-09 show VCS/26/1188 (Vertex Call Solutions, Aug-26, Rs 23,90,000.00) settling the Rs 21,40,000.00 provision 131·410455·CCSVC002·AUG-26 in full, with the Rs 2,50,000.00 excess with business finance since 17-Sep-2026 and no split shown.",
  "ask": "GPA team; Business finance",
  "refs": "P&A HLD open point 19; P&A HLD 4.7 (Table 10), 5.4.2 (Table 15), 5.4.4 (Table 18); BRD 9-Sep-2026 actualization matching outcomes"
 },
 {
  "id": "PA-25",
  "mod": "pa",
  "area": "Prepaid",
  "keys": [
   "Invoice for future months with no provision: held in prepaid, or sent to the unmatched queue"
  ],
  "title": "Invoice for future months with no provision: held in prepaid, or sent to the unmatched queue",
  "context": "Prepaid accounting holds the part of an invoice that covers future months as an asset and releases it to expense month by month (P&A HLD 5.5). HLD 5.4.3 says an invoice for a future period only is held in prepaid, and HLD 5.5 says the platform checks the service period of every invoice and accounts any future period as prepaid; the HLD's own example is a Rs 24,000 subscription booked in September for 24 months with no provision. Matching, however, sends an invoice with no suitable provision to the unmatched queue for review (HLD 5.4.2). The sources do not say which comes first when an invoice covers future months and no provision exists, for example an annual fee or an advance rent that nobody provided for.",
  "question": "When an invoice covers future months and no open provision matches it, should the platform move the future months to prepaid straight away, or hold the invoice in the unmatched queue until the GPA team (accounting control, owner of provisioning in Oracle) reviews it?",
  "options": [
   {
    "option": "Prepaid straight away when the expense GL is in the prepaid GL quality plan, and flag the invoice as having no provision.",
    "effect": "Follows HLD 5.5 and its BU 904 example; the cost is spread correctly from the first month, and the flag lets the GPA team check whether a provision was missed or sits under another key."
   },
   {
    "option": "Unmatched queue first; the GPA team reviews it and then starts the prepaid schedule.",
    "effect": "A person checks that no provision should have matched before anything is deferred; until then the whole invoice sits in the booking month's expense, and a slow review distorts that month."
   },
   {
    "option": "Prepaid straight away for invoices that cover only future months; unmatched queue for invoices that also cover past or current months.",
    "effect": "General practice: a future-only invoice cannot have a provision yet, so deferring it is safe; an invoice that includes past months may have a provision under another key and is checked first."
   }
  ],
  "suggested": "Option 1, prepaid with a flag: it is what HLD 5.5 and its worked example describe, and the flag keeps the missed-provision check without delaying the accounting.",
  "wireframe": "pa-12 (Excess or future period tab) and pa-13 put both no-provision examples straight into prepaid: XTL/26-27/2400 (Rs 24,000.00, BU 904, Sep-26 to Aug-28, schedule PPD-26-0402) and the Homes lease payment LP-26-09-14052 (Rs 55,500.00 for Oct-26 to Dec-26, schedule PPD-26-0377); pa-23 shows each schedule.",
  "ask": "GPA team",
  "refs": "P&A HLD 5.4.2, 5.4.3 (Table 17), 5.5 (Table 19); BRD 9-Sep-2026 prepaid scenarios 1 to 3"
 },
 {
  "id": "PA-26",
  "mod": "pa",
  "area": "Prepaid",
  "keys": [
   "Prepaid entries: posted by the platform, by the Oracle prepaid module, or both (HLD open point 3)"
  ],
  "title": "Prepaid entries: posted by the platform, by the Oracle prepaid module, or both",
  "context": "Prepaid entries move the future-month part of an invoice or a deferment into a prepaid asset, release it to expense each month, and move the non-current part (due after 12 months) to current as it falls due (P&A HLD 5.5). The 9-Sep-2026 BRD says both that the ERP generates the accounting from the invoice period and that the portal itself processes the prepaid accounting, and its worked examples have the portal post the monthly release until the life is consumed; yet its actualization example labels the monthly release as the existing deferment process, and provision scenario 4 ends by uploading the deferred amount to the Oracle prepaid module. HLD open point 3 asks who posts, and a client note on HLD integration touch point 8 (platform to the Oracle prepaid module) says the deferment approach is still pending. Either way Oracle stays the book of record: platform journals go through the GL interface and are posted in Oracle by the GPA team (accounting control, owner of provisioning in Oracle).",
  "question": "Which system should create and release prepaid entries: the platform (sending journals to Oracle), the Oracle prepaid module, or the platform for some steps and Oracle for the others?",
  "options": [
   {
    "option": "The platform does it all: creation, monthly release and the current and non-current moves, sent to Oracle as journals.",
    "effect": "As the BRD's portal steps describe; one register for platform prepaid, but the platform must run the monthly release reliably, and prepaid created outside the platform stays in Airtel's existing prepaid register, so there are two registers."
   },
   {
    "option": "The platform creates the prepaid and works out its life, then uploads the schedule to the Oracle prepaid module, which releases it monthly.",
    "effect": "Reuses the existing deferment process, as the BRD's existing-process label and scenario 4 suggest; the platform must read the release status back to show balances."
   },
   {
    "option": "The Oracle prepaid module does it all; the platform only sends the deferral details.",
    "effect": "Least accounting on the platform; it depends on Oracle for every prepaid figure it shows, and the invoice-period check the BRD gives the portal has to feed Oracle."
   }
  ],
  "suggested": "Option 2, platform creates and Oracle releases: it keeps one release engine for all of Airtel's prepaid and matches the two places where the BRD and HLD hand the release to the existing process.",
  "wireframe": "pa-13 (prepaid register) and pa-23 (schedule) assume the platform creates every entry, including the monthly releases (shown as posted up to Sep-26 and scheduled after).",
  "ask": "GPA team; Oracle ERP team",
  "refs": "P&A HLD open point 3; P&A HLD 5.5 (Tables 19 and 20), 5.2 (scenario 4), 6.1 (touch point 8, client note); BRD 9-Sep-2026 actualization scenarios 1 and 2, prepaid scenarios 1 to 3 and provision scenario 4"
 },
 {
  "id": "PA-27",
  "mod": "pa",
  "area": "Prepaid",
  "keys": [
   "Advance lease payments: how the monthly prepaid release settles the DARTS provision for the same site"
  ],
  "title": "Advance lease payments: how the monthly prepaid release settles the site's DARTS provision",
  "context": "For Owned and Homes sites, Airtel pays the site owner through a lease in the Oracle PM lease module; each month's rent provision for a site comes from DARTS (the system that calculates tower-site rent, electricity and diesel provisions per site), and the lease payment settles that provision by site (P&A HLD 5.3). Rent paid in advance, quarterly or yearly, is deferred through the platform and released monthly (BRD 9-Sep-2026 TOCO item 13; HLD 5.3 and 5.5). The sources do not say what happens when DARTS also raises the monthly provision for a month already paid in advance: the provision and the prepaid release would both charge that month's rent, and the provision would find no payment to settle it and age until PBR reversal (the automatic reversal after 13 months).",
  "question": "For a site whose rent is paid in advance, should DARTS or the platform skip the monthly provision, or should each monthly prepaid release settle that month's DARTS provision, and how are the two linked?",
  "options": [
   {
    "option": "Treat each monthly release as the actual: match it by the lease key (BU, item code, month, locator) to the DARTS provision and close that provision.",
    "effect": "DARTS needs no change and every provision closes; for reversal-mode provisions the month still carries both the provision and the release until Oracle reverses the provision at the start of the next month, so month-end expense is overstated."
   },
   {
    "option": "DARTS leaves out sites and months already paid in advance, using the PM lease payment schedule.",
    "effect": "No duplicate provision at all; needs a DARTS enhancement and lease payment data in DARTS."
   },
   {
    "option": "The platform checks the DARTS feed against the prepaid register and marks lines for months already prepaid as covered instead of posting them.",
    "effect": "No DARTS change and no double charge; each prepaid schedule must carry the site's locator, and the GPA team sees the covered lines on the DARTS page."
   }
  ],
  "suggested": "Option 3, platform skips covered lines: the platform already holds both the prepaid schedule and the DARTS feed, so it can prevent the double charge without changing DARTS.",
  "wireframe": "pa-23 shows schedule PPD-26-0377: Homes lease LSE-HOM-14052 (BU 141) paid Rs 55,500.00 on 28-Sep-2026 for Oct-26 to Dec-26 and released at Rs 18,500.00 a month; no DARTS provision is shown for that site, and pa-06 (DARTS feed) does not mark covered sites.",
  "ask": "GPA team; P2P team (PM lease module); DARTS owner",
  "refs": "P&A HLD 5.3 (Table 13), 5.5; P&A HLD open point 10; BRD 9-Sep-2026 TOCO items 2 and 13"
 },
 {
  "id": "PA-28",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "Ageing is counted from the last day of the service month (HLD open point 18)"
  ],
  "title": "Ageing reference date for escalation, ageing buckets and PBR (HLD open point 18)",
  "context": "Each open provision is aged for three purposes: escalation at 90, 180, 270 and 365 days to the business user, manager, CFR (financial review team) and Controller / ACE (central processing team) (HLD 4.5 Table 8); the ERP ageing buckets of 0 to 30, 31 to 60, 61 to 90 and over 90 days; and the PBR reversal, which reverses an open provision automatically once it is beyond the 13-month PBR window (HLD 5.6). The BRD ties PBR to the service period (at the close of 31-Aug-2026 the Jul-25 liability falls under PBR; BRD 9-Sep-2026 TOCO rent rule 10), but neither the BRD nor the HLD gives the start date for escalation and the buckets, and the HLD says age is 'calculated monthly' while the thresholds are in days. HLD open point 18 asks for the reference date and how these views align. Because a provision can only be posted while its service month's GL period is open (HLD 4.4), the candidate dates are usually days apart rather than months, but the platform needs one rule.",
  "question": "From which date should a provision's age be counted for escalation and the ageing buckets: the last day of the service month, the Oracle GL date of the provision journal, or the date the provision was approved? Should age be recalculated daily or once at each month close?",
  "options": [
   {
    "option": "Count days from the last day of the service month, recalculated daily.",
    "effect": "One clock for escalation, buckets and PBR, all tied to the service period as the BRD already does for PBR and hits; a Jun-26 provision is 93 days old on 01-Oct-2026 whatever day it was approved."
   },
   {
    "option": "Count days from the Oracle GL date of the provision journal.",
    "effect": "For month-end provisions this is normally the same date as option 1, but the platform must read the GL date back from Oracle, and a provision stuck in an interface error has no age until it posts."
   },
   {
    "option": "Count days from the date the provision was approved and its URN generated.",
    "effect": "Measures how long the business has carried the provision, but escalation then runs on a different clock from PBR, so the two views can disagree by a few days near each threshold."
   },
   {
    "option": "Count whole months from the service month at each month close, reading 90 / 180 / 270 / 365 days as 3 / 6 / 9 / 12 months.",
    "effect": "Matches the HLD's 'calculated monthly' and the 13-month PBR window, and escalations go out once a month with the close; an escalation can wait up to a month, and the day-based buckets need month equivalents."
   }
  ],
  "suggested": "Option 1, last day of the service month: the BRD already ties PBR and hits to the service period, so one reference keeps escalation, buckets and PBR consistent, and for month-end provisions it equals the Oracle GL date anyway.",
  "wireframe": "pa-03, pa-09, pa-14, pa-19 and pa-25 count age in days from the last day of the service month as of 01-Oct-2026 and stop counting when the provision closes (decided with the user, pending Airtel). For example 131·410455·CCSVC002·JUN-26 is 93 days old and escalated to the business user.",
  "ask": "GPA team, with CFR",
  "refs": "P&A HLD open point 18; P&A HLD 4.4 (GL period check), 4.5 Table 8, 5.6 Table 21; BRD 9-Sep-2026 sections 13 and 15 (escalation matrix), TOCO rent rule 10, ERP report enhancements (ageing buckets); actualisation audit 13-Oct-2026 decision 3"
 },
 {
  "id": "PA-29",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "Reversal mode for each activity, who sets it, and how an invoice arriving before the reversal is treated (HLD open point 2)"
  ],
  "title": "Reversal mode: which provisions use it, who sets it, and an invoice before the reversal",
  "context": "A provision journal is posted in Oracle either in reversal mode, which Oracle reverses automatically on the first day of the next period, or in standing mode (adjustment or provisional), where the liability stays until an invoice knocks it off; today the GPA team (accounting control team) posts most journals in reversal mode and some in standing mode (HLD 2.1). The mode decides what actualization posts: nothing for reversal mode, where the platform only closes the URN (the unique reference number linking provision, journal and invoice), and a Liability Dr / Expense Cr knock-off for standing mode (HLD 5.4.4 Table 18). The sources do not fix which inputs use which mode: the BRD says scenario 1 entries are 'always on Reversal Mode', yet its worked actualization examples post a knock-off (HLD Appendix B), HLD Table 11 gives adjustment or provisional mode for scenarios 5, 9, 11 and 12, and a client note in HLD 5.4.4 asks GPA for the mapping. They also place the setting differently: on each provision (HLD 4.4) or on the GPA-owned activity master (HLD Table 23). Nor do they cover an invoice booked in the provision's own period, before Oracle's reversal, when that month's expense carries both the provision and the invoice.",
  "question": "Which activities or scenarios post in reversal mode and which in standing mode, and who sets and changes the mode? When an invoice is booked in the same period as a reversal-mode provision, before Oracle reverses it, should the platform post anything?",
  "options": [
   {
    "option": "Set the mode per activity in the activity master, maintained by the GPA team with maker-checker; each provision takes it from its activity.",
    "effect": "One mapping exercise over the tracked provision inputs and makers cannot pick the wrong mode; an activity that genuinely needs both modes has to be split into two activities."
   },
   {
    "option": "Fix the mode by scenario: scenario 1 always reversal (BRD), scenarios 5, 9, 11 and 12 adjustment or provisional (HLD Table 11).",
    "effect": "No master to maintain, but exceptions inside a scenario cannot be expressed, and scenario 9 changes to adjustment mode at year-end, which needs its own rule."
   },
   {
    "option": "Default the mode from the activity and let the GPA team change it on a provision before it is sent to Oracle.",
    "effect": "Matches HLD 4.4 ('recorded on each provision') and handles one-off cases; each change needs a control and an audit trail entry, and matching must read the mode from the provision."
   },
   {
    "option": "For an invoice booked before Oracle's reversal, post nothing and close the URN; the reversal on the first day of the next period removes the provision.",
    "effect": "General practice: no extra journal and no change to Oracle's reversal, but the provision month shows the cost twice and the next month is lower by the same amount."
   }
  ],
  "suggested": "Option 1, per activity: HLD Table 23 already puts reversal mode on the GPA-owned activity master and the HLD 5.4.4 client note asks GPA for exactly this mapping; the scenario defaults in HLD Table 11 can seed it. GPA should also say whether invoices are booked before the reversal often enough to need option 4 or another rule.",
  "wireframe": "pa-19 (Activity master tab) has a Reversal mode column (Reversal or Standing) per activity, edited by GPA with maker-checker; pa-04 takes the mode from the activity and pa-09 shows it. On pa-12 a reversal-mode match closes the URN without a journal; an invoice booked before the reversal is not handled separately.",
  "ask": "GPA team",
  "refs": "P&A HLD open point 2; P&A HLD 2.1 step 3, 4.4 (accounting defaults), Table 11, 5.4.4 Table 18 and client note, Table 23, Appendix B entry 2; BRD 9-Sep-2026 scenario 1"
 },
 {
  "id": "PA-30",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "Reversal mode: whether a journal is posted when the platform reverses (PBR, force reversal) or cancels (PO) a provision Oracle already reversed (HLD open points 2 and 20)"
  ],
  "title": "Journal when the platform reverses or cancels a provision Oracle already reversed",
  "context": "In reversal mode Oracle reverses a provision journal automatically on the first day of the next period, while the platform keeps the provision open until it is settled or closed, so the Oracle ledger and the platform's open balance differ by design (HLD 4.6 note; HLD open point 20). The platform can later close such a provision in three ways: the PBR reversal (an open provision beyond the 13-month PBR window is reversed automatically), a force reversal of a disputed provision approved by CFR (financial review team), or cancellation when a PO (purchase order) is raised in Oracle for the same cost. For actualization the HLD posts no knock-off in reversal mode because Oracle already reversed the liability (HLD 5.4.4 Table 18), but neither the HLD nor the BRD says what these three closures post; the BRD only says 'identify PBR and reverse', and an HLD 4.6 client note says to 'reverse the Provision' when a PO is found. A second reversal journal for a provision Oracle already reversed would credit the expense twice.",
  "question": "When the platform reverses (PBR or force reversal) or cancels (PO raised) a reversal-mode provision that Oracle has already reversed, should it post any journal to Oracle? Which balance, the platform's open balance or the Oracle ledger, should each report quote?",
  "options": [
   {
    "option": "No journal for reversal-mode provisions: the platform only closes the URN as Reversed or Cancelled and records Oracle's earlier reversal; standing-mode provisions get a Liability Dr / Expense Cr journal for the open balance.",
    "effect": "No double credit to expense and the same reasoning the HLD uses for actualization; the two balances keep differing until closure, so every report must state which one it shows."
   },
   {
    "option": "Post a reversal journal for every closure, whatever the mode.",
    "effect": "One simple rule, but for reversal-mode provisions it credits the expense a second time and overstates profit unless GPA reverses that journal by hand."
   },
   {
    "option": "Re-post every open reversal-mode provision in Oracle at each month-end while it stays open on the platform, so a closure simply stops the next re-post.",
    "effect": "General practice (rolling accrual): the Oracle and platform balances agree, which settles open point 20, but it adds journals every month and changes today's practice where reversal-mode entries just reverse the following month (HLD 2.1)."
   }
  ],
  "suggested": "Option 1, no journal for reversal mode: it applies the rule the HLD already uses for actualization (Table 18) and avoids a second credit to expense; the gap between the two balances then becomes a reporting and reconciliation point under open point 20.",
  "wireframe": "pa-09, pa-12 and pa-14 close reversal-mode provisions without a journal and say so, for example 121·410022·SECURITY001·JUL-25 (Rs 4,10,000.00), reversed by Oracle on 01-Aug-2025 and closed by the PBR run on 05-Sep-2026, and 131·410387·AMCDG004·JUN-26, settled against PO 4500912045 on 04-Sep-2026. pa-08 shows the force-reversal journal as 'None' for reversal mode and Liability Dr / Expense Cr for standing mode.",
  "ask": "GPA team, Oracle ERP team",
  "refs": "P&A HLD open points 2 and 20; P&A HLD 2.1 step 3, 4.6 (note and client note), 4.7 Table 10, 5.4.4 Table 18, 5.6 Table 21; BRD 9-Sep-2026 TOCO rent rule 10"
 },
 {
  "id": "PA-31",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "Force reversal: how a later invoice for the reversed period is treated"
  ],
  "title": "Force reversal: how a later invoice for the reversed period is treated",
  "context": "Force reversal lets the GPA team (accounting control team) reverse a disputed provision before the PBR window (13 months, after which an open provision is reversed automatically), with approval from CFR (financial review team); it ends the provision's URN, the unique reference number that links it to its invoice (HLD 5.6 Table 21, 4.7 Table 10). For a provision reversed under PBR, the HLD says a later invoice for that period is accounted as a hit: expensed in the current period and not reclassed to the YEP (year-end provision) code (HLD 4.7, 5.6). A hit is defined by a service period before the PBR window, so it does not cover a force-reversed period, which is still inside the window, and the BRD and HLD say nothing else about it. With no open provision left, such an invoice has nothing to match.",
  "question": "If an invoice later arrives for the period of a force-reversed provision, how should the platform treat it: as a hit, as an unmatched invoice for review, or in another way?",
  "options": [
   {
    "option": "Treat it as a hit: expensed in the current period, not matched and not reclassed to YEP, as after a PBR reversal.",
    "effect": "Consistent with HLD 4.7 and needs no new process; hits would no longer mean only 'before the PBR window', so hit reports need a reason (PBR or force reversal)."
   },
   {
    "option": "Put it in the unmatched queue for the GPA team, showing the force-reversed URN and the CFR approval.",
    "effect": "The invoice is still booked and expensed by AP in the current period, and someone confirms why a disputed cost was billed; adds a manual review for each such invoice."
   },
   {
    "option": "Hold the invoice for approval in invoicing until the business confirms the dispute is settled.",
    "effect": "General practice: avoids paying a cost Airtel disputed, but needs P&A to pass force-reversal details to the invoicing approval step, which the HLD does not provide for."
   }
  ],
  "suggested": "Option 2, unmatched queue: a force reversal records that the cost was disputed, so an invoice for it is an exception someone should look at, and HLD 4.7 already sends invoices without a matching provision to that queue.",
  "wireframe": "pa-09 (force reversal dialog), pa-08 (CFR review) and pa-14 (Force closure & reversal tab) say the reversal ends the URN but not what happens to a later invoice. Sample: CFR-26-0112 asks to force-reverse 121·410455·CCSVC002·APR-26 (Rs 19,80,000.00; vendor billed under a new contract), waiting for CFR; an Apr-26 invoice from that vendor would have no provision to match.",
  "ask": "GPA team, CFR",
  "refs": "P&A HLD 4.7 Table 10, 5.6 Table 21, Appendix A (Hit); BRD 25-Aug-2026 section 13 client note (force reversal for disputes, CFR approval); actualisation audit 13-Oct-2026 (pa-09 force reversal dialog)"
 },
 {
  "id": "PA-32",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "Held and excluded provisions: whether they keep escalating and stay in the ageing buckets"
  ],
  "title": "Held and Government vendor provisions: ageing buckets and escalation",
  "context": "Open provisions are escalated at 90, 180, 270 and 365 days to the business user, manager, CFR (financial review team) and Controller / ACE (central processing team), and grouped in ageing buckets of 0 to 30, 31 to 60, 61 to 90 and over 90 days (HLD 4.5 Table 8, 5.6). Two kinds of provision are excluded from the PBR reversal (the automatic reversal of open provisions beyond the 13-month PBR window): provisions the GPA team (accounting control team) has placed on hold, and Government vendor provisions (HLD 5.6; BRD 9-Sep-2026 TOCO rent rule 10). The sources do not say whether these keep ageing and escalating: 'On hold' is a status of its own beside 'Open' (HLD Table 9), and a Government vendor provision is never reversed, so it would reach the Controller / ACE level and stay in the over-90 bucket until an invoice or a force closure ends it.",
  "question": "Should provisions on hold and Government vendor provisions keep escalating, and should they stay in the ageing buckets and the ageing report?",
  "options": [
   {
    "option": "Treat them like any open provision: they stay in the buckets and keep escalating.",
    "effect": "Bucket totals equal the full platform open balance; CFR and the Controller / ACE keep receiving escalations for provisions already held by decision or excluded by policy."
   },
   {
    "option": "Keep them in the buckets, marked as held or excluded, but stop escalation while they are held or excluded.",
    "effect": "Reports still add up to the open balance and escalations reach only provisions someone can act on; a hold could then sit unnoticed, so holds would need a periodic review."
   },
   {
    "option": "Leave them out of the buckets and escalation and list them only in a separate holds and exclusions report.",
    "effect": "A cleaner ageing view, but bucket totals no longer equal the platform open balance and the ageing report needs a reconciling line."
   }
  ],
  "suggested": "Option 2, keep in buckets but stop escalation: the balance stays visible in every ageing view, while escalation, which asks someone to act, is not sent for provisions that are held by decision or excluded by policy.",
  "wireframe": "pa-14 (Ageing & escalation tab) and pa-09 keep both kinds in the buckets and escalate them: 141·410387·AMCDG004·AUG-25 (Rs 6,90,000.00, on hold since 18-Aug-2026 under CFR-26-0087) and the Government vendor provision 101·510044·GOVLIC01·AUG-25 (Rs 25,00,000.00) are 396 days old and escalated to Controller / ACE.",
  "ask": "GPA team, CFR",
  "refs": "P&A HLD 4.5 Table 8, 4.6 Table 9, 5.6 Table 21; BRD 9-Sep-2026 section 15 (escalation matrix), TOCO rent rule 10"
 },
 {
  "id": "PA-33",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "Government vendor for the PBR exclusion: identified by a vendor master flag or a list"
  ],
  "title": "Government vendor for the PBR exclusion: vendor master flag or a list",
  "context": "The PBR reversal (open provisions beyond the 13-month PBR window are reversed automatically) skips provisions on hold and provisions for Government vendors, as per Airtel's PBR policy (HLD 5.6 Table 21; BRD 9-Sep-2026 TOCO rent rule 10); the window and its exclusions are maintained by the GPA team (accounting control team) (HLD Table 23). The BRD and HLD do not say how a vendor is recognised as Government: the vendor master the platform reads from Oracle carries vendor code, name and the RPT (related-party transaction) flag only (BRD section 8; HLD Table 23). Without a defined source, the PBR run cannot apply the exclusion automatically.",
  "question": "How should the platform know that a vendor is a Government vendor for the PBR exclusion: from a flag on the Oracle vendor master, or from a list kept on the platform?",
  "options": [
   {
    "option": "A Government flag on the Oracle vendor master, synchronised to the platform like the RPT flag.",
    "effect": "Automatic for every vendor code, including new ones; needs the attribute added and maintained in Oracle by the master data (MDM) team."
   },
   {
    "option": "A list of Government vendor codes kept on the platform by the GPA team, with maker-checker and an effective date.",
    "effect": "No Oracle change and GPA controls it as part of the PBR policy; a new Government vendor code that nobody adds before the run is reversed by mistake."
   },
   {
    "option": "Derive it from the vendor's PAN, whose fourth character is G for a Government holder (L for a local authority).",
    "effect": "General practice: no maintenance, but Government-owned companies hold company PANs and would be missed, so a manual override list is still needed."
   }
  ],
  "suggested": "Option 1, vendor master flag: the platform already reads the RPT flag from the Oracle vendor master in the same way, so one more attribute keeps the exclusion automatic; the PAN rule in option 3 can be used once to seed the flag.",
  "wireframe": "The sample data flags Department of Telecommunications (vendor 510044) as a Government vendor, so 101·510044·GOVLIC01·AUG-25 (Rs 25,00,000.00) shows 'Excluded - Government vendor' on pa-14 and pa-09; pa-19 (PBR & escalation tab) has an 'Excluded from reversal: Government vendor provisions' setting but no place to maintain the flag.",
  "ask": "GPA team, Oracle ERP team (vendor master / MDM)",
  "refs": "P&A HLD 5.6 Table 21, Table 23 (vendor master, PBR window and exclusions); BRD 9-Sep-2026 section 8 (vendor master), TOCO rent rule 10, electricity and diesel rule 9"
 },
 {
  "id": "PA-34",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "YEP rule: which provisions are flagged year-end provisions, and an invoice above the provision value"
  ],
  "title": "YEP rule: which provisions are year-end provisions, and an invoice above the provision",
  "context": "YEP stands for year-end provision. The BRD identifies YEP from the invoice's service period: for the year ending 31-Mar-2026, invoices for service up to that date are YEP and are reclassed to a YEP code, but never for more than the provision value (a provision of Rs 100 allows a reclass of at most Rs 100), and hits, invoices for service before the PBR window (the 13-month window after which open provisions are reversed), are not reclassed (BRD 9-Sep-2026 TOCO rent rules 9, 11 and 12; HLD 5.6 applies these to all provisions). BRD section 14 and HLD 4.4 and 5.7 also say YEP entries are segregated from regular monthly provisions during the year-end close, which suggests a distinct set of year-end entries rather than every provision for the year. The sources do not say which provisions carry the YEP flag, or what happens to the part of an invoice above the provision value.",
  "question": "Which provisions should the platform flag as year-end provisions: every provision for a service month in the closing year that is still open at 31 March, or only the entries raised in the year-end close? When an invoice for that year exceeds its provision, where does the part above the provision value go?",
  "options": [
   {
    "option": "Scope: flag every provision whose service month is in the closing year and that is still open at 31 March.",
    "effect": "Follows the BRD's service-period rule and needs no extra input; all such provisions, including old ones close to the PBR window, are segregated at the close."
   },
   {
    "option": "Scope: flag only the provisions raised in the year-end close (the March provisions and year-end adjustment entries), posted under their own journal category.",
    "effect": "Matches 'segregated from regular monthly provisions', but an invoice for, say, Dec-25 service booked after 31-Mar-2026 would find no YEP provision, though the service-period rule calls it YEP."
   },
   {
    "option": "Excess: reclass only up to the provision value; the rest stays as expense in the current year.",
    "effect": "The direct reading of the BRD cap; automatic, with no review step."
   },
   {
    "option": "Excess: send the part above the provision value to business finance review, as for any invoice that exceeds its provision (HLD 4.7, open point 19).",
    "effect": "Adds reviews at year-end volumes, but lets finance treat the excess as prepaid or as a prior-period item."
   }
  ],
  "suggested": "Option 1 with option 3: the BRD defines YEP by service period and caps the reclass at the provision value, which together say the open provisions for the year form the YEP pool and anything above it stays in the current year; the wireframe already works this way.",
  "wireframe": "pa-09 flags YEP on every open provision for a service month up to Mar-26 that was open at 31-Mar-2026 (for example DEC-25, FEB-26 and MAR-26). pa-14 (Hits & YEP tab) shows invoice VCS/26/1240 (service Mar-26, Rs 18,20,000.00) reclassed to YEP within the Rs 19,50,000.00 provision 141·410455·CCSVC002·MAR-26; no sample invoice exceeds its provision.",
  "ask": "GPA team",
  "refs": "P&A HLD 4.4 (accounting defaults), 4.7 Table 10, 5.6 Table 21, 5.7 (RPT and YEP segregation), open point 19; BRD 9-Sep-2026 section 14, TOCO rent rules 9, 11 and 12, electricity and diesel rules 8, 10 and 11"
 },
 {
  "id": "PA-35",
  "mod": "pa",
  "area": "Ageing, reversal and year-end",
  "keys": [
   "PBR run day and the window's effective date are samples"
  ],
  "title": "PBR reversal run day and the window's effective date",
  "context": "The PBR reversal reverses open provisions older than the PBR window (currently 13 months) automatically; the window is configurable and effective-dated and is maintained by the GPA team (accounting control team) (HLD 5.6 Table 21, Table 23). The BRD ties the rule to the month close: when the month closing date is 31-Aug-2026, the Jul-25 liability falls under PBR (BRD 9-Sep-2026 TOCO rent rule 10). Neither document says on which day the run happens or from what date the current 13-month window applies. The day matters because invoice data is picked up at a time still to be agreed (HLD open point 11): an invoice for the oldest month booked during the close either settles its provision before the run or becomes a hit (an invoice for a service period before the PBR window, expensed in the current period) after it.",
  "question": "On which day after a month closes should the PBR reversal run, and should it run automatically or when the GPA team triggers it? From what date does the current 13-month window apply, and does a change to the window apply only from the next month close?",
  "options": [
   {
    "option": "Run automatically on a fixed working day after the month close, after that month's invoices are picked up (the wireframe's sample is the 5th).",
    "effect": "Invoices booked during the close settle their provisions first, so fewer hits; GPA must still decide the GL period of any reversal journal for standing-mode provisions."
   },
   {
    "option": "Run on the last day of the month as part of the month-end close.",
    "effect": "Reversals fall in the month being closed, but invoices for the oldest month booked in the following days become hits instead of settling their provisions."
   },
   {
    "option": "Run when the GPA team triggers it from the month-end close checklist.",
    "effect": "GPA can place last-minute holds first and choose the timing; the date varies from month to month and depends on someone starting it, so the platform should remind them."
   },
   {
    "option": "Apply the 13-month window from go-live to all open provisions, and apply any later change from the next month close only.",
    "effect": "General practice: simple and predictable; any provision migrated at go-live that is already beyond 13 months is reversed in the first run unless it is held."
   }
  ],
  "suggested": "Option 1, a fixed day after the close: it keeps the BRD's month-close rule, gives users a predictable date to request holds before, and lets the month's invoices settle provisions first; the exact day should follow the invoice pickup timing in HLD open point 11.",
  "wireframe": "pa-14, pa-19 (PBR & escalation tab) and pa-09 show the run on the 5th of the month after the close (close of Sep-26 run on 05-Oct-2026) and a window effective from 01-Apr-2026, both samples. On pa-14 two Aug-25 provisions (Rs 22,90,000.00 in total) are reversed in the 05-Oct-2026 run and two are excluded; an Aug-25 invoice becomes a hit only after that run.",
  "ask": "GPA team, Oracle ERP team (period close calendar)",
  "refs": "P&A HLD 4.1 (configurable and effective-dated), 5.6 Table 21, Table 23, open points 11 and 15; BRD 9-Sep-2026 section 13, TOCO rent rules 10 and 11"
 },
 {
  "id": "INV-01",
  "mod": "inv",
  "area": "Access and sign-in",
  "keys": [
   "Whether partners open the Non-PO portal from the PO Partner Portal without signing in again (session carried over through the link)"
  ],
  "title": "Partner sign-in: carry the PO Partner Portal session into the Non-PO portal",
  "context": "Partners (vendors, the central ToCo user, ToCo meaning tower company, and landlords) need a login to submit and track non-PO invoices. The BRD asks only for 'Vendor login & access control' (FR1). The HLD says users log in with credentials managed by Airtel (section 9), assumes Airtel manages partner credentials (section 10) and lists identity and access management for partners as an Airtel IT dependency (section 11, item 7). Neither document mentions Airtel's existing Partner Portal for PO invoices or says whether partners reach the non-PO portal from it. The wireframe assumes partners reuse their Partner Portal email ID and password plus an OTP (one-time password) to their registered mobile, which still means a second sign-in when they come from the PO portal.",
  "question": "Will partners open the Non-PO portal from a link in the PO Partner Portal with their session carried over, or sign in to it separately? If separately, do they use the same Partner Portal credentials?",
  "options": [
   {
    "option": "Single sign-on from the PO Partner Portal: a link opens the Non-PO portal with the partner's session passed over, with no second login.",
    "effect": "One login and one credential store for partners. Needs the PO Partner Portal's identity service to issue a token the Non-PO portal trusts, which is build work for Airtel IT."
   },
   {
    "option": "Shared credentials, separate sign-in: the Non-PO portal checks the same Partner Portal email ID, password and OTP.",
    "effect": "Simpler integration (read the same identity store), but partners sign in twice when they move between the two portals."
   },
   {
    "option": "Build the Non-PO screens as a module inside the PO Partner Portal.",
    "effect": "No separate login or link at all; the build then depends on the PO Partner Portal's technology and release cycle."
   },
   {
    "option": "Separate Non-PO portal credentials issued by Airtel.",
    "effect": "Independent of the PO Partner Portal, but partners keep two accounts and Airtel onboards every partner a second time."
   }
  ],
  "suggested": "Option 1, single sign-on: partners already hold Partner Portal credentials that Airtel manages, so carrying the session over avoids a second login and a second credential store. Option 2 is the fallback if the PO Partner Portal cannot pass a session.",
  "wireframe": "inv-01 shows a Partner Login (registered email ID and password, then a 6-digit OTP to the registered mobile; credentials are reset on the Partner Portal) and a separate 'Sign in with Airtel account' single sign-on for Airtel employees. After login, partner pages use the PO Partner Portal layout (counts and links in the side rail).",
  "ask": "IT team (identity and access), P2P team",
  "refs": "Invoicing BRD section 8 (FR1); Invoicing HLD sections 9, 10 and 11 (dependency 7)"
 },
 {
  "id": "INV-02",
  "mod": "inv",
  "area": "Access and sign-in",
  "keys": [
   "AP categories are submitted by Airtel users on the vendor's behalf; to be confirmed by Airtel (BRD Step 1 has vendors submitting every category)",
   "Access to AP / Rush invoice: Airtel users only, submitting on the vendor's behalf (to be confirmed by Airtel)"
  ],
  "title": "Who submits Rush / AP invoices: Airtel users on the vendor's behalf, or the vendors",
  "context": "Rush / AP invoices (Rush, advances, ROW, SACFA, legal, CAF penalty, BSNL, group company, IUC, bank charges, APBL, credit notes, Govt vendor, others) are approved on the portal and then booked from the invoice document in Oracle AP. BRD Step 1 has the vendor log in and pick any category, AP ones included, and HLD 3.1 scopes submission 'by partners, landlords, circle users and Airtel users' without saying who submits which category. Several sources point to Airtel users for AP: the Rush, advance, BSNL and legal input formats carry the Airtel initiator and OLM ID (an Airtel user ID); the DOA (delegation of authority, the approval matrix) needs requester, opex or capex and zone from the user (HLD 6.3.1); and ROW, SACFA and CAF penalty payments are made on authority demand notes, portal snapshots or challans and force approved against an NFA (note for approval) or approval email (HLD 6.3.4 to 6.3.7). Landlord GST, also an AP category, is submitted by landlords (BRD Landlord GST items 1 and 5).",
  "question": "Which Rush / AP categories, if any, may vendors submit themselves? Are the rest submitted only by Airtel users (circle, central or PHD / AP teams) on the vendor's behalf?",
  "options": [
   {
    "option": "Airtel users only: circle, central and PHD / AP users submit every AP category on the vendor's behalf.",
    "effect": "Matches the initiator, OLM ID, NFA and DOA inputs the formats need. Vendors still send AP invoices to the circle outside the portal, as today, and can only track them."
   },
   {
    "option": "Vendors submit every category, as BRD Step 1 says; an Airtel user then adds the initiator, NFA and DOA details before approval.",
    "effect": "Full self-service intake, but every AP invoice gets an extra hand-off step and needs a way to assign the Airtel initiator."
   },
   {
    "option": "Split by category: vendors submit the categories where they issue their own tax invoice (for example legal, bank charges, credit notes, others), and Airtel users submit the authority and NFA-based ones (ROW, SACFA, CAF penalty, Govt vendor, Rush, advances).",
    "effect": "Self-service where it fits, held as a per-category list (the wireframe already keeps one per partner type). There are more rules to test and to explain to vendors."
   }
  ],
  "suggested": "Option 1, Airtel users only, for the first release: every AP route depends on internal inputs (NFA, initiator, DOA details) that a vendor cannot supply. Selected categories can be opened to vendors later (option 3) without changing the flow.",
  "wireframe": "inv-03 offers partners only their own categories (vendor: Local ToCo, Bandwidth Domestic, LL_EB, Diesel Knock off; central ToCo vendor: Central ToCo; landlord: Landlord GST). The AP form inv-05 is open to circle users, central users and PHD / AP with a 'Submitting for: Vendor' lookup; the marker shows on inv-03 (vendor role), on inv-05 and in the access matrix (inv-access).",
  "ask": "P2P team, AP team",
  "refs": "Invoicing BRD section 6 Step 1, Landlord GST items 1 and 5; Invoicing HLD 3.1, 6.3.1, 6.3.4 to 6.3.7; AP input formats (Manual Invoice processing Formats)"
 },
 {
  "id": "INV-03",
  "mod": "inv",
  "area": "Access and sign-in",
  "keys": [
   "Page access by role: The approved HLD lists the user types (section 5.1) and stakeholders (section 3.3) but not page-level access. Admin rights are to be confirmed by the P2P team and access controls checked with GRC."
  ],
  "title": "Page access by role: confirm the proposed access matrix",
  "context": "The invoicing portal has 25 pages (sign-in, submission forms, tracking, work queues, approvals, reports, masters, configuration, users) used by partners and by several Airtel teams. The approved Invoicing HLD names the user types (5.1: vendors and partners, landlords, circle users, central users, AP and PHD users, approvers, administrators) and the stakeholders (3.3), but not which role may open or act on each page. Client notes on HLD 5.1 add that the P2P team will confirm admin rights and that access controls are to be checked with GRC (the governance, risk and compliance team). The wireframe therefore proposes its own matrix of 13 roles. The AP manager and Audit roles, and the split of 'administrators' into a P2P master owner and a portal administrator, are the wireframe's additions.",
  "question": "Does Airtel accept the proposed roles and page-by-role access (who works on each page and who only views it)? Who signs off the final matrix?",
  "options": [
   {
    "option": "Accept the wireframe matrix as the baseline and correct it during detailed design.",
    "effect": "Quickest: the P2P team marks changes against a concrete proposal and GRC reviews the result once."
   },
   {
    "option": "The P2P team builds the matrix from today's Oracle EBS responsibilities and team structure.",
    "effect": "Mirrors how access works today, so there are fewer surprises at go-live. It means more work before build and can carry over today's gaps."
   },
   {
    "option": "GRC first defines the roles from segregation-of-duties rules, then pages are mapped to those roles.",
    "effect": "General practice: the strongest control design (for example, submit and approve can never sit in one role), but the matrix waits until GRC finishes its review."
   }
  ],
  "suggested": "Option 1, accept as baseline: the matrix already follows the HLD user types and the HLD 9 control that a submitter cannot approve, so reviewing it is faster than starting from a blank sheet.",
  "wireframe": "inv-access lists the 13 proposed roles and, for every page, the roles that work on it and those that only view it, under a 'Proposal for Airtel to confirm' banner. The menu hides pages a role cannot use, and such a page shows 'Not available for this role'.",
  "ask": "P2P team, GRC team",
  "refs": "Invoicing HLD 3.3, 5.1 (client notes), 9"
 },
 {
  "id": "INV-04",
  "mod": "inv",
  "area": "Access and sign-in",
  "keys": [
   "Access to Users, roles & access: Admin rights to be confirmed by the P2P team; controls to be checked with GRC"
  ],
  "title": "Admin rights on Users, roles & access, and the access controls GRC requires",
  "context": "Someone must create partner logins and map them to Oracle vendor codes, give Airtel users their roles and circle scope, and change these over time. HLD 5.1 says administrators maintain masters, templates and configurable rules. Client notes on the same section say the P2P team will confirm the rights ('super admin / admin' for particular users) and that how access and controls are given is to be checked with GRC (the governance, risk and compliance team); section 9 carries the same GRC note. The HLD assumes Airtel manages vendor onboarding, partner credentials and circle user access (section 10). No source says who holds admin rights, what an admin may change, or which approvals and reviews GRC requires.",
  "question": "Which team holds super-admin and admin rights on the portal, and what may each level change? Which controls (approval of access changes, periodic access review, logging) does GRC require?",
  "options": [
   {
    "option": "Two levels, as the client note suggests: a super admin manages roles and admin users, and admins in the P2P team create partner logins, map vendor codes and assign roles and circle scope.",
    "effect": "Fits the client note and keeps routine user work with the P2P team; admin actions still need a GRC-approved check."
   },
   {
    "option": "Access changes go through requests: a requester asks, a manager or the P2P team approves, and the admin only carries out the change.",
    "effect": "General practice: maker-checker on every access change and easy to audit, but slower when a partner must be onboarded urgently."
   },
   {
    "option": "Airtel users' roles come from Airtel's central identity or access-management service, and the admin page handles only partner logins.",
    "effect": "General practice: one place for employee access reviews and for removing leavers. Needs integration with the identity service the HLD names as a dependency (section 11, item 7)."
   }
  ],
  "suggested": "Option 1, two levels, with the approval step of option 2: two admin levels match the client note, and an approved request behind each access change gives GRC the evidence trail it typically expects.",
  "wireframe": "inv-23 (worked by the portal administrator, view-only for the P2P team) lists partner logins with mapped vendor codes and OTP mobiles, Airtel users from single sign-on with their roles and circle scope, and what each role can and cannot do. A banner marks admin rights and GRC checks as to be confirmed.",
  "ask": "P2P team, GRC team, IT team",
  "refs": "Invoicing HLD 5.1 (client notes), 9 (client note), 10, 11 (dependency 7)"
 },
 {
  "id": "INV-05",
  "mod": "inv",
  "area": "Access and sign-in",
  "keys": [
   "Whether vendors submit LL_EB: its format is the circle input sheet (HLD 6.2.6)"
  ],
  "title": "LL_EB (landlord electricity): submitted by circle users only, or also by partners",
  "context": "LL_EB invoices reimburse landlords for site electricity (EB = electricity board charges); they are Property Manager (PM) invoices, booked site by site in Oracle's PM module after the meter readings are checked. HLD 6.2.6 says they are submitted with the circle's input sheet (circle name, site ID, locator ID, vendor details, invoice and billing dates, meter readings, base and total amount). The BRD's EB process works from the Excel 'provided by circle/user', and a client note there limits upload to users of the same circle. A client note on HLD 5.1 adds that for PM, apart from the central ToCo vendor user (ToCo = tower company), 'others will be internal users (circle wise)'. Even so, the wireframe lets partners with the vendor role submit LL_EB, while landlords, who are the payees, can submit only Landlord GST.",
  "question": "Who submits LL_EB invoices on the portal: circle users only, or also the landlords (or other vendors) who are paid?",
  "options": [
   {
    "option": "Circle users only, using the circle input sheet as a single entry or a bulk upload.",
    "effect": "Matches HLD 6.2.6 and both client notes; landlords need no portal login for EB, and the circle stays responsible for collecting bills and meter readings."
   },
   {
    "option": "Landlords submit their own LL_EB invoices, and circle users submit for landlords not on the portal (as for Landlord GST).",
    "effect": "Self-service and status visibility for landlords, but they must supply site and meter details, so the format needs a landlord version with the locator and vendor fields derived."
   },
   {
    "option": "Keep the wireframe: partners with the vendor role and circle users both submit.",
    "effect": "Only makes sense if LL_EB bills also come from vendors other than landlords, which the sources do not describe."
   }
  ],
  "suggested": "Option 1, circle users only: this is what HLD 6.2.6 and both client notes describe, and it keeps the meter-reading checks with the team that holds the circle sheet.",
  "wireframe": "inv-03 offers LL_EB to the vendor partner role and to circle users. inv-04 shows Sunrise Estate Management Services (Goa) invoice OPRT-123/25-41 for Rs 10,000.00 base with meter readings 5,644 to 5,800, and inv-02 gives a circle user the task of uploading Sep-26 LL_EB invoices for 18 UP East sites.",
  "ask": "PHD team, P2P team, circle finance teams",
  "refs": "Invoicing HLD 5.1 (client note), 6.2.6; Invoicing BRD EB Reimbursement process (client notes); EB Reimbursement 08-SEP-26 input format"
 },
 {
  "id": "INV-06",
  "mod": "inv",
  "area": "Invoice categories and input formats",
  "keys": [
   "Central ToCo: a standard input format to be agreed for each ToCo vendor working sheet"
  ],
  "title": "Central ToCo: one standard working-sheet format, or one per ToCo vendor",
  "context": "Central ToCo invoices come from the national tower companies (ToCo = tower company; HLD Appendix B lists 10, such as Indus Towers, Bharti Infratel and ATC). One invoice covers rent and energy for many sites, so the vendor sends the invoice PDF with an Excel working sheet that lists each site line. The business input format for Central ToCo defines 27 columns, 16 of them mandatory (for example invoice number and date, amounts, supplier GSTIN, service start and end dates, site ID, Airtel ID, operating unit, BU code, state, vendor name and code). Its field mapping, however, notes that every ToCo vendor's Excel has a different layout, and a client note on HLD 6.2.2 says the same. HLD section 10 assumes 'a standard input format will be agreed for each ToCo vendor's working sheet', without saying whether that means one common layout or one agreed layout per vendor.",
  "question": "Will every ToCo vendor submit its working sheet in the single Central ToCo input format, or will the portal accept each vendor's own layout through a mapping agreed per vendor? Who agrees the format with the vendors before go-live?",
  "options": [
   {
    "option": "One common template: all ToCo vendors fill the 27-column business input format.",
    "effect": "One set of validations and the simplest build. Each tower company must change its billing extract, which needs agreement with all 10."
   },
   {
    "option": "Per-vendor layouts, with a column mapping per vendor held as configuration.",
    "effect": "Vendors keep their sheets. The portal maintains about 10 mappings, and an upload fails when a vendor changes its layout without notice."
   },
   {
    "option": "Keep today's practice: the PHD team converts each vendor's sheet into the common format before upload.",
    "effect": "No change for vendors, but the manual step the portal is meant to remove stays, and vendors cannot submit Central ToCo invoices directly."
   }
  ],
  "suggested": "Option 1, one common template: the business has already defined the columns the portal needs, and one template keeps validation and vendor guidance in one place. A per-vendor mapping (option 2) can stay as a fallback for a vendor that cannot comply.",
  "wireframe": "inv-04 (Central ToCo) asks for the invoice PDF and a working sheet: sample IND_Sep26_working.xlsx, 42 lines, for Indus Towers invoice IND/26/SEP/80412 (Rs 15,63,754.58). inv-08 shows the 27 input-format columns as the bulk template.",
  "ask": "PHD team, P2P team (with the ToCo vendors)",
  "refs": "Invoicing HLD 6.2.2 (client note), 10, Appendix B; Central toco 08-SEP-26 input format and field mapping"
 },
 {
  "id": "INV-07",
  "mod": "inv",
  "area": "Invoice categories and input formats",
  "keys": [
   "APBL invoices: whether cost centre is mandatory (ERP logic to check)"
  ],
  "title": "APBL invoices: is the cost centre mandatory on the portal",
  "context": "APBL invoices are those booked in the APBL books (the wireframe treats APBL as Airtel Payments Bank Ltd, a separate group entity). They are approved under the DOA (delegation of authority, the approval matrix) before booking in Oracle AP. The BRD says a cost centre code is mandatory for all APBL invoices other than group company invoices, but its next line asks for GL code and cost centre fields on the portal as 'Non Mandatory', with ERP logic still to be checked. HLD 6.3.14 repeats the mandatory rule and lists the conflict as open point 7. The business formats include no APBL input format or Oracle field mapping, so how the cost centre reaches the booking is not shown.",
  "question": "Must the submitter enter a cost centre for every APBL invoice (other than group company) before submitting, or is the field optional with Oracle deriving or defaulting it? Where should the list of valid APBL cost centres come from?",
  "options": [
   {
    "option": "Mandatory on the portal, checked against the APBL cost-centre list from Oracle.",
    "effect": "Follows the BRD rule and HLD 6.3.14. A submission stops without it, so submitters must know the cost centre, and the list must be synchronised from Oracle."
   },
   {
    "option": "Optional on the portal; Oracle defaults or derives it when blank.",
    "effect": "Easier to submit, but the Oracle ERP team must define the default or derivation, and costs may land on the wrong cost centre."
   },
   {
    "option": "Derived from a master (for example by GL code or requester) and shown read-only.",
    "effect": "General practice: no typing and consistent coding, but needs a mapping master with an owner in APBL finance."
   }
  ],
  "suggested": "Option 1, mandatory: the BRD rule and HLD 6.3.14 both require it, and the 'non mandatory' note was only waiting for the ERP check. The Oracle ERP team should confirm whether the APBL books reject an invoice without a cost centre.",
  "wireframe": "inv-05 for APBL shows an optional Cost centre lookup (sample CC-APB-2201, Customer care) on Vertex Call Solutions invoice VCS/APB/26/0377 for Rs 4,12,000.00, operating unit Airtel Payments Bank Ltd - Delhi.",
  "ask": "Oracle ERP team, P2P team",
  "refs": "Invoicing BRD AP category rules, item 10 (APBL); Invoicing HLD 6.3.14, open point 7"
 },
 {
  "id": "INV-08",
  "mod": "inv",
  "area": "Invoice categories and input formats",
  "keys": [
   "Landlord GST: whether the landlord enters the GST amount (BRD items 3, 9); the LL GST input format has no GST column"
  ],
  "title": "Landlord GST: does the landlord type the GST amount",
  "context": "Landlords charge GST on rent Airtel has already paid. The landlord, or a circle user on their behalf, submits a GST invoice against one paid rent voucher, and the GST may not exceed 18% of the rent. BRD Landlord GST items 3 and 9 and HLD 6.3.3 describe the landlord selecting the lease and entering the GST value, with a higher value refused and a lower one accepted. The LL GST input format, however, has nine columns (operating unit, supplier name, number and site, invoice date and number, base amount, description, rent voucher number) and no GST amount. Its Oracle mapping books two lines at the base amount, one with the 18% GST tax category and one negative at 0%, so Oracle calculates the GST itself; it is unclear whether a typed GST value is needed at all, and how a lower GST would be booked under the 18% category.",
  "question": "Does the landlord type the GST amount on the portal, or only the base rent, with the GST read from the invoice and calculated in Oracle? If a GST below 18% is accepted, how should it be booked?",
  "options": [
   {
    "option": "The landlord types the GST amount, the portal checks it against 18% of the rent paid, and a GST column is added to the input format.",
    "effect": "Follows BRD items 3 and 9 literally. The typed amount can still differ from what Oracle calculates from the tax category, so a rule is needed for differences."
   },
   {
    "option": "The landlord enters the base rent only; OCR reads the GST from the invoice copy, the portal checks it against 18% of the rent paid, and Oracle calculates the GST from the tax category.",
    "effect": "Follows the agreed input format and the two-line booking, and the cap check still runs, on the OCR value instead of a typed one. An unreadable copy goes to the manual queue."
   },
   {
    "option": "Both the base rent and the GST are read by OCR, and the landlord only confirms them.",
    "effect": "The least typing, but it depends entirely on OCR quality; manually signed or scanned invoices may go to manual review more often."
   }
  ],
  "suggested": "Option 2, base rent only: it matches the agreed input format and the two-line Oracle booking, and the BRD's 18% cap is still enforced on the GST shown on the invoice.",
  "wireframe": "inv-06 shows a typed 'GST amount' field, prefilled at Rs 9,720.00 (18% of the Rs 54,000.00 quarterly rent on voucher 716902 for R K Estates), with an error when the amount exceeds the cap. The marker sits on that field.",
  "ask": "PHD team, Tax team",
  "refs": "Invoicing BRD Landlord GST items 3 and 9; Invoicing HLD 6.3.3; LL GST 08-SEP-26 input format and WebADI mapping"
 },
 {
  "id": "INV-09",
  "mod": "inv",
  "area": "Invoice categories and input formats",
  "keys": [
   "Diesel Knock off: input format and rules"
  ],
  "title": "Diesel Knock off: input format, rules and what the category covers",
  "context": "The BRD lists Diesel Knock off as a Property Manager (PM) sub-category: booked site by site (by locator, Oracle's site code) in Oracle's PM module, then approved by the business owner under the budget-head DOA (delegation of authority). Neither the BRD nor the HLD describes it further. HLD 6.2.8 says it follows the common PM flow, with its input format and rules to be confirmed, and HLD open point 8 notes it has neither a format nor rules. There is no diesel workbook among the business formats, so the template columns, the checks, the supporting documents and even what 'knock off' refers to (plain diesel supply bills, or diesel cost set off against another party) are unknown.",
  "question": "What does a Diesel Knock off invoice cover, and who raises it? Which input format, checks and supporting documents apply, and does it follow the standard PM booking and budget-head DOA approval?",
  "options": [
   {
    "option": "A standard PM invoice with a simple format like LL Rent SD and Govt Demand Note (circle, site ID, locator ID, vendor, invoice number and date, amount) plus the service period.",
    "effect": "Can go live on the common PM flow now; diesel-specific checks are added later."
   },
   {
    "option": "A dedicated format with diesel-specific columns and checks, defined by the PHD team.",
    "effect": "General practice: columns such as litres supplied and rate per litre allow quantity and rate checks per site, but the format must be agreed before build."
   },
   {
    "option": "If 'knock off' means setting diesel cost off against a ToCo's or vendor's charges, treat it as a debit note or adjustment, not a PM invoice.",
    "effect": "General practice: the category moves to the debit-note family (approved before booking in AP) and is removed from PM."
   },
   {
    "option": "Keep it out of the first release until the format and rules exist, as with MiFi.",
    "effect": "No risk of building the wrong flow; until then, diesel invoices stay on today's manual channels."
   }
  ],
  "suggested": "Option 1, standard PM invoice: the HLD already puts it on the common PM flow, and the simple PM format lets it be built now. The PHD team can add diesel checks once it defines them.",
  "wireframe": "inv-04 for Diesel Knock off shows Sai Krupa Power Solutions invoice SKP/26-27/109 dated 20-Sep-2026 for diesel supplied from 01-Sep-2026 to 15-Sep-2026 to three UP East sites (Rs 78,000.00 base), with site, period and amount per line. inv-08 shows 'Input format to be confirmed' for its bulk template, and inv-03 lets vendor partners submit it.",
  "ask": "PHD team, P2P team",
  "refs": "Invoicing BRD section 6 Step 1 (PM sub-categories); Invoicing HLD 6.1, 6.2.8, open point 8"
 },
 {
  "id": "INV-10",
  "mod": "inv",
  "area": "Invoice categories and input formats",
  "keys": [
   "TDS rectification category: input format same as Rush and force approved (client note on the HLD)"
  ],
  "title": "TDS rectification: what the category covers and how it is booked",
  "context": "TDS (tax deducted at source) is income tax Airtel withholds from a vendor payment, at the rate of the applicable TDS section, and pays to the government. A client note on the approved Invoicing HLD (6.1 and 6.3) adds 'TDS rectification' as an AP category whose input format is the same as Rush and which is force approved (approved against an NFA, a note for approval, or an approval email instead of the DOA route). The BRD does not mention the category. No source says what a rectification entry represents (for example a refund of excess TDS to the vendor), who raises it, or which GL code, payment term, SLA and documents apply. The Rush format it borrows carries operating unit, supplier, invoice number and date, amount, GL code, description, initiator and OLM ID (an Airtel user ID).",
  "question": "What does a TDS rectification entry correct or pay, and who submits it? Which GL code, payment term and supporting documents apply, and does it run on the Rush SLA (same day / T+1) or the normal T+2 / T+3?",
  "options": [
   {
    "option": "A payable that refunds TDS deducted in excess (the wireframe's assumption): Rush columns, force approval, a STANDARD AP invoice with no TDS, IMMEDIATE payment term, normal SLA.",
    "effect": "Can be built now; the Tax team must fix the GL code and the evidence required (the wireframe asks for the TDS working and an approval email)."
   },
   {
    "option": "A correction of the original invoice's TDS in Oracle rather than a new payable.",
    "effect": "General practice: no new invoice is created, so the correction may sit outside the portal or need a different Oracle interface; the portal would only capture the request."
   },
   {
    "option": "Recovery of TDS deducted short, raised as a debit note on the vendor.",
    "effect": "General practice: belongs with the debit-note family (approved before booking) rather than the AP invoice forms."
   }
  ],
  "suggested": "Option 1, refund payable: the client note places it among AP invoices with the Rush input and force approval, which fits a payment to the vendor. The Tax team should confirm the GL code, documents and SLA.",
  "wireframe": "inv-05 has a TDS rectification category with the Rush columns, force approval, IMMEDIATE payment term and the T+2 / T+3 SLA. Its sample is SecureOne Facility Services entry SFS/TDS/26-27/004 for Rs 4,850.00 to GL 2434101, the excess TDS refunded after deducting 2% instead of 1% on invoice SFS/2026/0888 (Rs 4,85,000.00). inv-22 lists it in the category matrix with the marker.",
  "ask": "Tax team, P2P team",
  "refs": "Invoicing HLD 6.1 and 6.3 (client notes), 5.7 (SLA); Rush input format (Manual Invoice processing Formats)"
 },
 {
  "id": "INV-11",
  "mod": "inv",
  "area": "Invoice categories and input formats",
  "keys": [
   "Govt Demand Note: further rules and approvals"
  ],
  "title": "Govt Demand Note: approvals and rules beyond the basic format",
  "context": "Govt demand notes are demands raised by government bodies and booked against Airtel sites. The BRD lists them as a Property Manager (PM) sub-category: booked site by site (by locator) in Oracle's PM module, then approved by the business owner under the budget-head DOA (delegation of authority). HLD 6.2.7 gives only a simple input format (circle name, site ID, locator ID, vendor name, code and site code, invoice date and number, total amount) and says further rules, including approvals specific to Govt demand notes, are to be confirmed. HLD open point 8 repeats this, and the business formats contain no workbook for it. By contrast, the authority payments booked in AP (ROW, CAF penalty, Govt vendor) are force approved against an NFA (note for approval) or approval email and need a demand copy with stamp and signature (HLD 6.3.1, 6.3.2, 6.3.16).",
  "question": "Do Govt demand notes need an approval beyond the budget-head DOA in Oracle after booking, for example an NFA or approval email as for ROW and CAF penalties? Which further checks and documents apply, such as the stamped demand copy and GST or TDS treatment?",
  "options": [
   {
    "option": "Standard PM route only: book by locator, then budget-head DOA in Oracle, with the demand copy as the mandatory document.",
    "effect": "No extra build; relies on the Oracle approver to check the demand."
   },
   {
    "option": "Add a force approval against an NFA or approval email, as for ROW and CAF penalties.",
    "effect": "Stronger control on statutory payments. PM invoices are otherwise approved only in Oracle after booking, so a portal approval step would be an exception to the PM flow."
   },
   {
    "option": "Book government demands that are not tied to a site in AP under the Govt vendor category.",
    "effect": "One route for non-site government payments (approved before booking against the approval email); needs a rule for which demands are site-wise (PM) and which are not (AP)."
   }
  ],
  "suggested": "Option 1, standard PM route: HLD 6.1 already gives Govt Demand Note the budget-head DOA, so only the mandatory documents and checks need confirming, unless the business names an extra approval.",
  "wireframe": "inv-04 for Govt Demand Note shows Pune Municipal Corporation demand PMC/PT/2026-27/118844 dated 12-Sep-2026 for Rs 46,200.00 on one site, without GST. inv-08 lists the HLD 6.2.7 columns as its bulk template, and the category card on inv-03 carries the marker.",
  "ask": "PHD team, P2P team, Business finance",
  "refs": "Invoicing HLD 6.1, 6.2.7, 6.3.1, 6.3.2, 6.3.16, open point 8"
 },
 {
  "id": "INV-12",
  "mod": "inv",
  "area": "Validation and review",
  "keys": [
   "Whether an RPA bot does the PHD checklist validation, or the portal shows an exception dashboard only (HLD 5.9 client note)"
  ],
  "title": "PHD checklist validation: an RPA bot, or portal rules with an exception dashboard",
  "context": "Every non-PO invoice is checked against an 18-point checklist (Invoicing HLD 5.4: invoice title, date and number, GSTINs, amounts, signature, period and so on) plus the rules of its category. Today the AP team and the PHD team (the team that processes Property Manager invoices and keeps the PM masters; the sources do not expand the abbreviation) do this with help from OCR and RPA bots, software robots that operate other systems' screens (HLD 2.2; BRD landlord GST background: 'manual/RPA' WebADI uploads). A client note on HLD 5.9 asks whether an RPA bot is needed for the non-PO PHD checklist validation and says that, if not, the portal should have a dashboard for exceptions and reconciliation. The HLD does not decide this, and HLD 5.4 also leaves open whether checks 12 (signature) and 13 (invoice form) are automated or confirmed by a reviewer.",
  "question": "Should the portal itself run the checklist on the OCR output and send only exceptions to the PHD and AP teams, or should an RPA bot run the checklist while the portal shows an exception dashboard? If a bot is wanted, which existing bot is it and which team maintains its rules?",
  "options": [
   {
    "option": "Portal rules, no bot: the portal runs every machine-checkable check on the OCR output and sends failures, plus checks 12 and 13, to the PHD / AP work queue.",
    "effect": "One system holds the rules, which can be changed as configuration, and the submitter gets the result at once when they validate. The checklist logic is built in the portal rather than reused from an existing bot."
   },
   {
    "option": "RPA bot runs the checklist: the portal passes the OCR output to the bot and shows its pass / fail results and exceptions on a dashboard.",
    "effect": "Reuses automation Airtel already runs today (HLD 2.2, BRD), but the rules live in two places, the submitter cannot get an immediate result unless the bot answers in real time, and bot downtime stops validation."
   },
   {
    "option": "Bot first, portal later: keep the existing bot at go-live and move the rules into the portal in a later phase.",
    "effect": "General practice: shortens the first release if the bot already covers the checklist, at the cost of building and testing the rules twice and a later migration."
   }
  ],
  "suggested": "Option 1, portal rules: the wireframe already has the submitter's Validate run the checklist before submission, which needs an immediate answer, and one configurable rule set is easier to keep correct; the exception dashboard the client note asks for is the work queue in either case.",
  "wireframe": "The wireframe assumes option 1: Validate runs checks 1 to 11 and 14 to 18 on the OCR output before submission (inv-04, inv-05), the PHD / AP reviewer confirms checks 12 and 13 on inv-14, and invoices the system cannot decide wait in the manual queue on inv-13.",
  "ask": "P2P team, PHD and AP teams, IT team (owner of the existing bots)",
  "refs": "Invoicing HLD 5.9 (client note); HLD 5.4 (checklist and note on checks 12 and 13); HLD 2.2; BRD Landlord GST background; BRD Rush as-is process"
 },
 {
  "id": "INV-13",
  "mod": "inv",
  "area": "Validation and review",
  "keys": [
   "RFI reason list to be confirmed (as used in the PO portal)"
  ],
  "title": "RFI reason list: the reasons a reviewer picks when returning an invoice",
  "context": "An RFI (request for information) sends an invoice back to its submitter with a reason. The HLD has RFI as a status (Invoicing HLD 5.8, Table 5) and says a checklist or category failure can be returned as an RFI (HLD 5.9), but neither the BRD nor the HLD lists the reasons. The wireframe follows Airtel's existing PO Partner Portal, as agreed in the October 2026 form review: the reviewer picks a reason from a list and adds comments, the submitter can only re-upload the invoice copy and supporting documents, and wrong invoice data is rejected and submitted again as a new invoice. The PO portal's actual list has not been shared, so the wireframe uses five sample reasons: signature or stamp missing, invoice form not acceptable (partly handwritten), invoice copy not readable, supporting document missing or incorrect, and other.",
  "question": "Which RFI reasons should the non-PO portal offer: the PO portal's list as it is (please share it), or a list adapted for non-PO invoices? Should 'Other' with free-text comments be allowed?",
  "options": [
   {
    "option": "Reuse the PO portal's RFI reason list unchanged.",
    "effect": "Vendors who use both portals see the same reasons and one list is maintained; any PO-specific reasons would show but not apply, and non-PO documents such as an NFA or demand note have no reason of their own."
   },
   {
    "option": "Start from the PO portal list and adapt it: drop PO-specific reasons and add the non-PO supporting documents (NFA, demand note, challan, approval email; HLD 5.5).",
    "effect": "Keeps the wording vendors know while covering non-PO cases; the AP and PHD teams review the list once before build."
   },
   {
    "option": "Use a short non-PO list built only from what needs a reviewer, as the wireframe sample does (checks 12 and 13, unreadable copy, missing document, other).",
    "effect": "Consistent with the rule that RFIs cover only reviewer judgement; the wording may differ from the PO portal."
   },
   {
    "option": "No list: free-text comments only.",
    "effect": "Simplest to build, but RFIs cannot be counted or reported by reason, and comments vary from reviewer to reviewer."
   }
  ],
  "suggested": "Option 2, adapted PO list: the design already follows the PO portal's RFI pattern, and adding the non-PO supporting documents makes the list complete while vendors see familiar wording.",
  "wireframe": "The RFI dialog on inv-14 offers the five sample reasons (INV.RFI_REASONS in inv-data.js) with a comments box; the submitter sees the reason and comments and re-uploads documents on inv-10.",
  "ask": "AP team and PHD team, with the owners of the PO Partner Portal",
  "refs": "Invoicing HLD 5.8 (Table 5), 5.9, 5.5; HLD open point 9; October 2026 form review decision (wireframe)"
 },
 {
  "id": "INV-14",
  "mod": "inv",
  "area": "Validation and review",
  "keys": [
   "Reverse-charge time limit for advocate invoices: 45 days (checklist 17) or 60 days (Legal rules)"
  ],
  "title": "Reverse-charge time limit for advocate invoices: 45 or 60 days",
  "context": "Under reverse charge (RCM), Airtel rather than the supplier pays the GST on the service. Checklist item 17 (the BRD checklist, transcribed in Invoicing HLD 5.4) allows an invoice date no more than 45 days before the booking date for services on a configurable reverse-charge list. The Legal category rules say advocate invoices fall under reverse charge and must be processed within 60 days of the invoice date (BRD Legal invoices; HLD 6.3.6), so the two limits conflict for advocates, and HLD open point 1 asks which applies. Example: advocate invoice LEX/26/0233 dated 28-Aug-2026 (Rs 3,50,000.00, now under DOA approval) can be booked until 12-Oct-2026 under a 45-day limit, or until 27-Oct-2026 under 60 days.",
  "question": "Which limit applies to advocate invoices under reverse charge, 45 or 60 days? Is it counted from the invoice date to the date the invoice is submitted on the portal, or to the date it is booked in Oracle?",
  "options": [
   {
    "option": "45 days for every reverse-charge service, advocates included (checklist 17).",
    "effect": "One rule for all services; advocate invoices between 46 and 60 days old are blocked although the Legal rules allow them."
   },
   {
    "option": "60 days for advocate invoices and 45 days for the other reverse-charge services, held per service in the reverse-charge list.",
    "effect": "Each rule follows its source; the list carries a limit per service, which the Tax team maintains as configuration."
   },
   {
    "option": "60 days for every reverse-charge service.",
    "effect": "One rule and more time for submitters; the other services lose the tighter 45-day control the checklist sets."
   }
  ],
  "suggested": "Option 2, limit per service: the Legal rule was written for advocate invoices specifically and the checklist rule for the general list, and a per-service limit lets the Tax team change either value without a build.",
  "wireframe": "inv-22 (Checklist lists tab) holds the reverse-charge list with a maximum number of days per service and shows 45 for advocate services; inv-05 and inv-14 apply checklist 17 only when the invoice is marked as reverse charge.",
  "ask": "Tax team, Legal team",
  "refs": "Invoicing HLD open point 1; HLD 5.4 (checklist item 17); HLD 6.3.6; HLD 7.4 (reverse-charge list owned by Finance and Tax); BRD Legal invoices"
 },
 {
  "id": "INV-15",
  "mod": "inv",
  "area": "Validation and review",
  "keys": [
   "GSTR-2A check for previous-year invoices: whether the PM rule, the Central ToCo rule or both apply"
  ],
  "title": "GSTR-2A / 2B check for older invoices: the 30-September rule, the one-year rule or both",
  "context": "GSTR-2A / 2B are GST statements of the invoices suppliers have reported against Airtel's GSTIN (HLD glossary); looking an old invoice up there confirms the supplier reported it before Airtel books it. The BRD (Central ToCo, Bandwidth and Local ToCo details, and again in the landlord GST steps) checks an invoice of the previous financial year (April to March) in GSTR-2A only when it is received after 30 September of the current year; the Central ToCo input format instead checks any invoice dated more than one year ago and rejects it if it is not found. The two catch different invoices: Bandwidth Domestic invoice MFL/BLR/25/0498 dated 30-Apr-2025 (NPO-2627-004577), rejected on 11-Sep-2026, passes the 30-September rule but fails the one-year rule. Invoicing HLD 5.5 and 6.2.1 already state both rules, yet HLD open point 2 asks whether one or both apply, and a client note on HLD 5.5 says the control covers all tax invoices.",
  "question": "Should both rules apply to every Property Manager tax invoice, or only one of them (and then which, for which sub-categories)? Do the same rules apply to tax invoices booked in AP, as the client note on HLD 5.5 suggests?",
  "options": [
   {
    "option": "Both rules for all tax invoices, as HLD 5.5 and 6.2.1 already state.",
    "effect": "Strictest: catches previous-year invoices sent late and any invoice over a year old; more invoices need a GSTR lookup and the Tax team's GSTR data must be current."
   },
   {
    "option": "The 30-September rule only.",
    "effect": "Fewer lookups; an invoice over a year old received between April and September, such as MFL/BLR/25/0498, is booked without a GSTR check."
   },
   {
    "option": "Rule by sub-category: the one-year rule for Central ToCo, the 30-September rule for the other Property Manager sub-categories.",
    "effect": "Follows each source literally; the configuration holds a rule per sub-category, and invoices of the same age get different outcomes in different categories."
   }
  ],
  "suggested": "Option 1, both rules: the HLD body already applies both, the client note extends the control to all tax invoices, and each rule covers a gap the other leaves, so dropping either lets some old invoices through.",
  "wireframe": "inv-22 (GSTR-2A / 2B tab) applies both rules to tax invoices; the rejected invoices report (inv-25?r=rejected) shows NPO-2627-004577 rejected under the one-year rule, and inv-14 lists the 30-September check among the Property Manager checks.",
  "ask": "Tax team, PHD team",
  "refs": "Invoicing HLD open point 2; HLD 5.5 (with client note), 5.9, 6.2.1; BRD Central ToCo / Bandwidth / Local ToCo details and Landlord GST steps ('Old FY invoice'); PM input format Central ToCo, WebADI sheet (invoice date note)"
 },
 {
  "id": "INV-16",
  "mod": "inv",
  "area": "Booking in Oracle",
  "keys": [
   "Central ToCo duplicate bypass (flag Y): whether a control or approval is needed before it is used"
  ],
  "title": "Central ToCo duplicate bypass (flag Y): automatic, or only after a review or approval",
  "context": "Central ToCo invoices come from the national tower companies (ToCo: tower company, for example Indus Towers) and are booked line by line in Oracle Property Manager (PM), whose upload has a validation bypass flag. The BRD and the Central ToCo input format say to upload first with the flag N and, if PM answers 'Duplicate Invoices' or 'Potential Duplicate Invoices', to upload again with Y so that PM accepts the lines; any other error removes the whole invoice from the upload (Invoicing HLD 5.5, 6.2.2). In the HLD design this re-attempt runs automatically, after the portal's own duplicate check has passed, so nobody looks at the PM warning before it is overridden; HLD open point 16 asks whether a control or approval is needed first. Example: Indus Towers invoice IND/26/AUG/77120 (NPO-2627-004640, Delhi) got 'Potential Duplicate Invoices' on line 12 and was booked on the second attempt with Y.",
  "question": "May the portal re-attempt a Central ToCo upload with the bypass flag Y automatically, or must a team review or approve the flagged lines first? If a review is needed, which team does it, and is there an amount or line-count limit below which it can be skipped?",
  "options": [
   {
    "option": "Automatic bypass, logged: re-attempt with Y at once, record every bypass in the audit trail and the Duplicate bypass log, and review the log afterwards.",
    "effect": "No delay to Central ToCo bookings and matches the BRD rule; the control is after the fact, although the business owner still approves each booked PM invoice before payment (HLD 5.7)."
   },
   {
    "option": "Reviewer first: flagged lines wait in the PHD / AP queue until a reviewer confirms they are not real duplicates, then the portal re-attempts with Y.",
    "effect": "Stops a true duplicate before it is booked, but adds a manual step to every flagged invoice and puts the T+2 SLA for Property Manager invoices at risk."
   },
   {
    "option": "Automatic within limits: bypass automatically up to a configured amount or number of flagged lines per invoice, and send anything above it for review.",
    "effect": "General practice: routine cases keep moving and review effort goes to the large ones; the limits need an owner and periodic tuning."
   }
  ],
  "suggested": "Option 1, automatic bypass with a log: it is the rule the BRD and the Central ToCo format describe for today's uploads, the business owner still approves the booked invoice before payment, and Audit gets a complete list; move to option 3 if the log shows real duplicates getting through.",
  "wireframe": "inv-22 (Duplicate bypass tab) and inv-18 show the automatic re-attempt with Y; every bypass appears in the Duplicate bypass log (inv-25?r=bypass) and is counted on the Audit home page (inv-02).",
  "ask": "PHD team, AP team, GRC team",
  "refs": "Invoicing HLD open point 16; HLD 5.5, 6.2.2, 7.3; BRD Property Manager booking overview (duplicate billing check with the Y flag; exception handling during upload); PM input format Central ToCo, WebADI sheet (VALIDATION BYPASS)"
 },
 {
  "id": "INV-17",
  "mod": "inv",
  "area": "Booking in Oracle",
  "keys": [
   "Cut-off and GL date rules for portal bookings at month-end"
  ],
  "title": "Month-end cut-off and GL date for portal bookings",
  "context": "At month-end the AP period in Oracle is closed, after which nothing more can be accounted in that month. The BRD says Property Manager (PM) bookings have no closing activity and AP bookings follow the closing activity used for PO invoices on the ERP side (BRD Property Manager booking overview, point 15). A client note on HLD 3.2 adds that there is no impact on PM, that AP works as for PO invoices, and that an invoice uploaded after AP closure takes the 1st of the next month as its GL date (the date that decides the accounting month), while asking to check this against the PO process; HLD open point 13 still asks for the cut-off and GL date rules. For example, an AP invoice approved on the portal on 30-Sep-2026 but imported after the SEP-26 AP period closes would carry GL date 01-Oct-2026 and count as an October expense.",
  "question": "What GL date should a portal AP booking take while the period is open and after it closes, and should the portal stop sending AP invoices at a cut-off before close? Can you confirm that Property Manager bookings need no cut-off?",
  "options": [
   {
    "option": "Follow the PO process: no portal cut-off; AP bookings after AP closure take the 1st of the next month as GL date; PM bookings continue unchanged.",
    "effect": "Matches the client note and needs no new control, but invoices approved in the last days of a month may land in the next month's books without anyone deciding it."
   },
   {
    "option": "Configurable cut-off: from a set date and time before AP closure, the portal holds approved AP invoices and books them in the next period.",
    "effect": "General practice: gives the AP team a clean close and a known list of carried-over invoices; submitters see a short delay at month-end."
   },
   {
    "option": "Pre-close run: just before AP closure, the portal runs an extra import for invoices already approved so they land in the closing month.",
    "effect": "General practice: more expenses booked in the right month; needs the AP close calendar shared with the portal and coordination with the Oracle ERP team."
   }
  ],
  "suggested": "Option 1, follow the PO process: it is what the BRD and the client note on HLD 3.2 describe, and the portal only needs to read the AP period status from Oracle to show the GL date it used; add option 3 if Finance wants more expenses in the closing month.",
  "wireframe": "inv-18 (Month-end tab) shows the SEP-26 AP period closed on 30-Sep-2026 at 20:00 (a sample time), AP bookings taking GL date 01-Oct-2026 and PM bookings continuing; inv-11 shows a GL date on each booked invoice without a month-end rule behind it.",
  "ask": "AP team, Oracle ERP team",
  "refs": "Invoicing HLD open point 13; HLD 3.2 (client note); BRD Property Manager booking overview, point 15 (month-end closing activity)"
 },
 {
  "id": "INV-18",
  "mod": "inv",
  "area": "Reports",
  "keys": [
   "What the Airtel Infrastructure OPEX Management Report is used for"
  ],
  "title": "Airtel Infrastructure OPEX Management Report (Text) - All Circle: what it is used for",
  "context": "The BRD lists this Oracle EBS report among the programs and reports of today's non-PO process (BRD Property Manager booking overview, point 11 'ERP Programmed and configuration') without describing it, and the Invoicing HLD carries it as 'use to be confirmed' (HLD 8.2, Table 13). The name suggests an all-circle text extract of infrastructure operating expenses (opex, such as tower rent and energy) from Oracle, but no source says whether it is an input to processing, a check after booking or a management report. Without that, the design cannot tell whether the portal must read it, replace it or leave it alone.",
  "question": "What is this report used for today: which team runs it, at which step, and how often? Should the portal use it, replace it or leave it unchanged?",
  "options": [
   {
    "option": "It is an input or check during processing: the portal reads the same data from Oracle.",
    "effect": "Adds an Oracle data feed to the integration design (HLD 7.2) and a validation or derivation step; the report's fields and refresh frequency are needed."
   },
   {
    "option": "It is a reporting or reconciliation output after booking: a portal report replaces it or links to it.",
    "effect": "Its fields move into a portal report such as GL actualization status or Portal vs ERP reconciliation; processing does not change."
   },
   {
    "option": "It stays in Oracle as today, with no portal role.",
    "effect": "No build; it is kept in the portal's list of Oracle reports for reference, or removed from it."
   }
  ],
  "suggested": "Option 3 as the working assumption: no step in the HLD flow depends on it, so the build can go ahead without it, but the AP or PHD team should share a sample output to confirm.",
  "wireframe": "inv-20 lists the report in its 'Oracle EBS reports used in the process' table with this question in place of a use; no portal step uses it.",
  "ask": "AP team, PHD team, Oracle ERP team",
  "refs": "Invoicing HLD 8.2 (Table 13); BRD Property Manager booking overview, point 11 (ERP programs and configuration)"
 },
 {
  "id": "INV-19",
  "mod": "inv",
  "area": "Reports",
  "keys": [
   "What the Airtel Payment Status - Daily Pending Response report is used for"
  ],
  "title": "Airtel Payment Status - Daily Pending Response Report to Each Person: what it is used for",
  "context": "The BRD lists this Oracle EBS report among the programs and reports of today's non-PO process (BRD Property Manager booking overview, point 11 'ERP Programmed and configuration') without describing it, and the Invoicing HLD carries it as 'use to be confirmed' (HLD 8.2, Table 13). The name suggests a daily list, sent to each person, of items waiting for that person's response, such as invoices pending approval or payment action, but no source says so. The portal already plans its own pending-invoices report, notifications and SLA escalation (HLD 5.7, 5.10, 8.1) and reads approval, hold and payment status from Oracle (HLD 7.2, touch point 5), so the answer decides whether this report is replaced, kept or used as a data source.",
  "question": "What does this report contain, who receives it and what do they do with it? Should the portal replace it, use its data, or leave it as it is?",
  "options": [
   {
    "option": "It reminds approvers of Property Manager invoices waiting in their Oracle approval bin: the portal reads that pendency and shows it in its pending report and escalations.",
    "effect": "Property Manager invoices are approved in Oracle after booking (HLD 5.7), so the portal needs approver-wise pending status from Oracle; the Oracle report can then be retired or kept as a backup."
   },
   {
    "option": "It tracks payment actions pending with internal users: the portal's planned status feed covers it for submitters, and the report stays in Oracle for internal users.",
    "effect": "No build beyond the planned status read-back; internal users keep their daily report."
   },
   {
    "option": "It is replaced by portal notifications and the pending invoices report.",
    "effect": "One place for pendency and escalation; today's recipients move to portal notifications before the report is switched off."
   }
  ],
  "suggested": "Option 3, replace it, if it covers invoices the portal routes: the portal already plans per-person pending lists and SLA escalation, so a second daily list from Oracle would duplicate them; otherwise option 2.",
  "wireframe": "inv-20 lists the report in its 'Oracle EBS reports used in the process' table with this question in place of a use; the portal's own pending report and notifications are on inv-25?r=pending and inv-24.",
  "ask": "AP team, PHD team, Oracle ERP team",
  "refs": "Invoicing HLD 8.2 (Table 13), 8.1, 7.2 (touch point 5), 5.7, 5.10; BRD Property Manager booking overview, point 11 (ERP programs and configuration)"
 },
 {
  "id": "INV-20",
  "mod": "inv",
  "area": "Reports",
  "keys": [
   "What the Airtel PN opex group records report is used for"
  ],
  "title": "Airtel PN opex group records report: what it is used for",
  "context": "The BRD lists this Oracle EBS report among the programs and reports of today's non-PO process (BRD Property Manager booking overview, point 11 'ERP Programmed and configuration') without describing it, and the Invoicing HLD carries it as 'use to be confirmed' (HLD 8.2, Table 13). The name may relate to the Group ID under which Property Manager (PM) invoice documents are uploaded to OWCC (Oracle WebCenter Content, the document store) before 'Airtel Send for Approval' moves the invoice to the approver (BRD booking steps 7 and 8; client note on HLD 2.2: 'Group id generated for PM invoice'), but no source says so. If this report is how the Group ID or its invoice list is obtained today, the portal needs the same information to attach documents and release PM invoices for approval.",
  "question": "What does this report list, which team uses it and at which step? In particular, is it how the Group ID for PM invoice attachments is obtained today?",
  "options": [
   {
    "option": "It lists the PM invoices under each Group ID, and the portal keeps that list itself because it creates the booking batches.",
    "effect": "The Oracle report is not needed for portal invoices; the portal shows the Group ID per batch and per invoice."
   },
   {
    "option": "It is how the Group ID is obtained from Oracle today, so the portal reads the Group ID back after each PM booking.",
    "effect": "Adds a read-back step between the PM booking and the OWCC upload; documents cannot be attached until the Group ID returns."
   },
   {
    "option": "It is a reporting output unrelated to booking and stays in Oracle.",
    "effect": "No build; kept in the portal's list of Oracle reports for reference, or removed from it."
   }
  ],
  "suggested": "Option 1, the portal keeps the Group ID: the portal creates each booking batch, so it can hold the Group ID itself; the Oracle ERP team should confirm the Group ID is not generated only in Oracle, which would make it option 2.",
  "wireframe": "inv-20 lists the report in its 'Oracle EBS reports used in the process' table with this question in place of a use; inv-18 and inv-11 show a Group ID per PM batch and invoice without saying where it comes from.",
  "ask": "PHD team, Oracle ERP team",
  "refs": "Invoicing HLD 8.2 (Table 13), 2.2 (client note), 4.3, 7.2 (touch point 8); BRD Property Manager booking overview, points 7, 8 and 11"
 }
];
