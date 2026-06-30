// components/LoadingView.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

export function LoadingView({ message = 'Caricamento...' }: { message?: string }) {
  return (
    <View style={styles.container} accessibilityLabel="Caricamento in corso">
      <ActivityIndicator size="large" color={Colors.green} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff5f5',
  },
  text: {
    color: Colors.green,
    fontSize: 14,
  },
});
