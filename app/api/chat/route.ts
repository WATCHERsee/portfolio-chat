import { streamText } from 'ai'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { SYSTEM_PROMPT } from '@/lib/system-prompt'

const siliconflow = createOpenAICompatible({
  name: 'siliconflow',
  baseURL: process.env.SILICONFLOW_BASE_URL!,
  apiKey: process.env.SILICONFLOW_API_KEY!,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: siliconflow.chatModel('deepseek-ai/DeepSeek-V4-Flash'),
    system: SYSTEM_PROMPT,
    messages,
    maxOutputTokens: 1024,
    temperature: 0.7,
  })

  return result.toTextStreamResponse()
}
