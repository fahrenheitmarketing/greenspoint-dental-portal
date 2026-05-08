import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  { title: 'Limpiezas Profesionales', description: 'Removemos la acumulación de placa y sarro que tu cepillo de dientes no puede alcanzar. Una limpieza profesional dos veces al año mantiene tus dientes y encías saludables y ayuda a prevenir problemas más serios.' },
  { title: 'Empastes', description: "Si encontramos una caries, removemos la parte dañada y la rellenamos con un material compuesto del color del diente que se mezcla perfectamente con tu diente natural. Los empastes modernos son fuertes, duraderos y se ven completamente naturales." },
  { title: 'Selladores Dentales', description: 'Los selladores crean una barrera protectora en tus dientes para prevenir la caries. Son especialmente buenos para los niños, pero los adultos también se pueden beneficiar. Es una forma rápida, indolora y asequible de proteger tu sonrisa.' },
  { title: 'Detección de Cáncer Oral', description: 'Como parte de tu examen regular, revisamos signos de cáncer oral. La detección temprana hace una gran diferencia en los resultados del tratamiento. Los profesionales dentales suelen ser los primeros en detectar el cáncer oral.' },
  { title: 'Atención Dental de Emergencia', description: "El dolor de dientes o una lesión dental no puede esperar. Llámanos y haremos todo lo posible para verte el mismo día. Entendemos que las emergencias son estresantes, y te sacaremos del dolor lo más rápido posible." },
  { title: 'Odontología con Sedación', description: '¿Ansioso sobre las visitas al dentista? Ofrecemos óxido nitroso (gas hilariante) y sedación oral para ayudarte a relajarte. Permanecerás despierto y consciente, pero tranquilo y cómodo durante tu procedimiento.' },
  { title: 'Odontología Pediátrica', description: '¡Amamos trabajar con niños! Desde su primer diente hasta sus años de adolescencia, brindamos atención dental gentil y sin prejuicios que hace que los niños se sientan seguros y cómodos.' },
];

const faqs = [
  { q: '¿Con qué frecuencia debo venir para limpiezas?', a: 'La mayoría de las personas deben tener sus dientes limpiados profesionalmente dos veces al año (cada seis meses). Si tienes enfermedad de las encías o eres propenso a caries, tu dentista puede recomendar visitas más frecuentes.' },
  { q: '¿Qué pasa si tengo ansiedad dental?', a: 'No estás solo — la ansiedad dental es muy común. Ofrecemos opciones de sedación desde gas hilariante hasta sedación completa. También tenemos mantas cálidas, música y un personal genuinamente atento. Iremos a tu ritmo.' },
  { q: '¿Cuánto cuesta una limpieza regular?', a: 'Nuestra oferta especial para pacientes nuevos es $99 por un examen completo, radiografías y limpieza. También aceptamos la mayoría de los planes de seguro y ofrecemos financiamiento. Llámanos para precios específicos.' },
  { q: '¿Atienden niños?', a: 'Sí. Somos una práctica familiar y atendemos con gusto pacientes de todas las edades. Recomendamos que los niños comiencen a ver al dentista al año o dentro de los 6 meses de su primer diente.' },
];

export default function GeneralDentistryES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/es/servicios" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← Todos los Servicios</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Odontología General</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Una boca saludable comienza con lo básico. Limpiezas regulares, exámenes y cuidado preventivo son la base de una vida de dientes y encías saludables.</p>
          </div>
        </div>
      </section>

      <div className="bg-primary/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-sm"><Heart className="w-4 h-4 text-primary" /> Sin Prejuicios</div>
          <div className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4 text-secondary" /> Se habla español</div>
          <div className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-accent" /> Opciones de sedación disponibles</div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <h3 className="font-heading text-xl text-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl text-foreground mb-8 text-center">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">¿Listo para una Experiencia Dental Cómoda?</h2>
          <p className="text-muted-foreground mb-8">Examen para paciente nuevo, radiografías y limpieza por solo $99. Sin costos ocultos.</p>
          <Link to="/es/contacto">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Programa Tu Cita</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}