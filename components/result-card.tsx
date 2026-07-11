"use client"

import { useState } from "react"
import { Check, Copy, Search } from "lucide-react"

import type { GeneratedDescription } from "@/lib/generate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function useCopy() {
  const [copied, setCopied] = useState(false)
  function copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }
  return { copied, copy }
}

export function ResultCard({ item }: { item: GeneratedDescription }) {
  const { copied, copy } = useCopy()

  const fullText = [
    item.title,
    "",
    item.body,
    "",
    ...item.bullets.map((b) => `• ${b}`),
  ].join("\n")

  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <Badge variant="secondary" className="font-medium">
          {item.label}
        </Badge>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{item.wordCount} words</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copy(fullText)}
            data-icon="inline-start"
          >
            {copied ? <Check className="text-primary" /> : <Copy />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      <h3 className="text-pretty text-base font-semibold tracking-tight text-foreground">
        {item.title}
      </h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{item.body}</p>

      {item.bullets.length > 0 && (
        <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-foreground/90">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      <Separator className="my-4" />

      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Search className="size-3.5" />
          SEO metadata
        </div>
        <div className="rounded-lg bg-muted/60 p-3">
          <p className="text-sm font-medium text-foreground">{item.seoTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.metaDescription}</p>
        </div>
      </div>
    </article>
  )
}
