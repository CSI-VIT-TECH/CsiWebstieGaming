'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { domains } from '@/data/teamInfo'
import { CiUser } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'

const page = () => {

  const [selectedDomain,setSelectedDomain]=useState(0);
  const [memberSelected,setMemberSelected]=useState(0)

  useEffect(()=>{
    console.log(selectedDomain)
  },[selectedDomain])

  return (
    <div>
      <div className="min-h-screen relative bg-[url('/Events/EventsBack.png')] bg-no-repeat bg-cover bg-center opacity-85">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>

        {/* Text content over the image */}
        <div className="absolute inset-0 py-9 px-6 text-white z-10">
          <div className="text-2xl text-center mb-8 font-tungsten-bold w-[300px] md:text-[3.4rem] font-semibold bg-[#6f6f6f] px-8 max-w-5xl py-4">
            CSI-VIT
          </div>

          <div className="flex justify-between">
            {/* Left section */}
            <div className="text-center space-y-8">
              <div className="flex gap-2">
                {domains.map((item, i) => (
                  <div
                    onClick={()=>{
                      setSelectedDomain(i)
                      setMemberSelected(0)
                    }}
                    key={i}
                    className="bg-white/40 border-2 backdrop-blur-3xl shadow-lg border-white p-2"
                  >
                    <Image
                      src={item.icon}
                      width={50}
                      height={50}
                      alt={item.description}
                    />
                  </div>
                ))}
              </div>

              <div className="h-[5px] w-[20vw] overflow-hidden shadow-lg rounded-4xl bg-[#6f6f6f]">
                <div className="w-[70%] bg-white h-full" />
              </div>

              <div className="grid grid-cols-3 max-w-[350px] gap-5">
                {domains[selectedDomain].members
                  .map((_, i) => (
                    <div
                      onClick={()=>setMemberSelected(i)}
                      key={i}
                      className="bg-white/30 flex justify-center items-center w-[100px] h-[100px] border-2 backdrop-blur-3xl shadow-lg border-white p-2"
                    >
                      <FiUser width={100} height={100} className='text-3xl' />
                    </div>
                  ))}
              </div>
            </div>

            {/* Right section */}
            <div className="w-[300px] mr-10">
              <div>
                <h2 className="-mb-7">{domains[selectedDomain].name}</h2>
                <h1 className="font-tungsten-bold text-[5rem]">{domains[selectedDomain].members[memberSelected].name}</h1>
              </div>

              <div className="flex gap-3 mb-8">
                {['Info', 'Github', 'Linkedin', 'Instagram'].map((label, i) => (
                  <div key={i} className="w-[70px] space-y-2">
                    <div className="bg-white/30 w-[70px] h-[70px] rounded border-2 backdrop-blur-3xl shadow-lg border-white p-2"></div>
                    <p className="bg-white/20 rounded text-center font-bold">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-full h-1 rounded-4xl bg-white mb-4" />

              <p>
                {domains[selectedDomain].members[memberSelected].description}
              </p>
            </div>
          </div>
        </div>

        <div className='absolute bottom-5  w-full flex items-center justify-center font-tungsten-bold text-white px-4 py-2  text-center'>
               <div className='bg-gradient-to-b from-[#D13844] to-[#FF7777] text-[3rem] px-12 rounded shadow-2xl shadow-drop-black drop-shadow-2xl text-white'> {domains[selectedDomain].members[memberSelected].position}</div>
        </div>
      </div>
    </div>
  )
}

export default page
