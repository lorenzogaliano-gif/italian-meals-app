# Progress - Italian Meals App

**Studente:** Nome Cognome  
**Repo:** https://github.com/TUO-UTENTE/italian-meals-app  
**Ultimo aggiornamento:** 2026-06-16

---

## Schermate implementate

| Schermata       | Stato | Screenshot                                             |
| --------------- | ----- | ------------------------------------------------------ |
| Login           | ✅    | ![Login](./docs/screenshots/01-login.png)              |
| Header profilo  | ✅    | ![Profilo](./docs/screenshots/02-profile.png)          |
| Lista piatti    | ✅    | ![Lista](./docs/screenshots/03-list.png)               |
| Ricerca / filtro| ✅    | ![Ricerca](./docs/screenshots/04-search.png)           |
| Dettaglio       | ✅    | ![Dettaglio](./docs/screenshots/05-detail.png)         |
| Preferiti       | ✅    | ![Preferiti](./docs/screenshots/06-favorites.png)      |
| Impostazioni    | ✅    | ![Impostazioni](./docs/screenshots/07-settings.png)    |
| Errore + Retry  | ✅    | ![Errore](./docs/screenshots/08-error.png)             |
| Accessibilità   | ✅    | (accessibilityLabel su MealCard, ErrorView, Avatar…)   |
| Deep link       | ✅    | ![Deep link](./docs/screenshots/09-deeplink.png)       |

---

## Google Doc (lab 13–22)

**Link:** https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.0#heading=h.wu29v8o1b6lm

---

## Feature implementate per lab

| Lab | Funzione nell'app |
|-----|------------------|
| 13  | Navigazione stack Login → Lista → Dettaglio (params: `{ idMeal }`) + Bottom Tabs |
| 14  | Deep link `meal/:idMeal` — comando: `npx uri-scheme open "exp://127.0.0.1:8081/--/meal/52772" --android` |
| 15  | API TheMealDB con stati idle/loading/error/success + retry (max 2 tentativi) |
| 16  | Preferiti in AsyncStorage con chiave `app:v1:favs` |
| 17  | Stato globale con Context API: `AuthContext` (utente) + `FavoritesContext` (preferiti) |
| 18  | StyleSheet.create + Flexbox responsive |
| 19  | `accessibilityLabel` su MealCard, Avatar, ErrorView, bottoni; `accessibilityRole="button"` |
| 20  | Non implementato (opzionale) |
| 21  | Non implementato (opzionale) |
| 22  | Panoramica app finale — vedi README.md |

---

## Utenti mock (login di test)

| Email                      | Password     | Nome           |
| -------------------------- | ------------ | -------------- |
| mario.rossi@student.it     | React2026!   | Mario Rossi    |
| giulia.bianchi@student.it  | Expo2026!    | Giulia Bianchi |
| luca.verdi@student.it      | Mobile2026!  | Luca Verdi     |

---

## Note

- Scelta stato globale: **Context API** — sufficiente per la complessità del progetto, evita dipendenze esterne.
- Deep linking configurato in `RootNavigator.tsx` con `expo-linking` e schema `italianmeals://`
- Retry automatico max 2 volte in `services/mealsApi.ts`
- Avatar con fallback `?` su errore immagine (pattern lab 07)
- Animazione fade-in sulla lista al caricamento (`Animated.timing`)
