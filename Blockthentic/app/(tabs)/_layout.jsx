import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function TabLayout() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.loading && !auth?.user) {
      router.replace('/auth');
    }
  }, [auth?.loading, auth?.user, router]);

  if (!auth || auth.loading) {
    return null;
  }

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
          backgroundColor: '#7d8ec4',
          height: 80,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#003262',
        tabBarInactiveTintColor: '#000',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
             <Ionicons name="home-outline" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="verify"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-checkmark-outline" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
