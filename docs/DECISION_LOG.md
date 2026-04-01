# Decision Log — mcw_bc_search

Record key technical and product decisions here so future contributors
(and future you) understand why things are the way they are.

---

## When to log a decision

- Choosing between two or more technical approaches
- Adopting or dropping a dependency, library, or tool
- Changing the data model or an API contract
- Deferring something intentionally (with a reason)
- Anything that prompted discussion before committing to an approach

---

## Format

### YYYY-MM-DD — Title of the decision

**Context:** Why this decision was needed. What problem were we solving?

**Decision:** What was decided and why.

**Alternatives considered:** What else was on the table and why it was not chosen.

**Consequences:** What this means going forward. Trade-offs accepted.

---

## Log

### 2026-04-01 — Project initialised with next-supabase template

**Context:**  
New project created: mcw_bc_search. Needed a starting point for development.

**Decision:**  
Use next-supabase as the base. 

**Alternatives considered:**  
Other templates or starting from scratch without a template.

**Consequences:**  
Committed to the conventions and tooling of next-supabase. See docs/TECHNICAL_SPEC.md for full stack details.
