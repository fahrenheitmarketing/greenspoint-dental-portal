import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, Sunrise, Plane, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHubES from '@/components/seo/InternalLinkHubES';

const TITLE = 'Dentista cerca de Imperial Valley, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'A cinco minutos de Imperial Valley Drive, sin freeway. Citas temprano para quienes trabajan por turnos o viajan, y ayuda el mismo día para el dolor de muela.';

const ROUTE_STEPS = [
  {
    title: 'Empieza en Imperial Valley Drive',
    text: 'Avanza hacia Greens Road. Sin incorporarte a un freeway y sin casetas, solo un recorrido directo por calles locales.',
  },
  {
    title: 'Gira en Greenspoint Drive',
    text: 'Nuestra dirección es 12523 Greenspoint Drive, en el distrito de negocios de Greenspoint.',
  },
  {
    title: 'Estaciónate en la puerta',
    text: 'El estacionamiento es gratis y está justo frente a la oficina, así no das vueltas en un estacionamiento de varios niveles antes de una limpieza.',
  },
];

const EARLY_SLOTS = [
  { day: 'Lunes', hours: '8am a 4pm' },
  { day: 'Martes', hours: '8am a 12pm' },
  { day: 'Miércoles y jueves', hours: '8am a 5pm' },
  { day: 'Viernes', hours: '8am a 12pm' },
];

const FAQS = [
  {
    q: '¿Puedo tener una cita antes de que empiece mi turno?',
    a: 'Sí. Abrimos a las 8am todos los días de semana, así que una limpieza a las 8am todavía te deja tiempo para llegar al trabajo. Dinos a qué hora empiezas cuando reserves y buscaremos el primer horario del día.',
  },
  {
    q: 'Salgo en avión de Bush Intercontinental y me duele un diente. ¿Qué hago?',
    a: 'Llámanos primero. Reservamos espacio en la agenda para visitas urgentes y normalmente podemos verte el mismo día. Si algo necesita estabilizarse antes del viaje, te diremos con honestidad qué puede esperar y qué no.',
  },
  {
    q: '¿Tengo que tomar el freeway desde Imperial Valley Drive?',
    a: 'No. El recorrido es de unos cinco minutos por calles locales. Esa es una razón por la que los pacientes de Imperial Valley Drive nos eligen en lugar de oficinas al sur de Beltway 8.',
  },
  {
    q: '¿Y si solo tengo una hora corta para comer?',
    a: 'La mayoría de las limpiezas y exámenes caben bien en una hora de comida. Menciona el tiempo que tienes al reservar y te avisaremos antes de la visita si hace falta más tiempo.',
  },
];

