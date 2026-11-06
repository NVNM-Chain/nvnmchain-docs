import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  {
    files: ['app/components/docs/search-dialog.tsx', 'app/components/docs/theme-toggle.tsx'],
    rules: {
      // Keep existing hydration and search effects visible during the Next.js 16 migration.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  globalIgnores([
    '.next/**',
    '.open-next/**',
    '.source/**',
    '.wrangler/**',
    'next-env.d.ts',
  ]),
])
