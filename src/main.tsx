import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </HashRouter>,
)
