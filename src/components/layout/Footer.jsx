import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/user_696032597527e77c90fca3ba/15765cb4d_image.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Banner */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
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

      {/* Brand Section */}
      <div className="bg-background border-b-4 border-foreground py-12">
        <div className="max-w-7xl mx-auto px-4">
          <img src={LOGO_URL} alt="Greenspoint Dental" className="h-16 w-auto mb-4" />
          <p className="text-foreground/70 text-sm leading-relaxed mb-4 max-w-2xl">
            Serving the Greenspoint community with compassionate, affordable dental care since 1997. Our bilingual team is here to help you smile with confidence.
          </p>
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <Heart className="w-4 h-4" />
            <span>A Judgment-Free Practice</span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

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
      </div>

      {/* Bottom bar */}
      <div className="bg-foreground border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-background/40">
          <p>© {new Date().getFullYear()} Greenspoint Dental. All rights reserved.</p>
          <p>Cosmetic | Family | Orthodontics</p>
        </div>
      </div>
    </footer>
  );
}