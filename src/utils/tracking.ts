type GtagFunction = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: GtagFunction; }
}

let initialized = false;

/** Optional Google Ads instrumentation. It remains dormant until a real ID is configured. */
export function initializeTracking(): void {
  const adsId = (import.meta.env.VITE_GOOGLE_ADS_ID?.trim() || 'AW-333870129');
  if (!adsId || initialized || typeof document === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', adsId, { allow_enhanced_conversions: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`;
  document.head.appendChild(script);
  initialized = true;
}

/** Sends analytics events and optionally maps an event to a configured Ads conversion action. */
export function trackEvent(eventName: string, parameters: Record<string, string> = {}): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, parameters);

  const adsId = (import.meta.env.VITE_GOOGLE_ADS_ID?.trim() || 'AW-333870129');
  const conversionLabels: Record<string, string | undefined> = {
    phone_click: import.meta.env.VITE_GOOGLE_ADS_CALL_CONVERSION_LABEL,
    whatsapp_click: import.meta.env.VITE_GOOGLE_ADS_WHATSAPP_CONVERSION_LABEL,
    booking_handoff: import.meta.env.VITE_GOOGLE_ADS_BOOKING_CONVERSION_LABEL,
  };
  const label = conversionLabels[eventName];
  if (adsId && label) {
    window.gtag('event', 'conversion', { send_to: `${adsId}/${label}`, ...parameters });
  }
}
