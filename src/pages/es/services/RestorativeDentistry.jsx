import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  { title: 'Coronas', description: 'Una corona es una tapa en forma de diente que cubre un diente dañado o debilitado. Las coronas restauran la fuerza, función y apariencia. Usamos coronas de porcelana que se ven y se sienten completamente naturales.' },
  { title: 'Puentes', description: 'Un puente abarca el espacio creado por dientes faltantes, usando dientes adyacentes para soporte. Los puentes son fijos (no removibles) y se ven como tus dientes naturales.' },
  { title: 'Implantes Dentales', description: 'El estándar de oro para reemplazar dientes faltantes. Un implante es una solución permanente que se ve, se siente y funciona como un diente real. El Dr. Bosse tiene entrenamiento especializado en implantes y te guiará en cada paso.' },
  { title: 'Dentaduras', description: 'Las dentaduras completas o parciales pueden reemplazar múltiples dientes faltantes y devolverte la capacidad de comer, hablar y sonreír cómodamente. Las dentaduras modernas son más naturales y cómodas que nunca.' },
  { title: 'Terapia de Endodoncia', description: 'No te preocupes — una endodoncia es mucho más sencilla de lo que la mayoría piensa, y salva un diente que de otro modo habría que extraer. Usamos técnicas modernas y opciones de sedación para hacer el procedimiento cómodo y virtualmente indoloro.' },
  { title: 'Rehabilitación Bucal Completa', description: 'Cuando necesitas trabajo dental extenso, crearemos un plan integral para restaurar toda tu sonrisa. Dividimos el tratamiento en fases y ofrecemos financiamiento para hacerlo manejable — porque todos merecen una segunda oportunidad de tener una sonrisa saludable.' },
  { title: 'Tratamiento de Encías y Periodontal', description: 'La enfermedad de las encías es más común de lo que piensas, y no hay que avergonzarse de ello. Ofrecemos tratamientos gentiles y efectivos para restaurar la salud de tus encías y prevenir daños mayores.' },
  { title: 'Incrustaciones y Onlays', description: 'Cuando un empaste no es suficiente pero una corona no es necesaria, las incrustaciones y onlays proporcionan el punto intermedio perfecto. Se fabrican a medida para ajustarse precisamente a tu diente y restaurar su fuerza.' },
];

const faqs = [
  { q: 'Me da vergüenza el estado de mis dientes. ¿Me van a juzgar?', a: 'Absolutamente no. Vemos pacientes todos los días que han pospuesto el cuidado dental por diversas razones — la vida pasa. Estamos aquí para ayudar, no para juzgar. Cualquier condición en que estén tus dientes, la hemos visto antes y sabemos cómo ayudar.' },
  { q: '¿Cuánto cuestan los implantes dentales?', a: 'Los costos de los implantes varían dependiendo de tus necesidades específicas, pero ofrecemos consultas gratuitas para que sepas exactamente qué esperar. También tenemos múltiples opciones de financiamiento incluyendo CareCredit, HELPcard y planes de pago internos.' },
  { q: '¿Puedo hacer todo el trabajo dental de una vez?', a: '¡En algunos casos, sí! Para trabajo extenso, a menudo creamos un plan de tratamiento por fases que prioriza las necesidades urgentes primero. Esto también ayuda a distribuir el costo en el tiempo.' },
  { q: '¿Son dolorosas las endodoncias?', a: 'Las endodoncias modernas son mucho más cómodas de lo que su reputación sugiere. Con anestesia local y opciones de sedación, la mayoría de los pacientes sienten poco o ningún malestar. El procedimiento en realidad alivia el dolor al tratar la infección que lo causa.' },
];

export default function RestorativeDentistryES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-accent/5 via-background to-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/es/servicios" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← Todos los Servicios</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Odontología Restauradora</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Ya sea que necesites una sola corona o una restauración completa de sonrisa, estamos aquí para ayudar — con compasión, habilidad y opciones de pago flexibles. Este es un espacio sin prejuicios, y tu nuevo comienzo empieza aquí.</p>
          </div>
        </div>
      </section>

      <div className="bg-primary/5 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            <p className="font-medium">No nos importa cuánto tiempo ha pasado. Nos importa ayudarte a sentirte bien con tu sonrisa nuevamente.</p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
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
          <h2 className="font-heading text-3xl text-foreground mb-4">Tu Restauración de Sonrisa Comienza Aquí</h2>
          <p className="text-muted-foreground mb-8">Consulta gratuita. Precios claros. Financiamiento disponible. Se habla español.</p>
          <Link to="/es/contacto">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Programa Tu Consulta Gratuita</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}