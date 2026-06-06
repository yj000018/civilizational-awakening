/**
 * Inquiry — Civilizational Awakening overview
 */

import Layout from '@/components/Layout';
import ContentPage from '@/components/ContentPage';
import { useContent } from '@/lib/content';

export default function Inquiry() {
  const { getContentBySlug } = useContent();
  const item = getContentBySlug('concept', 'civilizational-awakening');

  if (!item) {
    return (
      <Layout>
        <div className="container py-16">
          <p style={{ opacity: 0.5 }}>Content not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ContentPage item={item} />
    </Layout>
  );
}
