import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MockUser } from '../services/auth';

interface AuthContextType {
  user: MockUser | null;
  isLoading: boolean;
  login: (user: MockUser) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'italian-meals:auth:v1';

const AuthContext = createContext<AuthContextType | null>(null);

function isValidUser(value: unknown): value is MockUser {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<MockUser>;
  return (
    typeof candidate.email === 'string' &&
    typeof candidate.password === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.avatarUri === 'string'
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (!isMounted) return;

        if (raw) {
          const parsed = JSON.parse(raw);
          if (isValidUser(parsed)) {
            setUser(parsed);
          } else {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    async function persist() {
      try {
        if (user) {
          await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        // Best-effort persistence: the in-memory state remains authoritative.
      }
    }

    persist();
  }, [isLoading, user]);

  const login = (nextUser: MockUser) => {
    setUser(nextUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
