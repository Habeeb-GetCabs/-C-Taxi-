import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, FileText, RefreshCw, Shield } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';
import { PolicyType } from './PolicyModal';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenPolicy: (type: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  return (
    <footer className="bg-[#171717] border-t border-neutral-800 text-neutral-400 text-xs py-12 pb-28 sm:pb-24 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] rounded-md py-1"
              aria-label="C Taxi — Coimbatore Home"
            >
              <BrandLogo size="sm" />
            </button>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Coimbatore's dependable 24/7 call taxi service. Clean AC Prime Sedans, 6-Seater Family SUVs, and Premium Innova Crystas for local rides, Ooty hill tours, and prompt CJB airport transfers.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <Clock className="w-4 h-4" />
              <span>Available 24 Hours · 365 Days a Year</span>
            </div>
          </div>

          {/* Quick Dedicated Service Pages */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              Our 4 Dedicated Services
            </div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('local-taxi')} 
                  className="hover:text-[#FFBF00] transition-colors text-left"
                >
                  Local Taxi (10-15 Min Kovai Arrival)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('outstation-cabs')} 
                  className="hover:text-[#FFBF00] transition-colors text-left"
                >
                  Outstation Cabs & One-Way Drops
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('airport-taxi')} 
                  className="hover:text-[#FFBF00] transition-colors text-left"
                >
                  Airport Taxi (CJB 24/7 Pickups & Drops)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tours')} 
                  className="hover:text-[#FFBF00] transition-colors text-left"
                >
                  Tours & Sightseeing Packages (Ooty, Isha, Palani)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Center (Google Ads Mandatory Compliance) */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              Customer Policy & Terms
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#FFBF00] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy (Data Protection)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('cancellation')}
                  className="hover:text-[#FFBF00] transition-colors flex items-center gap-1.5 text-left"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#FFBF00]" />
                  <span>Cancellation & Refund Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#FFBF00] transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Terms & Conditions of Service</span>
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFBF00] transition-colors text-neutral-400 inline-flex items-center gap-1"
                >
                  <span>Sitemap XML (Search Index)</span>
                  <span className="text-[10px] text-[#FFBF00] font-mono">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFBF00] transition-colors text-neutral-500 inline-flex items-center gap-1"
                >
                  <span>Robots.txt Indexing Directive</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Dispatch */}
          <div className="space-y-4">
            <div className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              24/7 Booking Helpline
            </div>
            
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2 text-[#FFBF00] hover:text-[#E5AC00] font-bold text-sm tracking-wide"
              >
                <Phone className="w-4 h-4 fill-[#FFBF00]" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              <a
                href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-400/20" />
                <span>Chat on WhatsApp (9089223344)</span>
              </a>

              <div className="flex items-start gap-2 text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>Main Hub: Avinashi Road, Peelamedu & Gandhipuram, Coimbatore, Tamil Nadu 641004</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CTaxiCab.com — Official Coimbatore Transport</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} C Taxi. Serving Coimbatore (CTaxiCab.com). All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => onOpenPolicy('privacy')}
              className="hover:underline text-neutral-300"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('cancellation')}
              className="hover:underline text-neutral-300"
            >
              Cancellation Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('terms')}
              className="hover:underline text-neutral-300"
            >
              Terms of Service
            </button>
            <span>·</span>
            <span className="text-neutral-400">24/7 Dispatch: {DISPLAY_PHONE}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
