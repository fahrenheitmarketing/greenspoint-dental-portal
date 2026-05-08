import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Globe, Shield, Award, GraduationCap, Stethoscope, Users, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutES() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Acerca de Nosotros</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              Una Práctica Construida con Compasión, No con Prejuicio
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Desde 1997, Greenspoint Dental ha sido un hogar de confianza para familias en la comunidad de Greenspoint. No somos solo un consultorio dental, somos tus vecinos, y tratamos a cada paciente como familia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Sabemos que la Vida Sucede — Y Estamos Aquí para Ayudar
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Tal vez ha pasado un tiempo desde tu última visita al dentista. Tal vez el costo ha sido una preocupación. Tal vez experiencias pasadas te dejaron ansioso o avergonzado. Entendemos, y queremos que sepas que en Greenspoint Dental, nunca serás juzgado.</p>
                <p>Nuestra práctica fue construida con una misión: proporcionar atención dental honesta y de alta calidad que sea verdaderamente accesible para la comunidad a la que servimos. Mantenemos nuestros precios justos, explicamos todo claramente, y siempre priorizamos tu comodidad.</p>
                <p>Ya sea que necesites una limpieza simple o una restauración completa de tu sonrisa, te encontraremos exactamente donde estés y trabajaremos dentro de tu presupuesto para crear un plan que funcione para ti. Sin presión, sin sobreventa, solo atención honesta de personas que realmente se preocupan.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl"><Heart className="w-5 h-5 text-primary" /><span className="text-sm font-medium">Atención Sin Prejuicios</span></div>
                <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-xl"><Globe className="w-5 h-5 text-secondary" /><span className="text-sm font-medium">Equipo Bilingüe</span></div>
                <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl"><Shield className="w-5 h-5 text-accent" /><span className="text-sm font-medium">25+ Años de Experiencia</span></div>
                <div className="flex items-center gap-3 p-4 bg-chart-4/5 rounded-xl"><Users className="w-5 h-5 text-chart-4" /><span className="text-sm font-medium">Enfocado en la Familia</span></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/11693f3a5_generated_image.png" alt="Equipo de Greenspoint Dental" className="rounded-3xl shadow-xl w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Hablamos Español — Hablamos Tu Idioma</h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Nuestro equipo diverso habla inglés, español y francés con fluidez. Creemos que el idioma nunca debe ser una barrera para entender tu salud dental. Desde tu primera llamada hasta tu plan de tratamiento, podrás comunicarte cómodamente en el idioma que prefieras.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro equipo habla español con fluidez para que pueda comunicarse cómodamente y comprender cada paso de su tratamiento. Su salud dental es nuestra prioridad.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/2ea50fc7d_louisxray.png" alt="Dr. Louis P. Bosse" className="rounded-3xl shadow-xl w-full max-w-md mx-auto" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Conoce a Tu Dentista</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Dr. Louis P. Bosse</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>El Dr. Bosse ha estado cuidando sonrisas en Houston desde 1997. Con más de 25 años de experiencia, es conocido por su enfoque paciente y meticuloso, y su genuina capacidad para poner a las personas cómodas, incluso a aquellas que no han ido al dentista en años.</p>
                <p>Obtuvo su título de Doctor en Medicina Dental de la Universidad de Montreal, completó entrenamiento avanzado en Odontología General en la Universidad de Connecticut, y se especializó en Prostodoncia. También completó una beca en Prótesis Maxilofacial en el Centro Médico MD Anderson.</p>
                <p>Lo que los pacientes aprecian más del Dr. Bosse es su estilo de comunicación clara. Se toma el tiempo para explicar cada opción en lenguaje sencillo, discute los costos por adelantado, y nunca te presiona para un tratamiento que no necesites.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3"><GraduationCap className="w-5 h-5 text-primary mt-0.5" /><div><p className="text-sm font-medium text-foreground">Universidad de Montreal</p><p className="text-xs text-muted-foreground">Doctor en Medicina Dental</p></div></div>
                <div className="flex items-start gap-3"><Award className="w-5 h-5 text-primary mt-0.5" /><div><p className="text-sm font-medium text-foreground">Beca MD Anderson</p><p className="text-xs text-muted-foreground">Prótesis Maxilofacial</p></div></div>
                <div className="flex items-start gap-3"><Stethoscope className="w-5 h-5 text-primary mt-0.5" /><div><p className="text-sm font-medium text-foreground">Prostodoncia</p><p className="text-xs text-muted-foreground">Atención Restauradora Avanzada</p></div></div>
                <div className="flex items-start gap-3"><Monitor className="w-5 h-5 text-primary mt-0.5" /><div><p className="text-sm font-medium text-foreground">Tecnología Moderna</p><p className="text-xs text-muted-foreground">Radiografías Digitales e Imágenes</p></div></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Nuestra Tecnología</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">Herramientas Modernas, Mejores Resultados, Costos Menores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Nuestra inversión en tecnología dental moderna nos ayuda a detectar problemas temprano, trabajar más eficientemente, y en última instancia, ahorrarte dinero.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Radiografías Digitales y Cámaras Intraorales', description: 'Ve lo que vemos. Cada sala de tratamiento tiene una pantalla para que puedas ver tu boca en tiempo real y entiendas exactamente por qué recomendamos un tratamiento.' },
              { title: 'Detección Temprana de Caries', description: 'Nuestro láser de fluorescencia Diagnodent detecta caries en el estado más temprano, a menudo antes de que aparezcan en las radiografías. Encontrar problemas temprano significa tratamientos más simples y asequibles.' },
              { title: 'Piezas de Mano Eléctricas Silenciosas', description: 'Sin el molesto sonido del taladro. Nuestras piezas de mano eléctricas son más silenciosas, rápidas y precisas, lo que significa menos tiempo en la silla y una experiencia más relajante.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-7 rounded-2xl bg-card border border-border">
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">¿Listo para Experimentar la Diferencia?</h2>
          <p className="text-muted-foreground mb-8">Tu primera consulta es gratuita. Ven a ver por qué las familias del área de Greenspoint han confiado en nosotros con sus sonrisas durante más de 25 años.</p>
          <Link to="/es/contacto">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              Programa Tu Consulta Gratuita
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}