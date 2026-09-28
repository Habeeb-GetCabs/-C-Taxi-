export interface VehicleType {
  id: string;
  name: string;
  category: string;
  models: string;
  capacity: string;
  luggage: string;
  localBaseFare: number;
  localPerKm: number;
  ratePerKm: number; // Outstation per km
  minKmPerDay: number;
  driverAllowancePerDay: number;
  hillCharge: number;
  features: string[];
  recommendedFor: string;
}

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  category: 'hills' | 'spiritual' | 'business' | 'intercity' | 'airport';
  distanceKm: number;
  estDuration: string;
  startingPrice: number;
  highlight: string;
  popularFor: string;
  isHillStation?: boolean;
}

export interface HourlyPackage {
  id: string;
  hours: number;
  km: number;
  basePrice: number; // Base rate for sedan: 375/hr for first 3 hours, then 350/hr
  suvPrice: number;
  premiumSuvPrice: number;
  tagline: string;
}

export const PHONE_NUMBER = "9089223344";
export const DISPLAY_PHONE = "+91 90892 23344";
export const WHATSAPP_URL = "https://wa.me/919089223344";

export const COIMBATORE_LOCALITIES = [
  "Gandhipuram (Cross Cut / Central Bus Stand)",
  "RS Puram (DB Road / Post Office)",
  "Peelamedu (Avinashi Road / PSG Tech)",
  "Saravanampatti (IT Corridor / CHIL SEZ)",
  "Singanallur (Trichy Road / Bus Stand)",
  "Coimbatore Int'l Airport (CJB Terminal)",
  "Coimbatore Junction Railway Station (CBE)",
  "Ganapathy (Sathy Road)",
  "Ukkadam (Palakkad Road)",
  "Kuniyamuthur / Sundarapuram",
  "Vadavalli / Marudhamalai Road",
  "Ramanathapuram / Sungam",
  "Hopes College / TIDEL Park",
  "Thudiyalur / Mettupalayam Road",
  "Kovaipudur",
  "Kinathukadavu",
  "Sulur / Kangeyam Road"
];

export const LOCAL_ROUTE_DISTANCES: Record<string, number> = {
  "Gandhipuram -> Airport": 11,
  "RS Puram -> Airport": 14,
  "Peelamedu -> Airport": 5,
  "Saravanampatti -> Airport": 10,
  "Singanallur -> Airport": 9,
  "Railway Station -> Airport": 12,
  "Gandhipuram -> Saravanampatti": 12,
  "RS Puram -> Gandhipuram": 5,
  "Gandhipuram -> Singanallur": 8,
  "City -> Isha Yoga Center": 34,
  "City -> Marudhamalai Temple": 15,
  "City -> Madukkarai": 16,
  "City -> Thudiyalur": 10,
  "City -> TIDEL Park / Hopes": 8
};

export const OUTSTATION_DESTINATIONS = [
  { name: "Ooty (Queen of Hills)", distance: 88, isHill: true, type: "Hills" },
  { name: "Coonoor (Nilgiri Tea Gardens)", distance: 72, isHill: true, type: "Hills" },
  { name: "Valparai (Tea Estates & Hairpins)", distance: 105, isHill: true, type: "Hills" },
  { name: "Kodaikanal (Princess of Hills)", distance: 175, isHill: true, type: "Hills" },
  { name: "Munnar (Hill Resort)", distance: 160, isHill: true, type: "Hills" },
  { name: "Isha Yoga Center / Velliangiri", distance: 34, isHill: false, type: "Spiritual" },
  { name: "Pollachi / Topslip Anamalai", distance: 44, isHill: false, type: "Tourism" },
  { name: "Tiruppur (Textile City)", distance: 54, isHill: false, type: "Business" },
  { name: "Palakkad (Kerala)", distance: 52, isHill: false, type: "Interstate" },
  { name: "Erode (Textile Hub)", distance: 100, isHill: false, type: "Business" },
  { name: "Salem (Steel City)", distance: 165, isHill: false, type: "Intercity" },
  { name: "Madurai (Temple City)", distance: 215, isHill: false, type: "Spiritual" },
  { name: "Palani (Murugan Temple)", distance: 105, isHill: false, type: "Spiritual" },
  { name: "Trichy (Rockfort)", distance: 220, isHill: false, type: "Intercity" },
  { name: "Bangalore / Bengaluru", distance: 365, isHill: false, type: "Metro" },
  { name: "Chennai (Capital)", distance: 510, isHill: false, type: "Metro" }
];

