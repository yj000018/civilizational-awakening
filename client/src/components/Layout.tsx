/**
 * Layout — Civilizational Awakening
 * Design: minimal top nav, generous whitespace, editorial footer
 */

import { Link, useLocation } from 'wouter';
import { useState } from 'react';

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

  return (
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
          <div className="mt-12 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs" style={{ opacity: 0.3 }}>
              This is not a company. Not a product. Not a movement. Not a religion. Not a think tank. It is a lifelong inquiry.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
