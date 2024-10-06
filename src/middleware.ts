import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { i18n } from "@/i18n/i18n.config";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (
      [
        '/assets/logo.png',
        '/assets/sounds/bell.wav',
        '/assets/flags/es_flag.png',
        '/assets/flags/ca_flag.png',
        '/assets/flags/en_flag.png',
        '/assets/flags/fr_flag.png',
        '/assets/flags/de_flag.png',
        '/assets/flags/it_flag.png',
      ].includes(pathname)
    ) return

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
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
