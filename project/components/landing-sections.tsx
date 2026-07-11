import { PenLine, SlidersHorizontal, Copy, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Star className="size-3.5 text-primary" />
          Trusted by 12,000+ ecommerce sellers
        </span>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Product descriptions that actually sell
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Turn a few product details into polished, on-brand, SEO-ready copy in seconds. Pick your
          tone, get multiple variations, and publish with confidence.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#generator"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Generate a description
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            See how it works
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required · 5 free generations
        </p>
      </div>
    </section>
  )
}

const steps = [
  {
    icon: PenLine,
    title: "Describe your product",
    body: "Enter the name, category, key features, and target audience. The more detail, the sharper the copy.",
  },
  {
    icon: SlidersHorizontal,
    title: "Choose tone & length",
    body: "Professional, playful, luxury, or technical — dial in the voice and length that fits your brand.",
  },
  {
    icon: Copy,
    title: "Copy & publish",
    body: "Get three ready-to-use variations plus SEO title and meta description. Copy with one click.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            From details to done in three steps
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Describely handles the writing so you can focus on selling.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <step.icon className="size-5" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">0{i + 1}</span>
                <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const faqs = [
  {
    q: "Can I match my brand's voice?",
    a: "Yes. Choose from six tones — professional, friendly, playful, luxury, minimal, and technical — to keep every description on-brand.",
  },
  {
    q: "Do the descriptions help with SEO?",
    a: "Every generation includes an optimized SEO title and meta description built from your keywords, ready to paste into your store.",
  },
  {
    q: "Can I use these on any platform?",
    a: "Absolutely. The copy works on Shopify, Amazon, Etsy, WooCommerce, and any storefront that accepts plain text or HTML.",
  },
  {
    q: "How many variations do I get?",
    a: "Each run produces three distinct angles — benefit-led, story-driven, and feature-focused — so you can pick the best fit.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-balance text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-border bg-card p-5 [&_summary]:list-none"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium">
                {faq.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <span>© {new Date().getFullYear()} Describely. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
