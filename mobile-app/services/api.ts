// API Service Layer for AI Supply Chain Mobile App
// Handles all communication with backend services

import { Platform } from 'react-native'

// Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // Development
  : 'https://api.aisupchain.com/api'  // Production

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ''

// Types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
  meta?: {
    total?: number
    page?: number
    limit?: number
    hasMore?: boolean
  }
}

export interface PaginatedParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, any>
}

// Error handling
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Request helper with auth token injection
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get auth token from storage (simplified)
  // In real app, use AsyncStorage or secure storage
  const token = typeof globalThis !== 'undefined' ? (globalThis as any).__authToken : null
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Platform': Platform.OS,
    'X-App-Version': '1.0.0',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Handle different status codes
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || `Request failed with status ${response.status}`,
        response.status,
        errorData.code
      )
    }

    const data = await response.json()
    
    return {
      data: data.data ?? data,
      error: null,
      success: true,
      meta: data.meta,
    }
  } catch (error) {
    console.error('API Request failed:', error)
    
    if (error instanceof ApiError) {
      return {
        data: null,
        error: error.message,
        success: false,
      }
    }

    return {
      data: null,
      error: 'Network error. Please check your connection.',
      success: false,
    }
  }
}

// ============================================================================
// AUTHENTICATION SERVICES
// ============================================================================

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpData extends LoginCredentials {
  displayName: string
  company?: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    displayName: string
    plan: string
  }
  token: string
  refreshToken: string
  expiresIn: number
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  async signUp(data: SignUpData): Promise<ApiResponse<AuthResponse>> {
    return request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async logout(): Promise<ApiResponse<void>> {
    return request<void>('/auth/logout', {
      method: 'POST',
    })
  },

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string }>> {
    return request<{ token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  },

  async getProfile(): Promise<ApiResponse<any>> {
    return request<any>('/auth/profile')
  },
}

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
  search?: string
}

export const supplierService = {
  async getSuppliers(params?: PaginatedParams & SupplierFilters): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    if (params?.search) queryParams.set('search', params.search)
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.set(`filter[${key}]`, String(value))
        }
      })
    }

    const queryString = queryParams.toString()
    return request<any[]>(`/suppliers${queryString ? `?${queryString}` : ''}`)
  },

  async getSupplierById(id: string): Promise<ApiResponse<any>> {
    return request<any>(`/suppliers/${id}`)
  },

  async createSupplier(data: Partial<any>): Promise<ApiResponse<any>> {
    return request<any>('/suppliers', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async updateSupplier(id: string, data: Partial<any>): Promise<ApiResponse<any>> {
    return request<any>(`/suppliers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
}

// ============================================================================
// RISK ALERT SERVICES
// ============================================================================

export interface AlertFilters {
  type?: string
  severity?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}

export const alertService = {
  async getAlerts(params?: PaginatedParams & AlertFilters): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    if (params?.filters?.severity) queryParams.set('severity', params.filters.severity)
    if (params?.filters?.type) queryParams.set('type', params.filters.type)
    if (params?.filters?.status) queryParams.set('status', params.filters.status)

    const queryString = queryParams.toString()
    return request<any[]>(`/alerts${queryString ? `?${queryString}` : ''}`)
  },

  async getActiveAlerts(): Promise<ApiResponse<any[]>> {
    return request<any[]>('/alerts/active')
  },

  async getAlertById(id: string): Promise<ApiResponse<any>> {
    return request<any>(`/alerts/${id}`)
  },

  async markAsRead(id: string): Promise<ApiResponse<void>> {
    return request<void>(`/alerts/${id}/read`, {
      method: 'PATCH',
    })
  },

  async resolveAlert(id: string, notes?: string): Promise<ApiResponse<void>> {
    return request<void>(`/alerts/${id}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    })
  },
}

// ============================================================================
// AI SERVICES
// ============================================================================

export interface AIQuery {
  queryType: 'risk_analysis' | 'demand_forecast' | 'supplier_intelligence' | 'natural_language'
  queryText: string
  context?: Record<string, any>
}

