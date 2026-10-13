import React, { useState, useId } from 'react';
import { 
  Car, 
  MapPin, 
  Navigation, 
  Clock, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Check, 
  RotateCcw,
  Plane,
  Sparkles,
  Mountain,
  Compass
} from 'lucide-react';
import { 
  VEHICLE_FLEET, 
  COIMBATORE_LOCALITIES, 
  OUTSTATION_DESTINATIONS, 
  HOURLY_PACKAGES, 
  calculateHourlyRate,
  PHONE_NUMBER, 
  DISPLAY_PHONE, 
  WHATSAPP_URL 
} from '../data/taxiData';

interface FareCalculatorProps {
  initialService?: string;
  onOpenBookingModal: (bookingDetails: any) => void;
}

export const FareCalculator: React.FC<FareCalculatorProps> = ({ 
  initialService = 'local',
  onOpenBookingModal 
}) => {
  const pickupListId = useId();
  const dropListId = useId();

  // Booking tabs: 1. local -> 2. outstation -> 3. hourly -> 4. airport
  const [activeTab, setActiveTab] = useState<'local' | 'outstation' | 'hourly' | 'airport'>(
    initialService === 'outstation' ? 'outstation' :
    initialService === 'hourly' ? 'hourly' :
    initialService === 'airport' ? 'airport' : 'local'
  );

  React.useEffect(() => {
    if (initialService === 'outstation') setActiveTab('outstation');
    else if (initialService === 'hourly') setActiveTab('hourly');
    else if (initialService === 'airport') setActiveTab('airport');
    else if (initialService === 'local') setActiveTab('local');
  }, [initialService]);

  // Vehicle Selection (No hatchback - only sedan, suv_ertiga, premium_suv)
  const [selectedVehicleId, setSelectedVehicleId] = useState<'sedan' | 'suv_ertiga' | 'premium_suv'>('sedan');
  const vehicle = VEHICLE_FLEET.find(v => v.id === selectedVehicleId) || VEHICLE_FLEET[0];

  // Local Ride States
  const [localPickup, setLocalPickup] = useState(COIMBATORE_LOCALITIES[0]);
  const [localDrop, setLocalDrop] = useState(COIMBATORE_LOCALITIES[2]);
  const [localKm, setLocalKm] = useState<number>(10);

  // Outstation States
  const [outstationDestination, setOutstationDestination] = useState(OUTSTATION_DESTINATIONS[0].name);
  const [tripDays, setTripDays] = useState<number>(1);

  // Hourly Rental States
  const [rentalHours, setRentalHours] = useState<number>(3);

  // Airport States
  const [airportTripType, setAirportTripType] = useState<'to_airport' | 'from_airport'>('to_airport');
  const [airportCityLocality, setAirportCityLocality] = useState(COIMBATORE_LOCALITIES[0]);

  // Date and Time
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('10:00');

  // Active destination details
  const activeDest = OUTSTATION_DESTINATIONS.find(d => d.name === outstationDestination) || OUTSTATION_DESTINATIONS[0];

  // Calculation Logic strictly following approved business tariffs:
  let estimatedPrice = 0;
  let breakdownNote = '';
  let distanceDisplay = 0;

  if (activeTab === 'local') {
    distanceDisplay = localKm;
    const baseFare = vehicle.localBaseFare;
    const kmCost = localKm * vehicle.localPerKm;
    estimatedPrice = vehicle.id === 'premium_suv' ? 0 : baseFare + kmCost;
    breakdownNote = `Standard City Fare for ~${localKm} km (Chilled AC & Fuel Included · Zero Peak Surge)`;
  } 
  else if (activeTab === 'outstation') {
    const oneWayDistance = activeDest.distance;
    const roundTripKm = oneWayDistance * 2;
    const routeCoverageKm = activeDest.name.toLowerCase().includes('ooty') && tripDays >= 2 ? 250 : roundTripKm;
    const minBillableKm = Math.max(routeCoverageKm, 100 * tripDays);
    distanceDisplay = minBillableKm;
    estimatedPrice = vehicle.id === 'premium_suv' ? 0 : Math.round((2000 * tripDays) + (minBillableKm * 12));
    breakdownNote = `${tripDays} day${tripDays > 1 ? 's' : ''} round-trip estimate; minimum 100 km/day.`;
  } 
  else if (activeTab === 'hourly') {
    estimatedPrice = calculateHourlyRate(rentalHours, vehicle.id);
    const estIncludedKm = rentalHours * 10;
    distanceDisplay = estIncludedKm;
    breakdownNote = `${rentalHours} hour package with 10 km/hour included; extra distance charged by vehicle category.`;
  } 
  else if (activeTab === 'airport') {
    const estAirportDistance = airportCityLocality.includes('Peelamedu') ? 5 :
      airportCityLocality.includes('Gandhipuram') ? 11 :
      airportCityLocality.includes('RS Puram') ? 14 :
      airportCityLocality.includes('Saravanampatti') ? 10 :
      airportCityLocality.includes('Singanallur') ? 8 : 12;

    distanceDisplay = estAirportDistance;
    const baseFare = vehicle.localBaseFare;
    const kmCost = estAirportDistance * vehicle.localPerKm;
    estimatedPrice = vehicle.id === 'premium_suv' ? 0 : baseFare + kmCost;
    breakdownNote = `${airportTripType === 'to_airport' ? 'City Drop to CJB Airport' : 'CJB Airport Pickup to City'} (~${estAirportDistance} km) · Zero Flight Delay Fee`;
  }

  const handleOpenModal = () => {
    let pickupText = localPickup;
    let dropText = localDrop;

    if (activeTab === 'outstation') {
      pickupText = 'Coimbatore City (Doorstep)';
      dropText = activeDest.name;
    } else if (activeTab === 'hourly') {
      pickupText = 'Coimbatore City (Doorstep Pickup)';
      dropText = `${rentalHours} Hours Rental Package`;
    } else if (activeTab === 'airport') {
      if (airportTripType === 'to_airport') {
        pickupText = airportCityLocality;
        dropText = 'Coimbatore Int\'l Airport (CJB Terminal)';
      } else {
        pickupText = 'Coimbatore Int\'l Airport (CJB Terminal)';
        dropText = airportCityLocality;
      }
    }

    onOpenBookingModal({
      serviceType: activeTab,
      pickup: pickupText,
      drop: dropText,
      vehicle: vehicle.name,
      estimatedPrice: vehicle.id === 'premium_suv' ? null : estimatedPrice,
      date: pickupDate,
      time: pickupTime,
      breakdownNote
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello C Taxi,\nI would like to book a cab in Coimbatore with the following details:\n` +
    `• Service: ${activeTab.toUpperCase()}\n` +
    `• Vehicle: ${vehicle.name}\n` +
    `• Pickup Date/Time: ${pickupDate} at ${pickupTime}\n` +
    `• Route: ${activeTab === 'outstation' ? `Coimbatore to ${activeDest.name}` : activeTab === 'airport' ? `${airportCityLocality} <-> CJB Airport` : `${localPickup} to ${localDrop}`}\n` +
    `• Estimated Fare: ${vehicle.id === 'premium_suv' ? 'Quote requested' : '₹' + estimatedPrice.toLocaleString('en-IN')}\n\nPlease confirm availability and dispatch.`
  );

  return (
    <section id="fare-calculator" className="py-12 lg:py-20 bg-[#171717] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Top Header of the Calculator */}
          <div className="p-4 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBF00] animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight">
                  Instant Fare Calculator &amp; Direct Booking
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#A0A09C] mt-1">
                Local from ₹100 + ₹30/km · Round trip ₹2,000/day + ₹12/km · One-way Sedan from ₹15/km
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#A0A09C] hidden lg:inline">24/7 Central Desk:</span>
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFBF00] text-[#171717] font-extrabold text-xs tracking-wide shadow-md active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 fill-[#171717]" />
                {DISPLAY_PHONE}
              </a>
            </div>
          </div>

          {/* 4 Ordered Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 p-2 bg-neutral-950/70 border-b border-neutral-800 gap-1.5">
            
            {/* Tab 1: Local Rides */}
            <button
              type="button"
              onClick={() => setActiveTab('local')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'local'
                  ? 'bg-[#FFBF00] text-[#171717] shadow-sm'
                  : 'text-[#D5CEBE] hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span className="truncate">Local City Rides</span>
            </button>

            {/* Tab 2: Outstation Trips */}
            <button
              type="button"
              onClick={() => setActiveTab('outstation')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'outstation'
                  ? 'bg-[#FFBF00] text-[#171717] shadow-sm'
                  : 'text-[#D5CEBE] hover:text-white hover:bg-neutral-800'
              }`}
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span className="truncate">Outstation Trips</span>
            </button>

            {/* Tab 3: Hourly Rentals */}
            <button
              type="button"
              onClick={() => setActiveTab('hourly')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'hourly'
                  ? 'bg-[#FFBF00] text-[#171717] shadow-sm'
                  : 'text-[#D5CEBE] hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span className="truncate">Hourly Rentals</span>
            </button>

            {/* Tab 4: Airport Transfer */}
            <button
              type="button"
              onClick={() => setActiveTab('airport')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'airport'
                  ? 'bg-[#FFBF00] text-[#171717] shadow-sm'
                  : 'text-[#D5CEBE] hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Plane className="w-4 h-4 shrink-0" />
              <span className="truncate">Airport Transfers</span>
            </button>
          </div>

          {/* Form Fields & Live Price */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Context Pill/Note */}
                {activeTab === 'local' && (
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-[#D5CEBE]">
                    <span className="font-bold text-[#FFBF00]">Coimbatore City Rides: </span>
                    Standard digital meter calculation with zero peak-hour surge pricing. Clean AC cabs dispatched in 10-15 minutes.
                  </div>
                )}

                {activeTab === 'outstation' && (
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-[#D5CEBE]">
                    <span className="font-bold text-[#FFBF00]">Outstation Tariff: </span>
                    Round trip: ₹2,000/day + ₹12/km, minimum 100 km/day (Ooty 2-day example: 250 km coverage). One-way: Sedan ₹15/km + ₹500 driver allowance; SUV ₹22/km + ₹600 driver allowance, minimum 130 km. Premium vehicles: contact for quote.
                  </div>
                )}

                {activeTab === 'hourly' && (
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-[#D5CEBE]">
                    <span className="font-bold text-[#FFBF00]">Hourly Rental Package: </span>
                    Sedan ₹350/hour or SUV ₹500/hour. Includes 10 km per hour; extra distance ₹20/km for Sedan and ₹25/km for SUV. Premium vehicles are quote-only.
                  </div>
                )}

                {activeTab === 'airport' && (
                  <div className="flex items-center gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800 w-fit">
                    <button
                      type="button"
                      onClick={() => setAirportTripType('to_airport')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        airportTripType === 'to_airport'
                          ? 'bg-[#FFBF00] text-[#171717] shadow-xs'
                          : 'text-[#D5CEBE] hover:text-white'
                      }`}
                    >
                      City → CJB Airport Drop
                    </button>
                    <button
                      type="button"
                      onClick={() => setAirportTripType('from_airport')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        airportTripType === 'from_airport'
                          ? 'bg-[#FFBF00] text-[#171717] shadow-xs'
                          : 'text-[#D5CEBE] hover:text-white'
                      }`}
                    >
                      CJB Airport Pickup → City
                    </button>
                  </div>
                )}

                {/* Dynamic Inputs depending on tab */}
                {activeTab === 'local' && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="local-pickup-select" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" />
                          Pickup Area in Coimbatore
                        </label>
                        <select
                          id="local-pickup-select"
                          value={localPickup}
                          onChange={(e) => setLocalPickup(e.target.value)}
                          className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                        >
                          {COIMBATORE_LOCALITIES.map(l => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="local-drop-select" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-[#FFBF00]" />
                          Drop Area in Coimbatore
                        </label>
                        <select
                          id="local-drop-select"
                          value={localDrop}
                          onChange={(e) => setLocalDrop(e.target.value)}
                          className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                        >
                          {COIMBATORE_LOCALITIES.map(l => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                        <span>Approximate Trip Distance:</span>
                        <span className="font-mono text-[#FFBF00] bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                          {localKm} km
                        </span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={40}
                        step={1}
                        value={localKm}
                        onChange={(e) => setLocalKm(Number(e.target.value))}
                        className="w-full accent-[#FFBF00] cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'outstation' && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="outstation-dest-select" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" />
                          Outstation Destination
                        </label>
                        <select
                          id="outstation-dest-select"
                          value={outstationDestination}
                          onChange={(e) => setOutstationDestination(e.target.value)}
                          className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                        >
                          {OUTSTATION_DESTINATIONS.map(d => (
                            <option key={d.name} value={d.name}>
                              {d.name} ({d.distance} km one-way) {d.isHill ? '⛰️ Hill' : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="trip-days-input" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5 text-[#FFBF00]" />
                          Trip Days (Min 100 km/day)
                        </label>
                        <select
                          id="trip-days-input"
                          value={tripDays}
                          onChange={(e) => setTripDays(Number(e.target.value))}
                          className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                        >
                          <option value={1}>1 Day Trip (Same Day Return)</option>
                          <option value={2}>2 Days (Weekend / Overnight)</option>
                          <option value={3}>3 Days Tour</option>
                          <option value={4}>4 Days Tour</option>
                          <option value={5}>5+ Days Extended Vacation</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'hourly' && (
                  <div>
                    <label htmlFor="rental-hours-select" className="block text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FFBF00]" />
                      Select Rental Duration
                    </label>
                    <select
                      id="rental-hours-select"
                      value={rentalHours}
                      onChange={(e) => setRentalHours(Number(e.target.value))}
                      className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                    >
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={6}>6 Hours</option>
                      <option value={8}>8 Hours</option>
                      <option value={12}>12 Hours</option>
                    </select>
                  </div>
                )}

                {activeTab === 'airport' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="airport-loc-select" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" />
                        {airportTripType === 'to_airport' ? 'Pickup Locality in Coimbatore' : 'Drop Locality in Coimbatore'}
                      </label>
                      <select
                        id="airport-loc-select"
                        value={airportCityLocality}
                        onChange={(e) => setAirportCityLocality(e.target.value)}
                        className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                      >
                        {COIMBATORE_LOCALITIES.map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="airport-terminal-input" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#FFBF00]" />
                        Airport Location
                      </label>
                      <input
                        id="airport-terminal-input"
                        type="text"
                        readOnly
                        value="Coimbatore International Airport (CJB Terminal)"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#D5CEBE] font-medium cursor-not-allowed"
                      />
                    </div>
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="pickup-date-control" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#A0A09C]" />
                      Pickup Date
                    </label>
                    <input
                      id="pickup-date-control"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                    >
                    </input>
                  </div>

                  <div>
                    <label htmlFor="pickup-time-control" className="block text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#A0A09C]" />
                      Pickup Time
                    </label>
                    <input
                      id="pickup-time-control"
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-white text-[#171717] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FFBF00]"
                    >
                    </input>
                  </div>
                </div>

                {/* Vehicle Class Selector */}
                <div>
                  <label className="block text-xs font-bold text-white mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-[#FFBF00]" />
                      Select Cab Category
                    </span>
                    <span className="text-[11px] text-[#A0A09C]">
                      {activeTab === 'local' ? 'Standard AC City Fleet' : 'Approved Outstation Rates'}
                    </span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {VEHICLE_FLEET.map((v) => {
                      const isSelected = v.id === selectedVehicleId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVehicleId(v.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#171717] border-[#FFBF00] ring-1 ring-[#FFBF00] text-white shadow-sm'
                              : 'bg-neutral-800/80 border-neutral-700 text-[#D5CEBE] hover:bg-neutral-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold text-white truncate">
                              {v.name.replace('Prime AC ', '').replace('Spacious ', '')}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#FFBF00]" />}
                          </div>
                          <p className="text-[10px] text-[#A0A09C] line-clamp-1">{v.models}</p>
                          
                          <div className="mt-1 text-xs font-extrabold text-[#FFBF00] tabular-nums">
                            {activeTab === 'local' ? (
                              <span>Standard AC Fare</span>
                            ) : (
                              <span>{v.id === 'premium_suv' ? 'Contact for quote' : activeTab === 'outstation' ? (activeDest && 'One-way / round-trip tariff') : 'Standard fare'}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Price Display Card (5 cols) in Pure White for Maximum Contrast */}
              <div className="lg:col-span-5 bg-white text-[#171717] p-5 sm:p-6 rounded-2xl border border-[#E5E0D8] space-y-4 shadow-xl">
                
                <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#171717]">
                    Transparent Fare Quote
                  </span>
                  <span className="text-[11px] font-extrabold text-[#171717] bg-[#FFBF00] px-2.5 py-0.5 rounded shadow-xs">
                    Approved Tariff
                  </span>
                </div>

                {/* Big Price */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#171717] font-heading tabular-nums">
                      {vehicle.id === 'premium_suv' ? 'Contact for quote' : '₹' + estimatedPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#777777] font-medium">
                      (estimated)
                    </span>
                  </div>
                  <p className="text-xs text-[#777777] mt-1.5 font-medium leading-relaxed">
                    {vehicle.id === 'premium_suv' ? 'Contact us for a vehicle-specific quote.' : activeTab === 'outstation' ? (tripDays + ' day' + (tripDays > 1 ? 's' : '') + ' · ' + distanceDisplay + ' km minimum-billed distance') : activeTab === 'hourly' ? 'Includes 10 km per hour. Extra distance: ' + (vehicle.id === 'suv_ertiga' ? '₹25/km' : '₹20/km') + '.' : activeTab === 'local' ? 'Estimated final fare for your selected trip.' : 'Estimated final fare for your selected airport route.'}
                  </p>
                </div>

                {/* Vehicle Specs */}
                <div className="space-y-1.5 py-2.5 border-y border-[#E5E0D8] text-xs text-[#777777]">
                  <div className="flex justify-between">
                    <span>Cab Type:</span>
                    <span className="font-bold text-[#171717]">{vehicle.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seating &amp; Luggage:</span>
                    <span className="text-[#171717]">{vehicle.capacity} · {vehicle.luggage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fare display:</span>
                    <span className="text-[#171717] tabular-nums font-semibold">Final estimate only</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tolls / Parking:</span>
                    <span className="text-[#777777]">At actuals as per slip</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  {/* WhatsApp Button */}
                  <a
                    href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-md active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-white/20" />
                    <span>Book Instantly on WhatsApp</span>
                  </a>

                  {/* Direct Call Button */}
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-extrabold text-sm text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-md active:scale-95"
                  >
                    <Phone className="w-4 h-4 fill-[#171717]" />
                    <span>Call Dispatch: {DISPLAY_PHONE}</span>
                  </a>

                  {/* Fast Online Booking Form */}
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-[#171717] bg-[#F5F2EA] hover:bg-[#EAE5D8] border border-[#E5E0D8] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
                    <span>Enter Booking Details Online</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-[11px] text-[#777777] pt-1">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Clean AC
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> 15-Min Arrival
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Zero Surge
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
