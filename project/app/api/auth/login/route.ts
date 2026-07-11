import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { createSessionValue, isSecureRequest, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}))
    const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : ''
    const password = typeof payload.password === 'string' ? payload.password : ''

    const envEmail = process.env.AUTH_EMAIL?.trim().toLowerCase()
    const envPassword = process.env.AUTH_PASSWORD
    const users = envEmail && envPassword
      ? [{ email: envEmail, password: envPassword, name: 'Describely User' }]
      : JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'users.json'), 'utf-8'))

    const user = users.find((u: { email: string; password: string }) => u.email.toLowerCase() === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 },
      )
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully.',
      email: user.email,
      name: user.name,
    })

    response.cookies.set(SESSION_COOKIE, createSessionValue({ email: user.email, name: user.name }), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: isSecureRequest(request),
      maxAge: 60 * 60 * 12,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 },
    )
  }
}
