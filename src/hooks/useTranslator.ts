import { AutoLanguage, AutoLanguageType, LanguageType } from '@/utils/types'
import { useReducer } from 'react'

enum Actions {
    Reverse = "REVERSE_LANG",
    SetFromLang = "SET_FROM_LANG",
    SetToLang = "SET_TO_LANG",
    SetFromText = "SET_FROM_TEXT",
    SetToText = "SET_TO_TEXT"
}

type InitialStateType = {
    fromLanguage: LanguageType | AutoLanguageType
    toLanguage: LanguageType,
    fromText: string,
    toText: string,
    isLoading: boolean
}

type ActionType =
    | { type: Actions.SetFromLang, payload: LanguageType | AutoLanguageType }
    | { type: Actions.SetToLang, payload: LanguageType }
    | { type: Actions.SetFromText, payload: string }
    | { type: Actions.SetToText, payload: string }
    | { type: Actions.Reverse }
  
const initialState: InitialStateType = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    toText: '',
    isLoading: false
}

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
        if (state.fromLanguage === AutoLanguage) return state

        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
        }
    }

    return state
}

export function useTranslator() {
    const [{ fromLanguage, toLanguage, fromText, toText, isLoading }, dispatch] = useReducer(reducer, initialState)

    const setFromLanguage = (payload: LanguageType | AutoLanguageType) => {
        dispatch({ 
            type: Actions.SetFromLang, 
            payload 
        })
    }

    const setToLanguage = (payload: LanguageType) => {
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
