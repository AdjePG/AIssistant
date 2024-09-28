import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server"
import z from 'zod'

const bodySchema = z.object({
    text: z.string(),
    language: z.enum(['es', 'ca', 'en', 'fr', 'de', 'it']),
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
                    description: "A simple and concise title for the training session (maximum 15 words).",
                    type: SchemaType.STRING,
                },
                guide: {
                    type: SchemaType.ARRAY,
                    description: "List with 10 to 20 exercises",
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            exercise: {
                                description: "Name of the exercise (e.g., 'push-ups').",
                                type: SchemaType.STRING,
                            },
                            description: {
                                description: "A short description of how to perform the exercise.",
                                type: SchemaType.STRING,
                            },
                            reps: {
                                description: "Number of repetitions (optional, use either 'reps' or 'time').",
                                type: SchemaType.NUMBER,
                                nullable: true,
                            },
                            time: {
                                description: "Duration of the exercise in seconds (optional, use either 'time' or 'reps').",
                                type: SchemaType.NUMBER,
                                nullable: true,
                            },
                        },
                        required: ["exercise", "description"],
                    },
                },
                errorMessage: {
                    description: "An error message if the session cannot be generated. Only include if an error occurs.",
                    type: SchemaType.STRING,
                    nullable: true,
                },
            },
            required: ["title", "guide"],
        },
    };

    try {
        const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = ai.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig,
            safetySettings,
            systemInstruction: `
            You are an AI that generates personalized training sessions based on user inputs. By default, create a session with 10 to 20 exercises suited for non-experts unless otherwise specified. The output must be in JSON format with the following structure:\n- A simple, descriptive title (up to 15 words).\n- An array of exercises with:\n\t1. Exercise name (e.g., "push-ups").\n\t2. Description of the movement in simple terms.\n\t3. Either the number of repetitions or time duration in seconds (not both).\n\n- If the session cannot be generated, return the following error message: {"errorMessage": "The server couldn't generate the training session. Please revise the input or try again later."}\n- The response should be localized to the language enclosed within {{ }}.\n\nProvide a well-structured, beginner-friendly routine, and ensure to handle error cases gracefully.
            `
        });
        const result = await model.generateContent(`Generate a training session about: \`${data.text}\` {{${data.language}}}`);

        return NextResponse.json(JSON.parse(result.response.text()))
    } catch (error) {
        return NextResponse.json({
            errorMessage: "The server couldn't generate the training session. Rewrite the prompt or try it later"
        })
    }
}
