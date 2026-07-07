// navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { MealsListScreen } from '../screens/MealsListScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type AppStackParamList = {
  Tabs: undefined;
  MealDetail: { idMeal: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.white,
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
      }}
    >
      <Tab.Screen
        name="MealsList"
        component={MealsListScreen}
        options={{
          title: 'Piatti Italiani',
          tabBarLabel: 'Piatti',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🍝</Text>,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Preferiti',
          tabBarLabel: 'Preferiti',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>❤️</Text>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Impostazioni',
          tabBarLabel: 'Impostazioni',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.white,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{
          title: 'Dettaglio Piatto',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
