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

        const formattedGuide = guide.map((round, index) => {
            let formattedGuide = (index + 1).toString()
            formattedGuide += '. '
            formattedGuide += round.exercise
            formattedGuide += ' - '

            if (round.reps) {
                formattedGuide += `${round.reps} ${reps} \n`
            } else {
                formattedGuide += `${round.time} ${time} \n`
            }

            formattedGuide += round.description

            return formattedGuide
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