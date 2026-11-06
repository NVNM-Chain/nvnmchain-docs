import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DocsLayout from '@/app/(docs)/layout'

vi.mock('@/lib/docs-source', () => ({
  source: { pageTree: { children: [] } },
}))

vi.mock('@/app/components/docs/docs-header', () => ({
  DocsHeader: () => <header>Documentation header</header>,
}))

vi.mock('@/app/components/docs/docs-sidebar', () => ({
  DocsSidebar: () => <nav>Documentation sidebar</nav>,
}))

describe('DocsLayout', () => {
  it('renders the docs shell without the retired testnet announcement', () => {
    const { container } = render(
      <DocsLayout><h1>Welcome to NVNM Chain</h1></DocsLayout>,
    )

    expect(screen.queryByText(/NVNM Testnet is now LIVE!/)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Dismiss banner' })).not.toBeInTheDocument()
    expect(container.firstElementChild?.firstElementChild).toBe(screen.getByRole('banner'))
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Welcome to NVNM Chain')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
