'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const QuickWhatsAppWidget: React.FC = () => {
  return (
    <aside
      aria-label="Konsultasi WhatsApp Farm"
      className="fixed bottom-5 right-5 z-40"
    >
      <a
        href="https://wa.me/6289685472865"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-emerald-950/50 border border-emerald-400/40 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <MessageCircle className="w-5 h-5 text-white shrink-0 group-hover:animate-bounce" />
        <span className="hidden sm:inline">Hubungi Farm (WA)</span>
        <span className="sm:hidden">WA Farm</span>
      </a>
    </aside>
  );
};
