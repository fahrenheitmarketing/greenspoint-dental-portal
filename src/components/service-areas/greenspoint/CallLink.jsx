import React from 'react';
import { Phone } from 'lucide-react';

const FOCUS =
  'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function CallLink({ children = '(281) 823-9987', variant = 'inline' }) {
  if (variant === 'button') {
    return (
      <a
        href="tel:+12818239987"
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 font-body text-lg font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 ${FOCUS}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call (281) 823-9987
      </a>
    );
  }

  return (
    <a href="tel:+12818239987" className={`font-semibold text-primary underline-offset-4 hover:underline ${FOCUS}`}>
      {children}
    </a>
  );
}