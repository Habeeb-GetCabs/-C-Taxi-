import React, { useState } from 'react';
import { ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { FAQS, PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-12 lg:py-18 bg-[#F5F2EA] border-b border-[#E5E0D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#171717] bg-[#FFBF00] px-2.5 py-1 rounded-md shadow-xs">
            Got Questions? We Have Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#777777] max-w-2xl mx-auto">
            Everything you need to know about our local taxi rides, outstation pricing, and CJB airport transfers.
          </p>
        </div>

        {/* FAQ Accordion List - Pure White Cards against Warm Ivory */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none transition-colors hover:text-[#E5AC00]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#171717]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#171717] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#777777] leading-relaxed border-t border-[#E5E0D8]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="bg-[#171717] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div>
            <h3 className="font-bold text-base sm:text-lg font-heading text-white">Have a specific route or package inquiry?</h3>
            <p className="text-xs text-[#A0A09C] mt-1">Our Coimbatore dispatch team is available 24/7 on call and WhatsApp.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="px-4 py-2.5 rounded-xl bg-[#FFBF00] hover:bg-[#E5AC00] text-[#171717] font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              Call {DISPLAY_PHONE}
            </a>
            <a
              href={`${WHATSAPP_URL}?text=Hello%20C%20Taxi%2C%20I%20have%20a%20question`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
