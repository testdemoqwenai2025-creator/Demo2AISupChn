// Supabase Client Configuration for AI Supply Chain Platform
// Free Tier Integration with Real-time Capabilities

import { createClient } from '@supabase/supabase-js'

// Supabase Configuration (Free Tier)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Type definitions for Supabase
export interface SupabaseConfig {
  url: string
  anonKey: string
  options: {
    auth: {
      autoRefreshToken: boolean
      persistSession: boolean
      detectSessionInUrl: boolean
    }
    realtime: {
      params: {
        eventsPerSecond: number
      }
    }
  }
}

// Create Supabase client with optimized settings for free tier
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10 // Optimized for free tier limits
    }
  }
})

// Database Table Types
export interface Supplier {
  id: string
  name: string
  tier: number // 1-4 (Tier-N visibility)
  category: string
  location: {
    country: string
    region: string
    coordinates?: { lat: number; lng: number }
  }
  risk_score: number // 0-100
  performance_metrics: {
    on_time_delivery: number
    quality_score: number
    cost_competitiveness: number
    responsiveness: number
  }
  esg_rating: {
    environmental: number
    social: number
    governance: number
    overall: string // A+, A, B+, etc.
  }
  certifications: string[]
  contact_info: {
    email: string
    phone: string
    website: string
    primary_contact: string
  }
  financial_health: {
    revenue_range: string
    years_in_business: number
    credit_score: string
  }
  created_at: string
  updated_at: string
  status: 'active' | 'inactive' | 'under_review' | 'suspended'
}

export interface Order {
  id: string
  order_number: string
  supplier_id: string
  items: OrderItem[]
  status: 'pending' | 'confirmed' | 'in_production' | 'shipped' | 'delivered' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  quantities: {
    ordered: number
    shipped: number
    delivered: number
    damaged: number
  }
  timeline: {
    expected_delivery: string
    actual_delivery?: string
    created_at: string
    confirmed_at?: string
    shipped_at?: string
  }
  financials: {
    total_value: number
    currency: string
    payment_terms: string
    invoice_status: 'pending' | 'issued' | 'paid' | 'overdue'
  }
  routing: {
    origin: string
    destination: string
    carrier?: string
    tracking_number?: string
    current_location?: string
  }
  ai_insights: {
    delay_probability: number
    quality_risk: string
    recommendations: string[]
  }
}

export interface OrderItem {
  sku: string
  description: string
  quantity: number
  unit_price: number
  specifications: Record<string, any>
}

export interface RiskAlert {
  id: string
  type: 'geopolitical' | 'financial' | 'operational' | 'environmental' | 'compliance' | 'cyber'
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  title: string
  description: string
  affected_suppliers: string[]
  affected_regions: string[]
  impact_assessment: {
    potential_delay_days: number
    cost_impact_range: { min: number; max: number }
    mitigation_options: string[]
  }
  source: {
    name: string
    reliability_score: number
    last_updated: string
  }
  status: 'active' | 'monitoring' | 'mitigated' | 'resolved' | 'false_positive'
  ai_analysis: {
    confidence: number
    key_factors: string[]
    similar_historical_events: string[]
  }
  created_at: string
  updated_at: string
}

export interface UserActivity {
  id: string
  user_id: string
  action_type: 'view' | 'create' | 'update' | 'delete' | 'export' | 'ai_query' | 'login'
  resource_type: 'supplier' | 'order' | 'alert' | 'report' | 'dashboard'
  resource_id?: string
  metadata: Record<string, any>
  timestamp: string
  session_id: string
}

export interface AIQueryLog {
  id: string
  user_id: string
  query_type: 'risk_analysis' | 'demand_forecast' | 'supplier_intelligence' | 'anomaly_detection' | 'optimization' | 'natural_language'
  query_text: string
  response_summary: string
  model_used: string
  tokens_used: number
  latency_ms: number
  satisfaction_rating?: number // 1-5
  feedback?: string
  timestamp: string
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  source: {
    name: string
    url: string
    type: 'imf' | 'sco' | 'yahoo_finance' | 'wsj' | 'wef' | 'bloomberg' | 'reuters' | 'cnbc' | 'ft' | 'nikkei' | 'forbes' | 'custom'
  }
  category: 'financial_markets' | 'geopolitical' | 'technology' | 'esg' | 'regulatory' | 'commodities' | 'economics' | 'business'
  tags: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
  impact: 'high' | 'medium' | 'low'
  related_entities: string[]
  published_at: string
  scraped_at: string
  embedding_vector?: number[] // For semantic search
}

export interface DashboardConfig {
  id: string
  user_id: string
  name: string
  layout: DashboardWidget[]
  filters: Record<string, any>
  refresh_interval: number // seconds
  is_default: boolean
  shared_with: string[]
  created_at: string
  updated_at: string
}

export interface DashboardWidget {
  id: string
  type: 'chart' | 'metric' | 'table' | 'map' | 'feed' | 'ai_insight'
  position: { x: number; y: number; w: number; h: number }
  config: Record<string, any>
  data_source: string
}

// Subscription & Billing Types (Free Tier Compatible)
export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'trialing' | 'past_due' | 'cancelled' | 'expired'
  current_period_start: string
  current_period_end: string
  usage: {
    suppliers_count: number
    ai_queries_today: number
    api_calls_today: number
    storage_bytes: number
  }
  limits: {
    max_suppliers: number
    daily_ai_queries: number
    daily_api_calls: number
    max_storage_gb: number
    features: string[]
  }
}

// Helper function to check if we're using real Supabase or mock mode
export const isSupabaseConfigured = (): boolean => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && 
         supabaseAnonKey !== 'placeholder-anon-key'
}

// Export types for use throughout the application
export type {
  Supplier,
  Order,
  RiskAlert,
  UserActivity,
  AIQueryLog,
  NewsArticle,
  DashboardConfig,
  Subscription
}

export default supabase
