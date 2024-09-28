import { Locale } from "@/i18n/i18n.config"
import { Option } from "@/utils/types"
import { useRef } from "react"

export function useLocales(languages: Record<string, any>, language? : Locale) {
    const getLocales = (languages: Record<string, any>, language? : Locale) => {
        if (language) {
            return {
                value: language,
                label: languages[language],
                img: `/assets/flags/${language}_flag.png`
            }
        }
      
        return [
            {
                value: 'es',
                label: languages.es,
                img: '/assets/flags/es_flag.png'
            },
            {
                value: 'ca',
                label: languages.ca,
                img: '/assets/flags/ca_flag.png'
            },
            {
                value: 'en',
                label: languages.en,
                img: '/assets/flags/en_flag.png'
            },
            {
                value: 'fr',
                label: languages.fr,
                img: '/assets/flags/fr_flag.png'
            },
            {
                value: 'de',
                label: languages.de,
                img: '/assets/flags/de_flag.png'
            },
            {
                value: 'it',
                label: languages.it,
                img: '/assets/flags/it_flag.png'
            }
        ]
    }

    const initialValue = useRef(getLocales(languages, language) as Option)
    const options = useRef(getLocales(languages) as Option[])

    return {
        initialValue: initialValue.current,
        options: options.current
    }
}
