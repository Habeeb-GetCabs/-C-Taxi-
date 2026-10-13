import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  Car, 
  Plane, 
  Mountain, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface HeroProps {
  onNavigate: (page: string) => void;
  onOpenBookingModal: (details: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <section className="relative bg-[#171717] text-white overflow-hidden border-b border-neutral-800">
      
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#171717]/90 to-[#171717] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#FFBF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Trust Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#171717] font-extrabold bg-[#FFBF00] px-3 py-1 rounded-full shadow-sm">
                <Star className="w-3.5 h-3.5 fill-[#171717] text-[#171717]" />
                4.9/5 Rated Call Taxi in Coimbatore
              </span>
              <span className="text-[#A0A09C] flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> 10-15 Min Doorstep Arrival
              </span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-heading">
              Coimbatore's Trusted 24/7 Call Taxi &amp; Outstation Fleet
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg text-[#D5CEBE] max-w-2xl leading-relaxed">
              Doorstep AC cabs across Kovai in 15 minutes. Ooty hill trips from <strong className="text-white font-bold">₹3,000</strong>, outstation travel from <strong className="text-white font-bold">₹15/km</strong>, and CJB airport transfers with zero peak-hour surge.
            </p>

            {/* Direct High-Contrast Action Triggers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-base text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-lg shadow-[#FFBF00]/30 active:scale-95"
              >
                <Phone className="w-5 h-5 fill-[#171717]" />
                <span>Call {DISPLAY_PHONE}</span>
              </a>

              <a
                href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20cab%20in%20Coimbatore`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-md shadow-[#25D366]/20 active:scale-95"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>Book on WhatsApp</span>
              </a>
            </div>

            {/* Value Bullet Points / Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-2 text-[#E5E0D8]">
                <CheckCircle className="w-4 h-4 text-[#FFBF00] shrink-0" />
                <span>15-Min Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-[#E5E0D8]">
                <CheckCircle className="w-4 h-4 text-[#FFBF00] shrink-0" />
                <span>Ooty from ₹3,000</span>
              </div>
              <div className="flex items-center gap-2 text-[#E5E0D8]">
                <CheckCircle className="w-4 h-4 text-[#FFBF00] shrink-0" />
                <span>Outstation ₹15/km</span>
              </div>
              <div className="flex items-center gap-2 text-[#E5E0D8]">
                <CheckCircle className="w-4 h-4 text-[#FFBF00] shrink-0" />
                <span>No Peak Surge</span>
              </div>
            </div>

          </div>

          {/* Right Visual Automotive Hero Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-750 bg-neutral-900 shadow-2xl group">
              
              {/* Rich Chauffeur / Automotive Image */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                <img 
                  src="/images/fleet/innova-crysta.jpg"
                  alt="C Taxi premium Toyota Innova Crysta and AC sedan fleet in Coimbatore"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Floating Fleet Badges on Image */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#171717]/90 backdrop-blur-md text-[#FFBF00] text-xs font-bold border border-[#FFBF00]/30 shadow-md">
                    Commercial AC Fleet
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <div className="p-3.5 rounded-xl bg-[#171717]/90 backdrop-blur-md border border-white/10 shadow-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Prime Sedan &amp; SUV Fleet
                      </span>
                      <span className="text-[11px] font-mono text-[#FFBF00] font-bold">
                        100% Verified Drivers
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0A09C]">
                      Dzire, Etios, Ertiga 6-Seater &amp; Toyota Innova Crysta. Clean interiors with large boot space.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Jump Bar Beneath the Image */}
              <div className="p-3 bg-[#1A1A1A] border-t border-neutral-800 grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('local-taxi')}
                  className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-left text-white border border-neutral-700 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold flex items-center gap-1.5 truncate">
                    <Car className="w-3.5 h-3.5 text-[#FFBF00] shrink-0" /> Local Taxi
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0A09C]" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('outstation-cabs')}
                  className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-left text-white border border-neutral-700 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold flex items-center gap-1.5 truncate">
                    <Mountain className="w-3.5 h-3.5 text-[#FFBF00] shrink-0" /> Outstation
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0A09C]" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('airport-taxi')}
                  className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-left text-white border border-neutral-700 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold flex items-center gap-1.5 truncate">
                    <Plane className="w-3.5 h-3.5 text-[#FFBF00] shrink-0" /> Airport (CJB)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0A09C]" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('tours')}
                  className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-left text-white border border-neutral-700 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold flex items-center gap-1.5 truncate">
                    <Clock className="w-3.5 h-3.5 text-[#FFBF00] shrink-0" /> Tours &amp; Trips
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0A09C]" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
