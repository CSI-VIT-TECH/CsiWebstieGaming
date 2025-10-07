

import AboutUs from "@/components/Home/AboutUs";
import Hero from "@/components/Home/Hero";
import HeroScale from "@/components/Home/HeroScale";
import Navbar from "@/components/Home/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <Hero/>
        <AboutUs/>
        {/* <HeroScale/> */}
      </div>
    </>
  );
}
