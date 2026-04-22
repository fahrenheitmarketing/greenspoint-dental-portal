import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/user_696032597527e77c90fca3ba/15765cb4d_image.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Banner */}
      <div className="bg-primary relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="floral-pattern-footer" patternUnits="userSpaceOnUse" width="200" height="200">
              <path d="M50,100 Q40,90 45,75 Q50,85 50,100" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
              <path d="M150,100 Q160,90 155,75 Q150,85 150,100" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
              <circle cx="100" cy="100" r="15" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="100" cy="100" r="8" fill="#ffffff" opacity="0.4"/>
              <path d="M100,60 Q95,70 100,80 Q105,70 100,60" fill="#ffffff" opacity="0.5"/>
              <path d="M100,120 Q95,110 100,100 Q105,110 100,120" fill="#ffffff" opacity="0.5"/>
              <path d="M60,100 Q70,95 80,100 Q70,105 60,100" fill="#ffffff" opacity="0.5"/>
              <path d="M140,100 Q130,95 120,100 Q130,105 140,100" fill="#ffffff" opacity="0.5"/>
              <circle cx="50" cy="50" r="3" fill="#ffffff" opacity="0.4"/>
              <circle cx="150" cy="150" r="3" fill="#ffffff" opacity="0.4"/>
              <path d="M30,30 Q35,25 40,30 Q35,35 30,30" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4"/>
              <path d="M170,170 Q175,165 180,170 Q175,175 170,170" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#floral-pattern-footer)" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-3">
            Your Smile Deserves Compassionate Care
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            No judgment. No pressure. Just honest, affordable dental care for you and your family. Se habla español.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Schedule Your Visit Today
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={LOGO_URL} alt="Greenspoint Dental" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              Serving the Greenspoint community with compassionate, affordable dental care since 1997. Our bilingual team is here to help you smile with confidence.
            </p>
            <div className="flex items-center gap-2 text-secondary text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>A Judgment-Free Practice</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Financing & Insurance', path: '/financing' },
                { label: 'New Patients', path: '/new-patients' },
                { label: 'Blog', path: '/blog' },
                { label: 'Contact Us', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-background/60 hover:text-secondary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg mb-4">Services</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'General Dentistry', path: '/services/general' },
                { label: 'Cosmetic Dentistry', path: '/services/cosmetic' },
                { label: 'Restorative Dentistry', path: '/services/restorative' },
                { label: 'Orthodontics', path: '/services/orthodontics' },
                { label: 'Emergency Dental Care', path: '/services/general' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-background/60 hover:text-secondary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg mb-4">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <div>
                  <a href="tel:2818239987" className="text-background/80 hover:text-secondary transition-colors text-sm">
                    (281) 823-9987
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <p className="text-background/60 text-sm">
                  12523 Greenspoint Drive<br />Houston, TX 77060
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <div className="text-background/60 text-sm space-y-0.5">
                  <p>Mon: 8am–4pm</p>
                  <p>Tue: 8am–12pm</p>
                  <p>Wed–Thu: 8am–5pm</p>
                  <p>Fri: 8am–12pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-background/40">
          <p>© {new Date().getFullYear()} Greenspoint Dental. All rights reserved.</p>
          <p>Cosmetic | Family | Orthodontics</p>
        </div>
      </div>
    </footer>
  );
}