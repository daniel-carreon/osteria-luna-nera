import { Hero } from '@/shared/components/Hero'
import { MenuGrid } from '@/features/menu/components/MenuGrid'
import { ChatWidget } from '@/features/chat/components/ChatWidget'
import { getSupabaseServerClient } from '@/shared/lib/supabase'

export const revalidate = 3600 // Revalidate every hour

async function getDishes() {
  const supabase = getSupabaseServerClient()

  const { data: dishes, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('available', true)
    .order('category', { ascending: true })
    .order('price', { ascending: true })

  if (error) {
    console.error('Error fetching dishes:', error)
    return []
  }

  return dishes || []
}

export default async function Home() {
  const dishes = await getDishes()

  return (
    <>
      <Hero />
      <MenuGrid dishes={dishes} />
      <ChatWidget />
    </>
  )
}
