'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'

type RsvpInput = {
  token: string
  rsvp_attending: boolean
  dietary_requirements: string | null
  beer_choice: string | null
  beer_other_details: string | null
}

type RsvpResult = { success: true } | { success: false; error: string }

export async function submitRsvp(input: RsvpInput): Promise<RsvpResult> {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('invitees')
    .update({
      rsvp_attending: input.rsvp_attending,
      dietary_requirements: input.dietary_requirements,
      beer_choice: input.beer_choice,
      beer_other_details: input.beer_other_details,
    })
    .eq('token', input.token)
    .select('id')

  if (error || !data?.length) {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  revalidatePath('/admin')
  return { success: true }
}
