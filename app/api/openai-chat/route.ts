// app/api/chat/route.ts

import { streamText } from 'ai'
import {createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({apiKey:process.env.OPEN_AI_KEY as string})

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = openai('gpt-4o')
  const result = await streamText({
    model,
    messages,
    maxTokens: 1024,
    temperature: 0.7,
    topP: 1,
  })
  return result.toAIStreamResponse()
}
