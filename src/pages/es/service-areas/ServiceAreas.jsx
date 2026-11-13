import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, DollarSign, Globe, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHubES from '@/components/seo/InternalLinkHubES';
import { MAP_EMBED_URL } from '@/components/service-areas/areasData';

const TITLE = 'Dentista Familiar en el Norte de Houston - Greenspoint Dental';
const DESCRIPTION =
  'Dentista familiar en 12523 Greenspoint Dr, Houston, TX 77060, sirviendo a Greenspoint, Imperial Valley, Southbrook, Colonial Hills y Green Ridge North. Atención bilingüe.';

const INTRO =
  'Greenspoint Dental cuida a las familias del área de Greenspoint desde 1997. Nuestra oficina está en 12523 Greenspoint Drive, código postal 77060, en la esquina de Greens Road y Greenspoint Drive. La mayoría de nuestros pacientes viven a pocos minutos, en vecindarios como Imperial Valley, Southbrook, Colonial Hills y Green Ridge North. Si ha pasado tiempo desde tu última visita dental, eres bienvenido aquí. Nuestro equipo habla inglés y español, y mantenemos la atención honesta y accesible, sin juicios y sin presión.';

const NEIGHBORHOODS = [
  {
    name: 'Imperial Valley',
    driveTime: 'A unos 5 minutos',
    line: 'Cerca de Imperial Valley Drive, sin necesidad de freeway.',
    linkLabel: 'Dentista cerca de Imperial Valley',
    path: '/es/areas-de-servicio/imperial-valley',
  },
  {
    name: 'Southbrook',
    driveTime: 'De 2 a 5 minutos',
    line: 'Una de nuestras áreas más cercanas, por la vía de servicio de la I-45.',
    linkLabel: 'Dentista cerca de Southbrook',
    path: '/es/areas-de-servicio/southbrook',
  },
  {
    name: 'Colonial Hills',
    driveTime: 'A unos 5 minutos',
    line: 'Un viaje corto por Beltway 8.',
    linkLabel: 'Dentista cerca de Colonial Hills',
    path: '/es/areas-de-servicio/colonial-hills',
  },
  {
    name: 'Green Ridge North',
    driveTime: 'A unos 5 minutos',
    line: 'Fácil de llegar por calles locales, sin freeway.',
    linkLabel: 'Dentista cerca de Green Ridge North',
    path: '/es/areas-de-servicio/green-ridge-north',
  },
];

const HOURS = [
  { days: 'Lunes', hours: '8am a 4pm' },
  { days: 'Martes', hours: '8am a 12pm' },
  { days: 'Miércoles y jueves', hours: '8am a 5pm' },
  { days: 'Viernes', hours: '8am a 12pm' },
];

const WHY = [
  {
    icon: DollarSign,
    title: 'Accesible',
    text: 'Los pacientes nuevos pagan $99 por un examen completo, radiografías y limpieza profesional. Aceptamos la mayoría de los seguros y ofrecemos planes de pago.',
  },
  {
    icon: Globe,
    title: 'Bilingüe',
    text: 'Nuestro equipo habla inglés y español.',
  },
  {
    icon: Heart,
    title: 'Sin juicios',
    text: '¿Años sin ir al dentista? Empezamos donde estás.',
  },
];

const FAQS = [
  {
    q: '¿Qué vecindarios atienden?',
    a: 'Nuestra oficina principal está en Greenspoint, código postal 77060. También recibimos pacientes de Imperial Valley, Southbrook, Colonial Hills y Green Ridge North.',
  },
  {
    q: '¿Hablan español?',
    a: 'Sí, nuestro equipo habla inglés y español.',
  },
  {
    q: '¿Es fácil estacionarse?',
    a: 'Sí, el estacionamiento es gratis y está justo en la oficina.',
  },
];

