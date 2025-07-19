'use client'

import { useEffect, useState } from 'react'

export default function Counter({
  label,
  value,
  suffix = '',
  duration = 2000,
}: {
  label: string
  value: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const increment = end / (duration / 30)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      setCount(Math.round(start))
    }, 30)

    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <div>
      <p className="text-4xl font-bold text-primary">
        {count}
        {suffix}
      </p>
      <p className="text-gray-700 mt-2">{label}</p>
    </div>
  )
}
