import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const locations = [
  {
    name: 'Imperial Valley',
    distance: 'Less than 2 miles away',
    time: '5-minute drive',
    description: 'Near Imperial Valley Drive, just minutes away with no freeway needed.',
    path: '/service-areas/imperial-valley',
  },
  {
    name: 'Southbrook',
    distance: 'Under a mile away',
    time: '2-5 minutes',
    description: 'One of the closest areas we serve, directly accessible via I-45 service road.',
    path: '/service-areas/southbrook',
  },
  {
    name: 'Colonial Hills',
    distance: 'Around 1.5 miles away',
    time: '5-minute drive',
    description: 'Quick and straightforward to reach via Beltway 8.',
    path: '/service-areas/colonial-hills',
  },
  {
    name: 'Green Ridge North',
    distance: 'About a mile away',
    time: '5 minutes',
    description: 'Easily accessible using local roads, no freeway required.',
    path: '/service-areas/green-ridge-north',
  },
];

export default function ServiceAreas() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/" className="text-primary text-sm font-medium hover:underline mb-4 inline-block">← Home</Link>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">Service Areas Near Greenspoint</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We serve several neighborhoods in the Greenspoint area. Whether you live in Imperial Valley, Southbrook, Colonial Hills, or Green Ridge North, 
              you're just minutes away from quality dental care.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location, i) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-heading text-2xl text-foreground mb-2">{location.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-primary">{location.distance}</p>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{location.time}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{location.description}</p>

                <Link to={location.path}>
                  <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/5">
                    View Details →
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Greenspoint CTA */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl text-foreground mb-4">Convenient Dental Care Close to Home</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Being close to your dentist makes staying on top of your dental health much easier. Whether it's a routine cleaning 
            or something urgent, you won't need to drive across Houston to get quality care.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
              Schedule Your Visit
            </Button>
          </Link>
        </div>
      </section>

      {/* Schema markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://yourapp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Service Areas",
              "item": "https://yourapp.com/service-areas"
            }
          ]
        })}
      </script>
    </div>
  );
}