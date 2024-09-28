import { NextResponse } from "next/server"
import OpenAI from "openai"
import { z } from "zod"

const bodySchema = z.object({
    title: z.string(),
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

    try {
        const openai = new OpenAI({ apiKey: process.env.API_KEY })
        const image = await openai.images.generate({
            model: 'dall-e-2',
            prompt: data.title,
            n: 1,
            size: '512x512'
        })

        return NextResponse.json({
            image: image.data[0]?.url
		})
    } catch (error) {
        return NextResponse.json({
            errorMessage: "The server couldn't generate the image"
		})
    }
}
