import React from 'react';
import { Clock, MapPin, ArrowRight, Shield, Sparkles, Mountain } from 'lucide-react';
import { POPULAR_ROUTES, WHATSAPP_URL, PHONE_NUMBER } from '../data/taxiData';

interface PopularRoutesProps {
  onSelectRoute: (route: any) => void;
}

export const PopularRoutesSection: React.FC<PopularRoutesProps> = ({ onSelectRoute }) => {
  return (
    <section id="popular-routes" className="py-16 sm:py-24 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Transparent Pricing Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight" style={{ textWrap: 'balance' }}>
            Popular Outstation & Airport Routes from Coimbatore
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Ooty trips from ₹3,000. All routes driven by experienced commercial chauffeurs with clean AC Sedans and SUVs.
          </p>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => {
            return (
              <div
                key={route.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  
                  {/* Top route badge and distance */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 pb-3 border-b border-neutral-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {route.estDuration}
                    </span>
                    <span className="font-mono text-neutral-300 font-semibold tabular-nums">
                      ~{route.distanceKm} km
                    </span>
                  </div>

                  {/* Route From -> To */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Pickup: <strong className="text-neutral-200">{route.from}</strong>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 group-hover:text-amber-300 transition-colors">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{route.to}</span>
                    </div>
                  </div>

                  {/* Highlight pill & description */}
                  <div className="text-xs text-amber-400/90 font-medium mb-2 flex items-center gap-1.5">
                    {route.isHillStation ? (
                      <Mountain className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span>{route.highlight}</span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {route.popularFor}
                  </p>

                </div>

                {/* Price & Book Action */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                      Starting Fare
                    </div>
                    <div className="text-xl font-extrabold text-amber-400 font-heading tabular-nums">
                      ₹{route.startingPrice.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectRoute(route);
                      const el = document.getElementById('fare-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
                  >
                    <span>Book Route</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footnote on Tolls & Permits */}
        <div className="mt-8 p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All prices include driver allowance (₹500/day for outstation), fuel & AC. Toll plaza charges & parking tickets are charged as per official slips.
            </span>
          </div>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="text-amber-400 hover:text-amber-300 font-semibold whitespace-nowrap"
          >
            Custom Route Quote? Call 9089223344 →
          </a>
        </div>

      </div>
    </section>
  );
};
