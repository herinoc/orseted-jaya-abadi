import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutBrandSection } from '@/components/sections/AboutBrandSection';
import { FeaturedSection } from '@/components/sections/FeaturedSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { ShippingRateSection } from '@/components/sections/ShippingRateSection';
import { CtaBannerSection } from '@/components/sections/CtaBannerSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[#070d1e]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Brand Section (Tentang Kami) */}
      <AboutBrandSection />

      {/* 3. Featured Molly Showcase */}
      <FeaturedSection />

      {/* 4. Gallery Section (Koleksi Lengkap 11 Ikan Molly) */}
      <GallerySection />

      {/* 5. Keunggulan Farm (Why Choose Orsted Jaya Abadi?) */}
      <AdvantagesSection />

      {/* 6. Cek Perkiraan Biaya Pengiriman (J&T Express) */}
      <ShippingRateSection />

      {/* 7. Call To Action Banner */}
      <CtaBannerSection />

      {/* 8. Contact & Farm Location Section */}
      <ContactSection />
    </div>
  );
}
