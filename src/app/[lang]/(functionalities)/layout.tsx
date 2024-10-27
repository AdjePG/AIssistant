import NavigatorBar from "@/components/NavigatorBar/NavigatorBar";
import { ToastProvider } from "@/contexts/ToastContext";
import { Locale } from "@/i18n/i18n.config";

interface Props {
    children: React.ReactNode,
    params: { lang : Locale }
}

export default function Layout({children, params}: Props) {
    return (
        <div className="principal">
            <NavigatorBar lang={params.lang}/>
            <ToastProvider>
                <main className="h-full overflow-hidden">
                    {children}
                </main>
            </ToastProvider>
        </div>
    );
}