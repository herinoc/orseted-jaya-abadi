'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Koleksi Molly', href: '#gallery' },
    { name: 'Keunggulan', href: '#advantages' },
    { name: 'Kontak & Lokasi', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070d1e]/90 border-b border-cyan-900/40 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Farm Name */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-lg p-1"
            aria-label="Orsted Jaya Abadi - Molly Cantik Farm"
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-[1px] shadow-md shadow-cyan-900/30">
              <div className="w-full h-full bg-[#070d1e] flex items-center justify-center rounded-[7px]">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                ORSTED JAYA ABADI
              </span>
              <span className="text-[11px] text-cyan-400 font-semibold tracking-wider uppercase">
                Molly Cantik Farm
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-xs lg:text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                {link.name}
              </a>
            ))}
            
            <a
              href="https://wa.me/6289685472865"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-4 py-2 text-xs uppercase tracking-wider font-extrabold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40 shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              WhatsApp
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-slate-200 hover:text-cyan-300 hover:bg-cyan-950/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-cyan-900/30"
              aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Aquatic Divider Line */}
      <div className="aquatic-divider" />

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#09142e] border-b border-cyan-900/40 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-base font-medium text-slate-100 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="https://wa.me/6289685472865"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 px-4 py-3 text-sm font-extrabold uppercase tracking-wider rounded-lg bg-emerald-600 text-white border border-emerald-400/40 shadow"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              Hubungi WhatsApp Farm
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
