import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
})
export const ReactQueryProvider = ({ children }: any) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
