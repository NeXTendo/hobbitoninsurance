'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-primary text-white py-16"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo & Mission */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/hobbiton2.png"
              alt="Hobbiton Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-semibold tracking-wide">Hobbiton Technologies</span>
          </div>
          <p className="text-sm leading-relaxed opacity-90 max-w-xs">
            Building digital solutions that elevate user experiences in savings, insurance, lending, and payments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-wide">Quick Links</h3>
          <ul className="space-y-3 text-sm opacity-90 max-w-xs">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li><Link href="/quote" className="hover:text-accent transition">Get Quote</Link></li>
            <li><Link href="/insurance" className="hover:text-accent transition">Insurance</Link></li>
            <li><Link href="/savings" className="hover:text-accent transition">Savings</Link></li>
            <li><Link href="/loans" className="hover:text-accent transition">Loans</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-wide">Contact Us</h3>
          <ul className="space-y-4 text-sm opacity-90 max-w-xs">
            <li className="flex items-center gap-3">
              <PhoneIcon className="w-6 h-6 text-accent" />
              <span>+260 977 000 000</span>
            </li>
            <li className="flex items-center gap-3">
              <EnvelopeIcon className="w-6 h-6 text-accent" />
              <span>support@hobbiton.co.zm</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon className="w-6 h-6 text-accent" />
              <span>Lusaka, Zambia</span>
            </li>
          </ul>
        </div>

        {/* Social & External */}
        <div>
          <h3 className="text-lg font-semibold mb-6 tracking-wide">Follow Us</h3>
          <ul className="space-y-4 text-sm opacity-90 max-w-xs">
            {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com/company/hobbiton' },
              { name: 'Twitter', url: 'https://twitter.com/hobbiton_tech' },
            ].map(({ name, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent transition transform hover:scale-110"
                >
                  {name} <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-16 text-center text-xs text-white/60 tracking-wide select-none">
        &copy; {new Date().getFullYear()} Hobbiton Technologies Limited. All rights reserved.
      </div>
    </motion.footer>
  )
}
