import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Users, FileText, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHubES from '@/components/seo/InternalLinkHubES';

const TITLE = 'Dentista cerca de Southbrook, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'El dentista más cercano a Southbrook, a dos o cinco minutos. Pacientes de toda la vida, segundas opiniones honestas antes de tratamientos grandes y cuidado para dientes que envejecen.';

const STAY_REASONS = [
  {
    title: 'El mismo equipo, año tras año',
    text: 'Pacientes que empezaron con nosotros a finales de los años noventa siguen viniendo con sus hijos y ahora con sus nietos. Tu expediente te sigue, así que nadie empieza de cero.',
  },
  {
    title: 'Un registro de cada empaste y cada corona',
    text: 'Guardamos el historial de tratamiento en un solo lugar. Cuando una restauración antigua finalmente necesita reemplazo, ya sabemos qué hay debajo.',
  },
  {
    title: 'Recomendados por un vecino, no por un anuncio',
    text: 'La mayoría de los pacientes de Southbrook llegan porque alguien de su calle los recomendó. Esa es la reputación que trabajamos por mantener.',
  },
];

const SECOND_OPINION_POINTS = [
  'Trae tus radiografías o pídenos tomar unas nuevas',
  'Te explicamos qué es urgente y qué puede esperar',
  'Sin presión para reservar el plan completo el mismo día',
  'Una cotización por escrito para cualquier tratamiento que elijas',
];

const AGING_CARE = [
  {
    title: 'Recesión de encías',
    text: 'Las raíces sensibles y los dientes que parecen más largos suelen empezar en las encías, no en el esmalte. Lo medimos y lo monitoreamos en lugar de adivinar.',
  },
  {
    title: 'Boca seca',
    text: 'Es común con medicamentos para la presión y las alergias, y es una causa principal de caries nuevas después de los 60. Te ayudamos a manejarla.',
  },
  {
    title: 'Prótesis y parciales',
    text: 'Rebases, ajustes y reparaciones para prótesis que ya no se acomodan como antes.',
  },
  {
    title: 'Reemplazar trabajo antiguo',
    text: 'Los empastes de plata y las coronas viejas tienen una vida útil. Te avisamos cuando una está cerca de fallar en lugar de esperar a que se rompa.',
  },
];

const FAQS = [
  {
    q: '¿Puedo tener una segunda opinión sobre un plan de tratamiento grande?',
    a: 'Por favor hazlo. Trae el presupuesto y cualquier radiografía que te hayan dado. Revisaremos qué se necesita ahora, qué es opcional y qué podría esperar unos meses, y luego pondremos nuestra cotización por escrito.',
  },
  {
    q: 'He visto a otro dentista por años. ¿Es incómodo cambiar?',
    a: 'Para nada. Pedimos tus registros, los revisamos antes de tu primera visita y seguimos desde donde te quedaste. Muchos pacientes de Southbrook llegaron exactamente así.',
  },
  {
    q: '¿Hacen ajustes y reparaciones de prótesis dentales?',
    a: 'Sí. Hacemos rebases, ajustes y reparaciones, incluso para pacientes cuya prótesis se hizo en otro lugar.',
  },
  {
    q: 'Mi seguro cambió este año. ¿Qué debo revisar primero?',
    a: 'Llámanos con el nombre del plan y te diremos si estamos en la red antes de reservar. Si el nuevo plan no nos cubre, te cotizamos nuestras tarifas fijas para que puedas comparar con claridad.',
  },
];

export default function SouthbrookES() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary/10 via-background to-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <Link
              to="/es/areas-de-servicio"
              className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← Todas las Áreas de Servicio
            </Link>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 font-body text-sm font-medium text-secondary-foreground">
              <HeartHandshake className="h-4 w-4" />
              Nuestro vecindario más cercano, a dos o cinco minutos
            </p>
            <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
              Dentista cerca de Southbrook, Houston TX
            </h1>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              Southbrook es el recorrido más corto hasta nuestra puerta, y eso se nota en nuestra
              agenda: muchos de los pacientes que vemos cada semana vienen de estas pocas calles desde
              los años noventa. Si buscas un dentista que recuerde tu historial sin consultar el
              expediente, esta es tu página.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-secondary/10 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 font-body text-sm">
          <span className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-secondary" />
            A dos o cinco minutos
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Users className="h-4 w-4 text-secondary" />
            Cuidando a Houston desde 1997
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 text-secondary" />
            <a href="tel:+12818239987" className="font-medium text-primary hover:underline">
              (281) 823-9987
            </a>
          </span>
        </div>
      </div>

      {/* Why patients stay */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Por qué los pacientes de Southbrook siguen volviendo
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Un dentista no es una decisión de una sola visita. Es una relación que se mide en décadas,
            y es cuando importa más que aparece algo complicado.
          </p>
          <div className="space-y-4">
            {STAY_REASONS.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 border-l-4 border-secondary bg-card p-5"
              >
                <div>
                  <h3 className="mb-1 font-heading text-lg text-foreground">{reason.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {reason.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second opinions */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-5 w-5 text-secondary" />
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Una segunda opinión antes de una cuenta grande
              </h2>
            </div>
            <p className="mb-4 font-body leading-relaxed text-muted-foreground">
              Una boca llena de coronas o un juego de implantes es una cantidad seria de dinero, y es
              razonable querer otra mirada sobre el plan. Te diremos si el plan que te dieron parece
              correcto, y también te diremos si parece más de lo que necesitas.
            </p>
            <p className="font-body leading-relaxed text-muted-foreground">
              Esa conversación no te cuesta más que un examen, y le ha ahorrado varios miles de
              dólares a más de una familia de Southbrook.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="mb-4 font-heading text-base text-foreground">Cómo funciona la revisión</p>
            <ul className="space-y-3">
              {SECOND_OPINION_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Aging teeth */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Un cuidado que cambia contigo
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Los dientes que llevan sesenta o setenta años en servicio necesitan un plan distinto al de
            dientes de veinte. Mucho de nuestro trabajo en Southbrook es este tipo de odontología más
            silenciosa y de largo plazo.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {AGING_CARE.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-heading text-lg text-foreground">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="bg-secondary/10 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            Cuando tu seguro cambia, nos adaptamos
          </h2>
          <p className="mb-4 font-body leading-relaxed text-muted-foreground">
            Los planes cambian cada año, y el retiro muchas veces significa salir por completo de un
            plan de empleador. Trabajamos con la mayoría de los planes dentales y confirmaremos tu
            estado en la red antes de que reserves, para que no haya sorpresas en recepción.
          </p>
          <p className="font-body leading-relaxed text-muted-foreground">
            Si estás entre planes o pagas de tu bolsillo, nuestras tarifas fijas están publicadas y
            nuestros planes de pago se explican con palabras sencillas. Aquí nadie te presiona hacia un
            tratamiento que no puedes pagar este mes.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">Preguntas de Southbrook</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="mb-2 font-heading text-base text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHubES
        currentPath="/es/areas-de-servicio/southbrook"
        areaName="Southbrook"
        intro="Desde nuestra oficina en Greenspoint, los pacientes de Southbrook llegan a limpiezas, coronas, prótesis y endodoncias en un recorrido de cinco minutos. Aquí te decimos dónde buscar después."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            El mismo vecindario, el mismo equipo, desde 1997
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            Si han pasado algunos años desde tu última visita, no hay problema. Llámanos, o empieza con
            una segunda opinión y decide después de escucharnos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/es/contacto">
              <Button size="lg" className="rounded-full bg-primary px-8 font-semibold hover:bg-primary/90">
                Reserva Tu Cita
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