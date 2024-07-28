import { motion } from 'framer-motion'

export default function Homepage() {
  return (
    <main className='w-full'>
      <div className='mx-auto max-w-7xl px-6 pt-24 sm:pt-32 md:pt-48 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <motion.div
            className='max-w-3xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className='text-balance font-serif text-5xl font-medium tracking-tight text-neutral-950 sm:text-7xl dark:text-gray-100'>
              Deep Learning-Based Multimodal Species Intelligence Identification
              {/* 基于深度学习的多模态物种智能识别 */}
            </h1>
            <p className='mt-6 font-serif text-xl text-neutral-600 dark:text-slate-400'>
              We develop multimodal neural networks for species recognition, utilizing
              EfficientNet-B0 and BirdNET-Analyzer with transfer learning. Our models use frame
              differencing and weighted fusion to enhance accuracy across image, audio, and video
              modalities.
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
            <h1 className='text-balance font-serif text-5xl font-medium tracking-tight text-neutral-950 sm:text-7xl dark:text-gray-100'>
              Deep Learning-Based Multimodal Species Intelligence Identification
              {/* 基于深度学习的多模态物种智能识别 */}
            </h1>
            <p className='mt-6 font-serif text-xl text-neutral-600 dark:text-slate-400'>
              We develop multimodal neural networks for species recognition, utilizing
              EfficientNet-B0 and BirdNET-Analyzer with transfer learning. Our models use frame
              differencing and weighted fusion to enhance accuracy across image, audio, and video
              modalities.
              {/* 我们开发了用于物种识别的多模态神经网络模型，采用EfficientNet-B0和BirdNET-Analyzer进行迁移学习。该模型通过帧差分和加权融合技术极大地提高了图像、音频和视频模态的识别精度。 */}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
