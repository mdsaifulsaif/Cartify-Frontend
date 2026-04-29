"use client"; // এই লাইনটি যোগ করা হয়েছে ইন্টারঅ্যাক্টিভিটি সাপোর্ট করার জন্য

import React from 'react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#0b0d14] flex items-center justify-center px-5">
      {/* Main Card */}
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-center relative overflow-hidden">
        
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#F74608]/10 blur-[80px] rounded-full" />
        
        {/* Cancel Icon */}
        <div className="relative mb-6 flex justify-center">
          <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <svg 
              className="h-10 w-10 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Payment Cancelled
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
          Don&lsquo;t worry, your account hasn&rsquo;t been charged. If this was a mistake, you can try again below.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* এই বাটনটি onClick ব্যবহারের কারণে ক্লায়েন্ট কম্পোনেন্ট প্রয়োজন ছিল */}
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-[#F74608] hover:bg-[#dd3e07] text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#F74608]/20"
          >
            Try Payment Again
          </button>
          
          <Link href="/">
            <div className="w-full bg-white/5 hover:bg-white/10 text-white text-center font-semibold py-4 rounded-xl border border-white/10 transition-all cursor-pointer">
              Return to Homepage
            </div>
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-sm text-zinc-500">
          Need help? <a href="#" className="text-[#F74608] hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
}