'use client'
import React,{useState} from "react";
import "../components/styles.css";
import Image from "next/image";




const defaultEvents = [
  
  {
    id: 1,
    title: "HackNight 2.0",
    date: "Fri, 7:00 PM",
    location: "Auditorium",
    image: "/Poster/Hackbuild.jpg",
    description:
      "A 12-hour coding sprint to innovate, collaborate, and build impactful projects. Open for all tech enthusiasts!",
  },
  {
    id: 2,
    title: "AI Bootcamp",
    date: "Oct 12, 10:00 AM",
    location: "Lab 3",
    image: "/Poster/Alumni.jpg",
    description:
      "Hands-on sessions on LLMs and computer vision with mentors from industry and academia.",
  },
  {
    id: 3,
    title: "Web Dev Jam",
    date: "Nov 2, 11:00 AM",
    location: "Innovation Hub",
    image: "/Poster/ByteFortune.jpg",
    description: `
Round 1: Spin the Wheel
Participants get 15 minutes to solve as many coding problems as possible. Each spin decides the problem to attempt. After solving, they must mark it complete before spinning again.

Round 2: Flip the Cards
Top 40% teams qualify. Each team picks a card revealing their coding challenge. After a set time, they may use points to purchase a Power Card, which could be an advantage (bonus points, extra time, hints) or a disadvantage (restrictions, handicaps) based purely on luck.

Rules & Judging:
- Submit complete, functional code for every problem.
- Problems follow predefined I/O specifications.
- Submissions are evaluated against test cases.
- Only correct, properly submitted solutions count toward scoring.
`
  },
  {
    id: 4,
    title: "Web Dev Jam",
    date: "Nov 2, 11:00 AM",
    location: "Innovation Hub",
    image: "/Poster/ByteFortune.jpg",
    description: `
Round 1: Spin the Wheel
Participants get 15 minutes to solve as many coding problems as possible. Each spin decides the problem to attempt. After solving, they must mark it complete before spinning again.

Round 2: Flip the Cards
Top 40% teams qualify. Each team picks a card revealing their coding challenge. After a set time, they may use points to purchase a Power Card, which could be an advantage (bonus points, extra time, hints) or a disadvantage (restrictions, handicaps) based purely on luck.

Rules & Judging:
- Submit complete, functional code for every problem.
- Problems follow predefined I/O specifications.
- Submissions are evaluated against test cases.
- Only correct, properly submitted solutions count toward scoring.
`
  },
  {
    id: 5,
    title: "HackNight 2.0",
    date: "Fri, 7:00 PM",
    location: "Auditorium",
    image: "/Poster/Hackbuild.jpg",
    description:
      "A 12-hour coding sprint to innovate, collaborate, and build impactful projects. Open for all tech enthusiasts!",
  },
//   {
//     id: 6,
//     title: "AI Bootcamp",
//     date: "Oct 12, 10:00 AM",
//     location: "Lab 3",
//     image: "/Poster/Alumni.jpg",
//     description:
//       "Hands-on sessions on LLMs and computer vision with mentors from industry and academia.",
//   },
//   {
//     id: 7,
//     title: "Web Dev Jam",
//     date: "Nov 2, 11:00 AM",
//     location: "Innovation Hub",
//     image: "/Poster/ByteFortune.jpg",
//     description: `
// Round 1: Spin the Wheel
// Participants get 15 minutes to solve as many coding problems as possible. Each spin decides the problem to attempt. After solving, they must mark it complete before spinning again.

// Round 2: Flip the Cards
// Top 40% teams qualify. Each team picks a card revealing their coding challenge. After a set time, they may use points to purchase a Power Card, which could be an advantage (bonus points, extra time, hints) or a disadvantage (restrictions, handicaps) based purely on luck.

// Rules & Judging:
// - Submit complete, functional code for every problem.
// - Problems follow predefined I/O specifications.
// - Submissions are evaluated against test cases.
// - Only correct, properly submitted solutions count toward scoring.
// `
//   },
//   {
//     id: 8,
//     title: "HackNight 2.0",
//     date: "Fri, 7:00 PM",
//     location: "Auditorium",
//     image: "/Poster/Hackbuild.jpg",
//     description:
//       "A 12-hour coding sprint to innovate, collaborate, and build impactful projects. Open for all tech enthusiasts!",
//   },
//   {
//     id: 9,
//     title: "AI Bootcamp",
//     date: "Oct 12, 10:00 AM",
//     location: "Lab 3",
//     image: "/Poster/Alumni.jpg",
//     description:
//       "Hands-on sessions on LLMs and computer vision with mentors from industry and academia.",
//   },
//   {
//     id: 10,
//     title: "Web Dev Jam",
//     date: "Nov 2, 11:00 AM",
//     location: "Innovation Hub",
//     image: "/Poster/ByteFortune.jpg",
//     description: `
// Round 1: Spin the Wheel
// Participants get 15 minutes to solve as many coding problems as possible. Each spin decides the problem to attempt. After solving, they must mark it complete before spinning again.

// Round 2: Flip the Cards
// Top 40% teams qualify. Each team picks a card revealing their coding challenge. After a set time, they may use points to purchase a Power Card, which could be an advantage (bonus points, extra time, hints) or a disadvantage (restrictions, handicaps) based purely on luck.

// Rules & Judging:
// - Submit complete, functional code for every problem.
// - Problems follow predefined I/O specifications.
// - Submissions are evaluated against test cases.
// - Only correct, properly submitted solutions count toward scoring.
// `
//   },
 


];

