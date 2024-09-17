import { Languages, AutoLanguageType, LanguageType, TranslationLangSide, AutoLanguage } from "@/utils/types"
import styles from "@/components/LanguageSelector/LanguageSelector.module.css"

type Props =
    | { side: TranslationLangSide.FROM, value: LanguageType | AutoLanguageType, setLanguage: (language: LanguageType | AutoLanguageType) => void }
    | { side: TranslationLangSide.TO, value: LanguageType, setLanguage: (language: LanguageType) => void }

export default function LanguageSelector({ side, value, setLanguage }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as LanguageType)
    }

    return (
        <select className={`${styles.language_selector} ${styles[side]}`} value={value} onChange={handleChange}>
            {side === TranslationLangSide.FROM && <option value={AutoLanguage}>Detect Language</option>}

            {Object.entries(Languages).map(([code, language]) => (
                <option key={code} value={code}>
                    {language}
                </option>
            ))}
        </select>
    )
}