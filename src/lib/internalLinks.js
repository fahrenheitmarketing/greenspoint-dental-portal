// Central link lists used by the internal linking hub so every page
// links to the same service, neighborhood and resource pages.

export const SERVICE_PAGES = [
  { label: 'General Dentistry', path: '/services/general', note: 'Checkups, cleanings and fillings' },
  { label: 'Cosmetic Dentistry', path: '/services/cosmetic', note: 'Whitening, veneers and smile makeovers' },
  { label: 'Restorative Dentistry', path: '/services/restorative', note: 'Implants, crowns and root canals' },
  { label: 'Orthodontics', path: '/services/orthodontics', note: 'Braces and clear aligners' },
  { label: 'New Patient Specials', path: '/services/specials', note: '$99 exam, X-rays and cleaning' },
  { label: 'Financing and Insurance', path: '/financing', note: 'Payment plans and insurance help' },
];

export const SERVICE_AREAS = [
  { label: 'Dentist in Greenspoint', path: '/service-areas/greenspoint/', note: 'Our home office on Greenspoint Dr' },
  { label: 'Dentist near Imperial Valley', path: '/service-areas/imperial-valley/', note: 'About 5 minutes away' },
  { label: 'Dentist near Southbrook', path: '/service-areas/southbrook/', note: '2 to 5 minutes away' },
  { label: 'Dentist near Colonial Hills', path: '/service-areas/colonial-hills/', note: 'A quick drive along Beltway 8' },
  { label: 'Dentist near Green Ridge North', path: '/service-areas/green-ridge-north/', note: 'Easy on local roads' },
];

export const RESOURCE_PAGES = [
  { label: 'Dental Health Blog', path: '/blog', note: 'Practical guides on care, cost and confidence' },
  { label: 'New Patient Information', path: '/new-patients', note: 'What to expect on your first visit' },
];