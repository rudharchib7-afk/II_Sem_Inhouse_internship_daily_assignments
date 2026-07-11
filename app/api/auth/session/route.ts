import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('describely_session')?.value

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const payload = JSON.parse(sessionCookie) as { email?: string; name?: string }
    return NextResponse.json({
      authenticated: true,
      email: payload.email ?? null,
      name: payload.name ?? null,
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
