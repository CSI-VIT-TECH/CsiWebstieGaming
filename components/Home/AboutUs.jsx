// 'use client'
// import React, { useEffect, useState, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useGSAP } from '@gsap/react'

// const AboutUs = () => {
//   const [svgContent, setSvgContent] = useState('')
//   const [svgLoaded, setSvgLoaded] = useState(false)
//   const containerRef = useRef(null)

//   gsap.registerPlugin(ScrollTrigger)

//   useEffect(() => {
//     async function loadSVG() {
//       try {
//         const response = await fetch('/Home/Aboutus/container.svg')
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//         const svg = await response.text()
//         setSvgContent(svg)
//         setSvgLoaded(true)
//         console.log('SVG loaded successfully')
//       } catch (error) {
//         console.error('Error loading SVG:', error)
//       }
//     }
//     loadSVG()
//   }, [])

//   useGSAP(() => {
//     if (!svgLoaded || !containerRef.current) return

//     const container = containerRef.current

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: container,
//         start: 'top top',
//         end: '+=1000',
//         scrub: true,
//         pin: true,
//       },
//     })

//     // Scale container
//     tl.to(container, {
//       scale: 1.1,
//       duration: 3,
//       ease: 'power2.inOut',
//     })

//     // Fade out main
//     const mainElement = container.querySelector('#main')
//     if (mainElement) {
//       tl.to(
//         mainElement,
//         {
//           opacity: 0,
//           duration: 2,
//           ease: 'power2.inOut',
//         },
//         '-=2'
//       )
//     }

//     // All walls together
//     tl.addLabel('wallsOut')

//     const topElement = container.querySelector('#top')
//     if (topElement) {
//       tl.to(
//         topElement,
//         {
//           y: -200,
//           opacity: 0,
//           duration: 2,
//         },
//         'wallsOut'
//       )
//     }

//     const sidewallElement = container.querySelector('#sidewall')
//     if (sidewallElement) {
//       tl.to(
//         sidewallElement,
//         {
//           x: 200,
//           opacity: 0,
//           duration: 2,
//         },
//         'wallsOut'
//       )
//     }

//     const frontwallElement = container.querySelector('#frontwall')
//     if (frontwallElement) {
//       tl.to(
//         frontwallElement,
//         {
//           x: -200,
//           y: -200,
//           opacity: 0,
//           duration: 2,
//         },
//         'wallsOut'
//       )
//     }
//   }, { dependencies: [svgLoaded] })

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
//       {/* Background SVG Container */}
//       <div
//         ref={containerRef}
//         id="bg_container"
//         className="absolute inset-0 z-0 w-full h-full flex items-center justify-center"
//         style={{
//           opacity: svgLoaded ? 1 : 0,
//           transition: 'opacity 0.5s ',
//         }}
//         dangerouslySetInnerHTML={{ __html: svgContent }}
//       />

//       {/* Content overlay */}
//       <div className="relative z-10 min-h-screen w-full flex items-center justify-center">
//         <div className="text-center text-white">
//           <h1 className="text-4xl font-bold mb-4">About Us</h1>
//           <p className="text-lg opacity-90">Welcome to CSI VIT</p>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default AboutUs
