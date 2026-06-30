// navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { MealsListScreen } from '../screens/MealsListScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { Colors } from '../theme/colors';

export type AppStackParamList = {
  Tabs: undefined;
  MealDetail: { idMeal: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.green },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.textSecondary,
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
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{
          title: 'Dettaglio Piatto',
          headerStyle: { backgroundColor: Colors.green },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
    </Stack.Navigator>
  );
}
