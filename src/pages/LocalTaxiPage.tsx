import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Briefcase, 
  Navigation,
  ArrowRight,
  ChevronDown,
  Compass,
  Calendar
} from 'lucide-react';
import { 
  VEHICLE_FLEET, 
  COIMBATORE_LOCALITIES, 
  PHONE_NUMBER, 
  DISPLAY_PHONE, 
  WHATSAPP_URL 
} from '../data/taxiData';
import { assetUrl } from '../utils/assetUrl';

interface LocalTaxiPageProps {
  onOpenBookingModal: (details: any) => void;
  onNavigate: (page: string) => void;
}

const FLEET_PHOTOS: Record<string, string> = {
  'sedan': assetUrl('/images/fleet/fleet-prime-sedan.webp'),
  'suv_ertiga': assetUrl('/images/fleet/fleet-family-suv.webp'),
  'premium_suv': assetUrl('/images/fleet/fleet-innova-crysta.webp')
};

export const LocalTaxiPage: React.FC<LocalTaxiPageProps> = ({ onOpenBookingModal, onNavigate }) => {
  const [pickup, setPickup] = useState(COIMBATORE_LOCALITIES[0]);
  const [drop, setDrop] = useState(COIMBATORE_LOCALITIES[2]);
  const [distanceKm, setDistanceKm] = useState<number>(10);
  const [selectedVehicleId, setSelectedVehicleId] = useState<'sedan' | 'suv_ertiga' | 'premium_suv'>('sedan');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const vehicle = VEHICLE_FLEET.find(v => v.id === selectedVehicleId) || VEHICLE_FLEET[0];

  // Approved formula calculated internally:
  // Sedan: 100 base + (km * 28)
  // SUV: 100 base + (km * 35)
  // Premium SUV: 150 base + (km * 45)
  // Revealed to user as total estimated trip fare (no raw basefare/km breakdown formula)
  const estimatedFare = vehicle.localBaseFare + (distanceKm * vehicle.localPerKm);

  const handleBookNow = () => {
    onOpenBookingModal({
      serviceType: 'local',
      pickup,
      drop,
      vehicle: vehicle.name,
      estimatedPrice: estimatedFare,
      date: new Date().toISOString().split('T')[0],
      time: 'Immediate (10-15 Mins)',
      breakdownNote: `Local City Ride (~${distanceKm} km) · Clean AC Cab · Zero Peak Surge`
    });
  };

  const handleBookHourlyPackage = (pkgTitle: string, hours: number, kms: number, priceSedan: number) => {
    onOpenBookingModal({
      serviceType: 'local',
      pickup: 'Coimbatore (Doorstep)',
      drop: `Hourly Rental: ${pkgTitle}`,
      vehicle: vehicle.name,
      estimatedPrice: vehicle.id === 'sedan' ? priceSedan : Math.round(priceSedan * 1.35),
      date: new Date().toISOString().split('T')[0],
      time: 'As Scheduled',
      breakdownNote: `Hourly Package: ${hours} Hours / ${kms} Km included · Driver on standby`
    });
  };

  const HOURLY_PACKAGES = [
    { title: '2 Hours / 20 Km', hours: 2, kms: 20, sedanPrice: 750, suvPrice: 1050, note: 'Quick shopping & hospital visit' },
    { title: '4 Hours / 40 Km', hours: 4, kms: 40, sedanPrice: 1400, suvPrice: 1900, note: 'Half-day city meetings & errands' },
    { title: '8 Hours / 80 Km', hours: 8, kms: 80, sedanPrice: 2600, suvPrice: 3500, note: 'Full-day Kovai shopping & multiple stops' },
    { title: '12 Hours / 120 Km', hours: 12, kms: 120, sedanPrice: 3800, suvPrice: 4900, note: 'Extended business & city-wide itinerary' }
  ];

  const localFaqs = [
    {
      q: "How soon can a C Taxi reach my location in Coimbatore?",
      a: "With dedicated driver hubs located at Gandhipuram, RS Puram, Peelamedu, Saravanampatti, Singanallur, and Coimbatore Junction, our average arrival time is 10 to 15 minutes from your booking confirmation."
    },
    {
      q: "Do you charge peak-hour or midnight surge pricing for local rides?",
      a: "No. Unlike ride-hailing aggregators, C Taxi does not impose surge pricing during rain, office peak hours, or late nights. You receive a guaranteed transparent fare for your trip."
    },
    {
      q: "Can I book a local cab for multiple stops across Coimbatore?",
      a: "Yes! If you have multiple stops (e.g. shopping on Cross Cut Road, medical checkups, or business meetings), you can book either point-to-point local rides or choose our convenient Hourly Rental packages starting at ₹750."
    },
    {
      q: "Are all local cabs air-conditioned?",
      a: "Yes, 100% of our cabs are fully air-conditioned, well-maintained, clean, and driven by background-verified courteous chauffeurs."
    }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#171717] min-h-screen pb-24 md:pb-16">
      
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
          <span className="text-[#171717] font-bold">Local Taxi Coimbatore</span>
        </div>
      </div>

      {/* Cinematic Hero Section - Matches Outstation Page's Premium Charcoal Design */}
      <section className="relative bg-[#171717] text-white border-b border-neutral-800 py-8 lg:py-14 overflow-hidden">
        
        {/* Subtle ambient warm gold glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFBF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Yellow badge highlighting local taxi service in Coimbatore */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFBF00]/15 text-[#FFBF00] text-xs font-bold border border-[#FFBF00]/30">
                <Car className="w-3.5 h-3.5 text-[#FFBF00]" />
                <span>Local City Taxi · 10-15 Min Doorstep Arrival Across Coimbatore</span>
              </div>

              {/* High-impact white headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
                Coimbatore Local City Taxi &amp; Hourly Cab Rentals
              </h1>

              {/* Concise description of local city rides */}
              <p className="text-sm sm:text-base text-[#D5CEBE] leading-relaxed max-w-2xl">
                Prompt, comfortable point-to-point city rides and hourly packages across Kovai. Clean AC Sedans and spacious family SUVs with verified local chauffeurs, transparent digital meters, zero peak-hour surge pricing, and 24/7 doorstep dispatch.
              </p>

              {/* Yellow Call Now and green WhatsApp booking buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-sm text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-lg shadow-[#FFBF00]/25 active:scale-95"
                >
                  <Phone className="w-4 h-4 fill-[#171717]" />
                  <span>Call Local Desk: {DISPLAY_PHONE}</span>
                </a>

                <a
                  href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20local%20city%20cab%20in%20Coimbatore`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp Booking</span>
                </a>
              </div>

              {/* Compact row of benefits: Doorstep pickup, clean AC fleet, transparent fares, verified chauffeurs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-neutral-800 text-xs">
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Doorstep Pickup</span>
                  <span className="font-extrabold text-[#FFBF00] text-sm">10-15 Mins</span>
                </div>
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Clean AC Fleet</span>
                  <span className="font-extrabold text-[#FFBF00] text-sm">Sedan &amp; SUV</span>
                </div>
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Transparent Fares</span>
                  <span className="font-extrabold text-[#FFBF00] text-sm">Zero Surge</span>
                </div>
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#A0A09C] block text-[11px]">Chauffeurs</span>
                  <span className="font-extrabold text-white text-sm">100% Verified</span>
                </div>
              </div>

              {/* Large, attractive commercial taxi photograph below the benefits */}
              <div className="relative h-32 sm:h-36 lg:h-40 rounded-xl overflow-hidden border border-neutral-800 mt-2 shadow-sm">
                <img 
                  src={assetUrl('/images/fleet/local-taxi-hero.webp')}
                  alt="C Taxi premium commercial AC city taxi fleet in Coimbatore"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent flex items-center px-4 sm:px-5">
                  <div className="text-white space-y-0.5">
                    <span className="text-[10px] font-bold text-[#FFBF00] uppercase tracking-wider block">
                      Doorstep Kovai Dispatch Fleet
                    </span>
                    <p className="text-xs sm:text-sm font-bold">
                      Gandhipuram · RS Puram · Peelamedu · Saravanampatti · Singanallur
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Estimator Card (5 cols) - Styled as premium light card matching Outstation page */}
            <div className="lg:col-span-5">
              <div className="bg-white text-[#171717] border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#171717] font-heading uppercase tracking-wide">
                      Instant Local Fare Estimator
                    </h3>
                    <p className="text-xs text-[#777777]">Transparent approved city fare calculation</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-[#FFBF00] text-[#171717] font-extrabold text-xs shadow-xs">
                    Zero Surge
                  </span>
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
                            : 'bg-[#F5F2EA] border-[#E5E0D8] text-[#777777] hover:bg-white hover:text-[#171717]'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">{v.name.replace('Prime AC ', '').replace('Spacious ', '')}</div>
                        <div className={`text-[10px] ${selectedVehicleId === v.id ? 'text-[#FFBF00]' : 'text-[#777777]'}`}>{v.capacity}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pickup & Drop Locality Pickers */}
                <div className="space-y-2.5">
                  <div>
                    <label className="text-xs font-bold text-[#171717] flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" /> Pickup Locality:
                    </label>
                    <select
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                    >
                      {COIMBATORE_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#171717] flex items-center gap-1.5 mb-1">
                      <Navigation className="w-3.5 h-3.5 text-[#171717]" /> Destination Locality:
                    </label>
                    <select
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                    >
                      {COIMBATORE_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Distance Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#171717] mb-1">
                      <span>Approximate Trip Distance:</span>
                      <span className="font-mono text-[#171717] bg-[#F5F2EA] px-2 py-0.5 rounded border border-[#E5E0D8]">
                        {distanceKm} km
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={45}
                      step={1}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="w-full accent-[#FFBF00] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#777777]">
                      <span>Short Ride (3 km)</span>
                      <span>City Cross (20 km)</span>
                      <span>Outer Kovai (45 km)</span>
                    </div>
                  </div>
                </div>

                {/* Estimated Fare Display Box */}
                <div className="bg-[#171717] text-white rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-[#A0A09C] block">Estimated City Ride Fare:</span>
                      <div className="text-2xl font-black text-[#FFBF00] font-heading">
                        ₹{estimatedFare.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#A0A09C] block">Cab Type:</span>
                      <div className="text-xs font-bold text-white">{vehicle.name}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#A0A09C] border-t border-neutral-800 pt-1.5 flex items-center justify-between">
                    <span>✓ Clean AC cab &amp; fuel included</span>
                    <span className="text-[#FFBF00] font-semibold">Zero Surge Guarantee</span>
                  </div>
                </div>

                {/* Instant Action CTA */}
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full py-3 px-4 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <Car className="w-4 h-4" />
                  <span>Book This City Ride</span>
                </button>

                {/* Direct quick call prompt */}
                <div className="text-center pt-0.5">
                  <p className="text-[11px] text-[#777777]">
                    Need immediate pickup? Call <a href={`tel:${PHONE_NUMBER}`} className="font-bold text-[#171717] hover:underline">{DISPLAY_PHONE}</a> for 10-min dispatch
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hourly Rental Packages - Warm Ivory section below dark hero */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
                City Packages
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading mt-2.5">
                Hourly Rental Cabs with Dedicated Driver
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#777777] max-w-md">
              Need a car on standby for shopping, multiple client visits, or doctor checkups? Book flexible hourly packages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOURLY_PACKAGES.map((pkg, idx) => (
              <div 
                key={idx}
                className="bg-[#F5F2EA] border border-[#E5E0D8] hover:border-[#FFBF00] rounded-2xl p-5 flex flex-col justify-between transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#E5E0D8] text-[#171717]">
                      {pkg.hours} Hrs Package
                    </span>
                    <span className="text-xs font-mono text-[#777777]">{pkg.kms} Km Incl.</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#171717] font-heading group-hover:text-[#E5AC00] transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-[#777777] leading-relaxed">
                    {pkg.note}
                  </p>

                  <div className="bg-white rounded-xl p-3 border border-[#E5E0D8] space-y-1 text-xs">
                    <div className="flex justify-between text-[#777777]">
                      <span>Sedan:</span>
                      <span className="font-bold text-[#171717]">₹{pkg.sedanPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[#777777]">
                      <span>SUV Ertiga:</span>
                      <span className="font-bold text-[#171717]">₹{pkg.suvPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => handleBookHourlyPackage(pkg.title, pkg.hours, pkg.kms, pkg.sedanPrice)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Cab Categories & Passenger Capacity */}
      <section className="py-12 lg:py-16 bg-[#F5F2EA] border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              Clean Fleet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Cab Categories &amp; Passenger Capacity
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Choose the perfect vehicle for your city errands, family outings, or executive visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VEHICLE_FLEET.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <img 
                      src={FLEET_PHOTOS[v.id] || FLEET_PHOTOS['sedan']} 
                      alt={v.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#FFBF00] text-[#171717] shadow-xs">
                      {v.category}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 text-base font-extrabold text-white font-heading drop-shadow">
                      {v.name}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#777777]">
                        Models: <strong className="text-[#171717]">{v.models}</strong>
                      </span>
                      <span className="text-xs font-semibold text-[#171717] flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#FFBF00]" /> {v.capacity}
                      </span>
                    </div>

                    <div className="border-t border-b border-[#E5E0D8] py-2.5 space-y-1.5 text-xs text-[#777777]">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-[#777777]" />
                        <span>Luggage: {v.luggage}</span>
                      </div>
                      {v.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FFBF00]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVehicleId(v.id as any);
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-3 rounded-xl border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Select for City Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Local Coverage Areas in Coimbatore */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              All Over Kovai
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Key Local Pickup Hubs Across Coimbatore
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Our drivers are stationed throughout the city for instant 10-15 minute arrivals.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {COIMBATORE_LOCALITIES.map((area, idx) => (
              <div 
                key={idx}
                className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#171717] hover:border-[#FFBF00] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#FFBF00] shrink-0" />
                <span className="font-semibold line-clamp-1">{area}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#171717] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-heading text-white">Need a ride right now anywhere in Coimbatore?</h3>
              <p className="text-xs text-[#A0A09C]">Call our 24/7 central dispatch desk directly for immediate cab dispatch.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="px-5 py-3 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4 fill-[#171717]" />
                <span>Call {DISPLAY_PHONE}</span>
              </a>
              <a
                href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20local%20cab%20now`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Local Ride FAQs */}
      <section className="py-12 lg:py-16 bg-[#F5F2EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Frequently Asked Questions About Local Cabs
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Clear answers to help you book with confidence.
            </p>
          </div>

          <div className="space-y-3">
            {localFaqs.map((faq, idx) => (
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
