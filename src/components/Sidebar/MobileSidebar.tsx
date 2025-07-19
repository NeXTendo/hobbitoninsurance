'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface SidebarProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function MobileSidebar({ open, setOpen }: SidebarProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-primary">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/" onClick={() => setOpen(false)} className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link href="/insurance" onClick={() => setOpen(false)} className="text-gray-700 hover:text-primary">
              Insurance
            </Link>
            <Link href="/savings" onClick={() => setOpen(false)} className="text-gray-700 hover:text-primary">
              Savings
            </Link>
            <Link href="/loans" onClick={() => setOpen(false)} className="text-gray-700 hover:text-primary">
              Loans
            </Link>
            <Link href="/quote" onClick={() => setOpen(false)} className="text-gray-700 hover:text-primary">
              Get Quote
            </Link>
          </nav>
        </div>
      </Dialog>
    </Transition>
  )
}
