// screens/MealDetailScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { fetchMealById, extractIngredients, type MealDetail } from '../services/mealsApi';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { Colors } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function MealDetailScreen() {
  const route = useRoute<any>();
  const idMeal = route.params?.idMeal as string | undefined;
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageFailed, setImageFailed] = useState(false);

  const [state, setState] = useState<{ status: Status; item: MealDetail | null }>({
    status: 'idle',
    item: null,
  });

  const load = useCallback(async () => {
    if (!idMeal) {
      setState({ status: 'success', item: null });
      return;
    }

    let attempts = 0;
    setState({ status: 'loading', item: null });

    while (attempts < 2) {
      try {
        const data = await fetchMealById(idMeal);
        setState({ status: 'success', item: data });
        return;
      } catch {
        attempts++;
        if (attempts >= 2) {
          setState({ status: 'error', item: null });
        }
      }
    }
  }, [idMeal]);

  useEffect(() => {
    load();
  }, [load]);

  if (state.status === 'loading') return <LoadingView message="Caricamento..." />;

  if (state.status === 'error')
    return <ErrorView onRetry={load} message="Impossibile caricare il dettaglio del piatto." />;

  if (!idMeal) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Link non valido: scegli un piatto dalla lista.</Text>
      </View>
    );
  }

  if (!state.item) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nessun dato disponibile.</Text>
      </View>
    );
  }

  const meal = state.item;
  const ingredients = extractIngredients(meal);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {imageFailed ? (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>🍝</Text>
        </View>
      ) : (
        <Image
          source={{ uri: meal.strMealThumb }}
          style={styles.image}
          onError={() => setImageFailed(true)}
        />
      )}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Pressable
          onPress={() => toggleFavorite(meal.idMeal)}
          hitSlop={10}
          accessibilityLabel={
            isFavorite(meal.idMeal) ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'
          }
          accessibilityRole="button"
        >
          <Text style={styles.favoriteIcon}>{isFavorite(meal.idMeal) ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>
      <Text style={styles.sectionTitle}>Preparazione</Text>
      <Text style={styles.body}>{meal.strInstructions}</Text>
      <Text style={styles.sectionTitle}>Ingredienti</Text>
      {ingredients.map((ingredient, idx) => (
        <Text key={`${ingredient.ingredient}-${idx}`} style={styles.body}>
          • {ingredient.ingredient} — {ingredient.measure}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff5f5',
  },
  content: {
    padding: 14,
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 14,
  },
  imagePlaceholder: {
    width: '100%',
    height: 220,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8d7da',
  },
  imagePlaceholderText: {
    fontSize: 42,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 15,
    color: Colors.primary,
    marginTop: 10,
  },
  body: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
});
