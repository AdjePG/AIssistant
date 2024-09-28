import { Locale } from "@/i18n/i18n.config";

type CuriosityResponseType =
    | { title: string, explanation: string, errorMessage: undefined }
    | { title: undefined, explanation: undefined, errorMessage: string }

type QuizResponseType =
    | { quiz: {
        question: string;
        answers: string[];
        correctAnswer: number;
    }, errorMessage: undefined }
    | { quiz: undefined, errorMessage: string }

export async function generateCuriosity({
    text,
    language
}: {
    text: string
    language: Locale
}) {
    const curiosity: CuriosityResponseType = await fetch(`${window.location.origin}/api/gemini/generate-quiz/curiosity`, 
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
            explanation: data.curiosity,
            errorMessage: data.errorMessage
        }
    })
    .catch(() => {
        return {
            title: undefined,
            explanation: undefined,
            errorMessage: "The generation of a quiz failed because of the connection to the server. Please, refresh or try it later."
        }
    })

    return curiosity
}

export async function generateQuiz({
    explanation,
    language
}: {
    explanation: string,
    language: Locale
}) {
    const recipeResult: QuizResponseType = await fetch(`${window.location.origin}/api/gemini/generate-quiz/quiz`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                explanation,
                language
            })
        }
    )
    .then(res => res.json())
    .then(data => {
        return {
            quiz: data.quiz,
            errorMessage: data.errorMessage
        }
    })
    .catch(() => {
        return {
            quiz: undefined,
            errorMessage: "The generation of a quiz failed because of the connection to the server. Please, refresh or try it later."
        }
    })

    return recipeResult
}