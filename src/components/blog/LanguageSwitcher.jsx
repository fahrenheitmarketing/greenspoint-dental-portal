import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Language switcher shown at the end of a blog post.
 * @param {string} slug - The blog post slug (shared between EN and ES)
 * @param {'en'|'es'} current - Which language version is currently shown
 */
export default function LanguageSwitcher({ slug, current }) {
  const enPath = `/blog/${slug}`;
  const esPath = `/es/blog/${slug}`;

  const Pill = ({ to, label, active }) =>
    active ? (
      <span className="inline-flex items-center px-3 py-1 rounded-full border border-border text-sm font-semibold text-foreground">
        {label}
      </span>
    ) : (
      <Link
        to={to}
        className="inline-flex items-center px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
      </Link>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12 text-sm text-muted-foreground">
      <span className="mr-2">Read in:</span>
      <ul className="inline-flex gap-2 m-0 p-0 list-none">
        <li>
          <Pill to={enPath} label="English" active={current === 'en'} />
        </li>
        <li>
          <Pill to={esPath} label="Español" active={current === 'es'} />
        </li>
      </ul>
    </div>
  );
}