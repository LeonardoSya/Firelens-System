import { motion, Variants } from 'framer-motion'
import { Link } from 'react-router-dom'

const menu: Variants = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 20,
    opacity: 1,
  },
}

export default function Navigation({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <motion.ul
        initial='hidden'
        animate={isOpen ? 'visible' : 'hidden'}
        variants={menu}
        className='fixed inset-x-1 top-20 z-10 mx-7 rounded-2xl bg-slate-50 px-4 py-4 shadow-lg shadow-gray-300 ring-1 ring-gray-200 md:hidden'
      >
        <motion.li className='transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <Link to={'/'}>物种识别</Link>
        </motion.li>
        <motion.li className='transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <Link to={'/map'}>探索地图</Link>
        </motion.li>
        <motion.li className='transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <Link to={'/'}>社区视野</Link>
        </motion.li>
        <div className='mx-3 my-2 border-t-2' />
        <motion.li className='transform rounded-lg px-3 py-3 text-lg tracking-widest text-slate-950 duration-75 active:bg-slate-100'>
          <Link to={'/'}>登录</Link>
        </motion.li>
      </motion.ul>
    </>
  )
}