export default function ServiceAreasES() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="mb-6 font-heading text-3xl leading-tight text-foreground md:text-5xl">
            Áreas que Servimos Alrededor de Greenspoint
          </h1>
          <p className="mb-8 max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            {INTRO}
          </p>
          <Link to="/es/contacto">
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Reserva Tu Cita
            </Button>
          </Link>
        </div>
      </section>

      {/* Home office */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <article className="rounded-3xl border-2 border-primary/25 bg-primary/5 p-8 md:p-12">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Nuestra oficina principal
            </p>
            <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">
              Greenspoint (77060): Nuestra Oficina Principal
            </h2>
            <p className="mb-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
              Nuestra oficina está en el corazón de Greenspoint, con estacionamiento gratis y fácil
              justo en la puerta.
            </p>
            <Link
              to="/es/areas-de-servicio/greenspoint"
              className="inline-flex items-center gap-1.5 rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Conoce nuestra oficina de Greenspoint
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      {/* Neighborhood grid */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
            Otros Vecindarios que Servimos
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
            {NEIGHBORHOODS.map((area) => (
              <article
                key={area.name}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:p-7"
              >
                <h3 className="mb-1 font-heading text-xl text-foreground">{area.name}</h3>
                <p className="mb-3 font-body text-sm font-semibold text-primary">{area.driveTime}</p>
                <p className="mb-5 font-body text-sm leading-relaxed text-muted-foreground">
                  {area.line}
                </p>
                <Link
                  to={area.path}
                  className="mt-auto inline-flex items-center gap-1.5 rounded font-body text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {area.linkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Find us */}
      <section className="bg-muted/40 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">Encuéntranos</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-72 overflow-hidden rounded-2xl border border-border bg-background lg:h-auto lg:min-h-80">
              <iframe
                title="Mapa de Greenspoint Dental en 12523 Greenspoint Drive, Houston, TX 77060"
                src={MAP_EMBED_URL}
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div>
              <h3 className="mb-2 font-heading text-lg text-foreground">Nuestra Dirección</h3>
              <address className="mb-6 font-body text-base not-italic leading-relaxed text-muted-foreground">
                Greenspoint Dental<br />
                12523 Greenspoint Drive<br />
                Houston, TX 77060
              </address>

              <h3 className="mb-3 font-heading text-lg text-foreground">Horario de Oficina</h3>
              <table className="w-full border-collapse text-left font-body text-sm">
                <caption className="sr-only">Horario de Greenspoint Dental por día</caption>
                <tbody>
                  {HOURS.map((row) => (
                    <tr key={row.days} className="border-b border-border last:border-0">
                      <th scope="row" className="py-2.5 pr-4 font-semibold text-foreground">
                        {row.days}
                      </th>
                      <td className="py-2.5 text-muted-foreground">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <a
                href="tel:+12818239987"
                className="mt-5 inline-flex items-center gap-2 font-body text-base font-semibold text-primary hover:underline"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Llámanos: (281) 823-9987
              </a>

              <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">
                Las citas por la mañana son las más fáciles de conseguir. Si algo te duele, llámanos y
                haremos lo posible por verte el mismo día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why neighbors */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
            Por Qué los Vecinos Nos Eligen
          </h2>
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {WHY.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <Icon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mb-2 font-heading text-lg text-foreground">{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                  {item.title === 'Accesible' && (
                    <div className="mt-3 flex flex-wrap gap-3 font-body text-sm">
                      <Link
                        to="/es/financiacion"
                        className="rounded font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        Opciones de financiamiento
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
            Preguntas que Escuchamos a Menudo
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <article key={faq.q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-heading text-lg text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHubES
        currentPath="/es/areas-de-servicio"
        intro="Cada página de vecindario explica tiempos de viaje, estacionamiento y la atención que más piden los pacientes cercanos. Nuestras páginas de servicios explican cada tratamiento en detalle."
      />

      {/* Closing */}
      <section className="bg-primary/5 py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
            Atención Dental Cerca de Casa
          </h2>
          <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">
            Nuestra oficina está a pocos minutos de estos vecindarios, y nuestro equipo está listo
            para ayudarte a ti y a tu familia con atención honesta y accesible.
          </p>
          <Link to="/es/contacto">
            <Button
              size="lg"
              className="rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Programa Tu Visita
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}