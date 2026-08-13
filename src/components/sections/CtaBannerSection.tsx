import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#091228] relative overflow-hidden border-t border-b border-cyan-900/30">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gradient-to-r from-cyan-600/10 via-teal-600/10 to-emerald-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 bg-gradient-to-br from-[#0c1938] via-[#09142e] to-[#070d1e] p-8 sm:p-12 rounded-3xl border border-cyan-700/40 shadow-2xl">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          MOLLY CANTIK FARM
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Temukan Molly Cantik untuk Akuarium Anda
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Lihat koleksi ikan Molly kami dan temukan ikan yang paling sesuai untuk akuarium Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#gallery"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <span>Lihat Koleksi</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </a>

          <a
            href="https://wa.me/6289685472865"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            Hubungi Kami
          </a>
        </div>

      </div>
    </section>
  );
};
