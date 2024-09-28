'use client'

import TextBox from "@/components/TextBox/TextBox";
import { LanguageType, TextBoxType, ToastClass } from "@/utils/types";
import styles from "@/components/Containers/TrainingContainer/TrainingContainer.module.css"
import { useTraining } from "@/hooks/useTraining";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { generateSession } from "@/services/training";
import { Locale } from "@/i18n/i18n.config";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";

interface Props {
    lang : Locale
}

export default function TrainingContainer ({ lang } : Props) {
    const { langData } = useGlobalSettings()
    const { training } = langData.pages
    const {
        fromText,
        title,
        formattedGuide,
        guide,
        isLoading,
        setFromText,
        setIsLoading,
        setGuide
    } = useTraining()
    const { openToast } = useToast()
    
    const createTraining = async () => {
        if (fromText === '') {
            openToast("emptyTrainingGeneration", ToastClass.WARNING)
            setIsLoading(false)
            return
        }
    
        const session = await generateSession({ 
            text: fromText,
            language: lang 
        })
        .then(result => {
            if (result.errorMessage !== undefined) {
                openToast(result.errorMessage, ToastClass.ERROR)
            } else {
                return {
                    title: result.title,
                    guide: result.guide
                }
            }
        })
    
        if (session === undefined) {
            setIsLoading(false)
            return;
        }
    
        setGuide({
            title: session.title,
            guide: session.guide,
            translations: training
        })

        setIsLoading(false)
    }

    useEffect(() => {
        if (isLoading) {
            createTraining()
        }
    }, [isLoading])

    return (
        <div className={`blue-shadow ${styles.quizzes_container}`}>
            <TextBox
                type={TextBoxType.WRITE}
                value={fromText}
                placeholder={training.writePlaceholder}
                language={lang as LanguageType}
                setText={setFromText}
                submitButton={{
                    fun: () => setIsLoading(true),
                    label: training.submitButton
                }}
            />
            
            {
                title === '' && !isLoading
                ?
                    <p className={`${styles.empty_quiz} text-center text-base xs:text-xl content-center min-h-[100px]`}>{training.trainingPlaceholder}</p>
                :
                    <>
                    {
                        !isLoading
                        ?
                            <>
                                <p className={`${styles.title} px-4 pt-4 text-2xl font-semibold`}>{title}</p>
                                <TextBox
                                    type={TextBoxType.READ}
                                    value={formattedGuide ?? ''}
                                    placeholder=""
                                    language={lang as LanguageType}
                                    classNameProps={{
                                        general: "max-h-[400px] xs:max-h-[600px]",
                                    }}  
                                />
                                {
                                    guide !== undefined
                                    ?
                                        null
                                    :
                                        null
                                }
                            </>
                        :
                            <LoadingComponent
                                classNameProps={{
                                    general: "min-h-[100px] max-h-[400px] xs:max-h-[600px]",
                                    page: "quizzes",
                                    area: "title"
                                }}  
                            />
                    }
                    </>
            }
        </div>
    )
}