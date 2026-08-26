// Supabase Service Layer for AI Supply Chain Platform
// Provides typed data access functions for all major entities

import { supabase, type Supplier, type Order, type RiskAlert, type NewsArticle, type Subscription, isSupabaseConfigured } from './client'

// ============================================================================
// SUPPLIER SERVICES
// ============================================================================

export interface SupplierFilters {
  tier?: number
  category?: string
  country?: string
  minRiskScore?: number
  maxRiskScore?: number
  status?: string
  searchQuery?: string
  esgMinRating?: string // 'A', 'B', 'C', etc.
  limit?: number
  offset?: number
}

export async function getSuppliers(filters: SupplierFilters = {}): Promise<{ data: Supplier[]; count: number; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: [], count: 0, error: new Error('Supabase not configured') }
  }

  let query = supabase
    .from('suppliers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters.tier) query = query.eq('tier', filters.tier)
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.country) query = query.eq('country_code', filters.country)
  if (filters.status) query = query.eq('status', filters.status)
  
  if (filters.minRiskScore !== undefined) {
    query = query.gte('risk_score', filters.minRiskScore)
  }
  if (filters.maxRiskScore !== undefined) {
    query = query.lte('risk_score', filters.maxRiskScore)
  }
  
  if (filters.searchQuery) {
    query = query.ilike('name', `%${filters.searchQuery}%`)
  }
  
  if (filters.limit) query = query.limit(filters.limit)
  if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)

  const { data, count, error } = await query

  return {
    data: (data as Supplier[]) || [],
    count: count || 0,
    error: error ? new Error(error.message) : null
  }
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  if (!isSupabaseConfigured()) return null

  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('id', id)
    .single()

  return error ? null : (data as Supplier)
}

export async function createSupplier(supplier: Partial<Supplier>): Promise<Supplier | Error> {
  if (!isSupabaseConfigured()) {
    return new Error('Supabase not configured')
  }

  const { data, error } = await supabase
    .from('suppliers')
    .insert(supplier)
    .select()
    .single()

  return error ? new Error(error.message) : (data as Supplier)
}

export async function updateSupplier(id: string, updates: Partial<Supplier>): Promise<Supplier | Error> {
  if (!isSupabaseConfigured()) {
    return new Error('Supabase not configured')
  }

  const { data, error } = await supabase
    .from('suppliers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return error ? new Error(error.message) : (data as Supplier)
}

// ============================================================================
// ORDER SERVICES
// ============================================================================

export interface OrderFilters {
  supplier_id?: string
  status?: string
  priority?: string
  dateFrom?: string
  dateTo?: string
  limit?: number
  offset?: number
}

export async function getOrders(filters: OrderFilters = {}): Promise<{ data: Order[]; count: number; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: [], count: 0, error: new Error('Supabase not configured') }
  }

  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters.supplier_id) query = query.eq('supplier_id', filters.supplier_id)
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.priority) query = query.eq('priority', filters.priority)
  
  if (filters.dateFrom) query = query.gte('expected_delivery', filters.dateFrom)
  if (filters.dateTo) query = query.lte('expected_delivery', filters.dateTo)
  
  if (filters.limit) query = query.limit(filters.limit)
  if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)

  const { data, count, error } = await query

  return {
    data: (data as Order[]) || [],
    count: count || 0,
    error: error ? new Error(error.message) : null
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured()) return null

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  return error ? null : (data as Order)
}

export async function createOrder(order: Partial<Order>): Promise<Order | Error> {
  if (!isSupabaseConfigured()) {
    return new Error('Supabase not configured')
  }

  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  return error ? new Error(error.message) : (data as Order)
}

