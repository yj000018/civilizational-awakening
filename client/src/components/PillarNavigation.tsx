/**
 * PillarNavigation — six pillars displayed as navigable cards
 * Used on homepage and /pillars index
 */

import { Link } from 'wouter';
import { getContentByType, PILLAR_ORDER, PILLAR_DISPLAY } from '@/lib/content';

const PILLAR_QUESTIONS: Record<string, string> = {
  'spirit-soul': 'Who are we?',
  heart: 'What opens and nourishes the human heart?',
  mind: 'How does intelligence evolve?',
  'body-action': 'How does consciousness become contribution?',
  civilization: 'How do humans flourish together?',
  'network-transmission': 'How do ideas, people and projects connect?',
};

export default function PillarNavigation({ compact = false }: { compact?: boolean }) {
  const pillars = getContentByType('pillar');

  const pillarMap = Object.fromEntries(pillars.map((p) => [p.slug, p]));

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
      {PILLAR_ORDER.map((slug) => {
        const pillar = pillarMap[slug];
        const display = PILLAR_DISPLAY[slug];
        const question = PILLAR_QUESTIONS[slug];
        const pillarClass = `pillar-${slug}`;

        return (
          <Link key={slug} href={`/pillars/${slug}`}>
            <div
              className="group p-6 border rounded-sm cursor-pointer transition-all duration-200 hover:shadow-md h-full"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs px-2.5 py-1 rounded-full ${pillarClass}`}>
                  {display}
                </span>
              </div>
              {!compact && (
                <p
                  className="text-sm leading-relaxed group-hover:opacity-70 transition-opacity"
                  style={{ opacity: 0.55, fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic', fontSize: '1rem' }}
                >
                  {pillar?.frontmatter.summary || question}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
