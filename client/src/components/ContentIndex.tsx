/**
 * ContentIndex — reusable index page for pillars, projects, concepts
 * Design: clean grid, pillar-color coded, editorial
 */

import { Link } from 'wouter';
import { ContentItem, PILLAR_DISPLAY } from '@/lib/content';

interface ContentIndexProps {
  title: string;
  subtitle?: string;
  items: ContentItem[];
  baseHref: string;
  groupByPillar?: boolean;
}

function ItemCard({ item, href }: { item: ContentItem; href: string }) {
  const pillarSlug = item.frontmatter.pillar || '';
  const pillarClass = `pillar-${pillarSlug}`;
  const pillarDisplay = PILLAR_DISPLAY[pillarSlug] || pillarSlug;

  return (
    <Link href={href}>
      <div
        className="group p-6 border rounded-sm transition-all duration-200 hover:shadow-md cursor-pointer h-full"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--card)',
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
          >
            {item.type}
          </span>
          {pillarSlug && pillarDisplay && item.type !== 'pillar' && (
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${pillarClass}`}>
              {pillarDisplay}
            </span>
          )}
        </div>

        <h3
          className="text-xl font-medium mb-3 group-hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', lineHeight: 1.2 }}
        >
          {item.frontmatter.title}
        </h3>

        {item.frontmatter.summary && (
          <p className="text-sm leading-relaxed" style={{ opacity: 0.55 }}>
            {item.frontmatter.summary}
          </p>
        )}

        {item.frontmatter.one_liner && !item.frontmatter.summary && (
          <p className="text-sm leading-relaxed" style={{ opacity: 0.55 }}>
            {item.frontmatter.one_liner}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function ContentIndex({ title, subtitle, items, baseHref, groupByPillar }: ContentIndexProps) {
  if (groupByPillar) {
    // Group items by pillar
    const PILLAR_ORDER = ['spirit-soul', 'heart', 'mind', 'body-action', 'civilization', 'network-transmission'];
    const groups: Record<string, ContentItem[]> = {};
    for (const item of items) {
      const p = item.frontmatter.pillar || 'other';
      if (!groups[p]) groups[p] = [];
      groups[p].push(item);
    }

    return (
      <div className="container py-16">
        <header className="mb-16">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            {title}
          </p>
          {subtitle && (
            <p className="text-lg" style={{ opacity: 0.55, maxWidth: '60ch', fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}>
              {subtitle}
            </p>
          )}
        </header>

        {PILLAR_ORDER.map((pillarSlug) => {
          const group = groups[pillarSlug];
          if (!group || group.length === 0) return null;
          const pillarDisplay = PILLAR_DISPLAY[pillarSlug] || pillarSlug;
          const pillarClass = `pillar-${pillarSlug}`;

          return (
            <section key={pillarSlug} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Link href={`/pillars/${pillarSlug}`}>
                  <span className={`text-sm px-3 py-1.5 rounded-full cursor-pointer ${pillarClass}`}>
                    {pillarDisplay}
                  </span>
                </Link>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((item) => (
                  <ItemCard key={item.slug} item={item} href={`${baseHref}/${item.slug}`} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className="container py-16">
      <header className="mb-16">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-lg" style={{ opacity: 0.55, maxWidth: '60ch', fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}>
            {subtitle}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard key={item.slug} item={item} href={`${baseHref}/${item.slug}`} />
        ))}
      </div>
    </div>
  );
}
