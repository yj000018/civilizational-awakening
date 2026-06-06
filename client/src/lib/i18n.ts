/**
 * i18n.ts — Locale state management for static DeepL translation system
 * -----------------------------------------------------------------------
 * Reusable module. Provides:
 *   - SUPPORTED_LOCALES: list of available locales
 *   - getLocale() / setLocale(): read/write from localStorage
 *   - getLocalizedFiles(): return correct content/en|fr|it glob map
 *   - localeToPath(): convert a locale + path to the correct URL
 *
 * Design: no runtime translation. Locale switch = navigate to same slug
 * in the translated content directory. Falls back to 'en' if not found.
 */

import { LOCALE_FILES } from './content';

// ─── TYPES ──────────────────────────────────────────────────────────────────

export type Locale = 'en' | 'fr' | 'it';

export interface LocaleInfo {
  code: Locale;
  label: string;
  flag: string;
  deeplCode: string;
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────

export const SUPPORTED_LOCALES: LocaleInfo[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧', deeplCode: 'EN' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', deeplCode: 'FR' },
  { code: 'it', label: 'IT', flag: '🇮🇹', deeplCode: 'IT' },
];

export const DEFAULT_LOCALE: Locale = 'en';
const STORAGE_KEY = 'ca_locale';

// ─── LOCALE PERSISTENCE ──────────────────────────────────────────────────────

export function getLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && SUPPORTED_LOCALES.some(l => l.code === stored)) return stored;
  return DEFAULT_LOCALE;
}

export function setLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, locale);
}

// ─── CONTENT AVAILABILITY ────────────────────────────────────────────────────

/**
 * Check if a translated file exists for a given locale/type/slug.
 * Falls back to 'en' if not found.
 */
export function getAvailableLocale(type: string, slug: string, requestedLocale: Locale): Locale {
  if (requestedLocale === 'en') return 'en';

  const files = LOCALE_FILES[requestedLocale] || {};
  // Check if any key matches this type+slug
  const typeDir = type + 's'; // pillar → pillars
  const hasTranslation = Object.keys(files).some(
    k => k.includes(`/${typeDir}/`) && k.includes(`/${slug}.md`)
  );

  return hasTranslation ? requestedLocale : 'en';
}

/**
 * Get all content items for a given locale, falling back to en for missing items.
 */
export function getLocaleFiles(locale: Locale): Record<string, string> {
  return LOCALE_FILES[locale] || LOCALE_FILES['en'];
}
