import { useReducer } from 'react'

enum Actions {
    SetFromText = "SET_FROM_TEXT",
    SetRecipe = "SET_RECIPE",
    SetImage = "SET_IMAGE",
    SetIsLoading = "SET_IS_LOADING"
}

type InitialStateType = {
    fromText: string,
    title: string,
    ingredients: string,
    steps: string,
    image: string,
    isLoading: boolean
}

type ActionType =
    | { type: Actions.SetFromText, payload: string }
    | { type: Actions.SetRecipe, payload: string }
    | { type: Actions.SetImage, payload: string }
    | { type: Actions.SetIsLoading, payload: boolean }

const initialState: InitialStateType = {
    fromText: '',
    title: '',
    ingredients: '',
    steps: '',
    image: '',
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
    } else if (action.type === Actions.SetRecipe) {
        const { title, ingredients, steps } = JSON.parse(action.payload)

        return {
            ...state,
            title,
            ingredients,
            steps
        }
    } else if (action.type === Actions.SetImage) {
        const image = action.payload

        return {
            ...state,
            image
        }
    }

    return state
}

export function useRecipes() {
    const [{ fromText, title, ingredients, steps, image, isLoading }, dispatch] = useReducer(reducer, initialState)

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

    const setRecipe = (payload: string) => {
        dispatch({ 
            type: Actions.SetRecipe, 
            payload 
        })
    }

    const setImage = (payload: string) => {
        dispatch({ 
            type: Actions.SetImage, 
            payload 
        })
    }

    return {
        fromText,
        title,
        ingredients,
        steps,
        image,
        isLoading,
        setFromText,
        setIsLoading,
        setRecipe,
        setImage
    }
}