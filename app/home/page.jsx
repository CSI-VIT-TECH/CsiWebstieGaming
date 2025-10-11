

import Navbar from "@/components/Home/Navbar";
import Hero from "@/components/HomePage/Hero";

export default function Home() {
  // Lenis is initialized in the client-only component below

  return (
    <>
      <div>
        <Navbar />
        <Hero />
      </div>
    </>
  );
}
