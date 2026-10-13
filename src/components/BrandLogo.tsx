import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  lightBackground?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  subtitleText = '24/7 Kovai Taxi & Outstation',
  className = '',
  lightBackground = false
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-lg',
    md: 'w-10 h-10 rounded-xl text-2xl',
    lg: 'w-12 h-12 rounded-2xl text-3xl'
  }[size];

  const brandTextClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  }[size];

  const badgeClasses = {
    sm: 'text-[9px] px-1.5 py-0.5 tracking-wider',
    md: 'text-[10px] px-2 py-0.5 tracking-wider',
    lg: 'text-xs px-2.5 py-1 tracking-wider'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 group text-left ${className}`}>
      {/* Yellow rounded-square logo containing black 'C' */}
      <span
        className={`${iconSizeClasses} bg-[#FFBF00] text-[#171717] font-extrabold flex items-center justify-center font-heading shadow-md shadow-[#FFBF00]/25 group-hover:scale-105 transition-transform shrink-0`}
      >
        C
      </span>

      <div className="flex flex-col justify-center">
        {/* Intended visual hierarchy: [C logo]  C Taxi  [COIMBATORE] */}
        <div className="flex items-center gap-2 flex-wrap leading-none">
          <span
            className={`font-heading font-extrabold tracking-tight ${brandTextClasses} ${
              lightBackground ? 'text-[#171717]' : 'text-white'
            }`}
          >
            C Taxi
          </span>

          <span
            className={`${badgeClasses} font-bold rounded uppercase shrink-0 transition-colors ${
              lightBackground
                ? 'bg-[#171717] text-[#FFBF00] border border-[#171717]'
                : 'text-[#FFBF00] bg-[#FFBF00]/15 border border-[#FFBF00]/30'
            }`}
          >
            COIMBATORE
          </span>
        </div>

        {showSubtitle && (
          <span className="text-[11px] text-[#A0A09C] font-medium tracking-wide mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
