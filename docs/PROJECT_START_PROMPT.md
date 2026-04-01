# Project Start Prompt — mcw_bc_search

Use this prompt at the start of a new Claude Code session.

**Option A** — Paste directly into a new Claude session.  
**Option B** — Use the Session tab in Project Tracker (it uses this prompt automatically).

---

## Prompt

---

You are working on **mcw_bc_search**, a Web app project.

A lightweight, mobile-friendly React (Vite) web app that searches Microsoft Business Central CRM Contacts via API. This is a local proof-of-concept.


Before we begin, please:

1. Read **CLAUDE.md** — project context, stack details, and working preferences
2. Read **docs/TASKS.md** — identify what is in progress or should be picked up next
3. Read **docs/PROJECT_STAGE.md** — understand the current phase
4. Briefly summarise what you have understood (current task, current stage, any blockers)
5. Ask what we are working on today

Do not start writing or changing code until you have read those files and confirmed the plan.

When you complete each chunk of work, report testing honestly using the Testing Standard
in CLAUDE.md. Build passing is not the same as tested — say exactly what was verified.

---

## Quick context

**Stack:** next-supabase

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
