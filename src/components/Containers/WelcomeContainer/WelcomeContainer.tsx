"use client"
import { useGlobalSettings } from "@/hooks/useGlobalSettings"
import { i18n, Locale } from "@/i18n/i18n.config"
import { links } from "@/utils/constants"
import Link from "next/link"

interface Props {
    lang : Locale
}

export default function WelcomeContainer({ lang } : Props) {
    const { langData } = useGlobalSettings()
    const { home } = langData.pages

    return (
        <main className="flex flex-col h-full justify-center items-center">
            <p className="text-2xl xs:text-4xl sm:text-5xl md-lg:text-7xl text-center">{home.leftTitle}<span className="bg-app-gradient text-transparent bg-clip-text">AIssistant</span>{home.rightTitle}</p>
            <p className="text-7xl xs:text-9xl mt-2 xs:mt-8 text-center">👋</p>
            <p className="text-sm mt-14 mb-2 text-center">{home.functionalitiesDesc}</p>
            <div className="grid grid-cols-2 md-lg:flex w-[302px] md-lg:w-[600px] gap-1">
            {
                links.map(link => {
                    let href : string = "";
                        
                    if (lang !== i18n.defaultLocale) {
                        href += `/${lang}`
                    }
                    
                    href += `${link.path}`

                    return ( 
                        <Link
                            key={link.id} 
                            href={href}
                            className={`flex flex-1 rounded-xl p-1 text-sm bg-app-gradient group select-none`}
                        >
                            <div className="flex justify-center gap-2 bg-tertiary group-hover:bg-transparent w-full rounded-lg p-1 transition-[opacity] ease duration-200 items-center">
                                <link.icon className="w-6 h-6 inline-block group-hover:text-white"/>
                                <p className="text-sm group-hover:text-white">{langData.navigatorBar[link.id]}</p>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
        </main>
    )
}