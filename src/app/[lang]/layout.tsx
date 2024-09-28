import NavigatorBar from "@/components/NavigatorBar/NavigatorBar";
import { ToastProvider } from "@/contexts/ToastContext";
import { Locale } from "@/i18n/i18n.config";
import { GlobalSettingsProvider } from "@/contexts/GlobalSettingsContext";
import { getLangJson } from "@/i18n/languages";
import './globals.css'

interface Props {
  children: React.ReactNode
  params: { lang : Locale }
}

export default async function LocaleLayout({ children, params }: Readonly<Props>) {
  const langJson = await getLangJson(params.lang)

  return (
    <GlobalSettingsProvider langJson={langJson} lang={params.lang}>
      <>
      <NavigatorBar lang={params.lang}/>
      <ToastProvider>
        <main className="h-full overflow-hidden">
          {children}
        </main>
      </ToastProvider>
      </>
    </GlobalSettingsProvider>
  );
}
