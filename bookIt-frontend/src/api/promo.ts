import api from './client';

export interface ValidatePromoResponse {
  success: boolean;
  isValid: boolean;
  data?: {
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
  };
  message?: string;
}

export async function validatePromo(code: string): Promise<ValidatePromoResponse> {
  const res = await api.post('/promo/validate', { code });
  return res.data as ValidatePromoResponse;
}


