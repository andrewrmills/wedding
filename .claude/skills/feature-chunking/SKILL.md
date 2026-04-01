# Feature Chunking

## Purpose

Use this skill when planning or implementing a non-trivial feature or change.
Explore first, break the work into reviewable chunks, implement one chunk at a time.

## When to use it

- Before starting any feature that touches more than 2–3 files or has uncertain scope
- When a task turns out to be larger than expected mid-session
- When the right approach is unclear and needs to be structured before any code is written

## Phase 1 — Planning pass (before writing any code)

1. **Read the relevant code** — understand what already exists
2. **Identify unknowns** — list anything unclear; resolve the most important ones first
3. **Propose a chunk breakdown** — smallest steps that are each independently verifiable
4. **Get confirmation where appropriate** — show the breakdown to the user before starting, especially when scope, trade-offs, or sequence matter; for obvious small plans, a brief summary is enough

Good chunk rules:

- Each chunk should be completable in one focused session
- Each chunk should produce a clear, verifiable result
- Do not mix concerns in one chunk ("build UI and wire up API" = two chunks)
- Order by dependency and risk — uncertain or risky items first, polish last

## Phase 2 — Implementation (one chunk at a time)

- Implement only the current chunk — do not get ahead
- Make the smallest change that achieves the goal
- Do not refactor code not directly related to the current chunk
- Do not add features or configuration that were not asked for
- Prefer editing existing patterns over introducing new ones
- If you notice an existing bug, flag it — do not fix it unless asked

Security rules (apply to every chunk):

- Never introduce SQL injection, XSS, command injection, or path traversal
- Validate input at system boundaries — trust internal code and framework guarantees
- Do not expose secrets or credentials in outputs or error messages

## Phase 3 — After each chunk

1. Run the build and type checks — confirm clean
2. If the chunk changed visible UI, manually verify the affected flow where practical
3. Report testing honestly using the testing-discipline format
4. Flag any new scope discovered — let it become its own chunk
5. If a significant decision was made, log it in DECISION_LOG.md

## Red flags — stop and check with the user

- The change is touching more files than the chunk plan anticipated
- The change requires modifying a data model or API contract
- The change introduces a new dependency
- Something feels architecturally wrong but you cannot explain it yet
