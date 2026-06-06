/**
 * Inquiry — Civilizational Awakening overview
 */

import Layout from '@/components/Layout';
import ContentPage from '@/components/ContentPage';
import { getContentBySlug } from '@/lib/content';

export default function Inquiry() {
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
