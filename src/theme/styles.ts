import { StyleSheet } from 'react-native';
import type { AppTheme } from './colors';
import { spacing } from './colors';

export function createSharedStyles(theme: AppTheme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      padding: spacing.lg,
    },
    surfaceCard: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 16,
      padding: spacing.lg,
    },
    input: {
      backgroundColor: theme.inputBackground,
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      color: theme.textPrimary,
    },
    buttonPrimary: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.white,
      fontWeight: '700',
    },
    flatListContent: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.lg,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    gridItem: {
      flex: 1,
      maxWidth: '50%',
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.sm,
    },
    listItem: {
      backgroundColor: theme.card,
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 14,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 104,
    },
    listItemContent: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    listItemImage: {
      width: 90,
      height: 90,
      borderRadius: 10,
    },
    listItemPlaceholder: {
      width: 90,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.muted,
    },
    listItemInfo: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    listItemTitle: {
      fontSize: 14,
      color: theme.textPrimary,
      fontWeight: '600',
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    listItemMeta: {
      fontSize: 11,
      color: theme.textSecondary,
      marginTop: spacing.xs,
    },
    favoriteButton: {
      paddingHorizontal: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    favoriteIcon: {
      fontSize: 20,
    },
    textPrimary: {
      color: theme.textPrimary,
    },
    textSecondary: {
      color: theme.textSecondary,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
      backgroundColor: theme.background,
    },
    emptyTitle: {
      fontSize: 16,
      color: theme.textPrimary,
      fontWeight: '600',
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: spacing.xs,
      lineHeight: 20,
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