export default function ImperialValleyES() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <Link
              to="/es/areas-de-servicio"
              className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← Todas las Áreas de Servicio
            </Link>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-body text-sm font-medium text-primary">
              <Sunrise className="h-4 w-4" />
              Citas temprano, a cinco minutos de Imperial Valley Drive
            </p>
            <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
              Dentista cerca de Imperial Valley, Houston TX
            </h1>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              Imperial Valley Drive es un corredor de trabajo, y la mayoría de nuestros pacientes de
              aquí acomodan la atención dental entre un turno, la salida de la escuela o un vuelo
              desde Bush Intercontinental. Greenspoint Dental está a menos de dos millas, unos cinco
              minutos por calles locales, y abrimos a las 8am entre semana.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-border bg-card py-8">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-heading text-lg text-foreground">Menos de 2 millas</p>
              <p className="font-body text-sm text-muted-foreground">desde Imperial Valley Drive</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-heading text-lg text-foreground">Unos 5 minutos</p>
              <p className="font-body text-sm text-muted-foreground">sin freeway ni casetas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-heading text-lg text-foreground">
                <a href="tel:+12818239987" className="hover:underline">
                  (281) 823-9987
                </a>
              </p>
              <p className="font-body text-sm text-muted-foreground">llama antes de venir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Route */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Tres vueltas entre tu calle y el sillón
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Nadie quiere una visita dental que empiece con tráfico de beltway. Esta es la ruta
            completa desde Imperial Valley Drive, desde el inicio hasta el estacionamiento.
          </p>
          <ol className="space-y-6">
            {ROUTE_STEPS.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-base text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 font-heading text-lg text-foreground">{step.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Early slots */}
      <section className="bg-primary/5 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="mb-3 font-heading text-3xl text-foreground">
              Reserva antes de que empiece tu día
            </h2>
            <p className="mb-4 font-body leading-relaxed text-muted-foreground">
              Nuestra primera cita del día es a las 8am, lo que hace posible una limpieza antes de un
              turno a las 9am, una ruta de entregas o un día completo de clases. Las mañanas de
              martes y viernes son las más tranquilas, así que son las más fáciles de conseguir con
              poco aviso.
            </p>
            <p className="font-body leading-relaxed text-muted-foreground">
              Si trabajas de noche, pregunta por un horario a media mañana. Preferimos encontrar una
              hora que te funcione antes de que postergues un diente que ya te está molestando.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="mb-4 font-heading text-lg text-foreground">Horario de oficina</p>
            <ul className="divide-y divide-border">
              {EARLY_SLOTS.map((slot) => (
                <li key={slot.day} className="flex items-center justify-between py-2.5 font-body text-sm">
                  <span className="text-muted-foreground">{slot.day}</span>
                  <span className="font-medium text-foreground">{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Travelers */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <Plane className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl text-foreground md:text-3xl">
                Sales de viaje pronto y tu diente no espera
              </h2>
            </div>
            <p className="mb-5 font-body leading-relaxed text-muted-foreground">
              Greenspoint está entre Imperial Valley Drive y Bush Intercontinental, así que vemos a
              muchos pacientes la semana antes de un viaje. Si una corona se siente floja o un diente
              empezó a punzar, llámanos antes de abordar. Te diremos con claridad si necesita
              tratamiento ahora, un arreglo temporal para la semana o nada hasta que regreses.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'Visitas el mismo día por dolor, inflamación y dientes rotos',
                'Reparaciones temporales cuando viajas en pocos días',
                'Orientación honesta sobre qué puede esperar sin riesgo',
                'Registros que puedes llevar contigo si te mudas',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            Cuánto cuesta una primera visita aquí
          </h2>
          <p className="mb-8 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Deberías saber el precio antes de reservar. Los pacientes nuevos pagan una tarifa fija por
            un examen completo, radiografías y limpieza, y cada tratamiento posterior se cotiza por
            escrito primero. No se requiere seguro, aunque trabajamos con la mayoría de los planes.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-6">
              <p className="font-heading text-4xl font-bold text-primary">$99</p>
              <p className="mt-1 font-heading text-lg text-foreground">Visita de paciente nuevo</p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Examen, radiografías y limpieza en una sola cita
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-heading text-lg text-foreground">Visita urgente</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                Llama antes y te cotizamos el costo del examen y el rango probable del tratamiento por
                teléfono, antes de que vengas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">
            Las preguntas más comunes de Imperial Valley
          </h2>
          <dl className="divide-y divide-border rounded-2xl border border-border bg-background px-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="mb-2 font-heading text-base text-foreground">{faq.q}</dt>
                <dd className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <InternalLinkHubES
        currentPath="/es/areas-de-servicio/imperial-valley"
        areaName="Imperial Valley"
        intro="Los pacientes de Imperial Valley Drive vienen a nuestra oficina de Greenspoint para limpiezas, coronas, blanqueamiento y brackets. Explora los tratamientos que ofrecemos o encuentra la página del vecindario más cercano a ti."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            Todavía hay una cita de 8am libre esta semana
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            Llama y encontraremos una hora que se acomode a tu turno, o reserva en línea y menciona que
            vienes de Imperial Valley Drive.
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