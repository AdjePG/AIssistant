import { Metadata } from "next";
import RecipesContainer from "@/components/Containers/RecipesContainer/RecipesContainer";
import RecipesIcon from "@/icons/RecipesIcon";
import Header from "@/components/Header/Header";
import { Locale } from "@/i18n/i18n.config";
import AdBanner from "@/components/AdBanner/AdBanner";

interface Props {
  params: { lang : Locale }
}

export const metadata: Metadata = {
  title: "Recipes - AIssistant"
};

export default async function Recipes({params} : Props) {
  return (
    <>
    <Header lang={params.lang} section='recipes'>
      <RecipesIcon filled duotone className="w-6 h-6 xs:w-8 xs:h-8 mr-2 xs:mr-4 inline-block"/>
    </Header>
    <AdBanner />
    <div className="h-[calc(100%_-_192px)] content-center custom-scrollbar py-6 pl-6 pr-2">
      <RecipesContainer lang={params.lang}/>
    </div>
    </>
  );
}
  