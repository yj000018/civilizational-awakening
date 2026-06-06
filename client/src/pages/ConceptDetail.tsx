/**
 * ConceptDetail — individual concept page
 */

import { useParams } from 'wouter';
import Layout from '@/components/Layout';
import ContentPage from '@/components/ContentPage';
import { useContent } from '@/lib/content';
import { Link } from 'wouter';

export default function ConceptDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { getContentBySlug } = useContent();
  const item = getContentBySlug('concept', slug);

  if (!item) {
    return (
      <Layout>
        <div className="container py-16">
          <Link href="/">
            <span className="text-xs uppercase tracking-widest" style={{ opacity: 0.4, letterSpacing: '0.12em' }}>
              ← Home
            </span>
          </Link>
          <p className="mt-8" style={{ opacity: 0.5 }}>Concept not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ContentPage item={item} backHref="/" backLabel="Home" />
    </Layout>
  );
}
