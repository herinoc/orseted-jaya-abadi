import React from 'react';
import { Sparkles, Droplets, HeartPulse, ShieldCheck, CheckCircle2, ThumbsUp } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      title: 'Molly Pilihan',
      desc: 'Dipilih dari indukan unggulan dengan corak warna cerah, sisik bersih, dan bentuk tubuh proporsional.',
      icon: Sparkles,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/60',
      borderColor: 'border-cyan-800/40',
    },
    {
      title: 'Farm Bersih',
      desc: 'Wadah pemeliharaan dan sirkulasi air dibersihkan secara berkala untuk menciptakan lingkungan steril.',
      icon: Droplets,
      color: 'text-teal-400',
      bgColor: 'bg-teal-950/60',
      borderColor: 'border-teal-800/40',
    },
    {
      title: 'Perawatan Rutin',
      desc: 'Monitoring kondisi fisik dan pemberian pakan kaya nutrisi secara teratur setiap hari.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/60',
      borderColor: 'border-emerald-800/40',
    },
    {
      title: 'Fokus Kesehatan Ikan',
      desc: 'Penggunaan air berkualitas dan perlakukan karantina yang cermat untuk menjamin ketahanan tubuh ikan.',
      icon: HeartPulse,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/60',
      borderColor: 'border-cyan-800/40',
    },
    {
      title: 'Lingkungan Pemeliharaan Terjaga',
      desc: 'Parameter pH dan suhu air senantiasa dipantau agar ikan tetap berada dalam kondisi prima.',
      icon: ShieldCheck,
      color: 'text-teal-400',
      bgColor: 'bg-teal-950/60',
      borderColor: 'border-teal-800/40',
    },
    {
      title: 'Pelayanan Ramah & Terpercaya',
      desc: 'Kami siap memberikan panduan perawatan dan informasi transparan bagi setiap penghobi ikan.',
      icon: ThumbsUp,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/60',
      borderColor: 'border-emerald-800/40',
    },
  ];

  return (
    <section id="advantages" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070d1e] relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyan-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/40">
            KEUNGGULAN FARM KAMI
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Kenapa Memilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Orsted Jaya Abadi?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Komitmen kami sebagai Molly Cantik Farm dalam menjaga kebersihan, kesehatan, dan kualitas setiap ikan Molly.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0c1938] p-6 sm:p-7 rounded-2xl border border-cyan-900/40 hover:border-cyan-500/50 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-700/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className={`w-6 h-6 ${item.color}`} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
