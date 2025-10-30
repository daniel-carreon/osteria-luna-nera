export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      dishes: {
        Row: {
          id: string
          name: string
          name_italian: string | null
          description: string
          price: number
          category: 'antipasti' | 'primi' | 'secondi' | 'dolci' | 'bevande'
          image_url: string | null
          dietary_tags: string[]
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_italian?: string | null
          description: string
          price: number
          category: 'antipasti' | 'primi' | 'secondi' | 'dolci' | 'bevande'
          image_url?: string | null
          dietary_tags?: string[]
          available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_italian?: string | null
          description?: string
          price?: number
          category?: 'antipasti' | 'primi' | 'secondi' | 'dolci' | 'bevande'
          image_url?: string | null
          dietary_tags?: string[]
          available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          customer_name: string
          email: string | null
          phone: string
          reservation_date: string
          reservation_time: string
          number_of_guests: number
          special_occasion: string | null
          status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          email?: string | null
          phone: string
          reservation_date: string
          reservation_time: string
          number_of_guests: number
          special_occasion?: string | null
          status?: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          email?: string | null
          phone?: string
          reservation_date?: string
          reservation_time?: string
          number_of_guests?: number
          special_occasion?: string | null
          status?: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      check_table_availability: {
        Args: {
          p_date: string
          p_time: string
        }
        Returns: number
      }
    }
    Enums: Record<string, never>
  }
}

// Helper types
export type Dish = Database['public']['Tables']['dishes']['Row']
export type Reservation = Database['public']['Tables']['reservations']['Row']
export type DishCategory = Dish['category']
export type ReservationStatus = Reservation['status']
