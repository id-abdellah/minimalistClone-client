import "./styles/index.css"
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router"
import { AuthProvider } from './auth/AuthProvider.tsx'
import "./utils/lang/index.ts"
import GlobalContextProvider from "./contexts/GlobalContextProvider.tsx"

createRoot(document.getElementById('root')!).render(
  <>
    <AuthProvider>
      <GlobalContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalContextProvider>
    </AuthProvider>
  </>,
)
