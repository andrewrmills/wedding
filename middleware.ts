import { type NextRequest, NextResponse } from 'next/server'

// No session middleware needed — this app uses token-in-URL, not Supabase Auth.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|glb)$).*)',
  ],
}
