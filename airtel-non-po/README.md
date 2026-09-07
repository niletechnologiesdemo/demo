# Non-PO Automation Platform — interactive mockup

Open `index.html` in a browser. No build step, no server, no dependencies.

Built on the Airtel Partner Portal design system taken from `../ui-design-reference`
— the same `airtel-standardization.css`, `selfcare.css`, `vendor.css` and `progress.css`,
the Tondo typeface and the `airtel-icons` font, all unchanged.

## What is in it

**Provisioning & Actualization** — internal, for GPA / ACE / CFR (14 screens)

| Route | Screen |
|---|---|
| `#/i/dashboard` | Provision overview — the register, with URN, consumption and ageing |
| `#/i/new` | Create provision — three steps: input, validation, accounting & submit |
| `#/i/bulk` | Bulk upload with row-level results and partial acceptance |
| `#/i/approvals` | DOA approval inbox |
| `#/i/provision/:id` | Provision detail — URN key, journal, actualization, audit trail |
| `#/i/posting` | Oracle posting queue, import rejections and retry |
| `#/i/actualization` | Invoices booked, and the provisions they settle |
| `#/i/match` · `#/i/match/:ref` | Match worklist — fingerprint, relaxation, ranked candidates, force match |
| `#/i/prepaid` | Multi-period split, prepaid unwind and deferment |
| `#/i/ageing` | Ageing buckets, escalation ladder, hold and force closure |
| `#/i/flash` | Real-time TB / FSG financial flash |
| `#/i/scenarios` | Scenario router — 171 straight-through against 26 rule-driven |
| `#/i/reports` | Operational reports and provision-vs-actual |
| `#/i/admin` | Masters and rules — items, vendors, BU hierarchy, allocation %, period rules |

**Partner Portal** — external, for vendors (8 screens)

| Route | Screen |
|---|---|
| `#/p/dashboard` | Partner home |
| `#/p/expected` | What Airtel is expecting — provisions seeded with their URN |
| `#/p/category` | Category selection across the PM and AP modules |
| `#/p/submit` | Single invoice submission — form varies by category |
| `#/p/bulk` · `#/p/batches` · `#/p/batch/:id` | Bulk upload and per-row batch results |
| `#/p/ocr/:ref` | OCR / IRN review — extracted against supplied, with confidence |
| `#/p/invoices` · `#/p/attention` | Invoice list and the queue that needs the vendor to act |
| `#/p/invoice/:ref` | Status tracker, validation failures and SLA |

## The demo thread

The mockup holds live state in memory, so actions carry across screens. From the
landing page, follow the numbered walkthrough: raise a provision, approve it, watch
the URN appear in the register, submit the invoice as the partner, then match it —
the provision moves to partial and the balance stays open.

Reload resets everything to the seed data.

## Files

```
index.html            shell — loads the Airtel stylesheets, then the app
css/nonpo.css         the only new stylesheet: components the PO portal never needed
js/data.js            masters, provisions, invoices, batches, trial balance
js/ui.js              UI kit — tables, KPIs, pills, URN, journals, timeline, modal
js/internal.js        the 14 internal screens
js/partner.js         the 8 partner screens
js/app.js             state, hash router, landing page
```

## Notes on the reference assets

Two things in the inherited stylesheets needed working around rather than editing,
so `../ui-design-reference` stays untouched:

- `vendor.css` sets `.panel { display:none }` for accordions and pins
  `.dataTables_wrapper table` to exactly 500px. Anything this mockup adds is
  namespaced `np-` and the table cap is released in `nonpo.css`.
- The `airtel-icons` font and the class list in `airtel-standardization.css` are out
  of sync — `.icon-outlined-download` renders a camera, `.icon-outlined-user` a desk.
  `nonpo.css` binds the glyphs this mockup uses to their real codepoints as `.np-i-*`.

## Where the content comes from

BRD Non-PO 25 Aug 26 · Partner Portal details v2 · consolidated process flows ·
GPA Input Tracking Sheet Apr'26. Codes, GLs, scenario counts,
escalation thresholds and deferment percentages are the real ones from those documents.

Where the source documents leave something undecided, the screen says so and cites the
question number from the Clarification Register rather than inventing an answer.
