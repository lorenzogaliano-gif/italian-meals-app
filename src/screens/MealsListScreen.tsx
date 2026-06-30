// screens/MealsListScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { fetchItalianMeals, type MealSummary } from '../services/mealsApi';
import { MealCard } from '../components/MealCard';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { Avatar } from '../components/Avatar';
import { Colors } from '../theme/colors';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function MealsListScreen({ navigation }: any) {
  const { user } = useAuth();

  const [state, setState] = useState<{status: Status; items: MealSummary[]}>({
    status: 'idle',
    items: [],
  });

  const [query, setQuery] = useState('');

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

  useEffect(() => {
    load();
  }, [load]);

  const filtered = state.items.filter((item) =>
    item.strMeal.toLowerCase().includes(query.toLowerCase()),
  );

  if (state.status === 'loading') return <LoadingView message="Caricamento..." />;

  if (state.status === 'error')
    return <ErrorView onRetry={load} message="Impossibile caricare i piatti Italiani." />;

  if (state.status === 'success' && state.items.length === 0)
    return <View style={styles.emptyContainer}><Text style={styles.emptyText}>Nessun risultato</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={user?.avatarUri ?? ''} />
        <Text style={styles.welcomeText}>Ciao, {user?.name}</Text>
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
  welcomeText: {
    fontSize: 16,
    color: Colors.textPrimary,
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
});
