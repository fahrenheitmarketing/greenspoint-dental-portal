import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Smile, ShieldCheck, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageMeta from '@/hooks/usePageMeta';
import InternalLinkHubES from '@/components/seo/InternalLinkHubES';

const TITLE = 'Dentista Familiar cerca de Colonial Hills, Houston TX - Greenspoint Dental';
const DESCRIPTION =
  'Un dentista familiar pensado para niños a cinco minutos de Colonial Hills. Primeras visitas tranquilas, brackets y alineadores para adolescentes, protectores deportivos y formularios escolares firmados en la visita.';

const FIRST_VISIT_STEPS = [
  {
    title: 'Diez minutos sin nada que asuste',
    text: 'Empezamos con un sillón que sube y baja, un espejo que el niño puede sostener y un conteo de sus dientes. Ningún instrumento hasta que esté cómodo.',
  },
  {
    title: 'Mostrar, explicar y luego hacer',
    text: 'Cada paso se demuestra primero en su propia mano. Los niños aceptan una limpieza mucho más fácil cuando saben exactamente qué viene después.',
  },
  {
    title: 'Un papá o mamá en el cuarto',
    text: 'Te quedas con tu hijo todo el tiempo. Te explicamos lo que vemos en palabras sencillas y qué, si algo, necesita vigilancia antes de la próxima visita.',
  },
];

const ORTHO_POINTS = [
  { label: 'Brackets', text: 'Metálicos o cerámicos para apiñamiento y problemas de mordida que necesitan control preciso.' },
  { label: 'Alineadores transparentes', text: 'Placas removibles para adolescentes que las usan con disciplina y tienen correcciones más simples.' },
  { label: 'Tiempo típico', text: 'La mayoría de los casos en adolescentes dura de 18 a 24 meses, con una consulta gratis y un presupuesto por escrito primero.' },
  { label: 'Retenedores', text: 'Incluidos en la conversación del plan para que los dientes no se muevan de nuevo cuando salgan los brackets.' },
];

const FAQS = [
  {
    q: '¿A qué edad debe ser la primera visita dental de mi hijo?',
    a: 'Alrededor del primer cumpleaños, o dentro de los seis meses posteriores a la aparición del primer diente. Las primeras visitas son cortas y se tratan sobre todo de hábitos y comodidad, para que nada se sienta abrumador.',
  },
  {
    q: '¿Puedo reservar a todos mis hijos el mismo día?',
    a: 'Sí, y la mayoría de las familias de Colonial Hills lo hace. Dinos cuántos niños vienen al reservar y bloquearemos citas consecutivas para que hagas un solo viaje.',
  },
  {
    q: '¿Hacen protectores bucales deportivos?',
    a: 'Sí. Un protector hecho a la medida se ajusta mejor que uno de los que se hierven en agua y cuesta menos que reparar un diente que se salió. Tráelo para revisarlo si tu hijo juega fútbol americano, basquetbol o soccer.',
  },
  {
    q: '¿Firman los formularios dentales de la escuela y la guardería?',
    a: 'Sí. Trae el formulario a la cita y lo completamos y firmamos antes de que te vayas, para que no se quede semanas en la cocina.',
  },
];

