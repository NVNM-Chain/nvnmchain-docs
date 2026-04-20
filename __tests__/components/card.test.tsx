import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardGroup } from '@/app/components/docs/mdx/card'

describe('Card', () => {
  it('renders the title', () => {
    render(<Card title="My Card" />)
    expect(screen.getByText('My Card')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(<Card title="Card">Description text</Card>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders an anchor tag for external href', () => {
    render(<Card title="External" href="https://example.com" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders an anchor without target=_blank for internal href', () => {
    render(<Card title="Internal" href="/docs/intro" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/docs/intro')
    expect(link).not.toHaveAttribute('target', '_blank')
  })

  it('renders without a link when no href is given', () => {
    render(<Card title="No Link" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders a known icon when the icon prop matches', () => {
    const { container } = render(<Card title="With Icon" icon="rocket" />)
    // Icon is an SVG inside the card
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders no icon element when an unknown icon name is given', () => {
    const { container } = render(<Card title="Unknown Icon" icon="nonexistent-icon-xyz" />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})

describe('CardGroup', () => {
  it('renders children', () => {
    render(
      <CardGroup>
        <Card title="A" />
        <Card title="B" />
      </CardGroup>
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('defaults to 2 columns (sm:grid-cols-2 class)', () => {
    const { container } = render(
      <CardGroup>
        <Card title="A" />
      </CardGroup>
    )
    const grid = container.firstChild as HTMLElement
    expect(grid.className).toContain('sm:grid-cols-2')
  })

  it('applies correct class for cols=3', () => {
    const { container } = render(<CardGroup cols={3}><Card title="A" /></CardGroup>)
    const grid = container.firstChild as HTMLElement
    expect(grid.className).toContain('lg:grid-cols-3')
  })
})
