import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_696032597527e77c90fca3ba/15765cb4d_image.png";

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Financing', path: '/financing' },
  { label: 'Blog', path: '/blog' },
  { label: 'New Patients', path: '/new-patients' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:2818239987" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="w-3.5 h-3.5" />
              <span>(281) 823-9987</span>
            </a>
            <span className="hidden sm:inline text-primary-foreground/60">|</span>
            <span className="hidden sm:inline">12523 Greenspoint Dr, Houston, TX 77060</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>English & Español</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={LOGO_URL} alt="Greenspoint Dental" className="h-14 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-6">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setOpen(false)}>
                  <Button className="w-full mt-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}