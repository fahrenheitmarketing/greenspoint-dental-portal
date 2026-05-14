import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/user_696032597527e77c90fca3ba/15765cb4d_image.png";

export default function Footer() {
  const location = useLocation();
  const isSpanish = location.pathname.startsWith('/es');

  const links = isSpanish
    ? [
        { label: 'Acerca de', path: '/es/about' },
        { label: 'Servicios', path: '/es/services' },
        { label: 'Financiamiento', path: '/es/financing' },
        { label: 'Pacientes Nuevos', path: '/es/new-patients' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contacto', path: '/es/contact' },
      ]
    : [
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Financing', path: '/financing' },
        { label: 'New Patients', path: '/new-patients' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' },
      ];

  const serviceLinks = isSpanish
    ? [
        { label: 'Odontología General', path: '/es/services/general' },
        { label: 'Odontología Cosmética', path: '/es/services/cosmetic' },
        { label: 'Odontología Restauradora', path: '/es/services/restorative' },
        { label: 'Ortodoncia', path: '/es/services/orthodontics' },
        { label: 'Atención de Emergencia', path: '/es/services/general' },
      ]
    : [
        { label: 'General Dentistry', path: '/services/general' },
        { label: 'Cosmetic Dentistry', path: '/services/cosmetic' },
        { label: 'Restorative Dentistry', path: '/services/restorative' },
        { label: 'Orthodontics', path: '/services/orthodontics' },
        { label: 'Emergency Dental Care', path: '/services/general' },
      ];

  return (
    <footer className="bg-foreground text-background">
      {/* CTA Banner */}
      <div className="bg-primary relative overflow-hidden" style={{backgroundImage: 'url(https://media.base44.com/images/public/69e928fd4b865057d3a65de3/62b789d9a_1667.jpg)', backgroundSize: 'auto', backgroundRepeat: 'repeat'}}>
        <div className="absolute inset-0 bg-primary/85"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-3">
            {isSpanish ? 'Tu Sonrisa Merece Atención Compasiva' : 'Your Smile Deserves Compassionate Care'}
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            {isSpanish
              ? 'Sin juicios. Sin presión. Solo atención dental honesta y asequible para ti y tu familia. Se habla español.'
              : 'No judgment. No pressure. Just honest, affordable dental care for you and your family. Se habla español.'}
          </p>
          <Link
            to={isSpanish ? '/es/contact' : '/contact'}
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {isSpanish ? 'Programa Tu Visita Hoy' : 'Schedule Your Visit Today'}
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="inline-block bg-white rounded-lg p-2 mb-4">
              <img src={LOGO_URL} alt="Greenspoint Dental" className="h-12 w-auto" />
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              {isSpanish
                ? 'Sirviendo a la comunidad de Greenspoint con atención dental compasiva y asequible desde 1997. Nuestro equipo bilingüe está aquí para ayudarte a sonreír con confianza.'
                : 'Serving the Greenspoint community with compassionate, affordable dental care since 1997. Our bilingual team is here to help you smile with confidence.'}
            </p>
            <div className="flex items-center gap-2 text-secondary text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>{isSpanish ? 'Una Práctica Sin Prejuicios' : 'A Judgment-Free Practice'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg mb-4">{isSpanish ? 'Enlaces Rápidos' : 'Quick Links'}</h3>
            <ul className="space-y-2.5">
              {links.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-background/60 hover:text-secondary transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg mb-4">{isSpanish ? 'Servicios' : 'Services'}</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-background/60 hover:text-secondary transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg mb-4">{isSpanish ? 'Visítanos' : 'Visit Us'}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <a href="tel:2818239987" className="text-background/80 hover:text-secondary transition-colors text-sm">(281) 823-9987</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <p className="text-background/60 text-sm">12523 Greenspoint Drive<br />Houston, TX 77060</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <div className="text-background/60 text-sm space-y-0.5">
                  <p>{isSpanish ? 'Lun: 8am–4pm' : 'Mon: 8am–4pm'}</p>
                  <p>{isSpanish ? 'Mar: 8am–12pm' : 'Tue: 8am–12pm'}</p>
                  <p>{isSpanish ? 'Mié–Jue: 8am–5pm' : 'Wed–Thu: 8am–5pm'}</p>
                  <p>{isSpanish ? 'Vie: 8am–12pm' : 'Fri: 8am–12pm'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-background/40">
          <p>© 2024 Greenspoint Dental. {isSpanish ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <p>{isSpanish ? 'Odontología General, Cosmética y Restauradora' : 'General, Cosmetic & Restorative Dentistry'}</p>
        </div>
      </div>
    </footer>
  );
}