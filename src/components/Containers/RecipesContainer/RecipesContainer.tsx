'use client'
import TextBox from "@/components/TextBox/TextBox";
import { LanguageType, TextBoxType, ToastClass } from "@/utils/types";
import styles from "@/components/Containers/RecipesContainer/RecipesContainer.module.css"
import { useRecipes } from "@/hooks/useRecipes";
import ImageIcon from "@/icons/ImageIcon";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { generateRecipeText, generateRecipeImage} from "@/services/recipes";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";
import { Locale } from "@/i18n/i18n.config";

interface Props {
    lang : Locale
}

export default function RecipesContainer ({ lang } : Props) {
    const { langData } = useGlobalSettings()
    const { recipes } = langData.pages
    const {
        fromText,
        title,
        ingredients,
        steps,
        image,
        isLoading,
        setFromText,
        setIsLoading,
        setRecipe,
        setImage
    } = useRecipes()
    const { openToast } = useToast()
    
    useEffect(() => {
        if (isLoading) {
            generateRecipe()
        }
    }, [isLoading])
    
    const generateRecipe = async () => {
        if (fromText === '') {
            openToast("emptyRecipeGeneration", ToastClass.WARNING)
            setIsLoading(false)
            return
        }
    
        const recipe = await generateRecipeText({ 
            text: fromText,
            language: lang
        })
        .then(result => {
            if (result.errorMessage !== undefined) {
                openToast(result.errorMessage, ToastClass.ERROR)
            } else {
                return {
                    title: result.title,
                    ingredients: result.ingredients,
                    steps: result.steps
                }
            }
        })
    
        if (recipe === undefined) {
            setIsLoading(false)
            return;
        }
    
        setRecipe(JSON.stringify({
            title: recipe.title,
            ingredients: recipe.ingredients,
            steps: recipe.steps
        }))
    
        const image = await generateRecipeImage({ title: recipe.title })
        .then(result => {
            if (result.errorMessage !== undefined) {
                openToast(result.errorMessage, ToastClass.WARNING)
            }
        
            return result.image
        })
    
        if (image === undefined) {
            setIsLoading(false)
            return;
        }
    
        setImage(image)
        setIsLoading(false)
    }

    return (
        <div className={`blue-shadow ${styles.recipes_container}`}>
        <TextBox
            type={TextBoxType.WRITE}
            value={fromText}
            placeholder={recipes.writePlaceholder}
            language={lang as LanguageType}
            setText={setFromText}
            submitButton={{
                fun: () => setIsLoading(true),
                label: recipes.submitButton
            }}
        />
        {
            !isLoading
                ? 
                    <>
                    {
                        image !== ''
                        ?
                            <img src={image} alt={`Photo of the '${image}' recipe`} className={`${styles.picture} rounded-lg object-cover`} />
                        :
                            <div className={`${styles.picture} flex justify-center items-center bg-tertiary rounded-lg`}>
                                <ImageIcon className="w-20 h-20"/>
                            </div>
                    }
                    </>
                : 
                    <div className={`${styles.picture} flex justify-center items-center bg-tertiary rounded-lg`}>
                        <LoadingComponent />
                    </div>
        }

        {
            title === '' && !isLoading
            ?
                <p className={`${styles.empty_recipe} text-center text-base xs:text-xl content-center min-h-[100px]`}>{recipes.recipesPlaceholder}</p>
            :
                <>
                {
                    !isLoading
                    ?
                        <>
                        <p className={`${styles.title} px-4 pt-4 text-2xl font-semibold`}>{title}</p>

                        <TextBox
                            type={TextBoxType.READ}
                            value={ingredients}
                            language={lang as LanguageType}
                            classNameProps={{
                                general: "max-h-[400px] xs:max-h-[600px]",
                                area: 'ingredients'
                            }}
                        />

                        <TextBox
                            type={TextBoxType.READ}
                            value={steps}
                            language={lang as LanguageType}
                            classNameProps={{
                                general: "max-h-[400px] xs:max-h-[600px]",
                                area: 'steps'
                            }}
                        />
                        </>
                    :
                        <LoadingComponent 
                            classNameProps={{
                                general: "min-h-[100px] max-h-[400px] xs:max-h-[600px]",
                                page: "recipes",
                                area: "title"
                            }}  
                        />
                }
                </>
        }
        </div>
    )
}