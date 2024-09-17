import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { z } from "zod"

const bodySchema = z.object({
    explanation: z.string()
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
                question: {
                    description: "Question generated based on the prompt",
                    type: SchemaType.STRING,
                },
                answers: {
                    description: "List of 3 answers, which 1 is correct and the others are incorrect",
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.STRING
                    }
                },
                correctAnswer: {
                    description: "Index of correct answer starting with 0",
                    type: SchemaType.INTEGER,
                }
            },
        }
    }

    try {
        const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = ai.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig,
            systemInstruction: `You are an AI that generates a quiz based on the user's text. Create a question from the text, provide 3 possible answers (one correct and two incorrect), and indicate the correct answer. Format the response as JSON with question, answers (a list of three answers), and correctAnswer (the index of the correct answer in the answers list). If you cannot generate the quiz, respond with {errorMessage: "The server couldn't generate the quiz. Rewrite the prompt or try it later"}.`
        });
        const result = await model.generateContent(data.explanation);

        return NextResponse.json({
            quiz: JSON.parse(result.response.text())
        })
        
    } catch (error) {
        return NextResponse.json({
            errorMessage: "The server couldn't generate the quiz. Rewrite the prompt or try it later"
        })
    }
}
