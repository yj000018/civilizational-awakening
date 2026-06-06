#!/usr/bin/env tsx
/**
 * translate-site.ts — Static DeepL translation pipeline
 * -------------------------------------------------------
 * Reusable module. Copy to any site and adjust CONFIG below.
 *
 * Usage:
 *   DEEPL_API_KEY=xxx tsx scripts/translate-site.ts
 *   DEEPL_API_KEY=xxx tsx scripts/translate-site.ts --force   # retranslate all
 *   DEEPL_API_KEY=xxx tsx scripts/translate-site.ts --file content/en/pillars/mind.md
 *
 * Environment variables:
 *   DEEPL_API_KEY              Required. DeepL Free or Pro key.
 *   TRANSLATION_SOURCE_LOCALE  Default: en
 *   TRANSLATION_TARGET_LOCALES Default: fr,it
 *
 * Output: content/{locale}/{type}/{slug}.md
 * Adds translation metadata block to each translated file's frontmatter.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import https from 'https';
import { URL } from 'url';

// ─── CONFIG (adapt per site) ────────────────────────────────────────────────

const CONFIG = {
  // Root of the content directory (relative to project root)
  contentRoot: 'client/src/content',

  // Source locale directory name
  sourceLocale: process.env.TRANSLATION_SOURCE_LOCALE || 'en',

  // Target locales
  targetLocales: (process.env.TRANSLATION_TARGET_LOCALES || 'fr,it').split(',').map(s => s.trim()),

  // DeepL locale codes (DeepL uses different codes than ISO for some)
  deeplLocaleMap: {
    fr: 'FR',
    it: 'IT',
    de: 'DE',
    es: 'ES',
    pt: 'PT-PT',
    nl: 'NL',
    pl: 'PL',
    ru: 'RU',
    ja: 'JA',
    zh: 'ZH',
  } as Record<string, string>,

  // Frontmatter fields to NOT translate (keep as-is)
  skipFrontmatterFields: new Set([
    'type', 'slug', 'status', 'visibility', 'publish_to_site',
    'pillar', 'related_projects', 'related_concepts', 'related_thinkers',
    'related_pillars', 'related_essays', 'tags', 'lineage_category',
    'translation',
  ]),

  // Frontmatter fields to translate (text content)
  translateFrontmatterFields: new Set([
    'title', 'summary', 'one_liner', 'core_question',
  ]),
};

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface TranslationMeta {
  source_locale: string;
  target_locale: string;
  source_file: string;
  source_hash: string;
  provider: string;
  translated_at: string;
}

interface ParsedFile {
  frontmatter: Record<string, unknown>;
  body: string;
  raw: string;
}

interface Stats {
  translated: number;
  skipped: number;
  failed: number;
  files: { path: string; status: 'translated' | 'skipped' | 'failed'; reason?: string }[];
}

// ─── DEEPL API ──────────────────────────────────────────────────────────────

const DEEPL_KEY = process.env.DEEPL_API_KEY || '';
if (!DEEPL_KEY) {
  console.error('❌  DEEPL_API_KEY is not set. Aborting.');
  process.exit(1);
}

// Auto-detect Free vs Pro endpoint
// DeepL Free keys: may end with :fx OR be a plain UUID without suffix
// Force free endpoint if key looks like a UUID (no domain prefix)
const DEEPL_BASE = (DEEPL_KEY.endsWith(':fx') || /^[a-f0-9-]{36}$/.test(DEEPL_KEY))
  ? 'https://api-free.deepl.com'
  : 'https://api.deepl.com';

async function deeplTranslate(texts: string[], targetLang: string): Promise<string[]> {
  const deeplLang = CONFIG.deeplLocaleMap[targetLang] || targetLang.toUpperCase();

  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: texts,
      target_lang: deeplLang,
      source_lang: 'EN',
      tag_handling: 'xml',
      ignore_tags: ['code', 'pre', 'var', 'slug'],
      preserve_formatting: true,
    });

    const url = new URL(`${DEEPL_BASE}/v2/translate`);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`DeepL API error ${res.statusCode}: ${data}`));
          return;
        }
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.translations.map((t: { text: string }) => t.text));
        } catch (e) {
          reject(new Error(`DeepL parse error: ${e}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── MARKDOWN PARSING ───────────────────────────────────────────────────────

function parseMarkdownFile(filePath: string): ParsedFile {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw, raw };

  const fmRaw = match[1];
  const body = match[2].trim();
  const frontmatter: Record<string, unknown> = {};

  // Simple YAML parser (same as content.ts)
  const lines = fmRaw.split('\n');
  let currentKey: string | null = null;
  let currentList: string[] = [];

  for (const line of lines) {
    if (line.match(/^\s+- (.+)/)) {
      const val = line.replace(/^\s+- /, '').trim();
      if (currentKey && val) {
        currentList.push(val);
        frontmatter[currentKey] = currentList;
      }
      continue;
    }
    if (line.match(/^\s+-\s*$/)) continue;
    const kvMatch = line.match(/^([\w][\w_-]*): (.+)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      currentList = [];
      let val: unknown = kvMatch[2].trim().replace(/^["']|["']$/g, '');
      if (val === 'true') val = true;
      if (val === 'false') val = false;
      frontmatter[currentKey] = val;
      continue;
    }
    const keyOnly = line.match(/^([\w][\w_-]*):\s*$/);
    if (keyOnly) {
      currentKey = keyOnly[1];
      currentList = [];
      frontmatter[currentKey] = [];
    }
  }

  return { frontmatter, body, raw };
}

// ─── BODY PROTECTION ────────────────────────────────────────────────────────

interface Placeholder {
  token: string;
  original: string;
}

/**
 * Protect code blocks, inline code, URLs, variables, and JSX from translation.
 * Returns modified text with placeholders + the placeholder map.
 */
