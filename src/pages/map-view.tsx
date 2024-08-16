import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Earth } from '@/pages/earth'
import { motion } from 'framer-motion'
import MyMap from '@/pages/map'
// import '../index.css'

export default function MapView() {
  return (
    <>
      {/* <div className='earth bg-black'>
        <Canvas>
          <Earth />
        </Canvas>
      </div> */}
      <MyMap />
      <div>
        <SideMenu />
      </div>
    </>
  )
}

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(true)
  const [isFRPOpen, setIsFRPOpen] = useState(true)

  return (
    <div
      className={`absolute -left-56 top-48 w-56 rounded-r-xl bg-white p-4 transition duration-300 ease-in-out dark:bg-gradient-to-t dark:from-gray-800 dark:to-gray-950 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className='flex items-center gap-x-5 px-3 py-4'>
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-auto w-8 fill-neutral-700 dark:fill-neutral-200'
            viewBox='0 0 512 512'
          >
            <path d='M479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0032 272v112a64 64 0 0064 64h320a64 64 0 0064-64V272a16.65 16.65 0 00-.34-3.3zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91 0 .13.05.26.07.39l26.93 127.88a4 4 0 01-3.92 4.82H320a15.92 15.92 0 00-16 15.82 48 48 0 11-96 0A15.92 15.92 0 00192 256H72.65a4 4 0 01-3.92-4.82z' />
            <path d='M368 160H144a16 16 0 010-32h224a16 16 0 010 32zM384 224H128a16 16 0 010-32h256a16 16 0 010 32z' />
          </svg>
        </span>
        <span className='font-tiny text-2xl font-bold tracking-tight text-neutral-700 dark:text-neutral-200'>
          SIDE MENU
        </span>
      </div>

      {/* 根据时间筛选 */}
      <div
        onClick={() => setIsDateOpen(!isDateOpen)}
        className={` ${isDateOpen ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-900' : 'hover:bg-gray-100 dark:hover:bg-gray-900'} my-2 flex transform cursor-pointer items-center gap-x-3 rounded-md p-3 duration-150`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-auto w-6 fill-neutral-700 dark:fill-neutral-200'
          viewBox='0 0 512 512'
        >
          <path d='M416 64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4v-12a64 64 0 00-64-64zM476 176H36a4 4 0 00-4 4v236a64 64 0 0064 64h320a64 64 0 0064-64V180a4 4 0 00-4-4zM239.58 401.1c-12.17 9.61-28.75 14.9-46.7 14.9-27.87 0-48.48-18.16-57.66-33.7a16 16 0 0127.56-16.3c1.08 1.84 11.15 18 30.1 18 16.66 0 36.12-7.29 36.12-27.82 0-6.25-1.22-14.95-7-20.88-8.54-8.74-22.75-12.67-30.11-12.67a16 16 0 010-32c4.85 0 17.41-2.6 25.28-10.65a22 22 0 006.57-16.08c0-23.23-28.63-23.9-31.89-23.9-17.34 0-23.8 10.61-24.07 11.06a16 16 0 11-27.55-16.26c7.64-13 25.22-26.8 51.62-26.8 16.44 0 31.76 4.77 43.13 13.42 13.39 10.2 20.76 25.28 20.76 42.48A54 54 0 01240 302.35c-1.15 1.18-2.36 2.28-3.59 3.35a66.18 66.18 0 018.42 7.23c10.56 10.8 16.14 25.75 16.14 43.25.03 18.06-7.58 34.01-21.39 44.92zM368 396a16 16 0 01-32 0V256.29l-22.51 16.59a16 16 0 11-19-25.76l43.42-32a16 16 0 019.49-3.12h4.6a16 16 0 0116 16z' />
        </svg>
        <span className='font-semibold text-neutral-700 dark:text-neutral-200'>根据时间筛选</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`absolute right-3 h-auto w-5 stroke-neutral-700 dark:stroke-neutral-200 ${isDateOpen ? 'rotate-180' : ''} transform duration-150`}
          viewBox='0 0 512 512'
        >
          <path
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='48'
            d='M112 328l144-144 144 144'
          />
        </svg>
      </div>
      <motion.ul className='transform duration-150'>
        {isDateOpen &&
          ['2024-7', '2024-6', '2024-5', '2024-4', '2024-3', '2024-2'].map((item, i) => (
            <motion.li
              key={i}
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: i * 0.05,
                duration: 0.2,
              }}
              className='flex cursor-pointer gap-x-5 rounded-md p-2 text-neutral-700 hover:bg-neutral-100 dark:hover:bg-gray-900'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-auto w-3 stroke-neutral-700 dark:stroke-neutral-200'
                viewBox='0 0 512 512'
              >
                <path
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='48'
                  d='M184 112l144 144-144 144'
                />
              </svg>
              <span className='text-sm text-neutral-700 dark:text-neutral-200'>{item}</span>
            </motion.li>
          ))}
      </motion.ul>
      {/* 根据灾情筛选 */}
      <div
        onClick={() => setIsFRPOpen(!isFRPOpen)}
        className={` ${isFRPOpen ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} my-2 flex transform cursor-pointer items-center gap-x-3 rounded-md p-3 duration-150`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-auto w-6 fill-neutral-700 dark:fill-neutral-200'
          viewBox='0 0 512 512'
        >
          <path d='M394.23 197.56a300.43 300.43 0 00-53.37-90C301.2 61.65 249.05 32 208 32a16 16 0 00-15.48 20c13.87 53-14.88 97.07-45.31 143.72C122 234.36 96 274.27 96 320c0 88.22 71.78 160 160 160s160-71.78 160-160c0-43.3-7.32-84.49-21.77-122.44zm-105.9 221.13C278 429.69 265.05 432 256 432s-22-2.31-32.33-13.31S208 390.24 208 368c0-25.14 8.82-44.28 17.34-62.78 4.95-10.74 10-21.67 13-33.37a8 8 0 0112.49-4.51A126.48 126.48 0 01275 292c18.17 24 29 52.42 29 76 0 22.24-5.42 39.77-15.67 50.69z' />
        </svg>
        <span className='font-semibold text-neutral-700 dark:text-neutral-200'>根据灾情筛选</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`absolute right-3 h-auto w-5 fill-neutral-700 stroke-neutral-700 dark:fill-neutral-200 dark:stroke-neutral-200 ${isFRPOpen ? 'rotate-180' : ''} transform duration-150`}
          viewBox='0 0 512 512'
        >
          <path
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='48'
            d='M112 328l144-144 144 144'
          />
        </svg>
      </div>
      <motion.ul className='transform duration-150'>
        {isFRPOpen &&
          ['FRP < 10MW', '10MW < FRP < 100MW', 'FRP > 100MW'].map((item, i) => (
            <motion.li
              key={i}
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: i * 0.05,
                duration: 0.2,
              }}
              className='flex cursor-pointer gap-x-5 rounded-md p-2 text-neutral-700 hover:bg-neutral-100 dark:hover:bg-gray-800'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-auto w-3 stroke-neutral-700 dark:stroke-neutral-200'
                viewBox='0 0 512 512'
              >
                <path
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='48'
                  d='M184 112l144 144-144 144'
                />
              </svg>
              <span className='text-sm text-neutral-700 dark:text-neutral-200'>{item}</span>
            </motion.li>
          ))}
      </motion.ul>
    </div>
  )
}