export async function updateOrderStatus(id: string, status: string): Promise<Order | Error> {
  if (!isSupabaseConfigured()) {
    return new Error('Supabase not configured')
  }

  const updates: Record<string, any> = { 
    status, 
    updated_at: new Date().toISOString() 
  }

  // Set timestamp based on status
  switch (status) {
    case 'confirmed': updates.confirmed_at = new Date().toISOString(); break
    case 'shipped': updates.shipped_at = new Date().toISOString(); break
    case 'delivered': updates.delivered_at = new Date().toISOString(); updates.actual_delivery = new Date().toISOString(); break
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return error ? new Error(error.message) : (data as Order)
}

// ============================================================================
// RISK ALERT SERVICES
// ============================================================================

export interface AlertFilters {
  type?: string
  severity?: string
  status?: string
  dateFrom?: string
  limit?: number
}

export async function getRiskAlerts(filters: AlertFilters = {}): Promise<{ data: RiskAlert[]; count: number; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: [], count: 0, error: new Error('Supabase not configured') }
  }

  let query = supabase
    .from('risk_alerts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters.type) query = query.eq('type', filters.type)
  if (filters.severity) query = query.eq('severity', filters.severity)
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.dateFrom) query = query.gte('created_at', filters.dateFrom)
  if (filters.limit) query = query.limit(filters.limit)

  const { data, count, error } = await query

  return {
    data: (data as RiskAlert[]) || [],
    count: count || 0,
    error: error ? new Error(error.message) : null
  }
}

export async function getActiveCriticalAlerts(): Promise<RiskAlert[]> {
  if (!isSupabaseConfigured()) return []

  const { data, error } = await supabase
    .from('v_active_critical_alerts')
    .select('*')

  return (error || !data) ? [] : (data as RiskAlert[])
}

export async function createRiskAlert(alert: Partial<RiskAlert>): Promise<RiskAlert | Error> {
  if (!isSupabaseConfigured()) {
    return new Error('Supabase not configured')
  }

  const { data, error } = await supabase
    .from('risk_alerts')
    .insert(alert)
    .select()
    .single()

  return error ? new Error(error.message) : (data as RiskAlert)
}

export async function resolveAlert(id: string, resolutionNotes: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false

  const { error } = await supabase
    .from('risk_alerts')
    .update({
      status: 'resolved',
      resolved_at: new Date().toISOString(),
      resolution_notes: resolutionNotes,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  return !error
}

// ============================================================================
// NEWS ARTICLES SERVICES
// ============================================================================

export interface NewsFilters {
  category?: string
  sourceType?: string
  impact?: string
  sentiment?: string
  limit?: number
  offset?: number
  searchQuery?: string
}

export async function getNewsArticles(filters: NewsFilters = {}): Promise<{ data: NewsArticle[]; count: number; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: [], count: 0, error: new Error('Supabase not configured') }
  }

  let query = supabase
    .from('news_articles')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })

  if (filters.category) query = query.eq('category', filters.category)
  if (filters.sourceType) query = query.eq('source_type', filters.sourceType)
  if (filters.impact) query = query.eq('impact', filters.impact)
  if (filters.sentiment) query = query.eq('sentiment', filters.sentiment)
  if (filters.searchQuery) query = query.ilike('title', `%${filters.searchQuery}%`)
  if (filters.limit) query = query.limit(filters.limit)
  if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)

  const { data, count, error } = await query

  return {
    data: (data as NewsArticle[]) || [],
    count: count || 0,
    error: error ? new Error(error.message) : null
  }
}

export async function getHighImpactNews(): Promise<NewsArticle[]> {
  if (!isSupabaseConfigured()) return []

  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('impact', 'high')
    .order('published_at', { ascending: false })
    .limit(10)

  return (error || !data) ? [] : (data as NewsArticle[])
}

export async function createNewsArticle(article: Partial<NewsArticle>): Promise<NewsArticle | Error> {
  if (!isSupabaseConfigured()) {
    return new Error('Supabase not configured')
  }

  const { data, error } = await supabase
    .from('news_articles')
    .insert(article)
    .select()
    .single()

  return error ? new Error(error.message) : (data as NewsArticle)
}

// ============================================================================
// SUBSCRIPTION & USAGE SERVICES
// ============================================================================

export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  if (!isSupabaseConfigured()) return null

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()

  return error ? null : (data as Subscription)
}

