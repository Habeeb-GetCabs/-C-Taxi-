import React from 'react';
import { Phone, MessageSquare, Clock, MapPin, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL, AD_CAMPAIGN_PRESETS } from '../data/taxiData';

interface HeroProps {
  currentCampaignId: string;
  onOpenBookingModal: (details: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ currentCampaignId, onOpenBookingModal }) => {
  const campaign = AD_CAMPAIGN_PRESETS.find(p => p.id === currentCampaignId) || AD_CAMPAIGN_PRESETS[0];

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800">
      
      {/* Background Decorative Grid and Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Trust Kicker - Unboxed Clean Typography */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.9/5 Rated Call Taxi in Coimbatore
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> 15-Min Doorstep Dispatch
              </span>
            </div>

            {/* High-Intent Headline with Anti-Orphan Balance */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading" style={{ textWrap: 'balance' }}>
              {campaign.h1}
            </h1>

            {/* Sub-headline addressing key customer hesitation */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              {campaign.subtext}
            </p>

            {/* Direct High-Contrast Action Triggers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/25 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <Phone className="w-5 h-5 fill-neutral-950" />
                <span>Call {DISPLAY_PHONE}</span>
              </a>

              <a
                href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20to%20book%20a%20cab%20in%20Coimbatore`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>Book via WhatsApp</span>
              </a>
            </div>

            {/* Value Bullet Points / Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>15-Min Doorstep Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ooty from ₹3,000</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Outstation from ₹15/km</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hourly from ₹375/hr</span>
              </div>
            </div>

          </div>

          {/* Right Visual Feature Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                    Transparent Rate Card
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-bold text-white">Live Dispatched Fleet</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Quick Route Highlights */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Ooty Hill Station Trip</div>
                      <div className="text-neutral-400 text-[11px]">36 Hairpin Certified Drivers</div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-400 tabular-nums">From ₹3,000</span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Local City Rides</div>
                      <div className="text-neutral-400 text-[11px]">Standard Meter · Zero Peak Surge</div>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-400 tabular-nums">Best Rates</span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Hourly City Rental</div>
                      <div className="text-neutral-400 text-[11px]">₹375/hr (first 3 hrs), then ₹350/hr</div>
                    </div>
                  </div>
                  <span className="font-bold text-amber-400 tabular-nums">₹375/hr</span>
                </div>
              </div>

              {/* Direct Call Button inside Card */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/10"
              >
                <Phone className="w-4 h-4 fill-neutral-950" />
                <span>Call Dispatch: {DISPLAY_PHONE}</span>
              </a>

              <p className="text-[11px] text-center text-neutral-400">
                Active hubs: <strong className="text-white">Gandhipuram · RS Puram · Peelamedu · Saravanampatti</strong>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
