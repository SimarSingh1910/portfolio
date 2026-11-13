/**
 * Google Analytics 4, loaded only when VITE_GA_ID is set at build time
 * (e.g. as an environment variable on Render). Without it, every call is a no-op.
 */

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag expects the raw `arguments` object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}

/** Send a custom event, e.g. track('project_open', { project: 'udyamsaathi' }). */
export function track(event: string, params: Params = {}) {
  window.gtag?.('event', event, params);
}

/** Fires `section_view` once per section the first time half of it is on screen. */
export function trackSectionViews(ids: string[]) {
  if (!GA_ID || !('IntersectionObserver' in window)) return () => {};
  const seen = new Set<string>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (entry.isIntersecting && !seen.has(id)) {
          seen.add(id);
          track('section_view', { section: id });
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.4 },
  );
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
  return () => observer.disconnect();
}
