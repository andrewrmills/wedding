'use client'

import dynamic from 'next/dynamic'
import type { Invitee } from '@/lib/types/invitee'
import { HeroSection } from './HeroSection'
import { RsvpForm } from './RsvpForm'

const MapSection = dynamic(
  () => import('./MapSection').then((m) => ({ default: m.MapSection })),
  { ssr: false }
)

type Props = {
  invitee: Invitee
  token: string
}

export function RsvpPageContent({ invitee, token }: Props) {
  return (
    <main>
      <HeroSection invitee={invitee} />
      <MapSection invitee={invitee} />
      <RsvpForm invitee={invitee} token={token} />
    </main>
  )
}
