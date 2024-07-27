import { Canvas } from '@react-three/fiber'
import { Earth } from '@/pages/earth'
import '../index.css'

export default function MapView() {
  return (
    <div className='earth bg-black'>
      <Canvas>
        <Earth />
      </Canvas>
    </div>
  )
}
