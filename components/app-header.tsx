'use client'

import { LogOut, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'

type AppHeaderProps = {
  isAuthenticated?: boolean
  userEmail?: string | null
  onLogout?: () => void
}

export function AppHeader({ isAuthenticated = false, userEmail, onLogout }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <Sparkles className="size-4" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">Describely</span>
            <span className="block text-xs text-muted-foreground">AI Product Copy</span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#generator" className="transition-colors hover:text-foreground">
            Generator
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <div className="hidden rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground sm:block">
                {userEmail ?? 'Authenticated'}
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="size-3.5" />
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
                render={<a href="#login" />}
              >
                Sign in
              </Button>
              <Button size="sm" render={<a href="#generator" />}>
                Start free
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
