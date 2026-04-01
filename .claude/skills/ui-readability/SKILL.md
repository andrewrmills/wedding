# UI Readability

## Purpose

Use this skill when improving interface readability, visual hierarchy, colour contrast,
pill/badge/chip styling, or the overall warmth and human feel of the UI.

## Core Principles

- Prioritise readability over trendy low-contrast styling.
- Design for fast scanning, not just visual polish.
- Perceived contrast matters as much as formal contrast ratios.
- Light mode needs extra care because soft colours can look attractive but still read badly.
- Do not rely on colour alone to communicate meaning.
- The UI should feel intentional, calm, and premium — not icy, sterile, or generic.

## Practical Guidance

- Avoid pale grey text on pale coloured pills, badges, chips, or tinted surfaces.
- Avoid low-contrast text on blue, purple, green, or pink pastel backgrounds.
- On pills and badges, prefer stronger text contrast even if the background is soft.
- If a pill background is tinted, the text should be much darker or much lighter
  than the background — clear separation at a glance.
- Users should be able to read pills and status labels instantly without effort.
- Use spacing, size, weight, and hierarchy as well as colour.
- Reduce overuse of faint tinted cards and glassy floating surfaces.
- Prefer a more grounded, solid visual structure.
- Keep the interface modern, but make it feel human rather than like a generic AI dashboard.

## Light Mode Rules

- Check all pills, tags, badges, chips, and small labels in light mode first.
- Be suspicious of mid-grey text on pale backgrounds — it often fails at small sizes.
- Increase contrast before increasing decoration.
- Text that looks fine at large sizes often needs stronger contrast when small.
- Selected states, hover states, and disabled states must all remain readable.
- A pill with `text-green-400` text on a `bg-green-500/15` background fails in light mode.
  Use `text-green-700` or `text-green-800` in light mode instead.

## Dark Mode Rules

- Do not let everything blur into soft dark-grey mush.
- Maintain clear hierarchy between background, card, border, and interactive elements.
- Avoid glowing neon accents unless used very deliberately and sparingly.
- Keep contrast clear without making the interface feel harsh or stark.

## Human-Centred Aesthetic Direction

Aim for a UI that feels:

- premium — it respects the user's intelligence
- warm — not icy or clinical
- grounded — solid visual structure, not floating and glassy
- clear — hierarchy is obvious at a glance
- confident — consistent and intentional, not assembled from templates

Avoid a UI that feels:

- cold or sterile
- overly glassy or floaty
- dominated by pale blue or purple AI clichés
- visually clever but tiring to read

## When reviewing UI work

Work through this checklist:

1. Can every label be read instantly without squinting?
2. Are pills, badges, and chips readable in light mode specifically?
3. Is the visual hierarchy clear without depending only on colour?
4. Do interactive elements (buttons, chips, inputs) look clearly interactive?
5. Does the UI feel warm and intentional rather than generic and cold?
6. Would a real user find this easy to scan after hours of work?

## Output Expectations

When applying this skill:

- Identify readability problems clearly and specifically
- Explain why each problem matters (not just that it fails a ratio)
- Suggest concrete fixes with specific class names or values
- Favour practical improvements over vague design theory
- Test proposed fixes in both light and dark mode before finalising
