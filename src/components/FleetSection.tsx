import React from 'react';
import { Users, Briefcase, Wind, Check, ArrowRight, ShieldCheck, Mountain } from 'lucide-react';
import { VEHICLE_FLEET, PHONE_NUMBER, DISPLAY_PHONE } from '../data/taxiData';

interface FleetSectionProps {
  onSelectFleet: (vehicleId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectFleet }) => {
  return (
    <section id="fleet-rates" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Sanitized AC Fleet & Transparent Rates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight" style={{ textWrap: 'balance' }}>
              C Taxi Fleet Specifications & Kilometer Rates
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Clean, well-maintained commercial tourist vehicles. Dedicated Prime Sedans, 6-Seater Family SUVs, and Premium Innova Crystas.
            </p>
          </div>

          <div className="text-xs text-neutral-400 hidden sm:block">
            <span className="text-emerald-400 font-semibold">Driver Batta: ₹500/day</span> · Yellow Board T-Permit
          </div>
        </div>

        {/* 3 Fleet Categories (Strictly NO Hatchback) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VEHICLE_FLEET.map((vehicle) => {
            return (
              <div
                key={vehicle.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md group"
              >
                <div>
                  
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-amber-400">
                      {vehicle.category}
                    </span>
                    <span className="text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      AC Standard
                    </span>
                  </div>

                  {/* Title & Models */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-5 font-medium">
                    {vehicle.models}
                  </p>

                  {/* Dual Rate Breakdown Box (Local + Outstation) */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 mb-5 space-y-3">
                    
                    {/* Outstation Rate */}
                    <div>
                      <div className="text-[11px] text-neutral-400 uppercase font-bold tracking-wider mb-0.5">
                        Outstation Rate
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white font-heading tabular-nums">
                          ₹{vehicle.ratePerKm}
                        </span>
                        <span className="text-xs text-neutral-400 font-medium">/ km</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Min 250 km/day · Driver Batta: <span className="text-neutral-200 font-semibold">₹500/day</span>
                      </div>
                    </div>

                    {/* Local City Ride Rate */}
                    <div className="pt-2 border-t border-neutral-850">
                      <div className="text-[11px] text-neutral-400 uppercase font-bold tracking-wider mb-0.5">
                        Local City Rides
                      </div>
                      <div className="text-sm font-bold text-emerald-400">
                        Standard Meter Fare · Zero Peak Surge
                      </div>
                    </div>

                    {/* Hill Safety Charge (if applicable) */}
                    {vehicle.hillCharge > 0 && (
                      <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-[11px] text-amber-300/90 font-medium">
                        <span className="flex items-center gap-1">
                          <Mountain className="w-3.5 h-3.5 text-amber-400" />
                          Hill Station Safety Charge:
                        </span>
                        <span className="tabular-nums font-bold">+₹{vehicle.hillCharge}</span>
                      </div>
                    )}

                  </div>

                  {/* Capacity Specs */}
                  <div className="space-y-2.5 text-xs text-neutral-300 mb-5 pb-5 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{vehicle.luggage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Chilled Air Conditioning</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2 mb-6 text-xs text-neutral-400">
                    {vehicle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectFleet(vehicle.id);
                    const el = document.getElementById('fare-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
                >
                  <span>Select {vehicle.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Dispatch Helpline */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All rates include commercial T-permit, vehicle maintenance, and fuel. Toll fees and parking at actuals.
            </span>
          </div>
          <a href={`tel:${PHONE_NUMBER}`} className="text-amber-400 hover:underline font-semibold whitespace-nowrap">
            Have a custom tour inquiry? Call {DISPLAY_PHONE} →
          </a>
        </div>

      </div>
    </section>
  );
};
