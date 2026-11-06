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
    expect(screen.getByRole('tab', { name: 'Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Beta' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Gamma' })).toBeInTheDocument()
  })

  it('shows the first tab content by default', () => {
    renderTabs()
    expect(screen.getByText('Content A')).toBeVisible()
    expect(screen.getByText('Content B')).not.toBeVisible()
  })

  it('switches content when another tab is clicked', async () => {
    const user = userEvent.setup()
    renderTabs()

    await user.click(screen.getByRole('tab', { name: 'Beta' }))
    expect(screen.getByText('Content B')).toBeVisible()
    expect(screen.getByText('Content A')).not.toBeVisible()
  })

  it('respects the defaultValue prop', () => {
    render(
      <Tabs defaultValue="Beta">
        <Tab title="Alpha">Content A</Tab>
        <Tab title="Beta">Content B</Tab>
      </Tabs>
    )
    expect(screen.getByText('Content B')).toBeVisible()
    expect(screen.getByText('Content A')).not.toBeVisible()
  })
})

describe('Tab', () => {
  it('provides its content to the parent Tabs', () => {
    render(<Tabs><Tab title="T">Inner text</Tab></Tabs>)
    expect(screen.getByRole('tabpanel', { name: 'T' })).toHaveTextContent('Inner text')
  })
})
