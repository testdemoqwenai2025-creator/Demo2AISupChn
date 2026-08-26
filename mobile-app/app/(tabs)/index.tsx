import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  RefreshControl,
  Animated
} from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Truck,
  Globe,
  Shield,
  Zap,
  ChevronRight,
  Activity,
  BarChart3,
  ArrowUpRight,
  Clock,
  Star,
} from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

// Mock data for demonstration
const mockStats = [
  { label: 'Active Suppliers', value: '12,450', icon: Truck, color: '#3b82f6', change: '+2.4%' },
  { label: 'Risk Alerts', value: '23', icon: AlertTriangle, color: '#ef4444', change: '-12%' },
  { label: 'AI Queries Today', value: '1,247', icon: Brain, color: '#8b5cf6', change: '+18%' },
  { label: 'Cost Savings', value: '$2.1M', icon: TrendingUp, color: '#10b981', change: '+8.3%' },
]

const mockAlerts = [
  { id: '1', title: 'Semiconductor shortage risk', severity: 'high', time: '2h ago' },
  { id: '2', title: 'Port congestion - Singapore', severity: 'medium', time: '4h ago' },
  { id: '3', title: 'Currency volatility alert', severity: 'low', time: '6h ago' },
]

const mockQuickActions = [
  { id: '1', label: 'AI Analysis', icon: Brain, color: '#8b5cf6', screen: 'ai-chat' },
  { id: '2', label: 'Suppliers', icon: Truck, color: '#3b82f6', screen: 'suppliers' },
  { id: '3', label: 'Alerts', icon: AlertTriangle, color: '#ef4444', screen: 'alerts' },
  { id: '4', label: 'News', icon: Globe, color: '#06b6d4', screen: 'news' },
  { id: '5', label: 'Dashboard', icon: BarChart3, color: '#f59e0b', screen: 'dashboard' },
  { id: '6', label: 'Settings', icon: Shield, color: '#6b7280', screen: 'settings' },
]

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const [refreshing, setRefreshing] = useState(false)
  const [greeting, setGreeting] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    // Animate entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 10 }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
      }
    >
      {/* Header Section */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <LinearGradient
          colors={['#1e293b', '#0f172a']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.userName}>Welcome back, User</Text>
            </View>
            
            <TouchableOpacity style={styles.avatarContainer}>
              <Text style={styles.avatarText}>U</Text>
            </TouchableOpacity>
          </View>

          {/* Status Banner */}
          <View style={styles.statusBanner}>
            <Activity size={14} color="#10b981" />
            <Text style={styles.statusText}>All systems operational • Last sync: just now</Text>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {mockStats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              style={[
                styles.statCard,
                { animationDelay: `${index * 100}ms` }
              ]}
            >
              <LinearGradient
                colors={[`${stat.color}20`, `${stat.color}05`]}
                style={styles.statCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${stat.color}20` }]}>
                  <stat.icon size={22} color={stat.color} />
                </View>
                
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                
                <View style={styles.changeContainer}>
                  <ArrowUpRight size={12} color="#10b981" />
                  <Text style={styles.changeText}>{stat.change}</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            {mockQuickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <LinearGradient
                  colors={[`${action.color}`, `${action.color}cc`]}
                  style={styles.actionIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <action.icon size={22} color="#ffffff" />
                </LinearGradient>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.alertsList}>
            {mockAlerts.map((alert) => (
              <TouchableOpacity key={alert.id} style={styles.alertCard}>
                <View style={[
                  styles.severityIndicator,
                  { 
                    backgroundColor: 
                      alert.severity === 'high' ? '#ef4444' :
                      alert.severity === 'medium' ? '#f59e0b' : '#6b7280'
                  }
                ]} />
                
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <View style={styles.alertMeta}>
                    <Clock size={12} color="#64748b" />
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                </View>

                <ChevronRight size={18} color="#64748b" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Insight Card */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#8b5cf620', '#3b82f620']}
            style={styles.aiInsightCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.aiHeader}>
              <Brain size={24} color="#8b5cf6" />
              <View>
                <Text style={styles.aiTitle}>AI Daily Briefing</Text>
                <Text style={styles.aiSubtitle}>Personalized insights ready</Text>
              </View>
              <Star size={18} color="#f59e0b" />
            </View>

            <Text style={styles.aiSummary}>
              Based on today's data analysis, we've identified 3 optimization opportunities 
              and 2 potential risks requiring attention.
            </Text>

            <TouchableOpacity style={styles.aiButton}>
              <Zap size={16} color="#ffffff" />
              <Text style={styles.aiButtonText}>View AI Insights</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 100 }} />
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 20,
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b98120',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#10b981',
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    width: (width - 48) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 16,
    height: 140,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  changeText: {
    fontSize: 12,
    color: '#10b981',
    marginLeft: 2,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 56) / 3,
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 13,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  alertsList: {
    gap: 12,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
  },
  severityIndicator: {
    width: 4,
    height: '80%',
    borderRadius: 2,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 4,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTime: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 4,
  },
  aiInsightCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#8b5cf630',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  aiSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginLeft: 12,
  },
  aiSummary: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
    marginBottom: 16,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  aiButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
})
