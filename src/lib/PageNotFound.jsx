import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

const COPY = {
  en: {
    title: 'Page not found',
    body: 'The page you were looking for is not here. It may have moved, or the link may be out of date.',
    home: 'Back to Home',
    contact: 'Book an Appointment',
    services: 'Our Services',
    call: 'Call us: (281) 823-9987',
    homePath: '/',
    contactPath: '/contact',
    servicesPath: '/services',
  },
  es: {
    title: 'Página no encontrada',
    body: 'La página que buscabas no está aquí. Puede que se haya movido o que el enlace esté desactualizado.',
    home: 'Volver al Inicio',
    contact: 'Reserva una Cita',
    services: 'Nuestros Servicios',
    call: 'Llámanos: (281) 823-9987',
    homePath: '/es',
    contactPath: '/es/contacto',
    servicesPath: '/es/servicios',
  },
};

export default function PageNotFound({}) {
  const location = useLocation();
  const copy = location.pathname.startsWith('/es') ? COPY.es : COPY.en;

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-heading text-6xl font-light text-primary/40 md:text-7xl">404</p>

        <h1 className="mt-4 font-heading text-3xl text-foreground md:text-4xl">{copy.title}</h1>

        <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
          {copy.body}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={copy.homePath}
            className="rounded-full bg-primary px-7 py-3 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {copy.home}
          </Link>
          <Link
            to={copy.contactPath}
            className="rounded-full border border-primary/30 px-7 py-3 font-body font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {copy.contact}
          </Link>
          <Link
            to={copy.servicesPath}
            className="rounded-full px-4 py-3 font-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {copy.services}
          </Link>
        </div>

        <a
          href="tel:+12818239987"
          className="mt-8 inline-flex items-center gap-2 font-body text-base font-semibold text-primary hover:underline"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {copy.call}
        </a>
      </div>
    </section>
  );
}