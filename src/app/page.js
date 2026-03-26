import Featured from "@/components/MainPage/Featured";
import Footer from "@/components/MainPage/Footer";
import Hero from "@/components/MainPage/Hero";
import Noutati from "@/components/MainPage/Noutati";

export default function Home() {
  return (
    <div className="App">
      <Hero/>
      <Featured/>
      <Noutati/>
      <div className="stripe" style={{marginBottom: 3}}/>
      <Footer/>
    </div>
  );
}
