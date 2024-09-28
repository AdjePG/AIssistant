import { useReducer } from 'react'

enum Actions {
    SetFromText = "SET_FROM_TEXT",
    SetQuizText = "SET_QUIZ_TEXT",
    SetQuiz = "SET_QUIZ",
    SetIsLoading = "SET_IS_LOADING"
}

type InitialStateType = {
    fromText: string,
    title: string,
    explanation: string,
    quiz: {
        question: string,
        answers: string[]
        correctAnswer: number
    } | undefined
    isLoading: boolean
}

type ActionType =
    | { type: Actions.SetFromText, payload: string }
    | { type: Actions.SetQuizText, payload: string }
    | { type: Actions.SetQuiz, payload: {
        question: string,
        answers: string[],
        correctAnswer: number
    } }
    | { type: Actions.SetIsLoading, payload: boolean }

const initialState: InitialStateType = {
    fromText: '',
    title: '',
    explanation: '',
    quiz: undefined,
    isLoading: false
}

const reducer = (state: InitialStateType, action: ActionType) => {
    if (action.type === Actions.SetFromText) {
        const fromText = action.payload

        return {
            ...state,
            fromText,
        }
    } else if (action.type === Actions.SetIsLoading) {
        const isLoading = action.payload
        
        return {
            ...state,
            isLoading
        }
    } else if (action.type === Actions.SetQuizText) {
        const { title, explanation} = JSON.parse(action.payload)

        return {
            ...state,
            title,
            explanation
        }
    } else if (action.type === Actions.SetQuiz) {
        const quiz = action.payload

        return {
            ...state,
            quiz
        }
    }

    return state
}

export function useTrivia() {
    const [{ fromText, title, explanation, quiz, isLoading }, dispatch] = useReducer(reducer, initialState)

    const setFromText = (payload: string) => {
        dispatch({ 
            type: Actions.SetFromText, 
            payload 
        })
    }

    const setIsLoading = (payload: boolean) => {
        dispatch({ 
            type: Actions.SetIsLoading, 
            payload 
        })
    }

    const setCuriosity = (payload: string) => {
        dispatch({ 
            type: Actions.SetQuizText, 
            payload 
        })
    }

    const setQuiz = (payload: {
        question: string,
        answers: string[],
        correctAnswer: number
    }) => {
        dispatch({ 
            type: Actions.SetQuiz, 
            payload 
        })
    }

    return {
        fromText,
        title,
        explanation,
        quiz,
        isLoading,
        setFromText,
        setIsLoading,
        setCuriosity,
        setQuiz
    }
}