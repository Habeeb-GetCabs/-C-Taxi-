import React, { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Car, 
  Users, 
  Briefcase, 
  ChevronDown,
  ArrowRight,
  Luggage,
  Sparkles
} from 'lucide-react';
import { 
  VEHICLE_FLEET, 
  COIMBATORE_LOCALITIES, 
  PHONE_NUMBER, 
  DISPLAY_PHONE, 
  WHATSAPP_URL 
} from '../data/taxiData';

interface AirportTaxiPageProps {
  onOpenBookingModal: (details: any) => void;
  onNavigate: (page: string) => void;
}

export const AirportTaxiPage: React.FC<AirportTaxiPageProps> = ({ onOpenBookingModal, onNavigate }) => {
  const [tripDirection, setTripDirection] = useState<'to_airport' | 'from_airport'>('to_airport');
  const [cityLocality, setCityLocality] = useState(COIMBATORE_LOCALITIES[0]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<'sedan' | 'suv_ertiga' | 'premium_suv'>('sedan');
  const [flightNumber, setFlightNumber] = useState('');
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('06:00');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const vehicle = VEHICLE_FLEET.find(v => v.id === selectedVehicleId) || VEHICLE_FLEET[0];

  // Airport transfer distances from CJB Airport (Peelamedu):
  const estDistance = cityLocality.includes('Peelamedu') ? 5 :
    cityLocality.includes('Gandhipuram') ? 11 :
    cityLocality.includes('RS Puram') ? 14 :
    cityLocality.includes('Saravanampatti') ? 10 :
    cityLocality.includes('Singanallur') ? 8 :
    cityLocality.includes('Railway') ? 12 : 13;

  // Formula: localBaseFare + (km * localPerKm)
  const estimatedFare = vehicle.localBaseFare + (estDistance * vehicle.localPerKm);

  const handleBookAirportCab = () => {
    onOpenBookingModal({
      serviceType: 'airport',
      pickup: tripDirection === 'to_airport' ? cityLocality : 'Coimbatore Int\'l Airport (CJB)',
      drop: tripDirection === 'to_airport' ? 'Coimbatore Int\'l Airport (CJB Terminal)' : cityLocality,
      vehicle: vehicle.name,
      estimatedPrice: estimatedFare,
      date: pickupDate,
      time: pickupTime,
      breakdownNote: `${tripDirection === 'to_airport' ? 'Drop to CJB Airport' : 'Pickup from CJB Airport'} · ${flightNumber ? `Flight: ${flightNumber} · ` : ''}Large trunk for luggage · Zero flight delay fees`
    });
  };

  const airportFaqs = [
    {
      q: "Where will the driver meet me at Coimbatore Airport (CJB)?",
      a: "For arrivals at Coimbatore International Airport (CJB), our driver will wait right outside the arrival terminal gate with a digital name-board displaying your name and flight details."
    },
    {
      q: "What happens if my flight is delayed?",
      a: "We track domestic and international flights arriving at CJB in real-time. If your Indigo, Air India, or international flight is delayed, your pickup schedule automatically adjusts with zero waiting charge."
    },
    {
      q: "Can I book a 4:00 AM early morning cab for a flight departure?",
      a: "Yes! 24/7 flight departure transfers are our specialty. Our driver is assigned 45 minutes prior and will arrive at your doorstep 10 to 15 minutes before your scheduled pickup time."
    },
    {
      q: "Is there enough boot space for international luggage?",
      a: "Yes. Our Prime Sedans comfortably carry 3 large suitcases. For larger families or extra luggage (4 to 5 large suitcases), we recommend our Spacious 6-seater SUV or Toyota Innova Crysta."
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
          <span className="text-[#171717] font-bold">Coimbatore Airport Taxi (CJB)</span>
        </div>
      </div>

      {/* Cinematic Airport Hero Section */}
      <section className="relative bg-[#171717] text-white border-b border-neutral-800 py-8 lg:py-14 overflow-hidden">
        
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFBF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFBF00]/15 text-[#FFBF00] text-xs font-bold border border-[#FFBF00]/30">
                <Plane className="w-3.5 h-3.5 text-[#FFBF00]" />
                <span>24/7 CJB Terminal Transfers · Zero Delay Fees</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading">
                Coimbatore Airport Taxi (CJB) — Reliable Pickups &amp; Drops
              </h1>

              <p className="text-sm sm:text-base text-[#D5CEBE] leading-relaxed max-w-2xl">
                Catch your flight on time without stress. C Taxi provides punctual 24/7 transfers to and from Coimbatore International Airport (Peelamedu). Chauffeur greeting, luggage assistance, clean AC cabins, and guaranteed availability.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-sm text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-lg shadow-[#FFBF00]/25 active:scale-95"
                >
                  <Phone className="w-4 h-4 fill-[#171717]" />
                  <span>Call Airport Desk: {DISPLAY_PHONE}</span>
                </a>

                <a
                  href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20an%20airport%20cab%20in%20Coimbatore`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Book on WhatsApp</span>
                </a>
              </div>

              {/* Airport Trust Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 text-xs text-[#E5E0D8]">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FFBF00] shrink-0" />
                  <span>Flight Tracking</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FFBF00] shrink-0" />
                  <span>Name Board Meet</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FFBF00] shrink-0" />
                  <span>Large Boot Space</span>
                </div>
              </div>

              {/* Airport Terminal Visual Banner */}
              <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-neutral-800 mt-2 shadow-sm">
                <img 
                  src="/images/destinations/cjb-airport-terminal.jpg"
                  alt="Coimbatore International Airport terminal transfers and pickups"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-4">
                  <div className="text-white space-y-0.5">
                    <span className="text-[10px] font-bold text-[#FFBF00] uppercase tracking-wider block">
                      CJB Terminal Meet &amp; Greet
                    </span>
                    <p className="text-xs sm:text-sm font-bold">
                      Zero flight delay surcharge · 24/7 early morning pickups
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Booking & Fare Box (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white text-[#171717] border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#171717] font-heading uppercase tracking-wide">
                      Airport Ride Estimator
                    </h3>
                    <p className="text-xs text-[#777777]">Guaranteed on-time terminal service</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-[#FFBF00] text-[#171717] font-extrabold text-xs shadow-xs">
                    CJB Terminal
                  </span>
                </div>

                {/* Direction Toggle */}
                <div className="grid grid-cols-2 gap-2 bg-[#F5F2EA] p-1 rounded-xl border border-[#E5E0D8]">
                  <button
                    type="button"
                    onClick={() => setTripDirection('to_airport')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      tripDirection === 'to_airport'
                        ? 'bg-[#171717] text-white shadow-sm'
                        : 'text-[#777777] hover:text-[#171717]'
                    }`}
                  >
                    <span>City → CJB Airport</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripDirection('from_airport')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      tripDirection === 'from_airport'
                        ? 'bg-[#171717] text-white shadow-sm'
                        : 'text-[#777777] hover:text-[#171717]'
                    }`}
                  >
                    <span>CJB Airport → City</span>
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
                        <div className={`text-[10px] ${selectedVehicleId === v.id ? 'text-[#FFBF00]' : 'text-[#777777]'}`}>{v.luggage}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* City Locality Picker */}
                <div className="space-y-2.5">
                  <div>
                    <label className="text-xs font-bold text-[#171717] flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" />
                      {tripDirection === 'to_airport' ? 'Pickup Locality in Coimbatore:' : 'Drop Locality in Coimbatore:'}
                    </label>
                    <select
                      value={cityLocality}
                      onChange={(e) => setCityLocality(e.target.value)}
                      className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                    >
                      {COIMBATORE_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Flight Number & Pickup Time */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold text-[#171717] block mb-1">Flight Number (Optional):</label>
                      <input
                        type="text"
                        placeholder="e.g. 6E-243"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#171717] block mb-1">Pickup Time:</label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                      />
                    </div>
                  </div>
                </div>

                {/* Fare Summary Box */}
                <div className="bg-[#171717] text-white rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-[#A0A09C] block">Estimated Airport Fare:</span>
                      <div className="text-2xl font-black text-[#FFBF00] font-heading">
                        ₹{estimatedFare.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#A0A09C] block">Est Distance:</span>
                      <div className="text-xs font-bold text-white font-mono">~{estDistance} km</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#A0A09C] border-t border-neutral-800 pt-1.5">
                    ✓ Clean AC cab &amp; luggage boot · Zero flight delay fees · No surge
                  </div>
                </div>

                {/* Instant Reserve Button */}
                <button
                  type="button"
                  onClick={handleBookAirportCab}
                  className="w-full py-3 px-4 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <Plane className="w-4 h-4" />
                  <span>Reserve Airport Cab</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transparent Fixed Locality Rate Guide - Warm Ivory Section */}
      <section className="py-12 lg:py-16 bg-[#F5F2EA] border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              Fixed Estimates
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Popular City to Airport Fare Estimates
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Predictable pricing from all major neighborhoods to Coimbatore International Airport.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { area: "Peelamedu / PSG Tech", distance: "5 km", sedan: "₹240", suv: "₹275", crysta: "₹375" },
              { area: "Gandhipuram (Cross Cut Road)", distance: "11 km", sedan: "₹408", suv: "₹485", crysta: "₹645" },
              { area: "RS Puram (DB Road)", distance: "14 km", sedan: "₹492", suv: "₹590", crysta: "₹780" },
              { area: "Saravanampatti (IT Corridor)", distance: "10 km", sedan: "₹380", suv: "₹450", crysta: "₹600" },
              { area: "Singanallur Bus Stand", distance: "8 km", sedan: "₹324", suv: "₹380", crysta: "₹510" },
              { area: "Coimbatore Junction Railway Station", distance: "12 km", sedan: "₹436", suv: "₹520", crysta: "₹690" },
              { area: "Thudiyalur / Mettupalayam Rd", distance: "16 km", sedan: "₹548", suv: "₹660", crysta: "₹870" },
              { area: "Vadavalli / Marudhamalai Rd", distance: "19 km", sedan: "₹632", suv: "₹765", crysta: "₹1,005" },
              { area: "Tiruppur City to CJB Airport", distance: "45 km", sedan: "₹1,250", suv: "₹1,600", crysta: "₹2,100" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E5E0D8] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#171717]">{item.area}</h3>
                  <span className="text-xs font-mono text-[#777777] bg-[#F5F2EA] px-2 py-0.5 rounded border border-[#E5E0D8]">
                    {item.distance}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5E0D8] text-center text-xs">
                  <div>
                    <span className="text-[10px] text-[#777777] block">Sedan</span>
                    <span className="font-bold text-[#171717]">{item.sedan}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777777] block">SUV (6-Seat)</span>
                    <span className="font-bold text-[#171717]">{item.suv}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777777] block">Innova</span>
                    <span className="font-bold text-[#171717]">{item.crysta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CJB Arrival & Pickup Experience Showcase */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 items-center mt-6">
            <div className="md:col-span-5 h-48 sm:h-56 relative overflow-hidden">
              <img 
                src="/images/destinations/cjb-airport-road.jpg" 
                alt="Coimbatore International Airport terminal road and taxi pickup lane"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-[11px] font-bold text-[#FFBF00] bg-[#171717]/90 px-2.5 py-1 rounded-md border border-[#FFBF00]/30">
                  Dedicated CJB Taxi Pickup Bay
                </span>
              </div>
            </div>
            <div className="md:col-span-7 p-5 sm:p-6 space-y-2.5">
              <div className="text-xs font-bold text-[#FFBF00] uppercase tracking-wider bg-[#171717] inline-block px-2.5 py-1 rounded-md">
                Punctual Chauffeur Guarantee
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#171717] font-heading">
                Arrivals Gate Meet-and-Greet with Nameboard
              </h3>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                When arriving at Coimbatore International Airport (Peelamedu), your assigned C Taxi chauffeur will be stationed at the arrival terminal gate with your name displayed. Zero wait times, prompt luggage handling, and direct transit across Coimbatore or to outstation hill stations.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Airport FAQs - Pure White Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading">
              Airport Taxi Transfer FAQs
            </h2>
            <p className="text-xs sm:text-sm text-[#777777]">
              Helpful details for your flight transit at CJB.
            </p>
          </div>

          <div className="space-y-3">
            {airportFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs"
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
