import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: isDark ? '#90CAF9' : '#1976D2',
        tabBarInactiveTintColor: isDark ? '#777' : '#999',

        tabBarStyle: {
          backgroundColor: isDark ? '#000000' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#222' : '#e0e0e0',
          paddingTop: 8,
          paddingBottom: insets.bottom, 
          height: Platform.OS === 'android' ? 60 + insets.bottom : 88,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
