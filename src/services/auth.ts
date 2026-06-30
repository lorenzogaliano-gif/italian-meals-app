// services/auth.ts
export const MOCK_USERS = [
  {
    email: 'federico.chiesa@juve.it',
    password: 'Juve2026!',
    name: 'Federico Chiesa',
    avatarUri: 'https://ui-avatars.com/api/?name=Federico+Chiesa&background=ef4444&color=ffffff&size=128',
  },
  {
    email: 'dusan.vlahovic@juve.it',
    password: 'Juve2026!',
    name: 'Dušan Vlahović',
    avatarUri: 'https://ui-avatars.com/api/?name=Dušan+Vlahović&background=ef4444&color=ffffff&size=128',
  },
  {
    email: 'wojciech.szczesny@juve.it',
    password: 'Juve2026!',
    name: 'Wojciech Szczęsny',
    avatarUri: 'https://ui-avatars.com/api/?name=Wojciech+Szczęsny&background=ef4444&color=ffffff&size=128',
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
