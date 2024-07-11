// app/api/chat/route.ts

import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const google = createGoogleGenerativeAI({
    baseURL:'https://generativelanguage.googleapis.com/v1beta',
    apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY as string
  });

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = google('models/gemini-1.5-flash-latest')
  const result = await streamText({
    model,
    messages,
    maxTokens: 4096,
    temperature: 0.7,
    topP: 0.4,
  })
  return result.toAIStreamResponse()
}
