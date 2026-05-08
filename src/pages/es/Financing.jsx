import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, Heart, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const paymentOptions = [
  {
    title: 'CareCredit',
    description: 'Financia tu atención dental con pagos mensuales bajos. CareCredit ofrece financiamiento promocional para tratamientos como coronas, aparatos, implantes y más. Solicita en línea en minutos.',
    features: ['Períodos de 0% de interés', 'Pagos mensuales bajos', 'Solicitud rápida en línea', 'Úsalo para toda la familia'],
  },
  {
    title: 'The HELPcard',
    description: 'Aprobación instantánea con pagos pequeños y asequibles que se ajustan a cualquier presupuesto. El HELPcard está diseñado específicamente para atención médica, facilitando obtener el tratamiento que necesitas hoy.',
    features: ['Aprobación instantánea', 'Pagos mensuales asequibles', 'Sin cuota anual', 'Diseñado para atención médica'],
  },
  {
    title: 'LendingUSA',
    description: 'Préstamos pequeños y de bajo interés para trabajo dental. Su simple proceso en línea hace que sea rápido e indoloro obtener aprobación, para que puedas enfocarte en tu salud en lugar de tu billetera.',
    features: ['Préstamos de bajo interés', 'Proceso simple en línea', 'Aprobación rápida', 'Términos de pago flexibles'],
  },
];

const insurancePlans = [
  'Aetna', 'Anthem Blue Cross', 'Cigna', 'Guardian', 'Humana Dental',
  'MetLife', 'United Healthcare', 'United Concordia', 'Spirit Dental',
  'Assurant', 'GE Wellness Plan', 'Dental Benefit Providers', 'DentalMax',
  'Oxford Health Plans', 'Dental Select',
];

const faqs = [
  { question: '¿Qué pasa si no tengo seguro?', answer: '¿Sin seguro? Sin problema. Ofrecemos tarifas de autopago asequibles y múltiples opciones de financiamiento para que puedas obtener la atención que necesitas. Nuestra oferta especial para pacientes nuevos es de $99 por un examen completo, radiografías y limpieza — una excelente forma de comenzar.' },
  { question: '¿Puedo obtener un plan de pago para aparatos o implantes?', answer: 'Absolutamente. Entendemos que la ortodoncia y los implantes son inversiones más grandes. Ofrecemos CareCredit, HELPcard y LendingUSA para dividir el costo en pagos mensuales manejables. Trabajaremos contigo para encontrar un plan que se ajuste a tu presupuesto.' },
  { question: '¿Cómo sé si mi seguro cubre un procedimiento?', answer: 'Nuestro equipo de oficina verificará tus beneficios y presentará todos los reclamos de seguros en tu nombre. Antes de cualquier tratamiento, te daremos una estimación clara de lo que cubre tu seguro y cuál será tu costo de bolsillo. Sin sorpresas.' },
  { question: '¿Aceptan planes Medicaid o DHMO?', answer: 'Desafortunadamente, no aceptamos planes DMO, DHMO, Medicare o Medicaid en este momento. Sin embargo, ofrecemos tarifas de autopago muy competitivas y opciones de financiamiento que podrían ser más asequibles de lo que piensas. Por favor llámanos — nos encantaría discutir tus opciones.' },
  { question: 'Necesito mucho trabajo dental. ¿Puedo distribuir el costo?', answer: '¡Sí! Para tratamientos mayores, creamos un plan de tratamiento por fases que prioriza lo más urgente y distribuye el trabajo (y el costo) en múltiples visitas. Combinado con nuestras opciones de financiamiento, incluso el trabajo dental extenso se vuelve manejable.' },
];

export default function FinancingES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Financiamiento y Seguros</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              La Atención Dental Excelente No Debe Quebrar Tu Banco
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Creemos que todos merecen acceso a atención dental de calidad, sin importar su situación financiera. Por eso ofrecemos múltiples formas de hacer el tratamiento asequible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Nunca Te Rechazaremos por Falta de Dinero</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Tu salud es demasiado importante para posponerla. Si el costo te ha impedido ver a un dentista, por favor háblanos. Trabajaremos juntos para encontrar una solución que se ajuste a tu presupuesto. Siempre hay una forma, y estamos aquí para ayudarte a encontrarla.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Opciones de Pago</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Formas Flexibles de Pagar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aceptamos efectivo, cheques, todas las tarjetas de crédito principales, y varios programas de financiamiento diseñados para hacer la atención dental asequible.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {paymentOptions.map((option, i) => (
              <motion.div key={option.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h3 className="font-heading text-xl text-foreground">{option.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{option.description}</p>
                <div className="space-y-2">
                  {option.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Seguros</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Aceptamos la Mayoría de los Planes de Seguros</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Presentamos todos los formularios de seguros por ti y te ayudamos a maximizar tus beneficios dentales al máximo. ¿No ves tu plan en la lista? Llámanos, aceptamos muchos más de los que se muestran aquí.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
            {insurancePlans.map((plan) => (
              <span key={plan} className="px-4 py-2 bg-card rounded-full border border-border text-sm text-foreground">{plan}</span>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl mx-auto text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">Por favor nota: No aceptamos planes DMO, DHMO, Medicare o Medicaid. Sin embargo, nuestras tarifas de auto-pago y opciones de financiamiento están diseñadas para ser asequibles para todos. No dudes en llamarnos para discutir tu situación.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Preguntas Comunes</p>
            <h2 className="font-heading text-3xl text-foreground mb-4">Preguntas Frecuentes sobre Financiamiento</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">¿Preguntas sobre Pago?</h2>
          <p className="text-muted-foreground mb-8">Nuestro equipo amable y bilingüe está feliz de guiarte a través de tus opciones. Llámanos o envía un mensaje — estamos aquí para ayudarte.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:2818239987">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Llamar (281) 823-9987</Button>
            </a>
            <Link to="/es/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold border-primary/30 text-primary">Enviar un Mensaje</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}