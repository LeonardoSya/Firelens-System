import { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { TextureLoader } from 'three'
import * as THREE from 'three'

import EarthDayMap from '@/assets/textures/8k_earth_daymap.jpg'
import EarthNormalMap from '@/assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '@/assets/textures/8k_earth_specular_map.jpg'
import EarthCloudsMap from '@/assets/textures/8k_earth_clouds.jpg'

export default function Earth() {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    EarthDayMap, // 日地图
    EarthNormalMap, // 法线贴图
    EarthSpecularMap, // 高光贴图
    EarthCloudsMap, // 云层贴图
  ])

  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const [earthScale, setEarthScale] = useState([2.5, 2.5, 2.5])

  useEffect(() => {
    // 设置初始缩放比例
    if (earthRef.current) {
      earthRef.current.scale.set(earthScale[0], earthScale[1], earthScale[2])
    }
    if (cloudsRef.current) {
      cloudsRef.current.scale.set(earthScale[0], earthScale[1], earthScale[2])
    }
  }, [earthScale])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() // 获取流逝的时间，实现地球和云层转动效果

    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime / 50
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsedTime / 35
    }
  })

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      {/* 点光源 */}
      <pointLight color='#f6f3ea' position={[3, 0, 4]} intensity={0.8} />
      <Stars radius={200} depth={90} count={10000} factor={6} saturation={0} fade={true} />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* @ts-ignore */}
      <mesh ref={earthRef} className='absolute -z-10 flex h-80 w-80 shadow-inner'>
        <sphereGeometry args={[1, 32, 32]} />
        {/* @ts-ignore */}
        <meshPhongMaterial specular specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.4}
          panSpeed={0.6}
          rotateSpeed={0.5}
        />
      </mesh>
    </>
  )
}
