// app/_layout.jsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Standard icon library included in Expo

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        // Global styles for the tab bar
        tabBarStyle: {
          backgroundColor: '#003262', // UC Blue Background
          borderTopColor: '#FDB515', // Gold border on top
          height: 60, // A bit taller for better touch targets
        },
        tabBarActiveTintColor: '#FDB515', // Gold text/icon when active
        tabBarInactiveTintColor: '#fff', // White text/icon when inactive
        headerStyle: {
          backgroundColor: '#003262', // Header background color
        },
        headerTintColor: '#fff', // Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Tab 1: Home */}
      <Tabs.Screen
        name="index" // This points to index.jsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,           
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* Tab 2: Create */}
      <Tabs.Screen
        name="create" // This points to create.jsx
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}