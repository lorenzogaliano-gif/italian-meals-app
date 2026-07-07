
import AsyncStorage from '@react-native-async-storage/async-storage';


const FAVORITES_KEY = 'app:v1:favs';

export type FavoriteIds = string[];


function isValidFavorites(value: unknown): value is FavoriteIds {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}
  
export async function load(): Promise<FavoriteIds> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (raw == null) return [];

    const parsed = JSON.parse(raw);
    if (!isValidFavorites(parsed)) {
      // Shape inattesa: dati corrotti o di una versione precedente.
      await reset();
      return [];
    }
    return parsed;
  } catch {
    // JSON.parse fallito o errore di lettura: stesso trattamento, mai un crash.
    await reset();
    return [];
  }
}

/**
 * Salva l'intera lista di preferiti come JSON.
 */
export async function save(favorites: FavoriteIds): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Salvataggio best-effort: un fallimento di scrittura non deve
    // mandare in crash l'app, lo stato in memoria resta comunque corretto.
  }
}

/**
 * Cancella i preferiti salvati (dati corrotti oppure azione utente).
 */
export async function reset(): Promise<void> {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch {
    // ignora: se removeItem fallisce non c'e' altro da fare qui
  }
}
