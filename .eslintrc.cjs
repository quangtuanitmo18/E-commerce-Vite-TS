/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier',
    'plugin:storybook/recommended'
  ],
  plugins: ['prettier'],
  settings: {
    react: {
      // Tell eslint-plugin-react to automatically detect React version
      version: 'detect'
    },
    // Configure how ESLint handles imports
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    // Turn off the rule that requires importing React in jsx files
    'react/react-in-jsx-scope': 'off',
    // Warn when <a target='_blank'> doesn't have rel="noreferrer"
    'react/jsx-no-target-blank': 'warn',
    // Enhance some prettier rules (copied from .prettierrc)
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
