import React from 'react';
import { Link } from 'react-router-dom';

export default function LanguageSwitcher({ currentLang, translationSlug }) {
  if (!translationSlug) return null;

  const enActive = currentLang === 'en';
  const esActive = currentLang === 'es';

  return (
    <div
      className="max-w-3xl mx-auto px-4 pb-12 text-sm text-muted-foreground gd-lang-switcher inline-flex"
      style={{ display: 'block' }}
    >
      <span className="text-muted-foreground mr-2">Read in:</span>
      <ul className="inline-flex gap-2 m-0 p-0 list-none">
        <li className="lang-item lang-item-en lang-item-first">
          {enActive ? (
            <span
              aria-current="true"
              lang="en-US"
              className="px-3 py-1 rounded-md bg-muted text-foreground font-medium"
            >
              English
            </span>
          ) : (
            <Link
              to={`/blog/${translationSlug}`}
              lang="en-US"
              hrefLang="en-US"
              className="px-3 py-1 rounded-md text-foreground font-medium hover:bg-muted transition-colors"
            >
              English
            </Link>
          )}
        </li>
        <li className="lang-item lang-item-es">
          {esActive ? (
            <span
              aria-current="true"
              lang="es-MX"
              className="px-3 py-1 rounded-md bg-muted text-foreground font-medium"
            >
              Español
            </span>
          ) : (
            <Link
              to={`/es/blog/${translationSlug}`}
              lang="es-MX"
              hrefLang="es-MX"
              className="px-3 py-1 rounded-md text-foreground font-medium hover:bg-muted transition-colors"
            >
              Español
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}