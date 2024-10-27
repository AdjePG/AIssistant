import WelcomeContainer from "@/components/Containers/WelcomeContainer/WelcomeContainer";
import Header from "@/components/Header/Header";
import { Locale } from "@/i18n/i18n.config";
import { Metadata } from "next";
import Image from "next/image";

interface Props {
  params: { lang : Locale }
}

export const metadata: Metadata = {
  title: "Translator - AIssistant"
};

export default async function Home({params} : Props) {
  return (
    <>
      <Header lang={params.lang} section='welcome'>
        <Image
          src={`/assets/logo.png`}
          alt={`AI Assistant logo`}
          width={320}
          height={84}
          className="w-40"
          priority
        />
      </Header>
      <div className="h-[calc(100%_-_80px)] content-center custom-scrollbar py-6 pl-6 pr-2">
        <WelcomeContainer lang={params.lang} />
      </div>
    </>
  );
}
