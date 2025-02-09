'use client'

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

const AssessmentButton = ({ number }: { number: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (number === 1) {
      router.push('/self-review')
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        className="relative bg-white bg-opacity-20 text-white font-semibold py-8 px-8 rounded-lg shadow-lg backdrop-blur-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 overflow-hidden transform-gpu cursor-pointer"
        initial={{ background: "rgba(255, 255, 255, 0.2)" }}
        animate={{
          background: isHovered
            ? "linear-gradient(45deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6))"
            : "rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <span className="text-2xl block text-center relative z-10">
          Assessment {number}
        </span>
        <motion.div
          className="absolute inset-0 bg-blue-500 opacity-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1.5 : 0,
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        {["✏️", "📚", "🧠", "🎓"].map((emoji, index) => (
          <motion.span
            key={index}
            className="absolute text-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0,
              x: isHovered ? (Math.random() - 0.5) * 100 : 0,
              y: isHovered ? (Math.random() - 0.5) * 100 : 0,
              rotate: isHovered ? Math.random() * 360 : 0,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AssessmentButton