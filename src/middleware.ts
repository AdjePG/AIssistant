import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { i18n } from "@/i18n/i18n.config";

function getLocale(request: NextRequest): string | undefined {
    try {
        const negotiatorHeaders: Record<string, string> = {};
        request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

        const locales: string[] = i18n.locales;
        const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
        
        const locale = matchLocale(languages, locales, i18n.defaultLocale);

        return locale;
    } catch (error) {
        console.error("Error negociando el locale:", error);
        // Retorna el idioma por defecto en caso de error
        return i18n.defaultLocale;
    }
}

export function middleware(request: NextRequest) {
    try {
        const pathname = request.nextUrl.pathname;

        if (pathname.startsWith('/assets/')) {
            return;
        }

        const pathnameIsMissingLocale = i18n.locales.every(
            (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
        );

        if (pathnameIsMissingLocale) {
            const locale = getLocale(request);

            if (locale === i18n.defaultLocale) {
                return NextResponse.rewrite(
                    new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
                )
            }

            return NextResponse.redirect(
                new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
            );
        }
    } catch (error) {
        console.error("Error en el middleware:", error);
        return NextResponse.error();
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|ads.txt).*)"],
};
