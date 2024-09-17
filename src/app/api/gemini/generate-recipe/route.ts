import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { z } from "zod"

const bodySchema = z.object({
    text: z.string()
})

const validateBodySchema = (requestBody : any) => {
    return bodySchema.safeParse(requestBody)
}

export async function POST(request: Request) {
	const body = await request.json()

	const result = validateBodySchema({
		...body
	})

	if (result.error) {
		return NextResponse.json({
			errorMessage: result.error.message
		})
	}

    const data = result.data

    const generationConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
                title: {
                    description: "Name of the recipe",
                    type: SchemaType.STRING,
                },
                ingredients: {
                    description: "Ingredients to make the recipe",
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.STRING
                    }
                },
                steps: {
                    description: "Steps to make the recipe",
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.STRING
                    }
                }
            },
        }
    }

    try {
        const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = ai.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig,
            // systemInstruction: "You are an AI that generates a cooking recipe with the ingredients and instructions. You receive a text from the user. This text contains ingredients, a type of dish or a specific dish. DON'T answer anything, just generate a recipe. The structure of the message must be a JSON with these properties: 'title', which is going to be a simple title of a recipe (a random one); 'ingredients', which is the list of ingredients; and 'steps' which are the steps. ANY other type of answer that you cannot add in this JSON, you MUST ALWAYS answer with this JSON only `{errorMessage: The server couldn't generate the recipe. Rewrite the prompt or try it later}`. Don't add possible comments."
            systemInstruction: `You are an AI that generates a cooking recipe based on the given ingredients and dish type. Provide the response as JSON with title (a random and simple recipe title), ingredients (the list of ingredients), and steps (the instructions). If the input cannot be processed, respond with {errorMessage: "The server couldn't generate the recipe. Rewrite the prompt or try it later"}.`
        });
        const result = await model.generateContent(data.text);

        return NextResponse.json(JSON.parse(result.response.text()))
        
    } catch (error) {
        return NextResponse.json({
            errorMessage: "The server couldn't generate the recipe. Rewrite the prompt or try it later"
        })
    }
}
