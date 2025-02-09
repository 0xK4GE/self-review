import { motion } from "framer-motion"
import { useMousePosition } from "../hooks/useMousePosition"

export const FloatingElement = () => {
  const mousePosition = useMousePosition()

  return (
    <motion.div
      className="hidden md:block fixed w-64 h-64 rounded-full bg-blue-400 bg-opacity-20 filter blur-3xl"
      animate={{
        x: mousePosition.x - 128,
        y: mousePosition.y - 128,
      }}
      transition={{ type: "spring", damping: 10, stiffness: 50 }}
    />
  )
}

