/**
 * Home — Civilizational Awakening
 * Design: editorial hero with parchment background, pillar navigation, project constellation, connect section
 */

import { Link } from 'wouter';
import Layout from '@/components/Layout';
import PillarNavigation from '@/components/PillarNavigation';
import ProjectConstellation from '@/components/ProjectConstellation';

const CORE_HIERARCHY = [
  { name: 'YOUniverse', description: 'operating system for human potential', href: '/projects/youniverse' },
  { name: 'Y-OS', description: 'operating system for cognition', href: '/projects/y-os' },
  { name: 'Memory OS', description: 'operating system for memory lifecycle management', href: '/projects/memory-os' },
];

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032381833/2rgGuH2Lf9WyLUKbuKpgfT/hero-bg-2oEeL7UBnNnV7BPFYnYMLd.webp';

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative pt-24 pb-24"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-xs uppercase tracking-widest mb-8"
              style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.14em' }}
            >
              A Lifelong Inquiry
            </p>
            <h1
              className="mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'oklch(0.16 0.012 60)',
              }}
            >
              Civilizational<br />Awakening
            </h1>
            <p
              className="text-xl mb-10"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontStyle: 'italic',
                opacity: 0.65,
                maxWidth: '52ch',
                lineHeight: 1.5,
              }}
            >
              Exploring human flourishing in the age of AI.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ opacity: 0.45, maxWidth: '60ch', fontFamily: 'Inter, sans-serif' }}
            >
              This is not a company. Not a product. Not a movement. Not a religion. Not a think tank.
              It is a lifelong inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      {/* Core hierarchy */}
      <section className="container py-20">
        <p
          className="text-xs uppercase tracking-widest mb-10"
          style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
        >
          Core Architecture
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_HIERARCHY.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className="group p-6 border rounded-sm cursor-pointer transition-all duration-200 hover:shadow-md"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
              >
                <h3
                  className="text-2xl font-medium mb-2 group-hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {item.name}
                </h3>
                <p className="text-sm" style={{ opacity: 0.5 }}>
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      {/* Pillars */}
      <section className="container py-20">
        <div className="flex items-baseline justify-between mb-10">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Six Pillars
          </p>
          <Link href="/pillars">
            <span className="text-xs" style={{ opacity: 0.4 }}>View all →</span>
          </Link>
        </div>
        <PillarNavigation />
      </section>

      {/* Divider */}
      <div className="container">
        <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      {/* Project Constellation */}
      <section className="container py-20">
        <div className="flex items-baseline justify-between mb-10">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Projects
          </p>
          <Link href="/projects">
            <span className="text-xs" style={{ opacity: 0.4 }}>View all →</span>
          </Link>
        </div>
        <ProjectConstellation />
      </section>

      {/* Divider */}
      <div className="container">
        <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      {/* Connect */}
      <section className="container py-20">
        <div className="max-w-2xl">
          <p
            className="text-xs uppercase tracking-widest mb-8"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Connect
          </p>
          <p
            className="text-xl mb-8"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              opacity: 0.7,
              lineHeight: 1.6,
            }}
          >
            I am looking to connect with thinkers, builders, artists, researchers and actors of change
            exploring human flourishing, consciousness, AI, collective intelligence and the future of civilization.
          </p>
          <Link href="/connect">
            <span
              className="inline-block text-sm border px-6 py-3 rounded-sm transition-all duration-200 hover:opacity-60"
              style={{ borderColor: 'var(--foreground)', fontFamily: 'Inter, sans-serif' }}
            >
              Get in touch
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
