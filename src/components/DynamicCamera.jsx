import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'

function DynamicCamera() {
  const { camera } = useThree() // Access the Three.js camera

  // Separate controls for each axis to make adjustments easier
  const { x, y, z } = useControls('Camera Position', {
    x: { value: 9.07, step: 0.0001, min: -5, max: 20 },
    y: { value: 0, step: 0.0001, min: -10, max: 20 },
    z: { value: 10, step: 0.001, min: -10, max: 20 }
  })

  // camera rotation leva controls
  const { x: rx, y: ry, z: rz } = useControls('Camera Rotation', {
    x: { value: 0, step: 0.00001, min: -0.9, max: 1 },
    y: { value: 0.7, step: 0.00001, min: 0.5, max: 1 },
    z: { value: 0, step: 0.00001, min: -3.14, max: 3.14 }
  })

  useFrame(() => {
    camera.position.set(x, y, z)
    camera.rotation.set(rx, ry, rz)
  })

  return null
}

export default DynamicCamera
