// components/ErrorView.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({
  message = 'Errore di rete. Controlla la connessione.',
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={styles.container} accessibilityLabel={`Errore: ${message}`}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: Colors.background,
  },
  icon: { fontSize: 48 },
  message: {
    color: '#b91c1c',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#fca5a5',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f87171',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#7f1d1d',
    fontSize: 16,
    fontWeight: '700',
  },
});
