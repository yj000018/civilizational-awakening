/**
 * ProjectConstellation — P0 projects grouped by pillar
 * Design: constellation-like grouping, pillar-color coded
 */

import { Link } from 'wouter';
import { getContentByType, PILLAR_ORDER, PILLAR_DISPLAY, PROJECT_PILLAR_MAP } from '@/lib/content';

export default function ProjectConstellation() {
  const projects = getContentByType('project');

  // Group by pillar
  const groups: Record<string, typeof projects> = {};
  for (const project of projects) {
    const pillarSlug = project.frontmatter.pillar || PROJECT_PILLAR_MAP[project.slug] || 'other';
    if (!groups[pillarSlug]) groups[pillarSlug] = [];
    groups[pillarSlug].push(project);
  }

  return (
    <div className="space-y-12">
      {PILLAR_ORDER.map((pillarSlug) => {
        const group = groups[pillarSlug];
        if (!group || group.length === 0) return null;
        const pillarDisplay = PILLAR_DISPLAY[pillarSlug];
        const pillarClass = `pillar-${pillarSlug}`;

        return (
          <div key={pillarSlug}>
            {/* Pillar label */}
            <div className="flex items-center gap-4 mb-5">
              <Link href={`/pillars/${pillarSlug}`}>
                <span className={`text-xs px-2.5 py-1 rounded-full cursor-pointer ${pillarClass}`}>
                  {pillarDisplay}
                </span>
              </Link>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            </div>

            {/* Projects in this pillar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <div
                    className="group p-4 border rounded-sm cursor-pointer transition-all duration-200 hover:shadow-sm"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
                  >
                    <h4
                      className="text-base font-medium mb-1.5 group-hover:opacity-70 transition-opacity"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {project.frontmatter.title}
                    </h4>
                    {(project.frontmatter.one_liner || project.frontmatter.summary) && (
                      <p className="text-xs leading-relaxed" style={{ opacity: 0.5 }}>
                        {project.frontmatter.one_liner || project.frontmatter.summary}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
