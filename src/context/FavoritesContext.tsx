

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import * as favoritesStorage from '../storage/favoritesStorage';
import type { FavoriteIds } from '../storage/favoritesStorage';

interface FavoritesState {
  status: 'loading' | 'ready';
  favorites: FavoriteIds;
}

type FavoritesAction =
  | { type: 'BOOTSTRAPPED'; favorites: FavoriteIds }
  | { type: 'TOGGLE'; idMeal: string };

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'BOOTSTRAPPED':
      return { status: 'ready', favorites: action.favorites };
    case 'TOGGLE': {
      const isFav = state.favorites.includes(action.idMeal);
      const favorites = isFav
        ? state.favorites.filter((id) => id !== action.idMeal)
        : [...state.favorites, action.idMeal];
      return { ...state, favorites };
    }
    default:
      return state;
  }
}

interface FavoritesContextType {
  favorites: FavoriteIds;
  isLoading: boolean;
  isFavorite: (idMeal: string) => boolean;
  toggleFavorite: (idMeal: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, {
    status: 'loading',
    favorites: [],
  });

  useEffect(() => {
    let isMounted = true;
    favoritesStorage.load().then((favorites) => {
      if (isMounted) dispatch({ type: 'BOOTSTRAPPED', favorites });
    });
    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    if (state.status !== 'ready') return;
    favoritesStorage.save(state.favorites);
  }, [state.status, state.favorites]);

  const isFavorite = (idMeal: string) => state.favorites.includes(idMeal);
  const toggleFavorite = (idMeal: string) => dispatch({ type: 'TOGGLE', idMeal });

  const value = useMemo<FavoritesContextType>(
    () => ({
      favorites: state.favorites,
      isLoading: state.status === 'loading',
      isFavorite,
      toggleFavorite,
    }),
    [state.favorites, state.status],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextType {
  const ctx = useContext(FavoritesContext);
  // Fallisci subito se manca il Provider, invece di funzionare in
  // silenzio con un valore di default.
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}
