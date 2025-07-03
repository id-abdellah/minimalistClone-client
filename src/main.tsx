import "./styles/index.css"
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import "./utils/lang/index.ts"
import GlobalContextProvider from "./contexts/GlobalContextProvider.tsx"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./utils/queryClient.ts"

import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
  <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <App />
        </GlobalContextProvider>
      </QueryClientProvider>
    </AuthProvider>
  </>,
)
