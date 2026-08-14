import React from 'react';
import { ShieldCheck, Sparkles, Droplets, HeartPulse, Waves } from 'lucide-react';

export const AboutBrandSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#091228] relative overflow-hidden border-t border-b border-cyan-900/30">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Brand Story & Philosophy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            TENTANG ORSTED JAYA ABADI
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Molly Cantik Farm — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              Kualitas Berawal dari Perawatan Terbaik
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Kami percaya ikan yang cantik berawal dari perawatan yang baik. Karena itu, kami menjaga kebersihan lingkungan pemeliharaan, kualitas air, dan kondisi ikan agar Molly dapat tumbuh dengan baik dan tampil sehat serta menarik.
          </p>

          {/* Core Values / Focus Points */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3 bg-[#0c1938]/60 p-4 rounded-xl border border-cyan-900/40">
              <Droplets className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white text-sm block font-bold">Kebersihan Air & Filter Terjaga</strong>
                <span className="text-xs text-slate-300">Sistem filtrasi rutin untuk menjaga pH, kejernihan, dan kecukupan oksigen air.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#0c1938]/60 p-4 rounded-xl border border-cyan-900/40">
              <HeartPulse className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white text-sm block font-bold">Kondisi Ikan Sehat & Prima</strong>
                <span className="text-xs text-slate-300">Pemberian pakan nutrisi lengkap dan monitoring rutin untuk memastikan ikan aktif dan bebas penyakit.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#0c1938]/60 p-4 rounded-xl border border-cyan-900/40">
              <Waves className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white text-sm block font-bold">Keindahan Warna & Form Proporsional</strong>
                <span className="text-xs text-slate-300">Varietas pilihan dengan corak warna cerah dan sirip indah yang siap mempercantik akuarium Anda.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Aquatic Highlight Card */}
        <div className="bg-[#0c1938] p-8 sm:p-10 rounded-2xl border border-cyan-800/40 shadow-2xl relative space-y-6">
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-4">
            <div className="space-y-1">
              <span className="text-xl font-bold text-white block">Orsted Jaya Abadi</span>
              <span className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">Molly Cantik Farm</span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/40">
              OFFICIAL FARM
            </span>
          </div>

          <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed border-l-4 border-cyan-400 pl-4 py-2 font-normal italic">
            &ldquo;Perhatian penuh pada kebersihan air dan perawatan harian adalah kunci utama kami untuk menghasilkan ikan Molly yang aktif, sehat, dan tampil memikat.&rdquo;
          </blockquote>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cyan-900/60 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 block">Fokus Farm</span>
              <span className="text-cyan-300 font-semibold">Ikan Molly Pilihan</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 block">Standar Kualitas</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Terawat & Higienis
              </span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider"
            >
              Lihat Koleksi Ikan Molly Kami &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
