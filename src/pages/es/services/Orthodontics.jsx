import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const treatments = [
  { title: 'Aparatos Metálicos Tradicionales', description: "La opción más efectiva y asequible para problemas de alineación complejos. Los aparatos metálicos de hoy son más pequeños y cómodos que nunca. Excelentes para niños, adolescentes y adultos.", price: '$4,235 – $6,500' },
  { title: 'Aparatos Cerámicos', description: "Los mismos excelentes resultados que los aparatos metálicos, pero con brackets transparentes o del color del diente que se mezclan con tu sonrisa. Una opción popular para adultos que quieren una apariencia más discreta.", price: '$4,800 – $7,000' },
  { title: 'Alineadores Transparentes Invisalign', description: "Alineadores removibles y casi invisibles que enderezan gradualmente tus dientes. Convenientes, cómodos y perfectos para problemas de alineación leves a moderados. Come lo que quieras, quítalos cuando los necesites.", price: 'Varía — consulta gratuita' },
  { title: 'Retenedores', description: "Después de tu tratamiento con aparatos o Invisalign, los retenedores mantienen tus dientes en su nueva posición. Ofrecemos retenedores Hawley, retenedores transparentes Essix y opciones permanentes adheridas.", price: 'Incluido con el tratamiento' },
];

const faqs = [
  { q: '¿Soy demasiado mayor para aparatos?', a: '¡Absolutamente no! Más de 1 millón de estadounidenses mayores de 18 años usan aparatos. La edad no es una barrera para una sonrisa más recta. Vemos pacientes adultos regularmente que están encantados con sus resultados.' },
  { q: '¿Cuánto tiempo necesitaré usar aparatos?', a: 'La mayoría de los tratamientos duran de 12 a 30 meses, dependiendo de la gravedad de tu caso y el tipo de aparatos. Te daremos un cronograma claro en tu consulta.' },
  { q: '¿Duelen los aparatos?', a: 'Puedes sentir algo de malestar leve durante algunos días después de que se coloquen por primera vez y después de los ajustes, pero es muy manejable. La mayoría de los pacientes dicen que es mucho más fácil de lo esperado.' },
  { q: '¿Puedo hacer pagos mensuales para aparatos?', a: 'Sí. Ofrecemos planes de pago internos específicamente para tratamientos de ortodoncia, además de financiamiento CareCredit y HELPcard. Trabajaremos contigo para encontrar un pago mensual que se ajuste a tu presupuesto.' },
  { q: '¿El seguro cubre los aparatos?', a: 'Muchos planes de seguro cubren el tratamiento de ortodoncia para niños menores de 18 años (hasta el 50% en algunos casos). La cobertura para adultos varía. Verificaremos tus beneficios y te ayudaremos a maximizarlos.' },
];

export default function OrthodonticsES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-chart-4/5 via-background to-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/es/services" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← Todos los Servicios</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Ortodoncia</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Una sonrisa recta y alineada no se trata solo de apariencia — se trata de salud, confianza y calidad de vida. El Dr. Bosse tiene décadas de experiencia en ortodoncia y te ayudará a ti o a tu hijo a encontrar el tratamiento correcto a un precio que funcione.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl text-foreground mb-4">Opciones de Tratamiento y Precios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Creemos en precios transparentes. Aquí está lo que puedes esperar — y recuerda, ofrecemos financiamiento para hacer cada opción asequible.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {treatments.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-chart-4 mt-0.5 shrink-0" />
                  <h3 className="font-heading text-xl text-foreground">{t.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8 mb-4">{t.description}</p>
                <div className="flex items-center gap-2 pl-8">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">{t.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl text-foreground mb-3">Los Aparatos No Deben Arruinar Tu Bolsillo</h3>
          <p className="text-muted-foreground mb-6">Ofrecemos planes de pago internos, financiamiento CareCredit y HELPcard para que tu familia pueda costear la atención de ortodoncia. Muchos pacientes pagan tan poco como la factura del celular por mes.</p>
          <Link to="/es/financing">
            <Button variant="outline" className="rounded-full px-8 border-primary/30 text-primary">Ver Opciones de Financiamiento</Button>
          </Link>
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
          <h2 className="font-heading text-3xl text-foreground mb-4">Consulta Ortodóntica Gratuita</h2>
          <p className="text-muted-foreground mb-8">Descubre qué opción es la correcta para ti o tu hijo. Sin costo, sin obligación. Se habla español.</p>
          <Link to="/es/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Programa Tu Consulta Gratuita</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}