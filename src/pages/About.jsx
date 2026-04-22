import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Globe, Shield, Award, GraduationCap, Stethoscope, Users, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">About Us</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              A Practice Built on Compassion, Not Judgment
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since 1997, Greenspoint Dental has been a trusted home for families in the Greenspoint 
              community. We're not just a dental office — we're your neighbors, and we treat every 
              patient like family.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                We Know Life Happens — And We're Here to Help
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Maybe it's been a while since your last dental visit. Maybe cost has been a concern. 
                  Maybe past experiences left you feeling anxious or embarrassed. We understand — and 
                  we want you to know that at Greenspoint Dental, <strong className="text-foreground">you will never be judged.</strong>
                </p>
                <p>
                  Our practice was built with one mission: to provide honest, high-quality dental care 
                  that's truly accessible to the community we serve. We keep our prices fair, we explain 
                  everything clearly, and we always put your comfort first.
                </p>
                <p>
                  Whether you need a simple cleaning or a complete smile restoration, we'll meet you 
                  exactly where you are and work within your budget to create a plan that works for you. 
                  No pressure, no upselling — just straightforward care from people who genuinely care.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Judgment-Free Care</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-xl">
                  <Globe className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">Bilingual Staff</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">25+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-chart-4/5 rounded-xl">
                  <Users className="w-5 h-5 text-chart-4" />
                  <span className="text-sm font-medium">Family Focused</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/bac135b62_bosse.png"
                alt="Greenspoint Dental team"
                className="rounded-3xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bilingual Section */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
              Hablamos Español — We Speak Your Language
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Our diverse team speaks fluent English, Spanish, and French. We believe language 
              should never be a barrier to understanding your dental health. From your first phone 
              call to your treatment plan, you'll be able to communicate comfortably in the 
              language you prefer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro equipo habla español con fluidez para que pueda comunicarse cómodamente 
              y comprender cada paso de su tratamiento. Su salud dental es nuestra prioridad.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Dr. Bosse */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img
                src="https://media.base44.com/images/public/69e928fd4b865057d3a65de3/c122df903_generated_3274acb5.png"
                alt="Dr. Louis P. Bosse"
                className="rounded-3xl shadow-xl w-full max-w-md mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Meet Your Dentist</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Dr. Louis P. Bosse</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Bosse has been caring for Houston smiles since 1997. With over 25 years of experience, 
                  he's known for his patient, thorough approach and his genuine ability to put people at ease — 
                  even those who haven't been to a dentist in years.
                </p>
                <p>
                  He earned his Doctor of Dental Medicine degree from the University of Montreal, completed 
                  advanced training in General Dentistry at the University of Connecticut, and specialized in 
                  Prosthodontics (crowns, bridges, dentures, and implants). He also completed a fellowship 
                  in Maxillofacial Prosthetics at The University of Texas MD Anderson Cancer Center.
                </p>
                <p>
                  What patients appreciate most about Dr. Bosse is his clear communication style. He takes the 
                  time to explain every option in plain language, discusses costs upfront, and never pressures 
                  you into a treatment you don't need or can't afford.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">University of Montreal</p>
                    <p className="text-xs text-muted-foreground">Doctor of Dental Medicine</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">MD Anderson Fellowship</p>
                    <p className="text-xs text-muted-foreground">Maxillofacial Prosthetics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Prosthodontics</p>
                    <p className="text-xs text-muted-foreground">Advanced Restorative Care</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Modern Technology</p>
                    <p className="text-xs text-muted-foreground">Digital X-rays & Imaging</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">Our Technology</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Modern Tools, Better Results, Lower Costs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our investment in modern dental technology helps us catch problems early, work more efficiently, 
              and ultimately save you money.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Digital X-Rays & Intraoral Cameras',
                description: 'See what we see. Every treatment room has a display screen so you can view your mouth in real time and understand exactly why we recommend a treatment.',
              },
              {
                title: 'Early Cavity Detection',
                description: 'Our Diagnodent fluorescent laser catches cavities at the earliest stage — often before they show on X-rays. Finding problems early means simpler, more affordable treatments.',
              },
              {
                title: 'Quiet Electric Handpieces',
                description: "No annoying drill noise. Our electric handpieces are quieter, faster, and more precise — meaning less time in the chair and a more relaxing experience.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-card border border-border"
              >
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">Ready to Experience the Difference?</h2>
          <p className="text-muted-foreground mb-8">
            Your first consultation is complimentary. Come see why families in the Greenspoint area 
            have trusted us with their smiles for over 25 years.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              Schedule Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}