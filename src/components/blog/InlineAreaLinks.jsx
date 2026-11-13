import React from 'react';
import { Link } from 'react-router-dom';

// Inline, in-prose links from blog articles to the neighborhood pages.
// One component for both languages so the two sites stay in sync.

const linkClass = 'font-medium text-primary underline-offset-4 hover:underline';

export default function InlineAreaLinks({ lang = 'en', className = '' }) {
  if (lang === 'es') {
    return (
      <p
        className={`mt-10 rounded-xl border border-border bg-muted/40 p-5 font-body text-sm leading-relaxed text-muted-foreground ${className}`}
      >
        Las familias que leen estas guías vienen de todo el corredor de Greenspoint. Nuestra{' '}
        <Link to="/es/areas-de-servicio/greenspoint" className={linkClass}>
          oficina en Greenspoint Drive
        </Link>{' '}
        está a pocos minutos de{' '}
        <Link to="/es/areas-de-servicio/imperial-valley" className={linkClass}>
          Imperial Valley
        </Link>
        ,{' '}
        <Link to="/es/areas-de-servicio/southbrook" className={linkClass}>
          Southbrook
        </Link>
        ,{' '}
        <Link to="/es/areas-de-servicio/colonial-hills" className={linkClass}>
          Colonial Hills
        </Link>{' '}
        y{' '}
        <Link to="/es/areas-de-servicio/green-ridge-north" className={linkClass}>
          Green Ridge North
        </Link>
        , y atendemos a pacientes de cada uno de esos vecindarios.
      </p>
    );
  }

  return (
    <p
      className={`mt-10 rounded-xl border border-border bg-muted/40 p-5 font-body text-sm leading-relaxed text-muted-foreground ${className}`}
    >
      Families read these guides from all over the Greenspoint corridor. Our{' '}
      <Link to="/service-areas/greenspoint" className={linkClass}>
        office on Greenspoint Drive
      </Link>{' '}
      is a short drive from{' '}
      <Link to="/service-areas/imperial-valley" className={linkClass}>
        Imperial Valley
      </Link>
      ,{' '}
      <Link to="/service-areas/southbrook" className={linkClass}>
        Southbrook
      </Link>
      ,{' '}
      <Link to="/service-areas/colonial-hills" className={linkClass}>
        Colonial Hills
      </Link>{' '}
      and{' '}
      <Link to="/service-areas/green-ridge-north" className={linkClass}>
        Green Ridge North
      </Link>
      , and we welcome patients from every one of those neighborhoods.
    </p>
  );
}