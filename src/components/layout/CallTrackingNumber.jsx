import React from 'react';

/**
 * Placeholder for the call tracking number.
 * No phone number is typed in the markup: the call tracking script
 * replaces the text inside this element when it loads.
 */
export default function CallTrackingNumber({ className = '' }) {
  return (
    <span
      id="call-tracking-number"
      data-call-tracking-number="header"
      className={className}
    >
      Call us
    </span>
  );
}