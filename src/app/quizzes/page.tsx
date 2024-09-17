import { Metadata } from "next";
import QuizzesContainer from "@/app/quizzes/QuizzesContainer";
import BulbIcon from "@/icons/BulbIcon";

export const metadata: Metadata = {
  title: "Recipes generator - AIssistant"
};

export default function Recipes() {
  return (
    <>
    <div className="h-20 bg-secondary px-8 content-center">
      <h1 className='text-3xl text-center md:text-left font-semibold leading-relaxed'><BulbIcon filled duotone className="w-8 h-8 mr-4 inline-block"/>Quizzes</h1>
    </div>
    <div className="h-[calc(100%_-_80px)] content-center custom-scrollbar py-6 pl-6 pr-2">
      <QuizzesContainer />
    </div>
    </>
  );
}
  