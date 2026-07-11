'use client'

import { useEffect, useState } from 'react'
import { Loader2, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react'

import { AppHeader } from '@/components/app-header'
import { GeneratorWorkbench } from '@/components/generator-workbench'
import { Hero, HowItWorks, Faq, SiteFooter } from '@/components/landing-sections'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const DEMO_EMAIL = 'admin@describely.com'
const DEMO_PASSWORD = 'Describely123!'

type SessionState = {
  authenticated: boolean
  email?: string | null
  name?: string | null
}

export function AuthShell() {
  const [session, setSession] = useState<SessionState>({ authenticated: false })
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function refreshSession() {
    const response = await fetch('/api/auth/session', { cache: 'no-store' })
    const payload = (await response.json()) as SessionState
    setSession(payload)
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
        <Hero />

        {!session.authenticated ? (
          <section id="login" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6">
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
                    Use the demo credentials below to validate the login flow, then generate product copy as an authenticated user.
                  </p>
                  <div className="mt-6 rounded-2xl border border-border bg-card/85 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <ShieldCheck className="size-4 text-primary" />
                      Demo account
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Email:</span> {DEMO_EMAIL}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Password:</span> {DEMO_PASSWORD}
                      </p>
                    </div>
                  </div>
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
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="hello@describely.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground" htmlFor="password">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                      />
                    </div>

                    {error ? (
                      <p className="rounded-xl border border-destructive/40 bg-destructive/8 px-3 py-2 text-sm text-destructive">
                        {error}
                      </p>
                    ) : null}

                    <Button type="submit" size="lg" className="w-full" disabled={pending}>
                      {pending ? <Loader2 className="animate-spin" /> : <LockKeyhole className="size-4" />}
                      {pending ? 'Signing in…' : 'Log in'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
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
        )}

        <HowItWorks />
        <Faq />
      </main>

      <SiteFooter />
    </div>
  )
}
