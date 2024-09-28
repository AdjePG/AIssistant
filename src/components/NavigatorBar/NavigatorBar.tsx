import Image from "next/image"
import Navigator from "@/components/NavigatorBar/Navigator/Navigator"
import { Locale } from "@/i18n/i18n.config"

interface Props {
    lang : Locale
}

export default async function NavigatorBar ({lang} : Props) {
    return (
        <header className="flex md:flex-col items-center bg-primary h-full overflow-visible px-5 select-none">
            <Image
                src={`/assets/logo.png`}
                alt={`AI Assistant logo`}
                width={320}
                height={84}
                className="my-5 hidden md:block"
                priority
            />
            <Navigator lang={lang} />
        </header>
    )
}