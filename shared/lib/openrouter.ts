import { createOpenAI } from '@ai-sdk/openai'

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error('Missing OPENROUTER_API_KEY environment variable')
}

// OpenRouter provider using OpenAI-compatible API
export const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'Osteria Luna Nera'
  }
})

// Model configuration
export const AI_MODEL = (process.env.AI_MODEL || 'anthropic/claude-3.5-haiku') as string
