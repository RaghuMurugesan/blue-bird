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
      test_tenant: {
        Row: {
          details: string | null
          id: number
        }
        Insert: {
          details?: string | null
          id?: number
        }
        Update: {
          details?: string | null
          id?: number
        }
        Relationships: []
      }
      tweets: {
        Row: {
          created_at: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

