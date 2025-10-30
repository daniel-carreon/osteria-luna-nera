import { Wine, Clock, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Wine className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="text-xl font-serif font-bold">Osteria Luna Nera</h3>
                <p className="text-sm font-italiana text-secondary">
                  Fine Italian Dining
                </p>
              </div>
            </div>
            <p className="text-sm text-background-dark">
              Experience authentic Italian haute cuisine in the heart of Manhattan.
              Our contemporary approach to traditional recipes creates an unforgettable
              dining experience.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 text-secondary">
              Hours
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold">Tuesday - Saturday</p>
                  <p className="text-background-dark">5:30 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold">Sunday</p>
                  <p className="text-background-dark">5:00 PM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-semibold">Monday</p>
                  <p className="text-background-dark">Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 text-secondary">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+12125550147"
                className="flex items-center space-x-2 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>+1 (212) 555-0147</span>
              </a>
              <a
                href="mailto:reservations@osterialunanera.com"
                className="flex items-center space-x-2 hover:text-secondary transition-colors"
              >
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>reservations@osterialunanera.com</span>
              </a>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                <div>
                  <p>245 Madison Avenue</p>
                  <p className="text-background-dark">New York, NY 10016</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary/30 text-center text-sm text-background-dark">
          <p>© 2025 Osteria Luna Nera. All rights reserved.</p>
          <p className="mt-1 font-italiana">Buon Appetito!</p>
        </div>
      </div>
    </footer>
  )
}
