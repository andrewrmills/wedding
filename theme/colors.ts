// Design tokens — single source of truth for colours.
// Tailwind utility classes are generated from these in globals.css @theme.
// This TS export is for use in non-CSS contexts (e.g. Three.js scene background).

export const colors = {
  ink: '#f2f5f0',        // page background, very light sage
  inkMid: '#e4ebe1',     // elevated surfaces, cards
  inkBorder: '#c0cebb',  // subtle borders and dividers
  cream: '#1a2e1c',      // primary text, deep forest
  creamDim: '#5a7060',   // secondary / muted text
  clay: '#4a7a58',       // accent — eucalyptus green
  clayLight: '#6a9a72',  // accent hover / lighter variant
} as const

export type ColorToken = keyof typeof colors
