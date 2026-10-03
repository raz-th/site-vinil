import ExploreazaFormatari from "@/components/MainPage/ExploreazaFormatari";
import Featured from "@/components/MainPage/Featured";
import Hero from "@/components/MainPage/Hero";
import Noutati from "@/components/MainPage/Noutati";
import { PageTransitionReady } from "@/components/PageTransitionReady";

export default function Home() {
  return (
    <div className="App">
      <PageTransitionReady />
      <Hero/>
      <Featured/>
      <ExploreazaFormatari/>
      <Noutati/>
    </div>
  );
}
