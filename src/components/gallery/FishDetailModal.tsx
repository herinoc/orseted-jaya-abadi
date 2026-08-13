'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { FishItem } from '@/types/fish';
import { X, ShieldCheck, Tag, Info, Sparkles, MessageCircle, Truck, Droplets, Thermometer } from 'lucide-react';

interface FishDetailModalProps {
  fish: FishItem | null;
  onClose: () => void;
}

export const FishDetailModal: React.FC<FishDetailModalProps> = ({ fish, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (fish) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [fish, onClose]);

  if (!fish) return null;

  const whatsappMessage = encodeURIComponent(
    `Halo Orsted Jaya Abadi, saya berminat dengan ikan Molly varian ${fish.name} (${fish.internalCode || 'Molly'})`
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#09142e] border border-cyan-700/50 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Bar */}
        <div className="aquatic-divider" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/60 bg-[#070d1e]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Orsted Jaya Abadi • Molly Cantik Farm
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cyan-950 border border-cyan-900/60 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Image Container */}
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-cyan-900/40 bg-slate-950 shadow-inner group">
            <Image
              src={fish.image}
              alt={`Foto spesimen ${fish.name}`}
              fill
              sizes="(max-width: 640px) 100vw, 672px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            {fish.featured && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                Varian Unggulan
              </span>
            )}
            <span className="absolute bottom-3 right-3 bg-[#070d1e]/90 backdrop-blur-sm border border-emerald-500/40 text-emerald-400 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {fish.healthStatus || 'Sehat & Terawat'}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-semibold flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {fish.category}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                  <Truck className="w-3 h-3 text-emerald-400" />
                  Siap Kirim Seluruh Indonesia
                </span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {fish.name}
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-[#070d1e]/70 p-4 rounded-xl border border-cyan-900/40">
              {fish.shortDescription}
            </p>

            {/* Quick Fish Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[#070d1e]/80 p-3 rounded-lg border border-cyan-900/40 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Kondisi Ikan</span>
                  <span className="text-xs font-bold text-emerald-300">Prima & Active</span>
                </div>
              </div>

              <div className="bg-[#070d1e]/80 p-3 rounded-lg border border-cyan-900/40 flex items-center gap-2.5">
                <Thermometer className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Suhu Ideal</span>
                  <span className="text-xs font-bold text-cyan-300">{fish.waterTemp || '24-28°C'}</span>
                </div>
              </div>

              <div className="bg-[#070d1e]/80 p-3 rounded-lg border border-cyan-900/40 flex items-center gap-2.5">
                <Droplets className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Kualitas Air</span>
                  <span className="text-xs font-bold text-teal-300">Terfilter Steril</span>
                </div>
              </div>
            </div>

            {/* Ordering info note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-950/60 border border-cyan-700/40 text-cyan-200 text-xs leading-relaxed">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300">Informasi Pemesanan:</span> Hubungi farm <strong className="text-white">Orsted Jaya Abadi</strong> via WhatsApp untuk konsultasi stok, harga, dan proses pengiriman aman ke lokasi Anda.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-[#070d1e] border-t border-cyan-900/60">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Orsted Jaya Abadi Official
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/6289685472865?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 text-xs uppercase tracking-wider font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              Tanya via WhatsApp
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