export async function checkUsageLimit(userId: string, action: 'ai_query' | 'api_call'): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  if (!isSupabaseConfigured()) {
    return { allowed: true, remaining: Infinity, limit: Infinity }
  }

  const subscription = await getUserSubscription(userId)
  
  if (!subscription) {
    return { allowed: false, remaining: 0, limit: 0 }
  }

  const limits = subscription.limits as any
  const currentUsage = action === 'ai_query' ? subscription.daily_ai_queries : subscription.daily_api_calls
  const limit = action === 'ai_query' ? limits.daily_ai_queries : limits.daily_api_calls

  return {
    allowed: currentUsage < limit,
    remaining: Math.max(0, limit - currentUsage),
    limit
  }
}

export async function incrementUsage(userId: string, action: 'ai_query' | 'api_call'): Promise<void> {
  if (!isSupabaseConfigured()) return

  const field = action === 'ai_query' ? 'daily_ai_queries' : 'daily_api_calls'

  await supabase.rpc('increment_usage_counter', {
    user_id_param: userId,
    field_name: field
  })
}

// ============================================================================
// REAL-TIME SUBSCRIPTIONS
// ============================================================================

export function subscribeToAlerts(callback: (alert: RiskAlert) => void) {
  if (!isSupabaseConfigured()) return { unsubscribe: () => {} }

  return supabase
    .channel('risk-alerts-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'risk_alerts'
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          callback(payload.new as RiskAlert)
        }
      }
    )
    .subscribe()
}

export function subscribeToOrders(supplierId: string, callback: (order: Order) => void) {
  if (!isSupabaseConfigured()) return { unsubscribe: () => {} }

  return supabase
    .channel(`orders-${supplierId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `supplier_id=eq.${supplierId}`
      },
      (payload) => {
        callback(payload.new as Order)
      }
    )
    .subscribe()
}

// ============================================================================
// ANALYTICS & AGGREGATION
// ============================================================================

export async function getDashboardStats(userId: string) {
  if (!isSupabaseConfigured()) {
    return {
      totalSuppliers: 0,
      activeOrders: 0,
      activeAlerts: 0,
      aiQueriesToday: 0
    }
  }

  // Run multiple queries in parallel
  const [suppliersResult, ordersResult, alertsResult, usageResult] = await Promise.all([
    supabase.from('suppliers').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'in', ('pending,confirmed,in_production,shipped')),
    supabase.from('risk_alerts').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('ai_query_logs').select('id', { count: 'exact', head: true }).eq('user_id', userId).gte('created_at', new Date().toISOString().split('T')[0])
  ])

  return {
    totalSuppliers: suppliersResult.count || 0,
    activeOrders: ordersResult.count || 0,
    activeAlerts: alertsResult.count || 0,
    aiQueriesToday: usageResult.count || 0
  }
}

export async function getRiskTrend(days: number = 30): Promise<Array<{ date: string; critical: number; high: number; medium: number }>> {
  if (!isSupabaseConfigured()) return []

  const sinceDate = new Date()
  sinceDate.setDate(sinceDate.getDate() - days)

  const { data, error } = await supabase
    .from('risk_alerts')
    .select('severity, created_at')
    .gte('created_at', sinceDate.toISOString())
    .order('created_at')

  if (error || !data) return []

  // Aggregate by day and severity
  const trendMap: Record<string, { critical: number; high: number; medium: number }> = {}

  data.forEach((alert: any) => {
    const date = alert.created_at.split('T')[0]
    if (!trendMap[date]) {
      trendMap[date] = { critical: 0, high: 0, medium: 0 }
    }
    
    if (alert.severity in trendMap[date]) {
      trendMap[date][alert.severity as keyof typeof trendMap[string]]++
    }
  })

  return Object.entries(trendMap)
    .map(([date, counts]) => ({ date, ...counts }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Export all services
export default {
  // Suppliers
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  
  // Orders
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  
  // Alerts
  getRiskAlerts,
  getActiveCriticalAlerts,
  createRiskAlert,
  resolveAlert,
  
  // News
  getNewsArticles,
  getHighImpactNews,
  createNewsArticle,
  
  // Subscriptions
  getUserSubscription,
  checkUsageLimit,
  incrementUsage,
  
  // Real-time
  subscribeToAlerts,
  subscribeToOrders,
  
  // Analytics
  getDashboardStats,
  getRiskTrend
}
