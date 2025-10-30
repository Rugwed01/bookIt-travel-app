import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import Header from '../components/Header';
import { BookingDetails } from '../types';
import { fetchExperienceById } from '../api/experiences';

interface DetailsProps {
  experienceId: string;
  onBack: () => void;
  onConfirm: (booking: BookingDetails) => void;
  onSearch?: (query: string) => void;
  onLogoClick?: () => void;
}

export default function Details({ experienceId, onBack, onConfirm, onSearch, onLogoClick }: DetailsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [experience, setExperience] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    fetchExperienceById(experienceId)
      .then((data) => {
        if (!mounted) return;
        setExperience(data);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load experience');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [experienceId]);

  const groupedSlots = useMemo(() => {
    if (!experience?.slots) return {} as Record<string, { time: string; available: number; id: string }[]>;
    const byDate: Record<string, { time: string; available: number; id: string }[]> = {};
    experience.slots.forEach((s: any) => {
      const dt = new Date(s.startTime);
      const dateLabel = dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const timeLabel = dt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      const available = Math.max(0, (s.totalCapacity || 0) - (s.bookedCount || 0));
      if (!byDate[dateLabel]) byDate[dateLabel] = [];
      byDate[dateLabel].push({ time: timeLabel, available, id: s._id });
    });
    // Initialize defaults when data arrives
    const dateKeys = Object.keys(byDate);
    if (!selectedDate && dateKeys.length > 0) {
      setSelectedDate(dateKeys[0]);
      setSelectedTime('');
      setSelectedSlotId('');
    }
    return byDate;
  }, [experience, selectedDate]);

  const price = experience?.price || 0;
  const subtotal = price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    if (!selectedSlotId) return;

    onConfirm({
      experienceId: experience._id,
      experienceName: experience.title,
      slotId: selectedSlotId,
      date: selectedDate,
      time: selectedTime,
      quantity,
      price: subtotal,
      taxes,
      total,
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={onSearch} onLogoClick={onLogoClick} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Details
          </button>
          <div className="text-center py-12 text-gray-600">Loading...</div>
        </main>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={onSearch} onLogoClick={onLogoClick} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Details
          </button>
          <div className="text-center py-12 text-red-600">{error || 'Experience not found'}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={onSearch} onLogoClick={onLogoClick} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden mb-6">
              <img
                src={experience.thumbnailUrl}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {experience.title}
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {experience.description}
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose date</h2>
              <div className="flex flex-wrap gap-3">
                {Object.keys(groupedSlots).map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime('');
                      setSelectedSlotId('');
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedDate === date
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose time</h2>
              <div className="flex flex-wrap gap-3">
                {selectedDate && groupedSlots[selectedDate]?.map((timeSlot) => {
                  const soldOut = timeSlot.available <= 0;
                  return (
                    <button
                      key={timeSlot.id}
                      onClick={() => !soldOut && (setSelectedTime(timeSlot.time), setSelectedSlotId(timeSlot.id))}
                      disabled={soldOut}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                        soldOut
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTime === timeSlot.time
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {timeSlot.time}
                      {!soldOut && (
                        <span className="ml-2 text-xs">
                          {timeSlot.available} left
                        </span>
                      )}
                      {soldOut && (
                        <span className="ml-2 text-xs">Sold out</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-3">All times are in IST (GMT +5:30)</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-sm text-gray-600">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Starts at</span>
                  <span className="text-xl font-semibold text-gray-900">₹{price}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">₹{taxes}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{total}</span>
                  </div>

                  <button
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
