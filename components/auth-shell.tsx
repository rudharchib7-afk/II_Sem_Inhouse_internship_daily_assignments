'use client'

import { useEffect, useState } from 'react'
import { Loader2, LockKeyhole, LogOut } from 'lucide-react'

import { AppHeader } from '@/components/app-header'
import { GeneratorWorkbench } from '@/components/generator-workbench'
import { HowItWorks, Faq, SiteFooter } from '@/components/landing-sections'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const INITIAL_EMAIL = ''
const INITIAL_PASSWORD = ''

type SessionState = {
  authenticated: boolean
  email?: string | null
  name?: string | null
}

export function AuthShell() {
  const [session, setSession] = useState<SessionState>({ authenticated: false })
  const [email, setEmail] = useState(INITIAL_EMAIL)
  const [password, setPassword] = useState(INITIAL_PASSWORD)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  async function refreshSession() {
    try {
      const response = await fetch('/api/auth/session', { cache: 'no-store' })
      const payload = (await response.json()) as SessionState
      setSession(payload)
    } catch {
      setSession({ authenticated: false })
    } finally {
      setCheckingSession(false)
    }
  }

  useEffect(() => {
    void refreshSession()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const payload = (await response.json()) as { success?: boolean; message?: string }

    if (!response.ok || !payload.success) {
      setError(payload.message ?? 'Unable to log in right now.')
      setPending(false)
      return
    }

    await refreshSession()
    setPending(false)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    await refreshSession()
  }

  return (
    <div className="page-shell">
      <AppHeader
        isAuthenticated={session.authenticated}
        userEmail={session.email}
        onLogout={handleLogout}
      />

      <main>
        {checkingSession ? (
          <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <Loader2 className="size-6 animate-spin text-primary" aria-label="Checking your session" />
          </section>
        ) : !session.authenticated ? (
          <section id="login" className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center scroll-mt-20 px-4 py-10 sm:px-6">
            <div className="glass-panel overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr]">
                <div className="bg-gradient-to-br from-primary/12 via-primary/6 to-transparent p-8 sm:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    <LockKeyhole className="size-3.5" />
                    Secure account access
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
                    Sign in to unlock the generator workspace
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                    Enter your credentials to access your account.
                  </p>
                </div>

                <div className="p-8 sm:p-10">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground" htmlFor="email">
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="hello@example.com"
                        className="glass-input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground" htmlFor="password">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        className="glass-input"
                      />
                    </div>

                    {error ? (
                      <p className="rounded-xl border border-destructive/40 bg-destructive/8 px-3 py-2 text-sm text-destructive">
                        {error}
                      </p>
                    ) : null}

                    <Button type="submit" size="lg" className="w-full glass-button" disabled={pending}>
                      {pending ? <Loader2 className="animate-spin" /> : <LockKeyhole className="size-4" />}
                      {pending ? 'Signing in…' : 'Log in'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Signed in as {session.email}</p>
                  <p className="text-xs text-muted-foreground">Your workspace is ready for AI-generated product copy.</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="size-4" />
                  Log out
                </Button>
              </div>
              <GeneratorWorkbench />
            </section>
            <HowItWorks />
            <Faq />
          </>
        )}
      </main>

      {session.authenticated ? <SiteFooter /> : null}
    </div>
  )
}
