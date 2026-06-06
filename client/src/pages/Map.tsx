/**
 * Map — visual navigation map placeholder
 * Phase 1: shows the inquiry structure as a navigable text map
 */

import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { getContentByType, PILLAR_ORDER, PILLAR_DISPLAY } from '@/lib/content';

export default function MapPage() {
  const projects = getContentByType('project');
  const concepts = getContentByType('concept');

  const projectsByPillar: Record<string, typeof projects> = {};
  for (const p of projects) {
    const pillar = p.frontmatter.pillar || 'other';
    if (!projectsByPillar[pillar]) projectsByPillar[pillar] = [];
    projectsByPillar[pillar].push(p);
  }

  return (
    <Layout>
      <div className="container py-16">
        <header className="mb-16">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Map
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
            }}
          >
            The Inquiry Map
          </h1>
          <p style={{ opacity: 0.5, maxWidth: '52ch', fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}>
            A navigable overview of the full inquiry — pillars, projects and concepts.
          </p>
          <p
            className="mt-4 text-xs"
            style={{ opacity: 0.3, fontFamily: 'Inter, sans-serif' }}
          >
            Phase 1 placeholder — a visual graph map will be built in Phase 2.
          </p>
        </header>

        {/* Inquiry root */}
        <div className="mb-16">
          <div
            className="inline-block px-4 py-2 border rounded-sm mb-8"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            <Link href="/inquiry">
              <span className="text-sm font-medium" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Civilizational Awakening
              </span>
            </Link>
          </div>

          {/* Core projects */}
          <div className="ml-8 mb-12">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>
              Core Architecture
            </p>
            <div className="flex flex-wrap gap-3">
              {['youniverse', 'y-os', 'memory-os'].map((slug) => {
                const p = projects.find((x) => x.slug === slug);
                if (!p) return null;
                return (
                  <Link key={slug} href={`/projects/${slug}`}>
                    <span
                      className="inline-block px-3 py-1.5 border rounded-sm text-sm cursor-pointer hover:opacity-60 transition-opacity"
                      style={{ borderColor: 'var(--border)', fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {p.frontmatter.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Pillars + their projects */}
          <div className="ml-8">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>
              Pillars
            </p>
            <div className="space-y-8">
              {PILLAR_ORDER.map((pillarSlug) => {
                const pillarProjects = projectsByPillar[pillarSlug] || [];
                const pillarClass = `pillar-${pillarSlug}`;
                return (
                  <div key={pillarSlug} className="flex flex-wrap items-start gap-4">
                    <Link href={`/pillars/${pillarSlug}`}>
                      <span className={`inline-block px-3 py-1.5 rounded-full text-xs cursor-pointer ${pillarClass}`}>
                        {PILLAR_DISPLAY[pillarSlug]}
                      </span>
                    </Link>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {pillarProjects.map((p) => (
                        <Link key={p.slug} href={`/projects/${p.slug}`}>
                          <span
                            className="inline-block px-3 py-1 border rounded-sm text-xs cursor-pointer hover:opacity-60 transition-opacity"
                            style={{ borderColor: 'var(--border)', fontFamily: 'Inter, sans-serif' }}
                          >
                            {p.frontmatter.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Concepts */}
        <div className="pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>
            Key Concepts
          </p>
          <div className="flex flex-wrap gap-3">
            {concepts.map((c) => (
              <Link key={c.slug} href={`/concepts/${c.slug}`}>
                <span
                  className="inline-block px-3 py-1.5 border rounded-sm text-sm cursor-pointer hover:opacity-60 transition-opacity"
                  style={{ borderColor: 'var(--border)', fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {c.frontmatter.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
