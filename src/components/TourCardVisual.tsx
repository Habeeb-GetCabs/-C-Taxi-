import React from 'react';
import { Mountain, Compass, MapPin, Sparkles, Sun, CloudRain } from 'lucide-react';

interface TourCardVisualProps {
  slug: string;
  title: string;
  badge: string;
  className?: string;
}

export const TourCardVisual: React.FC<TourCardVisualProps> = ({ slug, title, badge, className = '' }) => {
  // Domain-authentic visual graphics with clean gradient mesh and landmark silhouettes
  if (slug === 'ooty-coonoor-kotagiri') {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-neutral-950 p-6 flex flex-col justify-between border-b border-neutral-800 ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        
        {/* Mountain Silhouette SVG */}
        <div className="absolute bottom-0 right-0 left-0 h-28 opacity-30 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full text-emerald-400 fill-current">
            <path d="M0,150 L0,90 L60,40 L130,95 L190,30 L260,85 L340,15 L420,70 L500,35 L500,150 Z" />
          </svg>
        </div>

        {/* 36 Hairpins Decorative Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/40">
            {badge}
          </span>
          <span className="text-[11px] font-mono font-semibold text-neutral-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
            <Mountain className="w-3.5 h-3.5 text-emerald-400" /> 2,240m Altitude
          </span>
        </div>

        <div className="relative z-10 mt-10">
          <div className="text-amber-400 font-mono text-xs font-bold tracking-wider uppercase mb-1">
            Nilgiri Circuit · 36 Hairpin Certified
          </div>
          <h4 className="text-xl sm:text-2xl font-extrabold text-white font-heading leading-tight">
            {title}
          </h4>
          <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
            Tea Estates · Doddabetta Peak · Sim's Park · Catherine Falls
          </p>
        </div>
      </div>
    );
  }

  if (slug === 'marudhamalai-isha-kovai-kutralam') {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950 via-neutral-900 to-indigo-950 p-6 flex flex-col justify-between border-b border-neutral-800 ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        
        {/* Sacred Hill & Water Silhouette */}
        <div className="absolute bottom-0 right-0 left-0 h-28 opacity-25 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full text-amber-400 fill-current">
            <path d="M0,150 L0,110 L100,50 L200,120 L270,30 L380,100 L450,60 L500,90 L500,150 Z" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-500/40">
            {badge}
          </span>
          <span className="text-[11px] font-mono font-semibold text-neutral-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Adiyogi 112ft Show
          </span>
        </div>

        <div className="relative z-10 mt-10">
          <div className="text-amber-400 font-mono text-xs font-bold tracking-wider uppercase mb-1">
            Spiritual & Siruvani Nature Circuit
          </div>
          <h4 className="text-xl sm:text-2xl font-extrabold text-white font-heading leading-tight">
            {title}
          </h4>
          <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
            Marudhamalai Shrine · Adiyogi 3D Laser · Kovai Kutralam Falls
          </p>
        </div>
      </div>
    );
  }

  if (slug === 'palani-temple-pilgrimage') {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950 via-yellow-950 to-neutral-950 p-6 flex flex-col justify-between border-b border-neutral-800 ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        
        {/* Temple Gopuram Silhouette */}
        <div className="absolute bottom-0 right-4 h-32 opacity-25 pointer-events-none">
          <svg viewBox="0 0 100 120" className="h-full w-auto text-amber-400 fill-current">
            <polygon points="50,5 30,30 70,30" />
            <polygon points="50,25 20,60 80,60" />
            <polygon points="50,55 10,95 90,95" />
            <rect x="15" y="95" width="70" height="25" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-500/40">
            {badge}
          </span>
          <span className="text-[11px] font-mono font-semibold text-neutral-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
            <Sun className="w-3.5 h-3.5 text-amber-400" /> Arupadaiveedu Darshan
          </span>
        </div>

        <div className="relative z-10 mt-10">
          <div className="text-amber-400 font-mono text-xs font-bold tracking-wider uppercase mb-1">
            Holy Murugan Darshan · 105 km
          </div>
          <h4 className="text-xl sm:text-2xl font-extrabold text-white font-heading leading-tight">
            {title}
          </h4>
          <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
            Palani Hill Temple · Winch & Ropeway Drop · Panchamirtham Prasadam
          </p>
        </div>
      </div>
    );
  }

  // Valparai / Kodaikanal
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-teal-950 via-neutral-900 to-emerald-950 p-6 flex flex-col justify-between border-b border-neutral-800 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-bold text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-500/40">
          {badge}
        </span>
        <span className="text-[11px] font-mono font-semibold text-neutral-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
          <Compass className="w-3.5 h-3.5 text-teal-400" /> Western Ghats Tour
        </span>
      </div>

      <div className="relative z-10 mt-10">
        <div className="text-amber-400 font-mono text-xs font-bold tracking-wider uppercase mb-1">
          Scenic Tour Package
        </div>
        <h4 className="text-xl sm:text-2xl font-extrabold text-white font-heading leading-tight">
          {title}
        </h4>
        <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
          Dedicated Chauffeur · Sanitized AC Fleet · Complete Itinerary
        </p>
      </div>
    </div>
  );
};
