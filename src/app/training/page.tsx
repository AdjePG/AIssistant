import { Metadata } from "next";
import QuizzesContainer from "@/components/Containers/QuizzesContainer";
import TrainingIcon from "@/icons/TrainingIcon";

export const metadata: Metadata = {
  title: "Training - AIssistant"
};

export default function Training() {
  return (
    <>
    <div className="h-20 bg-secondary px-8 content-center">
      <h1 className='text-3xl text-center md:text-left font-semibold leading-relaxed'><TrainingIcon filled duotone className="w-8 h-8 mr-4 inline-block"/>Training</h1>
    </div>
    <div className="h-[calc(100%_-_80px)] content-center custom-scrollbar py-6 pl-6 pr-2">
      <QuizzesContainer />
    </div>
    </>
  );
}
  