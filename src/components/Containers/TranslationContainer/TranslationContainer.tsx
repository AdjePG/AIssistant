'use client'

import TextBox from "@/components/TextBox/TextBox";
import { AutoLanguageType, LanguageType, Option, TextBoxType, ToastClass } from "@/utils/types";
import styles from "@/components/Containers/TranslationContainer/TranslationContainer.module.css"
import ExchangeArrowsHIcon from "@/icons/ExchangeArrowsHIcon";
import RoundedButton from "@/components/RoundedButton/RoundedButton";
import { useTranslator } from "@/hooks/useTranslator";
import { useEffect } from "react";
import { translate } from "@/services/translate";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/useToast";
import ExchangeArrowsVIcon from "@/icons/ExchangeArrowsVIcon";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import ComboBox from "@/components/ComboBox/ComboBox";
import { useTranslationLanguages } from "@/hooks/useTranslationLanguages";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";

export default function TranslationContainer() {
    const { langData } = useGlobalSettings()
    const { translator } = langData.pages
    const {
        fromLanguages,
        toLanguages 
    } = useTranslationLanguages(translator);
    const {
        fromLanguage,
        toLanguage,
        fromText,
        toText,
        isLoading,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setToText,
        reverseLanguages
	} = useTranslator(translator)
	const { openToast } = useToast()
	const debouncedText = useDebounce(fromText)

    useEffect(() => {
        if (debouncedText === '') return
    
        translate({ 
			fromLanguage: fromLanguage.value, 
			toLanguage: toLanguage.value, 
			text: debouncedText 
        })
        .then(result => {
			if (result.errorMessage !== undefined) {
				openToast(result.errorMessage, ToastClass.ERROR)
			} else {
				setToText(result.translatedText)
			}
        })
    }, [debouncedText, fromLanguage, toLanguage])

    return (
        <>
        <div className={`blue-shadow ${styles.translation_container}`}>
            <ComboBox
                currentValue={fromLanguage}
                options={fromLanguages}
                selectFunction={(option : Option) => {setFromLanguage(option)}}
                classNameProps={{
                    general: "rounded-lg",
                    area: "translationFrom",
                    selectedOption: "h-10 p-4 rounded-lg w-full",
                    options: "top-12 left-0 w-full grid-cols-2"
                }}
            />

            <ComboBox
                currentValue={toLanguage}
                options={toLanguages}
                selectFunction={(option : Option) => {setToLanguage(option)}}
                classNameProps={{
                    general: "rounded-lg",
                    area: "translationTo",
                    selectedOption: "h-10 p-4 rounded-lg w-full",
                    options: "top-12 left-0 w-full grid-cols-2"
                }}
            />

            <RoundedButton 
                clickFunction={reverseLanguages}    
                classNameProps={{
                    general: `mx-auto`,
                    area: "reverse"
                }}
            >
            	<ExchangeArrowsHIcon className="hidden xs:block w-6 h-6" />
                <ExchangeArrowsVIcon className="xs:hidden block w-6 h-6" />
            </RoundedButton>
        
            <TextBox
				type={TextBoxType.WRITE}
				value={fromText}
				placeholder={translator.writePlaceholder}
				language={fromLanguage.value as LanguageType | AutoLanguageType}
				setText={setFromText}
                classNameProps={{
                    general: "max-h-[400px]"
                }}
            />

            {
                isLoading
                ?
                    <LoadingComponent
                        classNameProps={{
                            area: "read"
                        }}  
                    />
                :
                    <TextBox
                        type={TextBoxType.READ}
                        value={toText}
                        language={toLanguage.value as LanguageType}
                        classNameProps={{
                            general: "max-h-[400px]"
                        }}
                    />
            }
        </div>
        </>
    )
}