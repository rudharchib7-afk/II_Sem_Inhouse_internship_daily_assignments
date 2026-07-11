import { NextResponse } from 'next/server'
import { isSecureRequest, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' })

  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: isSecureRequest(request),
    expires: new Date(0),
  })

  return response
}
