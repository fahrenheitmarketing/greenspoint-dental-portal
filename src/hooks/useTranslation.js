import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  };
  
  return t;
}