type RecipeTextResponseType =
    | { title: string, ingredients: string, steps: string, errorMessage: undefined }
    | { title: undefined, ingredients: undefined, steps: undefined, errorMessage: string }

type RecipeImageResponseType =
    | { image: undefined, errorMessage: string }
    | { image: string, errorMessage: undefined }

export async function generateRecipeText({text}: {text: string}) {
    const recipe: RecipeTextResponseType = await fetch('http://localhost:3000/api/gemini/generate-recipe', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        let ingredients = '';
        let steps = '';

        if (Array.isArray(data.ingredients)) {
            for (const ingredient of data.ingredients) {
                ingredients += `· ${ingredient}\n`
            }
        }

        if (Array.isArray(data.steps)) {
            for (const step of data.steps) {
                steps += `· ${step}\n`
            }
        }

        return {
            title: data.title,
            ingredients: ingredients,
            steps: steps,
            errorMessage: data.errorMessage
        }
    })
    .catch(() => {
        return {
            title: undefined,
            ingredients: undefined,
            steps: undefined,
            errorMessage: "The generation of a recipe failed because of the connection to the server. Please, refresh or try it later."
        }
    })

    return recipe
}

export async function generateRecipeImage({title}: {title: string}) {
    const recipeImage: RecipeImageResponseType = await fetch('http://localhost:3000/api/openai/generate-recipe-image', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        return {
            image: data.image,
            errorMessage: data.errorMessage
        }
    })
    .catch(() => {
        return {
            image: undefined,
            errorMessage: "The generation of a recipe failed because of the connection to the server. Please, refresh or try it later."
        }
    })

    return recipeImage
}