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

const TOUR_GALLERY_PHOTOS: Record<string, Array<{ name: string; image: string; tag: string }>> = {
  'ooty-coonoor-kotagiri': [
    { name: 'Ooty Lake & Boathouse', image: '/images/destinations/tour-ooty-lake.webp', tag: 'Nilgiri Scenic Boating' },
    { name: 'Coonoor Tea Plantations & Sim\'s Park', image: '/images/destinations/tour-coonoor-tea.webp', tag: 'Emerald Tea Gardens' },
    { name: 'Kotagiri Kodanad Valley Viewpoint', image: '/images/destinations/tour-kotagiri-kodanad.webp', tag: 'Eastern Slope Panorama' }
  ],
  'marudhamalai-isha-kovai-kutralam': [
    { name: 'Isha Yoga Center (112ft Adiyogi)', image: '/images/destinations/tour-isha-adiyogi.webp', tag: 'Consecrated Energy Center' },
    { name: 'Marudhamalai Murugan Hill Temple', image: '/images/destinations/tour-marudhamalai.webp', tag: '12th-Century Hill Shrine' }
  ],
  'palani-temple-pilgrimage': [
    { name: 'Palani Dhandayuthapani Swamy Temple', image: '/images/destinations/tour-palani-temple.webp', tag: 'Holy Hilltop Sanctum' },
    { name: 'Palani Adivaaram Winch & Ropeway Base', image: '/images/destinations/tour-palani-adivaaram.webp', tag: 'Foot of Sivagiri Hill' }
  ],
  'valparai-topslip-safari': [
    { name: 'Valparai 40 Hairpins & Tea Estates', image: '/images/destinations/tour-valparai-hairpins.webp', tag: 'Western Ghats Rainforest' },
    { name: 'Topslip Anamalai Wildlife Sanctuary', image: '/images/destinations/tour-pollachi-topslip.webp', tag: 'Elephant Camp & Jungle Safari' }
  ],
  'valparai-pollachi-topslip': [
    { name: 'Valparai 40 Hairpins & Tea Estates', image: '/images/destinations/tour-valparai-hairpins.webp', tag: 'Western Ghats Rainforest' },
    { name: 'Topslip Anamalai Wildlife Sanctuary', image: '/images/destinations/tour-pollachi-topslip.webp', tag: 'Elephant Camp & Jungle Safari' }
  ],
  'kodaikanal-hills': [
    { name: 'Kodaikanal Star-Shaped Lake', image: '/images/destinations/tour-kodaikanal-lake.webp', tag: 'Pedalo Boating & Cycling' },
    { name: 'Pillar Rocks & Misty Pine Forests', image: '/images/destinations/tour-kodaikanal-pillar.webp', tag: '400ft Granite Boulders' }
  ],
  'kodaikanal-princess-hills': [
    { name: 'Kodaikanal Star-Shaped Lake', image: '/images/destinations/tour-kodaikanal-lake.webp', tag: 'Pedalo Boating & Cycling' },
    { name: 'Pillar Rocks & Misty Pine Forests', image: '/images/destinations/tour-kodaikanal-pillar.webp', tag: '400ft Granite Boulders' }
  ]
};

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
    `Hello C Taxi,\nI would like to book the tour package from Coimbatore:\n` +
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
    <div className="min-h-screen bg-white text-[#171717] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
          <nav className="flex items-center gap-2 text-xs text-[#777777]">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-[#171717] transition-colors flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Tours</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#E5E0D8]" />
            <span className="text-[#171717] font-bold truncate max-w-[200px] sm:max-w-none">
              {tour.title}
            </span>
          </nav>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F5F2EA] border border-[#E5E0D8] text-[#171717] hover:border-[#FFBF00] font-bold text-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#FFBF00]" />
            <span>Tour Desk: {DISPLAY_PHONE}</span>
          </a>
        </div>

        {/* Hero Visual Banner with real destination photography */}
        <div className="rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-md bg-white">
          <TourCardVisual
            slug={tour.slug}
            title={tour.title}
            badge={tour.badge}
            className="h-64 sm:h-72"
          />

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 p-4 sm:p-5 bg-[#F5F2EA] border-t border-[#E5E0D8] gap-4 text-xs">
            <div>
              <span className="text-[#777777] uppercase font-bold text-[10px] tracking-wider block">Starting Rate</span>
              <div className="text-xl sm:text-2xl font-black text-[#171717] font-heading tabular-nums mt-0.5">
                ₹{tour.startingPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div>
              <span className="text-[#777777] uppercase font-bold text-[10px] tracking-wider block">Duration</span>
              <div className="text-sm sm:text-base font-bold text-[#171717] mt-1">
                {tour.duration}
              </div>
            </div>

            <div>
              <span className="text-[#777777] uppercase font-bold text-[10px] tracking-wider block">Distance from Kovai</span>
              <div className="text-sm sm:text-base font-bold text-[#171717] mt-1 truncate">
                {tour.distance}
              </div>
            </div>

            <div>
              <span className="text-[#777777] uppercase font-bold text-[10px] tracking-wider block">Pickup Guarantee</span>
              <div className="text-sm sm:text-base font-bold text-[#171717] mt-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#FFBF00]" /> Doorstep in Kovai
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Left Details (7 cols) + Right Booking Box (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Itinerary, Spots, Inclusions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Route Overview */}
            <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-[#171717] font-heading flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFBF00]" />
                Tour Route Overview
              </h3>
              <p className="text-xs sm:text-sm text-[#171717] font-mono bg-white p-3 rounded-xl border border-[#E5E0D8] leading-relaxed">
                {tour.routeOverview}
              </p>
              <p className="text-xs text-[#777777] leading-relaxed pt-1">
                {tour.tagline}. Our chauffeurs have extensive driving proficiency, maintaining absolute vehicle hygiene, air-conditioned comfort, and timely sightseeing halts.
              </p>
            </div>

            {/* Key Attractions Grid */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                <h3 className="text-lg font-bold text-[#171717] font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFBF00]" />
                  Key Attractions &amp; Places Visited
                </h3>
                <span className="text-xs text-[#777777] font-medium">{tour.spots.length} destinations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {tour.spots.map((spot, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F5F2EA] border border-[#E5E0D8] space-y-1.5 hover:border-[#FFBF00] transition-colors"
                  >
                    <div className="font-bold text-[#171717] text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFBF00]" />
                      <span>{spot.name}</span>
                    </div>
                    <p className="text-xs text-[#777777] leading-relaxed">
                      {spot.desc}
                    </p>
                    {spot.timing && (
                      <div className="text-[11px] text-[#171717] font-mono pt-0.5">
                        ⏱ {spot.timing}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Photographic Destination Landmark Showcase */}
            {TOUR_GALLERY_PHOTOS[tour.slug] && (
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                  <h3 className="text-lg font-bold text-[#171717] font-heading flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-[#FFBF00]" />
                    Featured Sightseeing Landmarks
                  </h3>
                  <span className="text-xs text-[#777777] font-medium">Verified Photography</span>
                </div>

                <div className={`grid grid-cols-1 ${TOUR_GALLERY_PHOTOS[tour.slug].length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-4`}>
                  {TOUR_GALLERY_PHOTOS[tour.slug].map((photo, pIdx) => (
                    <div 
                      key={pIdx}
                      className="group rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#171717] relative flex flex-col"
                    >
                      <div className="relative h-36 w-full overflow-hidden">
                        <img 
                          src={photo.image} 
                          alt={photo.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute top-2 left-2 text-[10px] font-bold text-[#171717] bg-[#FFBF00] px-2 py-0.5 rounded shadow-xs">
                          {photo.tag}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white border-t border-[#E5E0D8]">
                        <h4 className="text-xs font-bold text-[#171717] truncate">
                          {photo.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Itinerary */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-[#171717] font-heading flex items-center gap-2 border-b border-[#E5E0D8] pb-3">
                <Clock className="w-4 h-4 text-[#FFBF00]" />
                Detailed Tour Timeline &amp; Itinerary
              </h3>

              <div className="relative border-l border-[#E5E0D8] ml-3 space-y-5 py-2">
                {tour.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#FFBF00] border-2 border-white shadow-xs" />
                    <span className="font-mono text-xs font-bold text-[#171717] bg-[#F5F2EA] px-2 py-0.5 rounded border border-[#E5E0D8]">
                      {item.time}
                    </span>
                    <h4 className="text-sm font-bold text-[#171717] mt-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Inclusions */}
              <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-[#171717] flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Package Inclusions
                </h4>
                <ul className="space-y-2 text-xs text-[#777777]">
                  {tour.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-[#171717] flex items-center gap-2">
                  <X className="w-4 h-4 text-[#777777]" />
                  Package Exclusions
                </h4>
                <ul className="space-y-2 text-xs text-[#777777]">
                  {tour.exclusions.map((exc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#777777] shrink-0 mt-1.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Right Column: Sticky Booking Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-22 space-y-5">
            
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#171717]">
                  Instant Tour Reservation
                </span>
                <span className="text-[11px] font-extrabold text-[#171717] bg-[#FFBF00] px-2 py-0.5 rounded shadow-xs">
                  Flat Package Fare
                </span>
              </div>

              {/* Vehicle Options */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-2">
                  Select Vehicle Category:
                </label>
                <div className="space-y-2">
                  
                  {/* Sedan Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType('sedan')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedVehicleType === 'sedan'
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-[#F5F2EA] border-[#E5E0D8] text-[#171717] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Prime Sedan (4 Pax)</div>
                      <div className={`text-[11px] ${selectedVehicleType === 'sedan' ? 'text-[#A0A09C]' : 'text-[#777777]'}`}>
                        Maruti Dzire / Etios · Chilled AC
                      </div>
                    </div>
                    <div className={`text-base font-black font-heading tabular-nums ${selectedVehicleType === 'sedan' ? 'text-[#FFBF00]' : 'text-[#171717]'}`}>
                      ₹{tour.sedanPrice.toLocaleString('en-IN')}
                    </div>
                  </button>

                  {/* 6-Seater SUV Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType('suv')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedVehicleType === 'suv'
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-[#F5F2EA] border-[#E5E0D8] text-[#171717] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Family SUV (6 Pax)</div>
                      <div className={`text-[11px] ${selectedVehicleType === 'suv' ? 'text-[#A0A09C]' : 'text-[#777777]'}`}>
                        Maruti Ertiga · Hill Safety Pull
                      </div>
                    </div>
                    <div className={`text-base font-black font-heading tabular-nums ${selectedVehicleType === 'suv' ? 'text-[#FFBF00]' : 'text-[#171717]'}`}>
                      ₹{tour.suvPrice.toLocaleString('en-IN')}
                    </div>
                  </button>

                  {/* Innova Crysta Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType('crysta')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedVehicleType === 'crysta'
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-[#F5F2EA] border-[#E5E0D8] text-[#171717] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Innova Crysta (7 Pax)</div>
                      <div className={`text-[11px] ${selectedVehicleType === 'crysta' ? 'text-[#A0A09C]' : 'text-[#777777]'}`}>
                        VIP Captain Seats · Supreme Comfort
                      </div>
                    </div>
                    <div className={`text-base font-black font-heading tabular-nums ${selectedVehicleType === 'crysta' ? 'text-[#FFBF00]' : 'text-[#171717]'}`}>
                      ₹{tour.crystaPrice.toLocaleString('en-IN')}
                    </div>
                  </button>

                </div>
              </div>

              {/* Date & Location Inputs */}
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FFBF00]" />
                    Preferred Tour Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" />
                    Pickup Address in Coimbatore
                  </label>
                  <input
                    type="text"
                    value={pickupLocality}
                    onChange={(e) => setPickupLocality(e.target.value)}
                    placeholder="e.g. Gandhipuram, RS Puram, Airport"
                    className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={`${WHATSAPP_URL}?text=${formattedWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Book on WhatsApp (₹{activePrice.toLocaleString('en-IN')})</span>
                </a>

                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-sm text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-md active:scale-95"
                >
                  <Car className="w-4 h-4" />
                  <span>Confirm Online Reservation</span>
                </button>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-bold text-xs text-[#171717] bg-[#F5F2EA] hover:bg-white border border-[#E5E0D8] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FFBF00]" />
                  <span>Call Tour Desk ({DISPLAY_PHONE})</span>
                </a>
              </div>

              <div className="pt-2 border-t border-[#E5E0D8] text-[11px] text-[#777777] text-center space-y-0.5">
                <div>✓ Zero hidden night surcharges · Verified mountain drivers</div>
                <div>✓ Free cancellation up to 2 hours before trip</div>
              </div>

            </div>

            {/* Other Tour Sitelinks */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
              <div className="text-xs font-bold text-[#171717] uppercase tracking-wider">
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
                    className="w-full p-2.5 rounded-xl bg-[#F5F2EA] hover:bg-[#EAE5D8] border border-[#E5E0D8] text-left flex items-center justify-between text-[#171717] transition-colors"
                  >
                    <span className="truncate pr-2 font-semibold">{t.title}</span>
                    <span className="font-extrabold text-[#171717] font-mono shrink-0">
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