// FLEET WITHOUT HATCHBACK
// Local math: Sedan base 100 + 28/km; SUV base 100 + 35/km; Premium SUV base 150 + 45/km
// Outstation math: Sedan 15/km; SUV 20/km; Premium SUV 23/km; Driver batta: 500; Min 250km/day; Hill charges: SUV +400, Premium SUV +600.
export const VEHICLE_FLEET: VehicleType[] = [
  {
    id: "sedan",
    name: "Prime Sedan",
    category: "Executive & Family",
    models: "Maruti Dzire, Toyota Etios, Hyundai Aura",
    capacity: "4 Passengers",
    luggage: "3 Large Bags",
    localBaseFare: 100,
    localPerKm: 28,
    ratePerKm: 15, // Outstation 15 Rs/km
    minKmPerDay: 250,
    driverAllowancePerDay: 500, // 500 Driver batta
    hillCharge: 0,
    features: ["Quiet AC Cabin", "Large Dedicated Trunk", "Spacious Legroom", "Digital Meter"],
    recommendedFor: "Local city travel, airport drops & comfortable outstation trips"
  },
  {
    id: "suv_ertiga",
    name: "Spacious SUV (6-Seater)",
    category: "Family & Groups",
    models: "Maruti Ertiga, Kia Carens, Mahindra Marazzo",
    capacity: "6 Passengers",
    luggage: "4 Bags + Rear Storage",
    localBaseFare: 100,
    localPerKm: 35,
    ratePerKm: 20, // Outstation 20 Rs/km
    minKmPerDay: 250,
    driverAllowancePerDay: 500, // 500 Driver batta
    hillCharge: 400, // Hill charges +400 for SUV
    features: ["Dual Zone AC", "3-Row Seating", "Strong Hill Pulling Power", "USB Charging"],
    recommendedFor: "Family trips to Ooty/Valparai, group airport transit & outstation tours"
  },
  {
    id: "premium_suv",
    name: "Premium SUV (Innova Crysta)",
    category: "Luxury VIP Chauffeur",
    models: "Toyota Innova Crysta / Hycross",
    capacity: "7 Passengers",
    luggage: "5 Large Suitcases",
    localBaseFare: 150,
    localPerKm: 45,
    ratePerKm: 23, // Outstation 23 Rs/km
    minKmPerDay: 250,
    driverAllowancePerDay: 500, // 500 Driver batta
    hillCharge: 600, // Hill charges +600 for Premium SUV
    features: ["Plush Reclining Captain Seats", "Supreme Mountain Safety", "Executive Ride Quality", "Expert Chauffeur"],
    recommendedFor: "VIP business travelers, family holidays to Nilgiris & extended tours"
  }
];

// Hourly Package Calculation:
// 375 per hour for first 3 hours; after that 350 per hour basis.
// 2 hr: 2 * 375 = 750
// 3 hr: 3 * 375 = 1125
// 4 hr: 1125 + 350 = 1475
// 8 hr: 1125 + (5 * 350) = 2875
// 12 hr: 1125 + (9 * 350) = 4275
export function calculateHourlyRate(hours: number, vehicleId: string): number {
  let sedanRate = 0;
  if (hours <= 3) {
    sedanRate = hours * 375;
  } else {
    sedanRate = (3 * 375) + ((hours - 3) * 350);
  }

  if (vehicleId === 'sedan') return sedanRate;
  if (vehicleId === 'suv_ertiga') return Math.round(sedanRate * 1.3);
  if (vehicleId === 'premium_suv') return Math.round(sedanRate * 1.6);
  return sedanRate;
}

