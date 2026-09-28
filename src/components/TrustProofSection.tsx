import React from 'react';
import { ShieldCheck, MapPin, Star, Clock, Award, Users, CheckCircle2 } from 'lucide-react';
import { COIMBATORE_LOCALITIES, TESTIMONIALS, PHONE_NUMBER, DISPLAY_PHONE } from '../data/taxiData';

export const TrustProofSection: React.FC = () => {
  return (
    <section id="why-c-taxi" className="py-16 sm:py-24 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Coimbatore's Trusted Mobility Partner
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight" style={{ textWrap: 'balance' }}>
            Why Coimbatore Commuters & Travelers Rely on C Taxi
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            No algorithm cancellations, no surge shocks during rain, and no untraceable drivers. Real human dispatch with dependable accountability.
          </p>
        </div>

        {/* 3 Core Guarantees Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">15-Minute Doorstep Dispatch</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              With cabs stationed across Gandhipuram, RS Puram, Peelamedu, and Saravanampatti, your driver arrives within 15 minutes of confirmation.
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Coimbatore-wide GPS tracking</span>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Verified Chauffeurs & Safety</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every driver undergoes complete police verification, alcohol breathalyzer protocols, and certified mountain road navigation training.
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Safe for solo women & elders</span>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Zero Surge & Transparent Meters</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              The fare quoted is the fare you pay. No sudden 2x multiplication when it rains or during festival rush at Gandhipuram bus stand.
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Printed / WhatsApp GST bills</span>
            </div>
          </div>

        </div>

        {/* Full Coimbatore Locality Hubs Coverage */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-neutral-800 gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Active C Taxi Pickup Hubs Across Coimbatore
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Drivers strategically positioned in key residential, IT, industrial, and transit corridors
              </p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-500/30 font-semibold self-start sm:self-auto">
              24/7 Rapid Response Zone
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COIMBATORE_LOCALITIES.map((loc, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-300 hover:border-amber-400/40 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate">{loc}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-neutral-400 mt-5 text-center">
            Also serving surrounding industrial belts: Mettupalayam, Karumathampatti, Annur, Kinathukadavu, and Pollachi road.
          </p>
        </div>

        {/* Attributable Verified Reviews (Quantitative Rigor) */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Real Traveler Feedback
              </span>
              <h3 className="text-2xl font-bold text-white font-heading mt-1">
                Verified Reviews from Coimbatore Travelers
              </h3>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-neutral-300 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9 / 5 Rating (1,840+ Rides)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between shadow-md"
              >
                <div>
                  
                  {/* Star rating + trip badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {t.trip}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>

                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-amber-400/90 font-medium">{t.role}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{t.locality}</div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
