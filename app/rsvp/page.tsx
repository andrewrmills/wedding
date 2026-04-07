import { createServiceClient } from '@/lib/supabase/service'
import { ErrorState } from './_components/ErrorState'
import { RsvpPageContent } from './_components/RsvpPageContent'

type Props = {
  searchParams: Promise<{ token?: string }>
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

  return <RsvpPageContent invitee={invitee} token={token} />
}
