import path from 'node:path'

import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    ignores: ['**/node_modules', '**/dist'],
  },
  ...compat.extends('@rocketseat/eslint-config/node'),
  {
    rules: {
      'no-useless-constructor': 'off',
    },
  },
]
