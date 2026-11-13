import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Sparkles, CalendarDays, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHubES from '@/components/seo/InternalLinkHubES';

const TITLE = 'Dentista Cosmético cerca de Green Ridge North, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'Carillas, blanqueamiento y alineadores a cinco minutos de Green Ridge North. $695 por carilla, consultas cosméticas gratis y planes de pago para mejorar tu sonrisa.';

const TIMELINE = [
  {
    when: 'Tres meses antes',
    what: 'Consulta y plan',
    text: 'Fotografiamos tu sonrisa, conversamos sobre carillas, blanqueamiento o alineadores, y te damos un presupuesto por escrito antes de reservar cualquier cosa.',
  },
  {
    when: 'Seis semanas antes',
    what: 'Empieza el tratamiento',
    text: 'Preparación e impresiones para las carillas, o el primer juego de alineadores. La mayoría de los planes cosméticos necesitan dos o tres visitas en este periodo.',
  },
  {
    when: 'Dos semanas antes',
    what: 'Blanqueamiento y ajustes',
    text: 'Se eligen los tonos finales, se entregan las placas o se colocan las carillas, con tiempo para ajustar cualquier detalle que se sienta raro.',
  },
  {
    when: 'La semana del evento',
    what: 'Un pulido corto',
    text: 'Una visita rápida para pulir bordes y revisar la mordida, para que las fotos y el evento salgan sin contratiempos.',
  },
];

const COMPARISON = [
  {
    option: 'Carillas de porcelana',
    best: 'Dientes frontales rotos, desiguales o descoloridos',
    time: 'De dos a tres visitas',
    price: '$695 por carilla',
  },
  {
    option: 'Blanqueamiento profesional',
    best: 'Manchas por café, té o cigarro',
    time: 'Una visita más placas en casa',
    price: 'Se cotiza en la consulta',
  },
  {
    option: 'Alineadores transparentes',
    best: 'Apiñamiento o espacios que quieres cerrar sin que se note',
    time: 'De seis a dieciocho meses',
    price: 'Consulta gratis primero',
  },
];

const FAQS = [
  {
    q: '¿Con cuánta anticipación debo reservar un blanqueamiento antes de una boda?',
    a: 'Dos o tres semanas es cómodo. El blanqueamiento está en su punto máximo la primera semana y luego se asienta, y el tiempo extra nos permite ajustar el tono si lo quieres más claro.',
  },
  {
    q: '¿Cuánto cuestan las carillas aquí?',
    a: 'Nuestras carillas cuestan $695 por diente cuando te haces de cuatro a seis, lo que da $2,780 por cuatro o $4,170 por seis. Está muy por debajo del promedio en Houston, y recibes el presupuesto completo por escrito primero.',
  },
  {
    q: '¿El seguro dental cubre tratamientos cosméticos?',
    a: 'Normalmente no cuando es trabajo puramente cosmético, aunque algunos planes aportan a coronas que también mejoran la apariencia. Revisaremos tus beneficios y te mostraremos el precio de contado junto al del seguro para que decidas.',
  },
  {
    q: '¿Puedo corregir el apiñamiento sin brackets metálicos?',
    a: 'En muchos casos sí. Los alineadores transparentes manejan bien el apiñamiento leve a moderado. Si tu mordida necesita más que eso, te lo diremos con honestidad en lugar de venderte placas que no van a terminar el trabajo.',
  },
];

