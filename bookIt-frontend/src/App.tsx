import { useState } from 'react';
import Experiences from './pages/Experiences';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import { BookingDetails, CheckoutForm, BookingResult } from './types';

type Page = 'experiences' | 'details' | 'checkout' | 'result';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('experiences');
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectExperience = (id: string) => {
    setSelectedExperienceId(id);
    setCurrentPage('details');
  };

  const handleConfirmBooking = (booking: BookingDetails) => {
    setBookingDetails(booking);
    setCurrentPage('checkout');
  };

  const handlePayAndConfirm = (_form: CheckoutForm) => {
    // Will be handled inside Checkout via API; this remains as navigation fallback
  };

  const handleBackToHome = () => {
    setCurrentPage('experiences');
    setSelectedExperienceId('');
    setBookingDetails(null);
    setBookingResult(null);
  };

  const handleBackFromDetails = () => {
    setCurrentPage('experiences');
    setSelectedExperienceId('');
  };

  const handleBackFromCheckout = () => {
    setCurrentPage('details');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentPage !== 'experiences') {
      setCurrentPage('experiences');
    }
  };

  const handleLogoClick = () => {
    setCurrentPage('experiences');
    setSelectedExperienceId('');
  };

  return (
    <>
      {currentPage === 'experiences' && (
        <Experiences
          onSelectExperience={handleSelectExperience}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onLogoClick={handleLogoClick}
        />
      )}

      {currentPage === 'details' && selectedExperienceId && (
        <Details
          experienceId={selectedExperienceId}
          onBack={handleBackFromDetails}
          onConfirm={handleConfirmBooking}
          onSearch={handleSearch}
          onLogoClick={handleLogoClick}
        />
      )}

      {currentPage === 'checkout' && bookingDetails && (
        <Checkout
          booking={bookingDetails}
          onBack={handleBackFromCheckout}
          onPayAndConfirm={handlePayAndConfirm}
          onBookingComplete={(result) => {
            setBookingResult(result);
            setCurrentPage('result');
          }}
          onSearch={handleSearch}
          onLogoClick={handleLogoClick}
        />
      )}

      {currentPage === 'result' && bookingResult && (
        <Result
          result={bookingResult}
          onBackToHome={handleBackToHome}
          onSearch={handleSearch}
          onLogoClick={handleLogoClick}
        />
      )}
    </>
  );
}

export default App;
