// components/ErrorView.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, spacing } from '../theme/colors';
import { createSharedStyles } from '../theme/styles';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({
  message = 'Errore di rete. Controlla la connessione.',
  onRetry,
}: ErrorViewProps) {
  const shared = createSharedStyles(Colors);

  return (
    <View style={shared.centered} accessibilityLabel={`Errore: ${message}`}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}
          accessibilityLabel="Riprova a caricare i dati"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Riprova</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: { fontSize: 48 },
  message: {
    color: '#b91c1c',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 14,
    marginTop: spacing.md,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
