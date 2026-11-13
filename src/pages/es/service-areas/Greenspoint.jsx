import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHubES from '@/components/seo/InternalLinkHubES';
import { BUSINESS_NODE, toJsonLdString } from '@/lib/businessSchema';
import { MAP_EMBED_URL } from '@/components/service-areas/areasData';

const TITLE = 'Dentista en Greenspoint, Houston, TX 77060 - Greenspoint Dental';
const DESCRIPTION =
  'Dentista familiar y de emergencia en 12523 Greenspoint Dr, Houston, TX 77060. Equipo bilingüe, atención sin juicios y una oferta para pacientes nuevos de $99.';

const BREADCRUMBS = [
  { label: 'Inicio', path: '/es' },
  { label: 'Áreas de Servicio', path: '/es/areas-de-servicio' },
  { label: 'Greenspoint' },
];

const HOURS = [
  { days: 'Lunes', hours: '8am a 4pm' },
  { days: 'Martes', hours: '8am a 12pm' },
  { days: 'Miércoles y jueves', hours: '8am a 5pm' },
  { days: 'Viernes', hours: '8am a 12pm' },
];

const CARE = [
  {
    title: 'Revisiones y limpiezas',
    text: 'Exámenes y limpiezas regulares para que los problemas pequeños sigan siendo pequeños.',
    label: 'Odontología general en Greenspoint',
    path: '/es/servicios/general',
  },
  {
    title: 'Empastes, coronas y reparaciones',
    text: 'Atención para caries, dientes desgastados y dientes rotos.',
    label: 'Odontología restauradora',
    path: '/es/servicios/restauracion',
  },
  {
    title: 'Cuidado de la sonrisa',
    text: 'Blanqueamiento y carillas para una sonrisa con la que te sientas bien.',
    label: 'Odontología cosmética',
    path: '/es/servicios/cosmetica',
  },
  {
    title: 'Brackets',
    text: 'Ortodoncia para niños y adultos.',
    label: 'Ortodoncia',
    path: '/es/servicios/ortodoncia',
  },
];

const NEARBY = [
  {
    label: 'Dentista cerca de Imperial Valley',
    driveTime: 'A unos 5 minutos',
    path: '/es/areas-de-servicio/imperial-valley',
  },
  {
    label: 'Dentista cerca de Southbrook',
    driveTime: 'De 2 a 5 minutos',
    path: '/es/areas-de-servicio/southbrook',
  },
  {
    label: 'Dentista cerca de Colonial Hills',
    driveTime: 'A unos 5 minutos',
    path: '/es/areas-de-servicio/colonial-hills',
  },
  {
    label: 'Dentista cerca de Green Ridge North',
    driveTime: 'A unos 5 minutos',
    path: '/es/areas-de-servicio/green-ridge-north',
  },
];

const FAQS = [
  {
    q: '¿Dónde está su oficina?',
    a: 'Estamos en 12523 Greenspoint Drive, Houston, TX 77060, en la esquina de Greens Road y Greenspoint Drive.',
  },
  {
    q: 'Han pasado años desde que fui al dentista. ¿Me van a juzgar?',
    a: 'No. Empezamos donde estás y te explicamos tus opciones en palabras sencillas. Muchos de nuestros pacientes han estado mucho tiempo sin venir.',
  },
  {
    q: '¿Hablan español?',
    a: 'Sí. Nuestro equipo habla inglés y español.',
  },
  {
    q: '¿Me pueden ver el mismo día si tengo dolor?',
    a: 'Llámanos al (281) 823-9987 y haremos lo posible por verte el mismo día. Reservamos tiempo cada día para emergencias.',
  },
  {
    q: '¿Aceptan mi seguro?',
    a: 'Aceptamos la mayoría de los planes. Llámanos al (281) 823-9987 para confirmar el tuyo. Si no tienes seguro, pregúntanos por planes de pago y financiamiento.',
  },
  {
    q: '¿Pueden venir mis hijos también?',
    a: 'Sí. Atendemos a toda la familia. Comunícate con la oficina y te ayudamos a planear la primera visita.',
  },
];

const LINK_CLASS =
  'rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://greenspointdental.com/es/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Áreas de Servicio',
      item: 'https://greenspointdental.com/es/areas-de-servicio/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Greenspoint',
      item: 'https://greenspointdental.com/es/areas-de-servicio/greenspoint/',
    },
  ],
};

