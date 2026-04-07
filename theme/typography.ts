// Typography tokens.
// --font-display → Playfair Display (serif, editorial headings)
// --font-body    → Outfit (clean sans, body and UI)
// Both are injected as CSS variables by next/font/google in app/layout.tsx.

export const fontFamily = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
} as const

// Fluid sizing for key text roles — use these in One-off inline styles
// where Tailwind classes cannot express clamped values.
export const fontSize = {
  hero: 'clamp(3rem, 8vw, 7rem)',
  section: 'clamp(2rem, 4vw, 3.5rem)',
  subheading: 'clamp(1.125rem, 2vw, 1.375rem)',
  body: '1rem',
  small: '0.875rem',
} as const