export default function ColonialHillsES() {
  usePageMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <Link
              to="/es/areas-de-servicio"
              className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← Todas las Áreas de Servicio
            </Link>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 font-body text-sm font-medium text-accent">
              <Smile className="h-4 w-4" />
              Pensado para familias con niños
            </p>
            <h1 className="mb-6 font-heading text-4xl text-foreground md:text-5xl">
              Dentista Familiar cerca de Colonial Hills, Houston TX
            </h1>
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              La mayoría de los hogares de Colonial Hills están haciendo malabares con la escuela, los
              entrenamientos y un niño que tiene nervios por el dentista. Nuestra oficina está a unos
              cinco minutos por Beltway 8, y todo nuestro enfoque está diseñado para que un solo viaje
              cubra a toda la familia.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-b border-border bg-card py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 font-body text-sm">
          <span className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            Unos 5 minutos por Beltway 8
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <CalendarCheck className="h-4 w-4 text-accent" />
            Hermanos con citas consecutivas
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Consulta de brackets gratis
          </span>
          <span className="flex items-center gap-2 text-foreground">
            <Phone className="h-4 w-4 text-accent" />
            <a href="tel:+12818239987" className="font-medium text-primary hover:underline">
              (281) 823-9987
            </a>
          </span>
        </div>
      </div>

      {/* First visit */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">
            La primera visita de tu hijo, paso a paso
          </h2>
          <p className="mb-10 max-w-2xl font-body leading-relaxed text-muted-foreground">
            Una mala primera visita puede seguir a un niño por años. La mantenemos tranquila, la
            mantenemos corta, y nunca sujetamos a un niño a la fuerza para terminar una limpieza.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {FIRST_VISIT_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl bg-accent/5 p-6"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-heading text-lg text-accent">
                  {index + 1}
                </span>
                <h3 className="mb-2 font-heading text-lg text-foreground">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ortho */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-3 font-heading text-3xl text-foreground">Brackets para la adolescencia</h2>
          <p className="mb-8 max-w-2xl font-body leading-relaxed text-muted-foreground">
            La consulta de ortodoncia suele aparecer en la secundaria, cuando ya salieron los últimos
            dientes de leche. Ofrecemos brackets y alineadores transparentes en la misma oficina que
            las limpiezas de tu familia, lo que evita un segundo conjunto de citas al otro lado de la
            ciudad.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {ORTHO_POINTS.map((point) => (
              <div key={point.label} className="rounded-2xl border border-border bg-background p-5">
                <p className="mb-1 font-heading text-base text-foreground">{point.label}</p>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{point.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-body text-sm text-muted-foreground">
            <Link to="/es/servicios/ortodoncia" className="font-medium text-primary hover:underline">
              Conoce cómo funciona el tratamiento de ortodoncia en Greenspoint Dental
            </Link>
          </p>
        </div>
      </section>

      {/* Sports + school */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 font-heading text-3xl text-foreground">
            Temporada deportiva, formularios y dientes rotos
          </h2>
          <p className="mb-4 font-body leading-relaxed text-muted-foreground">
            Cada otoño vemos la misma seguidilla de tres cosas: protectores que no ajustan,
            formularios que se entregan mañana y un diente frontal roto por un partido del viernes.
            Las tres son fáciles de resolver si vienes antes de que empiece la temporada.
          </p>
          <div className="rounded-2xl border-l-4 border-accent bg-accent/5 p-6">
            <ul className="space-y-3 font-body text-sm leading-relaxed text-muted-foreground">
              <li>Protectores bucales hechos a la medida con una impresión de los dientes de tu hijo</li>
              <li>Formularios dentales de escuela, guardería y deportes firmados en la visita</li>
              <li>Citas el mismo día para dientes que se salieron, se rompieron o se movieron</li>
              <li>Orientación sobre qué hacer en la primera hora después de una lesión dental</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-heading text-3xl text-foreground">
            Preguntas de padres de Colonial Hills
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <h3 className="mb-2 font-heading text-base text-foreground">{faq.q}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkHubES
        currentPath="/es/areas-de-servicio/colonial-hills"
        areaName="Colonial Hills"
        intro="Las familias de Colonial Hills reservan limpiezas, empastes, brackets, protectores y blanqueamiento en nuestra oficina de Greenspoint. Explora los tratamientos que ofrecemos o encuentra la página del vecindario más cercano a ti."
      />

      {/* CTA */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl text-foreground">Un viaje para toda la familia</h2>
          <p className="mb-8 font-body text-muted-foreground">
            Dinos cuántos niños vienen y acomodaremos las citas una tras otra. Pregunta por la visita
            de $99 para pacientes nuevos de cualquier miembro de la familia que sea nuevo con nosotros.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/es/contacto">
              <Button size="lg" className="rounded-full bg-primary px-8 font-semibold hover:bg-primary/90">
                Reserva Citas Familiares
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