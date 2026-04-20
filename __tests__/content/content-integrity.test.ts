/**
 * Content integrity tests.
 *
 * These tests guard against accidental deletions or renames that would
 * break navigation. Non-developers modifying content should see these
 * fail fast if they remove or misplace an MDX file.
 */
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

const CONTENT_ROOT = resolve(__dirname, '../../content/docs')
const META_PATH = resolve(CONTENT_ROOT, 'meta.json')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mdxPath(slug: string): string {
  return resolve(CONTENT_ROOT, `${slug}.mdx`)
}

interface MetaJson {
  title: string
  pages: string[]
}

function loadMeta(): MetaJson {
  return JSON.parse(readFileSync(META_PATH, 'utf-8')) as MetaJson
}

/**
 * Extract the YAML frontmatter block from an MDX file and return it as a
 * plain-text string (without the --- delimiters).
 */
function parseFrontmatter(filePath: string): Record<string, string> {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const raw = match[1]
  const result: Record<string, string> = {}
  for (const line of raw.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) result[key] = value
  }
  return result
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('meta.json', () => {
  it('exists', () => {
    expect(existsSync(META_PATH)).toBe(true)
  })

  it('has a non-empty title', () => {
    const meta = loadMeta()
    expect(typeof meta.title).toBe('string')
    expect(meta.title.length).toBeGreaterThan(0)
  })

  it('has a non-empty pages array', () => {
    const meta = loadMeta()
    expect(Array.isArray(meta.pages)).toBe(true)
    expect(meta.pages.length).toBeGreaterThan(0)
  })
})

describe('Content files referenced in meta.json', () => {
  const meta = loadMeta()
  // Separator entries start with "---" – skip those
  const pageEntries = meta.pages.filter((p: string) => !p.startsWith('---'))

  it.each(pageEntries)('"%s.mdx" exists on disk', (slug) => {
    expect(existsSync(mdxPath(slug))).toBe(true)
  })
})

describe('MDX frontmatter', () => {
  const meta = loadMeta()
  const pageEntries = meta.pages.filter((p: string) => !p.startsWith('---'))

  it.each(pageEntries)('"%s" has a non-empty title in frontmatter', (slug) => {
    const filePath = mdxPath(slug)
    if (!existsSync(filePath)) return // covered by content-files tests
    const fm = parseFrontmatter(filePath)
    expect(fm.title, `"${slug}" is missing a frontmatter title`).toBeTruthy()
  })
})
