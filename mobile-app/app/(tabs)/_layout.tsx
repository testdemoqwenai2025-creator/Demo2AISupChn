import { Tabs } from 'expo-router'
import {
  LayoutDashboard,
  Truck,
  AlertTriangle,
  MessageCircle,
  Newspaper,
  Settings,
  Brain,
  BarChart3,
} from '@expo/vector-icons'
import { useColorScheme, Pressable, View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#64748b',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
          position: 'absolute',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        headerStyle: {
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
        },
        headerTintColor: isDark ? '#ffffff' : '#000000',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              icon={<LayoutDashboard size={size} color={color} />} 
              focused={focused}
              label="Home"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              icon={<BarChart3 size={size} color={color} />} 
              focused={focused}
              label="Dashboard"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="suppliers"
        options={{
          title: 'Suppliers',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              icon={<Truck size={size} color={color} />} 
              focused={focused}
              label="Suppliers"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              icon={<AlertTriangle size={size} color={color} />} 
              focused={focused}
              label="Alerts"
              badge={3}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ai-chat"
        options={{
          title: 'AI Assistant',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              icon={<Brain size={size} color={color} />} 
              focused={focused}
              label="AI"
              isCenter
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              icon={<Newspaper size={size} color={color} />} 
              focused={focused}
              label="News"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              icon={<Settings size={size} color={color} />} 
              focused={focused}
              label="Settings"
            />
          ),
        }}
      </Tabs>
  )
}

// Custom Tab Bar Icon Component
function TabBarIcon({ 
  icon, 
  focused, 
  label, 
  badge,
  isCenter = false 
}: { 
  icon: React.ReactNode
  focused: boolean
  label: string
  badge?: number
  isCenter?: boolean
}) {
  if (isCenter) {
    return (
      <View style={styles.centerButtonContainer}>
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6']}
          style={styles.centerButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {icon}
        </LinearGradient>
        <Text style={[styles.centerLabel, focused && styles.centerLabelFocused]}>
          {label}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.iconContainer}>
      {icon}
      {badge !== undefined && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
      <Text style={[styles.label, focused && styles.labelFocused]}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -15,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  centerLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#64748b',
  },
  centerLabelFocused: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    color: '#64748b',
  },
  labelFocused: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -12,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})
