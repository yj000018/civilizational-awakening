/**
 * RelatedContent — shows related projects, concepts, pillars
 */

import { Link } from 'wouter';
import { ContentItem, PILLAR_DISPLAY } from '@/lib/content';

interface RelatedContentProps {
  projects?: ContentItem[];
  concepts?: ContentItem[];
  pillars?: ContentItem[];
  thinkers?: ContentItem[];
}

function RelatedCard({ item, href }: { item: ContentItem; href: string }) {
  const pillarSlug = item.frontmatter.pillar || '';
  const pillarClass = `pillar-${pillarSlug}`;

  return (
    <Link href={href}>
      <div
        className="group p-4 border rounded transition-all duration-200 hover:shadow-sm cursor-pointer"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--card)',
        }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
          >
            {item.type}
          </span>
          {pillarSlug && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${pillarClass}`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {PILLAR_DISPLAY[pillarSlug] || pillarSlug}
            </span>
          )}
        </div>
        <h4
          className="text-base font-medium group-hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {item.frontmatter.title}
        </h4>
        {item.frontmatter.summary && (
          <p className="text-sm mt-1" style={{ opacity: 0.55 }}>
            {item.frontmatter.summary}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function RelatedContent({ projects = [], concepts = [], pillars = [], thinkers = [] }: RelatedContentProps) {
  const hasContent = projects.length > 0 || concepts.length > 0 || pillars.length > 0 || thinkers.length > 0;
  if (!hasContent) return null;

  return (
    <section className="mt-16 pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
      <h3
        className="text-xs uppercase tracking-widest mb-8"
        style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
      >
        Related
      </h3>

      {projects.length > 0 && (
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif' }}>
            Projects
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((item) => (
              <RelatedCard key={item.slug} item={item} href={`/projects/${item.slug}`} />
            ))}
          </div>
        </div>
      )}

      {concepts.length > 0 && (
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif' }}>
            Concepts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {concepts.map((item) => (
              <RelatedCard key={item.slug} item={item} href={`/concepts/${item.slug}`} />
            ))}
          </div>
        </div>
      )}

      {pillars.length > 0 && (
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif' }}>
            Pillars
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pillars.map((item) => (
              <RelatedCard key={item.slug} item={item} href={`/pillars/${item.slug}`} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
