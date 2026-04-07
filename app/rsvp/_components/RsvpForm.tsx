'use client'

import { useState } from 'react'
import { RSVP } from '@/constants/strings'
import type { BeerChoice, Invitee } from '@/lib/types/invitee'
import { submitRsvp } from '../actions'

type AttendingValue = 'yes' | 'no'

type Props = {
  invitee: Invitee
  token: string
}

type ValidationErrors = {
  attending?: string
  beer?: string
}

export function RsvpForm({ invitee, token }: Props) {
  // Pre-populate from existing record
  const [attending, setAttending] = useState<AttendingValue | null>(
    invitee.rsvp_attending === true ? 'yes'
    : invitee.rsvp_attending === false ? 'no'
    : null
  )
  const [dietary, setDietary] = useState(invitee.dietary_requirements ?? '')
  const [beerChoice, setBeerChoice] = useState<BeerChoice | null>(invitee.beer_choice)
  const [beerOther, setBeerOther] = useState(invitee.beer_other_details ?? '')

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isPom = invitee.type === 'Pom'
  const isAttending = attending === 'yes'
  const showBeerOther = beerChoice === 'Other'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate
    const newErrors: ValidationErrors = {}
    if (!attending) {
      newErrors.attending = 'Please let us know if you can make it.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setSubmitError(null)

    const result = await submitRsvp({
      token,
      rsvp_attending: attending === 'yes',
      dietary_requirements: dietary.trim() || null,
      beer_choice: isAttending ? beerChoice : null,
      beer_other_details: isAttending && beerChoice === 'Other' ? beerOther.trim() || null : null,
    })

    setIsSubmitting(false)

    if (result.success) {
      setIsSubmitted(true)
    } else {
      setSubmitError(result.error)
    }
  }

  // ── Success state ──────────────────────────────────────────
  if (isSubmitted) {
    return (
      <section className="bg-ink px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-lg mx-auto flex flex-col gap-8">
          <div className="w-12 h-px bg-clay" />
          <p className="font-display text-cream text-[clamp(1.5rem,3vw,2.5rem)] leading-tight">
            {attending === 'yes' ? RSVP.successAttending : RSVP.successNotAttending}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="font-body text-cream-dim text-sm underline underline-offset-4 self-start hover:text-cream transition-colors"
          >
            {RSVP.changeAnswer}
          </button>
        </div>
      </section>
    )
  }

  // ── Form ───────────────────────────────────────────────────
  return (
    <section className="bg-ink px-6 md:px-16 py-24 md:py-32">
      <div className="max-w-lg mx-auto">

        <p className="font-body text-clay text-xs tracking-[0.25em] uppercase mb-12">
          RSVP
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-14">

          {/* 4a — Attending */}
          <fieldset className="flex flex-col gap-5">
            <legend className="font-body text-cream text-lg mb-1">
              {RSVP.attendingLabel}
            </legend>

            <div className="grid grid-cols-2 gap-3">
              <RadioCard
                name="attending"
                value="yes"
                checked={attending === 'yes'}
                onChange={() => { setAttending('yes'); setErrors((e) => ({ ...e, attending: undefined })) }}
                label={RSVP.optionYes}
                sublabel={isPom ? RSVP.pomTranslationYes : undefined}
              />
              <RadioCard
                name="attending"
                value="no"
                checked={attending === 'no'}
                onChange={() => { setAttending('no'); setErrors((e) => ({ ...e, attending: undefined })) }}
                label={RSVP.optionNo}
                sublabel={isPom ? RSVP.pomTranslationNo : undefined}
              />
            </div>

            {errors.attending && (
              <p className="font-body text-clay text-sm">{errors.attending}</p>
            )}

          </fieldset>

          {/* 4b — Dietary (conditional) */}
          {isAttending && (
            <div className="flex flex-col gap-3">
              <label htmlFor="dietary" className="font-body text-cream text-lg">
                {RSVP.dietaryLabel}
              </label>
              <textarea
                id="dietary"
                name="dietary"
                rows={3}
                placeholder={RSVP.dietaryPlaceholder}
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="bg-ink-mid border border-ink-border text-cream placeholder:text-cream-dim font-body text-base px-4 py-3 resize-none focus:outline-none focus:border-clay transition-colors"
              />
            </div>
          )}

          {/* 4c — Beer (conditional) */}
          {isAttending && (
            <fieldset className="flex flex-col gap-5">
              <legend className="font-body text-cream text-lg">
                {RSVP.beerLabel}
              </legend>

              <div className="grid grid-cols-2 gap-3">
                {RSVP.beerOptions.map((option) => (
                  <RadioCard
                    key={option}
                    name="beer"
                    value={option}
                    checked={beerChoice === option}
                    onChange={() => { setBeerChoice(option as BeerChoice); setErrors((e) => ({ ...e, beer: undefined })) }}
                    label={option}
                  />
                ))}
              </div>

              {errors.beer && (
                <p className="font-body text-clay text-sm">{errors.beer}</p>
              )}

              {showBeerOther && (
                <input
                  type="text"
                  placeholder={RSVP.beerOtherPlaceholder}
                  value={beerOther}
                  onChange={(e) => setBeerOther(e.target.value)}
                  className="bg-ink-mid border border-ink-border text-cream placeholder:text-cream-dim font-body text-base px-4 py-3 focus:outline-none focus:border-clay transition-colors"
                />
              )}
            </fieldset>
          )}

          {/* Submit error */}
          {submitError && (
            <p className="font-body text-clay text-sm">{submitError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-clay text-clay font-body text-base tracking-wide py-4 transition-colors hover:bg-clay hover:text-cream active:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : RSVP.submitLabel}
          </button>

        </form>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// RadioCard — custom styled radio button
// ─────────────────────────────────────────

type RadioCardProps = {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
  sublabel?: string
}

function RadioCard({ name, value, checked, onChange, label, sublabel }: RadioCardProps) {
  return (
    <label
      className={`
        flex flex-col gap-1 px-5 py-4 border-2 cursor-pointer transition-colors
        ${checked
          ? 'border-clay text-cream'
          : 'border-ink-border text-cream-dim hover:border-clay'
        }
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="font-body text-sm md:text-base flex items-center justify-between gap-2">
        {label}
        {sublabel && (
          <span className="text-cream-dim font-bold">{sublabel}</span>
        )}
      </span>
    </label>
  )
}
