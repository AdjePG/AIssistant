import { GlobalSettingsContext } from "@/contexts/GlobalSettingsContext";
import { LightDarkTheme } from "@/utils/types";
import { useContext } from "react";

export function useGlobalSettings() {
    const context = useContext(GlobalSettingsContext)

    if (context == null) {
        throw new Error("This useColorTheme must be in a GlobalSettingsContext")
    }

    const { 
        colorTheme,
        langData, 
        setColorTheme 
    } = context
    
    const changeColorTheme = () => {
        let newColorTheme : string;
      
        if (colorTheme === LightDarkTheme.SYSTEM) {
            newColorTheme = LightDarkTheme.LIGHT
        } else if (colorTheme === LightDarkTheme.LIGHT) {
            newColorTheme = LightDarkTheme.DARK
        } else {
            newColorTheme = LightDarkTheme.SYSTEM
        }
    
        localStorage.setItem("theme-color", newColorTheme)
        document.documentElement.style.colorScheme = newColorTheme
        setColorTheme(newColorTheme)
    } 
    
    return {
        colorTheme,
        langData,
        changeColorTheme
    } 
}
