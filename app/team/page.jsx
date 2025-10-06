'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { domains } from '@/data/teamInfo'

import { FiUser } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi"

const page = () => {

  const [selectedDomain, setSelectedDomain] = useState(0);
  const [memberSelected, setMemberSelected] = useState(0)

  useEffect(() => {
    console.log(selectedDomain)
  }, [selectedDomain])

  return (
    <div>
      <div className="min-h-screen relative bg-[url('/Events/Eventsback.png')] bg-no-repeat bg-cover bg-center opacity-85">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>

        {/* Text content over the image */}
        <div className="absolute inset-0 py-9 px-6 text-white z-10">
          <div className="text-2xl text-center mb-8 font-tungsten-bold w-[300px] md:text-[3.4rem] font-semibold bg-[#6f6f6f] px-8 max-w-5xl py-4 transform transition-all duration-700 ease-out animate-fade-in-down hover:scale-105 hover:bg-[#5f5f5f]">
            CSI-VIT
          </div>

          <div className="flex justify-between">
            {/* Left section */}
            <div className="text-center space-y-8 animate-fade-in-left">
              <div className="flex gap-2">
                {domains.map((item, i) => (
                  <div
                    onClick={() => {
                      setSelectedDomain(i)
                      setMemberSelected(0)
                    }}
                    key={i}
                    className={`bg-white/40 border-2 backdrop-blur-3xl shadow-lg border-white p-2 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:bg-white/60 hover:shadow-xl hover:-translate-y-1 ${
                      selectedDomain === i ? 'scale-110 bg-white/60 shadow-xl ring-2 ring-white/50' : ''
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <Image
                      src={item.icon}
                      width={50}
                      height={50}
                      alt={item.description}
                      className="transition-transform duration-300 hover:rotate-12"
                    />
                  </div>
                ))}
              </div>

              <div className="h-[5px] w-[20vw] overflow-hidden shadow-lg rounded-4xl bg-[#6f6f6f] animate-fade-in-up transition-all duration-500" style={{ animationDelay: '800ms' }}>
                <div className="w-[70%] bg-white h-full transition-all duration-1000 ease-out animate-progress-fill" />
              </div>

              <div className="grid grid-cols-3 max-w-[350px] gap-5 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                {domains[selectedDomain].members
                  .map((_, i) => (
                    <div
                      onClick={() => setMemberSelected(i)}
                      key={i}
                      className={`bg-white/30 flex justify-center items-center w-[100px] h-[100px] border-2 backdrop-blur-3xl shadow-lg border-white p-2 cursor-pointer transform transition-all duration-300 ease-out hover:scale-105 hover:bg-white/50 hover:shadow-xl hover:-translate-y-2 hover:rotate-3 ${
                        memberSelected === i ? 'scale-105 bg-white/50 shadow-xl ring-2 ring-white/50' : ''
                      } animate-fade-in-scale`}
                      style={{ animationDelay: `${1200 + i * 100}ms` }}
                    >
                      <FiUser width={100} height={100} className='text-3xl transition-all duration-300 hover:scale-125' />
                    </div>
                  ))}
              </div>
            </div>

            {/* Right section */}
            <div className="w-[300px] mr-10 animate-fade-in-right">
              <div className="transition-all duration-500 ease-out">
                <h2 className="-mb-7 transition-all duration-300 hover:text-orange-300">{domains[selectedDomain].name}</h2>
                <h1 className="font-tungsten-bold text-[5rem] transition-all duration-500 ease-out hover:text-orange-300 hover:scale-105 transform">{domains[selectedDomain].members[memberSelected].name}</h1>
              </div>

              <div className="flex gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '1400ms' }}>
                {[
                  {
                    label: "Info",
                    icon: <HiInformationCircle size={35} />,
                    link: "https://example.com/info",
                  },
                  {
                    label: "Github",
                    icon: <FaGithub size={35} />,
                    link: "https://github.com/jeetm",
                  },
                  {
                    label: "Linkedin",
                    icon: <FaLinkedin size={35} />,
                    link: "https://linkedin.com/in/jeetm",
                  },
                  {
                    label: "Instagram",
                    icon: <FaInstagram size={35} />,
                    link: "https://instagram.com/jeetm",
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[70px] space-y-2 group animate-fade-in-scale"
                    style={{ animationDelay: `${1600 + i * 150}ms` }}
                  >
                    <div className="flex items-center justify-center bg-white/30 w-[70px] h-[70px] rounded border-2 backdrop-blur-3xl shadow-lg border-white p-2 transition-all duration-300 group-hover:bg-white/50 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:shadow-2xl">
                      <div className="transition-all duration-300 group-hover:scale-125">
                        {item.icon}
                      </div>
                    </div>
                    <p className="bg-white/20 rounded text-center font-bold transition-all duration-300 group-hover:bg-white/40 group-hover:scale-105">
                      {item.label}
                    </p>
                  </a>
                ))}
              </div>

              <div className="w-full h-1 rounded-4xl bg-white mb-4 transition-all duration-500 hover:h-2 hover:bg-orange-300 animate-fade-in-left" style={{ animationDelay: '2000ms' }} />

              <p className="transition-all duration-300 hover:text-orange-200 animate-fade-in-up" style={{ animationDelay: '2200ms' }}>
                {domains[selectedDomain].members[memberSelected].description}
              </p>
            </div>
          </div>
        </div>

        <div className='absolute bottom-5 w-full flex items-center justify-center font-tungsten-bold text-white px-4 py-2 text-center animate-fade-in-up' style={{ animationDelay: '2400ms' }}>
          <div className='bg-gradient-to-b from-[#D13844] to-[#FF7777] text-[3rem] px-12 rounded shadow-2xl shadow-drop-black drop-shadow-2xl text-white transition-all duration-500 ease-out hover:scale-105 hover:shadow-3xl hover:from-[#FF4455] hover:to-[#FF8888] transform hover:-translate-y-1'> 
            {domains[selectedDomain].members[memberSelected].position}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
