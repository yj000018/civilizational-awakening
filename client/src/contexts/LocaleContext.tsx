/**
 * LocaleContext — React context for locale state
 * Provides current locale + setLocale to all components.
 * Persists to localStorage. No page reload needed.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { getLocale, setLocale as persistLocale, type Locale } from '@/lib/i18n';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale());

  const setLocale = useCallback((newLocale: Locale) => {
    persistLocale(newLocale);
    setLocaleState(newLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
