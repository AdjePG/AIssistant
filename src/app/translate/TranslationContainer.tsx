'use client'

import TextBox from "@/components/TextBox/TextBox";
import { TextBoxType, ToastClass, TranslationLangSide } from "@/utils/types";
import styles from "@/app/translate/page.module.css"
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector";
import ExchangeArrowsHIcon from "@/icons/ExchangeArrowsHIcon";
import RoundedButton from "@/components/RoundedButton/RoundedButton";
import { useTranslator } from "@/hooks/useTranslator";
import { useEffect } from "react";
import { translate } from "@/services/translate";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/useToast";
import ExchangeArrowsVIcon from "@/icons/ExchangeArrowsVIcon";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function TranslationContainer() {
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
	} = useTranslator()
	const { openToast } = useToast()
	const debouncedText = useDebounce(fromText)
    
    useEffect(() => {
        if (debouncedText === '') return
    
        translate({ 
			fromLanguage, 
			toLanguage, 
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

    return(
        <>
        <div className={`${styles.translation_container}`}>
            <LanguageSelector
				side={TranslationLangSide.FROM}
				value={fromLanguage}
				setLanguage={setFromLanguage}
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
            
            <LanguageSelector
				side={TranslationLangSide.TO}
				value={toLanguage}
				setLanguage={setToLanguage}
            />
        
            <TextBox
				type={TextBoxType.WRITE}
				value={fromText}
				placeholder="Write or drop a plain text file to translate."
				language={fromLanguage}
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
                        language={toLanguage}
                        classNameProps={{
                            general: "max-h-[400px]"
                        }}
                    />
            }
        </div>
        </>
    )
}