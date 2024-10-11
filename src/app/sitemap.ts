import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://aissistant.adriapulido.dev/',
            lastModified: new Date(),
            alternates: {
                languages: {
                    es: 'https://aissistant.adriapulido.dev/es',
                    ca: 'https://aissistant.adriapulido.dev/ca',
                    en: 'https://aissistant.adriapulido.dev/en',
                    fr: 'https://aissistant.adriapulido.dev/fr',
                    de: 'https://aissistant.adriapulido.dev/de',
                    it: 'https://aissistant.adriapulido.dev/it',
                },
            },
        },
        {
            url: 'https://aissistant.adriapulido.dev/translate',
            lastModified: new Date(),
            alternates: {
                languages: {
                    es: 'https://aissistant.adriapulido.dev/es/translate',
                    ca: 'https://aissistant.adriapulido.dev/ca/translate',
                    en: 'https://aissistant.adriapulido.dev/en/translate',
                    fr: 'https://aissistant.adriapulido.dev/fr/translate',
                    de: 'https://aissistant.adriapulido.dev/de/translate',
                    it: 'https://aissistant.adriapulido.dev/it/translate',
                },
            },
        },
        {
            url: 'https://aissistant.adriapulido.dev/recipes',
            lastModified: new Date(),
            alternates: {
                languages: {
                    es: 'https://aissistant.adriapulido.dev/es/recipes',
                    ca: 'https://aissistant.adriapulido.dev/ca/recipes',
                    en: 'https://aissistant.adriapulido.dev/en/recipes',
                    fr: 'https://aissistant.adriapulido.dev/fr/recipes',
                    de: 'https://aissistant.adriapulido.dev/de/recipes',
                    it: 'https://aissistant.adriapulido.dev/it/recipes',
                },
            },
        },
        {
            url: 'https://aissistant.adriapulido.dev/trivia',
            lastModified: new Date(),
            alternates: {
                languages: {
                    es: 'https://aissistant.adriapulido.dev/es/trivia',
                    ca: 'https://aissistant.adriapulido.dev/ca/trivia',
                    en: 'https://aissistant.adriapulido.dev/en/trivia',
                    fr: 'https://aissistant.adriapulido.dev/fr/trivia',
                    de: 'https://aissistant.adriapulido.dev/de/trivia',
                    it: 'https://aissistant.adriapulido.dev/it/trivia',
                },
            },
        },
        {
            url: 'https://aissistant.adriapulido.dev/training',
            lastModified: new Date(),
            alternates: {
                languages: {
                    es: 'https://aissistant.adriapulido.dev/es/training',
                    ca: 'https://aissistant.adriapulido.dev/ca/training',
                    en: 'https://aissistant.adriapulido.dev/en/training',
                    fr: 'https://aissistant.adriapulido.dev/fr/training',
                    de: 'https://aissistant.adriapulido.dev/de/training',
                    it: 'https://aissistant.adriapulido.dev/it/training',
                },
            },
        },
    ]
}