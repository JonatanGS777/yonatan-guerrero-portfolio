import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from '@/i18n/translations';
import type { Language, Translations } from '@/i18n/translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('preferred-lang');
    return stored === 'en' || stored === 'es' ? stored : 'es';
  });

  const setLang = (newLang: Language) => {
    localStorage.setItem('preferred-lang', newLang);
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
