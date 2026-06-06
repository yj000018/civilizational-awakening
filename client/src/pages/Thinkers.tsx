/**
 * Thinkers — index of intellectual lineage
 */

import Layout from '@/components/Layout';
import { getContentByType } from '@/lib/content';
import { Link } from 'wouter';

const LINEAGE_ORDER = [
  'consciousness-integral',
  'consciousness-evolution',
  'consciousness-physics',
  'consciousness-neuroscience',
  'cognition-technology',
  'systems-civilization',
  'systems-ecology',
  'technology-civilization',
  'design-civilization',
  'science-humanity',
];

const LINEAGE_LABELS: Record<string, string> = {
  'consciousness-integral': 'Consciousness & Integral',
  'consciousness-evolution': 'Consciousness & Evolution',
  'consciousness-physics': 'Consciousness & Physics',
  'consciousness-neuroscience': 'Consciousness & Neuroscience',
  'cognition-technology': 'Cognition & Technology',
  'systems-civilization': 'Systems & Civilization',
  'systems-ecology': 'Systems & Ecology',
  'technology-civilization': 'Technology & Civilization',
  'design-civilization': 'Design & Civilization',
  'science-humanity': 'Science & Humanity',
};

export default function Thinkers() {
  const thinkers = getContentByType('thinker');

  // Group by lineage_category
  const groups: Record<string, typeof thinkers> = {};
  for (const t of thinkers) {
    const cat = (t.frontmatter as unknown as Record<string, string>)['lineage_category'] || 'other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(t);
  }

  return (
    <Layout>
      <div className="container py-16">
        <header className="mb-16">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Intellectual Lineage
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
            }}
          >
            Thinkers
          </h1>
          <p
            style={{
              opacity: 0.55,
              maxWidth: '60ch',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.1rem',
            }}
          >
            The intellectual ancestors and contemporaries whose work shapes this inquiry.
          </p>
        </header>

        {LINEAGE_ORDER.map((lineage) => {
          const group = groups[lineage];
          if (!group || group.length === 0) return null;

          return (
            <section key={lineage} className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
                >
                  {LINEAGE_LABELS[lineage] || lineage}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((thinker) => (
                  <Link key={thinker.slug} href={`/thinkers/${thinker.slug}`}>
                    <div
                      className="group p-5 border rounded-sm cursor-pointer transition-all duration-200 hover:shadow-sm"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
                    >
                      <h3
                        className="text-lg font-medium mb-2 group-hover:opacity-70 transition-opacity"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                      >
                        {thinker.frontmatter.title}
                      </h3>
                      {thinker.frontmatter.summary && (
                        <p className="text-xs leading-relaxed" style={{ opacity: 0.5 }}>
                          {thinker.frontmatter.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Layout>
  );
}