export default function GreenspointES() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-12 pt-6 md:pb-16">
        <div className="mx-auto max-w-5xl px-4">
          <nav aria-label="Migas de pan" className="font-body text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              {BREADCRUMBS.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {crumb.path ? (
                    <Link to={crumb.path} className="rounded hover:text-primary hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="mb-5 mt-5 font-heading text-3xl leading-tight text-foreground md:text-5xl">
            Dentista en Greenspoint, Houston, TX 77060
          </h1>

          <p className="max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            Greenspoint Dental es el dentista familiar de Greenspoint, Houston, desde 1997. Nos
            encuentras en 12523 Greenspoint Drive, código postal 77060, en la esquina de Greens Road y
            Greenspoint Drive. Nuestro equipo bilingüe habla inglés y español, y mantenemos la
            atención honesta y accesible. Si han pasado años desde tu última visita, eres bienvenido.
            Sin juicios, sin presión.
          </p>

          <div className="mt-8">
            <Link
              to="/es/contacto"
              className="inline-block rounded-full bg-primary px-8 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Reserva Tu Cita
            </Link>
          </div>

          <p className="mt-4 font-body text-sm text-muted-foreground">
            ¿Prefieres hablar? Llama al{' '}
            <a href="tel:+12818239987" className={`font-semibold text-primary underline-offset-4 hover:underline ${LINK_CLASS}`}>
              (281) 823-9987
            </a>
            .
          </p>
        </div>
      </section>

      {/* Find us */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">Encuéntranos</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-72 overflow-hidden rounded-2xl border border-border bg-muted lg:h-auto lg:min-h-80">
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
                El estacionamiento es gratis y está justo en la puerta. Si vienes por primera vez,
                llega unos minutos antes para completar tu información.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Care blocks */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
            Atención dental para toda la familia
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {CARE.map((block) => (
              <li key={block.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-2 font-heading text-lg text-foreground">{block.title}</h3>
                <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
                  {block.text}
                </p>
                <Link to={block.path} className={`font-body text-sm ${LINK_CLASS}`}>
                  {block.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
            ¿Traes a tus hijos? Comunícate con la oficina y te ayudamos a planear la primera visita.
          </p>
        </div>
      </section>

      {/* Emergency */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 md:p-10">
            <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
              ¿Algo te Duele? Llámanos.
            </h2>
            <p className="mb-6 max-w-3xl font-body text-base leading-relaxed text-muted-foreground">
              El dolor de muela, la inflamación, un diente roto o una corona o empaste que se cayó no
              esperan al mejor momento. Reservamos tiempo cada día para emergencias y haremos lo
              posible por verte lo antes posible. Si tienes inflamación que se está extendiendo o
              dificultad para respirar o tragar, acude a la sala de emergencias más cercana.
            </p>
            <a
              href="tel:+12818239987"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 font-body text-lg font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Llama al (281) 823-9987
            </a>
          </div>
        </div>
      </section>

      {/* Costs */}
      <section className="bg-muted/40 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
            Costos Claros, Sin Sorpresas
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-2 font-heading text-lg text-foreground">
                Oferta de $99 para pacientes nuevos.
              </h3>
              <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
                Examen completo, radiografías y limpieza profesional. Sin costos escondidos.
              </p>
              <Link to="/es/nuevos-pacientes" className={`font-body text-sm ${LINK_CLASS}`}>
                Ver ofertas para pacientes nuevos
              </Link>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-2 font-heading text-lg text-foreground">
                Examen dental y radiografías por $39.
              </h3>
              <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
                Una revisión rápida si ha pasado tiempo desde que viste a un dentista. Sin sorpresas.
              </p>
              <Link to="/es/nuevos-pacientes" className={`font-body text-sm ${LINK_CLASS}`}>
                Ver ofertas para pacientes nuevos
              </Link>
            </div>
          </div>

          <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
            Aceptamos la mayoría de los planes de seguro, incluidos Aetna, Anthem, Blue Cross, Cigna,
            Guardian, Humana Dental, MetLife, United Healthcare y United Concordia. Llámanos al{' '}
            <a href="tel:+12818239987" className={LINK_CLASS}>
              (281) 823-9987
            </a>{' '}
            para confirmar tu plan antes de la visita.{' '}
            <Link to="/es/financiacion" className={LINK_CLASS}>
              Detalles de seguros y financiamiento
            </Link>
          </p>

          <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
            ¿Sin seguro? Ofrecemos planes de tratamiento por fases y financiamiento a través de
            CareCredit, The HELPcard y LendingUSA.
          </p>
        </div>
      </section>

      {/* Nearby */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">
            También Servimos a Vecinos Cercanos
          </h2>
          <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
            Nuestra oficina está en Greenspoint, y muchos de nuestros pacientes vienen de estos
            vecindarios cercanos.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {NEARBY.map((area) => (
              <li key={area.path} className="rounded-2xl border border-border bg-card p-5">
                <Link to={area.path} className={`font-body text-base ${LINK_CLASS}`}>
                  {area.label}
                </Link>
                <p className="mt-1.5 font-body text-sm text-muted-foreground">{area.driveTime}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-body text-sm">
            <Link to="/es/areas-de-servicio" className={LINK_CLASS}>
              Ver todas las áreas que servimos
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-2xl text-foreground md:text-3xl">
            Preguntas de pacientes de Greenspoint
          </h2>
          <div className="space-y-7">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <h3 className="mb-2 font-heading text-lg text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHubES
        currentPath="/es/areas-de-servicio/greenspoint"
        areaName="Greenspoint"
        title="Servicios Dentales en Nuestra Oficina de Greenspoint"
        intro="Desde limpiezas de rutina hasta la restauración completa de tu sonrisa, todo sucede bajo un mismo techo en Greenspoint Drive. Aquí te decimos por dónde empezar."
        showAreas={false}
      />

      {/* Closing */}
      <section className="bg-primary/5 py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-2xl text-foreground md:text-3xl">
            Tu Dentista en Greenspoint
          </h2>
          <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">
            Atención honesta y accesible para ti y tu familia, aquí mismo en Greenspoint.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/es/contacto"
              className="inline-block rounded-full bg-primary px-8 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Programa Tu Visita
            </Link>
            <p className="font-body text-sm text-muted-foreground">
              O llama al{' '}
              <a href="tel:+12818239987" className={LINK_CLASS}>
                (281) 823-9987
              </a>
            </p>
          </div>
        </div>
      </section>

      <script type="application/ld+json">
        {toJsonLdString({ '@context': 'https://schema.org', ...BUSINESS_NODE })}
      </script>
      <script type="application/ld+json">{toJsonLdString(BREADCRUMB_SCHEMA)}</script>
    </div>
  );
}