'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FISH_COLLECTION } from '@/data/fishData';
import { FishItem } from '@/types/fish';
import { FishDetailModal } from '@/components/gallery/FishDetailModal';
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const featuredFish = FISH_COLLECTION.filter((f) => f.featured);
  const [selectedFish, setSelectedFish] = useState<FishItem | null>(null);

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070d1e] relative overflow-hidden border-t border-b border-cyan-900/30">
      
      {/* Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyan-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              KOLEKSI MOLLY UNGGULAN
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Spesimen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Pilihan Utama Farm</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Varian Molly terfavorit dari Orsted Jaya Abadi dengan kualitas warna cerah, tubuh proporsional, dan kondisi fisik prima.
            </p>
          </div>

          <a
            href="#gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            Lihat Semua Koleksi Molly
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Featured Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFish.map((fish) => (
            <div
              key={fish.id}
              onClick={() => setSelectedFish(fish)}
              className="group relative bg-[#0c1938] rounded-2xl border border-cyan-900/40 hover:border-cyan-500/60 p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-xl"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-950 mb-4">
                <Image
                  src={fish.image}
                  alt={`Spesimen unggulan ${fish.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1938] via-transparent to-transparent opacity-60" />
                <span className="absolute top-2.5 right-2.5 bg-emerald-500/90 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-950" />
                  {fish.healthStatus || 'Sehat'}
                </span>
              </div>

              {/* Text info */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                  {fish.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {fish.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {fish.shortDescription}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 flex items-center justify-between border-t border-cyan-900/40 mt-4 text-xs font-semibold text-cyan-400">
                <span>Lihat Detail Molly</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <FishDetailModal
        fish={selectedFish}
        onClose={() => setSelectedFish(null)}
      />
    </section>
  );
};
