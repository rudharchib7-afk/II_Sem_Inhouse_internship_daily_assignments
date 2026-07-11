import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'describely_session'

export type SessionUser = {
  email: string
  name: string
}

type SignedSession = SessionUser & { signature: string }

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET || process.env.AUTH_PASSWORD || 'describely-development-secret'
}

function sign(user: SessionUser) {
  return createHmac('sha256', getSessionSecret())
    .update(`${user.email}:${user.name}`)
    .digest('hex')
}

export function createSessionValue(user: SessionUser) {
  return JSON.stringify({ ...user, signature: sign(user) })
}

export function parseSessionValue(value?: string): SessionUser | null {
  if (!value) return null

  try {
    const payload = JSON.parse(value) as Partial<SignedSession>
    if (typeof payload.email !== 'string' || typeof payload.name !== 'string' || typeof payload.signature !== 'string') {
      return null
    }

    const expected = Buffer.from(sign({ email: payload.email, name: payload.name }), 'hex')
    const supplied = Buffer.from(payload.signature, 'hex')
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null

    return { email: payload.email, name: payload.name }
  } catch {
    return null
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies()
  return parseSessionValue(cookieStore.get(SESSION_COOKIE)?.value)
}

export function isSecureRequest(request: Request) {
  const forwardedProtocol = request.headers.get('x-forwarded-proto')
  return forwardedProtocol === 'https' || new URL(request.url).protocol === 'https:'
}
