"use client"

import { useState, type KeyboardEvent } from "react"
import { X, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface TagInputProps {
  id?: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  suggestions?: string[]
  max?: number
}

export function TagInput({
  id,
  values,
  onChange,
  placeholder = "Type and press Enter",
  suggestions = [],
  max = 12,
}: TagInputProps) {
  const [draft, setDraft] = useState("")

  function addTag(raw: string) {
    const value = raw.trim().replace(/,$/, "").trim()
    if (!value) return
    if (values.some((v) => v.toLowerCase() === value.toLowerCase())) {
      setDraft("")
      return
    }
    if (values.length >= max) return
    onChange([...values, value])
    setDraft("")
  }

  function removeTag(index: number) {
    onChange(values.filter((_, i) => i !== index))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(draft)
    } else if (e.key === "Backspace" && !draft && values.length) {
      removeTag(values.length - 1)
    }
  }

  const remainingSuggestions = suggestions.filter(
    (s) => !values.some((v) => v.toLowerCase() === s.toLowerCase()),
  )

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex min-h-10 flex-wrap items-center gap-1.5 rounded-lg border border-input bg-transparent px-2 py-1.5 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30",
        )}
      >
        {values.map((tag, index) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="rounded-sm text-accent-foreground/60 transition-colors hover:text-accent-foreground"
              aria-label={`Remove ${tag}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(draft)}
          placeholder={values.length ? "" : placeholder}
          className="min-w-24 flex-1 bg-transparent px-1 py-0.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {remainingSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {remainingSuggestions.slice(0, 5).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="inline-flex items-center gap-1 rounded-md border border-dashed border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
            >
              <Plus className="size-3" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
