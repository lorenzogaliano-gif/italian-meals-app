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
  useWindowDimensions,
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
import { Colors, spacing } from '../theme/colors';
import { createSharedStyles } from '../theme/styles';
import { useTheme } from '../context/ThemeContext';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function MealsListScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { favorites, isLoading: isStorageLoading } = useFavorites();
  const { theme, isDark, toggleTheme } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const shared = createSharedStyles(theme);

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

  const listKey = isWide ? 'wide-grid' : 'stack-list';

  const handleLogout = () => {
    logout();
    setMenuVisible(false);
  };

  if (state.status === 'loading') return <LoadingView message="Caricamento..." />;

  if (state.status === 'error')
    return <ErrorView onRetry={load} message="Impossibile caricare i piatti Italiani." />;

  if (state.status === 'success' && state.items.length === 0)
    return (
      <View style={shared.emptyState}>
        <Text style={shared.emptyTitle}>Nessun piatto trovato</Text>
        <Text style={shared.emptySubtitle}>Prova a cambiare la ricerca oppure riprova più tardi.</Text>
      </View>
    );

  return (
    <View style={shared.screen}>
      <View style={styles.header}>
        <Pressable
          style={styles.userButton}
          onPress={() => setMenuVisible(true)}
          accessibilityLabel="Apri il menu utente"
          accessibilityRole="button"
        >
          <Avatar uri={user?.avatarUri ?? ''} name={user?.name} />
          <View style={styles.userText}>
            <Text style={[styles.welcomeText, { color: theme.textPrimary }]}>Ciao, {user?.name}</Text>
            <Text style={[styles.userHint, { color: theme.textSecondary }]}>Apri il menu</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.themeButton, { backgroundColor: theme.primary }]}
          onPress={toggleTheme}
          accessibilityLabel={isDark ? 'Attiva modalità chiara' : 'Attiva modalità scura'}
          accessibilityRole="button"
        >
          <Text style={[styles.themeButtonText, { color: theme.white }]}>
            {isDark ? '☀️ Chiaro' : '🌙 Scuro'}
          </Text>
        </Pressable>
      </View>

      <TextInput
        style={[styles.search, { backgroundColor: theme.inputBackground, borderColor: theme.primary }]}
        placeholder="Cerca piatti..."
        placeholderTextColor={theme.textSecondary}
        value={query}
        onChangeText={setQuery}
        accessibilityLabel="Cerca piatti"
      />

      <FlatList
        key={listKey}
        data={filtered}
        keyExtractor={(item) => item.idMeal}
        numColumns={isWide ? 2 : 1}
        columnWrapperStyle={isWide ? shared.columnWrapper : undefined}
        renderItem={({ item }) => (
          <View style={isWide ? shared.gridItem : undefined}>
            <MealCard
              meal={item}
              onPress={() => navigation.navigate('MealDetail', { idMeal: item.idMeal })}
            />
          </View>
        )}
        contentContainerStyle={shared.flatListContent}
      />

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <Pressable
            style={[styles.menuCard, { backgroundColor: theme.surface, borderColor: theme.primary }]}
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
                <Text style={[styles.closeText, { color: theme.textPrimary }]}>✕</Text>
              </Pressable>
            </View>

            <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>Preferiti</Text>

            {isStorageLoading || isFetchingFavorites ? (
              <Text style={[styles.emptyText, { color: theme.textPrimary }]}>Caricamento preferiti...</Text>
            ) : favoriteMeals.length === 0 ? (
              <Text style={[styles.emptyText, { color: theme.textPrimary }]}>Nessun piatto preferito</Text>
            ) : (
              <ScrollView style={styles.favoriteList} contentContainerStyle={styles.favoriteListContent}>
                {favoriteMeals.map((meal) => (
                  <View key={meal.idMeal} style={styles.favoriteItem}>
                    <Text style={[styles.favoriteText, { color: theme.textPrimary }]}>❤️ {meal.strMeal}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <Pressable style={[styles.logoutButton, { backgroundColor: theme.primary }]} onPress={handleLogout} accessibilityRole="button">
              <Text style={[styles.logoutText, { color: theme.white }]}>Esci</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  userText: {
    flexShrink: 1,
  },
  themeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  themeButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  userHint: {
    fontSize: 12,
    marginTop: 2,
  },
  search: {
    margin: spacing.md,
    padding: spacing.sm,
    borderRadius: 12,
    borderWidth: 2,
    color: Colors.textPrimary,
  },
  emptyText: {
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  menuCard: {
    borderWidth: 2,
    padding: spacing.lg,
    gap: spacing.md,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  menuSubtitle: {
    fontSize: 14,
  },
  closeText: {
    fontSize: 18,
  },
  favoriteList: {
    maxHeight: 220,
  },
  favoriteListContent: {
    gap: spacing.sm,
  },
  favoriteItem: {
    paddingVertical: spacing.xs,
  },
  favoriteText: {
    fontSize: 14,
  },
  logoutButton: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.xs,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
