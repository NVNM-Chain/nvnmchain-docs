import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  siteConfig,
  themeConfig,
  getCSSVariables,
  getSiteUrl,
} from '@/lib/theme-config'

describe('siteConfig', () => {
  it('has a non-empty site name', () => {
    expect(siteConfig.name).toBeTruthy()
  })

  it('has valid logo paths for light and dark mode', () => {
    expect(siteConfig.logo.light).toMatch(/\.(avif|png|svg|webp)$/)
    expect(siteConfig.logo.dark).toMatch(/\.(avif|png|svg|webp)$/)
  })

  it('has a valid site URL', () => {
    expect(() => new URL(siteConfig.url)).not.toThrow()
  })

  it('has a non-dismissible banner with non-empty content', () => {
    expect(siteConfig.banner.dismissible).toBe(false)
    expect(siteConfig.banner.content).toBeTruthy()
  })

  it('has at least one footer link', () => {
    expect(siteConfig.footer.links.length).toBeGreaterThan(0)
  })

  it('has a primary navbar button with a label and valid href', () => {
    expect(siteConfig.navbar.primaryButton.label).toBeTruthy()
    expect(() => new URL(siteConfig.navbar.primaryButton.href)).not.toThrow()
  })

  it('has valid social links', () => {
    expect(() => new URL(siteConfig.links.github)).not.toThrow()
  })
})

describe('themeConfig', () => {
  it('has hex accent colours for light and dark modes', () => {
    expect(themeConfig.colors.light.accent).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(themeConfig.colors.dark.accent).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  it('has code-block background values for both modes', () => {
    expect(themeConfig.codeBlock.light.background).toBeTruthy()
    expect(themeConfig.codeBlock.dark.background).toBeTruthy()
  })
})

describe('getCSSVariables', () => {
  it('returns --accent, --accent-foreground, --accent-muted for light mode', () => {
    const vars = getCSSVariables('light')
    expect(vars['--accent']).toBe(themeConfig.colors.light.accent)
    expect(vars['--accent-foreground']).toBe(themeConfig.colors.light.accentForeground)
    expect(vars['--accent-muted']).toBe(themeConfig.colors.light.accentMuted)
  })

  it('returns correct dark-mode CSS variables', () => {
    const vars = getCSSVariables('dark')
    expect(vars['--accent']).toBe(themeConfig.colors.dark.accent)
  })
})

describe('getSiteUrl', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL
    delete process.env.VERCEL_URL
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('falls back to siteConfig.url when no env vars are set', () => {
    expect(getSiteUrl()).toBe(siteConfig.url)
  })

  it('prefers NEXT_PUBLIC_SITE_URL', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://custom.example.com')
    expect(getSiteUrl()).toBe('https://custom.example.com')
  })

  it('uses VERCEL_PROJECT_PRODUCTION_URL when NEXT_PUBLIC_SITE_URL is absent', () => {
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'my-app.vercel.app')
    expect(getSiteUrl()).toBe('https://my-app.vercel.app')
  })

  it('uses VERCEL_URL as last resort before default', () => {
    vi.stubEnv('VERCEL_URL', 'my-preview.vercel.app')
    expect(getSiteUrl()).toBe('https://my-preview.vercel.app')
  })
})
