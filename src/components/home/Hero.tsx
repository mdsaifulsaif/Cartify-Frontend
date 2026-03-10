'use client';

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

const Hero: React.FC = () => {
  // ১. Framer Motion এর জন্য টাইপ-সেফ অ্যানিমেশন প্রপস
  const h1Animation: HTMLMotionProps<"h1"> = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const pAnimation: HTMLMotionProps<"p"> = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, delay: 0.4, ease: "easeOut" },
  };

  const divAnimation: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.7 },
  };

  return (
    <section
      className="relative min-h-[85vh] md:min-h-[997px] w-full flex items-center bg-gray-950 font-raleway overflow-hidden"
      style={{
        backgroundImage: "url('/assets/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10 w-full py-20 flex flex-col items-center md:items-start">
        <div className="max-w-[950px] w-full text-center md:text-left flex flex-col gap-6 text-white">
          
          {/* Main Heading Animation */}
          <motion.h1
            {...h1Animation}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            Discover your skin's <br className="hidden md:block" /> true potential
          </motion.h1>

          {/* Subtitle Animation */}
          <motion.p
            {...pAnimation}
            className="text-gray-200 font-light leading-relaxed text-sm md:text-lg max-w-[500px]"
          >
            Premium skincare infused with authentic Korean ingredients. Simple
            routines, powerful results for a glowing you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...divAnimation}
            className="flex flex-col sm:flex-row items-center gap-5 mt-8 w-full sm:w-auto"
          >
            <Link href="/shop" className="w-full sm:w-auto">
              <button className="bg-white text-black px-10 rounded-[100px] py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-all w-full sm:w-auto">
                Shop Now
              </button>
            </Link>

            <Link href="/about" className="w-full sm:w-auto">
              <button className="border rounded-[100px] border-white text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all w-full sm:w-auto">
                Our Story
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;