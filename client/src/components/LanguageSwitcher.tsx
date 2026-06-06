/**
 * LanguageSwitcher — Google Translate headless integration
 * Design: minimal text switcher, no Google UI visible
 * The hidden #google_translate_element div is required by the GT widget API.
 * All Google-injected UI (toolbar, banner, iframe) is suppressed via CSS in index.css.
 *
 * Persistence: GT sets a cookie `googtrans=/en/{lang}` on the domain.
 * All subsequent page navigations stay translated — no re-selection needed.
 */

import { useEffect, useState } from 'react';

// Note: Window.google is already declared in Map.tsx via @types/google.maps
// We extend it here only for googleTranslateElementInit
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
  { code: 'es', label: 'ES' },
];

function getCookieLang(): string {
  const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
  return match ? match[1] : 'en';
}

function setGoogleTranslateCookie(lang: string) {
  // GT reads this cookie to determine target language
  const domain = window.location.hostname;
  if (lang === 'en') {
    // Reset: remove cookie
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  } else {
    const value = `/en/${lang}`;
    document.cookie = `googtrans=${value}; path=/; domain=${domain}`;
    document.cookie = `googtrans=${value}; path=/`;
  }
}

function triggerGoogleTranslate(lang: string) {
  setGoogleTranslateCookie(lang);

  if (lang === 'en') {
    // Reload to reset — GT has no programmatic "restore original" API
    window.location.reload();
    return;
  }

  // Try to use the GT combo element if already loaded
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
    return;
  }

  // GT not yet loaded — reload with cookie set (GT will auto-translate on load)
  window.location.reload();
}

export default function LanguageSwitcher() {
  const [activeLang, setActiveLang] = useState<string>('en');
  const [gtLoaded, setGtLoaded] = useState(false);

  // Detect current language from cookie on mount
  useEffect(() => {
    setActiveLang(getCookieLang());
  }, []);

  // Inject GT script once
  useEffect(() => {
    if (document.getElementById('gt-script')) {
      setGtLoaded(true);
      return;
    }

    // Mount point for the hidden GT widget
    if (!document.getElementById('google_translate_element')) {
      const el = document.createElement('div');
      el.id = 'google_translate_element';
      el.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;';
      document.body.appendChild(el);
    }

    // GT init callback — cast window.google to any to avoid @types/google.maps conflict
    window.googleTranslateElementInit = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gt = (window as any).google?.translate;
      if (gt?.TranslateElement) {
        new gt.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'fr,it,es',
            layout: 0, // SIMPLE layout
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setGtLoaded(true);
      }
    };

    const script = document.createElement('script');
    script.id = 'gt-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleSelect = (lang: string) => {
    if (lang === activeLang) return;
    setActiveLang(lang);
    triggerGoogleTranslate(lang);
  };

  return (
    <div id="language-switcher" className="flex items-center gap-1">
      <span
        className="text-xs uppercase tracking-widest mr-2"
        style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
      >
        Language
      </span>
      {LANGUAGES.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-1">
          {i > 0 && (
            <span style={{ opacity: 0.2, fontSize: '0.7rem' }}>·</span>
          )}
          <button
            onClick={() => handleSelect(lang.code)}
            className="text-xs transition-all duration-150"
            style={{
              fontFamily: 'Inter, sans-serif',
              opacity: activeLang === lang.code ? 1 : 0.35,
              fontWeight: activeLang === lang.code ? '600' : '400',
              letterSpacing: '0.05em',
              background: 'none',
              border: 'none',
              padding: '2px 4px',
              cursor: activeLang === lang.code ? 'default' : 'pointer',
              textDecoration: activeLang === lang.code ? 'underline' : 'none',
              textUnderlineOffset: '3px',
            }}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={activeLang === lang.code}
          >
            {lang.label}
          </button>
        </span>
      ))}
      {/* Hidden GT mount — required by GT API */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      />
    </div>
  );
}
