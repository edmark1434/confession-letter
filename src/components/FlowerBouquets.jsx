import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import bouquetModel from '../assets/bouquetflowers.glb?url'

function BouquetModel(props) {
  const { scene } = useGLTF(bouquetModel)
  return <primitive object={scene} {...props} />
}
// Preload the model for quicker display
useGLTF.preload(bouquetModel)

const FlowerBouquet = () => {
    return (
        <div style={{ width: '100%', height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ toneMappingExposure: 1.15 }}>
                <Suspense fallback={null}>
          <BouquetModel scale={1} position={[0, 0, 0]} />
          <Environment preset="sunset" />
                </Suspense>
                <OrbitControls enableZoom={true} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.6} />
        <pointLight position={[-6, -4, -4]} intensity={0.8} />
            </Canvas>
        </div>
    )
}

export default FlowerBouquet