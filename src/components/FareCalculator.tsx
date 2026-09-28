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

  // Calculation Logic strictly following provided instructions:
  let estimatedPrice = 0;
  let breakdownNote = '';
  let distanceDisplay = 0;

  if (activeTab === 'local') {
    // Local rides formula:
    // Sedan: Base 100 + (km * 28)
    // SUV: Base 100 + (km * 35)
    // Premium SUV: Base 150 + (km * 45)
    distanceDisplay = localKm;
    const baseFare = vehicle.localBaseFare;
    const kmCost = localKm * vehicle.localPerKm;
    estimatedPrice = baseFare + kmCost;
    breakdownNote = `Standard City Fare for ~${localKm} km (Chilled AC & Fuel Included · Zero Peak Surge)`;
  } 
  else if (activeTab === 'outstation') {
    // Outstation formula:
    // Sedan: 15 Rs/km, SUV: 20 Rs/km, Premium SUV: 23 Rs/km
    // Min 250 km coverage per day, driver batta 500 per day
    // Hill charges: if hill station, SUV +400, Premium SUV +600
    // Ooty starting price: 3000
    const oneWayDistance = activeDest.distance;
    const roundTripKm = oneWayDistance * 2;
    const minBillableKm = Math.max(roundTripKm, 250 * tripDays);
    distanceDisplay = minBillableKm;

    const kmCost = minBillableKm * vehicle.ratePerKm;
    const driverBatta = 500 * tripDays;
    let hillFee = 0;
    if (activeDest.isHill) {
      if (vehicle.id === 'suv_ertiga') hillFee = 400;
      else if (vehicle.id === 'premium_suv') hillFee = 600;
    }

    let calculated = kmCost + driverBatta + hillFee;

    // Strict minimum starting price for Ooty is 3000
    if (activeDest.name.toLowerCase().includes('ooty') && calculated < 3000) {
      calculated = 3000;
    }

    estimatedPrice = Math.round(calculated);
    breakdownNote = `${minBillableKm} km @ ₹${vehicle.ratePerKm}/km + ₹${driverBatta} Driver Batta (${tripDays} day${tripDays > 1 ? 's' : ''})${hillFee > 0 ? ` + ₹${hillFee} Hill Safety Charge` : ''}`;
  } 
  else if (activeTab === 'hourly') {
    // Hourly formula:
    // 375 per hour for first 3 hours, after that 350 per hour basis
    estimatedPrice = calculateHourlyRate(rentalHours, vehicle.id);
    const estIncludedKm = rentalHours * 10;
    distanceDisplay = estIncludedKm;
    breakdownNote = `${rentalHours} Hours Package (First 3 hrs @ ₹375/hr, extra @ ₹350/hr for Sedan + vehicle rate) with fuel & driver`;
  } 
  else if (activeTab === 'airport') {
    // Airport transfer: based on distance to CJB airport + base flag fall
    const estAirportDistance = airportCityLocality.includes('Peelamedu') ? 5 :
      airportCityLocality.includes('Gandhipuram') ? 11 :
      airportCityLocality.includes('RS Puram') ? 14 :
      airportCityLocality.includes('Saravanampatti') ? 10 :
      airportCityLocality.includes('Singanallur') ? 8 : 12;

    distanceDisplay = estAirportDistance;
    const baseFare = vehicle.localBaseFare;
    const kmCost = estAirportDistance * vehicle.localPerKm;
    const total = baseFare + kmCost;
    // Set realistic floor for airport service
    const minAirport = vehicle.id === 'sedan' ? 440 : vehicle.id === 'suv_ertiga' ? 650 : 850;
    estimatedPrice = Math.max(total, minAirport);
    breakdownNote = `Airport route (~${estAirportDistance} km) based on ₹${baseFare} base + ₹${vehicle.localPerKm}/km`;
  }

  // Pre-fill WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hello C Taxi Coimbatore,\nI would like to book a cab:\n` +
    `• Service: ${activeTab === 'local' ? 'Local City Ride' : activeTab === 'outstation' ? 'Outstation Trip' : activeTab === 'hourly' ? 'Hourly Rental' : 'Airport Transfer'}\n` +
    `• Pickup: ${activeTab === 'airport' && airportTripType === 'from_airport' ? 'CJB Airport Terminal' : (activeTab === 'airport' ? airportCityLocality : (activeTab === 'local' ? localPickup : 'Coimbatore'))}\n` +
    `• Drop: ${activeTab === 'airport' && airportTripType === 'from_airport' ? airportCityLocality : (activeTab === 'airport' ? 'CJB Airport Terminal' : (activeTab === 'hourly' ? `${rentalHours} Hours Rental` : (activeTab === 'local' ? localDrop : activeDest.name)))}\n` +
    `• Vehicle: ${vehicle.name} (${vehicle.models})\n` +
    `• Date & Time: ${pickupDate} at ${pickupTime}\n` +
    `• Estimated Fare: ~₹${estimatedPrice.toLocaleString('en-IN')}\n\nPlease confirm availability and dispatch driver.`
  );

  const handleOpenModal = () => {
    onOpenBookingModal({
      serviceType: activeTab,
      pickup: activeTab === 'airport' && airportTripType === 'from_airport' ? 'CJB Airport Terminal' : (activeTab === 'airport' ? airportCityLocality : (activeTab === 'local' ? localPickup : 'Coimbatore')),
      drop: activeTab === 'airport' && airportTripType === 'from_airport' ? airportCityLocality : (activeTab === 'airport' ? 'CJB Airport Terminal' : (activeTab === 'hourly' ? `${rentalHours} Hours City Package` : (activeTab === 'local' ? localDrop : activeDest.name))),
      vehicle: vehicle.name,
      vehicleModel: vehicle.models,
      estimatedPrice,
      estimatedKm: distanceDisplay,
      date: pickupDate,
      time: pickupTime,
      breakdownNote
    });
  };

  return (
    <section id="fare-calculator" className="relative -mt-8 sm:-mt-12 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Top Header of the Calculator */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-neutral-900 via-neutral-800/80 to-neutral-900 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                Instant Fare Calculator & Direct Booking
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Affordable city rides with zero surge · Outstation from ₹15/km · Ooty from ₹3,000 · Hourly from ₹375/hr
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 hidden lg:inline">24/7 Dispatch Desk:</span>
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-amber-400 hover:text-amber-300 font-semibold text-xs tracking-wide transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {DISPLAY_PHONE}
            </a>
          </div>
        </div>

        {/* 4 Ordered Tabs: 1. Local Rides -> 2. Outstation -> 3. Hourly Rentals -> 4. Airport Transfer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 p-2 bg-neutral-950/80 border-b border-neutral-800 gap-1.5">
          
          {/* Tab 1: Local Rides */}
          <button
            type="button"
            onClick={() => setActiveTab('local')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'local'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="truncate">Local City Rides</span>
          </button>

          {/* Tab 2: Outstation Trips */}
          <button
            type="button"
            onClick={() => setActiveTab('outstation')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'outstation'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span className="truncate">Outstation Trips</span>
          </button>

          {/* Tab 3: Hourly Rentals */}
          <button
            type="button"
            onClick={() => setActiveTab('hourly')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'hourly'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span className="truncate">Hourly Rentals</span>
          </button>

          {/* Tab 4: Airport Transfer */}
          <button
            type="button"
            onClick={() => setActiveTab('airport')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'airport'
                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Plane className="w-4 h-4 shrink-0" />
            <span className="truncate">Airport Transfers</span>
          </button>
        </div>

        {/* Tab-Specific Form Fields */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Context Pill/Note */}
              {activeTab === 'local' && (
                <div className="p-3 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300">
                  <span className="font-semibold text-amber-400">Coimbatore City Rides: </span>
                  Standard digital meter calculation with zero peak-hour surge pricing. Clean AC cabs dispatched in 10-15 minutes.
                </div>
              )}

              {activeTab === 'outstation' && (
                <div className="p-3 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300">
                  <span className="font-semibold text-amber-400">Outstation Policy: </span>
                  Sedan ₹15/km · SUV ₹20/km · Crysta ₹23/km · Min 250 km coverage · Driver batta ₹500/day · Ooty starting ₹3,000 · Hill charges (SUV +₹400, Crysta +₹600).
                </div>
              )}

              {activeTab === 'hourly' && (
                <div className="p-3 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300">
                  <span className="font-semibold text-amber-400">Hourly Rental Package: </span>
                  ₹375/hour for first 3 hours, after that ₹350/hour basis. Vehicle & chauffeur with you for multiple stops.
                </div>
              )}

              {activeTab === 'airport' && (
                <div className="flex items-center gap-2 p-1 bg-neutral-800/80 rounded-lg border border-neutral-700 w-fit">
                  <button
                    type="button"
                    onClick={() => setAirportTripType('to_airport')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      airportTripType === 'to_airport' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    City Pickup → CJB Airport
                  </button>
                  <button
                    type="button"
                    onClick={() => setAirportTripType('from_airport')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      airportTripType === 'from_airport' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    CJB Airport → City Drop
                  </button>
                </div>
              )}

              {/* Input Fields According to Active Tab */}
              {activeTab === 'local' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="local-pickup-input" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        Pickup Locality
                      </label>
                      <input
                        id="local-pickup-input"
                        type="text"
                        value={localPickup}
                        onChange={(e) => setLocalPickup(e.target.value)}
                        list={pickupListId}
                        placeholder="e.g. Gandhipuram, RS Puram"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <datalist id={pickupListId}>
                        {COIMBATORE_LOCALITIES.map(l => <option key={l} value={l} />)}
                      </datalist>
                    </div>

                    <div>
                      <label htmlFor="local-drop-input" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        Drop Locality
                      </label>
                      <input
                        id="local-drop-input"
                        type="text"
                        value={localDrop}
                        onChange={(e) => setLocalDrop(e.target.value)}
                        list={dropListId}
                        placeholder="e.g. Peelamedu, Airport, Saravanampatti"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <datalist id={dropListId}>
                        {COIMBATORE_LOCALITIES.map(l => <option key={l} value={l} />)}
                      </datalist>
                    </div>
                  </div>

                  {/* Estimated Distance Control */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <label htmlFor="local-km-slider" className="font-semibold text-neutral-300">
                        Estimated Trip Distance in Coimbatore
                      </label>
                      <span className="font-mono text-amber-400 font-bold tabular-nums">
                        {localKm} km
                      </span>
                    </div>
                    <input
                      id="local-km-slider"
                      type="range"
                      min={3}
                      max={45}
                      step={1}
                      value={localKm}
                      onChange={(e) => setLocalKm(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                      <span>3 km (Short hop)</span>
                      <span>15 km (Across city)</span>
                      <span>35 km (Isha / Marudhamalai)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'outstation' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="outstation-dest-select" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        Outstation Destination
                      </label>
                      <select
                        id="outstation-dest-select"
                        value={outstationDestination}
                        onChange={(e) => setOutstationDestination(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      >
                        {OUTSTATION_DESTINATIONS.map(d => (
                          <option key={d.name} value={d.name}>
                            {d.name} ({d.distance} km one-way) {d.isHill ? '⛰️ Hill Station' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="trip-days-input" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                        Trip Days (Min 250 km/day)
                      </label>
                      <select
                        id="trip-days-input"
                        value={tripDays}
                        onChange={(e) => setTripDays(Number(e.target.value))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
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
                  <label htmlFor="rental-hours-select" className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Select Rental Duration (First 3 hrs @ ₹375/hr, then ₹350/hr)
                  </label>
                  <select
                    id="rental-hours-select"
                    value={rentalHours}
                    onChange={(e) => setRentalHours(Number(e.target.value))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value={2}>2 Hours (₹750 base) — Quick doctor visits & errands</option>
                    <option value={3}>3 Hours (₹1,125 base) — Multi-stop city shopping</option>
                    <option value={4}>4 Hours (₹1,475 base) — Cross Cut Road & meetings</option>
                    <option value={6}>6 Hours (₹2,175 base) — Half-day factory / temple visit</option>
                    <option value={8}>8 Hours (₹2,875 base) — Full-day Coimbatore business</option>
                    <option value={12}>12 Hours (₹4,275 base) — Comprehensive city & suburban trip</option>
                  </select>
                </div>
              )}

              {activeTab === 'airport' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="airport-loc-select" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {airportTripType === 'to_airport' ? 'Pickup Locality in Coimbatore' : 'Drop Locality in Coimbatore'}
                    </label>
                    <select
                      id="airport-loc-select"
                      value={airportCityLocality}
                      onChange={(e) => setAirportCityLocality(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      {COIMBATORE_LOCALITIES.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="airport-terminal-input" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-amber-400" />
                      Airport Location
                    </label>
                    <input
                      id="airport-terminal-input"
                      type="text"
                      readOnly
                      value="Coimbatore International Airport (CJB Terminal)"
                      className="w-full bg-neutral-800/90 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-neutral-300 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickup-date-control" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    Pickup Date
                  </label>
                  <input
                    id="pickup-date-control"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label htmlFor="pickup-time-control" className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    Pickup Time
                  </label>
                  <input
                    id="pickup-time-control"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Vehicle Class Selector (Strictly NO Hatchback - Only Sedan, SUV, Premium SUV) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    Select Cab Category
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    {activeTab === 'local' ? 'Standard AC City Fleet' : 'Transparent Outstation Rates'}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {VEHICLE_FLEET.map((v) => {
                    const isSelected = v.id === selectedVehicleId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVehicleId(v.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400'
                            : 'bg-neutral-800/60 border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                            {v.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">{v.models}</p>
                        
                        <div className="mt-2 text-xs font-bold text-neutral-200 tabular-nums">
                          {activeTab === 'local' ? (
                            <span>Standard City AC Fare</span>
                          ) : (
                            <span>₹{v.ratePerKm}/km outstation</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Price Display Card (5 cols) */}
            <div className="lg:col-span-5 bg-neutral-950 p-5 sm:p-6 rounded-xl border border-neutral-800 space-y-5">
              
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                  Transparent Fare Quote
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Calculated by Rule
                </span>
              </div>

              {/* Big Price */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-heading tabular-nums">
                    ₹{estimatedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-neutral-400 font-normal">
                    (estimated)
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-2 font-medium">
                  {breakdownNote}
                </p>
              </div>

              {/* Vehicle Specs */}
              <div className="space-y-2 py-3 border-y border-neutral-800 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Cab Type:</span>
                  <span className="font-semibold text-white">{vehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Seating & Luggage:</span>
                  <span className="text-neutral-200">{vehicle.capacity} · {vehicle.luggage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Driver Batta:</span>
                  <span className="text-neutral-200 tabular-nums">
                    {activeTab === 'outstation' ? `₹500 / day` : 'Included'}
                  </span>
                </div>
                {activeTab === 'outstation' && activeDest.isHill && (
                  <div className="flex justify-between text-amber-400/90 font-medium">
                    <span>Hill Station Charge:</span>
                    <span>
                      {vehicle.id === 'sedan' ? 'Included' : vehicle.id === 'suv_ertiga' ? '+₹400' : '+₹600'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tolls / Parking:</span>
                  <span className="text-neutral-300">At actuals as per slip</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* 1. WhatsApp Button */}
                <a
                  href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20"
                >
                  <MessageSquare className="w-4 h-4 fill-neutral-950" />
                  <span>Book Instantly on WhatsApp</span>
                </a>

                {/* 2. Direct Call Button */}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10"
                >
                  <Phone className="w-4 h-4 fill-neutral-950" />
                  <span>Call Dispatch: {DISPLAY_PHONE}</span>
                </a>

                {/* 3. Fast Online Booking Form */}
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enter Booking Details Online</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" /> Clean AC
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" /> 15-Min Arrival
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" /> GST Invoice
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
