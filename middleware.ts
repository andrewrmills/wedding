import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}

export function middleware(request: NextRequest) {
  const auth = request.headers.get('Authorization')

  if (!auth?.startsWith('Basic ')) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
    })
  }

  const decoded = atob(auth.slice(6))
  const colonIndex = decoded.indexOf(':')
  const pass = colonIndex >= 0 ? decoded.slice(colonIndex + 1) : ''

  if (!process.env.ADMIN_PASSWORD || pass !== process.env.ADMIN_PASSWORD) {
return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
    })
  }

  return NextResponse.next()
}
