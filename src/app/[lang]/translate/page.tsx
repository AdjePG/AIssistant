import { Metadata } from "next";
import TranslationContainer from "@/components/Containers/TranslationContainer/TranslationContainer";
import TranslateIcon from "@/icons/TranslateIcon";
import Header from "@/components/Header/Header";
import { Locale } from "@/i18n/i18n.config";
import AdBanner from "@/components/AdBanner/AdBanner";

interface Props {
  params: { lang : Locale }
}

export const metadata: Metadata = {
  title: "Translator - AIssistant"
};

export default async function Translate({params} : Props) {
  return (
    <>
    <Header lang={params.lang} section='translator'>
      <TranslateIcon filled duotone className="w-6 h-6 xs:w-8 xs:h-8 mr-2 xs:mr-4 inline-block"/>
    </Header>
    <AdBanner />
    <div className="h-[calc(100%_-_80px)] content-center custom-scrollbar py-6 pl-6 pr-2">
      <TranslationContainer/>
    </div>
    </>
  );
}
  