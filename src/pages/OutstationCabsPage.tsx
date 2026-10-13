import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Mountain, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  Users, 
  Briefcase, 
  ChevronDown,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  VEHICLE_FLEET, 
  OUTSTATION_DESTINATIONS, 
  PHONE_NUMBER, 
  DISPLAY_PHONE, 
  WHATSAPP_URL 
} from '../data/taxiData';

interface OutstationCabsPageProps {
  onOpenBookingModal: (details: any) => void;
  onNavigate: (page: string) => void;
}

const DESTINATION_CARDS_DATA = [
  {
    name: 'Coimbatore to Ooty',
    tag: 'Queen of Hills · Top Choice',
    distanceText: '88 km · 2h 45m',
    image: '/images/destinations/tour-ooty-lake.webp',
    desc: 'Via Mettupalayam & Nilgiri 36 Kalhatty hairpins. Botanical garden & tea estates.',
    price: 3000,
    priceLabel: 'Starting From',
    isSpecial: true,
    destSelect: 'Ooty (Queen of Hills)'
  },
  {
    name: 'Coimbatore to Coonoor',
    tag: 'Tea Estates & Sim\'s Park',
    distanceText: '72 km · 2h 15m',
    image: '/images/destinations/tour-coonoor-tea.webp',
    desc: 'Sim\'s Park, Dolphin\'s Nose & Lamb\'s Rock with scenic Nilgiri tea plantation stops.',
    price: 2800,
    priceLabel: 'Sedan Starting',
    isSpecial: false,
    destSelect: 'Coonoor (Nilgiri Tea Gardens)'
  },
  {
    name: 'Coimbatore to Valparai',
    tag: '40 Hairpin Curves · Wildlife',
    distanceText: '105 km · 3h 30m',
    image: '/images/destinations/tour-valparai-hairpins.webp',
    desc: 'Aliyar Dam, Loam\'s View & Sholayar reservoir through pristine Anamalai rainforest.',
    price: 3600,
    priceLabel: 'Package Starting',
    isSpecial: false,
    destSelect: 'Valparai (Tea Estates & Hairpins)'
  },
  {
    name: 'Coimbatore to Kodaikanal',
    tag: 'Princess of Hill Stations',
    distanceText: '172 km · 4h 30m',
    image: '/images/destinations/tour-kodaikanal-lake.webp',
    desc: 'Silver Cascade, Kodai Lake boating, Coaker\'s Walk & pine forest drives.',
    price: 4900,
    priceLabel: 'Round Trip From',
    isSpecial: false,
    destSelect: 'Kodaikanal (Princess of Hills)'
  },
  {
    name: 'Coimbatore to Palani',
    tag: 'Sacred Hill Pilgrimage',
    distanceText: '105 km · 2h 30m',
    image: '/images/destinations/tour-palani-temple.webp',
    desc: 'Fast-track darshan transfer to Arulmigu Dhandayuthapani Swamy Temple.',
    price: 2900,
    priceLabel: 'Sedan From',
    isSpecial: false,
    destSelect: 'Palani (Murugan Temple)'
  },
  {
    name: 'Coimbatore to Isha Yoga',
    tag: '112ft Adiyogi & Dhyanalinga',
    distanceText: '32 km · 1h 00m',
    image: '/images/destinations/tour-isha-adiyogi.webp',
    desc: 'Velliangiri foothills. Evening 3D laser projection & consecrated spaces.',
    price: 1400,
    priceLabel: 'Return Fare',
    isSpecial: false,
    destSelect: 'Isha Yoga Adiyogi'
  },
  {
    name: 'Coimbatore to Kotagiri',
    tag: 'Scenic Nilgiri Tea Valleys',
    distanceText: '71 km · 2h 10m',
    image: '/images/destinations/tour-kotagiri-kodanad.webp',
    desc: 'Quieter tea hill haven, Kodanad viewpoint panorama & Catherine falls.',
    price: 2900,
    priceLabel: 'Sedan From',
    isSpecial: false,
    destSelect: 'Ooty (Queen of Hills)'
  },
  {
    name: 'Coimbatore to Topslip & Pollachi',
    tag: 'Anamalai Reserve & Groves',
    distanceText: '45 km · 1h 10m',
    image: '/images/destinations/tour-pollachi-topslip.webp',
    desc: 'Anamalai Tiger Reserve safari, elephant camp & lush coconut highways.',
    price: 1250,
    priceLabel: 'Round Trip From',
    isSpecial: false,
    destSelect: 'Pollachi / Topslip Anamalai'
  },
  {
    name: 'Coimbatore to Tiruppur',
    tag: 'Textile Hub Express Transit',
    distanceText: '54 km · 1h 10m',
    image: '/images/destinations/transit-tiruppur-expressway.webp',
    desc: 'Direct industrial corridor transfer via 4-lane Avinashi highway.',
    price: 1350,
    priceLabel: 'One-Way From',
    isSpecial: false,
    destSelect: 'Tiruppur (Textile City)'
  }
];

