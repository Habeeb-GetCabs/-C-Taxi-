import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MessageSquare, Car, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_URL } from '../data/taxiData';

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
    setIsSubmitted(true);
  };

  const formattedWhatsAppText = encodeURIComponent(
    `Hello C Taxi Coimbatore,\nI have submitted an instant booking request:\n` +
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-extrabold flex items-center justify-center font-heading text-lg">
              C
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Confirm C Taxi Booking
              </h3>
              <p className="text-[11px] text-neutral-400">
                15-Min Doorstep Dispatch across Coimbatore
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white font-heading">Booking Request Received!</h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{customerName || 'Customer'}</strong>. Our Coimbatore dispatch team has received your booking for{' '}
                  <strong>{bookingDetails?.vehicle || 'your cab'}</strong>.
                </p>
                <p className="text-xs text-amber-400 mt-1 font-semibold">
                  Driver details will be sent to {customerPhone} via SMS & WhatsApp within 2–5 minutes.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
                <a
                  href={`${WHATSAPP_URL}?text=${formattedWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-400/20"
                >
                  <MessageSquare className="w-4 h-4 fill-neutral-950" />
                  <span>Send Direct WhatsApp Confirmation</span>
                </a>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Need Immediate Cab? Call Dispatch ({DISPLAY_PHONE})</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-neutral-400 hover:text-white pt-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Ride Summary Quick Snippet */}
              {bookingDetails && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-neutral-300">
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <Car className="w-3.5 h-3.5 text-amber-400" /> Vehicle:
                    </span>
                    <strong className="text-white">{bookingDetails.vehicle}</strong>
                  </div>
                  <div className="flex justify-between items-center text-neutral-300">
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> Route:
                    </span>
                    <span className="truncate max-w-[200px] text-right text-neutral-200">
                      {bookingDetails.pickup} → {bookingDetails.drop}
                    </span>
                  </div>
                  {bookingDetails.estimatedPrice && (
                    <div className="flex justify-between items-center pt-1.5 border-t border-neutral-900">
                      <span className="text-neutral-400">Estimated Fare:</span>
                      <strong className="text-amber-400 font-mono text-sm tabular-nums">
                        ₹{bookingDetails.estimatedPrice.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Passenger Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center justify-between">
                  <span>Mobile Number for Driver Coordination</span>
                  <span className="text-[11px] text-amber-400">Required</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-12 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Exact Pickup Address */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Exact Pickup Address / Landmark in Coimbatore
                </label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="e.g. Near PSG Tech / DB Road / Railway Station Gate 2"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Luggage / Flight Number / Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Indigo Flight 6E-241 arriving at 3:15 PM, 3 heavy suitcases"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20 active:scale-[0.99]"
                >
                  <span>Confirm Cab Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <span className="text-[11px] text-neutral-400">or book directly in 1 second via</span>{' '}
                  <a
                    href={`${WHATSAPP_URL}?text=${formattedWhatsAppText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-400 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
