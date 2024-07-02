import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import { useAppDispatch, useAppSelector } from '@/app/redux-hooks'
import { toggle } from '@/features/menu-slice'

const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.5, staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function HomePage() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state.menu.isOpen)
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false)
  const [headerAnimation, setHeaderAnimation] = useState({ y: 0 })

  useEffect(() => {
    isHeaderCollapsed ? setHeaderAnimation({ y: 200 }) : setHeaderAnimation({ y: 0 })
  }, [isHeaderCollapsed])

  return (
    <div className='-z-10 bg-zinc-950 pt-4'>
      {/* back-header */}
      <header className={`-z-5 absolute w-full ${!isHeaderCollapsed && 'hidden'}`}>
        <div className='pb-8 pt-14'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            {/* back-header-nav */}
            <nav className='relative flex justify-between'>
              <div className='flex items-center md:gap-x-12'>
                <a
                  href='#'
                  aria-label='Home'
                  className='flex transform items-end rounded-lg duration-75 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400 md:gap-x-2'
                >
                  <h2 className='px-1 font-serif text-2xl tracking-wide md:text-3xl'>EcoAI</h2>
                  <h4 className='hidden p-1 font-serif text-sm sm:block md:pb-0 md:text-base'>
                    web frontend created by LeonardoSya
                  </h4>
                </a>
              </div>
              <div className='flex items-center gap-x-4 md:gap-x-6'>
                <button className='inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-950 transition duration-200 hover:bg-neutral-200 active:bg-neutral-200 md:py-2'>
                  Contact me
                </button>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7' viewBox='0 0 512 512'>
                  <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='32'
                    d='M368 368L144 144M368 144L144 368'
                  />
                </svg>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <motion.div
        className='h-full w-full rounded-t-4xl rounded-b-none bg-white'
        initial={{ y: 30 }}
        animate={headerAnimation}
        transition={{
          duration: 0.3,
          ease: [0.42, 0, 0.58, 1],
          type: 'spring',
          stiffness: 300,
          damping: 18,
        }}
      >
        <motion.div className='absolute inset-x-0 flex items-center justify-center'>
          <button onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}>
            <motion.svg
              xmlns='http://www.w3.org/2000/svg'
              className='mx-auto w-16 rounded-none text-black/30'
              viewBox='0 0 512 512'
              whileHover={{
                scale: 1.2,
                transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
              }}
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='32'
                d='M400 256H112'
              />
            </motion.svg>
          </button>
        </motion.div>

        {/* front-header */}
        <header className='py-10'>
          <div className='mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8'>
            <motion.nav
              variants={headerContainerVariants}
              initial='hidden'
              animate='visible'
              className='relative flex justify-between'
            >
              <div className='flex items-center md:gap-x-12'>
                <motion.a
                  href='#'
                  aria-label='Home'
                  variants={itemVariants}
                  className='flex transform items-center rounded-lg duration-75 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400 md:gap-x-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-auto w-7'
                    viewBox='0 0 512 512'
                    style={{ fill: '#7021c4' }}
                  >
                    <path d='M390.42 75.28a10.45 10.45 0 01-5.32-1.44C340.72 50.08 302.35 40 256.35 40c-45.77 0-89.23 11.28-128.76 33.84C122 77 115.11 74.8 111.87 69a12.4 12.4 0 014.63-16.32A281.81 281.81 0 01256.35 16c49.23 0 92.23 11.28 139.39 36.48a12 12 0 014.85 16.08 11.3 11.3 0 01-10.17 6.72zm-330.79 126a11.73 11.73 0 01-6.7-2.16 12.26 12.26 0 01-2.78-16.8c22.89-33.6 52-60 86.69-78.48 72.58-38.84 165.51-39.12 238.32-.24 34.68 18.48 63.8 44.64 86.69 78a12.29 12.29 0 01-2.78 16.8 11.26 11.26 0 01-16.18-2.88c-20.8-30.24-47.15-54-78.36-70.56-66.34-35.28-151.18-35.28-217.29.24-31.44 16.8-57.79 40.8-78.59 71a10 10 0 01-9.02 5.08zM204.1 491a10.66 10.66 0 01-8.09-3.6C175.9 466.48 165 453 149.55 424c-16-29.52-24.27-65.52-24.27-104.16 0-71.28 58.71-129.36 130.84-129.36S387 248.56 387 319.84a11.56 11.56 0 11-23.11 0c0-58.08-48.32-105.36-107.72-105.36S148.4 261.76 148.4 319.84c0 34.56 7.39 66.48 21.49 92.4 14.8 27.6 25 39.36 42.77 58.08a12.67 12.67 0 010 17 12.44 12.44 0 01-8.56 3.68zm165.75-44.4c-27.51 0-51.78-7.2-71.66-21.36a129.1 129.1 0 01-55-105.36 11.57 11.57 0 1123.12 0 104.28 104.28 0 0044.84 85.44c16.41 11.52 35.6 17 58.72 17a147.41 147.41 0 0024-2.4c6.24-1.2 12.25 3.12 13.4 9.84a11.92 11.92 0 01-9.47 13.92 152.28 152.28 0 01-27.95 2.88zM323.38 496a13 13 0 01-3-.48c-36.76-10.56-60.8-24.72-86-50.4-32.37-33.36-50.16-77.76-50.16-125.28 0-38.88 31.9-70.56 71.19-70.56s71.2 31.68 71.2 70.56c0 25.68 21.5 46.56 48.08 46.56s48.08-20.88 48.08-46.56c0-90.48-75.13-163.92-167.59-163.92-65.65 0-125.75 37.92-152.79 96.72-9 19.44-13.64 42.24-13.64 67.2 0 18.72 1.61 48.24 15.48 86.64 2.32 6.24-.69 13.2-6.7 15.36a11.34 11.34 0 01-14.79-7 276.39 276.39 0 01-16.88-95c0-28.8 5.32-55 15.72-77.76 30.75-67 98.94-110.4 173.6-110.4 105.18 0 190.71 84.24 190.71 187.92 0 38.88-31.9 70.56-71.2 70.56s-71.2-31.68-71.2-70.56c.01-25.68-21.49-46.6-48.07-46.6s-48.08 20.88-48.08 46.56c0 41 15.26 79.44 43.23 108.24 22 22.56 43 35 75.59 44.4 6.24 1.68 9.71 8.4 8.09 14.64a11.39 11.39 0 01-10.87 9.16z' />
                  </svg>
                  <h2 className='p-1 font-serif text-2xl tracking-wide text-slate-950 md:text-3xl'>
                    EcoAI
                  </h2>
                </motion.a>
                <motion.div
                  variants={headerContainerVariants}
                  className='hidden md:flex md:gap-x-6'
                >
                  <motion.a
                    href='#'
                    variants={itemVariants}
                    className='inline-block transform rounded-lg px-2 py-1 tracking-widest text-slate-700 duration-75 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                  >
                    物种识别
                  </motion.a>
                  <motion.a
                    href='#'
                    variants={itemVariants}
                    className='inline-block transform rounded-lg px-2 py-1 tracking-widest text-slate-700 duration-75 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                  >
                    探索地图
                  </motion.a>
                  <motion.a
                    href='#'
                    variants={itemVariants}
                    className='inline-block transform rounded-lg px-2 py-1 tracking-widest text-slate-700 duration-75 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                  >
                    社区视野
                  </motion.a>
                </motion.div>
              </div>
              <div className='flex items-center gap-x-5 md:gap-x-8'>
                <motion.div className='hidden md:block' variants={itemVariants}>
                  <a
                    href='#'
                    className='text-md inline-block transform rounded-lg px-3 py-1 font-semibold tracking-wide text-purple-600 duration-75 hover:bg-slate-100 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                  >
                    Sign in
                  </a>
                </motion.div>
                <motion.a
                  href='#'
                  variants={itemVariants}
                  whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
                  className='inline-flex transform items-center justify-center rounded-full bg-purple-600 px-4 py-1.5 text-sm font-semibold text-white duration-100 hover:bg-purple-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-purple-600 active:bg-purple-600 md:py-2'
                >
                  <span>
                    Get started <span className='hidden lg:inline'>today</span>
                  </span>
                </motion.a>
                <div className='z-10 flex md:hidden'>
                  <motion.button variants={itemVariants} onClick={() => dispatch(toggle())}>
                    {isOpen ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-auto text-slate-950'
                        viewBox='0 0 512 512'
                      >
                        <path
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='32'
                          d='M368 368L144 144M368 144L144 368'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-auto text-slate-950'
                        viewBox='0 0 512 512'
                      >
                        <path
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeMiterlimit='10'
                          strokeWidth='32'
                          d='M80 160h352M80 256h352M80 352h352'
                        />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.nav>
          </div>
        </header>
        <Navigation isOpen={isOpen} />
        {isOpen && (
          <div
            className={`z-5 fixed inset-0 ${!isHeaderCollapsed && 'mt-4'} rounded-t-4xl bg-slate-300/50`}
          />
        )}

        {/* body */}
        <main className='w-full flex-auto'>
          <div className='mx-auto mt-24 max-w-7xl px-6 sm:mt-32 md:mt-48 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:max-w-none'>
              <motion.div
                className='max-w-3xl'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className='text-balance font-serif text-5xl font-medium tracking-tight text-neutral-950 sm:text-7xl'>
                  Deep Learning-Based Multimodal Species Intelligence Identification
                  {/* 基于深度学习的多模态物种智能识别 */}
                </h1>
                <p className='mt-6 font-serif text-xl text-neutral-600'>
                  We develop multimodal neural networks for species recognition, utilizing
                  EfficientNet-B0 and BirdNET-Analyzer with transfer learning. Our models use frame
                  differencing and weighted fusion to enhance accuracy across image, audio, and
                  video modalities.
                  {/* 我们开发了用于物种识别的多模态神经网络模型，采用EfficientNet-B0和BirdNET-Analyzer进行迁移学习。该模型通过帧差分和加权融合技术极大地提高了图像、音频和视频模态的识别精度。 */}
                </p>
              </motion.div>
            </div>
            <div className='mx-auto max-w-2xl lg:max-w-none'>
              <motion.div
                className='max-w-3xl'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className='text-balance font-serif text-5xl font-medium tracking-tight text-neutral-950 sm:text-7xl'>
                  Deep Learning-Based Multimodal Species Intelligence Identification
                  {/* 基于深度学习的多模态物种智能识别 */}
                </h1>
                <p className='mt-6 font-serif text-xl text-neutral-600'>
                  We develop multimodal neural networks for species recognition, utilizing
                  EfficientNet-B0 and BirdNET-Analyzer with transfer learning. Our models use frame
                  differencing and weighted fusion to enhance accuracy across image, audio, and
                  video modalities.
                  {/* 我们开发了用于物种识别的多模态神经网络模型，采用EfficientNet-B0和BirdNET-Analyzer进行迁移学习。该模型通过帧差分和加权融合技术极大地提高了图像、音频和视频模态的识别精度。 */}
                </p>
              </motion.div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  )
}
