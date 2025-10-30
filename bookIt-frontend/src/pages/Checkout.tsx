import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { BookingDetails, BookingResult, CheckoutForm } from '../types';
import { validatePromo } from '../api/promo';
import { createBooking } from '../api/bookings';

interface CheckoutProps {
  booking: BookingDetails;
  onBack: () => void;
  onPayAndConfirm: (form: CheckoutForm) => void;
  onBookingComplete?: (result: BookingResult) => void;
  onSearch?: (query: string) => void;
  onLogoClick?: () => void;
}

export default function Checkout({ booking, onBack, onPayAndConfirm, onSearch, onBookingComplete, onLogoClick }: CheckoutProps) {
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    promoCode: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [appliedCode, setAppliedCode] = useState<string>('');
  const [promoError, setPromoError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [promoLoading, setPromoLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    const newErrors: Partial<CheckoutForm> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setSubmitting(true);
      const response = await createBooking({
        userEmail: form.email,
        userName: form.fullName,
        experienceId: booking.experienceId,
        slotId: booking.slotId,
        numberOfGuests: booking.quantity,
      });

      if (response.success && response.data) {
        const result: BookingResult = {
          success: true,
          referenceId: response.data.bookingReference,
          message: response.message || 'Your booking has been confirmed successfully!',
        };
        onBookingComplete?.(result);
      } else {
        const result: BookingResult = {
          success: false,
          referenceId: '',
          message: response.message || 'Booking failed. Please try again.',
        };
        onBookingComplete?.(result);
      }
    } catch (e: any) {
      const result: BookingResult = {
        success: false,
        referenceId: '',
        message: e?.response?.data?.message || e?.message || 'Booking failed. Please try again.',
      };
      onBookingComplete?.(result);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyPromo = async () => {
    const code = form.promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError('Enter a promo code to apply savings.');
      setDiscountAmount(0);
      setAppliedCode('');
      return;
    }
    try {
      setPromoLoading(true);
      setPromoError('');
      const res = await validatePromo(code);
      if (res.success && res.isValid && res.data) {
        const { discountType, discountValue } = res.data;
        let discount = 0;
        if (discountType === 'percentage') {
          discount = Math.round(booking.total * (discountValue / 100));
        } else {
          discount = discountValue;
        }
        discount = Math.max(0, Math.min(discount, booking.total));
        setDiscountAmount(discount);
        setAppliedCode(code);
      } else {
        setPromoError(res.message || 'Invalid or expired promo code');
        setDiscountAmount(0);
        setAppliedCode('');
      }
    } catch (e: any) {
      setPromoError(e?.response?.data?.message || e?.message || 'Failed to validate promo code');
      setDiscountAmount(0);
      setAppliedCode('');
    } finally {
      setPromoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={onSearch} onLogoClick={onLogoClick} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      errors.fullName ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your name"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promoCode"
                    type="text"
                    placeholder="Promo code"
                    value={form.promoCode}
                    onChange={(e) => setForm({ ...form, promoCode: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoLoading}
                    className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {promoLoading ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-600 mt-2">{promoError}</p>
                )}
                {!promoError && appliedCode && (
                  <p className="text-xs text-green-700 mt-2">Applied: {appliedCode}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.agreeToTerms}
                  onChange={(e) => setForm({ ...form, agreeToTerms: e.target.checked })}
                  className={`mt-1 w-4 h-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 ${
                    errors.agreeToTerms ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-xs mt-1 ml-6">You must agree to the terms</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">{booking.experienceName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">{booking.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium text-gray-900">{booking.time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Qty</span>
                  <span className="font-medium text-gray-900">{booking.quantity}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{booking.price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium text-gray-900">₹{booking.taxes}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-green-700">
                    <span className="">Discount{appliedCode ? ` (${appliedCode})` : ''}</span>
                    <span className="font-medium">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₹{Math.max(0, booking.total - discountAmount)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
