"use client"

import { useGlobalSettings } from "@/hooks/useGlobalSettings";
import { i18n, Locale } from "@/i18n/i18n.config";
import BulbIcon from "@/icons/BulbIcon";
import RecipesIcon from "@/icons/RecipesIcon";
import TrainingIcon from "@/icons/TrainingIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    lang: Locale
}

const links = [
    {
        id: "translator",
        path: "/translate",
        icon: TranslateIcon
    },
    {
        id: "recipes",
        path: "/recipes",
        icon: RecipesIcon
    },
    {
        id: "trivia",
        path: "/trivia",
        icon: BulbIcon
    },
    {
        id: "training",
        path: "/training",
        icon: TrainingIcon
    },
]

export default function Navigator ({ lang } : Props) {
    const pathname = usePathname()
    const { langData } = useGlobalSettings()
    const { navigatorBar } = langData

    const [itemHovering, setItemHovering] = useState<string | null>();
    const [currentPage, setCurrentPage] = useState<string>(pathname);

    useEffect(() => {
        setCurrentPage(pathname)
    }, [pathname])

    return (
        <nav className="w-full">
            <ul className="list-none m-0 p-0 flex justify-center md:flex-col flex-1 gap-1">
                { 
                    links.map(link => {
                        let href : string = "";
                        
                        if (lang !== i18n.defaultLocale) {
                            href += `/${lang}`
                        }
                        
                        href += `${link.path}`

                        return ( 
                            <li 
                                key={link.id}
                                onMouseEnter={() => setItemHovering(href)}
                                onMouseLeave={() => setItemHovering(null)}
                                className="flex flex-col rounded-xl box-border transition-[background-color] ease duration-200 w-12 h-12 md:w-full hover:bg-hover"
                            >
                                <Link href={href} className={`flex items-center justify-center md:justify-start gap-2 p-2 w-full h-full text-sm ${currentPage === href && 'font-semibold'}`}>
                                    <link.icon
                                        filled={currentPage === href || itemHovering === href}
                                        duotone={currentPage === href && itemHovering !== href}
                                        className="w-6 h-6 inline-block"
                                    />
                                    <p className="text-sm hidden md:inline-block">{navigatorBar[link.id]}</p>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
