'use client' // Add this at the top to mark as Client Component

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import AssessmentButton from "@/components/AssessmentButton"

const DynamicAnimatedBackground = dynamic(
  () => import("@/components/AnimatedBackground"), 
  { ssr: false }
)

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden perspective-1000">
      <DynamicAnimatedBackground />
      <main className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, rotateX: -15 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn to Learn Assessment
          </motion.h1>
          <motion.p
            className="text-xl text-blue-100 max-w-2xl mx-auto"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Embark on an interactive journey to discover your learning potential and enhance your study skills.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
          initial={{ opacity: 0, rotateX: 15 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {[1, 2, 3, 4].map((num) => (
            <AssessmentButton key={num} number={num} />
          ))}
        </motion.div>
      </main>
    </div>
  )
}
