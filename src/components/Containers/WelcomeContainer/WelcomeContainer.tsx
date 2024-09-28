"use client"
import { useGlobalSettings } from "@/hooks/useGlobalSettings"

export default function WelcomeContainer() {
    const { langData } = useGlobalSettings()
    const { home } = langData.pages

    return (
        <div className="h-full content-center">
            <p className="text-2xl xs:text-4xl md-lg:text-5xl xl:text-7xl text-center">{home.leftTitle}<span className="bg-gradient-to-r from-[#e02573] to-[#227cd1] text-transparent bg-clip-text">AIssistant</span>{home.rightTitle}</p>
            <p className="text-7xl xs:text-9xl mt-6 xs:mt-14 text-center">👋</p>
        </div>
    )
}