/**
 * PillarDetail — individual pillar page
 */

import { useParams } from 'wouter';
import Layout from '@/components/Layout';
import ContentPage from '@/components/ContentPage';
import { getContentBySlug, getContentByType } from '@/lib/content';
import { Link } from 'wouter';

export default function PillarDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const item = getContentBySlug('pillar', slug);

  // Projects belonging to this pillar
  const projects = getContentByType('project').filter(
    (p) => p.frontmatter.pillar === slug
  );

  if (!item) {
    return (
      <Layout>
        <div className="container py-16">
          <Link href="/pillars">
            <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.4, letterSpacing: '0.12em' }}>
              ← Pillars
            </span>
          </Link>
          <p className="mt-8" style={{ opacity: 0.5 }}>Pillar not found.</p>
        </div>
      </Layout>
    );
  }

  // Inject projects into related if not already there
  const enrichedItem = {
    ...item,
    frontmatter: {
      ...item.frontmatter,
      related_projects: [
        ...(item.frontmatter.related_projects || []),
        ...projects.map((p) => p.slug).filter(
          (s) => !(item.frontmatter.related_projects || []).includes(s)
        ),
      ],
    },
  };

  return (
    <Layout>
      <ContentPage item={enrichedItem} backHref="/pillars" backLabel="Pillars" />
    </Layout>
  );
}