export interface AIResponse {
  id: string
  response: string
  confidence: number
  modelUsed: string
  tokensUsed: number
  latencyMs: number
  suggestions?: string[]
}

export const aiService = {
  async query(aiQuery: AIQuery): Promise<ApiResponse<AIResponse>> {
    return request<AIResponse>('/ai/query', {
      method: 'POST',
      body: JSON.stringify(aiQuery),
    })
  },

  async chat(messages: Array<{ role: string; content: string }>): Promise<ApiResponse<AIResponse>> {
    return request<AIResponse>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    })
  },

  async analyzeSupplier(supplierId: string): Promise<ApiResponse<any>> {
    return request<any>(`/ai/suppliers/${supplierId}/analyze`)
  },

  async predictDemand(params: {
    productId: string
    timeframe: string
    region?: string
  }): Promise<ApiResponse<any>> {
    return request<any>('/ai/predict/demand', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },

  async getDailyBriefing(): Promise<ApiResponse<any>> {
    return request<any>('/ai/briefing/daily')
  },
}

// ============================================================================
// NEWS & MARKET INTELLIGENCE SERVICES
// ============================================================================

export interface NewsFilters {
  category?: string
  source?: string
  impact?: string
  sentiment?: string
  dateFrom?: string
}

export const newsService = {
  async getNews(params?: PaginatedParams & NewsFilters): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    if (params?.filters?.category) queryParams.set('category', params.filters.category)
    if (params?.filters?.source) queryParams.set('source', params.filters.source)

    const queryString = queryParams.toString()
    return request<any[]>(`/news${queryString ? `?${queryString}` : ''}`)
  },

  async getHighImpactNews(): Promise<ApiResponse<any[]>> {
    return request<any[]>('/news/high-impact')
  },

  async getMarketIndices(): Promise<ApiResponse<any[]>> {
    return request<any[]>('/news/markets/indices')
  },

  async getCommodityPrices(): Promise<ApiResponse<any[]>> {
    return request<any[]>('/news/markets/commodities')
  },

  async getCurrencyRates(): Promise<ApiResponse<any[]>> {
    return request<any[]>('/news/markets/currencies')
  },
}

// ============================================================================
// DASHBOARD & ANALYTICS SERVICES
// ============================================================================

export const dashboardService = {
  async getStats(): Promise<ApiResponse<{
    totalSuppliers: number
    activeOrders: number
    activeAlerts: number
    aiQueriesToday: number
    costSavings: number
    riskScore: number
  }>> {
    return request<any>('/dashboard/stats')
  },

  async getChartData(type: string, period: string): Promise<ApiResponse<any[]>> {
    return request<any[]>(`/dashboard/charts?type=${type}&period=${period}`)
  },

  async getActivityLog(params?: PaginatedParams): Promise<ApiResponse<any[]>> {
    return request<any[]>('/dashboard/activity', { params })
  },
}

// ============================================================================
// NOTIFICATION SERVICES
// ============================================================================

export const notificationService = {
  async getNotifications(unreadOnly?: boolean): Promise<ApiResponse<any[]>> {
    const query = unreadOnly ? '?unread=true' : ''
    return request<any[]>(`/notifications${query}`)
  },

  async markAsRead(notificationId: string): Promise<ApiResponse<void>> {
    return request<void>(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    })
  },

  async markAllRead(): Promise<ApiResponse<void>> {
    return request<void>('/notifications/read-all', {
      method: 'PATCH',
    })
  },

  async updatePreferences(preferences: Record<string, any>): Promise<ApiResponse<void>> {
    return request<void>('/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    })
  },
}

// ============================================================================
// EXPORT ALL SERVICES
// ============================================================================

export default {
  auth: authService,
  suppliers: supplierService,
  alerts: alertService,
  ai: aiService,
  news: newsService,
  dashboard: dashboardService,
  notifications: notificationService,
}
