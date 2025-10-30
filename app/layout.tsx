import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'

export const metadata: Metadata = {
  title: 'Osteria Luna Nera | Fine Italian Dining in New York',
  description: 'Experience authentic Italian haute cuisine at Osteria Luna Nera. Located on Madison Avenue, offering the finest contemporary Italian dishes with exceptional service.',
  keywords: 'Italian restaurant, fine dining, New York, Madison Avenue, Italian cuisine, Osteria',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
