# Progress - Italian Meals App

**Studente:** Lorenzo Galiano  
**Repo:** https://github.com/lorenzogaliano-gif/italian-meals-app.git
**Ultimo aggiornamento:** 2026-07-07

---

## Schermate implementate

| Schermata | Stato | Screenshot |
| --- | --- | --- |
| Login | ✅ | ![Login](./docs/screenshots/login.png) |
| Header profilo | ✅ | ![Profilo](./docs/screenshots/utente.png) |
| Lista piatti | ✅ | ![Lista](./docs/screenshots/listapiatti.png) |
| Ricerca / filtro | ✅ | ![Ricerca](./docs/screenshots/ricerca.png) |
| Dettaglio | ✅ | ![Dettaglio](./docs/screenshots/dettagli.png) |
| Preferiti | ✅ | ![Preferiti](./docs/screenshots/preferiti.png) |
| Impostazioni | ✅ | ![Impostazioni](./docs/screenshots/impostazioni.png) |


---

## Google Doc (lab 13–22)

**Link:**https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.0#heading=h.wu29v8o1b6lm

---

## Feature implementate per lab

| Lab | Funzione nell'app |
| --- | --- |
| 13 | Navigazione stack Login → Lista → Dettaglio (params: `{ idMeal }`) + Bottom Tabs |
| 14 | Deep link `meal/:idMeal` con schema `italianmeals://` e comando testabile |
| 15 | API TheMealDB con stati loading/error/success + retry |
| 16 | Preferiti in AsyncStorage con chiave `app:v1:favs` |
| 17 | Stato globale con Context API: `AuthContext` + `FavoritesContext` |
| 18 | StyleSheet.create + Flexbox responsive |
| 19 | `accessibilityLabel` e `accessibilityRole` su card, avatar, pulsanti e messaggi di errore |
| 22 | Progressi del progetto 


---

## Utenti mock (login di test)

| Email | Password | Nome |
| --- | --- | --- |
| mario.rossi@student.it | React2026! | Mario Rossi |
| giulia.bianchi@student.it | Expo2026! | Giulia Bianchi |
| luca.verdi@student.it | Mobile2026! | Luca Verdi |

---

## Note

- Scelta stato globale: Context API, sufficiente per il progetto e facile da mantenere.
- Deep linking configurato in RootNavigator con Expo Linking.
- Retry automatico max 2 volte in services/mealsApi.ts.
- Avatar con fallback iniziali in caso di errore immagine.
- Gestione di rete, login fallito, lista vuota, preferiti e deep link non valido.
