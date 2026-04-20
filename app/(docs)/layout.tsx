import { source } from '@/lib/docs-source'
import { DocsSidebar } from '../components/docs/docs-sidebar'
import { DocsHeader } from '../components/docs/docs-header'
import { SiteBanner } from '../components/docs/site-banner'
import { siteConfig } from '@/lib/theme-config'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tree = source.pageTree

  return (
    <div className="min-h-screen flex flex-col">
      {siteConfig.banner && (
        <SiteBanner content={siteConfig.banner.content} dismissible={siteConfig.banner.dismissible} />
      )}
      <DocsHeader tree={tree} />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <DocsSidebar tree={tree} />
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.footer.companyName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {siteConfig.footer.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
