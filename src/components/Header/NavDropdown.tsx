'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

interface NavDropdownProps {
  label: string
  items: string[]
}

export default function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-gray-700 hover:text-primary transition"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>

      <div
        className={clsx(
          'absolute left-0 mt-2 w-40 bg-white border shadow-lg rounded-md overflow-hidden z-20',
          open ? 'block' : 'hidden'
        )}
        role="menu"
      >
        {items.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
            role="menuitem"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}
