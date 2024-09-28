export const i18n = {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en', 'fr', 'de', 'it']
}
  
export type Locale = (typeof i18n)['locales'][number]