import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICE_PAGES, SERVICE_AREAS, RESOURCE_PAGES } from '@/lib/internalLinks';

const normalize = (path) => (path || '').replace(/\/+$/, '');

const LINK_CLASS =
  'group inline-flex items-start gap-2 rounded font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

function LinkColumn({ heading, links }) {
  return (
    <div>
      <h3 className="mb-4 font-heading text-lg text-foreground">{heading}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className={LINK_CLASS}>
              <span>{link.label}</span>
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
            </Link>
            {link.note && <p className="mt-0.5 font-body text-sm text-muted-foreground">{link.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InternalLinkHub({
  currentPath = '',
  areaName = '',
  title = 'Explore Services and Neighborhoods We Serve',
  intro = '',
  showServices = true,
  showAreas = true,
  showResources = true,
}) {
  const current = normalize(currentPath);

  const services = SERVICE_PAGES.filter((service) => normalize(service.path) !== current).map(
    (service) => ({
      ...service,
      label: areaName ? `${service.label} near ${areaName}` : service.label,
    })
  );
  const areas = SERVICE_AREAS.filter((area) => normalize(area.path) !== current);
  const resources = RESOURCE_PAGES.filter((resource) => normalize(resource.path) !== current);

  const columns = [
    showServices && { heading: 'Dental Services', links: services },
    showAreas && { heading: 'Neighborhoods We Serve', links: areas },
    showResources && { heading: 'Learn More', links: resources },
  ].filter((column) => column && column.links.length > 0);

  if (columns.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/40 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">{title}</h2>
        {intro && (
          <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
        <div
          className={`mt-8 grid gap-8 ${
            columns.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
          }`}
        >
          {columns.map((column) => (
            <LinkColumn key={column.heading} heading={column.heading} links={column.links} />
          ))}
        </div>
      </div>
    </section>
  );
}