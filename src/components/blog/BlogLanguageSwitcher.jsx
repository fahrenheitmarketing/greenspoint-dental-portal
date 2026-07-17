import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogLanguageSwitcher({ slug, current = 'en' }) {
  const enPath = `/blog/${slug}`;
  const esPath = `/es/blog/${slug}`;

  const linkBase = "px-3 py-1 rounded-md text-sm font-medium transition-colors";
  const activeClass = "border border-border bg-card text-foreground";
  const inactiveClass = "text-muted-foreground hover:text-foreground";

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground mr-1">Read in:</span>
        <ul className="inline-flex gap-2 m-0 p-0 list-none">
          <li>
            {current === 'en' ? (
              <span className={`${linkBase} ${activeClass}`}>English</span>
            ) : (
              <Link to={enPath} className={`${linkBase} ${inactiveClass}`}>English</Link>
            )}
          </li>
          <li>
            {current === 'es' ? (
              <span className={`${linkBase} ${activeClass}`}>Español</span>
            ) : (
              <Link to={esPath} className={`${linkBase} ${inactiveClass}`}>Español</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}