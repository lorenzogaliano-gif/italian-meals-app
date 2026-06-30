// storage/favoritesStorage.ts
// Lab 16 - Persistenza locale con AsyncStorage
//
// Piccolo modulo wrapper: i componenti NON chiamano mai AsyncStorage
// direttamente, parlano solo con load() / save() / reset().
// I dati salvati sono trattati come input non affidabile: se il JSON
// non e' valido o ha una shape inattesa, si fa un reset invece di
// mandare in crash l'app.

import AsyncStorage from '@react-native-async-storage/async-storage';

// Versioning della chiave: se in futuro cambia la shape dei dati,
// basta incrementare v1 -> v2 per evitare di leggere dati vecchi incompatibili.
const FAVORITES_KEY = 'italian-meals:favorites:v1';

export type FavoriteIds = string[];

/**
 * Verifica che il valore appena fatto il parse sia davvero un array
 * di stringhe (idMeal). Qualsiasi altra shape viene considerata corrotta.
 */
function isValidFavorites(value: unknown): value is FavoriteIds {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/**
 * Carica i preferiti dallo storage.
 * - Se la chiave non esiste ancora -> array vuoto (stato "nessun preferito").
 * - Se il JSON e' corrotto o ha una shape inattesa -> reset in sicurezza,
 *   nessun crash silenzioso.
 */
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
