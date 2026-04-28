import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Language, type Translations } from './translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function MathmindLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('mathmind-lang');
    if (stored === 'en' || stored === 'es') return stored;
    return navigator.language.startsWith('es') ? 'es' : 'en';
  });

  const setLang = (newLang: Language) => {
    localStorage.setItem('mathmind-lang', newLang);
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useMathmindLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useMathmindLanguage must be used inside MathmindLanguageProvider');
  return ctx;
}
