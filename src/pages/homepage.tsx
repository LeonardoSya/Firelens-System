import { Canvas } from '@react-three/fiber'
import { useIntl } from 'react-intl'
import { motion } from 'framer-motion' // @ts-ignore
import Slider from 'react-slick'
import Earth from '@/pages/components/earth'
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
  const intl = useIntl()

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
              {intl.formatMessage({ id: 'home.title1' })}
            </h1>
            <h1
              style={{ userSelect: 'none' }}
              className='text-balance font-serif text-4xl font-medium tracking-tight text-neutral-950 sm:text-6xl dark:text-gray-100'
            >
              {intl.formatMessage({ id: 'home.title2' })}
            </h1>
            <p
              style={{ userSelect: 'none' }}
              className='my-6 text-lg leading-tight tracking-wide text-neutral-600 sm:text-2xl sm:leading-normal dark:text-slate-400'
            >
              Firelens
              {intl.formatMessage({ id: 'home.introduction' })}
            </p>
            <p
              style={{ userSelect: 'none' }}
              className='my-6 leading-tight tracking-wide text-neutral-600 sm:text-xl sm:leading-normal dark:text-gray-600'
            >
              {intl.formatMessage({ id: 'home.team' })}
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
