import Image from "next/image";
import homebg from "@/public/HomePage/skyh.png";
import island from "@/public/HomePage/island.png";
import bg from "@/public/HomePage/bgh.png";

import React from "react";

export default function Hero() {
    return (
        <div className="w-full">
            {/* Sky section at the top */}
            <div className="relative w-full h-screen">
                <Image
                    src={homebg}
                    alt="Sky Background"
                    fill
                    className="object-cover z-0"
                />
                <Image
                    src={island}
                    alt="island"
                    fill
                    className="object-contain z-10 mt-[20%]"
                />
                
                {/* Text and Cards Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-start justify-start pt-20 px-8 md:px-16 lg:px-24 mt-[10%]">
                    {/* Main Heading */}
                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-2">
                        Computer Society of India
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-white text-lg md:text-xl lg:text-2xl mb-4 opacity-90">
                        Vidyalankar Institute of Technology
                    </p>
                    <p className="text-white text-lg md:text-xl lg:text-2xl mb-16 opacity-90">
                        MORE INFO
                    </p>
                </div>
                <div className="flex justify-between items-end gap-2 md:gap-4 mb-10 absolute bottom-10 left-4 right-4 md:left-10 md:right-10 z-50">
                        <div className="bg-black rounded-lg h-48 w-48 md:h-64 md:w-64 flex-shrink-0"></div>
                        <div className="bg-black rounded-lg h-32 w-32 md:h-40 md:w-40 flex-shrink-0"></div>
                        <div className="bg-black rounded-lg h-32 w-32 md:h-40 md:w-40 flex-shrink-0"></div>
                        <div className="bg-black rounded-lg h-32 w-32 md:h-40 md:w-40 flex-shrink-0"></div>
                        <div className="bg-black rounded-lg h-32 w-32 md:h-40 md:w-40 flex-shrink-0"></div>
                        <div className="bg-black rounded-lg h-32 w-32 md:h-40 md:w-40 flex-shrink-0"></div>
                        <div className="bg-black rounded-lg h-32 w-32 md:h-40 md:w-40 flex-shrink-0"></div>
                    </div>
            </div>
            
            {/* Infinitely repeating background section */}
            <div 
                className="w-full min-h-screen"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                    backgroundPosition: 'top left'
                }}
            >
                {/* Content can be added here - this div will expand with content */}
                <div className="h-screen"></div> {/* Placeholder for demonstration */}
            </div>
        </div>
    );
}