import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useThree, useFrame, useLoader } from '@react-three/fiber'
import { useScroll, Image as ImageImpl, MeshDistortMaterial } from '@react-three/drei'

function Image({ c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  useFrame(() => {
    ref.current.material.color.lerp(c.set(hovered ? 'white' : '#cccccc'), hovered ? 0.4 : 0.05)
  })
  return (
    <ImageImpl
      ref={ref}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    />
  )
}

function CustomImage({ url, ...props }) {
  const texture = useLoader(THREE.TextureLoader, url)
  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={texture} roughness={0.1} metalness={1.0} color="white" />
    </mesh>
  )
}

export default function Images() {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const group = useRef()
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1
    group.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3
    group.current.children[5].material.zoom = 1 - data.range(1.6 / 3, 1 / 3)
    group.current.children[6].material.zoom = 1 + (1 - data.range(2.0 / 3, 1 / 3)) / 3
    group.current.children[7].material.zoom = 1 + data.range(2.4 / 3, 1 / 3) / 2
  })
  return (
    <group ref={group}>
      <Image position={[-1, 0, 0]} scale={[4, height, 1]} url="/img1.jpg" />
      <Image position={[2, -1.2, 1]} rotation={[0, Math.PI * 2.25, 0]} scale={3} url="/img6.jpg" />
      {/*Second Page Of Images*/}
      <Image
        position={[-1.6, -height, 2]}
        rotation={[0, Math.PI * 2.25, 0]}
        scale={[1, 3, 1]}
        url="/john.jpg"
      />
      <Image position={[2.35, -height, 3]} scale={[1, 2, 1]} url="/ray.jpg" />
      <Image
        position={[6.9, -height + 0.4, 5.5]}
        rotation={[0, Math.PI * 2.25, 0]}
        scale={1.5}
        url="/robby.jpg"
      />

      <Image
        position={[1, -height * 1.5, 2.5]}
        rotation={[0, Math.PI * 2.25, 0]}
        scale={[3.5, 3, 1]}
        url="/img3.jpg"
      />

      <Image
        position={[0, -height * 1.9 - height / 4, 0]}
        scale={[width - 1, height / 2, 1]}
        url="/wideGroup.jpg"
      />
      <Image
        position={[1.0, -height * 3.0, 3]}
        rotation={[0, Math.PI * 2.35, 0]}
        scale={[2, 2, 1]}
        url="/cover2.jpeg"
      />
      <Image
        position={[2.5, -height * 3.12, 2]}
        rotation={[0, Math.PI * 2.05, 0]}
        scale={[2, 2, 1]}
        url="/cover1.jpeg"
      />
      <Image
        position={[5.0, -height * 3.0, 3.5]}
        rotation={[0, Math.PI * 2.05, 0]}
        scale={[1, 1, 1]}
        url="/cover3.jpeg"
      />
    </group>
  )
}
