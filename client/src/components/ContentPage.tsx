/**
 * ContentPage — reusable template for pillar, project, concept detail pages
 * Design: editorial, spacious, frontmatter-driven
 */

import { Link } from 'wouter';
import { ContentItem, getRelatedContent, PILLAR_DISPLAY } from '@/lib/content';
import RelatedContent from './RelatedContent';
import { marked } from 'marked';

interface ContentPageProps {
  item: ContentItem;
  backHref?: string;
  backLabel?: string;
}

function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

export default function ContentPage({ item, backHref, backLabel }: ContentPageProps) {
  const { frontmatter, body } = item;
  const related = getRelatedContent(frontmatter);
  const pillarSlug = frontmatter.pillar || '';
  const pillarDisplay = PILLAR_DISPLAY[pillarSlug] || pillarSlug;
  const pillarClass = `pillar-${pillarSlug}`;

  return (
    <div className="container py-16">
      {/* Back link */}
      {backHref && (
        <div className="mb-12">
          <Link href={backHref}>
            <span
              className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
            >
              ← {backLabel || 'Back'}
            </span>
          </Link>
        </div>
      )}

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            {frontmatter.type}
          </span>
          {pillarSlug && pillarDisplay && (
            <Link href={`/pillars/${pillarSlug}`}>
              <span className={`text-xs px-2.5 py-1 rounded-full cursor-pointer ${pillarClass}`}>
                {pillarDisplay}
              </span>
            </Link>
          )}
        </div>

        <h1
          className="mb-4"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {frontmatter.title}
        </h1>

        {frontmatter.summary && (
          <p
            className="text-lg"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontStyle: 'italic',
              opacity: 0.65,
              maxWidth: '60ch',
              lineHeight: 1.5,
            }}
          >
            {frontmatter.summary}
          </p>
        )}

        {frontmatter.one_liner && (
          <p
            className="mt-4 text-sm"
            style={{ opacity: 0.5, maxWidth: '60ch' }}
          >
            {frontmatter.one_liner}
          </p>
        )}
      </header>

      {/* Two-column layout: content + sidebar */}
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          <div
            className="prose-ca"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
          />
        </article>

        {/* Sidebar metadata */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
                >
                  Themes
                </p>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{
                        borderColor: 'var(--border)',
                        color: 'var(--muted-foreground)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {frontmatter.related_thinkers && frontmatter.related_thinkers.length > 0 && (
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
                >
                  Thinkers
                </p>
                <ul className="space-y-1">
                  {frontmatter.related_thinkers.map((t) => (
                    <li key={t} className="text-sm" style={{ opacity: 0.55 }}>
                      {t.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Related content */}
      <RelatedContent
        projects={related.projects}
        concepts={related.concepts}
        pillars={related.pillars}
      />
    </div>
  );
}
