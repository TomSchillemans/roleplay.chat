import { usePage } from '@inertiajs/react';

export function useI18n() {
  const { translations = {} } = usePage().props as { translations?: Record<string, unknown> };

  const t = (path: string, fallback?: string): string => {
    const value = path
      .split('.')
      .reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object' && acc !== null && key in (acc as Record<string, unknown>)) {
          return (acc as Record<string, unknown>)[key];
        }
        return undefined;
      }, translations);
    if (typeof value === 'string') return value;
    return fallback ?? path;
  };

  return { t };
}
