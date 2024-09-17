import { Metadata } from "next";
import TranslationContainer from "@/app/translate/TranslationContainer";
import TranslateIcon from "@/icons/TranslateIcon";

export const metadata: Metadata = {
  title: "Translator - AIssistant"
};

export default function Translate() {
  return (
    <>
    <div className="h-20 bg-secondary px-8 content-center">
      <h1 className='text-3xl text-center md:text-left font-semibold leading-relaxed'><TranslateIcon filled duotone className="w-8 h-8 mr-4 inline-block"/>Translator</h1>
    </div>
    <div className="h-[calc(100%_-_80px)] content-center custom-scrollbar py-6 pl-6 pr-2">
      <TranslationContainer />
    </div>
    </>
  );
}
  