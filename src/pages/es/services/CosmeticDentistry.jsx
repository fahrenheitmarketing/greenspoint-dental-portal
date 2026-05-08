import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  { title: 'Zoom! Blanqueamiento de Dientes', description: 'Un tratamiento de blanqueamiento seguro, rápido y profesional que puede iluminar tu sonrisa varios tonos en una sola visita. Perfecto para un impulso de confianza antes de un evento especial, una entrevista de trabajo, o simplemente porque te lo mereces.' },
  { title: 'Carillas de Porcelana', description: 'Cáscaras delgadas y hechas a medida que se colocan sobre tus dientes existentes para corregir chips, espacios, manchas o dientes mal formados. Se ven y se sienten completamente naturales. Las carillas realmente pueden transformar tu sonrisa.' },
  { title: 'Alineadores Transparentes Invisalign', description: 'Endereza tus dientes discretamente con alineadores transparentes y removibles. Sin brackets de metal, sin alambres. Invisalign es cómodo, conveniente y excelente para adultos y adolescentes que quieren una sonrisa más recta sin aparatos tradicionales.' },
  { title: 'Restauraciones de Sonrisa', description: 'Un plan personalizado que combina múltiples procedimientos cosméticos para revitalizar completamente tu sonrisa. Ya sea que necesites blanqueamiento, carillas, adhesión o trabajo de alineación, crearemos un plan adaptado a tus objetivos y presupuesto.' },
  { title: 'Adhesión Dental', description: 'Una forma rápida y asequible de reparar dientes astillados, rotos o descoloridos. Aplicamos un material compuesto del color del diente que se mezcla perfectamente con tus dientes naturales. La mayoría de los procedimientos de adhesión se realizan en una sola visita.' },
  { title: 'Contorneado de Encía', description: 'Si sientes que tus encías se muestran demasiado o son desiguales, el contorneado de encía puede crear una línea de sonrisa más equilibrada y atractiva. Es un procedimiento simple que hace una gran diferencia en cómo se ve tu sonrisa.' },
];

const faqs = [
  { q: '¿Cuánto cuestan las carillas?', a: 'Nuestras carillas de porcelana comienzan en $2,780. Ofrecemos opciones de financiamiento a través de CareCredit, HELPcard y planes de pago internos para hacer las carillas asequibles. Ven para una consulta gratuita para discutir tus opciones.' },
  { q: '¿Es seguro el blanqueamiento de dientes?', a: '¡Sí! El blanqueamiento de dientes profesional realizado por nuestro equipo es completamente seguro. Puedes experimentar una sensibilidad leve durante uno o dos días, pero es temporal.' },
  { q: '¿Cuánto tiempo tarda Invisalign?', a: 'La mayoría de los tratamientos con Invisalign toman de 12 a 18 meses, aunque los casos simples pueden ser más rápidos. Te daremos un cronograma claro y una estimación de costo en tu consulta gratuita.' },
  { q: '¿Puedo pagar la odontología cosmética?', a: 'La odontología cosmética es más asequible de lo que muchas personas piensan, especialmente con nuestras opciones de financiamiento. Ofrecemos planes de pagos mensuales bajos que hacen tratamientos como blanqueamiento, adhesión e incluso carillas accesibles para más personas.' },
];

export default function CosmeticDentistryES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-secondary/5 via-background to-primary/5 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch min-h-96">
            <div className="flex flex-col justify-center">
              <Link to="/es/servicios" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← Todos los Servicios</Link>
              <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Odontología Cosmética</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">Tu sonrisa es una de las cosas más poderosas que tienes. Abre puertas, construye conexiones y aumenta la confianza. Si no estás feliz con tu sonrisa, podemos ayudarte a cambiarla — y puede ser más asequible de lo que piensas.</p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex items-end justify-center h-full">
              <img src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/882f9e20f_generated_image.png" alt="Mujer con hermosa sonrisa" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-10 h-10 text-secondary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Nunca Subestimes el Poder de Tu Sonrisa</h2>
          <p className="text-muted-foreground leading-relaxed">La investigación muestra que las personas que sonríen con confianza se perciben como más accesibles, más agradables y más capaces. Ya sea una entrevista de trabajo, una primera cita o una foto familiar — tu sonrisa importa. Y en Greenspoint Dental, hacemos posible que todos tengan una de la que estén orgullosos.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
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
          <h2 className="font-heading text-3xl text-foreground mb-4">Consulta Cosmética Gratuita</h2>
          <p className="text-muted-foreground mb-8">Ven y hablemos sobre tus objetivos de sonrisa. Sin presión, sin obligación — solo consejo honesto y una idea clara de tus opciones y costos.</p>
          <Link to="/es/contacto">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 font-semibold">Programa Tu Consulta Gratuita</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}