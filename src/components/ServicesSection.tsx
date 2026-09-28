import React from 'react';
import { 
  Compass, 
  Mountain, 
  Clock, 
  Plane, 
  Briefcase, 
  ShieldCheck, 
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface ServicesSectionProps {
  onSelectService: (serviceKey: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services = [
    {
      index: "01",
      title: "Local City Taxi Rides",
      subtitle: "Prompt 15-Min Doorstep Dispatch · Zero Peak Surge",
      description: "Quick, dependable rides across Coimbatore city hubs. Transparent digital meter calculation without dynamic surge multipliers. Chilled AC, sanitized interiors, and courteous drivers.",
      badge: "No Surge",
      icon: Compass,
      actionKey: "local",
      cta: "Calculate Local Fare"
    },
    {
      index: "02",
      title: "Outstation & Hill Station Tours",
      subtitle: "Ooty from ₹3,000 · Sedan ₹15/km · SUV ₹20/km · Crysta ₹23/km",
      description: "Specialized mountain chauffeurs for the Nilgiris (Ooty & Coonoor 36 hairpin bends) and Valparai ghats. Min 250 km coverage with flat ₹500 driver batta. Dedicated hill safety charge for SUVs.",
      badge: "36 Hairpins Certified",
      icon: Mountain,
      actionKey: "outstation",
      cta: "Plan Outstation Trip"
    },
    {
      index: "03",
      title: "Hourly City Rental Packages",
      subtitle: "₹375/hr for First 3 Hours · Then ₹350/hr Basis",
      description: "Keep a sanitized cab and professional chauffeur exclusively at your service for 2, 3, 4, 8, or 12 hours. Ideal for multi-stop textile shopping on Cross Cut Road, clinic appointments, and business meetings.",
      badge: "Multi-Stop Comfort",
      icon: Clock,
      actionKey: "hourly",
      cta: "View Hourly Packages"
    },
    {
      index: "04",
      title: "Coimbatore Airport (CJB) Transfers",
      subtitle: "Flight Delay Tracking & Terminal Meet-and-Greet",
      description: "Reliable airport pickups and drop-offs to Coimbatore International Airport (Peelamedu). Free flight tracking, early morning 4 AM dispatch, and prompt luggage assistance.",
      badge: "Punctual Drops",
      icon: Plane,
      actionKey: "airport",
      cta: "Book Airport Cab"
    },
    {
      index: "05",
      title: "Corporate & Factory Commute",
      subtitle: "GST Invoices, Clean Sedans & Priority Chauffeurs",
      description: "Tailored mobility solutions for businesses, TIDEL Park IT companies, and textile exporters in Coimbatore and Tiruppur. Clean executive sedans, punctual dispatch, and official GST invoices.",
      badge: "GST Billing Ready",
      icon: Briefcase,
      actionKey: "local",
      cta: "Inquire for Corporate"
    },
    {
      index: "06",
      title: "24/7 Rapid Emergency Dispatch",
      subtitle: "Dispatch Stations Across Key Kovai Corridors",
      description: "Round-the-clock telephone and WhatsApp dispatch for medical emergencies at Ganga Hospital, KMCH, Coimbatore Railway Junction, and Central Bus Stand with zero midnight surcharge.",
      badge: "24/7 Active",
      icon: ShieldCheck,
      actionKey: "local",
      cta: "Call Dispatch Desk"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Coimbatore Mobility Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight" style={{ textWrap: 'balance' }}>
              Specialized C Taxi Services Across Coimbatore & Beyond
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Every trip is operated by vetted commercial drivers in sanitized Prime Sedans, 6-Seater SUVs, and Premium Innova Crystas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white hover:text-amber-400 text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Direct Call: {DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.index}
                className="bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Index & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-amber-400">
                      {svc.index}.
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-300 bg-neutral-800 px-2.5 py-0.5 rounded border border-neutral-700">
                      {svc.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {svc.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400/90 mb-3">
                    {svc.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectService(svc.actionKey);
                      const el = document.getElementById('fare-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors focus:outline-none"
                  >
                    <span>{svc.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20am%20interested%20in%20${encodeURIComponent(svc.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-emerald-400 transition-colors p-1"
                    title={`WhatsApp inquiry for ${svc.title}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated One-Way Service Note */}
        <div className="mt-8 p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <div>
            <strong className="text-white">Looking for One-Way Drop Taxi?</strong> We operate dedicated one-way outstation cabs at ₹15/km (min 130 km coverage, driver batta ₹500) with zero return fare charged.
          </div>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="text-amber-400 hover:text-amber-300 font-semibold whitespace-nowrap"
          >
            Call Dispatch for One-Way: {DISPLAY_PHONE} →
          </a>
        </div>

      </div>
    </section>
  );
};
