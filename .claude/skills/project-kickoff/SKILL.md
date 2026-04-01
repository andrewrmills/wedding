# Project Kickoff

## Purpose

Use this skill at the very start of a new project — before writing any code — to review
the generated documentation, identify gaps, and establish a clear plan.

## When to use it

- First session on a new project
- After a long break where context has been lost
- After a significant change in direction or scope

## Steps

### 1. Read all project documents

In order:

1. CLAUDE.md — project context and working preferences
2. docs/PROJECT_BRIEF.md — what and why
3. docs/PRODUCT_REQUIREMENTS.md — what needs to be built
4. docs/TECHNICAL_SPEC.md — how it will be built
5. docs/TASKS.md — current task list
6. docs/RISKS_ASSUMPTIONS_DEPENDENCIES.md — known constraints

### 2. Identify gaps and problems

After reading, note:

- Sections that are still placeholder or incomplete
- Contradictions between documents
- Requirements that are vague or untestable
- Technical decisions that have not yet been made
- Risks that are not yet captured

### 3. Ask clarifying questions

Before proposing anything, ask the user to resolve the most important gaps.
Prioritise questions by impact: ask about things that would change the architecture
before asking about things that only affect implementation detail.

Limit to 3–5 questions at a time. Too many questions at once is overwhelming.

### 4. Propose a first task list

Based on the documents and answers, propose a concrete Phase 1 task list:

- Break work into the smallest useful steps
- Order by dependency and risk (uncertain or risky items should be tackled early)
- Be explicit about what is in Phase 1 vs. deferred to backlog

### 5. Get confirmation before starting

Do not write any code until the user has confirmed the task list.
Once confirmed, update docs/TASKS.md and begin with the first task.

## Output

- A summary of gaps found and questions resolved
- An updated docs/TASKS.md with a concrete Phase 1 task list
- A confirmed starting point for development
