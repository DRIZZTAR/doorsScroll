import React, { Suspense, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  ScrollControls,
  Scroll,
  Preload,
  Environment,
  OrbitControls,
  PresentationControls,
  Sphere
} from '@react-three/drei'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Leva } from 'leva'
import Images from './components/Images'
import ScrollContent from './components/ScrollContent'
import Spheres from './components/Spheres'

function CombinedControls({ scrollPages }) {
  const { camera, gl } = useThree()
  const orbitControlsRef = useRef()

  return (
    <>
      {/* <OrbitControls
        ref={orbitControlsRef}
        camera={camera}
        makeDefault
        enableZoom={false}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.3}
        panSpeed={0.5}
        rotateSpeed={0.5}
      /> */}
      <PresentationControls
        enabled={true} // the controls can be disabled by setting this to false
        global={true} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={false} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        rotation={[0, 0, 0]} // Default rotation
        polar={[-Math.PI / 2, Math.PI / 2]} // Verticaltouch me limits
        azimuth={[-Math.PI / 5, Math.PI / 5]} // Horizontal limits
        config={{ mass: 2, tension: 170, friction: 56 }} // Spring config
      >
        <ScrollControls pages={scrollPages} damping={0.4} enabled={true} infinite={false}>
          <Scroll>
            <Images />
          </Scroll>
          <Scroll html>
            <ScrollContent />
          </Scroll>

          <Spheres count={20} />
        </ScrollControls>
      </PresentationControls>
    </>
  )
}

export default function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas camera={{ position: [10, 0, 10], fov: 35 }} dpr={[1, 1.5]}>
        <directionalLight intensity={4.0} position={[1, 0, 2]} />

        <Suspense fallback={null}>
          <CombinedControls scrollPages={4} />
          <EffectComposer>
            <Vignette
              offset={0.5}
              darkness={0.9}
              eskil={false}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
          <Preload />
        </Suspense>
      </Canvas>
    </>
  )
}
