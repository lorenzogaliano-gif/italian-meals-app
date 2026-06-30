// screens/FavoritesScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { fetchMealById, type MealDetail } from '../services/mealsApi';
import { MealCard } from '../components/MealCard';
import { LoadingView } from '../components/LoadingView';
import { Colors } from '../theme/colors';

export function FavoritesScreen({ navigation }: any) {
  const { favorites, isLoading: isStorageLoading } = useFavorites();

  const [meals, setMeals] = useState<MealDetail[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const loadFavoriteMeals = useCallback(async () => {
    if (favorites.length === 0) {
      setMeals([]);
      return;
    }
    setIsFetching(true);
    try {
      const results = await Promise.all(
        favorites.map((id) => fetchMealById(id).catch(() => null)),
      );
      setMeals(results.filter((m): m is MealDetail => m !== null));
    } finally {
      setIsFetching(false);
    }
  }, [favorites]);

  useEffect(() => {
    if (!isStorageLoading) {
      loadFavoriteMeals();
    }
  }, [isStorageLoading, loadFavoriteMeals]);

  // Bootstrap dei preferiti ancora in corso: evita di mostrare per un
  // istante uno stato vuoto "sbagliato".
  if (isStorageLoading) return <LoadingView message="Caricamento preferiti..." />;

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🤍</Text>
        <Text style={styles.emptyText}>Nessun preferito ancora</Text>
        <Text style={styles.emptyHint}>
          Tocca il cuore su un piatto per aggiungerlo qui.
        </Text>
      </View>
    );
  }

  if (isFetching && meals.length === 0) return <LoadingView message="Caricamento preferiti..." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetail', { idMeal: item.idMeal })}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f5',
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff5f5',
    gap: 6,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 6,
  },
  emptyText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  emptyHint: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
});
