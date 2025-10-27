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
      personas: {
        Row: {
          id: string
          name: string
          cluster: string
          definition: string
          age_range: string
          gender: string
          channel_size: string
          upload_cadence: string
          top_cities: string[]
          example_channels: string[]
          milo_must_haves: string[]
          zara_must_haves: string[]
          tasks: string[]
          benefits: string[]
          revenue: Json
          pain_points: string[]
          tonality: string
          keywords: string[]
          purchase_behavior: string
          success_looks: string
          logic_buying: string
          primary_platform: string
          software: string[]
          psychographics: string
          life_stage: string
          interests: string[]
          favorite_brands: string[]
          hobbies: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          cluster: string
          definition: string
          age_range: string
          gender: string
          channel_size: string
          upload_cadence: string
          top_cities: string[]
          example_channels: string[]
          milo_must_haves: string[]
          zara_must_haves: string[]
          tasks: string[]
          benefits: string[]
          revenue: Json
          pain_points: string[]
          tonality: string
          keywords: string[]
          purchase_behavior: string
          success_looks: string
          logic_buying: string
          primary_platform: string
          software: string[]
          psychographics: string
          life_stage: string
          interests: string[]
          favorite_brands: string[]
          hobbies: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          cluster?: string
          definition?: string
          age_range?: string
          gender?: string
          channel_size?: string
          upload_cadence?: string
          top_cities?: string[]
          example_channels?: string[]
          milo_must_haves?: string[]
          zara_must_haves?: string[]
          tasks?: string[]
          benefits?: string[]
          revenue?: Json
          pain_points?: string[]
          tonality?: string
          keywords?: string[]
          purchase_behavior?: string
          success_looks?: string
          logic_buying?: string
          primary_platform?: string
          software?: string[]
          psychographics?: string
          life_stage?: string
          interests?: string[]
          favorite_brands?: string[]
          hobbies?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      channels: {
        Row: {
          id: string
          channel_id: string
          channel_url: string
          persona_id: string | null
          status: 'classified' | 'unclassified'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          channel_id: string
          channel_url: string
          persona_id?: string | null
          status: 'classified' | 'unclassified'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          channel_id?: string
          channel_url?: string
          persona_id?: string | null
          status?: 'classified' | 'unclassified'
          created_at?: string
          updated_at?: string
        }
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
  }
}
