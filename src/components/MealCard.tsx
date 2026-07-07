// components/MealCard.tsx
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, spacing } from '../theme/colors';
import type { MealSummary } from '../services/mealsApi';
import { useFavorites } from '../context/FavoritesContext';
import { createSharedStyles } from '../theme/styles';

interface MealCardProps {
  meal: MealSummary;
  onPress: () => void;
}

export function MealCard({ meal, onPress }: MealCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(meal.idMeal);
  const [imageFailed, setImageFailed] = useState(false);
  const shared = createSharedStyles(Colors);

  return (
    <View style={shared.listItem}>
      <Pressable
        style={({ pressed }) => [shared.listItemContent, pressed && styles.cardPressed]}
        onPress={onPress}
        accessibilityLabel={`Piatto: ${meal.strMeal}. Tocca per aprire il dettaglio.`}
        accessibilityRole="button"
      >
        {imageFailed ? (
          <View style={shared.listItemPlaceholder}>
            <Text style={styles.imagePlaceholderText}>🍝</Text>
          </View>
        ) : (
          <Image
            source={{ uri: meal.strMealThumb }}
            style={shared.listItemImage}
            onError={() => setImageFailed(true)}
            accessibilityLabel={`Foto di ${meal.strMeal}`}
          />
        )}
        <View style={shared.listItemInfo}>
          <Text style={shared.listItemTitle} numberOfLines={2}>
            {meal.strMeal}
          </Text>
          <Text style={shared.listItemMeta}>🇮🇹 Cucina Italiana</Text>
        </View>
      </Pressable>
      <Pressable
        style={shared.favoriteButton}
        onPress={(event) => {
          event.stopPropagation();
          toggleFavorite(meal.idMeal);
        }}
        hitSlop={10}
        accessibilityLabel={favorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        accessibilityRole="button"
      >
        <Text style={shared.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardPressed: {
    opacity: 0.9,
  },
  imagePlaceholderText: {
    fontSize: 28,
  },
});