export const HOURLY_PACKAGES: HourlyPackage[] = [
  {
    id: "pkg_2hr",
    hours: 2,
    km: 20,
    basePrice: 750, // 2 * 375
    suvPrice: 975,
    premiumSuvPrice: 1200,
    tagline: "Quick appointments & short city errands"
  },
  {
    id: "pkg_3hr",
    hours: 3,
    km: 30,
    basePrice: 1125, // 3 * 375
    suvPrice: 1460,
    premiumSuvPrice: 1800,
    tagline: "Doctor visits & business meetings"
  },
  {
    id: "pkg_4hr",
    hours: 4,
    km: 40,
    basePrice: 1475, // 1125 + 350
    suvPrice: 1915,
    premiumSuvPrice: 2360,
    tagline: "Cross Cut Road shopping & hospital visits"
  },
  {
    id: "pkg_8hr",
    hours: 8,
    km: 80,
    basePrice: 2875, // 1125 + (5 * 350)
    suvPrice: 3735,
    premiumSuvPrice: 4600,
    tagline: "Full day Coimbatore corporate meetings & temple tour"
  },
  {
    id: "pkg_12hr",
    hours: 12,
    km: 120,
    basePrice: 4275, // 1125 + (9 * 350)
    suvPrice: 5555,
    premiumSuvPrice: 6840,
    tagline: "Extensive industrial visits, TIDEL park & factories"
  }
];

// Ooty starting price strictly 3000
export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: "cbe_ooty",
    from: "Coimbatore",
    to: "Ooty (Queen of Hills)",
    category: "hills",
    distanceKm: 88,
    estDuration: "2h 45m",
    startingPrice: 3000, // Updated to 3000 as instructed
    highlight: "Nilgiri 36 Hairpin Specialist Drivers",
    popularFor: "Scenic Nilgiri getaway, family holidays & tea garden stays",
    isHillStation: true
  },
  {
    id: "cbe_airport",
    from: "City Center Hubs",
    to: "CJB Airport (Peelamedu)",
    category: "airport",
    distanceKm: 12,
    estDuration: "20-30m",
    startingPrice: 440,
    highlight: "Guaranteed Flight Punctuality",
    popularFor: "Early morning terminal drops & delayed flight meet-and-greet"
  },
  {
    id: "cbe_isha",
    from: "Coimbatore City",
    to: "Isha Yoga Center (Adiyogi)",
    category: "spiritual",
    distanceKm: 34,
    estDuration: "55m",
    startingPrice: 1050,
    highlight: "Round Trip Waiting Available",
    popularFor: "Adiyogi light & sound show, Dhyanalinga & ashram darshan"
  },
  {
    id: "cbe_tiruppur",
    from: "Gandhipuram",
    to: "Tiruppur Textile City",
    category: "business",
    distanceKm: 54,
    estDuration: "1h 10m",
    startingPrice: 1350,
    highlight: "Express Highway Transit",
    popularFor: "Apparel exporters, garment factory visits & commercial meetings"
  },
  {
    id: "cbe_pollachi",
    from: "Coimbatore",
    to: "Pollachi & Topslip",
    category: "hills",
    distanceKm: 45,
    estDuration: "1h 00m",
    startingPrice: 1250,
    highlight: "Scenic Coconut Highway",
    popularFor: "Wildlife sanctuary trips, village tours & temple darshans"
  },
  {
    id: "cbe_valparai",
    from: "Coimbatore",
    to: "Valparai Hill Station",
    category: "hills",
    distanceKm: 105,
    estDuration: "3h 30m",
    startingPrice: 3600,
    highlight: "40 Hairpin Ghat Roads Certified",
    popularFor: "Tea plantation bungalows, Sholayar dam & pristine nature",
    isHillStation: true
  }
];

export const TESTIMONIALS = [
  {
    name: "Dr. K. Vigneshwaran",
    role: "Consultant Physician",
    locality: "RS Puram, Coimbatore",
    text: "I regularly book C Taxi for early morning 4:30 AM drops to Coimbatore Airport. The driver always arrives 10 minutes ahead of time without me having to follow up. Clean sedan with proper meter billing.",
    rating: 5,
    trip: "Airport Transfer"
  },
  {
    name: "Pooja Venkatesh",
    role: "Product Manager (Bengaluru)",
    locality: "Booked from CJB Airport to Ooty",
    text: "Booked an Ertiga SUV for my family to Ooty. Navigating the 36 hairpin bends was so smooth because of their experienced hill driver. Exact 3000 starting rate with no hidden surprises. Highly recommended!",
    rating: 5,
    trip: "Ooty Hill Station Tour"
  },
  {
    name: "M. Anandhan",
    role: "Textile Apparel Exporter",
    locality: "Tiruppur & Peelamedu",
    text: "Used their 8-hour package for full day factory visits in Tiruppur and Coimbatore. Transparent hourly pricing with zero surge. Professional chauffeur with instant GST invoice.",
    rating: 5,
    trip: "Hourly Rental Package"
  }
];

