import 'server-only'
import { createClient } from '@supabase/supabase-js'

// Service role client — full database access, bypasses RLS.
// Used server-side only (Server Components, Server Actions, API routes).
// Never import this file in a client component.
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
