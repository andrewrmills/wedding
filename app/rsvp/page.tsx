import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/service'
import { ErrorState } from './_components/ErrorState'
import { RsvpPageContent } from './_components/RsvpPageContent'

type Props = {
  searchParams: Promise<{ token?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { token } = await searchParams
  if (!token) return {}

  const supabase = createServiceClient()
  const { data: invitee } = await supabase
    .from('invitees')
    .select('display_name, name')
    .eq('token', token)
    .single()

  if (!invitee) return {}

  const name = invitee.display_name ?? invitee.name.split(' ')[0]
  return { description: `You're invited, ${name}.` }
}

export default async function RsvpPage({ searchParams }: Props) {
  const { token } = await searchParams

  if (!token) {
    return <ErrorState />
  }

  const supabase = createServiceClient()
  const { data: invitee } = await supabase
    .from('invitees')
    .select('*')
    .eq('token', token)
    .single()

  if (!invitee) {
    return <ErrorState />
  }

  // Track that this token has been accessed — fire-and-forget, does not block render
  void Promise.resolve(
    supabase
      .from('invitees')
      .update({ last_accessed_at: new Date().toISOString() })
      .eq('token', token)
  ).catch(() => {})

  return <RsvpPageContent invitee={invitee} token={token} />
}
