import React from 'react';
import { Phone, MessageSquare, Clock } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="/" 
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md py-1"
          aria-label="C Taxi Coimbatore Home"
        >
          <span className="w-10 h-10 rounded-lg bg-amber-400 text-neutral-950 font-extrabold text-2xl flex items-center justify-center font-heading shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
            C
          </span>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5 leading-none">
              C Taxi
              <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Coimbatore
              </span>
            </span>
            <span className="text-[11px] text-neutral-400 tracking-wide mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" /> 24/7 Kovai Call Taxi
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a 
            href="#fare-calculator" 
            className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
          >
            Fare Calculator
          </a>
          <a 
            href="#featured-tours" 
            className="text-amber-400 font-semibold hover:text-amber-300 transition-colors focus:outline-none focus-visible:text-amber-400 flex items-center gap-1"
          >
            <span>Tour Packages</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </a>
          <a 
            href="#services" 
            className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
          >
            Services
          </a>
          <a 
            href="#popular-routes" 
            className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
          >
            Popular Routes
          </a>
          <a 
            href="#fleet-rates" 
            className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
          >
            Fleet & Rates
          </a>
          <a 
            href="#faqs" 
            className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400"
          >
            FAQs
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20cab%20in%20Coimbatore`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/50 hover:border-emerald-500/50 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            title="Chat on WhatsApp with C Taxi"
          >
            <MessageSquare className="w-4 h-4 fill-emerald-400/20" />
            WhatsApp
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-400/20 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Phone className="w-4 h-4 fill-neutral-950" />
            <span>Call: {DISPLAY_PHONE}</span>
          </a>
        </div>

      </div>
    </header>
  );
};
