import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function readDoc(relativePath: string): string {
  return readFileSync(resolve(__dirname, '../../content/docs', relativePath), 'utf-8')
}

describe('docs inconsistency remediation', () => {
  it('keeps wallet setup and connect guides aligned on mantraUSD as the currency symbol', () => {
    const docs = [
      'getting-started/how-to-setup-your-metamask-wallet.mdx',
      'getting-started/how-to-setup-your-rabby-wallet.mdx',
      'getting-started/how-to-connect-wallets-to-mainnet.mdx',
      'getting-started/how-to-connect-wallets-to-testnet.mdx',
    ]

    for (const doc of docs) {
      expect(readDoc(doc)).toContain('| Currency Symbol | `mantraUSD` |')
    }
  })

  it('documents the active NVNM precompile set and excludes removed L1-only entries', () => {
    const doc = readDoc('resources/using-precompiles.mdx')

    expect(doc).toContain('ICS20 (IBC Transfer)')
    expect(doc).toContain('0x0000000000000000000000000000000000000802')
    expect(doc).toContain('0x0000000000000000000000000000000000000804')
    expect(doc).toContain('0x0000000000000000000000000000000000000805')
    expect(doc).toContain('0x0000000000000000000000000000000000000806')
    expect(doc).toContain('0x0000000000000000000000000000000000000A00')
    expect(doc).toContain('Staking (`0x800`) and distribution (`0x801`) precompiles are not available on NVNM Chain')
    expect(doc).not.toContain('address constant STAKING_PRECOMPILE')
    expect(doc).not.toContain('address constant DISTRIBUTION_PRECOMPILE')
  })

  it('uses the canonical NVNM node minimum gas price snippet', () => {
    const doc = readDoc('operators/node-setup-and-deployment/validator-nodes/running-a-node.mdx')

    expect(doc).toContain('40000000000wmantraUSD')
    expect(doc).not.toContain('minimum-gas-prices = "0.01uom"')
  })
})
