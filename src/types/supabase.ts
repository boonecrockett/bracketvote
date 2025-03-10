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
      rounds: {
        Row: {
          id: string
          name: string
          number: number
          status: 'pending' | 'active' | 'completed'
          point_value: number
          created_at: string
          updated_at: string
        }
      }
      matchups: {
        Row: {
          id: string
          round_id: string
          entry1_id: string
          entry2_id: string
          winner_id: string | null
          created_at: string
          updated_at: string
        }
      }
      entries: {
        Row: {
          id: string
          name: string
          image_url: string
          created_at: string
          updated_at: string
        }
      }
      votes: {
        Row: {
          id: string
          matchup_id: string
          user_id: string
          entry_id: string
          created_at: string
        }
      }
    }
  }
}