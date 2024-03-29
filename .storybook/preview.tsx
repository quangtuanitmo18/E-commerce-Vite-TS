import '../src/styles/index.scss'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from '../src/components/errorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/app.context'
import { withRouter } from 'storybook-addon-react-router-v6'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false
    }
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // no more errors on the console
    error: () => null
  }
})

export const decorators = [
  withRouter,
  (Story) => (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ErrorBoundary>
            <Story></Story>
          </ErrorBoundary>
        </AppProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
]
