// Semantic spacing tokens for section-level layout.
// Component-level spacing uses Tailwind's default scale directly.

export const spacing = {
  sectionY: 'clamp(5rem, 10vw, 10rem)',  // vertical padding between page sections
  containerX: '1.5rem',                   // horizontal page padding (mobile)
  containerXLg: '4rem',                   // horizontal page padding (desktop)
  containerMax: '80rem',                  // max content width
} as const
