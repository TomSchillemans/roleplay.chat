import { usePage } from '@inertiajs/react';

export function useI18n() {
  const { translations = {} } = usePage().props as { translations?: Record<string, any> };

  const t = (path: string, fallback?: string): string => {
    const value = path
      .split('.')
      .reduce<any>((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), translations);
    if (typeof value === 'string') return value;
    return fallback ?? path;
  };

  return { t };
}
