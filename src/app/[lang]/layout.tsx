import { i18n, Locale } from "@/i18n/i18n.config";
import { GlobalSettingsProvider } from "@/contexts/GlobalSettingsContext";
import { getLangJson } from "@/i18n/languages";
import './globals.css'

interface Props {
  children: React.ReactNode
  params: { lang : Locale }
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({lang: locale}))
}

export default async function LocaleLayout({ children, params }: Readonly<Props>) {
  const langJson = await getLangJson(params.lang)

  return (
    <GlobalSettingsProvider langJson={langJson} lang={params.lang}>
      <>
      {children}
      </>
    </GlobalSettingsProvider>
  );
}
