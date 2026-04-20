import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pre } from '@/app/components/docs/mdx/pre'

// jsdom doesn't implement clipboard API – provide a minimal stub
Object.assign(navigator, {
  clipboard: {
    writeText: () => Promise.resolve(),
  },
})

describe('Pre', () => {
  it('renders code content inside a <pre> element', () => {
    render(<Pre><code>const x = 1</code></Pre>)
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
    expect(document.querySelector('pre')).toBeInTheDocument()
  })

  it('renders a copy button with aria-label "Copy code"', () => {
    render(<Pre><code>hello</code></Pre>)
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument()
  })

  it('copy button is present in the DOM (visibility handled by CSS)', () => {
    render(<Pre><code>sample</code></Pre>)
    const btn = screen.getByRole('button', { name: /copy code/i })
    expect(btn).toBeInTheDocument()
  })

  it('clicking copy button does not throw', async () => {
    const user = userEvent.setup()
    render(<Pre><code>copy this</code></Pre>)
    const btn = screen.getByRole('button', { name: /copy code/i })
    await expect(user.click(btn)).resolves.not.toThrow()
  })
})
