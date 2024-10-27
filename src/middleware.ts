import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18n/i18n.config";

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
            return NextResponse.rewrite(
                new URL(`/${i18n.defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
            )
        }
    } catch (error) {
        console.error("Error en el middleware:", error);
        return NextResponse.error();
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|ads.txt).*)"],
};
