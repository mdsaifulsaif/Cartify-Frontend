"use client";
import React from 'react';
import { Raleway } from "next/font/google";
import { RefreshCcw, ShieldCheck, Truck, Clock } from "lucide-react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ReturnPolicy() {
  const policies = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Return Window",
      text: "You have 30 days from the date of delivery to return your items."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Item Condition",
      text: "Items must be unused, in original packaging, with all tags attached."
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Easy Refunds",
      text: "Once approved, your refund will be processed within 5-7 business days."
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Return Shipping",
      text: "We offer free return shipping for all defective or damaged products."
    }
  ];

  return (
    <div className={`${raleway.className} bg-white min-h-screen`}>
      {/* Hero Section */}
      <div className="bg-[#f9f9f9] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
          Return Policy
        </h1>
        <p className="text-[#666666] max-w-2xl mx-auto text-lg">
          We want you to be completely satisfied with your purchase. 
          If you're not happy, we're here to help.
        </p>
      </div>

      {/* Policy Grid */}
      <div className="container mx-auto py-20 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {policies.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="bg-[#f0f0f0] p-4 rounded-full mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">{item.title}</h3>
              <p className="text-[#666666] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Detailed Content */}
        <div className="max-w-3xl mx-auto border-t border-[#EDEDED] pt-16">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A]">How to start a return?</h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-4">
              To start a return, you can contact us at <span className="font-semibold underline">support@example.com</span>. 
              If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. 
              Items sent back to us without first requesting a return will not be accepted.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Damages and issues</h2>
            <p className="text-[#4A4A4A] leading-relaxed">
              Please inspect your order upon reception and contact us immediately if the item is defective, 
              damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Exchanges</h2>
            <p className="text-[#4A4A4A] leading-relaxed">
              The fastest way to ensure you get what you want is to return the item you have, 
              and once the return is accepted, make a separate purchase for the new item.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}