function protectContent(text: string): { protected: string; placeholders: Placeholder[] } {
  const placeholders: Placeholder[] = [];
  let counter = 0;

  const protect = (original: string): string => {
    const token = `XLAT_PROTECT_${counter++}_END`;
    placeholders.push({ token, original });
    return token;
  };

  let result = text;

  // Fenced code blocks (``` or ~~~)
  result = result.replace(/```[\s\S]*?```/g, protect);
  result = result.replace(/~~~[\s\S]*?~~~/g, protect);

  // Inline code
  result = result.replace(/`[^`]+`/g, protect);

  // URLs (http/https)
  result = result.replace(/https?:\/\/[^\s\)>]+/g, protect);

  // Template variables {{ }}
  result = result.replace(/\{\{[^}]+\}\}/g, protect);

  // HTML/JSX tags
  result = result.replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, protect);
  result = result.replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, protect);

  // Markdown image syntax
  result = result.replace(/!\[[^\]]*\]\([^)]+\)/g, protect);

  // Frontmatter-style slug values in body (e.g. `slug: some-slug`)
  result = result.replace(/^(slug:\s*)(.+)$/gm, (_, prefix, val) => prefix + protect(val));

  return { protected: result, placeholders };
}

function restoreContent(text: string, placeholders: Placeholder[]): string {
  let result = text;
  for (const { token, original } of placeholders) {
    result = result.replace(token, original);
  }
  return result;
}

// ─── FRONTMATTER SERIALIZATION ──────────────────────────────────────────────

function serializeFrontmatter(fm: Record<string, unknown>): string {
  const lines: string[] = ['---'];
  for (const [key, val] of Object.entries(fm)) {
    if (val === undefined || val === null) continue;
    if (Array.isArray(val)) {
      if (val.length === 0) {
        lines.push(`${key}:`);
      } else {
        lines.push(`${key}:`);
        for (const item of val) {
          lines.push(`  - ${item}`);
        }
      }
    } else if (typeof val === 'object') {
      // Nested object (e.g. translation block)
      lines.push(`${key}:`);
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        lines.push(`  ${k}: ${v}`);
      }
    } else if (typeof val === 'boolean') {
      lines.push(`${key}: ${val}`);
    } else {
      const strVal = String(val);
      // Quote if contains colon or special chars
      const needsQuote = strVal.includes(':') || strVal.includes('"') || strVal.includes("'");
      lines.push(`${key}: ${needsQuote ? `"${strVal.replace(/"/g, '\\"')}"` : strVal}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

// ─── HASH ────────────────────────────────────────────────────────────────────

function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

// ─── MAIN TRANSLATION LOGIC ─────────────────────────────────────────────────

async function translateFile(
  srcPath: string,
  destPath: string,
  targetLocale: string,
  force: boolean
): Promise<'translated' | 'skipped' | 'failed'> {
  const { frontmatter, body, raw } = parseMarkdownFile(srcPath);
  const sourceHash = hashContent(raw);

  // Check if already translated with same hash
  if (!force && fs.existsSync(destPath)) {
    const existing = parseMarkdownFile(destPath);
    const existingMeta = existing.frontmatter.translation as TranslationMeta | undefined;
    if (existingMeta?.source_hash === sourceHash) {
      return 'skipped';
    }
  }

  try {
    // Collect texts to translate
    const textsToTranslate: string[] = [];
    const fieldOrder: string[] = [];

    for (const field of CONFIG.translateFrontmatterFields) {
      if (frontmatter[field] && typeof frontmatter[field] === 'string') {
        textsToTranslate.push(frontmatter[field] as string);
        fieldOrder.push(field);
      }
    }

    // Protect body content
    const { protected: protectedBody, placeholders } = protectContent(body);
    textsToTranslate.push(protectedBody);

    // Batch translate
    const translated = await deeplTranslate(textsToTranslate, targetLocale);

    // Rebuild frontmatter
    const newFrontmatter: Record<string, unknown> = { ...frontmatter };

    for (let i = 0; i < fieldOrder.length; i++) {
      newFrontmatter[fieldOrder[i]] = translated[i];
    }

    // Restore body
    const translatedBody = restoreContent(translated[translated.length - 1], placeholders);

    // Add translation metadata
    const meta: TranslationMeta = {
      source_locale: CONFIG.sourceLocale,
      target_locale: targetLocale,
      source_file: srcPath,
      source_hash: sourceHash,
      provider: 'deepl',
      translated_at: new Date().toISOString(),
    };
    newFrontmatter.translation = meta;

    // Write output
    const output = `${serializeFrontmatter(newFrontmatter)}\n\n${translatedBody}\n`;
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, output, 'utf-8');

    return 'translated';
  } catch (err) {
    console.error(`  ❌ Failed: ${srcPath} → ${targetLocale}: ${err}`);
    return 'failed';
  }
}

