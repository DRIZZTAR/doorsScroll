import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export default function Doors({ count = 100, ...props }) {
  const mesh = useRef()
  const { viewport } = useThree()
  const data = useScroll()

  const scrollPower = 6

  // Create an array of positions and colors for the doors
  const { positions, colors, scales } = useMemo(() => {
    const positions = []
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Random positions within the viewport
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 25
      const z = (Math.random() - 0.5) * 10
      positions.push(x, y, z)

      // Choose a color inspired by The Doors' album covers and psychedelic era
      const color = new THREE.Color()
      const randomColor = Math.random()
      if (randomColor < 0.25) {
        color.setHSL(0.1, 0.7, 0.5) // Gold/yellow (Strange Days)
      } else if (randomColor < 0.5) {
        color.setHSL(0, 0.8, 0.3) // Deep red (The Doors)
      } else if (randomColor < 0.75) {
        color.setHSL(0.6, 0.6, 0.6) // Blue (Morrison Hotel)
      } else {
        color.setHSL(0.08, 0.3, 0.2) // Dark brown (L.A. Woman)
      }
      colors.set([color.r, color.g, color.b], i * 3)

      // Random scales for variety
      scales.set(
        [0.5 + Math.random() * 0.5, 1 + Math.random() * 1.5, 0.1 + Math.random() * 0.1],
        i * 3
      )
    }
    return { positions, colors, scales }
  }, [count])

  useFrame(() => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        const id = i * 3
        const x = positions[id]
        const y = positions[id + 1]
        const z = positions[id + 2]

        // Apply scroll-based animation logic
        mesh.current.setMatrixAt(
          i,
          new THREE.Matrix4()
            .makeScale(scales[id], scales[id + 1], scales[id + 2])
            .setPosition(x, y + Math.sin(data.offset * scrollPower + x) * 2, z)
        )
      }
      mesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} {...props}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      <meshPhongMaterial vertexColors roughness={0.5} metalness={0.3} />
    </instancedMesh>
  )
}
