export interface TourSpot {
  name: string;
  desc: string;
  timing?: string;
}

export interface TourPackage {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  startingPrice: number;
  duration: string;
  distance: string;
  routeOverview: string;
  sedanPrice: number;
  suvPrice: number;
  crystaPrice: number;
  spots: TourSpot[];
  itinerary: { time: string; title: string; desc: string }[];
  inclusions: string[];
  exclusions: string[];
  recommendedVehicles: string;
  metaDescription: string;
  pageTitle: string;
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    slug: "ooty-coonoor-kotagiri",
    title: "Ooty, Coonoor & Kotagiri Nilgiri Hills Tour",
    badge: "Most Popular Hill Tour",
    tagline: "Experience the Queen of Hills, Nilgiri tea gardens & Catherine Falls with certified 36-hairpin drivers",
    startingPrice: 3000,
    duration: "1 Day / 2 Days / 3 Days",
    distance: "88 km from Coimbatore (via Mettupalayam)",
    routeOverview: "Coimbatore → Mettupalayam → Burliar → Coonoor → Ooty → Kotagiri → Coimbatore",
    sedanPrice: 3000,
    suvPrice: 4200,
    crystaPrice: 5200,
    spots: [
      { name: "Ooty Lake & Boathouse", desc: "Scenic boating amidst eucalyptus trees and Nilgiri mist", timing: "9:00 AM - 6:00 PM" },
      { name: "Government Botanical Garden", desc: "55-acre heritage garden with fossilized trees and rare flora", timing: "8:30 AM - 6:30 PM" },
      { name: "Doddabetta Peak", desc: "Highest viewpoint in the Nilgiris (2,637 m) overlooking the valleys", timing: "9:00 AM - 5:30 PM" },
      { name: "Tea Factory & Museum", desc: "Live CTC tea processing and authentic chocolate sampling", timing: "9:00 AM - 6:30 PM" },
      { name: "Coonoor Sim's Park", desc: "Unusual botanical park terraced along natural slopes", timing: "9:00 AM - 6:00 PM" },
      { name: "Dolphin's Nose & Lamb's Rock", desc: "Dramatic gorge views overlooking Catherine Falls", timing: "9:00 AM - 5:00 PM" },
      { name: "Kodanad Viewpoint (Kotagiri)", desc: "Sweeping panorama of the Bhavani Sagar reservoir and Mysore plateau", timing: "9:00 AM - 5:30 PM" }
    ],
    itinerary: [
      { time: "06:00 AM", title: "Doorstep Pickup in Coimbatore", desc: "Comfortable pickup from your home, hotel, or CJB Airport in sanitized AC cab." },
      { time: "08:30 AM", title: "Coonoor Sightseeing", desc: "Visit Sim's Park, Tea gardens, and Lamb's Rock viewpoint." },
      { time: "11:30 AM", title: "Ooty Sightseeing", desc: "Explore Doddabetta Peak, Tea Factory Museum, and Government Botanical Garden." },
      { time: "02:00 PM", title: "Lunch & Ooty Lake Boating", desc: "Traditional South Indian/Multi-cuisine lunch followed by leisurely lake boating." },
      { time: "04:30 PM", title: "Kotagiri Kodanad Viewpoint", desc: "Drive along the quieter tea hills of Kotagiri with spectacular sunset valley views." },
      { time: "08:30 PM", title: "Return to Coimbatore", desc: "Safe downhill descent with our certified hill chauffeur and drop at your doorstep." }
    ],
    inclusions: [
      "Dedicated commercial AC cab (Sedan, Ertiga SUV, or Innova Crysta)",
      "Experienced mountain chauffeur certified for 36 Kalhatty hairpin bends",
      "Fuel, vehicle maintenance, and driver allowance",
      "Flexible sightseeing stops and photo breaks along tea plantations",
      "Doorstep pickup & drop anywhere within Coimbatore city"
    ],
    exclusions: [
      "Sightseeing entry tickets, boathouse charges & camera fees",
      "Food and personal refreshments",
      "Toll plaza fees and parking tickets as per official receipts"
    ],
    recommendedVehicles: "Prime Sedan (1-4 pax), Ertiga SUV (4-6 pax), Innova Crysta (6-7 pax)",
    metaDescription: "Book Coimbatore to Ooty, Coonoor & Kotagiri cab tour from ₹3,000. 36 hairpin bends certified hill drivers, sanitized AC fleet, customizable 1 to 3 days itinerary.",
    pageTitle: "Ooty, Coonoor & Kotagiri Tour from Coimbatore — C Taxi (From ₹3,000)"
  },
  {
    slug: "marudhamalai-isha-kovai-kutralam",
    title: "Marudhamalai, Isha Yoga & Kovai Kutralam Circuit",
    badge: "Spiritual & Nature Circuit",
    tagline: "Holy Murugan darshan, 112ft Adiyogi light & sound spectacle, and refreshing Siruvani rainforest waterfalls",
    startingPrice: 2200,
    duration: "1 Day Full Day Tour (8 - 10 Hours)",
    distance: "90 km round circuit in Western Coimbatore",
    routeOverview: "Coimbatore City → Marudhamalai Hill Temple → Kovai Kutralam Falls → Isha Yoga Center (Adiyogi) → Coimbatore",
    sedanPrice: 2200,
    suvPrice: 3100,
    crystaPrice: 4200,
    spots: [
      { name: "Marudhamalai Murugan Temple", desc: "Ancient 12th-century hill shrine dedicated to Lord Murugan with therapeutic herbs", timing: "06:00 AM - 01:00 PM & 04:00 PM - 08:30 PM" },
      { name: "Kovai Kutralam Waterfalls", desc: "Pristine waterfall originating in the Siruvani forest range with the world's tastiest water", timing: "10:00 AM - 03:30 PM (Entry closed Mondays)" },
      { name: "Isha Yoga Center & 112ft Adiyogi", desc: "Iconic Adiyogi statue recognized by Guinness World Records and tranquil Dhyanalinga", timing: "06:00 AM - 08:00 PM" },
      { name: "Suryakund & Chandrakund", desc: "Energized subterranean water bodies for physical and inner rejuvenation", timing: "07:30 AM - 08:00 PM" },
      { name: "Adiyogi Divya Darshanam", desc: "Award-winning 3D projection mapping light and sound show at Adiyogi", timing: "07:00 PM - 07:20 PM Daily" }
    ],
    itinerary: [
      { time: "07:30 AM", title: "Morning Pickup & Marudhamalai Temple", desc: "Doorstep pickup in Coimbatore and direct hill drive to Marudhamalai for peaceful morning darshan." },
      { time: "10:30 AM", title: "Kovai Kutralam Forest Waterfalls", desc: "Scenic forest drive to Siruvani foothills for relaxing waterfall baths in pristine mountain streams." },
      { time: "01:30 PM", title: "Traditional Kongu Lunch", desc: "Authentic vegetarian lunch break en route to Velliangiri foothills." },
      { time: "03:00 PM", title: "Isha Yoga Center & Dhyanalinga", desc: "Visit Dhyanalinga meditation dome, Linga Bhairavi temple, and sacred theerthakunds." },
      { time: "06:30 PM", title: "Adiyogi 112ft Statue & Light Show", desc: "Witness the magnificent Adiyogi statue and the spellbinding Divya Darshanam 3D laser light show." },
      { time: "08:30 PM", title: "Comfortable Return Drop", desc: "Smooth night drive back to Coimbatore city, railway junction, or your hotel." }
    ],
    inclusions: [
      "Complete 8-10 hour dedicated cab with chauffeur",
      "Fuel, parking waiting, and driver allowance",
      "Guaranteed evening waiting for Adiyogi Divya Darshanam 3D laser show",
      "Luggage security in trunk while you visit temples",
      "Flexible schedule tailored to your family's pace"
    ],
    exclusions: [
      "Kovai Kutralam forest department entry ticket",
      "Temple special darshan tickets and personal expenses"
    ],
    recommendedVehicles: "Prime Sedan (up to 4 pax), Ertiga SUV (up to 6 pax), Innova Crysta (up to 7 pax)",
    metaDescription: "Coimbatore to Marudhamalai, Isha Yoga Center Adiyogi & Kovai Kutralam 1-day cab tour. Transparent fixed fare from ₹2,200, zero surge, 3D laser show waiting included.",
    pageTitle: "Marudhamalai, Isha Adiyogi & Kovai Kutralam Tour — C Taxi (From ₹2,200)"
  },
  {
    slug: "palani-temple-pilgrimage",
    title: "Palani Dhandayuthapani Swamy Temple Pilgrimage",
    badge: "Divine Murugan Pilgrimage",
    tagline: "Sacred darshan at Palani Murugan Hill Temple with hassle-free Adivaram drop & waiting",
    startingPrice: 2800,
    duration: "Same Day Return (7 - 9 Hours)",
    distance: "105 km one-way (210 km round trip)",
    routeOverview: "Coimbatore City → Pollachi Road → Udumalpet → Palani Adivaram → Coimbatore",
    sedanPrice: 2800,
    suvPrice: 3800,
    crystaPrice: 4800,
    spots: [
      { name: "Palani Hill Temple (Dhandayuthapani Swamy)", desc: "One of the Six Holy Abodes (Arupadaiveedu) of Lord Murugan atop Sivagiri hill", timing: "06:00 AM - 08:30 PM" },
      { name: "Winch & Ropeway Stations", desc: "Scenic mountain funicular winch and cable car ascending the 450-foot hill", timing: "06:30 AM - 08:00 PM" },
      { name: "Thiru Avinankudi Temple", desc: "Ancient temple at the foothills where Sage Agastya worshipped", timing: "06:00 AM - 08:00 PM" },
      { name: "Shanmuga River Bathing Ghat", desc: "Holy river for customary pre-darshan ablutions", timing: "Open throughout the day" },
      { name: "Palani Panchamirtham Stalls", desc: "Famous GI-tagged temple offering made from hill bananas, jaggery, honey and ghee", timing: "Temple counters" }
    ],
    itinerary: [
      { time: "06:00 AM", title: "Early Morning Departure", desc: "Early morning pickup from Coimbatore to beat highway traffic and reach Palani before afternoon temple pooja." },
      { time: "08:15 AM", title: "Arrival at Palani Adivaram", desc: "Direct drop right at the Giri Veedhi or Winch / Ropeway ticketing counter with luggage safely kept in car." },
      { time: "08:45 AM", title: "Hilltop Ascent & Divine Darshan", desc: "Ascend via Winch, Ropeway or Elephant Steps for peaceful darshan of Lord Murugan (Navapashanam deity)." },
      { time: "01:00 PM", title: "Prasadam & Traditional Lunch", desc: "Procure famous Palani Panchamirtham and enjoy traditional banana leaf lunch in Adivaram." },
      { time: "02:30 PM", title: "Thiru Avinankudi Visit", desc: "Pay homage at the sacred foothill temple." },
      { time: "03:30 PM", title: "Scenic Return Drive", desc: "Smooth highway return via Pollachi coconut groves with optional tea break at Aliyar or Pollachi town." },
      { time: "06:00 PM", title: "Drop at Coimbatore", desc: "Prompt return drop at your home or Coimbatore Junction." }
    ],
    inclusions: [
      "Round trip travel in sanitized AC cab (210 km covered)",
      "4 to 5 hours dedicated waiting at Palani Adivaram parking",
      "Driver batta and fuel included",
      "Senior citizen friendly drop closest to elevator / winch entry",
      "Secure vehicle storage for footwear, bags and belongings"
    ],
    exclusions: [
      "Temple special entry tickets, winch/ropeway tickets",
      "National highway tolls at actuals as per slip"
    ],
    recommendedVehicles: "Prime Sedan, Ertiga SUV, Toyota Innova Crysta",
    metaDescription: "Book Coimbatore to Palani temple cab package from ₹2,800. Dedicated Adivaram waiting, senior-friendly drops, transparent round-trip pricing with C Taxi.",
    pageTitle: "Palani Temple Pilgrimage Taxi from Coimbatore — C Taxi (From ₹2,800)"
  },
  {
    slug: "valparai-topslip-safari",
    title: "Valparai & Topslip Anamalai Wildlife Tour",
    badge: "Tea Estates & Wildlife Safari",
    tagline: "40 thrilling hairpin bends, misty tea plantation valleys & elephant safari in the Western Ghats",
    startingPrice: 3600,
    duration: "1 Day or 2 Days (Overnight Stay)",
    distance: "105 km to Valparai / 75 km to Topslip",
    routeOverview: "Coimbatore → Pollachi → Aliyar Dam → 40 Hairpin Ghat Road → Valparai / Topslip → Coimbatore",
    sedanPrice: 3600,
    suvPrice: 4800,
    crystaPrice: 5900,
    spots: [
      { name: "Aliyar Dam & Park", desc: "Picturesque reservoir at the foot of Anamalai hills with boating and gardens", timing: "09:00 AM - 06:00 PM" },
      { name: "40 Hairpin Ghat Bends", desc: "Thrilling mountain road engineering with breathtaking views of Aliyar lake below", timing: "Daylight transit" },
      { name: "Loam's Viewpoint & Carver Marsh", desc: "High vantage panoramic lookout over the plains and waterfalls", timing: "Open daylight" },
      { name: "Koolangal River & Sholayar Dam", desc: "Serene pebble river bed and second deepest reservoir in Asia", timing: "09:00 AM - 05:30 PM" },
      { name: "Topslip (Anamalai Tiger Reserve)", desc: "Pristine elephant camp, van safari and dense evergreen teak forests", timing: "07:00 AM - 04:00 PM" }
    ],
    itinerary: [
      { time: "06:00 AM", title: "Coimbatore Departure", desc: "Early departure via Pollachi highway through lush coconut groves." },
      { time: "07:30 AM", title: "Aliyar Dam Foothills", desc: "Brief photo stop at Aliyar reservoir before entering the mountain ghat road." },
      { time: "08:15 AM", title: "The 40 Hairpins Ascent", desc: "Expert mountain driving with stops at Loam's viewpoint and Monkey Falls." },
      { time: "11:00 AM", title: "Valparai Tea Gardens & Rivers", desc: "Drive through emerald tea carpet hills, Koolangal river, and tea tasting." },
      { time: "01:30 PM", title: "Sholayar Dam Visit", desc: "Visit massive Sholayar reservoir surrounded by pristine rainforests." },
      { time: "04:30 PM", title: "Downhill Descent", desc: "Safe, scenic descent before forest checkpost closure." },
      { time: "07:30 PM", title: "Arrival in Coimbatore", desc: "Drop back at your hotel or residence." }
    ],
    inclusions: [
      "Commercial AC vehicle with mountain certified driver",
      "Fuel, 250 km coverage, and hill safety allowance",
      "Chauffeur assistance at forest checkposts (Aliyar & Topslip)",
      "Luggage protection and stops at scenic photography viewpoints"
    ],
    exclusions: [
      "Forest department entry permits, vehicle tolls and safari fees",
      "Personal meals and lodging expenses"
    ],
    recommendedVehicles: "Ertiga SUV (Strong hill pull) or Toyota Innova Crysta",
    metaDescription: "Coimbatore to Valparai & Topslip cab tour package from ₹3,600. Expert drivers for 40 hairpin bends, Anamalai tea estates and wildlife safari.",
    pageTitle: "Valparai & Topslip Tour Package from Coimbatore — C Taxi (From ₹3,600)"
  },
  {
    slug: "kodaikanal-hills",
    title: "Kodaikanal 'Princess of Hills' Tour Package",
    badge: "Romantic Mist & Lakes",
    tagline: "Explore star-shaped Kodai lake, Pillar Rocks, Pine Forests, and Silver Cascade waterfalls",
    startingPrice: 5500,
    duration: "2 Days / 3 Days Weekend Tour",
    distance: "175 km one-way from Coimbatore",
    routeOverview: "Coimbatore → Pollachi / Dharapuram → Palani → Ghat Road → Kodaikanal → Coimbatore",
    sedanPrice: 5500,
    suvPrice: 7200,
    crystaPrice: 8800,
    spots: [
      { name: "Kodaikanal Lake", desc: "Famous man-made star-shaped lake with pedalo boating and cycling perimeter", timing: "06:00 AM - 06:00 PM" },
      { name: "Coaker's Walk", desc: "1-kilometer pedestrian path along steep mountain cliff edges offering misty valley views", timing: "07:00 AM - 07:00 PM" },
      { name: "Pillar Rocks & Guna Caves", desc: "Three giant granite boulders standing 400 feet high surrounded by pine mist", timing: "09:00 AM - 05:00 PM" },
      { name: "Pine Forest", desc: "Iconic cinematic forest of towering pine trees planted in 1906", timing: "09:00 AM - 06:00 PM" },
      { name: "Silver Cascade Falls", desc: "Thundering 180-foot natural waterfall greeting you along the Kodai ghat road", timing: "Open all day" }
    ],
    itinerary: [
      { time: "Day 1 - 06:00 AM", title: "Coimbatore to Kodaikanal Drive", desc: "Comfortable highway and scenic hill climb with breakfast stop en route." },
      { time: "Day 1 - 12:00 PM", title: "Hotel Check-in & Lake Leisure", desc: "Arrival at Kodaikanal, hotel drop, lunch, and leisurely cycling around Kodai Lake." },
      { time: "Day 1 - 03:30 PM", title: "Coaker's Walk & Bryant Park", desc: "Evening stroll through botanical gardens and cliff walk." },
      { time: "Day 2 - 09:00 AM", title: "Full Day Kodai Sightseeing", desc: "Visit Pillar Rocks, Green Valley View, Pine Forest, and Guna Caves." },
      { time: "Day 2 - 03:30 PM", title: "Silver Cascade & Return Drive", desc: "Descent via scenic Palani ghat road and smooth return to Coimbatore." }
    ],
    inclusions: [
      "Round trip travel in sanitized AC Prime Sedan or SUV",
      "500 km outstation billing allowance over 2 days",
      "Driver batta for 2 days included (₹500 x 2)",
      "Luggage protection and hotel pickup/drop in Kodaikanal"
    ],
    exclusions: [
      "Hotel stay & food expenses",
      "Sightseeing entry tickets and boat rentals",
      "Tolls & parking at actuals"
    ],
    recommendedVehicles: "Prime Sedan, Ertiga SUV, or Innova Crysta",
    metaDescription: "Coimbatore to Kodaikanal 2-3 days taxi tour package from ₹5,500. Reliable AC fleet, certified hill chauffeurs, transparent pricing with C Taxi.",
    pageTitle: "Kodaikanal Tour Package from Coimbatore — C Taxi (From ₹5,500)"
  }
];
