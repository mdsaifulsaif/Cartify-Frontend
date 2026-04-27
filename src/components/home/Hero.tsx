"use client"
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';


interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

const Hero: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  const slides: Slide[] = [
    {
      image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1777201934/WhatsApp_Image_2026-04-26_at_15.41.04_awstij.jpg",
      title: "Discover your skin's true potential",
      subtitle: "Premium skincare that combines innovation with clean, effective ingredients for all skin types."
    },
    {
      image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772695484/1157cfd8a0d89044407438fa1c4119bdf39ea7fb_ohqgyp.jpg",
      title: "Radiance starts from within",
      subtitle: "Experience the glow of natural beauty with our organic collection."
    },
    {
      image: "https://res.cloudinary.com/dn5t9fhya/image/upload/v1772695361/1d39ac8aa27f4f2e3f0dfae43954d183843f7540_mejodn.jpg",
      title: "Luxury meets purity",
      subtitle: "Crafting the finest beauty products tailored for your unique skin journey."
    }
  ];

  // স্লাইড পরিবর্তনের ফাংশনগুলো
  const nextSlide = (): void => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 80000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center">
            <div className="max-w-2xl text-white space-y-6">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg"
              >
                {slides[current].title}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-100 font-light max-w-lg drop-shadow-md"
              >
                {slides[current].subtitle}
              </motion.p>

              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/shop" className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-pink-500 hover:text-white transition-all shadow-lg">
                  Shop Now
                </Link>
                <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                  About Us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute bottom-10 right-10 md:right-20 flex items-center space-x-4 z-20">
        <div className="text-white font-medium mr-4 flex items-baseline">
          <span className="text-2xl">0{current + 1}</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="opacity-50">0{slides.length}</span>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={prevSlide} 
            className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide} 
            className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;