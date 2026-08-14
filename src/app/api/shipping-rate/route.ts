import { NextResponse } from 'next/server';
import type {
  ShippingRateRequestBody,
  ShippingRateApiResponse,
  AgenWebsiteRateResponse,
  AgenWebsiteRateItem,
  ShippingRateItem,
} from '@/types/shipping';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DEFAULT_COURIERS = ['jnt', 'tiki'] as const;
const AGENWEBSITE_API_BASE = 'https://api.agenwebsite.com/v1';

// Helper to format currency fallback
function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('IDR', 'Rp').trim();
}

// Helper to format ETD text to Indonesian
function formatEtdText(rate: AgenWebsiteRateItem): string {
  if (rate.etd_text && rate.etd_text.trim() !== '') {
    return rate.etd_text
      .replace(/days?/gi, 'hari')
      .replace(/–/g, '-')
      .trim();
  }
  if (rate.etd_min_days && rate.etd_max_days) {
    if (rate.etd_min_days === rate.etd_max_days) {
      return `${rate.etd_min_days} hari`;
    }
    return `${rate.etd_min_days}–${rate.etd_max_days} hari`;
  }
  if (rate.etd_min_days) {
    return `${rate.etd_min_days} hari`;
  }
  return 'Estimasi waktu tidak tersedia';
}

