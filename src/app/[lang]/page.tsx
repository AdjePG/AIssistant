import WelcomeContainer from "@/components/Containers/WelcomeContainer/WelcomeContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome - AIssistant"
};

export default async function Home() {
  return (
    <WelcomeContainer />
  );
}
