'use client'

import { Modal } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Image from 'next/image'
import { gsap } from 'gsap'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

interface Content {
  title: string
  text: string
  image: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  contentIndex: number
  contentList: Content[]
  setIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export default function ReadMoreModal({
  isOpen,
  onClose,
  contentIndex,
  contentList,
  setIndex,
}: ModalProps) {
  const content = contentList[contentIndex]
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (animating) return
      if (e.key === 'ArrowLeft') previous()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, animating])

  useEffect(() => {
    if (!imageRef.current) return
    setAnimating(true)
    const tl = gsap.timeline({
      onComplete: () => setAnimating(false),
    })
    tl.to(imageRef.current, { opacity: 0, x: -50, duration: 0.3, ease: 'power1.out' })
      .set(imageRef.current, { x: 50 })
      .to(imageRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power1.in' })
  }, [contentIndex])

  const previous = () => {
    if (animating) return
    setIndex((prev) =>
      prev === null ? contentList.length - 1 : prev > 0 ? prev - 1 : contentList.length - 1
    )
  }

  const next = () => {
    if (animating) return
    setIndex((prev) =>
      prev === null ? 0 : (prev + 1) % contentList.length
    )
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: previous,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const nextIndex = (contentIndex + 1) % contentList.length
  const nextImage = contentList[nextIndex]?.image

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          open={isOpen}
          onCancel={onClose}
          footer={null}
          centered
          closable={false}
          width={600}
          className="!p-0 !bg-transparent"
          wrapClassName="custom-glass-modal"
          styles={{
            body: {
              padding: 0,
              borderRadius: 24,
              overflow: 'hidden',
              background: 'transparent',
              maxHeight: '85vh',
              margin: 'auto',
            },
          }}
          getContainer={false}
          forceRender
        >
          <motion.div
            {...swipeHandlers}
            ref={containerRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ touchAction: 'pan-y' }}
            className="relative w-full max-h-[85vh] overflow-hidden rounded-3xl bg-white/20 backdrop-blur-xl shadow-lg text-white select-none"
          >
            {/* Preload next image */}
            {nextImage && (
              <Image
                src={nextImage}
                alt="Preload"
                width={1}
                height={1}
                className="hidden"
                priority
              />
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-red-400 z-30"
              aria-label="Close modal"
              disabled={animating}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Navigation Buttons vertical sides */}
            <button
              onClick={previous}
              className="hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 items-center gap-2 text-white hover:text-hobbiton-accent transition z-30 select-none"
              aria-label="Previous content"
              disabled={animating}
            >
              <ArrowLeftIcon className="w-6 h-6" />
              <span>Previous</span>
            </button>
            <button
              onClick={next}
              className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 items-center gap-2 text-white hover:text-hobbiton-accent transition z-30 select-none"
              aria-label="Next content"
              disabled={animating}
            >
              <span>Next</span>
              <ArrowRightIcon className="w-6 h-6" />
            </button>

            {/* Image + animate on swipe */}
            <motion.div
              ref={imageRef}
              key={content.image}
              className="relative w-full h-48 sm:h-64 md:h-72 rounded-t-3xl overflow-hidden"
            >
              <Image
                src={content.image}
                alt={content.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Text Content with dark overlay for readability */}
            <div className="relative p-6 max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 z-20 bg-black/30 rounded-b-3xl">
              <motion.h2
                key={content.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 drop-shadow-md"
              >
                {content.title}
              </motion.h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow-sm">
                {content.text}
              </p>
            </div>

            {/* Mobile Dot Pagination */}
            <div className="flex justify-center gap-2 mt-3 mb-5 md:hidden z-30">
              {contentList.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => !animating && setIndex(i)}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: i === contentIndex ? 1.3 : 1,
                    opacity: i === contentIndex ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`h-3 w-3 rounded-full ${
                    i === contentIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  disabled={animating}
                />
              ))}
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
