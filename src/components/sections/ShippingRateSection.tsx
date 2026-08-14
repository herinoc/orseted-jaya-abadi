'use client';

import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Scale,
  Search,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle2,
  Tag,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  MessageCircle,
  CheckSquare,
  Square,
  Info,
} from 'lucide-react';
import type { ShippingRateItem, ShippingRateApiResponse } from '@/types/shipping';

type WeightUnit = 'gram' | 'kg';

interface CourierOption {
  id: string; // 'jnt' | 'tiki'
  name: string;
  tagline: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
}

const AVAILABLE_COURIERS: CourierOption[] = [
  {
    id: 'jnt',
    name: 'J&T Express',
    tagline: 'Layanan Reguler & Cepat',
    badgeColor: 'text-red-400',
    badgeBg: 'bg-red-600/20',
    badgeBorder: 'border-red-500/30',
  },
  {
    id: 'tiki',
    name: 'TIKI',
    tagline: 'Layanan Reguler, Eco & ONS',
    badgeColor: 'text-blue-400',
    badgeBg: 'bg-blue-600/20',
    badgeBorder: 'border-blue-500/30',
  },
];

export const ShippingRateSection: React.FC = () => {
  const [originPostalCode, setOriginPostalCode] = useState('');
  const [destinationPostalCode, setDestinationPostalCode] = useState('');
  const [weightInput, setWeightInput] = useState('1000');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('gram');
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>(['jnt', 'tiki']);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rates, setRates] = useState<ShippingRateItem[] | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [lastSearchedCouriers, setLastSearchedCouriers] = useState<string[]>([]);

  // Format currency fallback
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp').trim();
  };

  const handlePostalCodeChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 5);
    setter(cleaned);
    if (errorMessage) setErrorMessage(null);
  };

  const toggleCourier = (courierId: string) => {
    if (selectedCouriers.includes(courierId)) {
      if (selectedCouriers.length === 1) {
        setErrorMessage('Silakan pilih minimal satu kurir pengiriman (J&T Express atau TIKI).');
        return;
      }
      setSelectedCouriers(selectedCouriers.filter((id) => id !== courierId));
    } else {
      setSelectedCouriers([...selectedCouriers, courierId]);
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous states
    setErrorMessage(null);
    setInfoMessage(null);

    const origin = originPostalCode.trim();
    const destination = destinationPostalCode.trim();
    const parsedWeight = parseFloat(weightInput);

    // Client-side validations
    if (!origin) {
      setErrorMessage('Silakan masukkan kode pos asal.');
      return;
    }
    if (origin.length !== 5) {
      setErrorMessage('Kode pos asal harus terdiri dari 5 digit angka.');
      return;
    }

    if (!destination) {
      setErrorMessage('Silakan masukkan kode pos tujuan.');
      return;
    }
    if (destination.length !== 5) {
      setErrorMessage('Kode pos tujuan harus terdiri dari 5 digit angka.');
      return;
    }

    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      setErrorMessage('Berat paket harus lebih dari 0.');
      return;
    }

    if (selectedCouriers.length === 0) {
      setErrorMessage('Silakan pilih minimal satu kurir pengiriman (J&T Express atau TIKI).');
      return;
    }

    // Weight conversion to grams
    const weightInGrams =
      weightUnit === 'kg'
        ? Math.round(parsedWeight * 1000)
        : Math.round(parsedWeight);

    if (weightInGrams <= 0) {
      setErrorMessage('Berat paket harus lebih dari 0 gram.');
      return;
    }

    setIsLoading(true);
    setLastSearchedCouriers([...selectedCouriers]);

    try {
      const response = await fetch('/api/shipping-rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originPostalCode: origin,
          destinationPostalCode: destination,
          weight: weightInGrams,
          couriers: selectedCouriers,
        }),
      });

      const result: ShippingRateApiResponse = await response.json();

      if (!response.ok || !result.success) {
        setRates(null);
        setErrorMessage(
          result.message ||
            'Maaf, tarif pengiriman sedang tidak dapat diambil. Silakan coba lagi.'
        );
        return;
      }

      if (result.data.rates.length === 0) {
        setRates([]);
        setInfoMessage(
          result.message ||
            'Maaf, belum ada layanan pengiriman yang tersedia untuk rute ini.'
        );
      } else {
        setRates(result.data.rates);
      }
    } catch {
      setRates(null);
      setErrorMessage(
        'Maaf, tarif pengiriman sedang tidak dapat diambil. Silakan periksa koneksi internet Anda dan coba lagi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Check courier availability in current results
  const returnedCourierCodes = new Set(rates?.map((r) => r.courier_code.toLowerCase()) || []);
  const unavailableCouriers = lastSearchedCouriers
    .filter((c) => !returnedCourierCodes.has(c))
    .map((c) => (c === 'jnt' ? 'J&T Express' : c === 'tiki' ? 'TIKI' : c));

  return (
    <section
      id="shipping-rate"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070d1e] relative overflow-hidden border-t border-cyan-900/30"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-r from-cyan-950/20 via-teal-950/15 to-emerald-950/20 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
            LAYANAN PENGIRIMAN RESMI
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Cek Perkiraan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Biaya Pengiriman
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hitung dan bandingkan perkiraan ongkos kirim J&T Express dan TIKI berdasarkan asal, tujuan, dan berat paket.
          </p>
        </div>

        {/* Shipping Form Card */}
        <div className="bg-[#0c1938] rounded-3xl border border-cyan-800/40 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative">
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Courier Selection (Multi-select / Checkboxes) */}
            <div className="space-y-2.5 pb-6 border-b border-cyan-900/40">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                Pilih Ekspedisi / Kurir <span className="text-red-400">*</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {AVAILABLE_COURIERS.map((courier) => {
                  const isSelected = selectedCouriers.includes(courier.id);
                  return (
                    <button
                      key={courier.id}
                      type="button"
                      onClick={() => toggleCourier(courier.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-500/60 shadow-md shadow-cyan-950/40'
                          : 'bg-[#070d1e]/80 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-lg ${courier.badgeBg} ${courier.badgeColor} border ${courier.badgeBorder}`}>
                          {courier.name}
                        </span>
                        <div>
                          <strong className="text-sm font-bold text-white block">
                            {courier.name}
                          </strong>
                          <span className="text-[11px] text-slate-400 block">
                            {courier.tagline}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 text-cyan-400">
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400">
                Pilih salah satu atau kedua kurir untuk membandingkan tarif termurah.
              </p>
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Field 1: Kode Pos Asal */}
              <div className="space-y-2">
                <label
                  htmlFor="originPostalCode"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-200"
                >
                  Kode Pos Asal <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    id="originPostalCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={5}
                    placeholder="Contoh: 40135"
                    value={originPostalCode}
                    onChange={(e) =>
                      handlePostalCodeChange(e.target.value, setOriginPostalCode)
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#070d1e] border border-cyan-900/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  5 digit kode pos lokasi pengirim
                </p>
              </div>

              {/* Field 2: Kode Pos Tujuan */}
              <div className="space-y-2">
                <label
                  htmlFor="destinationPostalCode"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-200"
                >
                  Kode Pos Tujuan <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4 text-teal-400" />
                  </div>
                  <input
                    id="destinationPostalCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={5}
                    placeholder="Contoh: 60111"
                    value={destinationPostalCode}
                    onChange={(e) =>
                      handlePostalCodeChange(
                        e.target.value,
                        setDestinationPostalCode
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#070d1e] border border-cyan-900/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  5 digit kode pos tujuan pengiriman
                </p>
              </div>

              {/* Field 3: Berat Paket & Satuan */}
              <div className="space-y-2">
                <label
                  htmlFor="packageWeight"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-200"
                >
                  Berat Paket <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Scale className="w-4 h-4 text-emerald-400" />
                    </div>
                    <input
                      id="packageWeight"
                      type="number"
                      min={weightUnit === 'kg' ? '0.1' : '1'}
                      step={weightUnit === 'kg' ? '0.1' : '1'}
                      placeholder={weightUnit === 'kg' ? '2' : '2000'}
                      value={weightInput}
                      onChange={(e) => {
                        setWeightInput(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full pl-10 pr-3 py-3 bg-[#070d1e] border border-cyan-900/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Weight Unit Selector */}
                  <div className="flex rounded-xl bg-[#070d1e] border border-cyan-900/60 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (weightUnit !== 'gram') {
                          setWeightUnit('gram');
                          const num = parseFloat(weightInput);
                          if (!isNaN(num) && num > 0) {
                            setWeightInput(String(Math.round(num * 1000)));
                          }
                        }
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        weightUnit === 'gram'
                          ? 'bg-cyan-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Gram
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (weightUnit !== 'kg') {
                          setWeightUnit('kg');
                          const num = parseFloat(weightInput);
                          if (!isNaN(num) && num > 0) {
                            setWeightInput(String(num / 1000));
                          }
                        }
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        weightUnit === 'kg'
                          ? 'bg-teal-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Kg
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  {weightUnit === 'gram'
                    ? '1000 gram = 1 kg'
                    : '1 kg = 1000 gram (konversi otomatis)'}
                </p>
              </div>

            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 flex items-start gap-3 text-sm animate-fadeIn"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-semibold block text-red-300">
                    Gagal Menghitung Ongkir
                  </strong>
                  <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-2 text-center sm:text-left">
                <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Perkiraan biaya diurutkan dari tarif termurah ke termahal.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:via-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-950 transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Mencari tarif terbaik...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-slate-950" />
                    <span>Cek Ongkir</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Results Area */}
          {rates !== null && (
            <div className="mt-10 pt-8 border-t border-cyan-900/40 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Hasil Perkiraan Ongkos Kirim
                  </h4>
                  <p className="text-xs text-slate-400">
                    Rute: Kode Pos {originPostalCode} &rarr; {destinationPostalCode}{' '}
                    &bull; Berat:{' '}
                    {weightUnit === 'gram'
                      ? `${weightInput} gram`
                      : `${weightInput} kg (${parseFloat(weightInput) * 1000} gram)`}
                  </p>
                </div>

                {rates.length > 0 && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                    {rates.length} Pilihan Layanan Tersedia (Termurah &rarr; Tercepat)
                  </span>
                )}
              </div>

              {/* Courier availability note if only one courier returned results */}
              {rates.length > 0 && unavailableCouriers.length > 0 && (
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center gap-2.5 text-xs text-slate-300">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Catatan: Layanan {unavailableCouriers.join(' & ')} tidak tersedia untuk rute pengiriman ini.
                  </span>
                </div>
              )}

              {/* No rates fallback */}
              {rates.length === 0 && infoMessage && (
                <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-center space-y-2">
                  <p className="text-sm text-slate-200">{infoMessage}</p>
                  <p className="text-xs text-slate-400">
                    Silakan hubungi kami via WhatsApp untuk rute pengiriman khusus atau alternatif ekspedisi.
                  </p>
                </div>
              )}

              {/* Rates Cards Grid */}
              {rates.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rates.map((rate, idx) => {
                    const priceFormatted =
                      rate.cost_formatted || formatRupiah(rate.cost);
                    const isTiki = rate.courier_code.toLowerCase() === 'tiki';
                    const courierDisplayName = isTiki ? 'TIKI' : 'J&T Express';
                    const etd =
                      rate.etd_text ||
                      (rate.etd_min_days && rate.etd_max_days
                        ? `${rate.etd_min_days}–${rate.etd_max_days} hari`
                        : 'Estimasi waktu tidak tersedia');

                    return (
                      <div
                        key={idx}
                        className="bg-[#070d1e] rounded-2xl p-6 border border-cyan-800/50 hover:border-cyan-400/60 transition-all space-y-4 shadow-xl relative overflow-hidden group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          {/* Courier Badge & Highlights */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-md border ${
                                  isTiki
                                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                                    : 'bg-red-600/20 text-red-400 border-red-500/30'
                                }`}
                              >
                                {courierDisplayName}
                              </span>

                              {rate.cheapest && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-950 text-emerald-300 border border-emerald-600/50 flex items-center gap-1">
                                  <Tag className="w-3 h-3 text-emerald-400" />
                                  Termurah
                                </span>
                              )}

                              {rate.fastest && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-cyan-950 text-cyan-300 border border-cyan-600/50 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-cyan-400" />
                                  Tercepat
                                </span>
                              )}
                            </div>

                            <span className="text-[11px] text-slate-500 font-mono">
                              {rate.service_code}
                            </span>
                          </div>

                          {/* Service Name & Pricing */}
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                              Layanan
                            </span>
                            <h5 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {rate.service_name}
                            </h5>
                          </div>

                          {/* Pricing & Estimation Grid */}
                          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-cyan-950">
                            <div>
                              <span className="text-[11px] text-slate-400 block mb-0.5">
                                Perkiraan Biaya
                              </span>
                              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                                {priceFormatted}
                              </div>
                              {rate.discount && rate.discount > 0 ? (
                                <span className="text-[10px] text-emerald-400 font-medium">
                                  Hemat {formatRupiah(rate.discount)}
                                </span>
                              ) : null}
                            </div>

                            <div>
                              <span className="text-[11px] text-slate-400 block mb-0.5">
                                Estimasi Pengiriman
                              </span>
                              <div className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mt-1">
                                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>{etd}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Direct Order Link via WhatsApp */}
                        <div className="pt-2">
                          <a
                            href={`https://wa.me/6289685472865?text=${encodeURIComponent(
                              `Halo Molly Cantik Farm, saya ingin pesan ikan Molly dengan pengiriman ${courierDisplayName} ${
                                rate.service_name
                              } (${originPostalCode} -> ${destinationPostalCode}, berat ${weightInput} ${weightUnit}, estimasi tarif ${priceFormatted}). Mohon info stok & totalnya.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-700/50 text-cyan-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                            Pesan dengan Kurir Ini via WhatsApp
                            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
