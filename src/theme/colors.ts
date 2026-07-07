export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export type AppTheme = {
  background: string;
  surface: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  white: string;
  error: string;
  inputBackground: string;
  muted: string;
};

export const lightTheme: AppTheme = {
  background: '#fff5f5',
  surface: '#ffffff',
  card: '#ffe4e6',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  primary: '#ef4444',
  white: '#ffffff',
  error: '#dc2626',
  inputBackground: '#ffffff',
  muted: '#f8d7da',
};

export const darkTheme: AppTheme = {
  background: '#111827',
  surface: '#1f2937',
  card: '#374151',
  textPrimary: '#f9fafb',
  textSecondary: '#d1d5db',
  primary: '#f87171',
  white: '#ffffff',
  error: '#f87171',
  inputBackground: '#1f2937',
  muted: '#4b5563',
};

export const Colors = lightTheme;
