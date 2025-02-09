"use client"

import { Canvas } from "@react-three/fiber"
import Background3D from "./Background3D"

export default function Background3DClient() {
  return (
    <div className="absolute inset-0">
      <Canvas>
        <Background3D />
      </Canvas>
    </div>
  )
}

