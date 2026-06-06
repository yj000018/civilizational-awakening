/**
 * Content Loader — Civilizational Awakening
 * Design: clear, calm, data-driven from frontmatter
 * Loads Markdown files bundled via Vite's import.meta.glob
 */

export interface ContentFrontmatter {
  title: string;
  slug: string;
  type: 'concept' | 'pillar' | 'project' | 'thinker' | 'essay' | 'library';
  summary?: string;
  pillar?: string;
  status?: string;
  visibility?: string;
  publish_to_site?: boolean;
  one_liner?: string;
  core_question?: string;
  tags?: string[];
  related_projects?: string[];
  related_concepts?: string[];
  related_thinkers?: string[];
  related_pillars?: string[];
  related_essays?: string[];
}

export interface ContentItem {
  frontmatter: ContentFrontmatter;
  body: string;
  slug: string;
  type: string;
}

// Vite glob import — all markdown files in content subdirs
const allFiles = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseMarkdown(raw: string): { frontmatter: ContentFrontmatter; body: string } {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!fmMatch) {
    return {
      frontmatter: { title: '', slug: '', type: 'concept' },
      body: raw,
    };
  }

  const fmRaw = fmMatch[1];
  const body = fmMatch[2].trim();

  // Simple YAML parser for our known frontmatter structure
  const fm: Record<string, unknown> = {};
  const lines = fmRaw.split('\n');
  let currentKey: string | null = null;
  let currentList: string[] = [];

  for (const line of lines) {
    // List item
    if (line.match(/^\t- (.+)/) || line.match(/^  - (.+)/)) {
      const val = line.replace(/^\t- |^  - /, '').trim();
      if (currentKey && val) {
        currentList.push(val);
        fm[currentKey] = currentList;
      }
      continue;
    }
    // Empty list item (dangling -)
    if (line.match(/^\t-\s*$/) || line.match(/^  -\s*$/)) {
      continue;
    }
    // Key: value
    const kvMatch = line.match(/^(\w[\w_-]*): (.+)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      currentList = [];
      let val: unknown = kvMatch[2].trim().replace(/^["']|["']$/g, '');
      if (val === 'true') val = true;
      if (val === 'false') val = false;
      fm[currentKey] = val;
      continue;
    }
    // Key with no value (list follows)
    const keyOnly = line.match(/^(\w[\w_-]*):\s*$/);
    if (keyOnly) {
      currentKey = keyOnly[1];
      currentList = [];
      fm[currentKey] = [];
    }
  }

  return { frontmatter: fm as unknown as ContentFrontmatter, body };
}

function pathToTypeAndSlug(path: string): { type: string; slug: string } {
  // path like: ../content/pillars/spirit-soul.md
  const parts = path.replace('../content/', '').split('/');
  const type = parts[0].replace(/s$/, ''); // pillars → pillar
  const slug = parts[1].replace('.md', '');
  return { type, slug };
}

// Build the content registry once
let _registry: ContentItem[] | null = null;

function buildRegistry(): ContentItem[] {
  if (_registry) return _registry;

  _registry = Object.entries(allFiles).map(([path, raw]) => {
    const { type: pathType, slug: pathSlug } = pathToTypeAndSlug(path);
    const { frontmatter, body } = parseMarkdown(raw);
    return {
      frontmatter: {
        ...frontmatter,
        type: (frontmatter.type || pathType) as ContentFrontmatter['type'],
        slug: frontmatter.slug || pathSlug,
      },
      body,
      slug: frontmatter.slug || pathSlug,
      type: frontmatter.type || pathType,
    };
  });

  return _registry;
}

export function getAllContent(): ContentItem[] {
  return buildRegistry();
}

export function getContentByType(type: string): ContentItem[] {
  return buildRegistry().filter((item) => item.type === type);
}

export function getContentBySlug(type: string, slug: string): ContentItem | undefined {
  return buildRegistry().find((item) => item.type === type && item.slug === slug);
}

export function getRelatedContent(frontmatter: ContentFrontmatter): {
  projects: ContentItem[];
  concepts: ContentItem[];
  thinkers: ContentItem[];
  pillars: ContentItem[];
} {
  const all = buildRegistry();

  const find = (slugs: string[] | undefined, type: string): ContentItem[] => {
    if (!slugs || slugs.length === 0) return [];
    return slugs
      .map((s) => all.find((item) => item.slug === s && item.type === type))
      .filter(Boolean) as ContentItem[];
  };

  return {
    projects: find(frontmatter.related_projects, 'project'),
    concepts: find(frontmatter.related_concepts, 'concept'),
    thinkers: find(frontmatter.related_thinkers, 'thinker'),
    pillars: find(frontmatter.related_pillars, 'pillar'),
  };
}

// Pillar ordering for navigation
export const PILLAR_ORDER = [
  'spirit-soul',
  'heart',
  'mind',
  'body-action',
  'civilization',
  'network-transmission',
];

export const PILLAR_DISPLAY: Record<string, string> = {
  'spirit-soul': 'Spirit / Soul',
  heart: 'Heart',
  mind: 'Mind',
  'body-action': 'Body / Action',
  civilization: 'Civilization',
  'network-transmission': 'Network / Transmission',
};

// Project → pillar mapping (from audit)
export const PROJECT_PILLAR_MAP: Record<string, string> = {
  'mirror-mirror': 'spirit-soul',
  archetypes: 'spirit-soul',
  'visual-reality': 'heart',
  'y-os': 'mind',
  'memory-os': 'mind',
  oneshift: 'body-action',
  'actor-of-change': 'body-action',
  youniverse: 'civilization',
  'next-civ': 'civilization',
  'human-capital-systems': 'civilization',
  'collective-intelligence': 'civilization',
};
