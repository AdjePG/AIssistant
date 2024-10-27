"use client"

import Image from "next/image"
import Navigator from "@/components/NavigatorBar/Navigator/Navigator"
import { i18n, Locale } from "@/i18n/i18n.config"
import Link from "next/link"
import { useRef } from "react"

interface Props {
    lang : Locale
}

export default function NavigatorBar ({lang} : Props) {
    const homeUrl = useRef<string>(lang === i18n.defaultLocale ? `/` : `/${lang}`)

    return (
        <header className="flex md:flex-col justify-center md:justify-start items-center bg-primary h-full overflow-visible px-5 select-none gap-1">
            <Link href={homeUrl.current}>
                <Image
                    src={`/assets/logo.png`}
                    alt={`AI Assistant logo`}
                    width={320}
                    height={84}
                    className="my-5 hidden md:block"
                    priority
                />
                <Image
                    src={`/assets/logo-small.png`}
                    alt={`AI Assistant logo`}
                    width={100}
                    height={100}
                    className="h-12 w-12 p-2 md:hidden block transition-[background-color] ease duration-200 hover:bg-hover rounded-xl box-border"
                    priority
                />
            </Link>
            <Navigator lang={lang} />
        </header>
    )
}