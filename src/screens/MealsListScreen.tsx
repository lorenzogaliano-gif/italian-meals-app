// screens/MealsListScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import {
  fetchItalianMeals,
  fetchMealById,
  type MealDetail,
  type MealSummary,
} from '../services/mealsApi';
import { MealCard } from '../components/MealCard';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { Avatar } from '../components/Avatar';
import { Colors } from '../theme/colors';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function MealsListScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { favorites, isLoading: isStorageLoading } = useFavorites();

  const [state, setState] = useState<{ status: Status; items: MealSummary[] }>({
    status: 'idle',
    items: [],
  });

  const [query, setQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [favoriteMeals, setFavoriteMeals] = useState<MealDetail[]>([]);
  const [isFetchingFavorites, setIsFetchingFavorites] = useState(false);

  const load = useCallback(async () => {
    let attempts = 0;
    setState({ status: 'loading', items: [] });

    while (attempts < 2) {
      try {
        const data = await fetchItalianMeals();
        setState({ status: 'success', items: data ?? [] });
        return;
      } catch (e) {
        attempts++;
        if (attempts >= 2) {
          setState({ status: 'error', items: [] });
        }
      }
    }
  }, []);

  const loadFavoriteMeals = useCallback(async () => {
    if (favorites.length === 0) {
      setFavoriteMeals([]);
      return;
    }

    setIsFetchingFavorites(true);
    try {
      const results = await Promise.all(
        favorites.map((id) => fetchMealById(id).catch(() => null)),
      );
      setFavoriteMeals(results.filter((meal): meal is MealDetail => meal !== null));
    } finally {
      setIsFetchingFavorites(false);
    }
  }, [favorites]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!isStorageLoading) {
      loadFavoriteMeals();
    }
  }, [isStorageLoading, loadFavoriteMeals]);

  const filtered = state.items.filter((item) =>
    item.strMeal.toLowerCase().includes(query.toLowerCase()),
  );

  const handleLogout = () => {
    logout();
    setMenuVisible(false);
  };

  if (state.status === 'loading') return <LoadingView message="Caricamento..." />;

  if (state.status === 'error')
    return <ErrorView onRetry={load} message="Impossibile caricare i piatti Italiani." />;

  if (state.status === 'success' && state.items.length === 0)
    return <View style={styles.emptyContainer}><Text style={styles.emptyText}>Nessun risultato</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.userButton}
          onPress={() => setMenuVisible(true)}
          accessibilityLabel="Apri il menu utente"
          accessibilityRole="button"
        >
          <Avatar uri={user?.avatarUri ?? ''} />
          <View style={styles.userText}>
            <Text style={styles.welcomeText}>Ciao, {user?.name}</Text>
            <Text style={styles.userHint}>Apri il menu</Text>
          </View>
        </Pressable>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Cerca piatti..."
        placeholderTextColor={Colors.textSecondary}
        value={query}
        onChangeText={setQuery}
        accessibilityLabel="Cerca piatti"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetail', { idMeal: item.idMeal })}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <Pressable
            style={styles.menuCard}
            onPress={(event) => event.stopPropagation()}
            accessibilityRole="menu"
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Il tuo profilo</Text>
              <Pressable
                onPress={() => setMenuVisible(false)}
                accessibilityLabel="Chiudi menu utente"
                accessibilityRole="button"
              >
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.menuSubtitle}>Preferiti</Text>

            {isStorageLoading || isFetchingFavorites ? (
              <Text style={styles.emptyText}>Caricamento preferiti...</Text>
            ) : favoriteMeals.length === 0 ? (
              <Text style={styles.emptyText}>Nessun piatto preferito</Text>
            ) : (
              <ScrollView style={styles.favoriteList} contentContainerStyle={styles.favoriteListContent}>
                {favoriteMeals.map((meal) => (
                  <View key={meal.idMeal} style={styles.favoriteItem}>
                    <Text style={styles.favoriteText}>❤️ {meal.strMeal}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <Pressable style={styles.logoutButton} onPress={handleLogout} accessibilityRole="button">
              <Text style={styles.logoutText}>Esci</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userText: {
    flexShrink: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  userHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  search: {
    margin: 12,
    padding: 10,
    borderRadius: 0,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: Colors.green,
    color: Colors.textPrimary,
  },
  listContent: {
    paddingBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  menuCard: {
    backgroundColor: '#fff5f5',
    borderWidth: 2,
    borderColor: Colors.green,
    padding: 16,
    gap: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  closeText: {
    fontSize: 18,
    color: Colors.textPrimary,
  },
  favoriteList: {
    maxHeight: 220,
  },
  favoriteListContent: {
    gap: 8,
  },
  favoriteItem: {
    paddingVertical: 6,
  },
  favoriteText: {
    color: Colors.textPrimary,
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: Colors.green,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
