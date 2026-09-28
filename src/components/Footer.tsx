import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, FileText, RefreshCw, Shield } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';
import { PolicyType } from './PolicyModal';

interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs py-12 pb-28 sm:pb-24 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-extrabold flex items-center justify-center font-heading text-lg">
                C
              </span>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                C Taxi Coimbatore
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Coimbatore's dependable 24/7 call taxi service. Clean AC Prime Sedans, 6-Seater Family SUVs, and Premium Innova Crystas for local rides, Ooty hill tours, hourly rentals, and prompt CJB airport transfers.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <Clock className="w-4 h-4" />
              <span>Available 24 Hours · 365 Days a Year</span>
            </div>
          </div>

          {/* Quick Service Links */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              Our Core Services
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#fare-calculator" className="hover:text-amber-400 transition-colors">
                  Local City Rides (Sedan Base ₹100 + ₹28/km)
                </a>
              </li>
              <li>
                <a href="#popular-routes" className="hover:text-amber-400 transition-colors">
                  Ooty Hill Station Tour (From ₹3,000)
                </a>
              </li>
              <li>
                <a href="#fare-calculator" className="hover:text-amber-400 transition-colors">
                  Outstation Trips (Sedan ₹15/km, SUV ₹20/km)
                </a>
              </li>
              <li>
                <a href="#fare-calculator" className="hover:text-amber-400 transition-colors">
                  Hourly City Rentals (₹375/hr for first 3 hrs)
                </a>
              </li>
              <li>
                <a href="#fare-calculator" className="hover:text-amber-400 transition-colors">
                  Coimbatore Airport (CJB) Pickup & Drop
                </a>
              </li>
              <li>
                <a href="#fleet-rates" className="hover:text-amber-400 transition-colors">
                  Innova Crysta & Ertiga SUV Fleet
                </a>
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
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy (Data Protection)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('cancellation')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cancellation & Refund Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
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
                  className="hover:text-amber-400 transition-colors text-neutral-400 inline-flex items-center gap-1"
                >
                  <span>Sitemap XML (Search Index)</span>
                  <span className="text-[10px] text-amber-400 font-mono">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors text-neutral-500 inline-flex items-center gap-1"
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
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm tracking-wide"
              >
                <Phone className="w-4 h-4" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              <a
                href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (9089223344)</span>
              </a>

              <div className="flex items-start gap-2 text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>Main Desk: Avinashi Road, Peelamedu & Gandhipuram, Coimbatore, Tamil Nadu 641004</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registered Taxi & Chauffeur Services</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} C Taxi Coimbatore. All rights reserved.
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
              Terms
            </button>
            <span>·</span>
            <span>24/7 Dispatch: {DISPLAY_PHONE}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
