import { tool } from 'ai'
import { z } from 'zod'
import { getSupabaseServerClient } from '@/shared/lib/supabase'

// Available time slots at Osteria Luna Nera
const AVAILABLE_SLOTS = [
  '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30'
]

const TOTAL_TABLES = 12
const MAX_GUESTS_PER_TABLE = 6

export const checkAvailabilityTool = tool({
  description: 'Check table availability for a specific date, time and party size at Osteria Luna Nera. Returns available tables and suggests alternative times if needed.',
  parameters: z.object({
    date: z.string().describe('Reservation date in YYYY-MM-DD format'),
    time: z.string().describe('Reservation time in HH:MM format (24hr). Available slots: 17:30, 18:00, 18:30, 19:00, 19:30, 20:00, 20:30, 21:00, 21:30'),
    guests: z.number().min(1).max(6).describe('Number of guests (1-6 per table)')
  }),
  // @ts-ignore - AI SDK v5 type inference issue
  execute: async ({ date, time, guests }: any) => {
    // Validate inputs
    if (guests > MAX_GUESTS_PER_TABLE) {
      return {
        success: false,
        available: false,
        message: `We accommodate a maximum of ${MAX_GUESTS_PER_TABLE} guests per table. For larger parties, please call us directly at +1 (212) 555-0147 so we can arrange special seating.`
      }
    }

    if (!AVAILABLE_SLOTS.includes(time)) {
      return {
        success: false,
        available: false,
        message: `The time ${time} is not available. Our available time slots are: ${AVAILABLE_SLOTS.join(', ')}.`
      }
    }

    // Check if date is in the past
    const requestedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (requestedDate < today) {
      return {
        success: false,
        available: false,
        message: 'We cannot accept reservations for past dates. Please choose a future date.'
      }
    }

    // Same day reservations not allowed
    if (requestedDate.toDateString() === today.toDateString()) {
      return {
        success: false,
        available: false,
        message: 'We do not accept same-day reservations. Please call us directly at +1 (212) 555-0147 for immediate bookings, or choose a future date.'
      }
    }

    // Check availability in database
    const supabase = getSupabaseServerClient()

    // @ts-expect-error - Custom RPC function not in generated types
    const { data, error } = await supabase.rpc('check_table_availability', {
      p_date: date,
      p_time: time
    })

    if (error) {
      console.error('Error checking availability:', error)
      return {
        success: false,
        available: false,
        message: 'Unable to check availability at this moment. Please try again.'
      }
    }

    const availableTables = data as number

    if (availableTables > 0) {
      return {
        success: true,
        available: true,
        availableTables,
        message: `Perfect! We have ${availableTables} table${availableTables > 1 ? 's' : ''} available for ${guests} guest${guests > 1 ? 's' : ''} on ${date} at ${time}.`,
        requestedDate: date,
        requestedTime: time,
        requestedGuests: guests
      }
    }

    // No tables available - suggest alternative times
    const alternatives: string[] = []
    for (const slot of AVAILABLE_SLOTS) {
      if (slot === time) continue // Skip the requested time

      // @ts-expect-error - Custom RPC function not in generated types
      const { data: altData } = await supabase.rpc('check_table_availability', {
        p_date: date,
        p_time: slot
      })

      if (altData && (altData as number) > 0) {
        alternatives.push(slot)
      }
    }

    return {
      success: true,
      available: false,
      availableTables: 0,
      message: `Unfortunately, we are fully booked for ${date} at ${time}. ${alternatives.length > 0 ? `However, we have availability at these times on the same date: ${alternatives.join(', ')}.` : 'We do not have any available tables on this date. Would you like to try a different date?'}`,
      alternativeTimes: alternatives
    }
  }
})
