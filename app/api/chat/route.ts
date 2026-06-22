import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { SYSTEM_PROMPT } from '@/lib/system-prompt'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: SYSTEM_PROMPT,
    messages,
    maxOutputTokens: 1024,
    temperature: 0.7,
  })

  return result.toTextStreamResponse()
}
