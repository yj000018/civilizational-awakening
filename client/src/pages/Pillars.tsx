/**
 * Pillars — index of all six pillars
 */

import Layout from '@/components/Layout';
import ContentIndex from '@/components/ContentIndex';
import { useContent, PILLAR_ORDER } from '@/lib/content';

export default function Pillars() {
  const { getContentByType } = useContent();
  const allPillars = getContentByType('pillar');
  // Sort by canonical pillar order
  const sorted = [...allPillars].sort(
    (a, b) => PILLAR_ORDER.indexOf(a.slug) - PILLAR_ORDER.indexOf(b.slug)
  );

  return (
    <Layout>
      <ContentIndex
        title="Six Pillars"
        subtitle="The inquiry is organized through five major layers, with a transversal layer connecting ideas, people and projects."
        items={sorted}
        baseHref="/pillars"
      />
    </Layout>
  );
}
