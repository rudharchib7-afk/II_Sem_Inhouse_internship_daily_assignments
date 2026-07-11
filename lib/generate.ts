export type Tone = "professional" | "playful" | "luxury" | "minimal" | "technical" | "friendly"
export type Length = "short" | "medium" | "long"

export interface GenerateInput {
  name: string
  category: string
  audience: string
  features: string[]
  keywords: string[]
  tone: Tone
  length: Length
}

export interface GeneratedDescription {
  id: string
  label: string
  title: string
  body: string
  bullets: string[]
  seoTitle: string
  metaDescription: string
  wordCount: number
}

export const TONES: { value: Tone; label: string; hint: string }[] = [
  { value: "professional", label: "Professional", hint: "Polished and credible" },
  { value: "friendly", label: "Friendly", hint: "Warm and approachable" },
  { value: "playful", label: "Playful", hint: "Fun and energetic" },
  { value: "luxury", label: "Luxury", hint: "Elevated and refined" },
  { value: "minimal", label: "Minimal", hint: "Clean and to the point" },
  { value: "technical", label: "Technical", hint: "Precise and spec-driven" },
]

export const LENGTHS: { value: Length; label: string; words: string }[] = [
  { value: "short", label: "Short", words: "~40 words" },
  { value: "medium", label: "Medium", words: "~80 words" },
  { value: "long", label: "Long", words: "~140 words" },
]

const toneOpeners: Record<Tone, string[]> = {
  professional: [
    "Engineered for those who expect more,",
    "A considered choice for the discerning buyer,",
    "Designed to perform where it matters most,",
  ],
  friendly: [
    "Say hello to your new favorite,",
    "Meet the little upgrade that makes a big difference —",
    "Here's something you'll genuinely love:",
  ],
  playful: [
    "Warning: seriously good things ahead.",
    "Buckle up, because this changes everything.",
    "Ready to fall head over heels?",
  ],
  luxury: [
    "Crafted without compromise,",
    "An indulgence you'll reach for again and again,",
    "Where exceptional design meets effortless living,",
  ],
  minimal: ["Simple. Considered. Essential.", "Everything you need. Nothing you don't.", "Made to last. Made to matter."],
  technical: [
    "Built to spec and tested for reliability,",
    "Precision-engineered for consistent results,",
    "Purpose-built for demanding workflows,",
  ],
}

const toneClosers: Record<Tone, string[]> = {
  professional: [
    "It's the dependable upgrade your routine has been waiting for.",
    "Expect quality you can measure and results you can trust.",
  ],
  friendly: ["Go ahead — you deserve it.", "We think it'll fit right into your day."],
  playful: ["Trust us, future-you says thanks.", "Your cart is calling. Answer it."],
  luxury: ["Because the details are never just details.", "This is the difference true craftsmanship makes."],
  minimal: ["Nothing more to prove.", "Quietly excellent."],
  technical: ["Spec'd for performance, backed by testing.", "Reliable output, run after run."],
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

function featureSentence(features: string[], tone: Tone): string {
  const clean = features.filter(Boolean)
  if (clean.length === 0) return ""
  const joined =
    clean.length === 1
      ? clean[0]
      : `${clean.slice(0, -1).join(", ")} and ${clean[clean.length - 1]}`
  const templates: Record<Tone, string> = {
    professional: `Highlights include ${joined}.`,
    friendly: `You'll love the ${joined}.`,
    playful: `Packed with ${joined} — yes, really.`,
    luxury: `Every detail is intentional, from ${joined}.`,
    minimal: `${joined}.`,
    technical: `Key specifications: ${joined}.`,
  }
  return templates[tone]
}

function keywordSentence(keywords: string[], name: string): string {
  const clean = keywords.filter(Boolean)
  if (clean.length === 0) return ""
  return `Perfect for ${clean.slice(0, 3).join(", ")}, the ${name} slots effortlessly into everyday life.`
}

function trimToLength(sentences: string[], length: Length): string {
  const counts: Record<Length, number> = { short: 2, medium: 4, long: 6 }
  return sentences.filter(Boolean).slice(0, counts[length]).join(" ")
}

function titleCase(value: string): string {
  return value
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

const angleLabels = ["Benefit-Led", "Story-Driven", "Feature-Focused"]

export function generateDescriptions(input: GenerateInput): GeneratedDescription[] {
  const name = input.name.trim() || "This product"
  const category = input.category.trim() || "product"
  const audience = input.audience.trim()

  return angleLabels.map((label, index) => {
    const opener = pick(toneOpeners[input.tone], index)
    const closer = pick(toneClosers[input.tone], index + 1)
    const feature = featureSentence(input.features, input.tone)
    const keyword = keywordSentence(input.keywords, name)

    const audienceLine = audience
      ? `Thoughtfully made for ${audience}, it delivers exactly what they're looking for.`
      : `Whoever you're shopping for, it delivers exactly what they're looking for.`

    const angleIntro = [
      `${opener} the ${name} redefines what a great ${category} should be.`,
      `Every ${name} starts with a simple idea: a ${category} that just works, beautifully.`,
      `The ${name} brings together the features that matter most in a modern ${category}.`,
    ][index]

    const sentences = [angleIntro, feature, index === 0 ? audienceLine : keyword, closer]
    const body = trimToLength(sentences, input.length)

    const bullets = input.features
      .filter(Boolean)
      .slice(0, 4)
      .map((f) => titleCase(f))

    const seoTitle = `${name} | ${titleCase(category)}${
      input.keywords[0] ? ` for ${titleCase(input.keywords[0])}` : ""
    }`

    const metaDescription = `Shop the ${name}, a premium ${category}${
      audience ? ` made for ${audience}` : ""
    }. ${input.features[0] ? `Featuring ${input.features[0]}.` : ""} Order today.`.slice(0, 155)

    return {
      id: `${label}-${index}`,
      label,
      title: [
        `${name}: ${titleCase(category)} Done Right`,
        `The ${name} You've Been Waiting For`,
        `Meet ${name} — ${titleCase(category)} Reimagined`,
      ][index],
      body,
      bullets: bullets.length ? bullets : ["Premium build quality", "Thoughtful, everyday design"],
      seoTitle,
      metaDescription,
      wordCount: body.split(/\s+/).filter(Boolean).length,
    }
  })
}
