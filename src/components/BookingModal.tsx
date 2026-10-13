import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MessageSquare, Car, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';
import { trackEvent } from '../utils/tracking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: any;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, bookingDetails }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number so our driver can reach you.');
      return;
    }
    setErrorMessage('');
    // Open the dispatch conversation directly from the user's submit gesture. The customer
    // must still tap Send in WhatsApp; this static site cannot silently deliver a message.
    const dispatchUrl = `${WHATSAPP_URL}?text=${formattedWhatsAppText}`;
    window.open(dispatchUrl, '_blank', 'noopener,noreferrer');
    trackEvent('booking_handoff', { service_type: String(bookingDetails?.serviceType || 'unspecified') });
    setIsSubmitted(true);
  };

  const formattedWhatsAppText = encodeURIComponent(
    `Hello C Taxi,\nI have submitted an instant booking request for Coimbatore:\n` +
    `• Name: ${customerName || 'Customer'}\n` +
    `• Phone: ${customerPhone}\n` +
    `• Pickup: ${pickupAddress || bookingDetails?.pickup || 'Coimbatore'}\n` +
    `• Drop: ${bookingDetails?.drop || 'Destination'}\n` +
    `• Vehicle: ${bookingDetails?.vehicle || 'AC Sedan'}\n` +
    `• Date & Time: ${bookingDetails?.date || 'Today'} at ${bookingDetails?.time || 'Immediate'}\n` +
    `• Estimated Fare: ~₹${bookingDetails?.estimatedPrice?.toLocaleString('en-IN') || 'Quote'}\n` +
    `• Notes: ${specialNotes || 'None'}\n\nPlease dispatch cab & confirm driver details.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white border border-[#E5E5E0] rounded-2xl shadow-2xl overflow-hidden text-[#171717]"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E5E5E0] bg-[#F5F5F2]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#FFBF00] text-[#171717] font-extrabold flex items-center justify-center font-heading text-lg">
              C
            </span>
            <div>
              <h3 className="text-base font-bold text-[#171717] font-heading flex items-center gap-2">
                <span>C Taxi</span>
                <span className="text-[10px] font-bold text-[#171717] bg-[#FFBF00] px-1.5 py-0.5 rounded uppercase tracking-wider">
                  COIMBATORE
                </span>
              </h3>
              <p className="text-[11px] text-[#626262]">
                15-Min Doorstep Dispatch Across Coimbatore
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#626262] hover:text-[#171717] hover:bg-neutral-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#171717] font-heading">Finish Sending Your Booking</h4>
                <p className="text-xs sm:text-sm text-[#626262] mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#171717]">{customerName || 'Customer'}</strong>. Your booking details are prepared for WhatsApp. Please send the message to deliver your request to C Taxi dispatch.
                </p>
                <p className="text-xs text-[#171717] mt-2 font-bold bg-[#FFBF00]/20 p-2 rounded-lg border border-[#FFBF00]/40">
                  Your request is not sent until you tap Send in WhatsApp. If WhatsApp did not open, use the button below.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex flex-col gap-2.5">
                <a
                  href={`${WHATSAPP_URL}?text=${formattedWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all shadow-md shadow-[#25D366]/20"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Open WhatsApp Booking Message</span>
                </a>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-[#171717] bg-[#F5F5F2] hover:bg-[#EAEAE5] border border-[#E5E5E0] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FFBF00]" />
                  <span>Need Immediate Cab? Call Dispatch ({DISPLAY_PHONE})</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#626262] hover:text-[#171717] pt-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Ride Summary Quick Snippet */}
              {bookingDetails && (
                <div className="p-3.5 rounded-xl bg-[#F5F5F2] border border-[#E5E5E0] text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-[#626262]">
                    <span className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-[#FFBF00]" /> Vehicle:
                    </span>
                    <strong className="text-[#171717]">{bookingDetails.vehicle}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[#626262]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FFBF00]" /> Route:
                    </span>
                    <span className="truncate max-w-[200px] text-right font-medium text-[#171717]">
                      {bookingDetails.pickup} → {bookingDetails.drop}
                    </span>
                  </div>
                  {bookingDetails.estimatedPrice && (
                    <div className="flex justify-between items-center pt-1.5 border-t border-[#E5E5E0]">
                      <span>Estimated Fare:</span>
                      <strong className="text-[#171717] font-mono text-sm tabular-nums font-extrabold">
                        ₹{bookingDetails.estimatedPrice.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Passenger Name */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-[#F5F5F2] border border-[#E5E5E0] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1 flex items-center justify-between">
                  <span>Mobile Number for Driver Coordination</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">10-digit mobile</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-[#626262] select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9089223344"
                    className="w-full bg-[#F5F5F2] border border-[#E5E5E0] rounded-xl pl-11 pr-3 py-2.5 text-xs sm:text-sm text-[#171717] font-mono tracking-wider focus:outline-none focus:border-[#FFBF00]"
                  />
                </div>
              </div>

              {/* Exact Pickup Address / Landmark */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Exact Pickup Landmark / Street
                </label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="e.g. Near PSG Tech Main Gate, Avinashi Road"
                  className="w-full bg-[#F5F5F2] border border-[#E5E5E0] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#FFBF00]"
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Luggage or Pickup Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. 2 large luggage bags, early morning flight drop"
                  className="w-full bg-[#F5F5F2] border border-[#E5E5E0] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#FFBF00] resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-[#171717] bg-[#FFBF00] hover:bg-[#E5AC00] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  <span>Submit & Request Chauffeur</span>
                </button>

                <div className="text-center">
                  <span className="text-[11px] text-[#626262]">Prefer WhatsApp? </span>
                  <a
                    href={`${WHATSAPP_URL}?text=${formattedWhatsAppText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#25D366] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>Send details to WhatsApp (9089223344)</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Modal Bottom Security Note */}
        <div className="p-3 bg-[#F5F5F2] border-t border-[#E5E5E0] text-[11px] text-[#626262] text-center">
          🔒 Your contact details are strictly used for driver dispatch coordination. Zero spam.
        </div>

      </div>
    </div>
  );
};
