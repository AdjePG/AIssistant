"use client"

import { useGlobalSettings } from "@/hooks/useGlobalSettings";
import AlertIcon from "@/icons/AlertIcon";

export default function NotFound() {
    const { langData } = useGlobalSettings()
    const { notFound } = langData.others

    return (
        <div className="h-full content-center">
            <p className="text-7xl md:text-9xl text-center"><span className="bg-gradient-to-r from-[#e02573] to-[#227cd1] text-transparent bg-clip-text">404</span></p>
            <p className="text-base md:text-lg text-center">{notFound}</p>
            <AlertIcon filled duotone className="h-36 md:h-52 w-36 md:w-52 mx-auto mt-10" />
        </div>
    )
}