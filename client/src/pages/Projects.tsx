/**
 * Projects — index of all P0 projects, grouped by pillar
 */

import Layout from '@/components/Layout';
import ContentIndex from '@/components/ContentIndex';
import { useContent } from '@/lib/content';

export default function Projects() {
  const { getContentByType } = useContent();
  const projects = getContentByType('project');

  return (
    <Layout>
      <ContentIndex
        title="Projects"
        subtitle="A constellation of works exploring consciousness, cognition, action and civilization."
        items={projects}
        baseHref="/projects"
        groupByPillar
      />
    </Layout>
  );
}
