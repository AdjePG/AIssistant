import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server"
import z from 'zod'

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
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ]
    const generationConfig = {
        responseMimeType: "application/json",
        responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
                title: {
                    description: "A simple title of the curiosity, no more than 10 words",
                    type: SchemaType.STRING,
                },
                curiosity: {
                    description: "Explanation of the curiosity itself of at least 300-400 words length with its paragraphs",
                    type: SchemaType.STRING
                },
                errorMessage: {
                    description: "Error message in case of error. By default leave it empty or undefined when there's no error",
                    type: SchemaType.STRING
                }
            },
        }
    }

    try {
        const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = ai.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig,
            safetySettings,
            systemInstruction: `You are an AI that generates a curiosity based on the user's topic. Provide a well-explained piece of information that is 300-400 words long and easy to understand for non-experts. The response should be in JSON format with title as a simple title (up to 15 words), curiosity as the detailed explanation divided into paragraphs, and errorMessage if the curiosity cannot be generated. If you cannot generate the curiosity, respond with {errorMessage: "The server couldn't generate the curiosity. Rewrite the prompt or try it later"}.`
        });
        const result = await model.generateContent(data.text);

        console.log(result.response.text())
        return NextResponse.json(JSON.parse(result.response.text()))
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            errorMessage: "The server couldn't generate the quiz. Rewrite the prompt or try it later"
        })
    }
}