// ─── ENTRY POINT ────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const singleFile = args.find(a => a.startsWith('--file='))?.replace('--file=', '')
    || (args.indexOf('--file') !== -1 ? args[args.indexOf('--file') + 1] : null);

  const stats: Stats = { translated: 0, skipped: 0, failed: 0, files: [] };

  const srcRoot = path.join(process.cwd(), CONFIG.contentRoot, CONFIG.sourceLocale);

  // Collect source files
  let sourceFiles: string[] = [];
  if (singleFile) {
    sourceFiles = [path.resolve(singleFile)];
  } else {
    const walk = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      return entries.flatMap(e =>
        e.isDirectory()
          ? walk(path.join(dir, e.name))
          : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []
      );
    };
    sourceFiles = walk(srcRoot);
  }

  console.log(`\n🌍  DeepL Translation Pipeline`);
  console.log(`   Source: ${CONFIG.sourceLocale} (${sourceFiles.length} files)`);
  console.log(`   Targets: ${CONFIG.targetLocales.join(', ')}`);
  console.log(`   Mode: ${force ? 'FORCE (retranslate all)' : 'incremental (hash-based skip)'}\n`);

  for (const locale of CONFIG.targetLocales) {
    console.log(`\n── ${locale.toUpperCase()} ──────────────────────────────────`);

    for (const srcFile of sourceFiles) {
      const relPath = path.relative(srcRoot, srcFile);
      const destFile = path.join(process.cwd(), CONFIG.contentRoot, locale, relPath);
      const label = `${locale}/${relPath}`;

      process.stdout.write(`  ${label} ... `);
      const result = await translateFile(srcFile, destFile, locale, force);

      stats[result]++;
      stats.files.push({ path: label, status: result });

      if (result === 'translated') console.log('✅ translated');
      else if (result === 'skipped') console.log('⏭  skipped (hash match)');
      else console.log('❌ failed');

      // Small delay to avoid rate limiting
      if (result === 'translated') await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`\n─────────────────────────────────────────────`);
  console.log(`✅ Translated: ${stats.translated}`);
  console.log(`⏭  Skipped:   ${stats.skipped}`);
  console.log(`❌ Failed:    ${stats.failed}`);
  console.log(`─────────────────────────────────────────────\n`);

  if (stats.failed > 0) {
    console.log('Failed files:');
    stats.files.filter(f => f.status === 'failed').forEach(f => console.log(`  - ${f.path}`));
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
