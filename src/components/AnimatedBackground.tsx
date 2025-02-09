"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

const EducationalIcon: React.FC<{ icon: string; delay: number }> = ({ icon, delay }) => (
  <motion.div
    className="absolute text-4xl text-white opacity-50"
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      z: [-100, 100, -100],
    }}
    transition={{
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      delay: delay,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    {icon}
  </motion.div>
)

const AnimatedBackground: React.FC = () => {
  const educationalIcons = ["📚", "🎓", "✏️", "🔬", "🧮", "🖥️", "🧠", "🔍", "📐", "🌍", "🧪", "📝"]
  const containerRef = useRef<HTMLDivElement>(null)
  const gridControls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = e
        const { width, height } = containerRef.current.getBoundingClientRect()
        const moveX = (clientX - width / 2) / 25
        const moveY = (clientY - height / 2) / 25

        gridControls.start({
          x: moveX,
          y: moveY,
          transition: { type: "spring", damping: 15, stiffness: 150 },
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [gridControls])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-600">
      <motion.div className="absolute inset-0" animate={gridControls}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="grid-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <rect width="200%" height="200%" fill="url(#grid)" transform="translate(-50%, -50%)" />
          <rect width="200%" height="200%" fill="url(#grid-gradient)" transform="translate(-50%, -50%)" />
        </svg>
      </motion.div>
      {educationalIcons.map((icon, index) => (
        <EducationalIcon key={index} icon={icon} delay={index * 0.5} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50" />
    </div>
  )
}

export default AnimatedBackground

