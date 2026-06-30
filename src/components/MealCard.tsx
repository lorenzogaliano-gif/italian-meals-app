// components/MealCard.tsx
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';
import type { MealSummary } from '../services/mealsApi';
import { useFavorites } from '../context/FavoritesContext';

interface MealCardProps {
  meal: MealSummary;
  onPress: () => void;
}

export function MealCard({ meal, onPress }: MealCardProps) {
  // Lab 17: la card legge/aggiorna i preferiti tramite Context, senza
  // prop drilling dello stato di favorite dalla schermata.
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(meal.idMeal);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      accessibilityLabel={`Piatto: ${meal.strMeal}. Tocca per aprire il dettaglio.`}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: meal.strMealThumb }}
        style={styles.image}
        accessibilityLabel={`Foto di ${meal.strMeal}`}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {meal.strMeal}
        </Text>
        <Text style={styles.area}>🇮🇹 Cucina Italiana</Text>
      </View>
      <Pressable
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(meal.idMeal)}
        hitSlop={10}
        accessibilityLabel={favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        accessibilityRole="button"
      >
        <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe4e6',
    marginHorizontal: 10,
    marginVertical: 4,
    borderWidth: 2,
    borderColor: Colors.green,
  },
  cardPressed: {
    opacity: 0.9,
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  area: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  favoriteButton: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
  },
});
