import { streamText } from 'ai'
import { openrouter, AI_MODEL } from '@/shared/lib/openrouter'
import { SYSTEM_PROMPT } from '@/features/chat/system-prompt'
import { getMenuTool } from '@/features/chat/tools/get-menu'
import { checkAvailabilityTool } from '@/features/chat/tools/check-availability'
import { createReservationTool } from '@/features/chat/tools/create-reservation'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: openrouter(AI_MODEL),
      system: SYSTEM_PROMPT,
      messages,
      tools: {
        get_menu: getMenuTool,
        check_availability: checkAvailabilityTool,
        create_reservation: createReservationTool,
      },
      temperature: 0.7,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat Route Error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to process request. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
