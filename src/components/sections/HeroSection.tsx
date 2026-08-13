import React from 'react';
import Image from 'next/image';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, HeartPulse, Droplets, CheckCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070d1e]">
      
      {/* Background Soft Aquatic Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-950/40 via-teal-900/20 to-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Orsted Jaya Abadi — Molly Cantik Farm</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold tracking-wide shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ikan Sehat, Clean Water & Terawat</span>
          </div>
        </div>

        {/* Hero Title & Copywriting */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            Pesona Molly Cantik, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Dirawat dengan Sepenuh Hati
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Orsted Jaya Abadi menghadirkan ikan Molly pilihan dari farm yang bersih, sehat, dan terawat untuk melengkapi akuarium Anda.
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Primary CTA: Lihat Koleksi Molly */}
          <a
            href="#gallery"
            className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-wider rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 border border-cyan-300/40 shadow-xl shadow-cyan-950/60 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <span>Lihat Koleksi Molly</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </a>

          {/* Secondary CTA: Hubungi Kami */}
          <a
            href="https://wa.me/6289685472865"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 transition-all flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            Hubungi Kami (WhatsApp)
          </a>
        </div>

        {/* Visual Focal Point: Highlight Grid of Healthy Molly Specimens */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
          
          <div className="p-4 rounded-xl bg-[#0c1938]/80 border border-cyan-900/50 backdrop-blur-md flex items-center gap-4 shadow-lg hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-cyan-950/90 border border-cyan-700/50 flex items-center justify-center text-cyan-400 shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Air & Lingkungan Bersih</div>
              <div className="text-xs text-slate-400 mt-0.5">Sirkulasi terfilter sempurna</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1938]/80 border border-cyan-900/50 backdrop-blur-md flex items-center gap-4 shadow-lg hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-emerald-950/90 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Kesehatan Ikan Prima</div>
              <div className="text-xs text-slate-400 mt-0.5">Pakan nutrisi & bebas penyakit</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1938]/80 border border-cyan-900/50 backdrop-blur-md flex items-center gap-4 shadow-lg hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-teal-950/90 border border-teal-700/50 flex items-center justify-center text-teal-400 shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Molly Pilihan Quality</div>
              <div className="text-xs text-slate-400 mt-0.5">Warna indah & bentuk cantik</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
