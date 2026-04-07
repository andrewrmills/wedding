import { WELCOME_MESSAGE, HERO } from '@/constants/strings'
import type { Invitee } from '@/lib/types/invitee'
import { HeroCollage } from './HeroCollage'

type Props = {
  invitee: Invitee
}

function deriveWelcomeMessage(invitee: Invitee): string {
  return invitee.welcome_message ?? WELCOME_MESSAGE[invitee.type]
}

export function HeroSection({ invitee }: Props) {
  const heading = deriveWelcomeMessage(invitee)

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 md:px-16">
      <HeroCollage inviteeType={invitee.type} />
      {/* Heading block */}
      <div className="flex flex-col items-center text-center max-w-4xl w-full animate-fade-in">
        <div className="w-12 h-px bg-clay mb-10" />
        <h1
          className="font-display text-cream text-[clamp(2.5rem,6vw,6rem)] tracking-tight leading-[1.1]"
        >
          {heading}
        </h1>
        <div className="w-12 h-px bg-clay mt-10" />
      </div>

      {/* Scroll prompt */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in-delayed">
        <span className="font-body text-cream-dim text-[0.625rem] tracking-[0.25em] uppercase">
          {HERO.scrollPrompt}
        </span>
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          className="text-clay animate-bounce-slow"
          aria-hidden="true"
        >
          <path
            d="M1 1L9 9L17 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
