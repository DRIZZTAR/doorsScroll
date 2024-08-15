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
  const { positions, colors } = useMemo(() => {
    const positions = []
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Random positions within the viewport
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 25
      const z = (Math.random() - 0.5) * 10
      positions.push(x, y, z)

      // Choose a random color: slightly off-white, black, or red
      const color = new THREE.Color()
      const randomColor = Math.random()
      if (randomColor < 0.33) {
        color.set(0xfafafa) // Slightly off-white
      } else if (randomColor < 0.66) {
        color.set(0xcc1100) // Black
      } else {
        color.set(0xff000ff) // Red
      }
      colors.set([color.r, color.g, color.b], i * 3)
    }
    return { positions, colors }
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
          new THREE.Matrix4().makeTranslation(x, y + data.offset * scrollPower, z)
        )
      }
      mesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} {...props}>
      {/* Using boxGeometry to create door shapes */}
      <sphereGeometry args={[0.1, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </sphereGeometry>
      <meshStandardMaterial vertexColors metalness={1} roughness={0.3} />
    </instancedMesh>
  )
}
