"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"

const EducationalObject = ({ position, rotation, scale }) => {
  const mesh = useRef()
  const [spring, set] = useSpring(() => ({
    position: position,
    rotation: rotation,
    scale: scale,
    config: { mass: 2, tension: 200, friction: 50 },
  }))

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(t + position[0]) * 0.5
  })

  return (
    <animated.mesh ref={mesh} {...spring}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </animated.mesh>
  )
}

export default function Background3D() {
  const { mouse } = useThree()
  const objects = useMemo(
    () => [
      { position: [-4, 0, -5], rotation: [0, 0, 0], scale: [0.5, 0.5, 0.5] },
      { position: [4, 2, -3], rotation: [0, 0, 0], scale: [0.3, 0.3, 0.3] },
      { position: [-2, -2, -4], rotation: [0, 0, 0], scale: [0.4, 0.4, 0.4] },
      { position: [3, -1, -5], rotation: [0, 0, 0], scale: [0.6, 0.6, 0.6] },
    ],
    [],
  )

  useFrame(() => {
    objects.forEach((obj) => {
      obj.rotation[0] = mouse.y * 0.2
      obj.rotation[1] = mouse.x * 0.2
    })
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {objects.map((props, i) => (
        <EducationalObject key={i} {...props} />
      ))}
    </>
  )
}

