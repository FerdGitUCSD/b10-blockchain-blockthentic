import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#7d8ec4', // Matching the blue bottom bar color
          height: 80, // Taller to accommodate the curve shape
          borderTopLeftRadius: 50, // Creates the curved effect on sides
          borderTopRightRadius: 50,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#003262', // Dark blue for active icon
        tabBarInactiveTintColor: '#000', // Black for inactive (per image)
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
             <Ionicons name="home-outline" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}