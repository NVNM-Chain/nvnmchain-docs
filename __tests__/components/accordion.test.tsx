import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionGroup } from '@/app/components/docs/mdx/accordion'

describe('Accordion', () => {
  it('shows title and hides content by default', () => {
    render(<Accordion title="FAQ Item">Hidden content</Accordion>)
    expect(screen.getByText('FAQ Item')).toBeInTheDocument()
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('shows content when defaultOpen is true', () => {
    render(<Accordion title="Open Item" defaultOpen>Visible content</Accordion>)
    expect(screen.getByText('Visible content')).toBeInTheDocument()
  })

  it('toggles content on click', async () => {
    const user = userEvent.setup()
    render(<Accordion title="Toggle Me">Toggle content</Accordion>)

    expect(screen.queryByText('Toggle content')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /toggle me/i }))
    expect(screen.getByText('Toggle content')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /toggle me/i }))
    expect(screen.queryByText('Toggle content')).not.toBeInTheDocument()
  })
})

describe('AccordionGroup', () => {
  it('renders multiple accordions', () => {
    render(
      <AccordionGroup>
        <Accordion title="First">Content 1</Accordion>
        <Accordion title="Second">Content 2</Accordion>
      </AccordionGroup>
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })
})
