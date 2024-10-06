'use client'
import TextBox from "@/components/TextBox/TextBox";
import { LanguageType, TextBoxType, ToastClass } from "@/utils/types";
import styles from "@/components/Containers/TriviaContainer/TriviaContainer.module.css"
import { useTrivia } from "@/hooks/useTrivia";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Quiz from "@/components/Quiz/Quiz";
import { generateCuriosity, generateQuiz } from "@/services/trivia";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";
import { Locale } from "@/i18n/i18n.config";

interface Props {
    lang : Locale
}

export default function TriviaContainer ({ lang } : Props) {
    const { langData } = useGlobalSettings()
    const { trivia } = langData.pages
    const {
        fromText,
        title,
        explanation,
        quiz,
        isLoading,
        setFromText,
        setIsLoading,
        setCuriosity,
        setQuiz
    } = useTrivia()
    const { openToast } = useToast()
    
    const createQuiz = async () => {
        if (fromText === '') {
            openToast("emptyTriviaGeneration", ToastClass.WARNING)
            setIsLoading(false)
            return
        }
    
        const curiosity = await generateCuriosity({ 
            text: fromText,
            language: lang 
        })
        .then(result => {
            if (result.errorMessage !== undefined) {
                openToast(result.errorMessage, ToastClass.ERROR)
            } else {
                return {
                    title: result.title,
                    explanation: result.explanation
                }
            }
        })
    
        if (curiosity === undefined) {
            setIsLoading(false)
            return;
        }

        const quiz = await generateQuiz({ 
            explanation: curiosity.explanation,
            language: lang 
        })
        .then(result => {
            if (result.errorMessage !== undefined) {
                openToast(result.errorMessage, ToastClass.ERROR)
            } else {
                return result.quiz
            }
        })
    
        if (quiz === undefined) {
            setIsLoading(false)
            return;
        }
    
        setCuriosity(JSON.stringify({
            title: curiosity.title,
            explanation: curiosity.explanation,
        }))

        setQuiz({
            question: quiz.question,
            answers: quiz.answers,
            correctAnswer: quiz.correctAnswer,
        })

        setIsLoading(false)
    }

    useEffect(() => {
        if (isLoading) {
            createQuiz()
        }
    }, [isLoading])

    return (
        <div className={`blue-shadow ${styles.quizzes_container}`}>
            <TextBox
                type={TextBoxType.WRITE}
                value={fromText}
                placeholder={trivia.writePlaceholder}
                language={lang as LanguageType}
                setText={setFromText}
                submitButton={{
                    fun: () => setIsLoading(true),
                    label: trivia.submitButton
                }}
            />
            
            {
                title === '' && !isLoading
                ?
                    <p className={`${styles.empty_quiz} text-center text-base xs:text-xl content-center min-h-[100px]`}>{trivia.triviaPlaceholder}</p>
                :
                    <>
                    {
                        !isLoading
                        ?
                            <>
                                <p className={`${styles.title} px-4 pt-4 text-2xl font-semibold`}>{title}</p>
                                <TextBox
                                    type={TextBoxType.READ}
                                    value={explanation ?? ''}
                                    placeholder=""
                                    language={lang as LanguageType}
                                    classNameProps={{
                                        general: "max-h-[400px] xs:max-h-[600px]",
                                    }}  
                                />
                                {
                                    quiz !== undefined
                                    ?
                                        <Quiz
                                            quiz={quiz}
                                            submit={trivia.chooseAnswerButton}
                                        />
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