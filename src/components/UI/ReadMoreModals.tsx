'use client'

import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
  const dialogRef = useRef<HTMLDivElement>(null)

  // ⌨️ Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIndex((prev) => {
          if (prev === null) return contentList.length - 1
          return prev > 0 ? prev - 1 : contentList.length - 1
        })
      }
      if (e.key === 'ArrowRight') {
        setIndex((prev) => {
          if (prev === null) return 0
          return (prev + 1) % contentList.length
        })
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKey)
    }

    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, contentList.length, setIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          initialFocus={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            className="flex items-center justify-center w-full h-full px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose()
            }}
          >
            <motion.div
              ref={dialogRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 space-y-4 focus:outline-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* ❌ Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {/* 🖼 Image using Next.js Image */}
              <div className="w-full h-48 relative rounded-xl overflow-hidden">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* 📝 Text Content */}
              <h2 id="modal-title" className="text-2xl font-semibold">
                {content.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{content.text}</p>

              {/* ⬅️➡️ Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() =>
                    setIndex((prev) => {
                      if (prev === null) return contentList.length - 1
                      return prev > 0 ? prev - 1 : contentList.length - 1
                    })
                  }
                  className="hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  aria-label="Previous content"
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setIndex((prev) => {
                      if (prev === null) return 0
                      return (prev + 1) % contentList.length
                    })
                  }
                  className="hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  aria-label="Next content"
                >
                  <ArrowRightIcon className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
