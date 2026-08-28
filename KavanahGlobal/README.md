# Kavanah Global — concept build

Three connected products, one design system, all sample data.

| | What it is | Start here |
|---|---|---|
| **Front door** | Links to everything | `index.html` |
| **Design board** | Palette, type, components, all pulled from the crest | `moodboard.html` |
| **kavanahglobal.com** | Commerce — 31 products, cart, checkout, impact report | `com/index.html` |
| **kavanahglobal.org** | Wellness platform — 8 programmes, player, live schedule, Mood Journal, community, shelter, Sanctuary, donations | `org/index.html` |
| **Mobile app** | One unified app, 16 working screens | `app/index.html` |

## Running it

Open `index.html` directly and everything renders. For the full experience —
persistent cart, journal entries and enrolment state across pages — serve the
folder over HTTP:

```bash
node .claude/serve.js
```

Then open http://localhost:8321

(Chrome blocks `localStorage` on `file://`, so state falls back to in-memory
and resets on each page load. Nothing breaks, it just does not persist.)

## Structure

```
brand/      the two supplied crests
assets/     tokens.css, com.css, org.css, app.css
            icons.js  — inline SVG icon set, no emoji
            data.js   — all sample content (products, programmes, threads, journal…)
            ui.js     — cart, wishlist, enrolment, journal, toasts, reveal
            com.js    — .com header, footer, cart drawer, product card
            org.js    — .org top nav, app rail, programme + session cards
            app.js    — the 16 mobile screens
            img/      — 117 photographs, all stored locally
com/  org/  app/       the three products
```

## Notes

- All figures, products, programmes, reviews and community posts are illustrative
  sample data written for this concept.
- Photography is free-licence stock, downloaded and stored locally so nothing
  breaks offline. No watermarked or paid-tier images are used.
- No third-party brand marks appear on any product shot.
- Every page states plainly that the programmes are education and peer support,
  not medical treatment, and crisis numbers (911 / 988) appear in the footer
  sitewide and inline on shelter, community and grief pages.
