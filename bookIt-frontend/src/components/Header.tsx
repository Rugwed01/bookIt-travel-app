import { MapPin } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onLogoClick?: () => void;
}

export default function Header({ onSearch, onLogoClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold leading-none">highway</span>
              <span className="text-sm font-semibold leading-none">delite</span>
            </div>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search experiences"
              className="flex-1 sm:flex-none sm:w-64 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <button className="px-6 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
