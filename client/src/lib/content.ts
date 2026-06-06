/**
 * Content Loader — Civilizational Awakening
 * Design: locale-aware, hash-cached per locale, driven from frontmatter
 *
 * Usage:
 *   import { useContent } from '@/lib/content';
 *   const { getContentBySlug, getContentByType, getAllContent } = useContent();
 *
 * Or for non-hook contexts:
 *   import { getContentForLocale } from '@/lib/content';
 *   const { getContentBySlug } = getContentForLocale('fr');
 */

import { useLocale } from '@/contexts/LocaleContext';

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
  // AI-generated content flag (set in frontmatter for review)
  content_source?: 'original' | 'ai_generated' | 'ai_draft';
}

export interface ContentItem {
  frontmatter: ContentFrontmatter;
  body: string;
  slug: string;
  type: string;
}

// ─── VITE GLOB IMPORTS (eager, all locales) ─────────────────────────────────

const enFiles = import.meta.glob('../content/en/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const frFiles = import.meta.glob('../content/fr/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const itFiles = import.meta.glob('../content/it/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const LOCALE_FILES: Record<string, Record<string, string>> = {
  en: enFiles,
  fr: frFiles,
  it: itFiles,
};

// ─── MARKDOWN PARSER ─────────────────────────────────────────────────────────

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

  const fm: Record<string, unknown> = {};
  const lines = fmRaw.split('\n');
  let currentKey: string | null = null;
  let currentList: string[] = [];

  for (const line of lines) {
    if (line.match(/^\t- (.+)/) || line.match(/^  - (.+)/)) {
      const val = line.replace(/^\t- |^  - /, '').trim();
      if (currentKey && val) {
        currentList.push(val);
        fm[currentKey] = currentList;
      }
      continue;
    }
    if (line.match(/^\t-\s*$/) || line.match(/^  -\s*$/)) continue;

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
  // path: ../content/en/pillars/spirit-soul.md or ../content/fr/pillars/spirit-soul.md
  const stripped = path.replace('../content/', '');
  const parts = stripped.split('/');
  const typeDir = parts.length >= 3 ? parts[1] : parts[0];
  const slugFile = parts.length >= 3 ? parts[2] : parts[1];
  const type = typeDir.replace(/s$/, '');
  const slug = slugFile.replace('.md', '');
  return { type, slug };
}

// ─── LOCALE-AWARE REGISTRY ───────────────────────────────────────────────────

const _registries: Partial<Record<string, ContentItem[]>> = {};

function buildRegistry(locale: string): ContentItem[] {
  if (_registries[locale]) return _registries[locale]!;

  const files = LOCALE_FILES[locale] ?? enFiles;

  // For translated locales, fall back to EN for any missing files
  const sourceFiles = locale === 'en' ? files : { ...enFiles, ...files };

  const items = Object.entries(sourceFiles).map(([path, raw]) => {
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

  _registries[locale] = items;
  return items;
}

// ─── PUBLIC API — locale-aware ────────────────────────────────────────────────

export interface ContentAPI {
  getAllContent: () => ContentItem[];
  getContentByType: (type: string) => ContentItem[];
  getContentBySlug: (type: string, slug: string) => ContentItem | undefined;
  getRelatedContent: (frontmatter: ContentFrontmatter) => {
    projects: ContentItem[];
    concepts: ContentItem[];
    thinkers: ContentItem[];
    pillars: ContentItem[];
  };
}

export function getContentForLocale(locale: string): ContentAPI {
  const registry = buildRegistry(locale);

  return {
    getAllContent: () => registry,

    getContentByType: (type: string) =>
      registry.filter((item) => item.type === type),

    getContentBySlug: (type: string, slug: string) =>
      registry.find((item) => item.type === type && item.slug === slug),

    getRelatedContent: (frontmatter: ContentFrontmatter) => {
      const find = (slugs: string[] | undefined, type: string): ContentItem[] => {
        if (!slugs || slugs.length === 0) return [];
        return slugs
          .map((s) => registry.find((item) => item.slug === s && item.type === type))
          .filter(Boolean) as ContentItem[];
      };
      return {
        projects: find(frontmatter.related_projects, 'project'),
        concepts: find(frontmatter.related_concepts, 'concept'),
        thinkers: find(frontmatter.related_thinkers, 'thinker'),
        pillars: find(frontmatter.related_pillars, 'pillar'),
      };
    },
  };
}

/**
 * React hook — returns locale-aware content API.
 * Use inside components.
 */
export function useContent(): ContentAPI {
  const { locale } = useLocale();
  return getContentForLocale(locale);
}

// ─── BACKWARDS-COMPAT EXPORTS (EN only — for non-hook contexts) ──────────────
// These are kept for any utility scripts or non-component code.
// Components should use useContent() instead.

export function getAllContent(): ContentItem[] {
  return buildRegistry('en');
}

export function getContentByType(type: string): ContentItem[] {
  return buildRegistry('en').filter((item) => item.type === type);
}

export function getContentBySlug(type: string, slug: string): ContentItem | undefined {
  return buildRegistry('en').find((item) => item.type === type && item.slug === slug);
}

export function getRelatedContent(frontmatter: ContentFrontmatter): {
  projects: ContentItem[];
  concepts: ContentItem[];
  thinkers: ContentItem[];
  pillars: ContentItem[];
} {
  return getContentForLocale('en').getRelatedContent(frontmatter);
}

// ─── PILLAR METADATA ─────────────────────────────────────────────────────────

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
