/**
 * ThinkerDetail — individual thinker page
 */

import { useParams } from 'wouter';
import Layout from '@/components/Layout';
import { getContentBySlug, getContentByType, PILLAR_DISPLAY } from '@/lib/content';
import { Link } from 'wouter';
import { marked } from 'marked';

export default function ThinkerDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const item = getContentBySlug('thinker', slug);

  if (!item) {
    return (
      <Layout>
        <div className="container py-16">
          <Link href="/thinkers">
            <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.4, letterSpacing: '0.12em' }}>
              ← Thinkers
            </span>
          </Link>
          <p className="mt-8" style={{ opacity: 0.5 }}>Thinker not found.</p>
        </div>
      </Layout>
    );
  }

  const { frontmatter, body } = item;
  const fm = frontmatter as unknown as Record<string, unknown>;

  // Portrait image mapping
  const PORTRAIT_MAP: Record<string, string> = {
    'buckminster-fuller': '/manus-storage/thinker-buckminster-fuller_f24f7022.jpg',
    'ken-wilber': '/manus-storage/thinker-ken-wilber_03617f79.jpg',
    'teilhard-de-chardin': '/manus-storage/thinker-teilhard-de-chardin_1ff8e71f.jpg',
    'david-bohm': '/manus-storage/thinker-david-bohm_91f9ff3e.jpg',
    'iain-mcgilchrist': '/manus-storage/thinker-iain-mcgilchrist_b00602f4.jpg',
    'douglas-engelbart': '/manus-storage/thinker-douglas-engelbart_f2977f68.jpg',
    'kevin-kelly': '/manus-storage/thinker-kevin-kelly_6684eadd.jpg',
    'gregory-bateson': '/manus-storage/thinker-gregory-bateson_6b84c8dc.jpg',
    'christopher-alexander': '/manus-storage/thinker-christopher-alexander_286bb0f6.jpg',
    'stewart-brand': '/manus-storage/thinker-stewart-brand_c48007d3.jpg',
    'albert-einstein': '/manus-storage/thinker-albert-einstein_10502570.jpg',
    'sri-aurobindo': '/manus-storage/thinker-sri-aurobindo_1740d639.jpg',
  };
  const portraitUrl = PORTRAIT_MAP[slug] || null;
  const relatedPillars = (fm['related_pillars'] as string[]) || [];
  const relatedProjects = (fm['related_projects'] as string[]) || [];
  const keyIdeas = (fm['key_ideas'] as string[]) || [];
  const tags = frontmatter.tags || [];

  // Resolve related projects
  const allProjects = getContentByType('project');
  const linkedProjects = relatedProjects
    .map((s) => allProjects.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <Layout>
      <div className="container py-16">
        {/* Back */}
        <div className="mb-12">
          <Link href="/thinkers">
            <span
              className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ opacity: 0.4, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
            >
              ← Intellectual Lineage
            </span>
          </Link>
        </div>

        {/* Portrait banner */}
        {portraitUrl && (
          <div
            className="mb-12 rounded-sm overflow-hidden"
            style={{ height: 280, position: 'relative' }}
          >
            <img
              src={portraitUrl}
              alt={`${frontmatter.title} — editorial portrait`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(249,247,242,0.85) 30%, rgba(249,247,242,0.1) 100%)',
              }}
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          <span
            className="text-xs uppercase tracking-widest mb-4 block"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Thinker
          </span>
          <h1
            className="mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 400,
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
        </header>

        {/* Two-column */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <div
              className="prose-ca"
              dangerouslySetInnerHTML={{ __html: marked.parse(body, { async: false }) as string }}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              {keyIdeas.length > 0 && (
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
                  >
                    Key Ideas
                  </p>
                  <ul className="space-y-1.5">
                    {keyIdeas.map((idea) => (
                      <li key={idea} className="text-sm" style={{ opacity: 0.6 }}>
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {relatedPillars.length > 0 && (
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
                  >
                    Pillars
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedPillars.map((p) => (
                      <Link key={p} href={`/pillars/${p}`}>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full cursor-pointer pillar-${p}`}
                        >
                          {PILLAR_DISPLAY[p] || p}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {linkedProjects.length > 0 && (
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
                  >
                    Related Projects
                  </p>
                  <ul className="space-y-1.5">
                    {linkedProjects.map((p) => p && (
                      <li key={p.slug}>
                        <Link href={`/projects/${p.slug}`}>
                          <span className="text-sm hover:opacity-60 transition-opacity" style={{ opacity: 0.6 }}>
                            {p.frontmatter.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tags.length > 0 && (
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
                  >
                    Themes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