export async function POST(request: Request): Promise<NextResponse<ShippingRateApiResponse>> {
  try {
    // 1. Parse and validate request body
    let body: Partial<ShippingRateRequestBody>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: 'Format JSON pada request tidak valid.',
        },
        { status: 400 }
      );
    }

    const { originPostalCode, destinationPostalCode, weight, couriers, courier } = body;

    const origin = typeof originPostalCode === 'string' ? originPostalCode.trim() : '';
    const destination = typeof destinationPostalCode === 'string' ? destinationPostalCode.trim() : '';
    const numericWeight = typeof weight === 'number' ? weight : Number(weight);

    // Validation: Origin Postal Code
    if (!origin) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: 'Silakan masukkan kode pos asal.',
        },
        { status: 400 }
      );
    }

    if (!/^\d{5}$/.test(origin)) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: 'Kode pos asal harus terdiri dari 5 digit angka.',
        },
        { status: 400 }
      );
    }

    // Validation: Destination Postal Code
    if (!destination) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: 'Silakan masukkan kode pos tujuan.',
        },
        { status: 400 }
      );
    }

    if (!/^\d{5}$/.test(destination)) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: 'Kode pos tujuan harus terdiri dari 5 digit angka.',
        },
        { status: 400 }
      );
    }

    // Validation: Package Weight
    if (isNaN(numericWeight) || numericWeight <= 0) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: 'Berat paket harus lebih dari 0.',
        },
        { status: 400 }
      );
    }

    // Weight must be an integer (in grams)
    const weightInGrams = Math.round(numericWeight);

    // Determine requested couriers list
    let selectedCouriers: string[] = [...DEFAULT_COURIERS];
    if (Array.isArray(couriers) && couriers.length > 0) {
      selectedCouriers = couriers.map((c) => String(c).trim().toLowerCase()).filter(Boolean);
    } else if (typeof courier === 'string' && courier.trim() !== '') {
      selectedCouriers = [courier.trim().toLowerCase()];
    }

    if (selectedCouriers.length === 0) {
      selectedCouriers = [...DEFAULT_COURIERS];
    }

    // 2. Validate Server-Side Environment Variable
    const apiKey = process.env.AGENWEBSITE_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      console.error(
        '[Shipping Rate API] Error: AGENWEBSITE_API_KEY: missing (belum dikonfigurasi pada server).'
      );
      return NextResponse.json(
        {
          success: false,
          statusCode: 503,
          message:
            'Layanan cek ongkir belum dikonfigurasi pada server (AGENWEBSITE_API_KEY tidak ditemukan).',
          error: {
            code: 'missing_api_key',
            message: 'Environment variable AGENWEBSITE_API_KEY is not set.',
          },
        },
        { status: 503 }
      );
    }

    // 3. Prepare payload for AgenWebsite Rate API
    const apiPayload = {
      shipper: {
        postal_code: origin,
        zipcode: origin,
      },
      destination: {
        postal_code: destination,
        zipcode: destination,
      },
      weight: weightInGrams,
      couriers: selectedCouriers,
      sort: 'cheapest',
    };

    // Safe server logging (NO secret / token exposed)
    console.log('[Shipping Rate API] Calling AgenWebsite Rate API:', {
      endpoint: `${AGENWEBSITE_API_BASE}/rates`,
      shipperPostalCode: origin,
      destinationPostalCode: destination,
      weightGrams: weightInGrams,
      couriers: selectedCouriers,
      statusKey: 'AGENWEBSITE_API_KEY: configured',
    });

    // 4. Call AgenWebsite Rate API with 10s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    let apiResponse: Response;
    try {
      apiResponse = await fetch(`${AGENWEBSITE_API_BASE}/rates`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey.trim(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
        signal: controller.signal,
        cache: 'no-store',
      });
    } catch (fetchErr: unknown) {
      clearTimeout(timeoutId);
      if (fetchErr instanceof Error && fetchErr.name === 'AbortError') {
        console.error('[Shipping Rate API] Timeout: AgenWebsite API tidak merespons dalam 10 detik.');
        return NextResponse.json(
          {
            success: false,
            statusCode: 504,
            message: 'Koneksi timeout ke server kurir AgenWebsite. Silakan coba beberapa saat lagi.',
            error: {
              code: 'gateway_timeout',
              message: 'Upstream request timed out after 10000ms.',
            },
          },
          { status: 504 }
        );
      }

      console.error('[Shipping Rate API] Network Error saat menghubungi AgenWebsite:', {
        errorName: fetchErr instanceof Error ? fetchErr.name : 'UnknownError',
        errorMessage: fetchErr instanceof Error ? fetchErr.message : 'Network failure',
      });

      return NextResponse.json(
        {
          success: false,
          statusCode: 502,
          message: 'Gagal terhubung ke server AgenWebsite Rate API. Silakan periksa jaringan server.',
          error: {
            code: 'bad_gateway',
            message: 'Network connection failure to upstream provider.',
          },
        },
        { status: 502 }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    // 5. Parse response from provider
    let responseData: AgenWebsiteRateResponse | null = null;
    try {
      responseData = (await apiResponse.json()) as AgenWebsiteRateResponse;
    } catch {
      console.error(
        '[Shipping Rate API] Response dari AgenWebsite bukan JSON yang valid. Status:',
        apiResponse.status
      );
      return NextResponse.json(
        {
          success: false,
          statusCode: 502,
          message: `Server AgenWebsite mengembalikan respons non-JSON (HTTP Status ${apiResponse.status}).`,
          error: {
            code: 'invalid_json_response',
            message: `Upstream returned status ${apiResponse.status} with non-JSON payload.`,
          },
        },
        { status: 502 }
      );
    }

    // Safe logging of AgenWebsite result
    console.log('[Shipping Rate API] Response from AgenWebsite received:', {
      httpStatus: apiResponse.status,
      success: responseData?.success ?? false,
      errorCode: responseData?.error?.code,
      requestId: responseData?.error?.request_id,
      ratesCount: responseData?.data?.rates?.length ?? 0,
    });

    // 6. Handle error responses from AgenWebsite
    if (!apiResponse.ok || !responseData || responseData.success !== true) {
      const errorCode = responseData?.error?.code;
      const upstreamMessage = responseData?.error?.message;
      const requestId = responseData?.error?.request_id;
      const field = responseData?.error?.field;

      // 401 Unauthorized (Invalid / Missing API Key in AgenWebsite)
      if (apiResponse.status === 401 || errorCode === 'unauthorized') {
        return NextResponse.json(
          {
            success: false,
            statusCode: 401,
            message:
              'Autentikasi ke AgenWebsite gagal (API Key tidak valid atau telah dicabut). Periksa kembali AGENWEBSITE_API_KEY.',
            error: {
              code: 'unauthorized',
              message: upstreamMessage || 'Invalid or missing API key.',
              request_id: requestId,
            },
          },
          { status: 401 }
        );
      }

      // 404 Not Found (Shipper or Destination not found)
      if (
        apiResponse.status === 404 ||
        errorCode === 'shipper_not_found' ||
        errorCode === 'destination_not_found'
      ) {
        return NextResponse.json(
          {
            success: false,
            statusCode: 404,
            message:
              upstreamMessage ||
              'Lokasi pengiriman tidak ditemukan. Silakan periksa kembali kode pos asal dan tujuan.',
            error: {
              code: errorCode || 'location_not_found',
              message: upstreamMessage,
              field,
              request_id: requestId,
            },
          },
          { status: 404 }
        );
      }

      // 429 Rate Limit Exceeded
      if (apiResponse.status === 429 || errorCode === 'rate_limit_exceeded') {
        return NextResponse.json(
          {
            success: false,
            statusCode: 429,
            message:
              'Batas kuota harian atau frekuensi request AgenWebsite telah tercapai. Silakan coba lagi nanti.',
            error: {
              code: 'rate_limit_exceeded',
              message: upstreamMessage || 'Rate limit exceeded.',
              request_id: requestId,
            },
          },
          { status: 429 }
        );
      }

      // 400 / 422 Validation Error or Unsupported Courier
      if (
        apiResponse.status === 400 ||
        apiResponse.status === 422 ||
        errorCode === 'validation_error' ||
        errorCode === 'unsupported_courier'
      ) {
        return NextResponse.json(
          {
            success: false,
            statusCode: apiResponse.status,
            message:
              upstreamMessage ||
              'Data permintaan tarif tidak valid. Silakan periksa kembali kode pos, berat paket, atau kurir yang dipilih.',
            error: {
              code: errorCode || 'validation_error',
              message: upstreamMessage,
              field,
              request_id: requestId,
            },
          },
          { status: apiResponse.status }
        );
      }

      // 502 / Upstream Courier Error (e.g. courier_upstream_error)
      if (apiResponse.status === 502 || errorCode === 'courier_upstream_error') {
        const readableCouriers = selectedCouriers
          .map((c) => (c === 'tiki' ? 'TIKI' : c === 'jnt' ? 'J&T Express' : c))
          .join(' / ');

        return NextResponse.json(
          {
            success: false,
            statusCode: 502,
            message: `Layanan kurir ${readableCouriers} sedang tidak dapat dijangkau atau mengalami kendala jaringan dari pihak ekspedisi untuk rute ini.`,
            error: {
              code: 'courier_upstream_error',
              message: upstreamMessage || 'Failed to fetch rates from courier upstream server.',
              request_id: requestId,
            },
          },
          { status: 502 }
        );
      }

      // Other 500/502/upstream errors
      return NextResponse.json(
        {
          success: false,
          statusCode: apiResponse.status || 502,
          message:
            upstreamMessage ||
            `Layanan kurir AgenWebsite mengembalikan error (HTTP ${apiResponse.status}). Silakan coba beberapa saat lagi.`,
          error: {
            code: errorCode || 'upstream_error',
            message: upstreamMessage || `Upstream returned status ${apiResponse.status}`,
            request_id: requestId,
          },
        },
        { status: apiResponse.status >= 400 && apiResponse.status < 600 ? apiResponse.status : 502 }
      );
    }

    // 7. Format and normalize successful rates
    const rawRates: AgenWebsiteRateItem[] = Array.isArray(responseData?.data?.rates)
      ? responseData.data.rates
      : [];

    const formattedRates: ShippingRateItem[] = rawRates.map((rate) => {
      const costNumber = typeof rate.cost === 'number' ? rate.cost : 0;
      const courierCode = (rate.courier_code || 'jnt').toLowerCase();
      let courierName = rate.courier_name || 'J&T Express';
      if (courierCode === 'tiki') courierName = 'TIKI';
      if (courierCode === 'jnt') courierName = 'J&T Express';

      return {
        courier_code: courierCode,
        courier_name: courierName,
        courier_logo_url:
          rate.courier_logo_url ||
          (courierCode === 'tiki'
            ? 'https://assets-agenwebsite.b-cdn.net/images/couriers/tiki.png'
            : 'https://assets-agenwebsite.b-cdn.net/images/couriers/jnt.png'),
        service_code: rate.service_code || `${courierCode}_reg`,
        service_name: rate.service_name || 'Regular Service',
        service_type: rate.service_type || 'regular',
        cost: costNumber,
        cost_formatted: rate.cost_formatted || formatIDR(costNumber),
        etd_min_days: rate.etd_min_days ?? null,
        etd_max_days: rate.etd_max_days ?? null,
        etd_text: formatEtdText(rate),
        estimated_delivery: rate.estimated_delivery || null,
        insurance: rate.insurance,
        discount: rate.discount ?? 0,
        discounted_cost: rate.discounted_cost ?? costNumber,
        cashback: rate.cashback ?? 0,
        cheapest: Boolean(rate.cheapest),
        fastest: Boolean(rate.fastest),
      };
    });

    // Ensure sorted by cost ascending (cheapest first)
    formattedRates.sort((a, b) => a.cost - b.cost);

    // Update cheapest flag after sort
    if (formattedRates.length > 0) {
      const minCost = formattedRates[0].cost;
      formattedRates.forEach((r) => {
        r.cheapest = r.cost === minCost;
      });
    }

    if (formattedRates.length === 0) {
      return NextResponse.json({
        success: true,
        currency: 'IDR',
        data: {
          rates: [],
          summary: {
            count: 0,
          },
        },
        message: 'Tidak ada layanan kurir yang tersedia untuk rute kode pos ini.',
      });
    }

    return NextResponse.json({
      success: true,
      currency: responseData.currency || 'IDR',
      data: {
        rates: formattedRates,
        cheapest: responseData.data?.cheapest || (formattedRates[0] ? { service_code: formattedRates[0].service_code, cost: formattedRates[0].cost } : null),
        fastest: responseData.data?.fastest || null,
        summary: responseData.data?.summary || {
          count: formattedRates.length,
          cost_range: {
            min: Math.min(...formattedRates.map((r) => r.cost)),
            max: Math.max(...formattedRates.map((r) => r.cost)),
          },
        },
      },
    });
  } catch (err: unknown) {
    console.error('[Shipping Rate API] Unhandled internal error:', {
      errorName: err instanceof Error ? err.name : 'Unknown',
      errorMessage: err instanceof Error ? err.message : 'Unknown internal error',
    });

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: 'Maaf, terjadi kesalahan internal pada server saat menghitung biaya pengiriman.',
        error: {
          code: 'internal_server_error',
          message: 'An unexpected internal error occurred.',
        },
      },
      { status: 500 }
    );
  }
}
