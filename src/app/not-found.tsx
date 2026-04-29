"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative overflow-hidden font-raleway bg-white">
      {/* 404 Background Text - হালকা জুম অ্যানিমেশন */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-[15rem] md:text-[25rem] font-black text-black absolute z-0 select-none leading-none"
      >
        404
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="z-10 space-y-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tighter">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        <div className="pt-4">
          {/* সরাসরি হোম পেজে যাওয়ার বাটন */}
          <Link href="/">
            <button className="bg-black text-white px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl active:scale-95">
              Back to Home
            </button>
          </Link>
        </div>

        <p className="text-[10px] text-gray-400 uppercase tracking-widest pt-8">
          Need help?{" "}
          <Link href="/contact" className="border-b border-gray-400 hover:text-black hover:border-black transition-all">
            Contact Support
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;