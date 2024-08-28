import { Canvas } from '@react-three/fiber'
import { Earth } from '@/pages/earth'
import { motion } from 'framer-motion' // @ts-ignore
import Slider from 'react-slick'
import mapStudioImg from '@/assets/img/map-studio-img.png'
import mapSatellite from '@/assets/img/map-satellite.png'
import mapCity from '@/assets/img/map-city.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
}

export default function Homepage() {
  return (
    <main className='relative h-screen w-full'>
      {/* background */}
      <div className='earth absolute left-0 top-0 z-0 h-full w-full'>
        <Canvas>
          <Earth />
        </Canvas>
      </div>
      <div className='relative z-10 mx-auto max-w-7xl px-6 pt-24 sm:pt-32 md:pt-56 lg:px-8'>
        <div className='mx-auto max-w-2xl items-center justify-between lg:flex lg:max-w-none'>
          <motion.div
            className='max-w-3xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1
              style={{ userSelect: 'none' }}
              className='m-2 text-balance font-tiny text-4xl font-medium tracking-wide text-neutral-950 sm:m-4 sm:text-6xl dark:text-gray-100'
            >
              FIRELENS
            </h1>
            <h1
              style={{ userSelect: 'none' }}
              className='mb-4 text-balance font-serif text-4xl font-medium tracking-tight text-neutral-950 sm:text-6xl dark:text-gray-100'
            >
              中国火灾动态监测平台
            </h1>
            <h1
              style={{ userSelect: 'none' }}
              className='text-balance font-serif text-4xl font-medium tracking-tight text-neutral-950 sm:text-6xl dark:text-gray-100'
            >
              多维热点数据一站式解决方案
            </h1>
            <p
              style={{ userSelect: 'none' }}
              className='my-6 text-lg leading-tight tracking-wide text-neutral-600 sm:text-2xl sm:leading-normal dark:text-slate-400'
            >
              Firelens
              旨在为中国乃至东亚范围内火灾热点及多维地理信息时空数据的监测提供响应迅速、精准度高、性能出色的跨端可视化解决方案
            </p>
            <p
              style={{ userSelect: 'none' }}
              className='my-6 leading-tight tracking-wide text-neutral-600 sm:text-xl sm:leading-normal dark:text-gray-600'
            >
              北京林业大学 · Firelens团队
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Slider {...settings} className='my-6 w-full shrink-0 rounded-xl lg:w-96'>
              <div>
                <img
                  src={mapStudioImg}
                  alt='img'
                  className='h-64 w-full rounded-2xl object-cover lg:h-full'
                />
              </div>
              <div>
                <img
                  src={mapSatellite}
                  alt='img'
                  className='h-64 w-full rounded-2xl object-cover lg:h-full'
                />
              </div>
              <div>
                <img
                  src={mapCity}
                  alt='img'
                  className='h-64 w-full rounded-2xl object-cover lg:h-full'
                />
              </div>
            </Slider>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
