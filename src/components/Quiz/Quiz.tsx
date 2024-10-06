import styles from '@/components/Quiz/Quiz.module.css'
import { useId, useState } from 'react'
import RoundedButton from '../RoundedButton/RoundedButton'

enum Answer {
    NONE = "none",
    CORRECT = "correct",
    INCORRECT = "incorrect"
}

interface Props {
    quiz: {
        question: string,
        answers: string[]
        correctAnswer: number
    }
    submit: string
}

export default function Quiz ({quiz, submit} : Props) {
    const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<Answer>(Answer.NONE);

    const answerIdPrefix = useId()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const answer = e.target.value

        if (answer !== undefined) {
            setSelectedAnswer(Number.parseInt(answer as string))
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (selectedAnswer === -1 ) return;

        if (selectedAnswer === quiz.correctAnswer) {
            setIsCorrectAnswer(Answer.CORRECT)
        } else {
            setIsCorrectAnswer(Answer.INCORRECT)
        }
    }

    const setBackground = (correctAnswer: number, index: number) => {
        if (isCorrectAnswer === Answer.NONE) {
            if (selectedAnswer !== index) {
                return "hover:bg-hover"
            } else {
                return "bg-[#227dd170]"
            }
        } else if (isCorrectAnswer === Answer.CORRECT) {
            if (selectedAnswer === index) {
                return "bg-[#009e2f70]"
            }
        } else if (isCorrectAnswer === Answer.INCORRECT) {
            if (selectedAnswer === index) {
                return "bg-[#a32c2c70]"
            }

            if (index === correctAnswer) {
                return "bg-[#009e2f70]"
            }
        }

        return ""
    }

    return (
        <form className={`${styles.quiz} flex flex-col select-none max-h-[600px] gap-2`} onSubmit={handleSubmit}>
            <div className='py-4 pl-4 flex-1 custom-scrollbar'>
                <p className='mb-2'>{quiz.question}</p>
                <ul className='flex flex-col gap-1'>
                {
                    quiz.answers.map((answer, index) => {
                        const uniqueId = `${answerIdPrefix}-${index}`
                        
                        return (
                            <li key={uniqueId} className={`${setBackground(quiz.correctAnswer, index)} transition-[background-color] duration-300 ease-in-out cursor-pointer rounded-lg`}>
                                <label htmlFor={uniqueId} className='inline-block w-full p-2 cursor-pointer'>
                                    <input type="radio" name="answer" id={uniqueId} value={index} disabled={Answer.NONE !== isCorrectAnswer} onChange={(e) => handleChange(e)} className='hidden'/>
                                    {answer}
                                </label>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
            <div className={`${(Answer.NONE !== isCorrectAnswer || selectedAnswer === -1) && 'hidden'} flex justify-end p-2`}>
                <RoundedButton
                    label={submit}
                    isSubmit
                />
            </div>
        </form>
    )
}
