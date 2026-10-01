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

describe('Pre with a title', () => {
  it('renders the title as a header above the code', () => {
    render(<Pre title="apps/web/src/lib/tip20.ts"><code>const x = 1</code></Pre>)
    const header = screen.getByText('apps/web/src/lib/tip20.ts')
    expect(header).toBeVisible()
    expect(header.compareDocumentPosition(document.querySelector('pre')!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })

  it('does not pass the title through as a <pre> tooltip', () => {
    render(<Pre title="file.ts"><code>sample</code></Pre>)
    expect(document.querySelector('pre')).not.toHaveAttribute('title')
  })

  it('reserves room on the right of the header for the copy button', () => {
    render(<Pre title="a long code block title"><code>sample</code></Pre>)
    expect(screen.getByText('a long code block title')).toHaveClass('pr-24')
  })

  it('renders no header without a title', () => {
    const { container } = render(<Pre><code>sample</code></Pre>)
    expect(container.querySelector('pre')?.previousElementSibling).toBeNull()
  })
})
