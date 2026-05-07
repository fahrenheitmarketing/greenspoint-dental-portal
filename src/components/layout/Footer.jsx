import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Heart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const LOGO_URL = "https://media.base44.com/images/public/user_696032597527e77c90fca3ba/15765cb4d_image.png";

export default function Footer() {
  const t = useTranslation();
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Banner */}
      <div className="bg-primary relative overflow-hidden" style={{backgroundImage: 'url(https://media.base44.com/images/public/69e928fd4b865057d3a65de3/62b789d9a_1667.jpg)', backgroundSize: 'auto', backgroundRepeat: 'repeat'}}>
        <div className="absolute inset-0 bg-primary/85"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-3">
            {t('footer.compassionate') || 'Your Smile Deserves Compassionate Care'}
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            {t('footer.ctaDesc') || 'No judgment. No pressure. Just honest, affordable dental care for you and your family. Se habla español.'}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t('footer.scheduleVisit') || 'Schedule Your Visit Today'}
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
              {t('footer.brandDesc') || 'Serving the Greenspoint community with compassionate, affordable dental care since 1997. Our bilingual team is here to help you smile with confidence.'}
            </p>
            <div className="flex items-center gap-2 text-secondary text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>{t('footer.judgmentFree') || 'A Judgment-Free Practice'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {[
                { label: t('navbar.about'), path: '/about' },
                { label: t('navbar.services'), path: '/services' },
                { label: t('navbar.financing'), path: '/financing' },
                { label: t('navbar.newPatients'), path: '/new-patients' },
                { label: t('navbar.blog'), path: '/blog' },
                { label: t('navbar.contact'), path: '/contact' },
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
            <h3 className="font-heading text-lg mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2.5">
              {[
                { label: t('navbar.generalDentistry'), path: '/services/general' },
                { label: t('navbar.cosmeticDentistry'), path: '/services/cosmetic' },
                { label: t('navbar.restorativeDentistry'), path: '/services/restorative' },
                { label: t('navbar.orthodontics'), path: '/services/orthodontics' },
                { label: t('footer.emergency') || 'Emergency Dental Care', path: '/services/general' },
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
            <h3 className="font-heading text-lg mb-4">{t('footer.visitUs') || 'Visit Us'}</h3>
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
                  <p>{t('footer.mon') || 'Mon: 8am–4pm'}</p>
                  <p>{t('footer.tue') || 'Tue: 8am–12pm'}</p>
                  <p>{t('footer.wedThu') || 'Wed–Thu: 8am–5pm'}</p>
                  <p>{t('footer.fri') || 'Fri: 8am–12pm'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-background/40">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.specialties')}</p>
        </div>
      </div>
    </footer>
  );
}