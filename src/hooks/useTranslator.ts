import { AutoLanguage, Option } from '@/utils/types'
import { useReducer } from 'react'

enum Actions {
    Reverse = "REVERSE_LANG",
    SetFromLang = "SET_FROM_LANG",
    SetToLang = "SET_TO_LANG",
    SetFromText = "SET_FROM_TEXT",
    SetToText = "SET_TO_TEXT"
}

type InitialStateType = {
    fromLanguage: Option,
    toLanguage: Option,
    fromText: string,
    toText: string,
    isLoading: boolean
}

type ActionType =
    | { type: Actions.SetFromLang, payload: Option }
    | { type: Actions.SetToLang, payload: Option }
    | { type: Actions.SetFromText, payload: string }
    | { type: Actions.SetToText, payload: string }
    | { type: Actions.Reverse }

const reducer = (state: InitialStateType, action: ActionType) => {
    if (action.type === Actions.SetFromLang) {
        if (state.fromLanguage === action.payload) return state

        const isLoading = state.fromText !== ''
        const fromLanguage = action.payload

        return {
            ...state,
            fromLanguage,
            toText: '',
            isLoading
        }
    } else if (action.type === Actions.SetToLang) {
        if (state.toLanguage === action.payload) return state

        const isLoading = state.fromText !== ''
        const toLanguage = action.payload

        return {
            ...state,
            toLanguage,
            toText: '',
            isLoading
        }
    } else if (action.type === Actions.SetFromText) {
        const fromText = action.payload
        const isLoading = fromText !== ''

        return {
            ...state,
            isLoading,
            fromText,
            toText: ''
        }
    } else if (action.type === Actions.SetToText) {
        const toText = action.payload

        return {
            ...state,
            isLoading: false,
            toText
        }
    } else if (action.type === Actions.Reverse) {
        if (state.fromLanguage.value === AutoLanguage) return state

        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
        }
    }

    return state
}

export function useTranslator(langData: Record<string, any>) {
    const initialState : InitialStateType = {
        fromLanguage: {
            value: "auto",
            label: langData.auto
        },
        toLanguage: {
            value: "en",
            label: langData.languages.en
        },
        fromText: '',
        toText: '',
        isLoading: false
    }

    const [{ fromLanguage, toLanguage, fromText, toText, isLoading }, dispatch] = useReducer(reducer, initialState)

    const setFromLanguage = (payload: Option) => {
        dispatch({ 
            type: Actions.SetFromLang, 
            payload 
        })
    }

    const setToLanguage = (payload: Option) => {
        dispatch({ 
            type: Actions.SetToLang, 
            payload 
        })
    }

    const setFromText = (payload: string) => {
        dispatch({ 
            type: Actions.SetFromText, 
            payload 
        })
    }

    const setToText = (payload: string) => {
        dispatch({ 
            type: Actions.SetToText, 
            payload 
        })
    }

    const reverseLanguages = () => {
        dispatch({ 
            type: Actions.Reverse 
        })
    }

    return {
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
    }
}
