/**
 * useScrollToTop — fires window.scrollTo(0,0) on every route change
 * Fixes the "lands at random scroll position" bug caused by Wouter
 * not resetting scroll between navigations.
 */
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Small rAF delay ensures the new page has mounted before scrolling
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(id);
  }, [location]);
}
