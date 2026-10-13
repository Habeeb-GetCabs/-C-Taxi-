import React, { useState } from 'react';
import { Mountain, MapPin } from 'lucide-react';

interface TourCardVisualProps {
  slug: string;
  title: string;
  badge: string;
  className?: string;
}

interface TourPhotoConfig {
  image: string;
  tag: string;
  altitude: string;
  alt: string;
}

const TOUR_PHOTOS: Record<string, TourPhotoConfig> = {
  'ooty-coonoor-kotagiri': {
    image: '/images/destinations/ooty-lake.jpg',
    tag: 'Nilgiri Hills · 36 Hairpin Certified',
    altitude: '2,240m',
    alt: 'Ooty Lake and Nilgiri Mountain Range'
  },
  'marudhamalai-isha-kovai-kutralam': {
    image: '/images/destinations/adiyogi-isha.jpg',
    tag: 'Spiritual & Western Ghats Circuit',
    altitude: 'Adiyogi 112ft',
    alt: '112ft Adiyogi Shiva Statue at Isha Yoga Center Coimbatore'
  },
  'palani-temple-pilgrimage': {
    image: '/images/destinations/palani.jpg',
    tag: 'Sacred Hill Pilgrimage & Fast-Track Darshan',
    altitude: 'Dhandayuthapani',
    alt: 'Palani Dhandayuthapani Swamy Hill Temple'
  },
  'valparai-topslip-safari': {
    image: '/images/destinations/valparai.jpg',
    tag: 'Anamalai Rainforest · 40 Hairpin Bends',
    altitude: '1,193m',
    alt: 'Valparai Tea Plantations and Ghat Hairpins'
  },
  'valparai-pollachi-topslip': {
    image: '/images/destinations/valparai.jpg',
    tag: 'Anamalai Rainforest · 40 Hairpin Bends',
    altitude: '1,193m',
    alt: 'Valparai Tea Plantations and Ghat Hairpins'
  },
  'kodaikanal-hills': {
    image: '/images/destinations/kodaikanal-lake.jpg',
    tag: 'Palani Hills · Princess of Hill Stations',
    altitude: '2,133m',
    alt: 'Star-shaped Kodaikanal Lake and Misty Pine Forests'
  },
  'kodaikanal-princess-hills': {
    image: '/images/destinations/kodaikanal-lake.jpg',
    tag: 'Palani Hills · Princess of Hill Stations',
    altitude: '2,133m',
    alt: 'Star-shaped Kodaikanal Lake and Misty Pine Forests'
  }
};

export const TourCardVisual: React.FC<TourCardVisualProps> = ({ slug, title, badge, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const photoData = TOUR_PHOTOS[slug] || {
    image: '/images/destinations/ooty-lake.jpg',
    tag: 'Hill & Sightseeing Circuit',
    altitude: 'Western Ghats',
    alt: title
  };

  return (
    <div className={`relative overflow-hidden h-52 sm:h-56 w-full bg-neutral-900 ${className}`}>
      {/* Real Destination Photography with Error Fallback */}
      {!imageError ? (
        <img 
          src={photoData.image} 
          alt={photoData.alt || title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex items-center justify-center p-6 text-center">
          <div className="space-y-1">
            <MapPin className="w-8 h-8 text-[#FFBF00] mx-auto opacity-70" />
            <div className="text-white text-sm font-bold font-heading">{title}</div>
          </div>
        </div>
      )}

      {/* Cinematic dark gradient overlay for crisp text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-black/20 pointer-events-none" />

      {/* Top Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
        <span className="text-[11px] font-bold text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-sm">
          {badge}
        </span>
        <span className="text-[11px] font-semibold text-white/90 bg-[#171717]/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1">
          <Mountain className="w-3.5 h-3.5 text-[#FFBF00]" />
          {photoData.altitude}
        </span>
      </div>

      {/* Bottom Photo Caption */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
        <div className="text-[#FFBF00] text-[11px] font-bold tracking-wider uppercase drop-shadow">
          {photoData.tag}
        </div>
        <h4 className="text-lg sm:text-xl font-extrabold text-white font-heading leading-tight drop-shadow line-clamp-1">
          {title}
        </h4>
      </div>
    </div>
  );
};
