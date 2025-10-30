import api from './client';

export interface ExperienceListItem {
  _id: string;
  title: string;
  price: number;
  thumbnailUrl: string;
  location: string;
  duration: string;
}

export interface ExperienceDetail extends ExperienceListItem {
  description: string;
  imageUrls?: string[];
  slots: Array<{
    _id: string;
    startTime: string; // ISO string
    totalCapacity: number;
    bookedCount: number;
  }>;
}

export async function fetchExperiences(): Promise<ExperienceListItem[]> {
  const res = await api.get('/experiences');
  return res.data.data as ExperienceListItem[];
}

export async function fetchExperienceById(id: string): Promise<ExperienceDetail> {
  const res = await api.get(`/experiences/${id}`);
  return res.data.data as ExperienceDetail;
}


