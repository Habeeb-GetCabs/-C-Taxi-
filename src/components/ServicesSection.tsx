import React from 'react';
import { 
  ArrowRight, 
  Plane, 
  Mountain, 
  Clock, 
  Car, 
  ShieldCheck, 
  Phone,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface ServicesSectionProps {
  onNavigate: (serviceKey: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'local-taxi',
      title: 'Local City Taxi',
      badge: '10-15 Min Pickup',
      tagline: 'Doorstep dispatch across Gandhipuram, RS Puram, Peelamedu & all Kovai localities.',
      priceHighlight: 'Zero Peak Surge',
      points: [
        '10-15 minute average arrival across all areas',
        'Clean air-conditioned Prime Sedans and spacious SUVs',
        'Transparent digital meter billing with zero surge'
      ],
      icon: Car,
      cta: 'Explore Local Taxi'
    },
    {
      id: 'outstation-cabs',
      title: 'Outstation Cabs & Drops',
      badge: 'Fare calculator',
      tagline: 'Comfortable intercity travel across Tamil Nadu, Kerala & Karnataka with mountain drivers.',
      priceHighlight: 'Round trip & one-way fares',
      points: [
        'Round trips: ₹2,000/day + ₹12/km; minimum 100 km/day',
        'One-way minimum 130 km: Sedan ₹15/km + ₹500; SUV ₹22/km + ₹600',
        'Crysta and Tempo Traveller fares available on request'
      ],
      icon: Mountain,
      cta: 'Explore Outstation'
    },
    {
      id: 'airport-taxi',
      title: 'Airport Taxi (CJB)',
      badge: '24/7 Terminal Service',
      tagline: 'Guaranteed on-time flight pickups & drops to Coimbatore International Airport (Peelamedu).',
      priceHighlight: 'Zero Delay Fees',
      points: [
        'Flight tracking with driver holding welcome name-board',
        'Zero waiting fees for delayed domestic & international flights',
        'Spacious trunks for large suitcases and family luggage'
      ],
      icon: Plane,
      cta: 'Explore Airport Taxi'
    },
    {
      id: 'tours',
      title: 'Holiday Tours & Packages',
      badge: 'Ask for package fare',
      tagline: 'Curated 1 to 3 day sightseeing circuits with dedicated vehicle, fuel, and seasoned chauffeurs.',
      priceHighlight: 'All 5 Signature Circuits',
      points: [
        'Ooty, Coonoor & Kotagiri Nilgiri Hills Tour',
        'Marudhamalai, Isha Yoga & Kovai Kutralam — request a quote',
        'Palani Murugan Pilgrimage, Valparai & Kodaikanal'
      ],
      icon: Clock,
      cta: 'Explore Tour Packages'
    }
  ];

  return (
    <section id="services" className="py-12 lg:py-18 bg-[#F5F2EA] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              4 Specialized Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
              Tailored Travel Solutions for Coimbatore
            </h2>
            <p className="text-sm sm:text-base text-[#777777]">
              Select from dedicated service categories with specialized drivers, transparent tariffs, and 24/7 customer support.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5E0D8] text-[#171717] hover:border-[#FFBF00] text-xs font-bold transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#FFBF00]" />
              <span>Inquiries: {DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>

        {/* 4 Dedicated Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-white border border-[#E5E0D8] hover:border-[#FFBF00] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FFBF00]/15 flex items-center justify-center text-[#171717] group-hover:bg-[#FFBF00] group-hover:scale-105 transition-all shadow-xs">
                      <Icon className="w-6 h-6 text-[#171717]" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F5F2EA] text-[#171717] border border-[#E5E0D8]">
                      {svc.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#171717] font-heading group-hover:text-[#E5AC00] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                      {svc.tagline}
                    </p>
                  </div>

                  <div className="border-t border-b border-[#E5E0D8] py-3 space-y-2 text-xs text-[#777777]">
                    {svc.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFBF00] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate(svc.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#171717] text-white hover:bg-[#FFBF00] hover:text-[#171717] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-95"
                  >
                    <span>{svc.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