export const OutstationCabsPage: React.FC<OutstationCabsPageProps> = ({ onOpenBookingModal, onNavigate }) => {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [destination, setDestination] = useState(OUTSTATION_DESTINATIONS[0].name);
  const [tripDays, setTripDays] = useState<number>(1);
  const [selectedVehicleId, setSelectedVehicleId] = useState<'sedan' | 'suv_ertiga' | 'premium_suv'>('sedan');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const vehicle = VEHICLE_FLEET.find(v => v.id === selectedVehicleId) || VEHICLE_FLEET[0];
  const activeDest = OUTSTATION_DESTINATIONS.find(d => d.name === destination) || OUTSTATION_DESTINATIONS[0];

  // Outstation calculation rules:
  // Sedan: ₹15/km, SUV: ₹20/km, Crysta: ₹23/km
  // Round trip: min 250 km/day, Driver batta: ₹500/day
  // One way: min 130 km, Driver batta: ₹500
  // Hill charges: if hill station, SUV +400, Crysta +600
  // Ooty starting price: 3000
  let calculatedDistance = 0;
  let driverBatta = 500 * (tripType === 'round' ? tripDays : 1);
  let hillFee = 0;

  if (activeDest.isHill) {
    if (vehicle.id === 'suv_ertiga') hillFee = 400;
    else if (vehicle.id === 'premium_suv') hillFee = 600;
  }

  if (tripType === 'round') {
    const roundKm = activeDest.distance * 2;
    calculatedDistance = Math.max(roundKm, 250 * tripDays);
  } else {
    calculatedDistance = Math.max(activeDest.distance, 130);
  }

  const kmFare = calculatedDistance * vehicle.ratePerKm;
  let totalFare = kmFare + driverBatta + hillFee;

  // Strict minimum starting price for Ooty is 3000
  if (activeDest.name.toLowerCase().includes('ooty') && totalFare < 3000) {
    totalFare = 3000;
  }

  const handleBookNow = () => {
    onOpenBookingModal({
      serviceType: 'outstation',
      pickup: 'Coimbatore City (Doorstep)',
      drop: activeDest.name,
      vehicle: vehicle.name,
      estimatedPrice: totalFare,
      date: new Date().toISOString().split('T')[0],
      time: '06:00 AM',
      breakdownNote: `${tripType === 'round' ? `Round Trip (${tripDays} Days)` : 'One-Way Drop'} · ${calculatedDistance} km @ ₹${vehicle.ratePerKm}/km + ₹${driverBatta} Driver Batta${hillFee > 0 ? ` + ₹${hillFee} Hill Fee` : ''}`
    });
  };

  const outstationFaqs = [
    {
      q: "What is your outstation rate per kilometer from Coimbatore?",
      a: "Our approved outstation rates are ₹15/km for Prime Sedan (Dzire/Etios), ₹20/km for Spacious SUV (Ertiga 6-seater), and ₹23/km for Premium SUV (Innova Crysta). For round trips, minimum billing is 250 km per calendar day."
    },
    {
      q: "How does driver batta work?",
      a: "Driver batta (allowance for driver food and accommodation) is a flat ₹500 per calendar day for all outstation journeys."
    },
    {
      q: "Are hill station charges applicable for Ooty and Valparai?",
      a: "For hill stations like Ooty, Coonoor, Valparai, and Kodaikanal, a hill safety charge of ₹400 applies for 6-seater SUVs and ₹600 for Innova Crysta to account for specialized high-altitude driving and hairpin bend safety. Cabs to Ooty start at ₹3,000."
    },
    {
      q: "Do you offer one-way drop taxi service to other cities?",
      a: "Yes! For one-way drops from Coimbatore to cities like Salem, Madurai, Tiruppur, Palakkad, or Bangalore, you only pay for the one-way travel with a minimum coverage of 130 km + ₹500 driver batta."
    },
    {
      q: "Are toll gate fees and state permits included?",
      a: "Tolls, parking fees, and interstate entry permits (e.g. into Kerala or Karnataka) are to be paid at actuals based on official receipts."
    }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#171717] min-h-screen">
      
      {/* Breadcrumb strip */}
      <div className="bg-[#F5F2EA] border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 text-xs text-[#777777] flex items-center gap-2">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-[#171717] transition-colors font-semibold"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#171717] font-bold">Outstation Cabs from Coimbatore</span>
        </div>
      </div>

      {/* Cinematic Hero Section with Scenic Western Ghats Highway Photography */}
      <section className="relative bg-[#171717] text-white border-b border-neutral-800 py-8 lg:py-14 overflow-hidden">
        
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFBF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFBF00]/15 text-[#FFBF00] text-xs font-bold border border-[#FFBF00]/30">
                <Mountain className="w-3.5 h-3.5 text-[#FFBF00]" />
                <span>Ooty Starting from ₹3,000 · Outstation from ₹15/km</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
                Outstation Cabs &amp; One-Way Drops from Coimbatore
              </h1>

              <p className="text-sm sm:text-base text-[#D5CEBE] leading-relaxed max-w-2xl">
                Travel across Tamil Nadu, Kerala, and Karnataka. Scenic hill station holidays to Ooty and Valparai, pilgrimage trips to Palani, or comfortable one-way drops with mountain-certified chauffeurs.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-sm text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-lg shadow-[#FFBF00]/25 active:scale-95"
                >
                  <Phone className="w-4 h-4 fill-[#171717]" />
                  <span>Call Outstation Desk: {DISPLAY_PHONE}</span>
                </a>

                <a
                  href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20an%20outstation%20cab%20from%20Coimbatore`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp Booking</span>
                </a>
              </div>

              {/* Verified Pricing Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-neutral-800 text-xs">
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Prime Sedan</span>
                  <span className="font-extrabold text-[#FFBF00] text-sm">₹15 / km</span>
                </div>
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Family SUV</span>
                  <span className="font-extrabold text-[#FFBF00] text-sm">₹20 / km</span>
                </div>
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Innova Crysta</span>
                  <span className="font-extrabold text-[#FFBF00] text-sm">₹23 / km</span>
                </div>
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Driver Batta</span>
                  <span className="font-extrabold text-white text-sm">₹500 / day</span>
                </div>
              </div>

              {/* Scenic Highway Banner */}
              <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-neutral-800 mt-2 shadow-sm">
                <img 
                  src="/images/destinations/tour-valparai-hairpins.webp"
                  alt="Scenic mountain highway in Western Ghats and Nilgiri tea hills"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-4">
                  <div className="text-white space-y-0.5">
                    <span className="text-[10px] font-bold text-[#FFBF00] uppercase tracking-wider block">
                      Western Ghats &amp; Nilgiri Highway Travel
                    </span>
                    <p className="text-xs sm:text-sm font-bold">
                      Ooty · Coonoor · Valparai · Kodaikanal · Palani · Munnar
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Outstation Calculator Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white text-[#171717] border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#171717] font-heading uppercase tracking-wide">
                      Outstation Fare Estimator
                    </h3>
                    <p className="text-xs text-[#777777]">Transparent approved tariff calculation</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-[#FFBF00] text-[#171717] font-extrabold text-xs shadow-xs">
                    Approved Tariff
                  </span>
                </div>

                {/* Trip Type Selector */}
                <div className="grid grid-cols-2 gap-2 bg-[#F5F2EA] p-1 rounded-xl border border-[#E5E0D8]">
                  <button
                    type="button"
                    onClick={() => setTripType('round')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      tripType === 'round'
                        ? 'bg-[#171717] text-white shadow-sm'
                        : 'text-[#777777] hover:text-[#171717]'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Round Trip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripType('oneway')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      tripType === 'oneway'
                        ? 'bg-[#171717] text-white shadow-sm'
                        : 'text-[#777777] hover:text-[#171717]'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>One-Way Drop</span>
                  </button>
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#171717]">Select Vehicle:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {VEHICLE_FLEET.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVehicleId(v.id as any)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          selectedVehicleId === v.id
                            ? 'bg-[#171717] border-[#171717] text-white shadow-sm'
                            : 'bg-[#F5F2EA] border-[#E5E0D8] text-[#777777] hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">{v.name.replace('Prime AC ', '').replace('Spacious ', '')}</div>
                        <div className={`text-[10px] font-bold ${selectedVehicleId === v.id ? 'text-[#FFBF00]' : 'text-[#777777]'}`}>₹{v.ratePerKm}/km</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination Dropdown */}
                <div className="space-y-2.5">
                  <div>
                    <label className="text-xs font-bold text-[#171717] flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" /> Destination from Coimbatore:
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                    >
                      {OUTSTATION_DESTINATIONS.map((dest) => (
                        <option key={dest.name} value={dest.name}>
                          {dest.name} ({dest.distance} km {dest.isHill ? '· Hill Station' : ''})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Trip Duration Slider */}
                  {tripType === 'round' && (
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-[#171717] mb-1">
                        <span>Trip Duration:</span>
                        <span className="font-mono text-[#171717] bg-[#F5F2EA] px-2 py-0.5 rounded border border-[#E5E0D8]">
                          {tripDays} Day{tripDays > 1 ? 's' : ''} (min {250 * tripDays} km)
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={tripDays}
                        onChange={(e) => setTripDays(Number(e.target.value))}
                        className="w-full accent-[#FFBF00] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#777777]">
                        <span>1 Day</span>
                        <span>2 Days</span>
                        <span>3 Days</span>
                        <span>5 Days</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="bg-[#171717] text-white rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-[#A0A09C] block">Estimated Outstation Fare:</span>
                      <div className="text-2xl font-black text-[#FFBF00] font-heading">
                        ₹{totalFare.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#A0A09C] block">Billed Distance:</span>
                      <div className="text-xs font-bold text-white font-mono">{calculatedDistance} km</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#A0A09C] border-t border-neutral-800 pt-1.5 space-y-0.5">
                    <div>• ₹{vehicle.ratePerKm}/km rate × {calculatedDistance} km = ₹{(calculatedDistance * vehicle.ratePerKm).toLocaleString('en-IN')}</div>
                    <div>• Driver Batta: ₹{driverBatta} ({tripType === 'round' ? `${tripDays} day${tripDays > 1 ? 's' : ''}` : 'One-way'})</div>
                    {hillFee > 0 && <div>• Hill Safety Charge: ₹{hillFee} ({vehicle.name})</div>}
                    {activeDest.name.toLowerCase().includes('ooty') && (
                      <div className="text-[#FFBF00] font-bold text-[10px] pt-0.5">✓ Ooty Special Fare from ₹3,000</div>
                    )}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full py-3 px-4 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <Car className="w-4 h-4" />
                  <span>Reserve Outstation Cab</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Image-Led Destination Cards - Warm Ivory Section */}
      <section className="py-12 lg:py-16 bg-[#F5F2EA] border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
                Verified Destinations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading mt-2.5">
                Popular Outstation Routes &amp; Starting Fares
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#777777] max-w-md">
              Transparent approved tariff with no hidden surcharges. Chauffeurs certified for mountain hairpins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATION_CARDS_DATA.map((card, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-2xl overflow-hidden border transition-all flex flex-col justify-between group shadow-sm hover:shadow-md ${
                  card.isSpecial ? 'border-2 border-[#FFBF00]' : 'border-[#E5E0D8] hover:border-[#FFBF00]'
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FFBF00] text-[#171717] shadow-sm">
                        {card.tag}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        {card.distanceText}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h3 className="text-lg font-extrabold text-white font-heading drop-shadow">
                        {card.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Copy */}
                  <div className="p-4 space-y-2.5">
                    <p className="text-xs text-[#777777] leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="text-[11px] text-[#171717] font-medium space-y-1 border-t border-[#E5E0D8] pt-2">
                      <div>✓ Certified mountain driver included</div>
                      <div>✓ Doorstep pickup &amp; flexible photo breaks</div>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="p-4 pt-0">
                  <div className="border-t border-[#E5E0D8] pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#777777] block uppercase font-bold tracking-wider">{card.priceLabel}</span>
                      <span className="text-2xl font-black text-[#171717] font-heading">
                        ₹{card.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDestination(card.destSelect);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#FFBF00] hover:text-[#171717] text-white text-xs font-bold transition-colors shadow-sm active:scale-95"
                    >
                      Select Route
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Vehicle Fleet for Outstation Journeys - Pure White Section */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              Outstation Fleet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Sedan, SUV &amp; Innova Crysta Options
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Commercial yellow-board vehicles maintained to the highest safety and comfort standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VEHICLE_FLEET.map((v) => (
              <div 
                key={v.id}
                className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-[#777777] border border-[#E5E0D8]">
                      {v.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#171717]">
                      ₹{v.ratePerKm}/km
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171717] font-heading">
                    {v.name}
                  </h3>

                  <p className="text-xs text-[#777777]">
                    Models: <strong className="text-[#171717]">{v.models}</strong>
                  </p>

                  <div className="border-t border-b border-[#E5E0D8] py-2.5 space-y-1.5 text-xs text-[#777777]">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#FFBF00]" />
                      <span>Capacity: {v.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#FFBF00]" />
                      <span>Luggage: {v.luggage}</span>
                    </div>
                    {v.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFBF00]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVehicleId(v.id as any);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-3 rounded-xl border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Calculate with {v.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Outstation FAQs - Warm Ivory Section */}
      <section className="py-12 lg:py-16 bg-[#F5F2EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Frequently Asked Questions About Outstation Cabs
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Essential details regarding billing, driver allowance, and route planning.
            </p>
          </div>

          <div className="space-y-3">
            {outstationFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#171717] hover:text-[#E5AC00] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#777777] leading-relaxed border-t border-[#E5E0D8] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
