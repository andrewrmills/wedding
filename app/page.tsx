import { redirect } from 'next/navigation'

// Root redirects to /rsvp — magic links are the entry point.
// Hitting / without a token will show the error state.
export default function Home() {
  redirect('/rsvp')
}
