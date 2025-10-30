import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import ExperienceCard from '../components/ExperienceCard';
import { fetchExperiences } from '../api/experiences';

interface ExperiencesProps {
  onSelectExperience: (id: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  onLogoClick?: () => void;
}

export default function Experiences({ onSelectExperience, searchQuery, onSearch, onLogoClick }: ExperiencesProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    fetchExperiences()
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch((e) => {
        if (mounted) setError(e?.message || 'Failed to load experiences');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredExperiences = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return items.filter((exp) =>
      exp.title.toLowerCase().includes(q) ||
      exp.location.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  return (
    <div
      className="relative min-h-screen bg-gray-50 bg-cover bg-center bg-no-repeat z-0"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-white/10 pointer-events-none z-0" />
      <div className="relative z-20 bg-white/80 backdrop-blur-sm">
        <Header onSearch={onSearch} onLogoClick={onLogoClick} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading experiences...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience._id}
                experience={experience}
                onViewDetails={onSelectExperience}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No experiences found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
