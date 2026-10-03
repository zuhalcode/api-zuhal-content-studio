export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      asset_transactions: {
        Row: {
          created_at: string
          created_by: string
          date: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          destination_asset_id: string | null
          destination_quantity: number | null
          id: string
          source_asset_id: string | null
          source_quantity: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          date?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          destination_asset_id?: string | null
          destination_quantity?: number | null
          id?: string
          source_asset_id?: string | null
          source_quantity?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          date?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          destination_asset_id?: string | null
          destination_quantity?: number | null
          id?: string
          source_asset_id?: string | null
          source_quantity?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_destination_asset_id_fkey"
            columns: ["destination_asset_id"]
            isOneToOne: false
            referencedRelation: "asset_balances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_destination_asset_id_fkey"
            columns: ["destination_asset_id"]
            isOneToOne: false
            referencedRelation: "asset_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_destination_asset_id_fkey"
            columns: ["destination_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_source_asset_id_fkey"
            columns: ["source_asset_id"]
            isOneToOne: false
            referencedRelation: "asset_balances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_source_asset_id_fkey"
            columns: ["source_asset_id"]
            isOneToOne: false
            referencedRelation: "asset_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_source_asset_id_fkey"
            columns: ["source_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_transactions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          name: string
          unit: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          name: string
          unit: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          name?: string
          unit?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      capitals: {
        Row: {
          capital: number | null
          created_at: string
          created_by: string | null
          date: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          purchase: number | null
          sell: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          capital?: number | null
          created_at?: string
          created_by?: string | null
          date: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          purchase?: number | null
          sell?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          capital?: number | null
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          purchase?: number | null
          sell?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "capitals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "capitals_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "capitals_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          code: string
          last_number: number
          name: string
        }
        Insert: {
          code: string
          last_number?: number
          name: string
        }
        Update: {
          code?: string
          last_number?: number
          name?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          name: string
          product_id: string
          updated_at: string | null
          updated_by: string | null
          url: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          name: string
          product_id: string
          updated_at?: string | null
          updated_by?: string | null
          url: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          name?: string
          product_id?: string
          updated_at?: string | null
          updated_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_code: string
          code: string
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: string
          karat: number
          name: string | null
          status: Database["public"]["Enums"]["product_status"]
          updated_at: string | null
          updated_by: string | null
          weight: number
        }
        Insert: {
          category_code: string
          code: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          karat: number
          name?: string | null
          status: Database["public"]["Enums"]["product_status"]
          updated_at?: string | null
          updated_by?: string | null
          weight: number
        }
        Update: {
          category_code?: string
          code?: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: string
          karat?: number
          name?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string | null
          updated_by?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_category_code_fkey"
            columns: ["category_code"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "products_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          price: number
          product_id: string
          receipt_url: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          price: number
          product_id: string
          receipt_url?: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          price?: number
          product_id?: string
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_deleted_by_fkey"
            columns: ["deleted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_roles"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          role?: Database["public"]["Enums"]["user_roles"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_roles"]
        }
        Relationships: []
      }
    }
    Views: {
      asset_balances: {
        Row: {
          description: string | null
          has_transaction: boolean | null
          id: string | null
          name: string | null
          unit: string | null
          value: number | null
        }
        Relationships: []
      }
      asset_list: {
        Row: {
          description: string | null
          has_transactions: boolean | null
          id: string | null
          name: string | null
          unit: string | null
        }
        Insert: {
          description?: string | null
          has_transactions?: never
          id?: string | null
          name?: string | null
          unit?: string | null
        }
        Update: {
          description?: string | null
          has_transactions?: never
          id?: string | null
          name?: string | null
          unit?: string | null
        }
        Relationships: []
      }
      trash_items: {
        Row: {
          deleted_at: string | null
          deleted_by: string | null
          deleted_by_name: string | null
          description: string | null
          id: string | null
          label: string | null
          resource: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_owner: { Args: never; Returns: boolean }
      next_product_sequence: {
        Args: { p_category_code: string }
        Returns: number
      }
    }
    Enums: {
      product_status: "display" | "warehouse" | "repair" | "melt"
      transaction_status: "purchase" | "sale"
      user_roles: "owner" | "admin" | "staff" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      product_status: ["display", "warehouse", "repair", "melt"],
      transaction_status: ["purchase", "sale"],
      user_roles: ["owner", "admin", "staff", "viewer"],
    },
  },
} as const
