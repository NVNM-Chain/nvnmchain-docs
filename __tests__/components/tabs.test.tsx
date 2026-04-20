import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, Tab } from '@/app/components/docs/mdx/tabs'

describe('Tabs', () => {
  function renderTabs() {
    return render(
      <Tabs>
        <Tab title="Alpha">Content A</Tab>
        <Tab title="Beta">Content B</Tab>
        <Tab title="Gamma">Content C</Tab>
      </Tabs>
    )
  }

  it('renders all tab titles', () => {
    renderTabs()
    expect(screen.getByRole('button', { name: 'Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Beta' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Gamma' })).toBeInTheDocument()
  })

  it('shows the first tab content by default', () => {
    renderTabs()
    expect(screen.getByText('Content A')).toBeInTheDocument()
    expect(screen.queryByText('Content B')).not.toBeInTheDocument()
  })

  it('switches content when another tab is clicked', async () => {
    const user = userEvent.setup()
    renderTabs()

    await user.click(screen.getByRole('button', { name: 'Beta' }))
    expect(screen.getByText('Content B')).toBeInTheDocument()
    expect(screen.queryByText('Content A')).not.toBeInTheDocument()
  })

  it('respects the defaultValue prop', () => {
    render(
      <Tabs defaultValue="Beta">
        <Tab title="Alpha" value="Alpha">Content A</Tab>
        <Tab title="Beta" value="Beta">Content B</Tab>
      </Tabs>
    )
    expect(screen.getByText('Content B')).toBeInTheDocument()
    expect(screen.queryByText('Content A')).not.toBeInTheDocument()
  })
})

describe('Tab', () => {
  it('renders its children passthrough', () => {
    render(<Tab title="T">Inner text</Tab>)
    expect(screen.getByText('Inner text')).toBeInTheDocument()
  })
})
