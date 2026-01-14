import { useState } from 'react';

export function useLanguage(initialLanguage = 'en') {
  const [language, setLanguage] = useState(initialLanguage);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const setLanguageValue = (lang) => {
    if (lang === 'en' || lang === 'zh') {
      setLanguage(lang);
    }
  };

  return {
    language,
    toggleLanguage,
    setLanguage: setLanguageValue,
    availableLanguages: ['en', 'zh']
  };
}
