/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PopularRoutesSection } from './components/PopularRoutesSection';
import { HomeToursSection } from './components/HomeToursSection';
import { FleetSection } from './components/FleetSection';
import { TrustProofSection } from './components/TrustProofSection';
import { FaqSection } from './components/FaqSection';
import { FareCalculator } from './components/FareCalculator';
import { Footer } from './components/Footer';
import { StickyBottomCta } from './components/StickyBottomCta';
import { BookingModal } from './components/BookingModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { initializeTracking, trackEvent } from './utils/tracking';
// Route-level lazy loading keeps service pages out of the initial homepage bundle.
const TourDetailPage = lazy(() => import('./components/TourDetailPage').then(m => ({ default: m.TourDetailPage })));
const LocalTaxiPage = lazy(() => import('./pages/LocalTaxiPage').then(m => ({ default: m.LocalTaxiPage })));
const OutstationCabsPage = lazy(() => import('./pages/OutstationCabsPage').then(m => ({ default: m.OutstationCabsPage })));
const AirportTaxiPage = lazy(() => import('./pages/AirportTaxiPage').then(m => ({ default: m.AirportTaxiPage })));
const ToursPage = lazy(() => import('./pages/ToursPage').then(m => ({ default: m.ToursPage })));
import { TOUR_PACKAGES, TourPackage } from './data/toursData';

export type AppRoute = 'home' | 'local-taxi' | 'outstation-cabs' | 'airport-taxi' | 'tours' | 'tour-detail';

