import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeI18n } from './utils/lang.ts'
import { i18n } from '@/lib/i18n'

initializeI18n();

// Read language from URL parameter and set it before rendering
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
if (langParam && (langParam === 'en' || langParam === 'es')) {
  i18n.setLanguage(langParam);
} else {
  // Explicitly set to "en" if no lang param or invalid value
  i18n.setLanguage('en');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

