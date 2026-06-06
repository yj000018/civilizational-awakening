/**
 * EssayDetail — long-form essay reader
 * Design: editorial, generous line-height, wide reading column
 */

import Layout from '@/components/Layout';
import { useContent, PILLAR_DISPLAY } from '@/lib/content';
import { Link } from 'wouter';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useMemo } from 'react';

interface Props {
  params: { slug: string };
}

export default function EssayDetail({ params }: Props) {
  const { getContentBySlug, getContentByType } = useContent();
  const essay = getContentBySlug('essay', params.slug);

  const htmlBody = useMemo(() => {
    if (!essay?.body) return '';
    return DOMPurify.sanitize(marked.parse(essay.body) as string);
  }, [essay?.body]);

  if (!essay) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <p style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif' }}>Essay not found.</p>
          <Link href="/essays">
            <span className="text-sm mt-4 inline-block" style={{ opacity: 0.5 }}>← Back to essays</span>
          </Link>
        </div>
      </Layout>
    );
  }

  const pillarSlug = essay.frontmatter.pillar;
  const allEssays = getContentByType('essay').filter((e) => e.slug !== essay.slug);
  const related = allEssays.filter((e) => e.frontmatter.pillar === pillarSlug).slice(0, 3);

  return (
    <Layout>
      <article>
        {/* Header */}
        <div
          className="py-16 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="container">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/essays">
                <span
                  className="text-xs cursor-pointer hover:opacity-60 transition-opacity"
                  style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif' }}
                >
                  ← Essays
                </span>
              </Link>
              {pillarSlug && (
                <>
                  <span style={{ opacity: 0.2 }}>/</span>
                  <Link href={`/pillars/${pillarSlug}`}>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs cursor-pointer pillar-${pillarSlug}`}
                    >
                      {PILLAR_DISPLAY[pillarSlug] || pillarSlug}
                    </span>
                  </Link>
                </>
              )}
            </div>

            <h1
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                maxWidth: '22ch',
              }}
            >
              {essay.frontmatter.title}
            </h1>

            {essay.frontmatter.summary && (
              <p
                className="mt-6"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  opacity: 0.55,
                  maxWidth: '60ch',
                  lineHeight: 1.6,
                }}
              >
                {essay.frontmatter.summary}
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="container py-16">
          <div className="flex gap-16">
            {/* Main reading column */}
            <div
              className="flex-1 min-w-0"
              style={{ maxWidth: '68ch' }}
            >
              <div
                className="essay-body"
                dangerouslySetInnerHTML={{ __html: htmlBody }}
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                  lineHeight: 1.85,
                  color: 'var(--foreground)',
                }}
              />
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-8 space-y-8">
                {pillarSlug && (
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-3"
                      style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                    >
                      Pillar
                    </p>
                    <Link href={`/pillars/${pillarSlug}`}>
                      <span
                        className={`inline-block px-3 py-1.5 rounded-full text-xs cursor-pointer pillar-${pillarSlug}`}
                      >
                        {PILLAR_DISPLAY[pillarSlug] || pillarSlug}
                      </span>
                    </Link>
                  </div>
                )}

                {related.length > 0 && (
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-4"
                      style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                    >
                      Related Essays
                    </p>
                    <div className="space-y-3">
                      {related.map((e) => (
                        <Link key={e.slug} href={`/essays/${e.slug}`}>
                          <div
                            className="p-3 border rounded-sm cursor-pointer hover:opacity-70 transition-opacity"
                            style={{ borderColor: 'var(--border)' }}
                          >
                            <p
                              style={{
                                fontFamily: 'Cormorant Garamond, Georgia, serif',
                                fontSize: '0.95rem',
                                lineHeight: 1.4,
                              }}
                            >
                              {e.frontmatter.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Link href="/essays">
                    <span
                      className="text-xs cursor-pointer hover:opacity-60 transition-opacity"
                      style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif' }}
                    >
                      ← All essays
                    </span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <style>{`
        .essay-body h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.3rem, 2vw, 1.6rem);
          font-weight: 500;
          margin-top: 3rem;
          margin-bottom: 1rem;
          opacity: 0.85;
        }
        .essay-body h3 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          font-weight: 500;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          opacity: 0.75;
        }
        .essay-body p {
          margin-bottom: 1.5rem;
        }
        .essay-body ul, .essay-body ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .essay-body li {
          margin-bottom: 0.5rem;
        }
        .essay-body blockquote {
          border-left: 2px solid var(--accent);
          padding-left: 1.25rem;
          margin: 2rem 0;
          font-style: italic;
          opacity: 0.7;
        }
        .essay-body strong {
          font-weight: 600;
          opacity: 0.9;
        }
        .essay-body em {
          font-style: italic;
        }
        .essay-body hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 3rem 0;
        }
      `}</style>
    </Layout>
  );
}