const BannerSlider = ({events = defaultEvents, position = "center"}) => {
    const [active, setActive] = useState(null);
  
  // Determine banner class based on position
  const bannerClass = position === "left" ? "banner banner-left" : 
                     position === "right" ? "banner banner-right" : 
                     "banner";

  return (
    <div className={bannerClass}>
      <div className="slider" style={{ "--quantity": 5 }}>
        {events.map((ev, index) => (
            <div
              key={ev.id}
              className="item border border-[#00000000]"
              style={{ "--position": index + 1 }}
            >
              <div
                onClick={() => setActive(ev)}
                className="relative overflow-hidden 
                  h-[520px] sm:h-[340px] md:h-[500px] cursor-pointer 
                  rounded-3xl group bg-[#0b0613] 
                  backdrop-blur-sm transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(207, 158, 255, 0.15), 0 0 40px rgba(207, 158, 255, 0.1)',
                  filter: 'drop-shadow(0 0 10px rgba(207, 158, 255, 0.2))',
                  border: "2px solid #CF9EFF",
                }}
              >
                <Image
                  src={ev.image}
                  alt={ev.title}
                  height={900}
                  width={900}
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  priority={ev.id === 1}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          ))}
      </div>
      {/* Modal unchanged */}
            {active && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/70"
                  onClick={() => setActive(null)}
                />
                <div
                  className="relative z-[61] w-[95%] md:w-[80%] lg:w-[70%] 
                    rounded-3xl border-2 border-[#CF9EFF] 
                    bg-[#0C0414] text-white 
                    overflow-hidden max-h-[90vh]"
                  style={{
                    boxShadow: '0 0 25px rgba(207, 158, 255, 0.2), 0 0 50px rgba(207, 158, 255, 0.1)',
                    filter: 'drop-shadow(0 0 15px rgba(207, 158, 255, 0.25))'
                  }}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-1/2 flex items-center justify-center 
                      bg-[#0b0613] p-3 md:p-5 
                      shadow-[inset_0_0_40px_rgba(207,158,255,0.2)] 
                      backdrop-blur-sm">
                      <Image
                        src={active.image}
                        alt={active.title}
                        width={1280}
                        height={720}
                        className="w-full h-auto max-h-[60vh] md:max-h-[80vh] object-contain rounded-xl"
                      />
                      <button
                        onClick={() => setActive(null)}
                        className="absolute top-3 right-3 rounded-full bg-black/60 hover:bg-black/80 
                          border border-white/20 px-3 py-1 text-sm"
                      >
                        Close
                      </button>
                    </div>
                    <div className="flex-1 p-5 md:p-8 overflow-y-auto">
                      <h3 className="font-heading text-2xl md:text-3xl">{active.title}</h3>
                      <div className="text-white/80 text-sm md:text-base mt-1">
                        {active.date} · {active.location}
                      </div>
                      <div className="text-white/80 text-sm md:text-base leading-6 mt-4">
                        {active.description.split('\n').map((line, index) => {
                          if (line.trim() === '') return <br key={index} />;
                          if (line.includes('Round') || line.includes('Rules')) {
                            return (
                              <h4 key={index} className="font-heading text-[#CF9EFF] text-base md:text-lg mt-4 mb-2">
                                {line}
                              </h4>
                            );
                          }
                          if (line.startsWith('-')) {
                            return (
                              <li key={index} className="ml-4 mb-1">
                                {line}
                              </li>
                            );
                          }
                          return (
                            <p key={index} className="mb-2">
                              {line}
                            </p>
                          );
                        })}
                      </div>
                      <div className="pt-6 flex gap-4">
                        <button className="rounded-xl bg-[#1C1528] border border-[#CF9EFF]/30 px-5 py-2 text-sm md:text-base hover:bg-[#261a36] hover:border-[#CF9EFF]/60 hover:text-[#CF9EFF] transition-all duration-300">
                          Register
                        </button>
                        <button className="rounded-xl bg-transparent border border-[#CF9EFF]/40 px-5 py-2 text-sm md:text-base hover:bg-[#CF9EFF]/10 hover:border-[#CF9EFF]/60 hover:text-[#CF9EFF] transition-all duration-300">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
    </div>
    
  );
};

export default BannerSlider;
