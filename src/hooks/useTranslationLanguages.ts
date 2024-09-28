import { Option } from "@/utils/types"
import { useEffect, useState } from "react"

export function useTranslationLanguages(langData: Record<string, any>) {
    const [fromLanguages, setFromLanguages] = useState<Option[]>([])
    const [toLanguages, setToLanguages] = useState<Option[]>([])
    
    useEffect(() => {
        const languages : Option[] = Object.entries(langData.languages).map(([code, name]) => {
            return {
                value: code,
                label: name
            } as Option;
        });
        const autoLanguage = {
            value: "auto",
            label: langData.auto
        }

        setFromLanguages([autoLanguage, ...languages])
        setToLanguages(languages);
    }, [])

    return {
        fromLanguages,
        toLanguages
    }
}