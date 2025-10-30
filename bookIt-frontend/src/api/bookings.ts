import api from './client';

export interface CreateBookingRequest {
  userEmail: string;
  userName: string;
  experienceId: string;
  slotId: string;
  numberOfGuests: number;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data?: {
    bookingReference: string;
    _id: string;
    totalPrice: number;
  };
}

export async function createBooking(body: CreateBookingRequest): Promise<CreateBookingResponse> {
  const res = await api.post('/bookings', body);
  return res.data as CreateBookingResponse;
}


