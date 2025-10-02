'use client'
import Image from "next/image";
import Banner from "../components/Banner";
import EventsScrolling from "../components/EventsScrolling";
import ScrollFrameAnimation from "../components/ScrollFrameAnimation";
import Lenis from 'lenis'
import { useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);




export default function Home() {



  return (
    <div className="bg-black">
      <ScrollFrameAnimation />
    </div>
  );
}
