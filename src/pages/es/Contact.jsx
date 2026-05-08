import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MapPin, Clock, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactES() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Ponte en Contacto</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Nos Encantaría Escucharte</h1>
            <p className="text-lg text-muted-foreground">Los pacientes nuevos son bienvenidos. Citas de emergencia disponibles el mismo día. Nuestro equipo bilingüe está listo para ayudarte, en inglés o español.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-heading text-2xl text-foreground mb-6">Programa Tu Primera Visita</h2>
              {submitted ? (
                <div className="p-10 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-2xl text-foreground mb-2">¡Gracias!</h3>
                  <p className="text-muted-foreground">Hemos recibido tu mensaje y te llamaremos dentro de un día hábil para confirmar tu cita. ¡Gracias por contactarnos!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre *</label>
                      <Input required value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} placeholder="Tu nombre" className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Apellido</label>
                      <Input value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} placeholder="Tu apellido" className="rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Correo Electrónico</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="tu@correo.com" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Teléfono *</label>
                    <Input required type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="(555) 123-4567" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Mensaje</label>
                    <Textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="Cuéntanos cómo podemos ayudarte..." rows={4} className="rounded-xl" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-full font-semibold">Solicitar Cita</Button>
                  <p className="text-xs text-muted-foreground text-center">Te llamaremos dentro de un día hábil para confirmar. Se habla español.</p>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="p-8 rounded-2xl bg-card border border-border space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                    <a href="tel:2818239987" className="text-primary hover:underline">(281) 823-9987</a>
                    <p className="text-sm text-muted-foreground mt-1">Llámanos para citas de emergencia el mismo día</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                    <p className="text-muted-foreground">12523 Greenspoint Drive<br />Houston, TX 77060</p>
                    <p className="text-sm text-muted-foreground mt-1">Esquina de Greens Road y Greenspoint Drive, detrás de McDonald's. Estacionamiento gratuito disponible.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horarios</h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <div className="flex justify-between gap-8"><span>Lunes</span><span>8:00 AM – 4:00 PM</span></div>
                      <div className="flex justify-between gap-8"><span>Martes</span><span>8:00 AM – 12:00 PM</span></div>
                      <div className="flex justify-between gap-8"><span>Miércoles</span><span>8:00 AM – 5:00 PM</span></div>
                      <div className="flex justify-between gap-8"><span>Jueves</span><span>8:00 AM – 5:00 PM</span></div>
                      <div className="flex justify-between gap-8"><span>Viernes</span><span>8:00 AM – 12:00 PM</span></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0"><Globe className="w-5 h-5 text-secondary" /></div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Se Habla Español</h3>
                    <p className="text-muted-foreground text-sm">Nuestro equipo bilingüe está listo para ayudarle en español. No dude en llamar o escribir en el idioma que prefiera.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border h-64">
                <iframe title="Ubicación de Greenspoint Dental" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0!2d-95.413!3d29.937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x14a691eb604c1cb6!2sGreenspoint+Dental!5e0!3m2!1sen!2sus!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}