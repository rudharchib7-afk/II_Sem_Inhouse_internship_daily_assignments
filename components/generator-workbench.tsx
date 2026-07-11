"use client"

import { useState } from "react"
import { Sparkles, Wand2, RotateCcw, FileText, Loader2 } from "lucide-react"

import {
  generateDescriptions,
  LENGTHS,
  TONES,
  type GeneratedDescription,
  type Length,
  type Tone,
} from "@/lib/generate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { TagInput } from "@/components/tag-input"
import { ResultCard } from "@/components/result-card"

const SAMPLE = {
  name: "AuroraGlow Ceramic Mug",
  category: "insulated coffee mug",
  audience: "remote workers and coffee lovers",
  features: ["Double-walled ceramic", "Keeps drinks hot 4 hours", "Non-slip base", "Dishwasher safe"],
  keywords: ["morning coffee", "home office", "gift"],
  tone: "friendly" as Tone,
  length: "medium" as Length,
}

export function GeneratorWorkbench() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [audience, setAudience] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])
  const [tone, setTone] = useState<Tone>("professional")
  const [length, setLength] = useState<Length>("medium")

  const [results, setResults] = useState<GeneratedDescription[] | null>(null)
  const [loading, setLoading] = useState(false)

  const canGenerate = name.trim().length > 0 && category.trim().length > 0

  function handleGenerate() {
    if (!canGenerate) return
    setLoading(true)
    setResults(null)
    // Simulate an AI request round-trip
    setTimeout(() => {
      setResults(
        generateDescriptions({ name, category, audience, features, keywords, tone, length }),
      )
      setLoading(false)
    }, 1100)
  }

  function loadSample() {
    setName(SAMPLE.name)
    setCategory(SAMPLE.category)
    setAudience(SAMPLE.audience)
    setFeatures(SAMPLE.features)
    setKeywords(SAMPLE.keywords)
    setTone(SAMPLE.tone)
    setLength(SAMPLE.length)
    setResults(null)
  }

  function reset() {
    setName("")
    setCategory("")
    setAudience("")
    setFeatures([])
    setKeywords([])
    setTone("professional")
    setLength("medium")
    setResults(null)
  }

  return (
    <section id="generator" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* Input panel */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold tracking-tight">Product details</h2>
                <p className="text-sm text-muted-foreground">Tell us about what you're selling.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={loadSample} data-icon="inline-start">
                <Wand2 />
                Sample
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Product name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AuroraGlow Ceramic Mug"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">
                  Category <span className="text-primary">*</span>
                </Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. insulated coffee mug"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="audience">Target audience</Label>
                <Input
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. remote workers and coffee lovers"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="features">Key features</Label>
                <TagInput
                  id="features"
                  values={features}
                  onChange={setFeatures}
                  placeholder="Add a feature, press Enter"
                  suggestions={["Eco-friendly", "Lightweight", "Handmade", "1-year warranty"]}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="keywords">SEO keywords</Label>
                <TagInput
                  id="keywords"
                  values={keywords}
                  onChange={setKeywords}
                  placeholder="Add a keyword, press Enter"
                  suggestions={["gift", "premium", "everyday"]}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="tone">Tone of voice</Label>
                  <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                    <SelectTrigger id="tone" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TONES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="length">Length</Label>
                  <Select value={length} onValueChange={(v) => setLength(v as Length)}>
                    <SelectTrigger id="length" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LENGTHS.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                          {l.label} · {l.words}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleGenerate}
                  disabled={!canGenerate || loading}
                  data-icon="inline-start"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {loading ? "Generating…" : "Generate descriptions"}
                </Button>
                <Button
                  variant="outline"
                  size="icon-lg"
                  onClick={reset}
                  aria-label="Reset form"
                >
                  <RotateCcw />
                </Button>
              </div>
              {!canGenerate && (
                <p className="text-xs text-muted-foreground">
                  Add a product name and category to get started.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div className="min-w-0">
          {loading && <LoadingState />}
          {!loading && !results && <EmptyState />}
          {!loading && results && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold tracking-tight">
                  {results.length} descriptions ready
                </h2>
                <span className="text-sm text-muted-foreground">
                  {TONES.find((t) => t.value === tone)?.label} tone
                </span>
              </div>
              {results.map((item) => (
                <ResultCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <FileText className="size-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight">Your descriptions appear here</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Fill in your product details and hit generate. You'll get three ready-to-publish variations
        with SEO metadata.
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm",
            "animate-pulse",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 rounded-md bg-muted" />
            <div className="h-5 w-16 rounded-md bg-muted" />
          </div>
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-4/5 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
