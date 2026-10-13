import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface StickyBottomCtaProps {
  onOpenBookingModal: (details: any) => void;
}

export const StickyBottomCta: React.FC<StickyBottomCtaProps> = ({ onOpenBookingModal }) => {
  const handleQuickBook = () => {
    onOpenBookingModal({
      serviceType: 'local',
      pickup: 'Coimbatore City (Doorstep)',
      drop: 'Destination in Coimbatore / Outstation',
      vehicle: 'Prime AC Sedan',
      estimatedPrice: null,
      breakdownNote: 'Quick dispatch requested via instant booking bar'
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#171717]/95 backdrop-blur-md border-t border-neutral-800 shadow-2xl text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        
        {/* Mobile View (< 768px) - High Ergonomics unobtrusive bar */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {/* WhatsApp Button */}
          <a
            href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20cab%20in%20Coimbatore%20now`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20BD5A] transition-transform active:scale-95 shadow-sm"
            aria-label="Book C Taxi on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 fill-white/20 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* Call Now Button */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-extrabold text-xs text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-transform active:scale-95 shadow-sm"
            aria-label="Call C Taxi Dispatcher"
          >
            <Phone className="w-4 h-4 fill-[#171717] shrink-0" />
            <span className="truncate">Call: 9089223344</span>
          </a>
        </div>

        {/* Desktop View (>= 768px) */}
        <div className="hidden md:flex items-center justify-between gap-4">
          
          {/* Left: 24/7 Dispatch Availability Indicator */}
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#FFBF00] text-[#171717] font-extrabold flex items-center justify-center font-heading text-sm shrink-0 shadow-xs">
              C
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
                  C Taxi
                  <span className="text-[9px] font-bold text-[#FFBF00] bg-[#FFBF00]/15 px-1.5 py-0.5 rounded border border-[#FFBF00]/30 uppercase tracking-wider">
                    COIMBATORE
                  </span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
                <span className="text-xs font-bold text-white tracking-wide">
                  24/7 Dispatch Active
                </span>
                <span className="text-neutral-700 hidden lg:inline">·</span>
                <span className="text-[11px] text-[#A0A09C] hidden lg:inline">
                  Doorstep arrival in 10-15 minutes
                </span>
              </div>
              <div className="text-[11px] text-[#A0A09C]">
                Ooty from ₹3,000 · Outstation from ₹15/km · Hourly from ₹375/hr · Zero Peak Surge
              </div>
            </div>
          </div>

          {/* Right: High Contrast Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleQuickBook}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFBF00]" />
              <span>Quick Booking</span>
            </button>

            <a
              href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20would%20like%20to%20book%20a%20cab`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-sm active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-md shadow-[#FFBF00]/20 active:scale-95"
            >
              <Phone className="w-4 h-4 fill-[#171717]" />
              <span>Call: {DISPLAY_PHONE}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
