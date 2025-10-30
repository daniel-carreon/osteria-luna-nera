'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
          alt="Elegant restaurant interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center space-y-8 px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-background text-shadow-gold">
            Osteria Luna Nera
          </h1>
          <p className="text-2xl md:text-4xl font-italiana text-secondary">
            Fine Italian Dining
          </p>
          <p className="text-lg md:text-xl text-background max-w-2xl mx-auto font-light">
            Experience authentic Italian haute cuisine in the heart of Manhattan.
            Where tradition meets contemporary excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#menu"
              className="px-8 py-4 gold-gradient text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View Menu
            </a>
            <button
              onClick={() => {
                // This will trigger the chat widget
                const chatButton = document.querySelector('[data-chat-button]') as HTMLElement
                chatButton?.click()
              }}
              className="px-8 py-4 bg-transparent border-2 border-secondary text-background font-semibold rounded-lg hover:bg-secondary/20 transition-all duration-300"
            >
              Make Reservation
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-secondary" />
          </div>
        </div>
      </div>
    </section>
  )
}
