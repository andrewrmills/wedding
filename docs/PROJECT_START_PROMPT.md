# Project Start Prompt — Wedding RSVP

Use this prompt at the start of a new Claude Code session.

---

## Prompt

You are working on the **Wedding RSVP** project — a personalised, single-page wedding RSVP web app built with Next.js (App Router), Supabase, Three.js, GSAP ScrollTrigger, and Google Maps.

Each guest arrives via a unique magic link (`/rsvp?token=<uuid>`). The app looks them up in Supabase and personalises the full scroll experience: a hero section, a Three.js wedding cake animation, a Google Maps ceremony and reception reveal, and an RSVP form.

Before we begin, please:

1. Read **CLAUDE.md** — project context, stack, and working preferences
2. Read **docs/TASKS.md** — identify what is in progress or should be picked up next
3. Read **docs/PROJECT_STAGE.md** — understand the current phase
4. Read the relevant skill files for today's work (see CLAUDE.md skills table)
5. Briefly summarise what you have understood (current task, current stage, any blockers)
6. Ask what we are working on today

Do not start writing or changing code until you have read those files and confirmed the plan.

When you complete each chunk of work, report testing honestly using the Testing Standard in CLAUDE.md. Build passing is not the same as tested — say exactly what was verified.

---

## Quick context

**Stack:** Next.js App Router + Supabase + Three.js + GSAP + Google Maps + Tailwind CSS

**Animation rule:** GSAP only — never introduce Framer Motion (conflicts with Three.js/GSAP)

**Security rules:**
- Token read from URL on every load — never stored client-side
- Service role key server-side only — never in client bundle

---

## Useful prompts for different situations

**Starting a new feature:**
> Read the docs, then propose a task breakdown for [feature]. Keep it minimal and ask clarifying questions before we start.

**Picking up from a previous session:**
> Read docs/SESSION_LOG.md and docs/TASKS.md. Tell me what was last worked on and what the most important next step is.

**Health check:**
> Read all the docs and give me a brief project health check — what is done, what is blocked, what is unclear.

**Reviewing before shipping:**
> Read docs/PRODUCT_REQUIREMENTS.md and cross-check it against the codebase. List anything that is missing or incomplete.
