'use client';

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const SkincarePhilosophy: React.FC = () => {
  
  const fadeIn: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const imageFade: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, scale: 1.05 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 1.2 },
  };

  return (
    <section className="w-full bg-[#F5E6D3] overflow-hidden font-raleway">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[500px] md:min-h-[600px]">
          
          {/* Left Side: Content Box */}
          <motion.div
            {...fadeIn}
            className="flex flex-col justify-center py-16 md:py-24 md:pr-12 lg:pr-20 order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-[1.1] uppercase tracking-tighter">
              Our Skincare <br className="hidden lg:block" /> Philosophy
            </h2>

            <div className="space-y-6 text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
              <p className="opacity-90">
                Seoul Mirage was born from a deep appreciation for Korean
                skincare innovation and the belief that effective products
                should be accessible to everyone.
              </p>
              <p className="opacity-90">
                We combine time-tested Korean ingredients with modern science to
                create formulations that deliver visible results. Each product
                is meticulously crafted to honor the tradition.
              </p>
            </div>

            <div className="mt-12">
              <Link href="/about">
                <button className="px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] border border-transparent hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                  About Us
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Image Box */}
          <motion.div
            {...imageFade}
            className="relative h-[450px] md:h-full w-full order-1 md:order-2"
          >
            <div className="relative w-full h-full min-h-[450px] md:min-h-[600px]">
              <Image
                src="/assets/ab1.png"
                alt="Skincare Philosophy"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkincarePhilosophy;