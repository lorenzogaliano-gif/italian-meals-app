// components/Avatar.tsx  (pattern lab 07)
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface AvatarProps {
  uri: string;
  name?: string;
  size?: number;
}

function getInitials(name?: string): string {
  if (!name) return '?';

  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({ uri, name, size = 48 }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const radius = size / 2;
  const hasUri = Boolean(uri && uri.trim());
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radius,
        },
      ]}
    >
      {failed || !hasUri ? (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallback}>{initials}</Text>
        </View>
      ) : (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          onError={() => setFailed(true)}
          onLoad={() => setFailed(false)}
          accessibilityLabel="Avatar utente"
          resizeMode="cover"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primary,
    backgroundColor: '#fff5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  fallback: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});
