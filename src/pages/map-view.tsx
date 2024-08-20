import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/app/redux-hooks'
import { RootState } from '@/app/store'
import { setMonth, setDay, setNight, selectDayNight } from '@/features/filter-slice'
import MyMap from './map'

export default function MapView() {
  return (
    <>
      <MyMap />
      <SideMenu />
    </>
  )
}

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [itemOpen, setItemOpen] = useState(1)
  const dispatch = useAppDispatch()
  const dayNight = useAppSelector(selectDayNight)
  const selectMonth = useAppSelector((state: RootState) => state.filter.month)

  const dates = [
    { label: '2024-08', value: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-07-14_to_2024-08-14' },
    { label: '2024-06', value: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-05-14_to_2024-06-14' },
    { label: '2024-05', value: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-04-14_to_2024-05-14' },
    { label: '2024-04', value: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-03-14_to_2024-04-14' },
    { label: '2024-03', value: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-02-14_to_2024-03-14' },
    { label: '2024-02', value: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-01-14_to_2024-02-14' },
    { label: '2024-01', value: 'EastAsia_VNP14IMGTDL_NRT_FireData_2023-12-14_to_2024-01-14' },
  ]

  const dayNightLabels = ['白天', '夜晚']

  const handleDateClick = (value: any) => {
    dispatch(setMonth(value))
  }

  const handleDayNightClick = (i: number) => {
    dispatch(i === 0 ? setDay(!dayNight.day) : setNight(!dayNight.night))
  }

  return (
    <div
      className={`absolute -left-56 top-60 w-56 rounded-r-xl bg-white p-4 transition duration-300 ease-in-out dark:bg-gradient-to-t dark:from-gray-800 dark:to-gray-950 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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

      {/* 筛选监测时段 */}
      <div
        key={1}
        onClick={() => {
          itemOpen !== 1 ? setItemOpen(1) : setItemOpen(0)
        }}
        className={` ${itemOpen === 1 ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-900' : 'hover:bg-gray-100 dark:hover:bg-gray-900'} my-2 flex transform cursor-pointer items-center gap-x-3 rounded-md p-3 duration-150`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-auto w-6 fill-neutral-700 dark:fill-neutral-200'
          viewBox='0 0 512 512'
        >
          <path d='M416 64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4v-12a64 64 0 00-64-64zM476 176H36a4 4 0 00-4 4v236a64 64 0 0064 64h320a64 64 0 0064-64V180a4 4 0 00-4-4zM239.58 401.1c-12.17 9.61-28.75 14.9-46.7 14.9-27.87 0-48.48-18.16-57.66-33.7a16 16 0 0127.56-16.3c1.08 1.84 11.15 18 30.1 18 16.66 0 36.12-7.29 36.12-27.82 0-6.25-1.22-14.95-7-20.88-8.54-8.74-22.75-12.67-30.11-12.67a16 16 0 010-32c4.85 0 17.41-2.6 25.28-10.65a22 22 0 006.57-16.08c0-23.23-28.63-23.9-31.89-23.9-17.34 0-23.8 10.61-24.07 11.06a16 16 0 11-27.55-16.26c7.64-13 25.22-26.8 51.62-26.8 16.44 0 31.76 4.77 43.13 13.42 13.39 10.2 20.76 25.28 20.76 42.48A54 54 0 01240 302.35c-1.15 1.18-2.36 2.28-3.59 3.35a66.18 66.18 0 018.42 7.23c10.56 10.8 16.14 25.75 16.14 43.25.03 18.06-7.58 34.01-21.39 44.92zM368 396a16 16 0 01-32 0V256.29l-22.51 16.59a16 16 0 11-19-25.76l43.42-32a16 16 0 019.49-3.12h4.6a16 16 0 0116 16z' />
        </svg>
        <span className='font-semibold text-neutral-700 dark:text-neutral-200'>筛选监测时段</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`absolute right-3 h-auto w-5 stroke-neutral-700 dark:stroke-neutral-200 ${itemOpen === 1 ? 'rotate-180' : ''} transform duration-150`}
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
        {itemOpen === 1 &&
          dates.map((date, i) => (
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
              className={`flex transform cursor-pointer gap-x-5 rounded-md p-2 text-neutral-700 duration-75 hover:bg-neutral-100 dark:hover:bg-gray-900 ${
                selectMonth === date.value
                  ? 'bg-neutral-200 hover:bg-neutral-200 dark:bg-gray-700 dark:hover:bg-gray-700'
                  : ''
              }`}
              onClick={() => handleDateClick(date.value)}
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
              <span className='text-sm text-neutral-700 dark:text-neutral-200'>{date.label}</span>
            </motion.li>
          ))}
      </motion.ul>

      {/* 筛选受灾严重度 */}
      <div
        key={2}
        onClick={() => {
          itemOpen !== 2 ? setItemOpen(2) : setItemOpen(0)
        }}
        className={` ${itemOpen === 2 ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} my-2 flex transform cursor-pointer items-center gap-x-3 rounded-md p-3 duration-150`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-auto w-6 fill-neutral-700 dark:fill-neutral-200'
          viewBox='0 0 512 512'
        >
          <path d='M394.23 197.56a300.43 300.43 0 00-53.37-90C301.2 61.65 249.05 32 208 32a16 16 0 00-15.48 20c13.87 53-14.88 97.07-45.31 143.72C122 234.36 96 274.27 96 320c0 88.22 71.78 160 160 160s160-71.78 160-160c0-43.3-7.32-84.49-21.77-122.44zm-105.9 221.13C278 429.69 265.05 432 256 432s-22-2.31-32.33-13.31S208 390.24 208 368c0-25.14 8.82-44.28 17.34-62.78 4.95-10.74 10-21.67 13-33.37a8 8 0 0112.49-4.51A126.48 126.48 0 01275 292c18.17 24 29 52.42 29 76 0 22.24-5.42 39.77-15.67 50.69z' />
        </svg>
        <span className='font-semibold text-neutral-700 dark:text-neutral-200'>受灾严重度</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`absolute right-3 h-auto w-5 fill-neutral-700 stroke-neutral-700 dark:fill-neutral-200 dark:stroke-neutral-200 ${itemOpen === 2 ? 'rotate-180' : ''} transform duration-150`}
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
        {itemOpen === 2 &&
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

      {/* 受灾时间 */}
      <div
        key={3}
        onClick={() => (itemOpen !== 3 ? setItemOpen(3) : setItemOpen(0))}
        className={` ${itemOpen === 3 ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} my-2 flex transform cursor-pointer items-center gap-x-3 rounded-md p-3 duration-150`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-auto w-6 fill-neutral-700 dark:fill-neutral-200'
          viewBox='0 0 512 512'
        >
          <path
            d='M388.31 272c47.75 0 89.77-27.77 107.69-68.92-14.21 6.18-30.9 8.61-47.38 8.61A116.31 116.31 0 01332.31 95.38c0-16.48 2.43-33.17 8.61-47.38C299.77 65.92 272 107.94 272 155.69a116.31 116.31 0 003.44 28.18'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
          />
          <path
            d='M90.61 306.85A16.07 16.07 0 00104 293.6C116.09 220.17 169.63 176 232 176c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0012.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H106c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95z'
            stroke='currentColor'
            strokeLinejoin='round'
            strokeWidth='32'
          />
        </svg>
        <span className='font-semibold text-neutral-700 dark:text-neutral-200'>受灾时间</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`absolute right-3 h-auto w-5 fill-neutral-700 stroke-neutral-700 dark:fill-neutral-200 dark:stroke-neutral-200 ${itemOpen === 3 ? 'rotate-180' : ''} transform duration-150`}
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
      <motion.ul className='transform space-y-2 duration-150'>
        {itemOpen === 3 &&
          dayNightLabels.map((item, i) => (
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
              className={`flex cursor-pointer gap-x-5 rounded-md p-2 ${
                (i === 0 && dayNight.day) || (i === 1 && dayNight.night)
                  ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-gray-700 dark:hover:bg-gray-700'
                  : 'text-neutral-700 dark:text-neutral-100'
              } transform duration-150 hover:bg-neutral-100 dark:hover:bg-gray-700`}
              onClick={() => handleDayNightClick(i)}
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
              <span className='text-sm tracking-widest text-neutral-700 dark:text-neutral-200'>
                {item}
              </span>
            </motion.li>
          ))}
      </motion.ul>
    </div>
  )
}
