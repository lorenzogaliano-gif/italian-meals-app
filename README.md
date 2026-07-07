# Italian Meals App

Applicazione Expo/React Native per esplorare piatti italiani da TheMealDB, con login mock, navigazione, preferiti persistiti e deep link.

## Autore
- Lorenzo Galiano

## Prerequisiti
- Node.js LTS
- Expo Go installato sul dispositivo o un emulatore Android/iOS
- npm

## Installazione
```bash
git clone <url-repo>
cd italian-meals-app
npm install
npx expo start
```

Dopo il comando, usa:
- `a` per avviare l'app su Android
- `i` per iOS
- QR code per Expo Go

## API utilizzata
- TheMealDB: https://www.themealdb.com/documentation
- Endpoint usati:
  - /filter.php?a=Italian
  - /lookup.php?i={idMeal}

## Utenti mock per il login
| Email | Password |
| --- | --- |
| mario.rossi@student.it | React2026! |
| giulia.bianchi@student.it | Expo2026! |
| luca.verdi@student.it | Mobile2026! |

## Deep linking
- Schema configurato: `italianmeals://`
- Path principale: `meal/:idMeal`
- Esempio di test:
```bash
npx uri-scheme open "exp://127.0.0.1:8081/--/meal/52772" --android
```

## Stato globale
Ho scelto Context API per gestire autenticazione e preferiti, perché è sufficiente per la complessità dell'app e mantiene il progetto semplice da leggere e mantenere.

## Edge case gestiti
- Errore di rete/API con pulsante Retry
- Login fallito con messaggio chiaro
- Lista vuota quando non ci sono risultati
- Preferiti persistiti con AsyncStorage
- Deep link non valido con messaggio di errore

## Google Doc lab 13–22
https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.0#heading=h.wu29v8o1b6lm

