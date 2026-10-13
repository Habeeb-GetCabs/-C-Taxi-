import React, { useState } from 'react';
import { Phone, MessageSquare, Clock, Menu, X, ChevronRight } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  onNavigate, 
  onBookClick 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'local-taxi', label: 'Local Taxi' },
    { id: 'outstation-cabs', label: 'Outstation Cabs' },
    { id: 'airport-taxi', label: 'Airport Taxi' },
    { id: 'tours', label: 'Tours & Packages' }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#171717]/95 backdrop-blur-md border-b border-neutral-800 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Wordmark & Location Badge: [C logo]  C Taxi  [COIMBATORE] */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF00] rounded-md py-1"
          aria-label="C Taxi — Coimbatore Home"
        >
          <BrandLogo size="md" showSubtitle={true} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors py-2 relative text-sm tracking-tight ${
                currentPage === item.id
                  ? 'text-[#FFBF00] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FFBF00]'
                  : 'text-[#E5E0D8] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons & Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          
          {/* WhatsApp Button */}
          <a
            href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20cab%20in%20Coimbatore`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20BD5A] rounded-xl transition-all shadow-sm active:scale-95"
            title="Chat on WhatsApp with C Taxi"
          >
            <MessageSquare className="w-4 h-4 fill-white/20" />
            <span>WhatsApp</span>
          </a>

          {/* Prominent Yellow Call Button */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] rounded-xl transition-all shadow-md shadow-[#FFBF00]/25 active:scale-95"
          >
            <Phone className="w-4 h-4 fill-[#171717]" />
            <span className="hidden sm:inline">Call: {DISPLAY_PHONE}</span>
            <span className="sm:hidden font-mono font-bold">9089223344</span>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-neutral-800 border border-neutral-750 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1E1E1E] border-b border-neutral-800 shadow-2xl px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-bold text-[#A0A09C] uppercase tracking-wider px-2 pt-1 pb-1">
            Browse Services
          </div>

          {navLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left p-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                currentPage === item.id
                  ? 'bg-[#FFBF00]/15 text-[#FFBF00] border border-[#FFBF00]/40'
                  : 'text-[#E5E0D8] hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-[#A0A09C]" />
            </button>
          ))}

          <div className="pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2">
            <a
              href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20need%20a%20cab%20in%20Coimbatore`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20BD5A] rounded-xl transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-1.5 p-2.5 text-xs font-bold text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 fill-[#171717]" />
              <span>Call Now</span>
            </a>
          </div>

        </div>
      )}

    </header>
  );
};
