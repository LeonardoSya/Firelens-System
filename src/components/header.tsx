import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Icon from '@/assets/finger-print-outline.svg'
import MenuOpen from '@/assets/menu-outline.svg'
import MenuClose from '@/assets/close-outline.svg'

export default function MyHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className='py-10'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <nav className='relative z-50 flex justify-between'>
            <div className='flex items-center md:gap-x-12'>
              <a href='#' aria-label='Home' className='flex'>
                <img src={Icon} className='h-auto w-7' />
                <h2 className='p-1 font-mono text-2xl text-slate-950'>EcoAI</h2>
              </a>
              <div className='hidden md:flex md:gap-x-6'>
                <a
                  href='#'
                  className='inline-block transform rounded-lg px-2 py-1 tracking-widest text-slate-700 duration-75 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                >
                  物种识别
                </a>
                <a
                  href='#'
                  className='inline-block transform rounded-lg px-2 py-1 tracking-widest text-slate-700 duration-75 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                >
                  探索地图
                </a>
                <a
                  href='#'
                  className='inline-block transform rounded-lg px-2 py-1 tracking-widest text-slate-700 duration-75 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                >
                  社区视野
                </a>
              </div>
            </div>
            <div className='flex items-center gap-x-5 md:gap-x-8'>
              <div className='hidden md:block'>
                <a
                  href='#'
                  className='inline-block transform rounded-lg px-2 py-1 tracking-widest text-slate-700 duration-75 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-slate-400'
                >
                  登录
                </a>
              </div>
              <motion.a
                href='#'
                whileTap={{scale:0.95,transition:{duration:0.05} }}
                className='inline-flex transform items-center justify-center rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white duration-100 hover:bg-purple-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-purple-600 active:bg-purple-600'
              >
                <span>
                  Get started <span className='hidden lg:inline'>today</span>
                </span>
              </motion.a>
              <div className='md:hidden'>
                <button onClick={() => setIsOpen(!isOpen)}>
                  <img src={isOpen ? MenuClose : MenuOpen} className='h-7 w-auto' />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
