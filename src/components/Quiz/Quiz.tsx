import styles from '@/components/Quiz/Quiz.module.css'
import { useId, useRef, useState } from 'react'
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
}

export default function Quiz ({quiz} : Props) {
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

    const setBackground = (index: number) => {
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
        }

        return ""
    }

    return (
        <form className={`${styles.quiz} flex flex-col p-4`} onSubmit={handleSubmit}>
            <p>{quiz.question}</p>
            <ul className='flex flex-col py-2 gap-1 flex-1'>
            {
                quiz.answers.map((answer, index) => {
                    const uniqueId = `${answerIdPrefix}-${index}`
                    
                    return (
                        <li key={uniqueId} className={`${setBackground(index)} transition-colors duration-300 ease-in-out cursor-pointer rounded-lg select-none`}>
                            <label htmlFor={uniqueId} className='inline-block w-full p-2 cursor-pointer'>
                                <input type="radio" name="answer" id={uniqueId} value={index} disabled={Answer.NONE !== isCorrectAnswer} onChange={(e) => handleChange(e)} className='hidden'/>
                                {answer}
                            </label>
                        </li>
                    )
                })
            }
            </ul>
            <div className={`${(Answer.NONE !== isCorrectAnswer || selectedAnswer === -1) && 'hidden'} flex justify-end`}>
                <RoundedButton
                    label="Submit"
                    isSumbit
                />
            </div>
        </form>
    )
}
