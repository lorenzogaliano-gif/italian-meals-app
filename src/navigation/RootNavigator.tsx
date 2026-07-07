// navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { AppNavigator } from './AppNavigator';
import { Colors } from '../theme/colors';

const prefix = Linking.createURL('/');

const linking: any = {
  prefixes: [prefix, 'italianmeals://'],
  config: {
    screens: {
      App: {
        screens: {
          Tabs: {
            screens: {
              MealsList: 'meals',
              Favorites: 'favorites',
              Settings: 'settings',
            },
          },
          MealDetail: 'meal/:idMeal',
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: true,
              title: 'Italian Meals 🇮🇹',
              headerStyle: { backgroundColor: Colors.primary },
              headerTintColor: Colors.white,
              headerTitleStyle: { fontWeight: '800' },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
