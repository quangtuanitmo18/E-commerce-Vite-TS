# Shopee Clone Typescript Project

This project is a Shopee Clone built with TypeScript. It covers a wide range of features and configurations from authentication to product listing, as well as setting up development tools like ESLint, Prettier, TailwindCSS, and more using Vite and React.

---

## Features

- **Authentication Module:** Managed using JWT

  - Sign Up
  - Login
  - Logout

- **Product Listing Page:**

  - Pagination
  - Sorting by various product attributes
  - Advanced filtering based on product attributes
  - Product search

- **Product Detail Page:**

  - Display detailed information
  - Image slider with hover zoom effect
  - Rich text description displayed as WYSIWYG HTML
  - Purchase functionality

- **Shopping Cart:**

  - Order management: Add, edit, and remove products
  - Checkout

- **Customer Profile Management:**
  - Update personal information
  - Upload avatar
  - Change password
  - View order status

---

## Technologies Used

- **UI / CSS Library:** TailwindCSS + HeadlessUI
- **State Management:** React Query for asynchronous state and React Context for standard state
- **Form Management:** React Hook Form
- **Routing:** React Router
- **Build Tool:** Vite
- **API:** REST API provided by our backend server
- **Multi-language Support:** via react.i18next
- **SEO Support:** via React Helmet
- **Component Modeling:** using Storybook
- **Unit Testing**
- And many more as we continue to build out the project...

---

## Setting Up Packages for the Vite React TS Project

### Installing Dependencies

We will install a number of packages since we're setting up from scratch. Unlike Create React App, which comes with some ESLint configuration by default, we need to add everything manually.

### Setting Up ESLint and Prettier

The following dependencies are needed:

- **ESLint:** The main linter (error checker)
- **Prettier:** The primary code formatter
- **@typescript-eslint/eslint-plugin:** ESLint plugin providing rules for TypeScript
- **@typescript-eslint/parser:** Parser that allows ESLint to check TypeScript code for errors
- **eslint-config-prettier:** ESLint configuration to disable rules that conflict with Prettier
- **eslint-plugin-import:** Helps ESLint understand the `import...` syntax in the source code
- **eslint-plugin-jsx-a11y:** Checks for accessibility issues (ensuring the website is friendly for assistive technologies, like screen readers)
- **eslint-plugin-react:** ESLint rules for React
- **eslint-plugin-prettier:** Adds additional Prettier rules for ESLint
- **prettier-plugin-tailwindcss:** Automatically sorts TailwindCSS classes
- **eslint-plugin-react-hooks:** ESLint rules for React hooks

Run the following command:

```bash
yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
```

Configuring ESLint
Create a file named .eslintrc.cjs at the root of the project:

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  extends: [
    // Chúng ta sẽ dùng các rule mặc định từ các plugin mà chúng ta đã cài.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // Disable các rule mà eslint xung đột với prettier.
    // Để cái này ở dưới để nó override các rule phía trên!.
    'eslint-config-prettier',
    'prettier'
  ],
  plugins: ['prettier'],
  settings: {
    react: {
      // Nói eslint-plugin-react tự động biết version của React.
      version: 'detect'
    },
    // Nói ESLint cách xử lý các import
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
    // Tắt rule yêu cầu import React trong file jsx
    'react/react-in-jsx-scope': 'off',
    // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
    'react/jsx-no-target-blank': 'warn',
    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
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
```

Create a file named .eslintignore:

```json
node_modules/
dist/
```

Create a file named .prettierrc:

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

Create a file named .prettierignore:

```json
node_modules/
dist/
```

Add the following scripts to your package.json:

```json
"scripts": {
  // ...other scripts,
  "lint": "eslint --ext ts,tsx src/",
  "lint:fix": "eslint --fix --ext ts,tsx src/",
  "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
  "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
}

```

### Setting Up EditorConfig

Create a file named .editorconfig in the root directory:

```json
[*]
indent_size = 2
indent_style = space
```

Configuring tsconfig.json
In your tsconfig.json, set "target": "ES2015" and "baseUrl": "." within the compilerOptions section.

Installing TailwindCSS
Install the following packages [refer to the TailwindCSS Vite guide](https://tailwindcss.com/):

```json
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure the TailwindCSS config file (tailwind.config.js):

```json
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

Add the following to your `src/index.css` file:

```json
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Configuring Vite

````json
yarn add -D @types/node

Create a file named vite.config.ts:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
````

Installing Extensions and Setting Up VS Code

1. Recommended Extensions:

- ESLint
- Prettier - Code Formatter
- TailwindCSS
- EditorConfig for VS Code
- VS Code Configuration:

2. Enable Format On Save

- Set the default formatter to Prettier

### Code Notes

1. Remove Special Characters Function

The following code removes special characters from a string:

```ts
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
```

2. Fixing TailwindCSS Extension Class Suggestions

If the TailwindCSS extension in VS Code is not suggesting classes, add the following to your `settings.json` in VS Code:

```json
{
  "tailwindCSS.experimental.classRegex": ["[a-zA-Z]*class[a-zA-Z]*='([^']+)'"]
}
```
