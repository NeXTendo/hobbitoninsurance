import '../styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import 'antd/dist/reset.css'

export const metadata = {
  title: 'Motor Insurance | Hobbiton Technologies',
  description: 'Get a quick motor insurance quote online',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-light text-dark font-sans antialiased">
        <Header />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}