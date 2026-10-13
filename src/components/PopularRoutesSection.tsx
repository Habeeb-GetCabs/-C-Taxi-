import React from 'react';
import { Clock, MapPin, ArrowRight, Shield, Mountain } from 'lucide-react';
import { POPULAR_ROUTES, WHATSAPP_URL, PHONE_NUMBER } from '../data/taxiData';

interface PopularRoutesProps {
  onSelectRoute: (route: any) => void;
  onNavigateToOutstation?: () => void;
}

const ROUTE_IMAGES: Record<string, string> = {
  // Primary popular routes matching taxiData.ts POPULAR_ROUTES IDs
  'cbe_ooty': '/images/destinations/tour-ooty-lake.webp',
  'cbe_airport': '/images/destinations/airport-cjb-terminal.webp',
  'cbe_isha': '/images/destinations/tour-isha-adiyogi.webp',
  'cbe_tiruppur': '/images/destinations/transit-tiruppur-expressway.webp',
  'cbe_pollachi': '/images/destinations/tour-pollachi-topslip.webp',
  'cbe_valparai': '/images/destinations/tour-valparai-hairpins.webp',
  // Sitelink aliases
  'route-ooty': '/images/destinations/tour-ooty-lake.webp',
  'route-coonoor': '/images/destinations/tour-coonoor-tea.webp',
  'route-valparai': '/images/destinations/tour-valparai-hairpins.webp',
  'route-kodaikanal': '/images/destinations/tour-kodaikanal-lake.webp',
  'route-palani': '/images/destinations/tour-palani-temple.webp',
  'route-cjb-airport': '/images/destinations/airport-cjb-terminal.webp'
};

export const PopularRoutesSection: React.FC<PopularRoutesProps> = ({ 
  onSelectRoute,
  onNavigateToOutstation 
}) => {
  return (
    <section id="popular-routes" className="py-12 lg:py-18 bg-white border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              Verified Tariffs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
              Popular Outstation &amp; Airport Routes
            </h2>
            <p className="text-sm sm:text-base text-[#777777]">
              Choose a destination and get a trip estimate. Final fare is shown without a line-by-line breakdown; premium vehicle fares are available on request.
            </p>
          </div>

          {onNavigateToOutstation && (
            <button
              type="button"
              onClick={onNavigateToOutstation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F2EA] border border-[#E5E0D8] text-[#171717] hover:border-[#FFBF00] text-xs font-bold transition-colors shadow-xs"
            >
              <span>View All Outstation Rates</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFBF00]" />
            </button>
          )}
        </div>

        {/* Image-Led Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => {
            const photoUrl = ROUTE_IMAGES[route.id] || '/images/destinations/tour-ooty-lake.webp';
            return (
              <div
                key={route.id}
                className="bg-white border border-[#E5E0D8] hover:border-[#FFBF00] rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  
                  {/* Photo Thumbnail Header */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <img 
                      src={photoUrl} 
                      alt={route.to}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#171717] bg-[#FFBF00] px-2.5 py-0.5 rounded shadow-xs">
                        {route.highlight}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-white bg-black/60 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FFBF00]" /> {route.estDuration}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <div className="text-lg font-extrabold text-white font-heading drop-shadow flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#FFBF00] shrink-0" />
                        <span>{route.to}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#777777] border-b border-[#E5E0D8] pb-2">
                      <span>From: <strong className="text-[#171717]">{route.from}</strong></span>
                      <span className="font-mono font-bold text-[#171717]">~{route.distanceKm} km</span>
                    </div>

                    <p className="text-xs text-[#777777] leading-relaxed line-clamp-2">
                      {route.popularFor}
                    </p>
                  </div>

                </div>

                {/* Pricing & Booking CTA */}
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#777777] uppercase tracking-wider block font-bold">
                        Fare Estimate
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-[#171717] font-heading tabular-nums">
                        Get quote
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectRoute(route)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-xs active:scale-95"
                    >
                      <span>Book Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
