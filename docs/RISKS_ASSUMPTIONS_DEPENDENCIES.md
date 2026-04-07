# Risks, Assumptions, and Dependencies

Keep this document updated as the project evolves.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Wedding cake `.glb` model not available in time | Medium | Medium | Build with stub geometry; swap in real model when available |
| Real venue details not available before launch | Medium | Low | All placeholders are marked with `// TODO:` — straightforward to fill in |
| Google Maps API key not provisioned or restricted | Medium | High | Cannot build/test maps section without it; provision early |
| Three.js canvas performance issues on low-end mobile | Medium | Medium | Test on real devices early; simplify animation if needed |
| GSAP ScrollTrigger and Three.js canvas sizing conflicts on mobile | Medium | Medium | Validate canvas resize behaviour early in Phase 4 |
| Token enumeration — a determined user could guess UUIDs | Low | Medium | UUIDs are not guessable in practice; RLS ensures each token only exposes its own row |
| Supabase service role key accidentally bundled client-side | Low | High | Code review gate; verify with bundle analysis before shipping |

---

## Assumptions

- The Supabase project will be created (or already exists) before Phase 1 begins
- Invitee data (names, tokens, types) will be seeded into Supabase by the hosts
- Magic links will be distributed to guests externally (email, message) — not by this app
- Hosts will view RSVP responses directly in Supabase — no admin panel is needed for v1
- The app is built with placeholders for all real content (venues, dates, coordinates, model) and filled in before launch
- The wedding cake `.glb` model will be supplied by the developer; Phase 4 can proceed with stub geometry if needed
- GSAP is the sole animation library — Framer Motion must not be introduced

---

## Dependencies

| Dependency | Type | Risk level | Notes |
|------------|------|------------|-------|
| Supabase | Backend / DB | Medium | Project must be created and service role key available |
| Google Maps JavaScript API | External API | Medium | API key must be provisioned and domain-restricted |
| `@react-three/fiber` + `@react-three/drei` | npm | Low | Pinned; stable ecosystem |
| GSAP (ScrollTrigger) | npm | Low | Pinned; well-established |
| wedding-cake.glb | Asset | Medium | Must be supplied by developer before Phase 4 can be completed |
| Vercel | Hosting | Low | Free tier sufficient for this use case |
