import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MapPin, Clock, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const RECAPTCHA_SITE_KEY = '6LcTHy4tAAAAANjcJOlUDHUDrIKcXILH28Sh_CYt';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '', honeypot: '' });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    // Load reCAPTCHA script if not already present
    if (!document.getElementById('recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Expose callback for reCAPTCHA
    window.onRecaptchaSuccess = (token) => {
      setRecaptchaToken(token);
      setRecaptchaError(false);
    };
    window.onRecaptchaExpired = () => {
      setRecaptchaToken(null);
    };

    return () => {
      delete window.onRecaptchaSuccess;
      delete window.onRecaptchaExpired;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Honeypot check — bots fill hidden fields, humans don't
    if (form.honeypot) return;
    // reCAPTCHA check
    if (!recaptchaToken) {
      setRecaptchaError(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Get in Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              We'd Love to Hear From You
            </h1>
            <p className="text-lg text-muted-foreground">
              New patients welcome. Same-day emergency appointments available. Our bilingual team is ready to help you — in English or Spanish.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-heading text-2xl text-foreground mb-6">Schedule Your First Visit</h2>
              {submitted ? (
                <div className="p-10 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-2xl text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your message and will call you within one business day to confirm your appointment. ¡Gracias por contactarnos!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — hidden from real users, bots fill it */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex="-1"
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name *</label>
                      <Input
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({...form, firstName: e.target.value})}
                        placeholder="Your first name"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input
                        value={form.lastName}
                        onChange={(e) => setForm({...form, lastName: e.target.value})}
                        placeholder="Your last name"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="your@email.com"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
                    <Input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                      rows={4}
                      className="rounded-xl"
                    />
                  </div>
                  {/* reCAPTCHA v2 */}
                  <div>
                    <div
                      ref={recaptchaRef}
                      className="g-recaptcha"
                      data-sitekey={RECAPTCHA_SITE_KEY}
                      data-callback="onRecaptchaSuccess"
                      data-expired-callback="onRecaptchaExpired"
                    />
                    {recaptchaError && (
                      <p className="text-sm text-destructive mt-2">Please complete the reCAPTCHA to continue.</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-full font-semibold">
                    Request Appointment
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll call you within one business day to confirm. Se habla español.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="p-8 rounded-2xl bg-card border border-border space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a href="tel:2818239987" className="text-primary hover:underline">(281) 823-9987</a>
                    <p className="text-sm text-muted-foreground mt-1">Call us for same-day emergency appointments</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">12523 Greenspoint Drive<br />Houston, TX 77060</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Corner of Greens Road & Greenspoint Drive, behind McDonald's. Plenty of free parking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <div className="flex justify-between gap-8">
                        <span>Monday</span><span>8:00 AM – 4:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Tuesday</span><span>8:00 AM – 12:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Wednesday</span><span>8:00 AM – 5:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Thursday</span><span>8:00 AM – 5:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Friday</span><span>8:00 AM – 12:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Se Habla Español</h3>
                    <p className="text-muted-foreground text-sm">
                      Nuestro equipo bilingüe está listo para ayudarle en español. 
                      No dude en llamar o escribir en el idioma que prefiera.
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-64">
                <iframe
                  title="Greenspoint Dental Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0!2d-95.413!3d29.937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x14a691eb604c1cb6!2sGreenspoint+Dental!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}