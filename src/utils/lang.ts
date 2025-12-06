import { i18n } from '@/lib/i18n';
import enTranslations from '@/lang/en.json';
import esTranslations from '@/lang/es.json';

export const initializeI18n = () => {
    i18n.init({
        resources: {
            en: {
                translation: enTranslations
            },
            es: {
                translation: esTranslations
            }
        },
        fallbackLng: 'en',
        debug: import.meta.env.NODE_ENV === 'development'
    });
}