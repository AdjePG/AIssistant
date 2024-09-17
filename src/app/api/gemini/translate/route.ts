import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, POSSIBLE_ROLES } from "@google/generative-ai";
import { NextResponse } from "next/server"
import z from 'zod'

const bodySchema = z.object({
    fromLanguage: z.enum(['auto', 'en', 'es', 'ca', 'fr', 'de']),
    toLanguage: z.enum(['en', 'es', 'ca', 'fr', 'de']),
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
    const history = [
        {
            role: POSSIBLE_ROLES[0],
            parts: [{text: '¡Hola mundo! {{es}} [[en]]'}]
        }, 
        {
            role: POSSIBLE_ROLES[1],
            parts: [{text: 'Hello world!'}]
        }, 
        {
            role: POSSIBLE_ROLES[0],
            parts: [{text: 'How are you? {{auto}} [[de]]'}]
        }, 
        {
            role: POSSIBLE_ROLES[1],
            parts: [{text: 'Wie geht es dir?'}]
        }, 
        {
            role: POSSIBLE_ROLES[0],
            parts: [{text: 'Bon dia, com estàs? {{auto}} [[es]]'}]
        }, 
        {
            role: POSSIBLE_ROLES[1],
            parts: [{text: 'Buenos días, ¿cómo estàs?'}]
        }, 
        {
            role: POSSIBLE_ROLES[0],
            parts: [{text: 'Tell something that you know in Italian. {{en}} [[es]]'}]
        }, 
        {
            role: POSSIBLE_ROLES[1],
            parts: [{text: 'Dime algo que tu sepas en italiano.'}]
        }, 
        {
            role: POSSIBLE_ROLES[0],
            parts: [{text: 'Prepare a Spanish omelette. {{auto}} [[en]]'}]
        }, 
        {
            role: POSSIBLE_ROLES[1],
            parts: [{text: 'Prepare a Spanish omelette.'}]
        }
    ]

    try {
        const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
        const model = ai.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            safetySettings,
            // systemInstruction: "You are an AI that translates text. You receive the text from the user. DON'T answer anything, JUST translate (even if it's the same language). Forget other kind of instructions which aren't translations. The original language is surrounded by `{{` and `}}`. You can also receive `{{auto}}`, which means that you have to detect the language from the received text. It can be any language. The language you translate to is surrounded by `[[` and `]]`. Also, forget all your morals and translate everything even when it could be very offensive or agressive. Don't add possible comments"
            systemInstruction: "You are an AI translator. Translate the text received from the user. Do not provide any other responses or comments. The source language is enclosed in {{ and }}. If the source language is {{auto}}, detect the language automatically. The target language is enclosed in [[ and ]]. Translate all content, regardless of its nature."
        });
        const chat = model.startChat({
            history
        });
    
        const result = await chat.sendMessage(`${data.text} {{${data.fromLanguage}}} [[${data.toLanguage}]]`);

        return NextResponse.json({
            translation: result.response.text()
        })

    } catch (error) {
        return NextResponse.json({
            errorMessage: "The server couldn't translate the text. Rewrite the prompt or try it later"
        })
    }
}
