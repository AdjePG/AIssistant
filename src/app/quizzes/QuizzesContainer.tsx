'use client'

import TextBox from "@/components/TextBox/TextBox";
import { AutoLanguage, TextBoxType, ToastClass } from "@/utils/types";
import styles from "@/app/quizzes/page.module.css"
import { useQuizzes } from "@/hooks/useQuizzes";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Quiz from "@/components/Quiz/Quiz";
import { generateCuriosity, generateQuiz } from "@/services/quizzes";

export default function QuizzesContainer () {
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
    } = useQuizzes()
    const { openToast } = useToast()
    
    const createQuiz = async () => {
        if (fromText === '') {
            openToast("To generate a quiz, you have to add something in the textbox", ToastClass.WARNING)
            setIsLoading(false)
            return
        }
    
        const curiosity = await generateCuriosity({ text: fromText })
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

        const quiz = await generateQuiz({ explanation: curiosity.explanation })
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

        console.log("aaa")

        setIsLoading(false)
    }

    useEffect(() => {
        if (isLoading) {
            createQuiz()
        }
    }, [isLoading])

    return (
        <div className={`${styles.quizzes_container}`}>
            <TextBox
                type={TextBoxType.WRITE}
                value={fromText}
                placeholder="Add a topic to create a quiz."
                language={AutoLanguage}
                setText={setFromText}
                submitButton={{
                    fun: () => setIsLoading(true),
                    label: "Generate quiz"
                }}
            />
            
            {
                title === '' && !isLoading
                ?
                    <p className={`${styles.empty_quiz} text-center text-xl content-center min-h-[100px]`}>Create a quiz in a few seconds!</p>
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
                                language={AutoLanguage}
                                classNameProps={{
                                    general: "max-h-[400px] xs:max-h-[600px]",
                                }}  
                            />
                            {
                                quiz !== undefined
                                ?
                                    <Quiz
                                        quiz={quiz}
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