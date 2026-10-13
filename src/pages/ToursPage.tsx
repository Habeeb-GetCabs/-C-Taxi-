import React from 'react';
import { 
  Mountain, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Check, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  Users,
  Compass
} from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/toursData';
import { TourCardVisual } from '../components/TourCardVisual';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';
import { assetUrl } from '../utils/assetUrl';

interface ToursPageProps {
  onNavigateToTour: (slug: string) => void;
  onBookTour: (tour: TourPackage) => void;
  onNavigate: (page: string) => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({
  onNavigateToTour,
  onBookTour,
  onNavigate
}) => {
  return (
    <div className="bg-[#FFFFFF] text-[#171717] min-h-screen">
      
      {/* Breadcrumb Bar */}
      <div className="bg-[#F5F2EA] border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 text-xs text-[#777777] flex items-center gap-2">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-[#171717] transition-colors font-semibold"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#171717] font-bold">Tours &amp; Sightseeing Packages</span>
        </div>
      </div>

      {/* Cinematic Hero Section - Charcoal with Nilgiri Mountain Photography */}
      <section className="relative bg-[#171717] text-white border-b border-neutral-800 py-8 lg:py-14 overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#FFBF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFBF00]/15 text-[#FFBF00] text-xs font-bold border border-[#FFBF00]/30">
                <Mountain className="w-3.5 h-3.5 text-[#FFBF00]" />
                <span>Handcrafted Hill Station &amp; Pilgrimage Packages</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight leading-[1.15]">
                Coimbatore Sightseeing Tours &amp; Holiday Packages
              </h1>

              <p className="text-sm sm:text-base text-[#D5CEBE] leading-relaxed max-w-2xl">
                Explore the mist of the Nilgiris, sacred Murugan shrines, and Siruvani waterfalls with dedicated commercial AC cabs. Chauffeurs certified for mountain hairpins, transparent package fares from <strong className="text-white font-bold">₹3,000</strong>, and doorstep pickup.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] font-extrabold text-sm transition-all shadow-lg shadow-[#FFBF00]/25 active:scale-95"
                >
                  <Phone className="w-4 h-4 fill-[#171717]" />
                  <span>Tour Desk: {DISPLAY_PHONE}</span>
                </a>

                <a
                  href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20want%20to%20inquire%20about%20tour%20packages`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Custom Tour on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-neutral-800 text-xs text-[#E5E0D8]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FFBF00]" />
                  <span>36 Hairpins Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FFBF00]" />
                  <span>Fuel &amp; Driver Batta Incl.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FFBF00]" />
                  <span>Doorstep Pickup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FFBF00]" />
                  <span>Flexible Photo Stops</span>
                </div>
              </div>
            </div>

            {/* Right Column: Cinematic Destination Visual (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-750 bg-neutral-900 shadow-xl group">
                <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                  <img 
                    src={assetUrl('/images/destinations/tour-coonoor-tea.webp')}
                    alt="Nilgiri tea plantations, misty valleys, and mountain roads near Coonoor and Ooty"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  
                  {/* Floating badges on image */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-[#171717]/90 backdrop-blur-md text-[#FFBF00] text-xs font-bold border border-[#FFBF00]/30 shadow-md">
                      Signature Nilgiri Circuits
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <div className="p-3.5 rounded-xl bg-[#171717]/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">
                          Ooty, Coonoor &amp; Kotagiri
                        </div>
                        <div className="text-[11px] text-[#A0A09C]">
                          Daily departures · Clean AC Sedan &amp; SUV
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#A0A09C] block">From</span>
                        <span className="text-lg font-black text-[#FFBF00] font-heading">₹3,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tour Packages Bento Grid - Warm Ivory Background */}
      <section className="py-12 lg:py-16 bg-[#F5F2EA] border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
                Verified Circuits
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading mt-2.5">
                All 5 Signature Tour Packages
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#777777] max-w-md">
              Every package includes dedicated commercial AC cab, experienced mountain chauffeur, driver batta, and fuel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOUR_PACKAGES.map((tour) => (
              <div
                key={tour.slug}
                className="bg-white border border-[#E5E0D8] hover:border-[#FFBF00] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image-led destination visual */}
                  <TourCardVisual
                    slug={tour.slug}
                    title={tour.title}
                    badge={tour.badge}
                  />

                  {/* Tour Details */}
                  <div className="p-5 space-y-3.5">
                    
                    <div className="flex items-center justify-between text-xs text-[#777777] border-b border-[#E5E0D8] pb-2.5">
                      <span className="flex items-center gap-1.5 font-semibold text-[#171717]">
                        <Clock className="w-3.5 h-3.5 text-[#FFBF00]" />
                        {tour.duration}
                      </span>
                      <span className="text-xs text-[#777777] font-medium truncate max-w-[150px]">
                        {tour.distance}
                      </span>
                    </div>

                    <p className="text-xs text-[#777777] leading-relaxed line-clamp-2">
                      {tour.tagline}
                    </p>

                    {/* Key Spots */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                        Attractions Included:
                      </div>
                      <div className="space-y-1 text-xs text-[#777777]">
                        {tour.spots.slice(0, 3).map((spot, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#FFBF00] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{spot.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vehicle Rates Matrix */}
                    <div className="bg-[#F5F2EA] rounded-xl p-3 border border-[#E5E0D8] space-y-1.5 text-xs">
                      <div className="text-[11px] font-bold text-[#171717]">Package Vehicle Tariffs:</div>
                      <div className="flex justify-between text-[#777777]">
                        <span>Prime Sedan (4 Pax):</span>
                        <span className="font-bold text-[#171717]">₹{tour.sedanPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-[#777777]">
                        <span>Ertiga SUV (6 Pax):</span>
                        <span className="font-bold text-[#171717]">₹{tour.suvPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-[#777777]">
                        <span>Innova Crysta (7 Pax):</span>
                        <span className="font-bold text-[#171717]">₹{tour.crystaPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 space-y-2">
                  <div className="flex items-baseline justify-between border-t border-[#E5E0D8] pt-3.5 mb-2">
                    <div>
                      <span className="text-[10px] text-[#777777] block uppercase font-bold tracking-wider">Starting Rate</span>
                      <span className="text-2xl font-black text-[#171717] font-heading">
                        ₹{tour.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onBookTour(tour)}
                      className="px-4 py-2 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      Book Tour
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigateToTour(tour.slug)}
                    className="w-full py-2.5 px-3 rounded-xl border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Full Itinerary &amp; Attractions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Travelers Choose C Taxi - Pure White Background */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Why Travelers Choose C Taxi for Holiday Tours
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Unmatched comfort, mountain safety, and complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFBF00] text-[#171717] flex items-center justify-center shadow-sm">
                <Mountain className="w-5 h-5 text-[#171717]" />
              </div>
              <h3 className="font-bold text-base text-[#171717] font-heading">36-Hairpin Certified Drivers</h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Driving the Kalhatty ghat road to Ooty or the 40 hairpin bends to Valparai requires expertise. Our drivers possess over 10+ years of high-altitude experience.
              </p>
            </div>

            <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFBF00] text-[#171717] flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5 text-[#171717]" />
              </div>
              <h3 className="font-bold text-base text-[#171717] font-heading">Flexible Itinerary &amp; Photo Breaks</h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Travel at your family's pace. Stop at tea plantations, scenic waterfall lookouts, and authentic South Indian restaurants without rushing.
              </p>
            </div>

            <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFBF00] text-[#171717] flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#171717]" />
              </div>
              <h3 className="font-bold text-base text-[#171717] font-heading">Sanitized Fleet with Chilled AC</h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Clean, quiet cabins with deep-cleaned seats, large trunk luggage security, and dual-zone air conditioning across all vehicle categories.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
