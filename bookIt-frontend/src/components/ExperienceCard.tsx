interface ExperienceCardProps {
  experience: {
    id?: string;
    _id?: string;
    title: string;
    location: string;
    price: number;
    image?: string;
    thumbnailUrl?: string;
    description?: string;
  };
  onViewDetails: (id: string) => void;
}

export default function ExperienceCard({ experience, onViewDetails }: ExperienceCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={experience.thumbnailUrl || experience.image || ''}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{experience.title}</h3>
          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded whitespace-nowrap ml-2">
            {experience.location}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {experience.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">From</span>
            <span className="text-xl font-semibold text-gray-900">₹{experience.price}</span>
          </div>

          <button
            onClick={() => onViewDetails((experience._id || experience.id) as string)}
            className="px-4 py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
