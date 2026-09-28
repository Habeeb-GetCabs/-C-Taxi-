import React from 'react';
import { Clock, MapPin, ArrowRight, ShieldCheck, Check, Sparkles, Mountain, Calendar } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/toursData';
import { TourCardVisual } from './TourCardVisual';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface HomeToursSectionProps {
  onNavigateToTour: (slug: string) => void;
  onBookTour: (tour: TourPackage) => void;
}

export const HomeToursSection: React.FC<HomeToursSectionProps> = ({
  onNavigateToTour,
  onBookTour,
}) => {
  // Top 3 tour places explicitly requested for Home Page: Ooty-Coonoor-Kotagiri, Isha-Marudhamalai, and Palani
  const topThreeTours = TOUR_PACKAGES.slice(0, 3);
  const otherTours = TOUR_PACKAGES.slice(3);

  return (
    <section id="featured-tours" className="py-16 sm:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Coimbatore Sightseeing & Pilgrimage Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight" style={{ textWrap: 'balance' }}>
              Handcrafted Day Tours & Hill Station Packages
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Doorstep pickup anywhere in Coimbatore, seasoned chauffeurs certified for mountain hairpins, and transparent fixed package pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white hover:text-amber-400 text-xs font-bold transition-colors"
            >
              <span>Tour Inquiry: {DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>

        {/* 3 Featured Tour Cards on Home Page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
          {topThreeTours.map((tour) => {
            return (
              <div
                key={tour.slug}
                className="bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Authentic Graphic Card Visual */}
                  <TourCardVisual
                    slug={tour.slug}
                    title={tour.title}
                    badge={tour.badge}
                    className="h-48"
                  />

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* Meta info strip */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {tour.duration}
                      </span>
                      <span className="font-mono text-neutral-300 font-semibold">
                        {tour.distance}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {tour.tagline}
                    </p>

                    {/* Key Spots Visited list */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Key Attractions Included:
                      </div>
                      <div className="space-y-1 text-xs text-neutral-300">
                        {tour.spots.slice(0, 4).map((spot, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{spot.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Pricing & Navigation actions */}
                <div className="p-6 pt-4 border-t border-neutral-800 bg-neutral-950/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        Package Starts From
                      </div>
                      <div className="text-2xl font-extrabold text-amber-400 font-heading tabular-nums">
                        ₹{tour.startingPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      Sedan · AC Included
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigateToTour(tour.slug)}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
                    >
                      <span>Full Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onBookTour(tour)}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
                    >
                      <span>Book Cab</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Additional Google Campaign Sitelink Tour Routes */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Explore More Scenic Western Ghats Packages
              </span>
              <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                Valparai 40 Hairpins & Kodaikanal Holiday Cabs
              </h3>
            </div>
            <span className="text-xs text-neutral-400">
              Direct Sitelink Destinations for Google Ads
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherTours.map((tour) => (
              <div 
                key={tour.slug}
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {tour.badge}
                    </span>
                    <span className="text-xs text-neutral-400">{tour.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {tour.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-1">
                    {tour.tagline}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-extrabold text-amber-400 font-heading tabular-nums">
                    ₹{tour.startingPrice.toLocaleString('en-IN')}
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToTour(tour.slug)}
                    className="mt-1 text-xs font-semibold text-white hover:text-amber-400 inline-flex items-center gap-1"
                  >
                    <span>View Tour</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
