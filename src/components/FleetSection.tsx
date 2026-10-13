import React from 'react';
import { Users, Briefcase, Check, ArrowRight, Mountain } from 'lucide-react';
import { VEHICLE_FLEET } from '../data/taxiData';

interface FleetSectionProps {
  onSelectFleet: (vehicleId: string) => void;
  onNavigateToBooking?: () => void;
}

const FLEET_PHOTOS: Record<string, string> = {
  'sedan': '/images/fleet/fleet-prime-sedan.webp',
  'suv_ertiga': '/images/fleet/fleet-family-suv.webp',
  'premium_suv': '/images/fleet/fleet-innova-crysta.webp'
};

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectFleet, onNavigateToBooking }) => {
  return (
    <section id="fleet-rates" className="py-12 lg:py-18 bg-[#F5F2EA] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
              Sanitized AC Fleet
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
              C Taxi Fleet &amp; Vehicle Options
            </h2>
            <p className="text-sm sm:text-base text-[#777777]">
              Clean, well-maintained commercial vehicles with verified chauffeurs. Prime Sedans, 6-Seater Family SUVs, and Premium Innova Crystas.
            </p>
          </div>

          <div className="text-xs text-[#777777] bg-white px-3.5 py-2 rounded-xl border border-[#E5E0D8] self-start md:self-auto shadow-xs">
            <span className="text-[#171717] font-bold">Driver Batta: ₹500/day</span> · Commercial Yellow Board T-Permit
          </div>
        </div>

        {/* 3 Fleet Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VEHICLE_FLEET.map((vehicle) => {
            const photo = FLEET_PHOTOS[vehicle.id] || FLEET_PHOTOS['sedan'];
            return (
              <div
                key={vehicle.id}
                className="bg-white border border-[#E5E0D8] hover:border-[#FFBF00] rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-sm hover:shadow-md group"
              >
                <div>
                  
                  {/* Photo Header */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img 
                      src={photo} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#FFBF00] text-[#171717]">
                        {vehicle.category}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        ₹{vehicle.ratePerKm}/km
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h3 className="text-xl font-extrabold text-white font-heading drop-shadow">
                        {vehicle.name}
                      </h3>
                      <p className="text-[11px] text-[#FFBF00] font-semibold">
                        {vehicle.models}
                      </p>
                    </div>
                  </div>

                  {/* Core Capacity & Specs */}
                  <div className="p-5 space-y-3.5">
                    <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#777777] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#171717]" /> Passenger Capacity
                        </span>
                        <strong className="text-[#171717]">{vehicle.capacity}</strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#777777] flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#171717]" /> Luggage Capacity
                        </span>
                        <strong className="text-[#171717]">{vehicle.luggage}</strong>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#E5E0D8] pt-1.5">
                        <span className="text-[#777777]">Outstation Rate</span>
                        <strong className="text-[#171717] text-sm font-extrabold font-mono">
                          ₹{vehicle.ratePerKm} / km
                        </strong>
                      </div>

                      {vehicle.hillCharge > 0 && (
                        <div className="flex items-center justify-between text-[11px] text-[#777777]">
                          <span className="flex items-center gap-1">
                            <Mountain className="w-3 h-3 text-[#171717]" /> Hill Safety Charge
                          </span>
                          <span className="font-bold text-[#171717]">+₹{vehicle.hillCharge}</span>
                        </div>
                      )}
                    </div>

                    {/* Features Bullet List */}
                    <div className="space-y-1.5 text-xs text-[#777777]">
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#FFBF00] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

                {/* Card Action */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#E5E0D8]">
                    <p className="text-[11px] text-[#777777] mb-2.5 leading-snug">
                      Best for: <span className="text-[#171717] font-semibold">{vehicle.recommendedFor}</span>
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectFleet(vehicle.id);
                        if (onNavigateToBooking) onNavigateToBooking();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                    >
                      <span>Book {vehicle.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
