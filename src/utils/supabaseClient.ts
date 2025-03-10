import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// For TypeScript support
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          score: number
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          username?: string
          score?: number
          is_admin?: boolean
        }
        Update: {
          username?: string
          score?: number
          is_admin?: boolean
        }
      }
      matchups: {
        Row: {
          id: string
          round: number
          position: number
          contestant1_id: string
          contestant2_id: string
          winner_id: string | null
          created_at: string
        }
        Insert: {
          round: number
          position: number
          contestant1_id: string
          contestant2_id: string
          winner_id?: string | null
        }
        Update: {
          winner_id?: string | null
        }
      }
      votes: {
        Row: {
          id: string
          matchup_id: string
          contestant_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          matchup_id: string
          contestant_id: string
          user_id: string
        }
      }
    }
  }
}