# C Taxi pre-launch remediation notes

This working copy was prepared from the supplied project ZIP and the supplied audit report. No live site was accessed or changed.

## Changes made
- Configured the supplied Google Ads tag ID `AW-333870129` as the default tag ID and in `.env.example`. The tag can load, but conversion actions still need their actual labels from Google Ads to report call, WhatsApp, and booking events as Ads conversions.
- Added Vercel SPA rewrite (`vercel.json`) and a Netlify-compatible `public/_redirects` fallback so deep links can serve the SPA shell.
- Added route-level lazy loading for Local Taxi, Outstation, Airport, Tours and Tour Detail pages.
- Updated runtime SEO head handling to set the canonical URL, `og:url`, `og:description`, Twitter title and Twitter description for the active route.
- Added optional Google Ads tag initialization and event instrumentation for phone clicks, WhatsApp clicks and booking handoff. Tracking is dormant unless a real `VITE_GOOGLE_ADS_ID` is supplied. Ads conversion events also require the relevant conversion labels from the Google Ads conversion action setup.
- Changed booking submission so it opens a WhatsApp draft directly from the submit action and no longer falsely claims the dispatcher has received the request. The customer must still tap Send in WhatsApp; this static website cannot deliver a WhatsApp message automatically in the background.
- Corrected the local hourly booking estimate multiplier so Innova Crysta uses 1.6x and Ertiga uses 1.3x rather than applying 1.35x to both.
- Added the expected Twitter metadata tags in `index.html`.

## Still needs user/business input or external verification
- Applied the tariff rules supplied on 13 October 2026: local ₹100 base + ₹30/km for Sedan/SUV; round trip ₹2,000/day + ₹12/km with minimum 100 km/day (Ooty two-day estimate uses 250 km coverage); one-way Sedan ₹15/km + ₹500 and SUV ₹22/km + ₹600 with minimum 130 km; hourly Sedan ₹350/hour + ₹20 per extra km and SUV ₹500/hour + ₹25 per extra km. Premium SUV/Crysta and Tempo Traveller numeric prices are hidden and marked quote-only. The customer-facing calculator shows a final estimate without a fare breakdown. Route-specific tour package prices still need business confirmation before launch.
- Google Ads tag ID AW-333870129 was supplied by the user and is configured as the fallback ID. Conversion labels for call, WhatsApp and booking actions are still not supplied; those specific Ads conversion actions are not yet mapped.
- The static booking handoff depends on the customer sending the prepared WhatsApp message. If a truly automatic dispatch notification is required, a backend/webhook and its secure configuration are needed.
- Live DNS, SSL, Vercel/Netlify production rewrites, Search Console verification, actual Google Ads tag diagnostics and mobile PageSpeed/Core Web Vitals cannot be verified from this local source ZIP alone.
- The audit contains potentially unverified claims (e.g. arrival times, fleet hubs, flight tracking, driver verification and address details). Confirm they are factually accurate before publishing or advertising them.
- Generated destination images should be visually checked before being represented as exact photographs of real landmarks or airport facilities.

## Suggested next steps
1. Confirm the approved route/package fare table, especially Ooty, Isha, Tiruppur, Coonoor, Palani and Kodaikanal.
2. Supply the actual Google Ads tag ID and conversion labels.
3. Deploy a preview build and test deep-link refresh, WhatsApp handoff, mobile layout and the real Google Ads destination URL.
4. Run PageSpeed Insights against the deployed preview and verify conversion actions in Google Ads before enabling campaigns.
