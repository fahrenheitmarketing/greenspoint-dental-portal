import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_696032597527e77c90fca3ba/15765cb4d_image.png";

// Map between EN and ES route equivalents
const routeMap = {
  en: {
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/services/general': '/services/general',
    '/services/cosmetic': '/services/cosmetic',
    '/services/restorative': '/services/restorative',
    '/services/orthodontics': '/services/orthodontics',
    '/financing': '/financing',
    '/blog': '/blog',
    '/new-patients': '/new-patients',
    '/contact': '/contact',
    '/service-areas': '/service-areas',
  },
  es: {
    '/': '/es',
    '/about': '/es/about',
    '/services': '/es/services',
    '/services/general': '/es/services/general',
    '/services/cosmetic': '/es/services/cosmetic',
    '/services/restorative': '/es/services/restorative',
    '/services/orthodontics': '/es/services/orthodontics',
    '/financing': '/es/financing',
    '/blog': '/blog',
    '/new-patients': '/es/new-patients',
    '/contact': '/es/contact',
    '/service-areas': '/service-areas',
    '/es': '/es',
    '/es/about': '/es/about',
    '/es/services': '/es/services',
    '/es/services/general': '/es/services/general',
    '/es/services/cosmetic': '/es/services/cosmetic',
    '/es/services/restorative': '/es/services/restorative',
    '/es/services/orthodontics': '/es/services/orthodontics',
    '/es/financing': '/es/financing',
    '/es/new-patients': '/es/new-patients',
    '/es/contact': '/es/contact',
  }
};

// Normalize current path to its EN equivalent
function toEnPath(path) {
  return path.replace(/^\/es/, '') || '/';
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isSpanish = location.pathname.startsWith('/es');
  const enPath = toEnPath(location.pathname);

  const handleLanguageSwitch = (lang) => {
    if (lang === 'es') {
      const esPath = routeMap.es[enPath] || '/es';
      navigate(esPath);
    } else {
      navigate(enPath || '/');
    }
  };

  const navLinks = isSpanish
    ? [
        { label: 'Acerca de', path: '/es/about' },
        {
          label: 'Servicios',
          path: '/es/services',
          submenu: [
            { label: 'Odontología General', path: '/es/services/general' },
            { label: 'Odontología Cosmética', path: '/es/services/cosmetic' },
            { label: 'Odontología Restauradora', path: '/es/services/restorative' },
            { label: 'Ortodoncia', path: '/es/services/orthodontics' },
          ]
        },
        { label: 'Financiamiento', path: '/es/financing' },
        { label: 'Blog', path: '/blog' },
        { label: 'Pacientes Nuevos', path: '/es/new-patients' },
        { label: 'Contacto', path: '/es/contact' },
      ]
    : [
        { label: 'About', path: '/about' },
        {
          label: 'Services',
          path: '/services',
          submenu: [
            { label: 'General Dentistry', path: '/services/general' },
            { label: 'Cosmetic Dentistry', path: '/services/cosmetic' },
            { label: 'Restorative Dentistry', path: '/services/restorative' },
            { label: 'Orthodontics', path: '/services/orthodontics' },
          ]
        },
        { label: 'Financing', path: '/financing' },
        { label: 'Blog', path: '/blog' },
        { label: 'New Patients', path: '/new-patients' },
        { label: 'Contact', path: '/contact' },
      ];

  const bookLabel = isSpanish ? 'Reservar Cita' : 'Book Appointment';
  const bookPath = isSpanish ? '/es/contact' : '/contact';
  const phoneLabel = '(281) 823-9987';
  const addressLabel = isSpanish ? '12523 Greenspoint Dr, Houston' : '12523 Greenspoint Dr, Houston';

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:2818239987" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="w-3.5 h-3.5" />
              <span>{phoneLabel}</span>
            </a>
            <span className="hidden sm:inline text-primary-foreground/60">|</span>
            <span className="hidden sm:inline">{addressLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>{isSpanish ? 'Hablamos Español' : 'Se Habla Español'}</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
          <Link to={isSpanish ? '/es' : '/'} className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
            <img src={LOGO_URL} alt="Greenspoint Dental" className="h-28 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <div key={link.path} className="relative group">
                {link.submenu ? (
                  <>
                    <button className={`px-2.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
                      location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                    }`}>
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute left-0 mt-0 w-52 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                      {link.submenu.map(subitem => (
                        <Link key={subitem.path} to={subitem.path} className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors">
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={link.path} className={`px-2.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                  }`}>
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex gap-1 bg-muted rounded-full p-1">
              <button
                onClick={() => handleLanguageSwitch('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !isSpanish ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageSwitch('es')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isSpanish ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ES
              </button>
            </div>
            <Link to={bookPath}>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-6">
                {bookLabel}
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors">
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
                  <div key={link.path}>
                    {link.submenu ? (
                      <>
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                            location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="bg-muted/30 rounded-lg mt-1 space-y-1 py-2">
                                {link.submenu.map(subitem => (
                                  <Link key={subitem.path} to={subitem.path} onClick={() => { setOpen(false); setServicesOpen(false); }} className="block px-6 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                    {subitem.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={link.path} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                      }`}>
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="flex gap-2 mt-4 px-4">
                  <button onClick={() => { handleLanguageSwitch('en'); setOpen(false); }} className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${!isSpanish ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>EN</button>
                  <button onClick={() => { handleLanguageSwitch('es'); setOpen(false); }} className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${isSpanish ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>ES</button>
                </div>
                <Link to={bookPath} onClick={() => setOpen(false)}>
                  <Button className="w-full mt-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full">{bookLabel}</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}