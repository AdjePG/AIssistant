import Image from "next/image"
import Navigator from "@/components/Header/Navigator/Navigator"

export default function Header () {
    return (
        <header className="flex md:flex-col items-center bg-primary h-full overflow-visible px-5">
            <Image
                src={`/assets/logo.png`}
                alt={`AI Assistant logo`}
                width={200}
                height={200}
                className="my-5 hidden md:block"
            />
            <Navigator />
        </header>
    )
}