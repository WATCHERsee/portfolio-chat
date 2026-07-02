import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { SYSTEM_PROMPT } from '@/lib/system-prompt'

const siliconflow = createOpenAI({
  baseURL: 'https://api.siliconflow.com/v1',
  apiKey: process.env.SILICONFLOW_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: siliconflow('Qwen/Qwen3.5-27B'),
    system: SYSTEM_PROMPT,
    messages,
    maxOutputTokens: 1024,
    temperature: 0.7,
  })

  return result.toTextStreamResponse()
}
