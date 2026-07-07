// components/LoadingView.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Colors, spacing } from '../theme/colors';
import { createSharedStyles } from '../theme/styles';

export function LoadingView({ message = 'Caricamento...' }: { message?: string }) {
  const shared = createSharedStyles(Colors);

  return (
    <View style={shared.centered} accessibilityLabel="Caricamento in corso">
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.textPrimary,
    fontSize: 14,
    marginTop: spacing.sm,
  },
});
