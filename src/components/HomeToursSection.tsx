import React from 'react';
import { Clock, MapPin, ArrowRight, ShieldCheck, Check, Sparkles, Mountain, Calendar } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/toursData';
import { TourCardVisual } from './TourCardVisual';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface HomeToursSectionProps {
  onNavigateToTour: (slug: string) => void;
  onBookTour: (tour: TourPackage) => void;
  onNavigateToAllTours: () => void;
}

export const HomeToursSection: React.FC<HomeToursSectionProps> = ({
  onNavigateToTour,
  onBookTour,
  onNavigateToAllTours,
}) => {
  // Top 3 tour places explicitly requested for Home Page: Ooty-Coonoor-Kotagiri, Isha-Marudhamalai, and Palani
  const topThreeTours = TOUR_PACKAGES.slice(0, 3);

  return (
    <section id="featured-tours" className="py-12 lg:py-18 bg-[#F5F2EA] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              Coimbatore Sightseeing &amp; Pilgrimage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
              Featured Tour Packages
            </h2>
            <p className="text-sm sm:text-base text-[#777777]">
              Doorstep pickup anywhere in Coimbatore, seasoned mountain chauffeurs, and transparent fixed package pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToAllTours}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5E0D8] text-[#171717] hover:border-[#FFBF00] text-xs font-bold transition-colors shadow-xs"
            >
              <span>View All 5 Tours</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFBF00]" />
            </button>
          </div>
        </div>

        {/* 3 Featured Tour Cards on Home Page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThreeTours.map((tour) => {
            return (
              <div
                key={tour.slug}
                className="bg-white border border-[#E5E0D8] hover:border-[#FFBF00] rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Tour Visual Header with Real Photography */}
                  <TourCardVisual
                    slug={tour.slug}
                    title={tour.title}
                    badge={tour.badge}
                  />

                  {/* Card Content */}
                  <div className="p-5 space-y-3.5">
                    
                    {/* Meta info strip */}
                    <div className="flex items-center justify-between text-xs text-[#777777] border-b border-[#E5E0D8] pb-2.5">
                      <span className="flex items-center gap-1.5 font-semibold text-[#171717]">
                        <Clock className="w-3.5 h-3.5 text-[#FFBF00]" />
                        {tour.duration}
                      </span>
                      <span className="font-mono text-[#777777] font-medium truncate max-w-[150px]">
                        {tour.distance}
                      </span>
                    </div>

                    <p className="text-xs text-[#777777] leading-relaxed line-clamp-2">
                      {tour.tagline}
                    </p>

                    {/* Key Spots Visited list */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                        Attractions Included:
                      </div>
                      <div className="space-y-1 text-xs text-[#777777]">
                        {tour.spots.slice(0, 3).map((spot, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#FFBF00] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{spot.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer: Starting Price + CTAs */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-baseline justify-between border-t border-[#E5E0D8] pt-3.5">
                    <div>
                      <span className="text-[10px] text-[#777777] block uppercase font-bold tracking-wider">Starting Rate</span>
                      <div className="text-2xl font-black text-[#171717] font-heading tabular-nums">
                        ₹{tour.startingPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#777777]">AC Cab + Driver</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onBookTour(tour)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] text-xs font-extrabold transition-all shadow-xs active:scale-95"
                    >
                      Book Tour
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigateToTour(tour.slug)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#F5F2EA] hover:bg-[#EAE5D8] border border-[#E5E0D8] text-[#171717] text-xs font-bold transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#171717]" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
