import Featured from "@/components/MainPage/Featured";
import Hero from "@/components/MainPage/Hero";
import Noutati from "@/components/MainPage/Noutati";

export default function Home() {
  return (
    <div className="App">
      <Hero/>
      <Featured/>
      <Noutati/>
    </div>
  );
}
