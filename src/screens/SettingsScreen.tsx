import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from '../components/Avatar';

export function SettingsScreen() {
  const { user, logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.primary }]}> 
        <Avatar uri={user?.avatarUri ?? ''} name={user?.name} size={72} />
        <Text style={[styles.name, { color: theme.textPrimary }]}>{user?.name ?? 'Utente'}</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>{user?.email ?? 'Nessun utente'}</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}> 
          Questa schermata raccoglie le impostazioni principali dell'app.
        </Text>
        <View style={styles.actions}>
          <Pressable
            style={[styles.secondaryButton, { backgroundColor: theme.card, borderColor: theme.primary }]}
            onPress={toggleTheme}
            accessibilityLabel="Cambia modalità chiaro/scuro"
            accessibilityRole="button"
          >
            <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
              {isDark ? '☀️ Modalità chiara' : '🌙 Modalità scura'}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={logout}
            accessibilityLabel="Logout dall'applicazione"
            accessibilityRole="button"
          >
            <Text style={[styles.buttonText, { color: theme.white }]}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: 10,
    marginTop: 8,
  },
  secondaryButton: {
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontWeight: '700',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: '700',
  },
});
