import { NextResponse } from 'next/server'

const DEFAULT_EMAIL = process.env.AUTH_EMAIL ?? 'admin@describely.com'
const DEFAULT_PASSWORD = process.env.AUTH_PASSWORD ?? 'Describely123!'

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}))
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : ''
  const password = typeof payload.password === 'string' ? payload.password : ''

  if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) {
    return NextResponse.json(
      { success: false, message: 'Invalid email or password.' },
      { status: 401 },
    )
  }

  const response = NextResponse.json({
    success: true,
    message: 'Logged in successfully.',
    email,
  })

  response.cookies.set('describely_session', JSON.stringify({ email, name: 'Describely Admin' }), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12,
  })

  return response
}