export default function GreenRidgeNorthES() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary/15 via-background to-primary/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 md:grid-cols-5 md:items-end">
            <div className="md:col-span-3">
              <Link
                to="/es/areas-de-servicio"
                className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                ← Todas las Áreas de Servicio
              </Link>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 font-body text-sm font-medium text-secondary-foreground">
                <Sparkles className="h-4 w-4" />
                Diseño de sonrisa, a cinco minutos de Green Ridge North
              </p>
              <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
                Dentista Cosmético cerca de Green Ridge North, Houston TX
              </h1>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                Si has estado posponiendo el blanqueamiento, las carillas o los alineadores porque el
                tiempo se sentía vago, esta página es para ti. Planeamos el trabajo cosmético hacia
                atrás desde la fecha que importa, sea una boda, una graduación o el primer día en un
                trabajo nuevo, y cotizamos el precio antes de empezar.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 md:col-span-2">
              <p className="font-heading text-sm uppercase tracking-wide text-muted-foreground">
                Precio de las carillas
              </p>
              <p className="mt-2 font-heading text-4xl font-bold text-primary">$695</p>
              <p className="font-body text-sm text-muted-foreground">
                por carilla, de cuatro a seis dientes
              </p>
              <div className="mt-4 space-y-1.5 font-body text-sm text-muted-foreground">
                <p className="flex justify-between">
                  <span>Cuatro carillas</span>
                  <span className="font-medium text-foreground">$2,780</span>
                </p>
                <p className="flex justify-between">
                  <span>Seis carillas</span>
                  <span className="font-medium text-foreground">$4,170</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-border bg-card py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 font-body text-sm">
          <span className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-secondary" />
            Unos 5 minutos por calles locales
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-4 w-4 text-secondary" />
            Consulta cosmética gratis
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <CreditCard className="h-4 w-4 text-secondary" />
            Planes de pago mensuales disponibles
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 text-secondary" />
            <a href="tel:+12818239987" className="font-medium text-primary hover:underline">
              (281) 823-9987
            </a>
          </span>
        </div>
      </div>

      {/* Timeline */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Planeando hacia atrás desde tu fecha
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            La odontología cosmética es sobre todo agenda. Esta es la cuenta regresiva realista que
            usamos cuando un paciente nos dice que tiene una boda o una sesión de fotos próxima.
          </p>
          <div className="relative border-l border-border pl-6 md:pl-8">
            {TIMELINE.map((step, index) => (
              <motion.div
                key={step.when}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative mb-8 last:mb-0"
              >
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-secondary md:-left-[39px]" />
                <p className="font-body text-xs font-medium uppercase tracking-wide text-secondary">
                  {step.when}
                </p>
                <h3 className="mt-1 mb-1 font-heading text-lg text-foreground">{step.what}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            ¿Carillas, blanqueamiento o alineadores?
          </h2>
          <p className="mb-8 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Estos tres hacen trabajos distintos, y el correcto depende de qué te molesta de tu
            sonrisa. Aquí va la versión corta.
          </p>
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <table className="w-full text-left">
              <thead className="bg-muted/60">
                <tr className="font-body text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Tratamiento</th>
                  <th className="px-4 py-3 font-medium">Ideal para</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Tiempo</th>
                  <th className="px-4 py-3 font-medium">Costo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-body text-sm">
                {COMPARISON.map((row) => (
                  <tr key={row.option}>
                    <td className="px-4 py-4 font-medium text-foreground">{row.option}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.best}</td>
                    <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell">{row.time}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-secondary" />
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Cómo pagar un tratamiento electivo
              </h2>
            </div>
            <p className="mb-5 font-body leading-relaxed text-muted-foreground">
              El trabajo cosmético rara vez lo cubre el seguro, así que tratamos el tema del dinero como
              parte del plan. Recibes un presupuesto por escrito antes del tratamiento, y los planes de
              pago mensuales reparten el costo de las carillas o los alineadores a lo largo de los meses
              que dura el trabajo.
            </p>
            <div className="flex flex-wrap gap-3 font-body text-sm">
              <Link
                to="/es/financiacion"
                className="rounded-full bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/15"
              >
                Ver opciones de financiamiento
              </Link>
              <Link
                to="/es/nuevos-pacientes"
                className="rounded-full bg-secondary/15 px-4 py-2 font-medium text-secondary-foreground hover:bg-secondary/25"
              >
                Ofertas actuales para pacientes nuevos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">
            Preguntas sobre sonrisas de Green Ridge
          </h2>
          <div className="divide-y divide-border rounded-2xl border border-border bg-background px-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="mb-2 font-heading text-base text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHubES
        currentPath="/es/areas-de-servicio/green-ridge-north"
        areaName="Green Ridge North"
        intro="Los pacientes de Green Ridge North vienen a nuestra oficina de Greenspoint por carillas, blanqueamiento, alineadores y la odontología general que mantiene sana una sonrisa nueva. Explora los tratamientos que ofrecemos o encuentra la página del vecindario más cercano a ti."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            Empieza con una consulta cosmética gratis
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            Trae una foto de la sonrisa que tienes en mente y cualquier fecha hacia la que estés
            trabajando. Saldrás con un plan, un precio y un tiempo realista.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/es/contacto">
              <Button size="lg" className="rounded-full bg-primary px-8 font-semibold hover:bg-primary/90">
                Reserva Tu Consulta
              </Button>
            </Link>
            <a href="tel:+12818239987">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary/30 px-8 font-semibold text-primary"
              >
                <Phone className="mr-2 h-4 w-4" />
                (281) 823-9987
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}