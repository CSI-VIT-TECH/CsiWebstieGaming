'use client'

import React from 'react'
import Navbar from '@/components/Home/Navbar'
import Image from "next/image";
import EventsScrolling from "@/components/EventsScrolling";
import Lenis from 'lenis'
import { useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ACscroll from "@/components/ACscroll";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  useEffect(() => {
    // Initialize Lenis only on client side
    if (typeof window === 'undefined') return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smooth: true,
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', (e) => {
      // console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative z-20 overflow-x-hidden">
        <EventsScrolling />
      </div>
      <ACscroll />
    </div>
  )
}

export default page
