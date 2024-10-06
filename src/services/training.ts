import { Locale } from "@/i18n/i18n.config";
import { ExerciseGuideDetails } from "@/utils/types";

type ResponseType =
    | { title: string, guide: ExerciseGuideDetails[], errorMessage: undefined }
    | { title: undefined, guide: undefined, errorMessage: string }

export async function generateSession({
    text,
    language
}: {
    text: string
    language: Locale
}) {
    const session: ResponseType = await fetch(`${window.location.origin}/api/gemini/generate-training`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,
                language
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        return {
            title: data.title,
            guide: data.guide as ExerciseGuideDetails[],
            errorMessage: data.errorMessage
        }
    })
    .catch(() => {
        return {
            title: undefined,
            guide: undefined,
            errorMessage: "The generation of a training session failed because of the connection to the server. Please, refresh or try it later."
        }
    })

    return session
}
