"use client"

import { Locale } from "@/i18n/i18n.config";
import { poppins } from "@/utils/fonts";
import { LightDarkTheme } from "@/utils/types";
import { Metadata } from "next";
import Head from "next/head";
import Script from "next/script";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
    children: React.ReactElement,
    lang: Locale,
    langJson: Record<string, any>
}

type ContextType = {
    colorTheme: string,
    langData: Record<string, any>,
    setColorTheme: Dispatch<SetStateAction<string>>
}

export const metadata: Metadata = {
    description: "Inteligent assistant for your daily tasks",
};

export const GlobalSettingsContext = createContext<ContextType | null>(null)

export function GlobalSettingsProvider({ children, lang, langJson } : Props) {
    const [colorTheme, setColorTheme] = useState<string>(LightDarkTheme.SYSTEM)
    const [langData] = useState<Record<string, any>>(langJson)

    useEffect(() => {
        setColorTheme(window.localStorage.getItem("theme-color") ?? LightDarkTheme.SYSTEM)
        document.documentElement.style.colorScheme = window.localStorage.getItem("theme-color") ?? LightDarkTheme.SYSTEM
    }, [])

    return (
        <GlobalSettingsContext.Provider value={{
            colorTheme,
            langData,
            setColorTheme
        }}>
            <html lang={lang}>
                <Head>
                    <>
                    <Script 
                        async 
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2419707164621577"
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    ></Script>
                    </>
                    <meta name="google-adsense-account" content="ca-pub-2419707164621577"></meta>
                </Head>
                <body className={`${poppins.className}`}>
                    {children}
                </body>
            </html>
        </GlobalSettingsContext.Provider>
    )
}