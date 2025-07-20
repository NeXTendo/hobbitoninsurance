'use client'

import { useRef, useEffect } from 'react'
import { useScroll, useTransform, useMotionValue } from 'framer-motion'

export function useParallax(speed = 0.2) {
  const ref = useRef<HTMLElement | null>(null)

  const scrollY = useMotionValue(0)

  const y = useTransform(scrollY, [0, 300], [0, -speed * 300])

  useEffect(() => {
    if (!ref.current) return

    const { scrollY: scrollProgress } = useScroll({
      target: ref,
      offset: ['start end', 'end start'],
    })

    const unsubscribe = scrollProgress.on('change', (v) => {
      scrollY.set(v)
    })

    return () => unsubscribe()
  }, [scrollY])

  return { ref, y }
}
