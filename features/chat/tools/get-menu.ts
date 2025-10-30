import { tool } from 'ai'
import { z } from 'zod'
import { getSupabaseServerClient } from '@/shared/lib/supabase'

export const getMenuTool = tool({
  description: 'Get the restaurant menu with Italian dishes. Can filter by category (antipasti, primi, secondi, dolci, bevande) or get all dishes.',
  parameters: z.object({
    category: z.enum(['all', 'antipasti', 'primi', 'secondi', 'dolci', 'bevande']).optional().default('all').describe('Filter by course category. Use "all" to get complete menu.')
  }),
  // @ts-ignore - AI SDK v5 type inference issue
  execute: async ({ category }: any) => {
    const supabase = getSupabaseServerClient()

    let query = supabase
      .from('dishes')
      .select('*')
      .eq('available', true)
      .order('category', { ascending: true })
      .order('price', { ascending: true })

    // Apply category filter if not 'all'
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data: dishes, error } = await query

    if (error) {
      console.error('Error fetching menu:', error)
      return {
        success: false,
        error: 'Unable to fetch menu at this moment. Please try again.',
        dishes: []
      }
    }

    // Group by category for better presentation
    const groupedDishes = (dishes as any)?.reduce((acc: any, dish: any) => {
      const cat = dish.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(dish)
      return acc
    }, {} as Record<string, typeof dishes>)

    return {
      success: true,
      dishes: dishes || [],
      groupedByCategory: groupedDishes,
      message: `Found ${dishes?.length || 0} dishes${category !== 'all' ? ` in ${category}` : ' in the menu'}.`
    }
  }
})
