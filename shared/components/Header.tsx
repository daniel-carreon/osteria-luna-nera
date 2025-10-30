'use client'

import Link from 'next/link'
import { Wine, Phone, MapPin } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-secondary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Wine className="w-8 h-8 text-secondary group-hover:text-secondary-light transition-colors" />
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">
                Osteria Luna Nera
              </h1>
              <p className="text-xs font-italiana text-secondary">
                Fine Italian Dining
              </p>
            </div>
          </Link>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <a
              href="tel:+12125550147"
              className="flex items-center space-x-2 text-primary-light hover:text-secondary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+1 (212) 555-0147</span>
            </a>
            <div className="flex items-center space-x-2 text-primary-light">
              <MapPin className="w-4 h-4" />
              <span>245 Madison Ave, NYC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
