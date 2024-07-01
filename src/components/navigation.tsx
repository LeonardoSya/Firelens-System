import { motion, Variants } from 'framer-motion'

const menu: Variants = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  visible: {
    y: 20,
    opacity: 1,
  },
}

export default function Navigation({ isOpen, setIsOpen }) {
  return (
    <>
      <motion.ul
        initial='hidden'
        animate={isOpen ? 'visible' : 'hidden'}
        variants={menu}
        className='relative -top-5 z-50 mx-7 rounded-lg px-4 py-4 shadow-lg shadow-gray-300 ring-1 ring-gray-200 md:hidden'
      >
        <motion.li className='inline-bock transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <a href='#'>物种识别</a>
        </motion.li>
        <motion.li className='inline-bock transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <a href='#'>探索地图</a>
        </motion.li>
        <motion.li className='inline-bock transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <a href='#'>社区视野</a>
        </motion.li>
        <div className='my-2 border-t-2 mx-3' />
        <motion.li className='inline-bock transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <a href='#'>登录</a>
        </motion.li>
      </motion.ul>
    </>
  )
}
