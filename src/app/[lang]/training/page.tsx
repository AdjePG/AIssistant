import { Metadata } from "next";
import TrainingIcon from "@/icons/TrainingIcon";
import TrainingContainer from "@/components/Containers/TrainingContainer/TrainingContainer";
import Header from "@/components/Header/Header";
import { Locale } from "@/i18n/i18n.config";

interface Props {
  params: { lang : Locale }
}

export const metadata: Metadata = {
  title: "Training - AIssistant"
};

export default async function Training({params} : Props) {
  return (
    <>
    <Header lang={params.lang} section='training'>
      <TrainingIcon filled duotone className="w-6 h-6 xs:w-8 xs:h-8 mr-2 xs:mr-4 inline-block"/>
    </Header>
    <div className="h-[calc(100%_-_80px)] content-center custom-scrollbar py-6 pl-6 pr-2">
      <TrainingContainer lang={params.lang} />
    </div>
    </>
  );
}
  