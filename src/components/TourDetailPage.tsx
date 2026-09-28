import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  Check, 
  X, 
  Calendar, 
  ShieldCheck, 
  Car, 
  Users, 
  Briefcase, 
  Sparkles,
  Mountain,
  ChevronRight,
  Info
} from 'lucide-react';
import { TourPackage, TOUR_PACKAGES } from '../data/toursData';
import { TourCardVisual } from './TourCardVisual';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

interface TourDetailPageProps {
  tour: TourPackage;
  onBackToHome: () => void;
  onNavigateToTour: (slug: string) => void;
  onOpenBookingModal: (bookingDetails: any) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({
  tour,
  onBackToHome,
  onNavigateToTour,
  onOpenBookingModal,
}) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<'sedan' | 'suv' | 'crysta'>('sedan');
  const [travelDate, setTravelDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [pickupLocality, setPickupLocality] = useState('Gandhipuram / Any Location in Coimbatore');

  const activePrice = 
    selectedVehicleType === 'sedan' ? tour.sedanPrice :
    selectedVehicleType === 'suv' ? tour.suvPrice : tour.crystaPrice;

  const vehicleName = 
    selectedVehicleType === 'sedan' ? 'Prime AC Sedan (Dzire / Etios)' :
    selectedVehicleType === 'suv' ? 'Family SUV (Maruti Ertiga 6-Seater)' :
    'Premium Innova Crysta (7-Seater VIP)';

  const formattedWhatsAppText = encodeURIComponent(
    `Hello C Taxi Coimbatore,\nI would like to book the tour package:\n` +
    `• Tour: ${tour.title}\n` +
    `• Vehicle: ${vehicleName}\n` +
    `• Date: ${travelDate}\n` +
    `• Pickup: ${pickupLocality}\n` +
    `• Quoted Package Fare: ₹${activePrice.toLocaleString('en-IN')}\n\nPlease confirm availability and driver dispatch.`
  );

  const handleBookNow = () => {
    onOpenBookingModal({
      serviceType: 'outstation',
      pickup: pickupLocality,
      drop: tour.title,
      vehicle: vehicleName,
      estimatedPrice: activePrice,
      date: travelDate,
      time: '06:30 AM',
      breakdownNote: `${tour.duration} package: ${tour.routeOverview} with dedicated chauffeur`
    });
  };

  const otherTours = TOUR_PACKAGES.filter(t => t.slug !== tour.slug);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <nav className="flex items-center gap-2 text-xs text-neutral-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>C Taxi Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span>Tour Packages</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-amber-400 font-medium truncate max-w-[200px] sm:max-w-none">
              {tour.title}
            </span>
          </nav>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-amber-400 hover:text-amber-300 font-semibold text-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>24/7 Desk: {DISPLAY_PHONE}</span>
          </a>
        </div>

        {/* Hero Visual Banner */}
        <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
          <TourCardVisual
            slug={tour.slug}
            title={tour.title}
            badge={tour.badge}
            className="p-8 sm:p-12 min-h-[220px]"
          />

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 p-4 sm:p-6 bg-neutral-950/90 border-t border-neutral-800 gap-4 text-xs">
            <div>
              <span className="text-neutral-500 uppercase font-bold text-[10px] tracking-wider">Starting Rate</span>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading tabular-nums mt-0.5">
                ₹{tour.startingPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <span className="text-neutral-500 uppercase font-bold text-[10px] tracking-wider">Duration</span>
              <div className="text-sm sm:text-base font-bold text-white mt-1">
                {tour.duration}
              </div>
            </div>

            <div>
              <span className="text-neutral-500 uppercase font-bold text-[10px] tracking-wider">Total Distance</span>
              <div className="text-sm sm:text-base font-bold text-white mt-1">
                {tour.distance}
              </div>
            </div>

            <div>
              <span className="text-neutral-500 uppercase font-bold text-[10px] tracking-wider">Pickup / Drop</span>
              <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> At Your Doorstep
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Left Details (7 cols) + Right Booking Box (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Itinerary, Spots, Inclusions */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Route Overview */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                Tour Route Overview
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-mono bg-neutral-950 p-3 rounded-xl border border-neutral-800 leading-relaxed">
                {tour.routeOverview}
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                {tour.tagline}. Our chauffeurs have 5+ years of driving proficiency, maintaining absolute vehicle hygiene, air-conditioned comfort, and timely sightseeing halts.
              </p>
            </div>

            {/* Key Attractions Grid */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Key Attractions & Places Visited
                </h3>
                <span className="text-xs text-neutral-400">{tour.spots.length} destinations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.spots.map((spot, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5 hover:border-amber-400/40 transition-colors"
                  >
                    <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{spot.name}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {spot.desc}
                    </p>
                    {spot.timing && (
                      <div className="text-[11px] text-amber-400/80 font-mono pt-1">
                        ⏱ {spot.timing}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Hour-by-Hour Sample Itinerary */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2 border-b border-neutral-800 pb-3">
                <Clock className="w-4 h-4 text-amber-400" />
                Detailed Tour Timeline & Itinerary
              </h3>

              <div className="relative border-l border-neutral-800 ml-3 space-y-6 py-2">
                {tour.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-neutral-900" />
                    <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {item.time}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Inclusions */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 text-emerald-400">
                  <Check className="w-4 h-4" />
                  Package Inclusions
                </h4>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {tour.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 text-neutral-400">
                  <X className="w-4 h-4 text-neutral-400" />
                  Package Exclusions
                </h4>
                <ul className="space-y-2 text-xs text-neutral-400">
                  {tour.exclusions.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0 mt-1.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Right Column: Sticky Booking Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-22 space-y-6">
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                  Instant Tour Reservation
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Flat Package Rate
                </span>
              </div>

              {/* Vehicle Options */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Select Vehicle Category:
                </label>
                <div className="space-y-2">
                  
                  {/* Sedan Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType('sedan')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedVehicleType === 'sedan'
                        ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Prime Sedan (4 Passengers)</div>
                      <div className="text-[11px] text-neutral-400">Maruti Dzire / Etios · Chilled AC</div>
                    </div>
                    <div className="text-base font-extrabold text-amber-400 font-heading tabular-nums">
                      ₹{tour.sedanPrice.toLocaleString('en-IN')}
                    </div>
                  </button>

                  {/* 6-Seater SUV Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType('suv')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedVehicleType === 'suv'
                        ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Family SUV (6 Passengers)</div>
                      <div className="text-[11px] text-neutral-400">Maruti Ertiga / Carens · Hill Pull</div>
                    </div>
                    <div className="text-base font-extrabold text-amber-400 font-heading tabular-nums">
                      ₹{tour.suvPrice.toLocaleString('en-IN')}
                    </div>
                  </button>

                  {/* Innova Crysta Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType('crysta')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedVehicleType === 'crysta'
                        ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Toyota Innova Crysta (7 Pax)</div>
                      <div className="text-[11px] text-neutral-400">VIP Captain Seats · Supreme Comfort</div>
                    </div>
                    <div className="text-base font-extrabold text-amber-400 font-heading tabular-nums">
                      ₹{tour.crystaPrice.toLocaleString('en-IN')}
                    </div>
                  </button>

                </div>
              </div>

              {/* Date & Location Inputs */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    Preferred Tour Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    Pickup Address in Coimbatore
                  </label>
                  <input
                    type="text"
                    value={pickupLocality}
                    onChange={(e) => setPickupLocality(e.target.value)}
                    placeholder="e.g. Gandhipuram, RS Puram, Airport"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`${WHATSAPP_URL}?text=${formattedWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20"
                >
                  <MessageSquare className="w-4 h-4 fill-neutral-950" />
                  <span>Book on WhatsApp (₹{activePrice.toLocaleString('en-IN')})</span>
                </a>

                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10"
                >
                  <Car className="w-4 h-4 fill-neutral-950" />
                  <span>Confirm Booking Online</span>
                </button>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-semibold text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-750 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Dispatcher ({DISPLAY_PHONE})</span>
                </a>
              </div>

              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 text-center space-y-1">
                <div>✓ Zero hidden night surcharges · Verified mountain drivers</div>
                <div>✓ Free cancellation up to 2 hours before trip</div>
              </div>

            </div>

            {/* Other Tour Sitelinks */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Explore Other Tour Sitelinks:
              </div>
              <div className="space-y-2 text-xs">
                {otherTours.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => {
                      onNavigateToTour(t.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full p-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 text-left flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                  >
                    <span className="truncate pr-2">{t.title}</span>
                    <span className="font-bold text-amber-400 font-mono shrink-0">
                      ₹{t.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
