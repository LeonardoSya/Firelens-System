import { motion } from 'framer-motion'
import MyHeader from '@/components/header'
import Navigation from '@/components/navigation'
import { useAppSelector } from '@/app/redux-hooks'

export default function HomePage() {
  const isOpen = useAppSelector(state => state.menu.isOpen)

  return (
    <div className='-z-10 bg-purple-600 pt-2'>
      <div className='w-full h-full bg-white rounded-t-4xl rounded-b-none'>
        <MyHeader />
        <Navigation isOpen={isOpen} />
        {isOpen && <div className='z-5 fixed inset-0 bg-slate-300/50' />}
        <main className='w-full flex-auto'>
          <div className='mx-auto mt-24 max-w-7xl px-6 sm:mt-32 md:mt-56 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:max-w-none'>
              <motion.div
                className='max-w-3xl'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
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
      </div>
    </div>
  )
}
