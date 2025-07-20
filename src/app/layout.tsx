import '../styles/globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import 'antd/dist/reset.css'

export const metadata = {
  title: 'Hobbiton Insurance',
  description: 'Get a quick motor insurance quote online',
  icons: {
    icon: '/hobbiton2.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/hobbiton2.png" type="image/png" />
      </head>
      <body className="bg-light text-dark font-sans antialiased">
        <Header />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
} 