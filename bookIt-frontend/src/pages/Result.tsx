import { CheckCircle, XCircle } from 'lucide-react';
import Header from '../components/Header';
import { BookingResult } from '../types';

interface ResultProps {
  result: BookingResult;
  onBackToHome: () => void;
  onSearch?: (query: string) => void;
  onLogoClick?: () => void;
}

export default function Result({ result, onBackToHome, onSearch, onLogoClick }: ResultProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={onSearch} onLogoClick={onLogoClick} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            {result.success ? (
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {result.success ? 'Booking Confirmed' : 'Booking Failed'}
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            {result.success ? (
              <>
                Ref ID: <span className="font-semibold text-gray-900">{result.referenceId}</span>
              </>
            ) : (
              <span>{result.message}</span>
            )}
          </p>

          <button
            onClick={onBackToHome}
            className="px-8 py-3 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
