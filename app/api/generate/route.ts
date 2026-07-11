import { NextResponse } from 'next/server'

import { getSessionUser } from '@/lib/auth'
import { generateDescriptions, type GenerateInput, type Length, type Tone } from '@/lib/generate'

const TONES: Tone[] = ['professional', 'playful', 'luxury', 'minimal', 'technical', 'friendly']
const LENGTHS: Length[] = ['short', 'medium', 'long']

function stringValue(value: unknown, maxLength = 200) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function stringList(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim().slice(0, 100)).filter(Boolean).slice(0, 12)
}

export async function POST(request: Request) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ success: false, message: 'Please sign in to generate descriptions.' }, { status: 401 })

  try {
    const body = await request.json()
    const input: GenerateInput = {
      name: stringValue(body.name), category: stringValue(body.category), audience: stringValue(body.audience),
      features: stringList(body.features), keywords: stringList(body.keywords),
      tone: TONES.includes(body.tone) ? body.tone : 'professional',
      length: LENGTHS.includes(body.length) ? body.length : 'medium',
    }
    if (!input.name || !input.category) {
      return NextResponse.json({ success: false, message: 'Product name and category are required.' }, { status: 400 })
    }
    return NextResponse.json({ success: true, results: generateDescriptions(input) })
  } catch {
    return NextResponse.json({ success: false, message: 'Please provide valid product details.' }, { status: 400 })
  }
}
