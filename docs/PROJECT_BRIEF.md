# Project Brief — Wedding RSVP

A concise overview of what this project is, why it exists, and what it must achieve.

---

## In one sentence

A personalised, single-page wedding RSVP web app where each guest arrives via a unique magic link and is guided through a scroll-driven experience before submitting (or updating) their RSVP.

---

## What is this project?

A wedding RSVP web application built for Andrew & Gabbi's wedding. Every invited guest receives a unique magic link containing a UUID token. When they open the link, the app looks them up in Supabase and personalises the entire page — welcome message, name, and RSVP form — based on their record.

The page is a single continuous scroll: a personalised hero, a Three.js animated wedding cake sequence, a ceremony and reception map reveal, and a fully functional RSVP form. Guests can return via their magic link at any time to update their response.

**Type:** Web app
**Stack:** Next.js (App Router) + Supabase + Three.js + GSAP + Google Maps

---

## Goal

Deliver a memorable, fully personalised RSVP experience that guests actually enjoy. The hosts should be able to see all RSVP responses directly in Supabase — no admin panel is needed.

---

## Who is it for?

Wedding guests, split into three groups with different personalisation:

- **"Aus"** — Australian guests → heading: "Chut and Gabbi's Wedding"
- **"Pom"** — British guests → heading: "Gabbi and Andrew's Wedding" (with RSVP translation hints)
- **"Kiwi"** — New Zealand guests → heading: "Andrew and Gabbi's Wedding"

---

## What does it do?

- Reads a UUID token from the URL and looks up the guest in Supabase
- Renders a personalised hero with the guest's name and a type-based welcome message
- Presents a scroll-driven Three.js wedding cake animation (tip → smash)
- Reveals ceremony details and a Google Maps embed with an animated route to the reception
- Lets the guest submit an RSVP (attending, dietary requirements, beer preference)
- Allows the guest to return and update their RSVP at any time via the same link

---

## What does it NOT do?

- No admin interface — hosts manage invitee data directly in Supabase
- No email sending — magic links are distributed externally
- No login, sessions, or cookies — the token in the URL is the only mechanism
- No multi-wedding support — this is purpose-built for one event

---

## Key constraints

- Token must never be stored in localStorage or any client-side persistent storage
- All Supabase writes must use the service role key server-side — never exposed to the client
- Must be fully mobile responsive, including the Three.js canvas
- Deployed to Vercel; Google Maps API key must be restricted to the Vercel domain
- RLS must be enabled on the `invitees` table — access scoped to matching token only

---

## Success criteria

- [ ] Every guest can open their unique magic link and see a personalised page
- [ ] Every guest can submit an RSVP and it is written to Supabase
- [ ] Every guest can return via their link and update their RSVP
- [ ] Invalid or missing tokens show a friendly error state
- [ ] The page works correctly on mobile and desktop
- [ ] The Three.js cake animation plays correctly on scroll
- [ ] The Google Maps route reveal animates correctly on scroll

---

## Open questions

- Is the wedding cake `.glb` model available, or does it need to be sourced?
- Are venue names, addresses, coordinates, date, and time available to fill in now?
- Is the Supabase project already created, or does it need to be set up?
- Is the Google Maps API key provisioned and ready?
- Are there any brand/design assets (colours, fonts, imagery) already decided?
- Who will seed the `invitees` table with real guest data and tokens?
