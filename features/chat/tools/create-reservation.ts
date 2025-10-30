import { tool } from 'ai'
import { z } from 'zod'
import { getSupabaseServerClient } from '@/shared/lib/supabase'

export const createReservationTool = tool({
  description: 'Create a new reservation at Osteria Luna Nera after availability has been confirmed. IMPORTANT: Always check availability first using check_availability tool before creating a reservation.',
  parameters: z.object({
    customer_name: z.string().min(2).describe('Full name of the guest'),
    phone: z.string().min(10).describe('Guest phone number'),
    email: z.string().email().optional().describe('Guest email address (optional)'),
    date: z.string().describe('Reservation date in YYYY-MM-DD format'),
    time: z.string().describe('Reservation time in HH:MM format (24hr)'),
    guests: z.number().min(1).max(6).describe('Number of guests'),
    special_occasion: z.string().optional().describe('Special occasion (anniversary, birthday, business dinner, etc.)')
  }),
  // @ts-ignore - AI SDK v5 type inference issue
  execute: async ({ customer_name, phone, email, date, time, guests, special_occasion }: any) => {
    const supabase = getSupabaseServerClient()

    // Double-check availability before creating
    // @ts-expect-error - Custom RPC function not in generated types
    const { data: availabilityData } = await supabase.rpc('check_table_availability', {
      p_date: date,
      p_time: time
    })

    const availableTables = (availabilityData ?? 0) as number

    if (availableTables <= 0) {
      return {
        success: false,
        message: 'Unfortunately, this time slot just became unavailable. Please check availability again for alternative times.'
      }
    }

    // Create the reservation
    const { data: reservation, error } = await supabase
      .from('reservations')
      // @ts-ignore - Reservation table type not in generated types
      .insert({
        customer_name,
        phone,
        email: email || null,
        reservation_date: date,
        reservation_time: time,
        number_of_guests: guests,
        special_occasion: special_occasion || null,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating reservation:', error)
      return {
        success: false,
        message: 'Unable to create reservation at this moment. Please try again or call us at +1 (212) 555-0147.'
      }
    }

    // Format the confirmation message
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return {
      success: true,
      reservation,
      message: `Perfetto! Your reservation has been confirmed.\n\n**Reservation Details:**\n- Name: ${customer_name}\n- Date: ${formattedDate}\n- Time: ${time}\n- Party size: ${guests} guest${guests > 1 ? 's' : ''}\n- Reservation ID: ${(reservation as any)?.id}\n${special_occasion ? `- Special occasion: ${special_occasion}\n` : ''}\nWe look forward to welcoming you to Osteria Luna Nera! You will receive a confirmation ${email ? 'via email' : 'via phone'}.\n\nIf you need to modify or cancel your reservation, please call us at +1 (212) 555-0147.`
    }
  }
})
