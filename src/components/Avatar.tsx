// components/Avatar.tsx  (pattern lab 07)
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface AvatarProps {
  uri: string;
  size?: number;
}

export function Avatar({ uri, size = 48 }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const radius = size / 2;

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: radius },
      ]}
    >
      {failed ? (
        <Text style={[styles.fallback, { lineHeight: size, fontSize: size * 0.4 }]}>
          ?
        </Text>
      ) : (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          onError={() => setFailed(true)}
          accessibilityLabel="Avatar utente"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.green,
    backgroundColor: '#fff5f5',
  },
  fallback: {
    textAlign: 'center',
    color: Colors.textSecondary,
  },
});
