import React from 'react';
import { 
  IoBusOutline,      // IoTruckOutline এর পরিবর্তে এটি ব্যবহার করুন
  IoEarthOutline,    // IoGlobeOutline এর পরিবর্তে এটি ব্যবহার করুন
  IoTimeOutline, 
  IoShieldCheckmarkOutline 
} from "react-icons/io5";

export default function ShippingPolicy() {
  return (
    <div className="bg-white font-raleway">
      {/* Header Section */}
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">
            Shipping Policy
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-[11px] font-bold">
            Glowly — Delivering Beauty to Your Doorstep
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Policy Details */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest border-b border-black pb-2 mb-6">
                1. Delivery Timeline
              </h2>
              <div className="space-y-4 text-gray-600 text-[14px] leading-relaxed">
                <p>
                  At <strong>Glowly</strong>, we strive to get your favorite skincare products to you as quickly as possible. Once your order is confirmed:
                </p>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong>Inside Dhaka:</strong> 1 – 3 business days.</li>
                  <li><strong>Outside Dhaka:</strong> 3 – 5 business days.</li>
                </ul>
                <p className="italic text-gray-400">
                  *Delivery times may vary slightly during sales periods or national holidays.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest border-b border-black pb-2 mb-6">
                2. Shipping Charges
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50 uppercase text-[11px] tracking-widest font-bold">
                      <th className="p-4 border">Location</th>
                      <th className="p-4 border">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border">Inside Dhaka</td>
                      <td className="p-4 border font-bold">60 BDT</td>
                    </tr>
                    <tr>
                      <td className="p-4 border">Outside Dhaka</td>
                      <td className="p-4 border font-bold">120 BDT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest border-b border-black pb-2 mb-6">
                3. Order Tracking
              </h2>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                As soon as your order is dispatched, you will receive a confirmation message with a tracking number. You can use this to monitor your package&apos;s journey through our courier partner&apos;s website.
              </p>
            </section>

          </div>

          {/* Right Column: Key Highlights */}
          <div className="bg-gray-50 p-8 rounded-sm h-fit space-y-8">
            <div className="flex items-start gap-4">
              <IoBusOutline className="text-2xl text-gray-800 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase mb-1">Fast Delivery</h4>
                <p className="text-gray-500 text-[12px]">Quick processing and dispatch within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <IoShieldCheckmarkOutline className="text-2xl text-gray-800 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase mb-1">Secure Packaging</h4>
                <p className="text-gray-500 text-[12px]">Double-layered bubble wrap to ensure zero damage.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <IoTimeOutline className="text-2xl text-gray-800 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase mb-1">Customer Support</h4>
                <p className="text-gray-500 text-[12px]">Our team is here to help you 10 AM – 8 PM daily.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <IoEarthOutline className="text-2xl text-gray-800 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase mb-1">Nationwide</h4>
                <p className="text-gray-500 text-[12px]">We deliver to every corner of Bangladesh.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest text-center leading-relaxed">
                Need Help? Contact Us at <br />
                <span className="text-black font-bold">support@glowly.com</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}