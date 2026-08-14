'use client';

import React from 'react';
import Image from 'next/image';
import { FishItem } from '@/types/fish';
import { Sparkles, Eye, Tag, ShieldCheck } from 'lucide-react';

interface FishCardProps {
  fish: FishItem;
  onSelect: (fish: FishItem) => void;
}

export const FishCard: React.FC<FishCardProps> = ({ fish, onSelect }) => {
  return (
    <div 
      className="group relative bg-[#0c1938] rounded-2xl border border-cyan-900/40 hover:border-cyan-500/60 shadow-lg hover:shadow-2xl hover:shadow-cyan-950/40 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image container */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-950">
        <Image
          src={fish.image}
          alt={`Foto ikan Molly ${fish.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1938] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Featured Badge */}
        {fish.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-950" />
            Unggulan Farm
          </span>
        )}

        {/* Health status badge */}
        <span className="absolute top-3 right-3 bg-[#070d1e]/80 backdrop-blur-sm border border-emerald-500/40 text-emerald-400 font-semibold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          {fish.healthStatus || 'Sehat & Terawat'}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {fish.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {fish.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {fish.shortDescription}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(fish)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-cyan-600 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-cyan-900/60 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label={`Lihat detail ikan Molly ${fish.name}`}
        >
          <Eye className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
          Lihat Detail Ikan
        </button>
      </div>

      {/* Bottom Glow Bar Accent */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-500" />
    </div>
  );
};
