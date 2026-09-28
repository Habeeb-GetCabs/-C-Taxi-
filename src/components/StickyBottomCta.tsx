import React from 'react';
import { Phone, MessageSquare, Clock, Car, Sparkles, MapPin } from 'lucide-react';
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 shadow-2xl safe-area-pb">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        
        {/* Mobile View (< 768px) - High Thumb Ergonomics within 15% Viewport */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {/* WhatsApp Button */}
          <a
            href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20cab%20in%20Coimbatore%20now`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-transform active:scale-95 shadow-md shadow-emerald-400/20"
            aria-label="Book C Taxi on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 fill-neutral-950 shrink-0" />
            <span className="truncate">WhatsApp Book</span>
          </a>

          {/* Call Now Button */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-transform active:scale-95 shadow-md shadow-amber-400/20"
            aria-label="Call C Taxi Dispatcher"
          >
            <Phone className="w-4 h-4 fill-neutral-950 shrink-0" />
            <span className="truncate">Call: 9089223344</span>
          </a>
        </div>

        {/* Desktop / Web Friendly View (>= 768px) - Full Conversion Control Bar */}
        <div className="hidden md:flex items-center justify-between gap-4">
          
          {/* Left: 24/7 Dispatch Availability Indicator */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-extrabold flex items-center justify-center font-heading text-base shrink-0">
              C
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wide">
                  24/7 Kovai Cab Dispatch Live
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-[11px] text-neutral-400">
                  Doorstep arrival in 10-15 minutes
                </span>
              </div>
              <div className="text-[11px] text-amber-400 font-medium">
                Ooty from ₹3,000 · Outstation from ₹15/km · Hourly from ₹375/hr · Zero Peak Surge
              </div>
            </div>
          </div>

          {/* Right: Web-Friendly High Contrast CTA Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleQuickBook}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Booking Form</span>
            </button>

            <a
              href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20would%20like%20to%20book%20a%20cab`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-400/20"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-neutral-950" />
              <span>WhatsApp (9089223344)</span>
            </a>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20"
            >
              <Phone className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Call: {DISPLAY_PHONE}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
