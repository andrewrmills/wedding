# Product Requirements — Wedding RSVP

**Status:** Draft
**Last updated:** 2026-04-02

---

## Overview

A personalised, single-page wedding RSVP web app. Each guest arrives via a unique magic link. The app looks up their record in Supabase and personalises the full page experience. The guest submits their RSVP via an inline form. Responses are written to Supabase server-side using the service role key.

**Goal:** Every invited guest can open their magic link, experience a personalised scroll journey, and submit or update their RSVP with minimal friction.

---

## Goals

- Personalise the entire page experience based on the guest's record (name, type)
- Collect RSVP responses (attending, dietary requirements, beer preference) reliably
- Allow guests to update their response at any time by revisiting their link
- Deliver a memorable, scroll-driven visual experience (cake animation + map reveal)
- Be fully functional on mobile — thumb-friendly form, responsive canvas

## Non-goals

- No admin interface — hosts use Supabase directly
- No email or notification sending
- No login, session management, or cookies
- No support for plus-ones or group RSVPs — one record per magic link

---

## Functional requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| F1 | Read `token` from URL query param on page load | Must have | Token is the only auth mechanism |
| F2 | Look up invitee in Supabase by token | Must have | Server-side via service role |
| F3 | Show friendly error if token is invalid or missing | Must have | "We couldn't find your invitation. Please check your link or contact us." |
| F4 | Show loading state during initial token lookup | Must have | Spinner or skeleton |
| F5 | Hero section: personalised heading based on guest type | Must have | Aus/Pom/Kiwi → different heading; override if `welcome_message` is non-null |
| F6 | Hero section: personalised subtitle with guest's first name | Must have | "We can't wait to celebrate with you, [Name]." |
| F7 | Hero section: scroll prompt at bottom | Should have | Animated chevron or "scroll down" |
| F8 | Three.js cake animation: model loads from `/public/models/wedding-cake.glb` | Must have | Placeholder comment where model is referenced |
| F9 | Cake animation: GSAP ScrollTrigger pins canvas; tip left over first 60% of scroll | Must have | Z-axis 0° → -30° |
| F10 | Cake animation: smash over remaining 40% — drops off screen with Z push to -60° | Must have | Screen-shake CSS animation triggers at impact |
| F11 | Ceremony section: venue name, address, date/time (placeholder content) | Must have | Developer to replace placeholders |
| F12 | Ceremony section: Google Maps embed with custom "X" marker, greyscale style | Must have | Non-interactive; Maps JS API (not iframe) |
| F13 | Reception route reveal: animated polyline drawn on scroll via ScrollTrigger | Must have | Dotted/dashed line drawn incrementally |
| F14 | Reception route reveal: second "X" marker drops on completion; reception details shown | Must have | Placeholder coordinates and details |
| F15 | RSVP form: attending radio ("Nah, yeah" / "Yeah, nah") | Must have | Pom guests get translation labels and a note |
| F16 | RSVP form: dietary requirements textarea — conditional on attending | Must have | Hidden if "Yeah, nah" selected |
| F17 | RSVP form: beer vote radio (5 options + Other with text input) — conditional on attending | Must have | Hidden if "Yeah, nah" selected |
| F18 | RSVP form: submit validates attending selection; validates beer if attending | Must have | Inline validation errors |
| F19 | RSVP form: submit writes to Supabase via Server Action / API route using service role | Must have | Updates `rsvp_attending`, `dietary_requirements`, `beer_choice`, `beer_other_details`, `updated_at` |
| F20 | RSVP form: success state replaces form after submission | Must have | Different message for attending vs not attending |
| F21 | RSVP form: "Change my answer" link re-shows form pre-populated | Must have | Editable at any time via the same magic link |
| F22 | On page load, pre-populate RSVP form if guest has an existing response | Must have | Read from `rsvp_attending`, `beer_choice`, etc. |
| F23 | Token never stored in localStorage or any client-side persistent storage | Must have | Read from URL on every load |
| F24 | Service role key never exposed to the client | Must have | Only used in Server Actions / API routes |

---

## Non-functional requirements

| ID | Requirement | Target | Notes |
|----|-------------|--------|-------|
| N1 | Mobile responsive | All breakpoints | Three.js canvas resizes correctly; form is thumb-friendly |
| N2 | Performance | Acceptable on mobile | Canvas and GSAP animations must not degrade scroll on low-end devices |
| N3 | Security | RLS enforced on `invitees` | SELECT and UPDATE scoped to matching token via `app.token` setting |
| N4 | Platform support | Modern mobile and desktop browsers | Chrome, Safari, Firefox |

---

## Primary user flow

1. Guest opens magic link: `https://yourdomain.com/rsvp?token=<uuid>`
2. App reads token, queries Supabase — loading state shown
3. If token invalid: friendly error state
4. If token valid: personalised hero renders with guest's welcome message and name
5. Guest scrolls: cake tips left, then smashes off screen
6. Guest continues scrolling: ceremony details appear, map loads with "X" marker
7. Guest scrolls further: animated route draws to reception, second marker drops, reception details appear
8. Guest reaches RSVP form: fills in attending, dietary needs, beer preference
9. Guest hits "Send it": form validates, submits to Supabase, success message replaces form
10. Guest returns via same link at any time: form pre-populated with their saved response

---

## Acceptance criteria

- [ ] Valid magic link loads and shows correct personalised content for that guest
- [ ] Invalid / missing token shows the error state, not a crash
- [ ] Cake animation tips and smashes on scroll with screen shake at impact
- [ ] Google Maps loads with greyscale style and ceremony "X" marker
- [ ] Route polyline animates incrementally on scroll; reception marker drops on completion
- [ ] RSVP form pre-populates on return visit
- [ ] Dietary and beer fields hide/show correctly based on attending selection
- [ ] Pom guests see translation labels and the italicised note
- [ ] Submit without attending selection shows validation error
- [ ] Submit while attending without beer selection shows validation error
- [ ] Successful submit writes correct fields to Supabase and shows success message
- [ ] "Change my answer" re-shows the pre-populated form
- [ ] All of the above work correctly on mobile

---

## Open questions

| Question | Owner | Status |
|----------|-------|--------|
| Are emojis in success copy ("🎉", "💛") kept or replaced per taste-skill ANTI-EMOJI policy? | Andrew | Open |
| Is the wedding cake `.glb` model available? | Andrew | Open |
| Are real venue names, coordinates, and event date/time available now? | Andrew | Open |
| Is the Supabase project already created? | Andrew | Open |
| Is the Google Maps API key provisioned? | Andrew | Open |
| Design direction: colours, fonts, aesthetic? | Andrew | Open |
