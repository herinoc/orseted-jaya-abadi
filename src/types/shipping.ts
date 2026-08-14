export interface ShippingRateRequestBody {
  originPostalCode: string;
  destinationPostalCode: string;
  weight: number; // in grams (positive integer)
  couriers?: string[];
  courier?: string;
}

export interface ShippingRateItem {
  courier_code: string;
  courier_name: string;
  courier_logo_url?: string;
  service_code: string;
  service_name: string;
  service_type?: string;
  cost: number;
  cost_formatted: string;
  etd_min_days?: number | null;
  etd_max_days?: number | null;
  etd_text?: string | null;
  estimated_delivery?: {
    from?: string;
    to?: string;
  } | null;
  insurance?: {
    available: boolean;
    fee: number;
  };
  discount?: number;
  discounted_cost?: number;
  cashback?: number;
  cheapest?: boolean;
  fastest?: boolean;
  source?: string;
}

export interface ShippingRateSuccessResponse {
  success: true;
  currency: string;
  data: {
    rates: ShippingRateItem[];
    cheapest?: {
      service_code: string;
      cost: number;
    } | null;
    fastest?: {
      service_code: string;
      etd_max_days: number;
    } | null;
    summary?: {
      count: number;
      cost_range?: {
        min: number;
        max: number;
      };
    };
  };
  message?: string;
}

export interface ShippingRateErrorResponse {
  success: false;
  statusCode?: number;
  message: string;
  error?: {
    code?: string;
    message?: string;
    field?: string;
    request_id?: string;
  };
}

export type ShippingRateApiResponse = ShippingRateSuccessResponse | ShippingRateErrorResponse;

// Provider Types
export interface AgenWebsiteRateItem {
  courier_code?: string;
  courier_name?: string;
  courier_logo_url?: string;
  service_code?: string;
  service_name?: string;
  service_type?: string;
  cost?: number;
  cost_formatted?: string;
  etd_min_days?: number;
  etd_max_days?: number;
  etd_text?: string;
  estimated_delivery?: { from?: string; to?: string };
  insurance?: { available: boolean; fee: number };
  discount?: number;
  discounted_cost?: number;
  cashback?: number;
  cheapest?: boolean;
  fastest?: boolean;
  source?: string;
}

export interface AgenWebsiteRateResponse {
  success?: boolean;
  currency?: string;
  data?: {
    rates?: AgenWebsiteRateItem[];
    cheapest?: { service_code: string; cost: number };
    fastest?: { service_code: string; etd_max_days: number };
    summary?: {
      count: number;
      cost_range?: { min: number; max: number };
    };
  };
  error?: {
    code?: string;
    message?: string;
    field?: string;
    request_id?: string;
  };
  rate_limit?: {
    limit: number;
    remaining: number;
    reset_at: string;
  };
}
