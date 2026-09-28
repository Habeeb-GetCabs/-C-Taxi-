/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CampaignBanner } from './components/CampaignBanner';
import { Hero } from './components/Hero';
import { FareCalculator } from './components/FareCalculator';
import { HomeToursSection } from './components/HomeToursSection';
import { TourDetailPage } from './components/TourDetailPage';
import { ServicesSection } from './components/ServicesSection';
import { PopularRoutesSection } from './components/PopularRoutesSection';
import { FleetSection } from './components/FleetSection';
import { TrustProofSection } from './components/TrustProofSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StickyBottomCta } from './components/StickyBottomCta';
import { BookingModal } from './components/BookingModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { AD_CAMPAIGN_PRESETS } from './data/taxiData';
import { TOUR_PACKAGES, TourPackage } from './data/toursData';

export default function App() {
  const [currentCampaignId, setCurrentCampaignId] = useState<string>('local');
  const [activeServiceKey, setActiveServiceKey] = useState<string>('local');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Active Tour Page state for dedicated sitelinks
  const [activeTourSlug, setActiveTourSlug] = useState<string | null>(null);

  // Policy Modal state for Privacy Policy, Cancellation & Refund, Terms
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [activePolicyType, setActivePolicyType] = useState<PolicyType>('privacy');

  // Sync URL search parameters and path on initial load & popstate
  useEffect(() => {
    const parseUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const tourParam = params.get('tour');
        const pathname = window.location.pathname;

        // Check if landing directly on a tour sitelink
        if (tourParam) {
          const matched = TOUR_PACKAGES.find(t => t.slug === tourParam);
          if (matched) {
            setActiveTourSlug(matched.slug);
            document.title = matched.pageTitle;
            return;
          }
        } else if (pathname.startsWith('/tour/')) {
          const pathSlug = pathname.replace('/tour/', '').replace(/\/$/, '');
          const matched = TOUR_PACKAGES.find(t => t.slug === pathSlug);
          if (matched) {
            setActiveTourSlug(matched.slug);
            document.title = matched.pageTitle;
            return;
          }
        }

        // Campaign intent matching for Home page
        const campaignParam = params.get('campaign') || params.get('utm_campaign') || params.get('service');
        const termParam = params.get('utm_term') || params.get('q');

        if (campaignParam) {
          const found = AD_CAMPAIGN_PRESETS.find(p => 
            p.id.toLowerCase() === campaignParam.toLowerCase() ||
            p.primaryTab.toLowerCase() === campaignParam.toLowerCase()
          );
          if (found) {
            setCurrentCampaignId(found.id);
            setActiveServiceKey(found.primaryTab);
            return;
          }
        }

        if (termParam) {
          const lower = termParam.toLowerCase();
          if (lower.includes('airport') || lower.includes('flight') || lower.includes('cjb')) {
            setCurrentCampaignId('airport');
            setActiveServiceKey('airport');
          } else if (lower.includes('ooty') || lower.includes('coonoor') || lower.includes('hill') || lower.includes('valparai') || lower.includes('outstation')) {
            setCurrentCampaignId('outstation');
            setActiveServiceKey('outstation');
          } else if (lower.includes('hourly') || lower.includes('rental') || lower.includes('day package')) {
            setCurrentCampaignId('hourly');
            setActiveServiceKey('hourly');
          } else {
            setCurrentCampaignId('local');
            setActiveServiceKey('local');
          }
        }
      } catch {
        // Ignore URL parsing errors
      }
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  const handleSelectCampaign = (id: string) => {
    setCurrentCampaignId(id);
    const preset = AD_CAMPAIGN_PRESETS.find(p => p.id === id);
    if (preset) {
      setActiveServiceKey(preset.primaryTab);
    }
  };

  const handleSelectService = (serviceKey: string) => {
    setActiveServiceKey(serviceKey);
  };

  const handleSelectRoute = (route: any) => {
    if (route.category === 'airport') {
      setActiveServiceKey('airport');
    } else {
      setActiveServiceKey('outstation');
    }
  };

  const handleSelectFleet = (vehicleId: string) => {
    // Navigates user to calculator
  };

  const handleOpenBookingModal = (details: any) => {
    setBookingDetails(details);
    setIsBookingModalOpen(true);
  };

  const handleOpenPolicy = (type: PolicyType) => {
    setActivePolicyType(type);
    setIsPolicyModalOpen(true);
  };

  const handleNavigateToTour = (slug: string) => {
    const matched = TOUR_PACKAGES.find(t => t.slug === slug);
    if (matched) {
      setActiveTourSlug(slug);
      document.title = matched.pageTitle;
      window.history.pushState({}, '', `?tour=${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    setActiveTourSlug(null);
    document.title = 'C Taxi Coimbatore – 24/7 Call Taxi, Airport Transfer & Outstation Cabs';
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookTourFromCard = (tour: TourPackage) => {
    handleOpenBookingModal({
      serviceType: 'outstation',
      pickup: 'Coimbatore City (Doorstep)',
      drop: tour.title,
      vehicle: 'Prime AC Sedan',
      estimatedPrice: tour.startingPrice,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '06:30 AM',
      breakdownNote: `${tour.duration} Package: ${tour.routeOverview}`
    });
  };

  const activeTour = TOUR_PACKAGES.find(t => t.slug === activeTourSlug);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Top Navigation Bar with strict 3-zone contract */}
      <Header onBookClick={() => setIsBookingModalOpen(true)} />

      {activeTour ? (
        /* Dedicated Standalone Tour Landing Page for Google Campaign Sitelinks */
        <main className="flex-1">
          <TourDetailPage
            tour={activeTour}
            onBackToHome={handleBackToHome}
            onNavigateToTour={handleNavigateToTour}
            onOpenBookingModal={handleOpenBookingModal}
          />
        </main>
      ) : (
        /* Main Home Conversion Flow */
        <>
          {/* Google Ads Dynamic Keyword Scent & Campaign Matcher Bar */}
          <CampaignBanner
            currentCampaignId={currentCampaignId}
            onSelectCampaign={handleSelectCampaign}
          />

          <main className="flex-1">
            {/* Hero Section with Dynamic Headline & Value Proposition */}
            <Hero
              currentCampaignId={currentCampaignId}
              onOpenBookingModal={handleOpenBookingModal}
            />

            {/* Live Fare Calculator: 1. Local Rides -> 2. Outstation -> 3. Hourly Rentals -> 4. Airport */}
            <FareCalculator
              initialService={activeServiceKey}
              onOpenBookingModal={handleOpenBookingModal}
            />

            {/* Featured Sightseeing & Tour Packages: Top 3 (Ooty-Coonoor-Kotagiri, Marudhamalai-Isha, Palani) + Sitelinks */}
            <HomeToursSection
              onNavigateToTour={handleNavigateToTour}
              onBookTour={handleBookTourFromCard}
            />

            {/* Core Mobility Services Bento Grid */}
            <ServicesSection onSelectService={handleSelectService} />

            {/* Popular Outstation & Airport Routes with Starting Rates (Ooty from 3000) */}
            <PopularRoutesSection onSelectRoute={handleSelectRoute} />

            {/* Clean Fleet Specifications & Rate Card (No Hatchback) */}
            <FleetSection onSelectFleet={handleSelectFleet} />

            {/* Coimbatore Localities Coverage, Guarantees & Verified Testimonials */}
            <TrustProofSection />

            {/* High-Intent FAQ Section (Objection Killers) */}
            <FaqSection />
          </main>
        </>
      )}

      {/* Clean Quiet Footer with Google Ads Compliant Legal Links */}
      <Footer onOpenPolicy={handleOpenPolicy} />

      {/* High-Conversion Sticky Bottom Conversion Bar (Mobile & Web Friendly) */}
      <StickyBottomCta onOpenBookingModal={handleOpenBookingModal} />

      {/* Fast Booking Modal */}
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
