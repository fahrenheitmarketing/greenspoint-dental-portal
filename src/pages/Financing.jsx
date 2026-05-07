import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, Shield, Heart, DollarSign, FileText, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';

const paymentOptions = [
  {
    title: 'CareCredit',
    description: 'Finance your dental care with low monthly payments. CareCredit offers promotional financing for treatments like crowns, braces, implants, and more. Apply online in minutes.',
    features: ['0% interest promotional periods', 'Low monthly payments', 'Quick online application', 'Use for the whole family'],
  },
  {
    title: 'The HELPcard',
    description: "Instant approval with small, affordable payments that fit any budget. The HELPcard is designed specifically for healthcare — making it easy to get the treatment you need today.",
    features: ['Instant approval', 'Affordable monthly payments', 'No annual fees', 'Designed for healthcare'],
  },
  {
    title: 'LendingUSA',
    description: 'Small, low-interest loans for dental work. Their simple online process makes it quick and painless to get approved, so you can focus on your health instead of your wallet.',
    features: ['Low-interest loans', 'Simple online process', 'Fast approval', 'Flexible repayment terms'],
  },

];

const insurancePlans = [
  'Aetna', 'Anthem Blue Cross', 'Cigna', 'Guardian', 'Humana Dental',
  'MetLife', 'United Healthcare', 'United Concordia', 'Spirit Dental',
  'Assurant', 'GE Wellness Plan', 'Dental Benefit Providers', 'DentalMax',
  'Oxford Health Plans', 'Dental Select',
];

const faqs = [
  {
    question: "What if I don't have insurance?",
    answer: "No insurance? No problem. We offer affordable self-pay rates and multiple financing options so you can get the care you need. Our new patient special is just $99 for a comprehensive exam, X-rays, and cleaning — a great way to get started."
  },
  {
    question: "Can I get a payment plan for braces or implants?",
    answer: "Absolutely. We understand that orthodontics and implants are bigger investments. We offer CareCredit, HELPcard, and LendingUSA to break the cost into manageable monthly payments. We'll work with you to find a plan that fits your budget."
  },
  {
    question: "How do I know if my insurance covers a procedure?",
    answer: "Our front office team will verify your benefits and submit all insurance claims on your behalf. Before any treatment, we'll give you a clear estimate of what your insurance covers and what your out-of-pocket cost will be. No surprises."
  },
  {
    question: "Do you accept Medicaid or DHMO plans?",
    answer: "Unfortunately, we do not accept DMO, DHMO, Medicare, or Medicaid plans at this time. However, we do offer very competitive self-pay rates and financing options that may be more affordable than you think. Please call us — we're happy to discuss your options."
  },
  {
    question: "I need a lot of dental work. Can I spread out the cost?",
    answer: "Yes! For major treatments, we create a phased treatment plan that prioritizes what's most urgent and spreads the work (and cost) over multiple visits. Combined with our financing options, even extensive dental work becomes manageable."
  },
];

export default function Financing() {
  const t = useTranslation();
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('financing.badge')}</p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              {t('financing.title')}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('financing.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Core message */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
            {t('financing.coreMessage')}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('financing.coreText')}
          </p>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('financing.paymentBadge')}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              {t('financing.paymentTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('financing.paymentDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl text-foreground">{t('financing.careCredit')}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t('financing.careCreditDesc')}</p>
              <div className="space-y-2">
                {[t('financing.careCreditFeatures')[0], t('financing.careCreditFeatures')[1], t('financing.careCreditFeatures')[2], t('financing.careCreditFeatures')[3]].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl text-foreground">{t('financing.helpcard')}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t('financing.helpcardDesc')}</p>
              <div className="space-y-2">
                {[t('financing.helpcardFeatures')[0], t('financing.helpcardFeatures')[1], t('financing.helpcardFeatures')[2], t('financing.helpcardFeatures')[3]].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl text-foreground">{t('financing.lendingUSA')}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{t('financing.lendingUSADesc')}</p>
              <div className="space-y-2">
                {[t('financing.lendingUSAFeatures')[0], t('financing.lendingUSAFeatures')[1], t('financing.lendingUSAFeatures')[2], t('financing.lendingUSAFeatures')[3]].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('financing.insuranceBadge')}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              {t('financing.insuranceTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('financing.insuranceDesc')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
            {insurancePlans.map((plan) => (
              <span key={plan} className="px-4 py-2 bg-card rounded-full border border-border text-sm text-foreground">
                {plan}
              </span>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl mx-auto text-center">
            <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">{t('financing.insuranceNote')}
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-secondary font-medium text-sm uppercase tracking-wider mb-3">{t('financing.faqBadge')}</p>
            <h2 className="font-heading text-3xl text-foreground mb-4">{t('financing.faqTitle')}</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">{t('financing.ctaPayment')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('financing.ctaPaymentDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:2818239987">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
                {t('financing.ctaCall')}
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold border-primary/30 text-primary">
                {t('financing.ctaMessage')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}