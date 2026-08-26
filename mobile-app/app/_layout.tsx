import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Notifications from 'expo-notifications'

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function RootLayout() {
  const colorScheme = useColorScheme()

  // Request notification permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      
      if (finalStatus !== 'granted') {
        console.log('Notification permission not granted!')
      }
    }

    requestPermissions()

    // Listen for notifications
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification)
    })

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0f172a',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#0f172a',
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" options={{ title: 'AI Supply Chain' }} />
          <Stack.Screen 
            name="dashboard" 
            options={{ title: 'Dashboard', headerShown: false }} 
          />
          <Stack.Screen 
            name="suppliers" 
            options={{ title: 'Suppliers', headerShown: false }} 
          />
          <Stack.Screen 
            name="alerts" 
            options={{ title: 'Risk Alerts', headerShown: false }} 
          />
          <Stack.Screen 
            name="ai-chat" 
            options={{ title: 'AI Assistant', headerShown: false }} 
          />
          <Stack.Screen 
            name="news" 
            options={{ title: 'Market Intelligence', headerShown: false }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ title: 'Settings' }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
