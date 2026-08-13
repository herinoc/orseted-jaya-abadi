import React from 'react';
import { ShieldCheck, MessageCircle, MapPin, Truck, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050a17] text-slate-400 border-t border-cyan-900/40 pt-16 pb-12 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-950/20 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-cyan-900/40">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  ORSTED JAYA ABADI
                </span>
                <span className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                  Molly Cantik Farm
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Farm pembiakan dan perawatan ikan Molly berkualitas. Mengutamakan kebersihan lingkungan, kualitas air, dan kesehatan ikan agar Molly tumbuh sehat, aktif, dan cantik.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/40 text-emerald-300 font-semibold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Siap Kirim Seluruh Indonesia
              </span>
              <span className="text-xs text-slate-400">
                100% Ikan Sehat & Terawat
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Kontak Resmi
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/6289685472865"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-slate-200"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: 089685472865</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/yJi7oA6HocWKPZmP6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-2 text-slate-200"
                >
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Petunjuk Lokasi Google Maps</span>
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                Layanan Konsultasi & Penjualan Ikan Molly
              </li>
            </ul>
          </div>

          {/* Farm Standards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Komitmen Farm
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Ikan Sehat & Aktif</strong>: Pakan nutrisi lengkap & pemantauan harian.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Kebersihan Terjaga</strong>: Sirkulasi & saringan air dibersihkan secara rutin.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Respon Ramah</strong>: Konsultasi pemeliharaan ikan Molly via WhatsApp.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Orsted Jaya Abadi — Molly Cantik Farm. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-2">
            <span>Dirawat dengan</span>
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>untuk Penghobi Ikan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
