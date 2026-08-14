'use client';

import React, { useState, useMemo } from 'react';
import { FISH_COLLECTION } from '@/data/fishData';
import { FishItem, FishCategory } from '@/types/fish';
import { FishCard } from '@/components/gallery/FishCard';
import { FishDetailModal } from '@/components/gallery/FishDetailModal';
import { Search, Filter, Layers } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FishCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalFish, setActiveModalFish] = useState<FishItem | null>(null);

  const categories: FishCategory[] = [
    'Semua',
    'Molly Dalmatian & Zebra',
    'Black & White Molly',
    'Gold & Lemon Molly',
    'Lyretail & Redhead Molly',
    'Balloon Molly',
    'Varian Molly Lainnya',
  ];

  const filteredFish = useMemo(() => {
    return FISH_COLLECTION.filter((fish) => {
      const matchesCategory =
        selectedCategory === 'Semua' || fish.category === selectedCategory;
      const matchesSearch =
        fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fish.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#091228] relative overflow-hidden">
      
      {/* Background soft aquatic accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            KOLEKSI MOLLY CANTIK FARM
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Ikan Molly Pilihan</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Menampilkan seluruh koleksi varietas Molly cantik, bersih, dan sehat yang dipelihara dengan perhatian penuh di Orsted Jaya Abadi.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#0c1938] p-4 sm:p-6 rounded-2xl border border-cyan-900/40 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-cyan-900/40'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari varian Molly..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-cyan-900/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                aria-label="Cari varian Molly"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-cyan-900/40">
            <span>
              Menampilkan <strong className="text-cyan-300">{filteredFish.length}</strong> dari <strong className="text-white">11</strong> varian Molly
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-cyan-400 hover:underline"
              >
                Reset pencarian
              </button>
            )}
          </div>
        </div>

        {/* Fish Cards Grid */}
        {filteredFish.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFish.map((fish) => (
              <FishCard
                key={fish.id}
                fish={fish}
                onSelect={(selected) => setActiveModalFish(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0c1938] rounded-2xl border border-cyan-900/40 space-y-3">
            <Filter className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-200">Tidak ada varian Molly yang cocok</h3>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-900 text-xs font-bold text-cyan-400 hover:bg-slate-800 border border-cyan-800/40"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

      {/* Modal Dialog */}
      <FishDetailModal
        fish={activeModalFish}
        onClose={() => setActiveModalFish(null)}
      />
    </section>
  );
};
