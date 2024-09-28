"use client"

import { ReactNode } from "react"
import ComboBox from "@/components/ComboBox/ComboBox"
import { i18n, Locale } from "@/i18n/i18n.config"
import { LightDarkTheme, Option } from "@/utils/types"
import { usePathname, useRouter } from "next/navigation"
import RoundedButton from "@/components/RoundedButton/RoundedButton"
import SunIcon from "@/icons/SunIcon"
import { useLocales } from "@/hooks/useLocales"
import MoonIcon from "@/icons/MoonIcon"
import SystemIcon from "@/icons/SystemIcon"
import { useGlobalSettings } from "@/hooks/useGlobalSettings"

interface Props {
    children : ReactNode
    section: string
    lang: Locale
}

export default function Header({children, section, lang} : Props) {
    const router = useRouter()
    const pathname = usePathname()
    const {
        colorTheme,
        langData,
        changeColorTheme 
    } = useGlobalSettings()
    const { languages, titles} = langData.header
    const {
        options,
        initialValue
    } = useLocales(languages, lang)

    const redirectLocale = (option: Option) => {
        const locale = option.value
        let url = ""

        const pathnameIsMissingLocale = i18n.locales.every(
            (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
        );
    
        if (pathnameIsMissingLocale) {
            if (locale !== i18n.defaultLocale) {
                url += `/${locale}`
            } 

            url += `${pathname}`
        } else {
            const segments = pathname.split('/')

            if (locale === i18n.defaultLocale) {
                segments.splice(1, 1)
                url = segments.join('/')
            } else {
                segments[1] = locale
            }
      
            url = segments.join('/')
        }
        router.push(url)
    }

    return (
        <div className="flex justify-between h-20 bg-secondary px-8 items-center select-none">
            <h1 className='text-lg xs:text-3xl text-left font-semibold leading-relaxed'>{children}{titles[section]}</h1>
            <div className="flex gap-1">
                <ComboBox
                    currentValue={initialValue}
                    options={options}
                    selectFunction={(option) => {redirectLocale(option)}}
                    classNameProps={{
                        general: "rounded-full",
                        selectedOption: "rounded-full h-10 p-2",
                        mainLabel: "hidden",
                        options: "top-12 right-0 w-max grid-cols-2"
                    }}
                />
                <div className="bg-tertiary rounded-full">
                    <RoundedButton
                        clickFunction={changeColorTheme}
                    >
                        <>
                        {colorTheme === LightDarkTheme.LIGHT ? <SunIcon className="w-6 h-6" /> : null}
                        {colorTheme === LightDarkTheme.DARK ? <MoonIcon className="w-6 h-6" /> : null}
                        {colorTheme === LightDarkTheme.SYSTEM ? <SystemIcon className="w-6 h-6" /> : null}
                        </>
                    </RoundedButton>
                </div>
                
            </div>
        </div>
    )
}