const PAGE_META: Record<string, { title: string; desc: string }> = {
  'home': {
    title: 'C Taxi · Coimbatore – 24/7 Call Taxi, Airport Transfer & Outstation Cabs',
    desc: 'Book C Taxi in Coimbatore at 9089223344. Instant 15-min doorstep pickup, local city rides, CJB airport transfers, outstation taxi fares with clear estimates.'
  },
  'local-taxi': {
    title: 'Coimbatore Local Taxi Service — 24/7 Call Taxi in Kovai | C Taxi',
    desc: 'Fast 10-15 minute doorstep pickup across Gandhipuram, RS Puram, Peelamedu, Saravanampatti & Coimbatore. Zero surge pricing, clean AC Sedans & SUVs. Call 9089223344.'
  },
  'outstation-cabs': {
    title: 'Outstation Cabs from Coimbatore — One-Way Drops & Round Trips | C Taxi',
    desc: 'Book outstation cabs from Coimbatore. Round-trip day rent and one-way rates are clearly explained, with final fare estimates and premium vehicle quotes on request. Call 9089223344.'
  },
  'airport-taxi': {
    title: 'Coimbatore Airport Taxi (CJB) — 24/7 Terminal Pickup & Drop | C Taxi',
    desc: 'Punctual Coimbatore International Airport (CJB) taxi transfers with flight tracking and zero delay waiting charges. Clean AC cabs with large luggage boots. Call 9089223344.'
  },
  'tours': {
    title: 'Coimbatore Sightseeing Tours & Holiday Packages | C Taxi',
    desc: 'Explore Ooty, Coonoor, Isha Yoga Adiyogi, Palani, Valparai & Kodaikanal tour packages from Coimbatore. Dedicated AC vehicles, fuel & mountain certified chauffeurs included.'
  }
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [activeTourSlug, setActiveTourSlug] = useState<string | null>(null);

  // Booking Modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Policy Modal state
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [activePolicyType, setActivePolicyType] = useState<PolicyType>('privacy');

  // Update browser document head tags for SEO & Google Ads landing page quality
  const updateHeadTags = (title: string, description: string, routePath?: string) => {
    document.title = title;
    const normalizedPath = (routePath ?? window.location.pathname).replace(/\/{2,}/g, '/');
    const canonicalPath = normalizedPath === '/' ? '/' : `/${normalizedPath.replace(/^\/+|\/+$/g, '')}/`;
    const canonicalUrl = `https://www.ctaxicab.com${canonicalPath}`;
    const setMeta = (selector: string, attribute: string, value: string) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
  };

  // Synchronize route based on URL path or search parameters
  const syncRouteFromUrl = () => {
    try {
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const searchParams = new URLSearchParams(window.location.search);
      const pageParam = searchParams.get('page')?.toLowerCase();
      const tourParam = searchParams.get('tour');

      // 1. Direct Tour Detail Page Check
      if (tourParam) {
        const found = TOUR_PACKAGES.find(t => t.slug === tourParam);
        if (found) {
          setCurrentRoute('tour-detail');
          setActiveTourSlug(found.slug);
          updateHeadTags(found.pageTitle, found.metaDescription);
          return;
        }
      } else if (pathname.startsWith('/tour/') || pathname.startsWith('/tours/')) {
        const slug = pathname.replace('/tours/', '').replace('/tour/', '');
        if (slug) {
          const found = TOUR_PACKAGES.find(t => t.slug === slug);
          if (found) {
            setCurrentRoute('tour-detail');
            setActiveTourSlug(found.slug);
            updateHeadTags(found.pageTitle, found.metaDescription);
            return;
          }
        }
      }

      // 2. Dedicated Service Pages Check
      let resolvedRoute: AppRoute = 'home';

      if (pathname === '/local-taxi' || pageParam === 'local-taxi' || searchParams.get('service') === 'local') {
        resolvedRoute = 'local-taxi';
      } else if (pathname === '/outstation-cabs' || pathname === '/outstation' || pageParam === 'outstation-cabs' || searchParams.get('service') === 'outstation') {
        resolvedRoute = 'outstation-cabs';
      } else if (pathname === '/airport-taxi' || pathname === '/airport' || pageParam === 'airport-taxi' || searchParams.get('service') === 'airport') {
        resolvedRoute = 'airport-taxi';
      } else if (pathname === '/tours' || pageParam === 'tours' || searchParams.get('service') === 'tours') {
        resolvedRoute = 'tours';
      } else {
        resolvedRoute = 'home';
      }

      setCurrentRoute(resolvedRoute);
      setActiveTourSlug(null);
      const meta = PAGE_META[resolvedRoute] || PAGE_META['home'];
      updateHeadTags(meta.title, meta.desc);
    } catch {
      // Graceful fallback
    }
  };

  useEffect(() => {
    syncRouteFromUrl();
    initializeTracking();
    const handleTrackedClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      if (link.href.startsWith('tel:')) trackEvent('phone_click', { link_url: link.href });
      if (link.href.includes('wa.me/')) trackEvent('whatsapp_click', { link_url: link.href });
    };
    document.addEventListener('click', handleTrackedClick);
    window.addEventListener('popstate', syncRouteFromUrl);
    return () => {
      document.removeEventListener('click', handleTrackedClick);
      window.removeEventListener('popstate', syncRouteFromUrl);
    };
  }, []);

  // Programmatic navigation that updates history and state smoothly
  const handleNavigate = (route: string, tourSlug?: string) => {
    let targetUrl = '/';
    let targetRoute: AppRoute = 'home';

    if (tourSlug) {
      targetRoute = 'tour-detail';
      targetUrl = `/tours/${tourSlug}/`;
      const found = TOUR_PACKAGES.find(t => t.slug === tourSlug);
      setActiveTourSlug(tourSlug);
      if (found) {
        updateHeadTags(found.pageTitle, found.metaDescription, `/tours/${tourSlug}/`);
      }
    } else if (route === 'local-taxi') {
      targetRoute = 'local-taxi';
      targetUrl = '/local-taxi/';
      setActiveTourSlug(null);
      updateHeadTags(PAGE_META['local-taxi'].title, PAGE_META['local-taxi'].desc, '/local-taxi/');
    } else if (route === 'outstation-cabs') {
      targetRoute = 'outstation-cabs';
      targetUrl = '/outstation-cabs/';
      setActiveTourSlug(null);
      updateHeadTags(PAGE_META['outstation-cabs'].title, PAGE_META['outstation-cabs'].desc, '/outstation-cabs/');
    } else if (route === 'airport-taxi') {
      targetRoute = 'airport-taxi';
      targetUrl = '/airport-taxi/';
      setActiveTourSlug(null);
      updateHeadTags(PAGE_META['airport-taxi'].title, PAGE_META['airport-taxi'].desc, '/airport-taxi/');
    } else if (route === 'tours') {
      targetRoute = 'tours';
      targetUrl = '/tours/';
      setActiveTourSlug(null);
      updateHeadTags(PAGE_META['tours'].title, PAGE_META['tours'].desc, '/tours/');
    } else {
      targetRoute = 'home';
      targetUrl = '/';
      setActiveTourSlug(null);
      updateHeadTags(PAGE_META['home'].title, PAGE_META['home'].desc, '/');
    }

    setCurrentRoute(targetRoute);
    try {
      window.history.pushState({}, '', targetUrl);
    } catch {
      // In constrained iframe environments, search params fallback
      try {
        if (targetRoute === 'tour-detail' && tourSlug) {
          window.history.pushState({}, '', `?tour=${tourSlug}`);
        } else if (targetRoute !== 'home') {
          window.history.pushState({}, '', `?page=${targetRoute}`);
        } else {
          window.history.pushState({}, '', '/');
        }
      } catch {
        // Ignore if pushState is restricted
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = (details: any) => {
    setBookingDetails(details);
    setIsBookingModalOpen(true);
  };

  const handleOpenPolicy = (type: PolicyType) => {
    setActivePolicyType(type);
    setIsPolicyModalOpen(true);
  };

  const handleBookTourFromCard = (tour: TourPackage) => {
    handleOpenBookingModal({
      serviceType: 'outstation',
      pickup: 'Coimbatore City (Doorstep)',
      drop: tour.title,
      vehicle: 'Prime AC Sedan',
      estimatedPrice: null,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '06:30 AM',
      breakdownNote: `${tour.duration} Package: ${tour.routeOverview}`
    });
  };

  const activeTour = TOUR_PACKAGES.find(t => t.slug === activeTourSlug);

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col font-sans selection:bg-[#FFBF00] selection:text-[#171717]">
      
      {/* 1. Header with C Taxi branding, 4 service page links, Call 9089223344 & WhatsApp buttons */}
      <Header 
        currentPage={currentRoute}
        onNavigate={handleNavigate}
        onBookClick={() => handleOpenBookingModal({
          serviceType: 'local',
          pickup: 'Coimbatore City (Doorstep)',
          drop: 'Destination in Coimbatore / Outstation',
          vehicle: 'Prime AC Sedan',
          estimatedPrice: null,
          breakdownNote: 'Quick dispatch request'
        })} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-sm text-neutral-500" role="status">Loading page…</div>}>

        {/* Route 1: Local Taxi Page */}
        {currentRoute === 'local-taxi' && (
          <LocalTaxiPage 
            onOpenBookingModal={handleOpenBookingModal}
            onNavigate={handleNavigate}
          />
        )}

        {/* Route 2: Outstation Cabs Page */}
        {currentRoute === 'outstation-cabs' && (
          <OutstationCabsPage 
            onOpenBookingModal={handleOpenBookingModal}
            onNavigate={handleNavigate}
          />
        )}

        {/* Route 3: Airport Taxi Page */}
        {currentRoute === 'airport-taxi' && (
          <AirportTaxiPage 
            onOpenBookingModal={handleOpenBookingModal}
            onNavigate={handleNavigate}
          />
        )}

        {/* Route 4: Tours & Packages Hub Page */}
        {currentRoute === 'tours' && (
          <ToursPage 
            onNavigateToTour={(slug) => handleNavigate('tour-detail', slug)}
            onBookTour={handleBookTourFromCard}
            onNavigate={handleNavigate}
          />
        )}

        {/* Route 5: Dedicated Tour Detail Page (e.g. Ooty, Isha, Palani) */}
        {currentRoute === 'tour-detail' && activeTour && (
          <TourDetailPage
            tour={activeTour}
            onBackToHome={() => handleNavigate('tours')}
            onNavigateToTour={(slug) => handleNavigate('tour-detail', slug)}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {/* Route 6: Homepage (Default) */}
        {currentRoute === 'home' && (
          <>
            {/* 1. One primary hero section (No banners or debug elements above) */}
            <Hero 
              onNavigate={handleNavigate}
              onOpenBookingModal={handleOpenBookingModal}
            />

            {/* 2. Four service cards linking to the four dedicated service pages */}
            <ServicesSection onNavigate={handleNavigate} />

            {/* 3. Popular outstation routes with quote-first pricing */}
            <PopularRoutesSection 
              onSelectRoute={(route) => {
                if (route.category === 'airport') {
                  handleNavigate('airport-taxi');
                } else {
                  handleNavigate('outstation-cabs');
                }
              }}
              onNavigateToOutstation={() => handleNavigate('outstation-cabs')}
            />

            {/* 4. Featured tour packages (Top 3: Ooty-Coonoor-Kotagiri, Marudhamalai-Isha, Palani) */}
            <HomeToursSection 
              onNavigateToTour={(slug) => handleNavigate('tour-detail', slug)}
              onBookTour={handleBookTourFromCard}
              onNavigateToAllTours={() => handleNavigate('tours')}
            />

            {/* 5. Instant Fare Calculator & Booking Section */}
            <FareCalculator onOpenBookingModal={handleOpenBookingModal} />

            {/* 6. Fleet and vehicle options (Sedan, SUV, Innova Crysta — No hatchback) */}
            <FleetSection 
              onSelectFleet={() => {
                const calcEl = document.getElementById('fare-calculator');
                if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
              }} 
            />

            {/* 7. Why choose C Taxi & Verified customer testimonials */}
            <TrustProofSection />

            {/* 8. Useful FAQs */}
            <FaqSection />
          </>
        )}

        </Suspense>
      </main>

      {/* Clean quiet Footer with contact information and customer policies */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenPolicy={handleOpenPolicy} 
      />

      {/* Fixed bottom booking bar on mobile & web */}
      <StickyBottomCta onOpenBookingModal={handleOpenBookingModal} />

      {/* Online Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingDetails={bookingDetails}
      />

      {/* Privacy Policy, Cancellation & Refund, and Terms Modal */}
      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        activePolicy={activePolicyType}
        onChangePolicy={setActivePolicyType}
      />

    </div>
  );
}
