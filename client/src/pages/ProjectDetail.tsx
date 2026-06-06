/**
 * ProjectDetail — individual project page
 */

import { useParams } from 'wouter';
import Layout from '@/components/Layout';
import ContentPage from '@/components/ContentPage';
import { getContentBySlug } from '@/lib/content';
import { Link } from 'wouter';

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const item = getContentBySlug('project', slug);

  if (!item) {
    return (
      <Layout>
        <div className="container py-16">
          <Link href="/projects">
            <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.4, letterSpacing: '0.12em' }}>
              ← Projects
            </span>
          </Link>
          <p className="mt-8" style={{ opacity: 0.5 }}>Project not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ContentPage item={item} backHref="/projects" backLabel="Projects" />
    </Layout>
  );
}
