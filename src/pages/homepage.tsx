import { lazy, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' // @ts-ignore
import Slider from 'react-slick'
import Earth from '@/pages/components/earth'
import mapStudioImg from '@/assets/img/map-studio-img.png'
import mapSatellite from '@/assets/img/map-satellite.png'
import mapCity from '@/assets/img/map-city.png'
import mapMobile from '@/assets/img/homepage-mobile.png'
import fireIcon from '@/assets/img/fire-icon.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const LazyHeatMap = lazy(() => import('@/pages/components/charts/heat'))
const LazyAreaScatter = lazy(() => import('@/pages/components/charts/area'))
const LazyTimeScatter = lazy(() => import('@/pages/components/charts/time'))
const LazyCountryPie = lazy(() => import('@/pages/components/charts/pie'))

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
              className='m-2 text-balance font-tiny text-4xl font-medium tracking-wide text-neutral-950 dark:text-[#e54e1b] sm:m-4 sm:text-6xl'
            >
              FIRELENS
            </h1>
            <h1
              style={{ userSelect: 'none' }}
              className='mb-4 text-balance font-serif text-4xl font-medium tracking-tight text-neutral-950 dark:text-gray-100 sm:text-6xl'
            >
              {intl.formatMessage({ id: 'home.title1' })}
            </h1>
            <h1
              style={{ userSelect: 'none' }}
              className='mt-6 text-balance font-serif text-4xl font-medium tracking-tight text-neutral-950 dark:text-gray-100 sm:mt-10 sm:text-6xl'
            >
              {intl.formatMessage({ id: 'home.title2' })}
            </h1>
            <p
              style={{ userSelect: 'none' }}
              className='my-6 text-lg leading-tight tracking-wide text-neutral-600 dark:text-slate-400 sm:text-2xl sm:leading-normal'
            >
              {intl.formatMessage({ id: 'home.introduction' })}
            </p>
            <p
              style={{ userSelect: 'none' }}
              className='my-6 leading-tight tracking-wide text-neutral-600 dark:text-gray-600 sm:text-xl sm:leading-normal'
            >
              {intl.formatMessage({ id: 'home.team' })}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Slider {...settings} className='my-6 w-full shrink-0 rounded-xl lg:w-[30rem]'>
              <div>
                <img
                  src={mapStudioImg}
                  alt='img'
                  className='h-72 w-full rounded-2xl object-cover lg:h-full'
                />
              </div>
              <div>
                <img
                  src={mapSatellite}
                  alt='img'
                  className='h-72 w-full rounded-2xl object-cover lg:h-full'
                />
              </div>
              <div>
                <img
                  src={mapCity}
                  alt='img'
                  className='h-72 w-full rounded-2xl object-cover lg:h-full'
                />
              </div>
              <div>
                <img
                  src={mapMobile}
                  alt='img'
                  className='h-72 w-full rounded-2xl object-cover lg:h-full'
                />
              </div>
            </Slider>
          </motion.div>
        </div>
      </div>
      {/* chart-view */}
      <div className='mt-8 bg-gradient-radial px-6 pt-10 dark:from-gray-900 dark:to-slate-950 sm:mt-12 md:mt-20 lg:mt-44 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <motion.div
            className='flex flex-col items-center gap-4 text-center'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex items-center'>
              <img src={fireIcon} alt='fire-icon' className='h-16 w-auto sm:h-24' />
            </div>
            <p className='md:max-w-x font-montserrat text-sm leading-tight md:text-lg'>
              {new Date()
                .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                .replace(/(\w+) (\d+), (\d+)/, '$1 $2, $3')}
            </p>
            <h1 className='max-w-80 font-montserrat text-3xl leading-relaxed tracking-wider md:max-w-xl lg:text-4xl'>
              动态监测世界范围 48h 内的火情并且进行可视化分析
            </h1>
            <p className='max-w-72 font-montserrat text-lg leading-tight tracking-wider md:max-w-lg md:text-xl'>
              数据来源于 NASA VIIRS 375m Active Fire 产品
            </p>
          </motion.div>
          <Link to='/map' className='m-4 flex flex-col items-center'>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='font-inherit group flex cursor-pointer items-center rounded-2xl border-2 border-slate-900 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-3 text-lg font-medium tracking-widest text-white transition-all duration-300 ease-in-out hover:shadow-lg'
            >
              <svg
                className='rotate-30 mr-1 h-6 w-6 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1 group-hover:rotate-90'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M0 0h24v24H0z' fill='none'></path>
                <path
                  d='M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'
                  fill='currentColor'
                ></path>
              </svg>
              <span className='transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-2'>
                尝试一下
              </span>
            </motion.button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-8 flex flex-col items-center justify-center'
          >
            <p className='font-montserrat text-lg tracking-wider text-neutral-300 md:max-w-xl lg:max-w-4xl lg:text-xl'>
              Firelens
              基于高分热点数据产品，能够进行全球火灾发生时间模型的识别，如火灾频发的时段。4μm通道的火点亮度温度和火灾辐射功率（FRP）能够反映火灾强度，较高的亮度温度和较大的FRP值通常表示更严重的火灾。Firelens
              提供的动态火灾数据可视化有助于用户了解不同地区、不同时间的火灾发生情况,为全球尺度的火灾管理和决策提供支持
            </p>
            <p className='mt-6 font-montserrat tracking-wider text-neutral-400'>
              全球48h内特大火灾发生时间与火点亮度图
            </p>
            <Suspense fallback={<div>loading...</div>}>
              <LazyTimeScatter />
            </Suspense>
            <div className='mt-12 flex w-full flex-col gap-4 lg:max-w-5xl lg:flex-row'>
              <Suspense fallback={<div>loading...</div>}>
                <LazyCountryPie />
              </Suspense>
              <Suspense fallback={<div>loading...</div>}>
                <LazyAreaScatter />
              </Suspense>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='mb-2 mt-8 flex flex-col items-center justify-center'
          >
            <p className='max-w-lg font-montserrat text-lg tracking-wider text-neutral-300 md:max-w-xl lg:max-w-4xl lg:text-xl'>
              借助NDVI（归一化植被指数）进行火点筛选。NDVI使用近红外和红光波段进行计算，计算公式为(NIR-R)/(NIR+R)，能够反映植被的生长状态和覆盖程度。在区分植被与化工厂、城市热岛区域方面具有优势。通过将NDVI与火点检测算法相结合可以更精准地识别出真正的火灾点，减少因其他高温源（如城市热岛效应区域、工厂热源等）造成的误判
            </p>
            <p className='mt-6 font-montserrat tracking-wider text-neutral-400'>
              江浙部分地区NDVI 3D蜂窝热力图 （ 2024年7月 ）
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex flex-col items-center justify-center'
          >
            <Suspense fallback={<div>loading...</div>}>
              <LazyHeatMap />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
