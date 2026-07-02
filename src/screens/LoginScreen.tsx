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
import { MOCK_USERS, validateLogin } from '../services/auth';
import { Colors } from '../theme/colors';

export function LoginScreen() {
  const { login } = useAuth();
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
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.flag}>🇮🇹</Text>
          <Text style={styles.title}>Italian Meals</Text>
          <Text style={styles.subtitle}>Scopri i piatti della cucina italiana</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={email}
            onChangeText={setEmail}
            placeholder="mario.rossi@student.it"
            placeholderTextColor={Colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            accessibilityLabel="Campo email"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={Colors.textSecondary}
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
          <Text style={styles.hintTitle}>Utenti di test:</Text>
          {MOCK_USERS.map((user) => (
            <Text key={user.email} style={styles.hintText}>
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
    backgroundColor: '#ffe4e6',
    padding: 18,
    justifyContent: 'center',
  },
  header: { alignItems: 'center' },
  flag: { fontSize: 50 },
  title: { fontSize: 28, color: Colors.green },
  subtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  form: {},
  label: { fontSize: 14, color: Colors.textPrimary, marginBottom: 6 },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.green,
    padding: 12,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  inputError: { borderColor: Colors.error },
  errorMsg: { color: Colors.error, fontSize: 13, marginBottom: 10 },
  button: {
    backgroundColor: Colors.green,
    borderRadius: 0,
    padding: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonPressed: { opacity: 0.9 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: Colors.white, fontSize: 15 },
  hint: {
    backgroundColor: '#fff5f5',
    borderRadius: 0,
    padding: 12,
    borderWidth: 2,
    borderColor: Colors.green,
  },
  hintTitle: { color: Colors.textPrimary, marginBottom: 6, fontSize: 13 },
  hintText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
