import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('returns an empty string when no arguments are given', () => {
    expect(cn()).toBe('')
  })

  it('combines class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('ignores falsy values', () => {
    expect(cn('foo', false, null, undefined, '')).toBe('foo')
  })

  it('merges conflicting Tailwind classes, keeping the last one', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('supports conditional class objects', () => {
    expect(cn({ 'bg-red-500': true, 'text-white': false })).toBe('bg-red-500')
  })

  it('supports array inputs', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })
})
