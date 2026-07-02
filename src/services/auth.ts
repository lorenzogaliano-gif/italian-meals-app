// services/auth.ts
export const MOCK_USERS = [
  {
    email: 'mario.rossi@student.it',
    password: 'Juve2026!',
    name: 'Mario Rossi',
    avatarUri: 'https://ui-avatars.com/api/?name=Mario+Rossi&background=ef4444&color=ffffff&size=128',
  },
  {
    email: 'giulia.bianchi@student.it',
    password: 'Juve2026!',
    name: 'Giulia Bianchi',
    avatarUri: 'https://ui-avatars.com/api/?name=Giulia+Bianchi&background=ef4444&color=ffffff&size=128',
  },
  {
    email: 'luca.verdi@student.it',
    password: 'Juve2026!',
    name: 'Luca Verdi',
    avatarUri: 'https://ui-avatars.com/api/?name=Luca+Verdi&background=ef4444&color=ffffff&size=128',
  },
];

export type MockUser = (typeof MOCK_USERS)[number];

export function validateLogin(email: string, password: string): MockUser | null {
  return (
    MOCK_USERS.find(
      (u) => u.email === email.trim() && u.password === password,
    ) ?? null
  );
}
