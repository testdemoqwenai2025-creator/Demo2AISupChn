import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Types
export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  plan: 'free' | 'pro' | 'enterprise'
  company?: string
}

export interface Supplier {
  id: string
  name: string
  tier: number
  riskScore: number
  status: 'active' | 'inactive' | 'under_review'
  category: string
  country: string
}

export interface Alert {
  id: string
  title: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: string
  description: string
  timestamp: Date
  isRead: boolean
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

// App Store Interface
interface AppStore {
  // Auth State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // UI State
  isDarkMode: boolean
  selectedTab: string
  showOnboarding: boolean
  
  // Data State
  suppliers: Supplier[]
  alerts: Alert[]
  messages: Message[]
  
  // Actions - Auth
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
  
  // Actions - UI
  toggleDarkMode: () => void
  setSelectedTab: (tab: string) => void
  setShowOnboarding: (show: boolean) => void
  
  // Actions - Data
  setSuppliers: (suppliers: Supplier[]) => void
  addAlert: (alert: Alert) => void
  markAlertAsRead: (alertId: string) => void
  addMessage: (message: Message) => void
  clearMessages: () => void
  
  // Actions - Refresh
  refreshData: () => Promise<void>
}

// Create the store with persistence
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      isDarkMode: true,
      selectedTab: 'home',
      showOnboarding: true,
      
      suppliers: [],
      alerts: [],
      messages: [],
      
      // Auth Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          // Demo credentials check
          if ((email === 'demo@aisupchn.com' && password === 'demo123') ||
              (email === 'pro@aisupchn.com' && password === 'pro123')) {
            
            const user: User = {
              id: '1',
              email,
              displayName: email.split('@')[0],
              plan: email.includes('pro') ? 'pro' : 'free',
              company: 'Demo Corp',
            }
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              showOnboarding: false,
            })
            
            return true
          }
          
          set({ isLoading: false })
          return false
        } catch (error) {
          set({ isLoading: false })
          console.error('Login error:', error)
          return false
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          suppliers: [],
          alerts: [],
          messages: [],
        })
      },
      
      setUser: (user) => set({ user }),
      
      // UI Actions
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSelectedTab: (tab) => set({ selectedTab: tab }),
      setShowOnboarding: (show) => set({ showOnboarding: show }),
      
      // Data Actions
      setSuppliers: (suppliers) => set({ suppliers }),
      
      addAlert: (alert) => set((state) => ({
        alerts: [alert, ...state.alerts],
      })),
      
      markAlertAsRead: (alertId) => set((state) => ({
        alerts: state.alerts.map(alert =>
          alert.id === alertId ? { ...alert, isRead: true } : alert
        ),
      })),
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
      })),
      
      clearMessages: () => set({ messages: [] }),
      
      // Refresh Action
      refreshData: async () => {
        set({ isLoading: true })
        
        try {
          // Simulate data refresh
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock data updates would happen here
          console.log('Data refreshed')
        } catch (error) {
          console.error('Refresh error:', error)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'aisupchain-mobile-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isDarkMode: state.isDarkMode,
        showOnboarding: state.showOnboarding,
        selectedTab: state.selectedTab,
      }),
    }
  )
)

// Export types for use in components
export type { AppStore }
