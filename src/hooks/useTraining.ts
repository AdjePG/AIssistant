import { ExerciseGuideDetails } from '@/utils/types'
import { useReducer } from 'react'

enum Actions {
    SetFromText = "SET_FROM_TEXT",
    SetGuide = "SET_GUIDE",
    SetIsLoading = "SET_IS_LOADING"
}

type InitialStateType = {
    fromText: string,
    title: string,
    formattedGuide: string,
    guide: ExerciseGuideDetails[] | undefined
    isLoading: boolean
}

type ActionType =
    | { type: Actions.SetFromText, payload: string }
    | { type: Actions.SetGuide, payload: { title: string, guide: ExerciseGuideDetails[], translations: Record<string, any> }}
    | { type: Actions.SetIsLoading, payload: boolean }

const initialState: InitialStateType = {
    fromText: '',
    title: '',
    formattedGuide: '',
    guide: undefined,
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
    } else if (action.type === Actions.SetGuide) {
        const { title, guide, translations } = action.payload
        const { time, reps } = translations

        if (guide === undefined || title === undefined) {
            return state
        }

        const formattedGuide = guide.map((round, index) => {
            let formattedExercise = (index + 1).toString()
            formattedExercise += '. '
            formattedExercise += round.exercise
            formattedExercise += ' - '

            if (round.reps) {
                formattedExercise += `${round.reps} ${reps} \n`
            } else {
                formattedExercise += `${round.time} ${time} \n`
            }

            formattedExercise += round.description

            return formattedExercise
        }).join('\n\n')

        return {
            ...state,
            title,
            formattedGuide,
            guide
        }
    }

    return state
}

export function useTraining() {
    const [{ fromText, title, formattedGuide, guide, isLoading }, dispatch] = useReducer(reducer, initialState)

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

    const setGuide = (payload: {
        title: string
        guide: ExerciseGuideDetails[]
        translations: Record<string, any>
    }) => {
        dispatch({ 
            type: Actions.SetGuide, 
            payload 
        })
    }

    return {
        fromText,
        title,
        formattedGuide,
        guide,
        isLoading,
        setFromText,
        setIsLoading,
        setGuide
    }
}