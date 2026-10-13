import React from 'react';
import { ShieldCheck, Star, Clock, Award, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/taxiData';

export const TrustProofSection: React.FC = () => {
  return (
    <section id="why-c-taxi" className="py-12 lg:py-18 bg-white border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
            Coimbatore's Trusted Mobility Partner
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
            Why Coimbatore Commuters &amp; Travelers Rely on C Taxi
          </h2>
          <p className="text-sm sm:text-base text-[#777777]">
            No app cancellations, no surge shocks during rain, and no untraceable drivers. Real human dispatch with dependable accountability.
          </p>
        </div>

        {/* 3 Core Guarantees Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#FFBF00] text-[#171717] flex items-center justify-center mb-5 shadow-xs">
              <Clock className="w-6 h-6 text-[#171717]" />
            </div>
            <h3 className="text-lg font-bold text-[#171717] mb-2 font-heading">15-Minute Doorstep Dispatch</h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              With cabs stationed across Gandhipuram, RS Puram, Peelamedu, and Saravanampatti, your driver arrives within 15 minutes of booking confirmation.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E5E0D8] flex items-center gap-2 text-xs text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Coimbatore-wide GPS coordination</span>
            </div>
          </div>

          <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#FFBF00] text-[#171717] flex items-center justify-center mb-5 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#171717]" />
            </div>
            <h3 className="text-lg font-bold text-[#171717] mb-2 font-heading">Verified Chauffeurs &amp; Safety</h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Every driver undergoes complete background verification, polite customer etiquette training, and certified mountain road navigation skills.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E5E0D8] flex items-center gap-2 text-xs text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Safe for solo women &amp; senior citizens</span>
            </div>
          </div>

          <div className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#FFBF00] text-[#171717] flex items-center justify-center mb-5 shadow-xs">
              <Award className="w-6 h-6 text-[#171717]" />
            </div>
            <h3 className="text-lg font-bold text-[#171717] mb-2 font-heading">Zero Surge &amp; Transparent Meters</h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              The fare quoted is the fare you pay. No sudden 2x multiplication when it rains or during festival rush at Gandhipuram bus stand.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E5E0D8] flex items-center gap-2 text-xs text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant GST receipt provided</span>
            </div>
          </div>

        </div>

        {/* Verified Customer Testimonials */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
                Real Reviews
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#171717] font-heading mt-2">
                Feedback from Kovai Travelers
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[#FFBF00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FFBF00]" />
              ))}
              <span className="text-xs font-black text-[#171717] ml-1">4.9 / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#F5F2EA] border border-[#E5E0D8] rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#FFBF00]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFBF00]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#171717] bg-white px-2 py-0.5 rounded border border-[#E5E0D8]">
                      {t.trip}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#777777] leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E0D8]">
                  <div className="text-xs font-bold text-[#171717]">{t.name}</div>
                  <div className="text-[11px] text-[#777777]">{t.role} · {t.locality}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
