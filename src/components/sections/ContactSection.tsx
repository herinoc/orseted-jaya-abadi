import React from 'react';
import { MessageCircle, MapPin, Truck, ShieldCheck, Phone, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070d1e] relative overflow-hidden border-t border-cyan-900/30">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-cyan-950/30 via-teal-950/20 to-emerald-950/30 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            SIAP KIRIM SELURUH INDONESIA
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hubungi & Kunjungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Orsted Jaya Abadi</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Ingin berkonsultasi mengenai varian ikan Molly, pemesanan, atau pengiriman? Tim Molly Cantik Farm siap melayani Anda dengan jaminan pengiriman aman ke seluruh wilayah Indonesia.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: WhatsApp Call To Action */}
          <div className="bg-[#0c1938] p-8 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                  Layanan Penjualan & Konsultasi
                </span>
                <h3 className="text-2xl font-bold text-white">
                  WhatsApp Resmi Farm
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hubungi kontak farm <strong className="text-cyan-300">Orsted Jaya Abadi</strong> untuk konsultasi varian Molly, ketersediaan stok, harga, dan instruksi pengiriman.
              </p>
              <div className="flex items-center gap-2 text-slate-200 text-sm font-bold pt-1">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>089685472865</span>
              </div>
            </div>

            <a
              href="https://wa.me/6289685472865"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/80 transition-all flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              Chat WhatsApp (089685472865)
            </a>
          </div>

          {/* Card 2: Google Maps Location */}
          <div className="bg-[#0c1938] p-8 rounded-2xl border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                  Lokasi Farm
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Molly Cantik Farm
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Buka petunjuk arah lokasi farm kami via Google Maps untuk berkunjung atau melihat langsung tempat pemeliharaan ikan Molly kami.
              </p>
              <div className="flex items-center gap-2 text-slate-200 text-sm font-bold pt-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Lokasi Terverifikasi Google Maps</span>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/yJi7oA6HocWKPZmP6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <MapPin className="w-5 h-5 text-cyan-400" />
              Buka Google Maps Farm
              <ExternalLink className="w-4 h-4 text-cyan-400 opacity-80" />
            </a>
          </div>

        </div>

        {/* Shipping Guarantee Banner */}
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-[#0c1938] via-[#09142e] to-emerald-950/40 border border-cyan-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white text-base block font-bold">Siap Kirim Seluruh Indonesia</strong>
              <span className="text-xs text-slate-300">Garansi packing aman dan terjamin oleh Orsted Jaya Abadi — Molly Cantik Farm.</span>
            </div>
          </div>
          <a
            href="https://wa.me/6289685472865"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider whitespace-nowrap transition-colors shadow-md"
          >
            Pesan Sekarang
          </a>
        </div>

      </div>
    </section>
  );
};
