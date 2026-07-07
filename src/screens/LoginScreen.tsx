// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MOCK_USERS, validateLogin } from '../services/auth';

export function LoginScreen() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    if (!email.trim() || !password) {
      setError('Inserisci email e password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = validateLogin(email, password);
      setLoading(false);
      if (user) {
        login(user);
      } else {
        setError('Email o password non validi.');
      }
    }, 400);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.flag}>🇮🇹</Text>
          <Text style={[styles.title, { color: theme.primary }]}>Italian Meals</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Scopri i piatti della cucina italiana</Text>
        </View>

        <View style={styles.form}>
          <Text style={[styles.label, { color: theme.textPrimary }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                borderColor: error ? theme.error : theme.primary,
                color: theme.textPrimary,
              },
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="mario.rossi@student.it"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            accessibilityLabel="Campo email"
          />

          <Text style={[styles.label, { color: theme.textPrimary }]}>Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                borderColor: error ? theme.error : theme.primary,
                color: theme.textPrimary,
              },
            ]}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            accessibilityLabel="Campo password"
          />

          {error !== '' && (
            <Text style={styles.errorMsg} accessibilityLiveRegion="polite">
              ⚠️ {error}
            </Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: theme.primary },
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
            accessibilityLabel="Accedi all'applicazione"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>
              {loading ? 'Accesso...' : 'Accedi'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.hint}>
          <Text style={[styles.hintTitle, { color: theme.textPrimary }]}>Utenti di test:</Text>
          {MOCK_USERS.map((user) => (
            <Text key={user.email} style={[styles.hintText, { color: theme.textSecondary }]}> 
              {user.email} / {user.password}
            </Text>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 18,
    justifyContent: 'center',
  },
  header: { alignItems: 'center' },
  flag: { fontSize: 50 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, textAlign: 'center' },
  form: {},
  label: { fontSize: 14, marginBottom: 6 },
  input: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  inputError: { borderWidth: 2 },
  errorMsg: { color: '#dc2626', fontSize: 13, marginBottom: 10 },
  button: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonPressed: { opacity: 0.9 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: 15, fontWeight: '700' },
  hint: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    marginTop: 12,
  },
  hintTitle: { marginBottom: 6, fontSize: 13, fontWeight: '700' },
  hintText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