export const FAQS = [
  {
    q: "How does C Taxi calculate local ride fares in Coimbatore?",
    a: "Our local rides follow affordable standard digital meter pricing with zero peak-hour surge pricing. Clean, sanitized AC Prime Sedans and spacious SUVs are dispatched within 10 to 15 minutes across all Kovai localities."
  },
  {
    q: "What is your outstation pricing and driver batta?",
    a: "Outstation rates are ₹15/km for Prime Sedan, ₹20/km for 6-seater SUV, and ₹23/km for Premium SUV Crysta, with a minimum billing of 250 km per day. Driver batta is flat ₹500 per day. For hill stations, a dedicated hill safety charge of ₹400 for SUV and ₹600 for Premium SUV applies."
  },
  {
    q: "What are the rates for Ooty from Coimbatore?",
    a: "Our Ooty cabs start from ₹3,000 for Prime Sedan. Our hill chauffeurs are certified for the Nilgiri Kalhatty 36 hairpin bends with extensive mountain driving experience."
  },
  {
    q: "How do your Hourly Rental packages work?",
    a: "Our hourly packages start at ₹375 per hour for the first 3 hours, and ₹350 per hour thereafter. You can keep the car and chauffeur with you for continuous shopping, clinic visits, or multiple factory meetings across Kovai."
  },
  {
    q: "How fast can C Taxi reach my location in Coimbatore?",
    a: "We maintain active fleet hubs across Gandhipuram, RS Puram, Peelamedu, Saravanampatti, Singanallur, and Airport area. Average dispatch arrival time is 10 to 15 minutes."
  },
  {
    q: "What payment methods do you accept?",
    a: "You can pay via Google Pay (GPay), PhonePe, Paytm, UPI, Bank Transfer, or Cash upon completion of your trip. Official GST receipts are provided."
  }
];

export const AD_CAMPAIGN_PRESETS = [
  {
    id: "local",
    title: "Coimbatore Local City Cabs",
    query: "call taxi in coimbatore local cab booking",
    h1: "Coimbatore's Reliable 24/7 Call Taxi — At Your Doorstep in 15 Minutes",
    subtext: "Affordable, transparent city rides with zero surge pricing. Instant 15-minute dispatch across Gandhipuram, RS Puram, Peelamedu, Saravanampatti & Kovai.",
    primaryTab: "local"
  },
  {
    id: "outstation",
    title: "Outstation Cabs & Ooty Hill Tours",
    query: "coimbatore to ooty cab / outstation taxi coimbatore",
    h1: "Coimbatore to Ooty & Outstation Cabs — Safe Drivers & Sanitized Fleet",
    subtext: "Ooty trips starting from ₹3,000. Outstation cabs from ₹15/km for Sedan, ₹20/km for SUV with certified mountain chauffeurs.",
    primaryTab: "outstation"
  },
  {
    id: "hourly",
    title: "Hourly Rental Packages",
    query: "hourly car rental coimbatore with driver package",
    h1: "Coimbatore City Hourly Rental Cabs — Flexible Packages with Driver",
    subtext: "Transparent pricing: ₹375/hour for first 3 hours, then ₹350/hour. Ideal for Cross Cut Road shopping, clinic visits, and multi-stop business meetings.",
    primaryTab: "hourly"
  },
  {
    id: "airport",
    title: "Coimbatore Airport Taxi Ads",
    query: "coimbatore airport taxi pickup drop cjb",
    h1: "Coimbatore CJB Airport Taxi — On-Time Flight Pickup & Drop Guaranteed",
    subtext: "Reliable airport transfers with flight tracking, 15-minute doorstep dispatch, zero midnight surge & luggage assistance.",
    primaryTab: "airport"
  }
];
