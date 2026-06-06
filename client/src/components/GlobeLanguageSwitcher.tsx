/**
 * GlobeLanguageSwitcher — Static DeepL locale switcher
 * -------------------------------------------------------
 * Design: globe icon in nav header, click → compact dropdown EN/FR/IT
 * No Google Translate. No runtime API calls. Pure locale state switch.
 * When translated files exist → renders in that locale.
 * When not yet translated → falls back to EN content with a subtle badge.
 *
 * Reusable: copy to any site using the same i18n.ts + LocaleContext.
 */

import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';

export default function GlobeLanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  const current = SUPPORTED_LOCALES.find(l => l.code === locale);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Globe trigger button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Change language"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: '4px',
          opacity: 0.55,
          transition: 'opacity 150ms',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          color: 'var(--foreground)',
          letterSpacing: '0.04em',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
      >
        {/* Globe SVG */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span style={{ fontWeight: 500 }}>{current?.label || 'EN'}</span>
        {/* Chevron */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms' }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '120px',
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
            zIndex: 200,
            overflow: 'hidden',
          }}
        >
          {SUPPORTED_LOCALES.map(lang => (
            <button
              key={lang.code}
              role="menuitem"
              onClick={() => handleSelect(lang.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 14px',
                background: locale === lang.code ? 'var(--muted)' : 'none',
                border: 'none',
                cursor: locale === lang.code ? 'default' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--foreground)',
                opacity: locale === lang.code ? 1 : 0.6,
                fontWeight: locale === lang.code ? '600' : '400',
                textAlign: 'left',
                transition: 'background 100ms, opacity 100ms',
              }}
              onMouseEnter={e => {
                if (locale !== lang.code) {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--muted)';
                }
              }}
              onMouseLeave={e => {
                if (locale !== lang.code) {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '0.6';
                  (e.currentTarget as HTMLButtonElement).style.background = 'none';
                }
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '1rem' }}>{lang.flag}</span>
              <span>{lang.label}</span>
              {locale === lang.code && (
                <span style={{ marginLeft: 'auto', fontSize: '0.65rem', opacity: 0.5 }}>✓</span>
              )}
            </button>
          ))}
          <div
            style={{
              padding: '6px 14px',
              borderTop: '1px solid var(--border)',
              fontSize: '0.65rem',
              opacity: 0.35,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Powered by DeepL
          </div>
        </div>
      )}
    </div>
  );
}
