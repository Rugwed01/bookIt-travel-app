// Kept for legacy components that may still reference these shapes
export interface Experience {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  times: SlotTime[];
}

export interface SlotTime {
  time: string;
  available: number;
  soldOut: boolean;
}

export interface BookingDetails {
  experienceId: string;
  experienceName: string;
  // For backend booking API
  slotId: string;
  // For UI display
  date: string;
  time: string;
  quantity: number;
  price: number;
  taxes: number;
  total: number;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  promoCode: string;
  agreeToTerms: boolean;
}

export interface BookingResult {
  success: boolean;
  referenceId: string;
  message: string;
}

// Backend-aligned list/detail types
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
    startTime: string;
    totalCapacity: number;
    bookedCount: number;
  }>;
}
