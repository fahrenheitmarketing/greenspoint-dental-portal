import { useEffect } from 'react';

/**
 * Sets the document title and meta description for the current page,
 * then restores the previous values on unmount.
 */
export default function usePageMeta({ title, description }) {
  useEffect(() => {
    if (!title) return undefined;

    const previousTitle = document.title;
    const tag = document.querySelector('meta[name="description"]');
    const previousDescription = tag ? tag.getAttribute('content') : null;

    document.title = title;
    if (tag && description) {
      tag.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (tag && previousDescription !== null) {
        tag.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}