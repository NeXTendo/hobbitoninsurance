'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxBackground() {
  const bgRef = useRef<HTMLDivElement>(null)
  const [disableParallax, setDisableParallax] = useState(false)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null)

  // Device capability check
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory <= 2
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth < 768

    if (prefersReducedMotion || isLowMemory || isTouchDevice || isSmallScreen) {
      setDisableParallax(true)
    }
  }, [])

  // Scroll trigger animation
  useEffect(() => {
    if (disableParallax || !bgRef.current) return

    const animation = gsap.to(bgRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

scrollTriggerInstance.current = animation.scrollTrigger ?? null

    return () => {
      // Kill scrollTrigger instance
      scrollTriggerInstance.current?.kill()
      scrollTriggerInstance.current = null
    }
  }, [disableParallax])

  return (
    <div
      ref={bgRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 bg-cover bg-center transition-all duration-500 ${
        disableParallax ? 'opacity-60 blur-sm' : ''
      }`}
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundAttachment: 'fixed',
      }}
    />
  )
}
