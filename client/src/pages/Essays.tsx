/**
 * Essays — index of long-form essays
 * Design: editorial, spacious, grouped by pillar
 */

import Layout from '@/components/Layout';
import { getContentByType, PILLAR_DISPLAY } from '@/lib/content';
import { Link } from 'wouter';

export default function Essays() {
  const essays = getContentByType('essay');

  // Group by pillar
  const byPillar: Record<string, typeof essays> = {};
  const noPillar: typeof essays = [];
  for (const e of essays) {
    const p = e.frontmatter.pillar;
    if (p) {
      if (!byPillar[p]) byPillar[p] = [];
      byPillar[p].push(e);
    } else {
      noPillar.push(e);
    }
  }

  const pillarOrder = ['mind', 'civilization', 'body-action', 'spirit-soul', 'heart', 'network-transmission'];

  return (
    <Layout>
      <div className="container py-16">
        <header className="mb-16">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Essays
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
            }}
          >
            Long-Form Inquiry
          </h1>
          <p
            style={{
              opacity: 0.5,
              maxWidth: '52ch',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.15rem',
            }}
          >
            Extended explorations of the questions that matter most — written to think through, not to conclude.
          </p>
        </header>

        <div className="space-y-16">
          {pillarOrder.map((pillarSlug) => {
            const group = byPillar[pillarSlug];
            if (!group || group.length === 0) return null;
            return (
              <section key={pillarSlug}>
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs pillar-${pillarSlug}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {PILLAR_DISPLAY[pillarSlug] || pillarSlug}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                </div>
                <div className="space-y-8">
                  {group.map((essay) => (
                    <article key={essay.slug}>
                      <Link href={`/essays/${essay.slug}`}>
                        <div
                          className="group p-6 border rounded-sm cursor-pointer transition-all duration-200 hover:border-opacity-60"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <h2
                            className="mb-3 group-hover:opacity-70 transition-opacity"
                            style={{
                              fontFamily: 'Cormorant Garamond, Georgia, serif',
                              fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                              fontWeight: 400,
                              lineHeight: 1.3,
                            }}
                          >
                            {essay.frontmatter.title}
                          </h2>
                          {essay.frontmatter.summary && (
                            <p
                              style={{
                                opacity: 0.55,
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                                maxWidth: '70ch',
                              }}
                            >
                              {essay.frontmatter.summary}
                            </p>
                          )}
                          <p
                            className="mt-4 text-xs"
                            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif' }}
                          >
                            Read essay →
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Ungrouped */}
          {noPillar.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif' }}
                >
                  Other
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
              </div>
              <div className="space-y-8">
                {noPillar.map((essay) => (
                  <article key={essay.slug}>
                    <Link href={`/essays/${essay.slug}`}>
                      <div
                        className="group p-6 border rounded-sm cursor-pointer"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <h2
                          className="mb-3 group-hover:opacity-70 transition-opacity"
                          style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: '1.5rem',
                            fontWeight: 400,
                          }}
                        >
                          {essay.frontmatter.title}
                        </h2>
                        {essay.frontmatter.summary && (
                          <p style={{ opacity: 0.55, fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
                            {essay.frontmatter.summary}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
