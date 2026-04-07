import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'

// Playfair Display — editorial serif for display headings
// Sets CSS variable --font-playfair, consumed by --font-display in @theme
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// Outfit — clean sans-serif for body and UI text
// Sets CSS variable --font-outfit, consumed by --font-body in @theme
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Andrew & Gabbi's Wedding",
  description: "You're invited.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  )
}
