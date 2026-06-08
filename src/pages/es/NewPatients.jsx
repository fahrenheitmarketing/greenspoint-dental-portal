import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Globe, DollarSign, Shield, Smile, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Programa Tu Visita', description: 'Llámanos al (281) 823-9987 o completa nuestro formulario en línea. Nuestro equipo bilingüe encontrará un momento que funcione para ti. Responderemos cualquier pregunta que tengas por adelantado.' },
  { number: '02', title: 'Tu Primera Cita', description: 'Comenzamos con radiografías digitales y un examen completo. Nos tomamos el tiempo para escuchar tus preocupaciones y entender tu historia dental — sin juzgarte.' },
  { number: '03', title: 'Plan de Tratamiento Claro', description: 'Si se necesita tratamiento, explicaremos cada opción en lenguaje sencillo y te mostraremos los costos por adelantado. Trabajaremos con tu seguro y discutiremos financiamiento si es necesario.' },
  { number: '04', title: 'Comienza Tu Viaje', description: 'Ya sea una limpieza, un empaste o una restauración completa de tu sonrisa, nos aseguraremos de que te sientas cómodo en cada paso. Tu nuevo viaje de sonrisa comienza aquí.' },
];

export default function NewPatientsES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Pacientes Nuevos</p>
              <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Bienvenido — Nos Alegra que Estés Aquí</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Ya sea que haya pasado seis meses o seis años desde tu última visita al dentista, eres bienvenido aquí. Sin sermones, sin prejuicios — solo un nuevo comienzo para tu sonrisa. Nuestro equipo bilingüe te hará sentir como en casa desde tu primer llamado.
              </p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Globe className="w-4 h-4" />
                <span>Hablamos Español — Nuestro equipo habla español con fluidez</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/es/contacto">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Programa Tu Primera Visita</Button>
                </Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <img src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/a17d49ce0_generated_image.png" alt="Familia feliz con sonrisas saludables" className="rounded-3xl shadow-xl w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-2">Oferta Especial para Pacientes Nuevos</h2>
          <p className="text-6xl font-heading font-bold text-primary my-4">$99</p>
          <p className="text-xl text-muted-foreground mb-2">Examen Completo, Radiografías Completas y Limpieza Profesional</p>
          <p className="text-sm text-muted-foreground mb-8">Sin costos ocultos. Sin sorpresas. Solo atención excelente a un precio justo.</p>
          <Link to="/es/contacto">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-10 font-semibold">Aprovechar Esta Oferta</Button>
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Qué Esperar</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Tu Primera Visita, Paso a Paso</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Hemos diseñado nuestro proceso para ser directo y libre de estrés. Aquí está exactamente lo que sucede cuando nos visitas por primera vez.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                <span className="text-6xl font-heading font-bold text-primary/10">{step.number}</span>
                <h3 className="font-heading text-xl text-foreground mb-3 -mt-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Nuestras Promesas para Ti</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: 'Sin Prejuicios', text: 'No nos importa cuánto tiempo ha pasado. Nos importa ayudarte a avanzar.' },
              { icon: DollarSign, title: 'Precios Transparentes', text: 'Sabrás exactamente cuánto cuesta todo antes de que comience cualquier trabajo. Sin facturas sorpresa.' },
              { icon: Globe, title: 'Comunicación Bilingüe', text: 'Nuestro equipo habla inglés y español con fluidez. Comunícate en el idioma en el que te sientas más cómodo.' },
              { icon: Shield, title: 'Tu Comodidad Importa', text: 'Mantas cálidas, música, opciones de sedación — hacemos lo que sea necesario para ayudarte a relajarte.' },
              { icon: Smile, title: 'Recomendaciones Honestas', text: 'Solo recomendamos lo que realmente necesitas. Sin sobreventa, sin procedimientos innecesarios.' },
              { icon: CheckCircle, title: 'Pago Flexible', text: 'Múltiples opciones de financiamiento y planes de pago para que el costo no interfiera con tu salud.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Antes de Tu Visita</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Formularios para Pacientes Nuevos</h2>
            <p className="text-muted-foreground">Por favor descarga y completa estos formularios antes de tu primera cita. Puedes traerlos contigo o completarlos cuando llegues.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Información del Paciente', url: 'https://media.base44.com/files/public/69e928fd4b865057d3a65de3/6b3dc7a8c_patient-information.pdf' },
              { name: 'Formulario de Historial Médico', url: 'https://media.base44.com/files/public/69e928fd4b865057d3a65de3/a241ed784_medical-history-form.pdf' },
              { name: 'Consentimiento Informado para Tratamiento', url: 'https://media.base44.com/files/public/69e928fd4b865057d3a65de3/1a3fd91a8_INFORMED-CONSENT-FOR-TREATMENT.pdf' },
              { name: 'Reconocimiento de Recepción', url: 'https://media.base44.com/files/public/69e928fd4b865057d3a65de3/34e68004b_acknowledgement-of-receipt.pdf' },
              { name: 'Política de Privacidad', url: 'https://media.base44.com/files/public/69e928fd4b865057d3a65de3/7fb01bef4_privacy.pdf' },
            ].map((form, i) => (
              <motion.a key={form.name} href={form.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all flex items-center gap-4 group">
                <Download className="w-6 h-6 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{form.name}</p>
                  <p className="text-xs text-muted-foreground">Descarga PDF</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">¿Listo para Comenzar?</h2>
          <p className="text-muted-foreground mb-8">Da el primer paso hacia una sonrisa más saludable. Tu primera consulta es gratuita, y nuestro equipo te ayudará en cada paso del camino.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:2818239987">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">Llamar (281) 823-9987</Button>
            </a>
            <Link to="/es/contacto">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold border-primary/30 text-primary">Reservar en Línea</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}