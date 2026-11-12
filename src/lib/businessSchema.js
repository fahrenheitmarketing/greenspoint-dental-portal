export const BUSINESS_ID = 'https://greenspointdental.com/#dentist';

export const BUSINESS_NODE = {
  '@type': 'Dentist',
  '@id': BUSINESS_ID,
  name: 'Greenspoint Dental',
  url: 'https://greenspointdental.com/',
  image: 'https://media.base44.com/images/public/69e928fd4b865057d3a65de3/ac3a6cc6c_logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12523 Greenspoint Dr',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77060',
    addressCountry: 'US',
  },
  telephone: '+1-281-823-9987',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '08:00', closes: '16:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '08:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '12:00' },
  ],
  areaServed: ['Greenspoint', 'Imperial Valley', 'Southbrook', 'Colonial Hills', 'Green Ridge North'].map(
    (name) => ({ '@type': 'Place', name })
  ),
  knowsLanguage: ['English', 'Spanish'],
  sameAs: [
    'https://www.facebook.com/GreensPointDental/',
    'https://www.instagram.com/greenspointdental/',
    'https://x.com/GreensPointDMD',
  ],
};

// Serializes a schema object for a JSON-LD script tag, escaping "<" so the
// payload can never close the surrounding script element.
export function toJsonLdString(schema) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}