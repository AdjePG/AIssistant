"use client"

import BulbIcon from "@/icons/BulbIcon";
import RecipesIcon from "@/icons/RecipesIcon";
import TranslateIcon from "@/icons/TranslateIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
    {
        path: "/translate",
        label: "Translator",
        icon: TranslateIcon
    },
    {
        path: "/recipes",
        label: "Recipes",
        icon: RecipesIcon
    },
    {
        path: "/quizzes",
        label: "Quizzes",
        icon: BulbIcon
    },
]

export default function Navigator () {
    const pathname = usePathname()

    const [itemHovering, setItemHovering] = useState<string | null>();
    const [currentPage, setCurrentPage] = useState<string>(pathname);

    useEffect(() => {
        setCurrentPage(pathname)
    }, [pathname])

    return (
        <nav className="w-full">
            <ul className="list-none m-0 p-0 flex justify-center md:flex-col flex-1 gap-1">
                { 
                    links.map(link => (
                        <li 
                            key={link.path}
                            onMouseEnter={() => setItemHovering(link.path)}
                            onMouseLeave={() => setItemHovering(null)}
                            className="flex flex-col rounded-xl box-border transition-colors ease duration-200 w-12 h-12 md:w-full hover:bg-hover"
                        >
                            <Link href={link.path} className={`flex items-center justify-center md:justify-start gap-2 p-2 w-full h-full text-sm ${currentPage === link.path && 'font-semibold'}`}>
                                <link.icon
                                    filled={currentPage === link.path || itemHovering === link.path}
                                    duotone={currentPage === link.path && itemHovering !== link.path}
                                    className="w-6 h-6 inline-block"
                                />
                                <p className="text-sm hidden md:inline-block">{link.label}</p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
