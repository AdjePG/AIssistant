type ResponseType =
	| { translatedText: undefined, errorMessage: string }
	| { translatedText: string, errorMessage: undefined }

export async function translate({
	fromLanguage,
	toLanguage,
	text
}: {
	fromLanguage: string,
	toLanguage: string,
	text: string
}) {
	let translateResult: ResponseType

	if (fromLanguage === toLanguage) {
		translateResult = {
			translatedText: text,
			errorMessage: undefined
		}
	} else {
		console.log(window.location.origin)
		translateResult = await fetch(`${window.location.origin}/api/gemini/translate`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fromLanguage,
					toLanguage,
					text
				})
			}
		)
		.then(res => res.json())
		.then(data => {
			return {
				translatedText: data.translation,
				errorMessage: data.errorMessage
			}
		})
		.catch(() => {
			return {
				translatedText: undefined,
				errorMessage: "The translation failed because of the connection to the server. Please, refresh or try it later."
			}
		})
	}

	return translateResult;
}