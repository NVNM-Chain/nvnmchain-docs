import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Steps, Step } from '@/app/components/docs/mdx/steps'

describe('Steps', () => {
  it('renders child Step components', () => {
    render(
      <Steps>
        <Step title="First Step">Do the first thing</Step>
        <Step title="Second Step">Do the second thing</Step>
      </Steps>
    )
    expect(screen.getByText('First Step')).toBeInTheDocument()
    expect(screen.getByText('Second Step')).toBeInTheDocument()
    expect(screen.getByText('Do the first thing')).toBeInTheDocument()
    expect(screen.getByText('Do the second thing')).toBeInTheDocument()
  })
})

describe('Step', () => {
  it('renders the title when provided', () => {
    render(<Step title="My Step">Step body</Step>)
    expect(screen.getByText('My Step')).toBeInTheDocument()
    expect(screen.getByText('Step body')).toBeInTheDocument()
  })

  it('renders children without a title', () => {
    render(<Step>Just content</Step>)
    expect(screen.getByText('Just content')).toBeInTheDocument()
  })
})
