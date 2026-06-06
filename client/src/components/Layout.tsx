/**
 * Layout — Civilizational Awakening
 * Design: minimal top nav, generous whitespace, editorial footer
 * Includes: Google Translate headless switcher in footer, Language link in nav
 */

import { Link, useLocation } from 'wouter';
import { useState, useCallback } from 'react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV_LINKS = [
  { href: '/inquiry', label: 'Inquiry' },
  { href: '/pillars', label: 'Pillars' },
  { href: '/projects', label: 'Projects' },
  { href: '/thinkers', label: 'Thinkers' },
  { href: '/essays', label: 'Essays' },
  { href: '/map', label: 'Map' },
  { href: '/connect', label: 'Connect' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Fix: scroll to top on every route change
  useScrollToTop();

  // Smooth scroll to language switcher in footer
  const scrollToLanguage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById('language-switcher');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Google Translate UI suppression — hides all injected Google chrome */}
      <style>{`
        /* Hide GT toolbar/banner */
        .goog-te-banner-frame,
        .skiptranslate,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        div#goog-gt-,
        .goog-te-menu-value span,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-OiiCO,
        .VIpgJd-ZVi9od-l4eHX-hSRGPd {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          overflow: hidden !important;
        }
        /* Prevent GT from pushing body down */
        body {
          top: 0 !important;
          position: static !important;
        }
        /* Hide GT iframe */
        iframe.goog-te-menu-frame {
          display: none !important;
        }
        /* Hide GT tooltip */
        #goog-gt-tt {
          display: none !important;
        }
      `}</style>

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        {/* Top navigation */}
        <header
          className="sticky top-0 z-50 border-b"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="container">
            <div className="flex items-center justify-between h-14">
              {/* Wordmark */}
              <Link href="/">
                <span
                  className="text-sm font-medium tracking-widest uppercase"
                  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em', color: 'var(--foreground)' }}
                >
                  Civilizational Awakening
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className="text-sm transition-opacity duration-150"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        opacity: location.startsWith(link.href) ? 1 : 0.5,
                        fontWeight: location.startsWith(link.href) ? '500' : '400',
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                {/* Language anchor — scrolls to footer switcher */}
                <a
                  href="#language-switcher"
                  onClick={scrollToLanguage}
                  className="text-sm transition-opacity duration-150"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    opacity: 0.4,
                    fontWeight: '400',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                  aria-label="Change language"
                >
                  🌐
                </a>
              </nav>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className="block w-5 h-px" style={{ backgroundColor: 'var(--foreground)' }} />
                <span className="block w-5 h-px" style={{ backgroundColor: 'var(--foreground)' }} />
                <span className="block w-3 h-px" style={{ backgroundColor: 'var(--foreground)' }} />
              </button>
            </div>

            {/* Mobile nav */}
            {menuOpen && (
              <nav className="md:hidden border-t py-4 flex flex-col gap-4" style={{ borderColor: 'var(--border)' }}>
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className="block text-sm py-1"
                      style={{ opacity: location.startsWith(link.href) ? 1 : 0.6 }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                {/* Mobile language link */}
                <a
                  href="#language-switcher"
                  onClick={scrollToLanguage}
                  className="block text-sm py-1"
                  style={{ opacity: 0.5 }}
                >
                  🌐 Language
                </a>
              </nav>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer
          className="border-t mt-24"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', opacity: 0.4, letterSpacing: '0.12em' }}
                >
                  Civilizational Awakening
                </p>
                <p className="text-sm" style={{ opacity: 0.5, maxWidth: '36ch' }}>
                  A lifelong inquiry into human flourishing in the age of AI.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span className="text-sm" style={{ opacity: 0.4 }}>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Language switcher — anchored section */}
            <div
              className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{ borderColor: 'var(--border)' }}
            >
              <LanguageSwitcher />
              <p className="text-xs" style={{ opacity: 0.25, fontFamily: 'Inter, sans-serif', maxWidth: '48ch' }}>
                Translations are provided automatically. Quality may vary on philosophical and technical content.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs" style={{ opacity: 0.3 }}>
                This is not a company. Not a product. Not a movement. Not a religion. Not a think tank. It is a lifelong inquiry.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
