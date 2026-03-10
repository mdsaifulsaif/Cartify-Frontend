"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
} from "react-icons/io5";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* ১. ব্র্যান্ড ইনফো */}
          <div className="flex flex-col gap-6">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Glowly Logo"
                width={90}
                height={45}
                className="w-auto h-auto transition-opacity hover:opacity-80"
              />
            </Link>
            <p className="content-text !text-[14px] max-w-xs">
              Your destination for premium skincare and beauty essentials. We
              believe in natural radiance and sustainable beauty.
            </p>
            <div className="flex items-center gap-5 text-gray-400">
              <a
                href="#"
                className="hover:text-black transition-all hover:-translate-y-1"
              >
                <IoLogoInstagram size={18} />
              </a>
              <a
                href="#"
                className="hover:text-black transition-all hover:-translate-y-1"
              >
                <IoLogoFacebook size={18} />
              </a>
              <a
                href="#"
                className="hover:text-black transition-all hover:-translate-y-1"
              >
                <IoLogoTwitter size={18} />
              </a>
            </div>
          </div>

          {/* ২. কুইক লিংকস */}
          <div>
            <h4 className="section-title !text-[12px] uppercase tracking-[0.2em] mb-6">
              Shop
            </h4>
            <ul className="flex flex-col gap-3 text-[13px] text-gray-500 font-medium">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/skincare"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  Skincare
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* ৩. কাস্টমার সাপোর্ট */}
          <div>
            <h4 className="section-title !text-[12px] uppercase tracking-[0.2em] mb-6">
              Support
            </h4>
            <ul className="flex flex-col gap-3 text-[13px] text-gray-500 font-medium">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-black hover:translate-x-1 transition-all inline-block"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* ৪. নিউজলেটার */}
          <div>
            <h4 className="section-title !text-[12px] uppercase tracking-[0.2em] mb-6">
              Newsletter
            </h4>
            <p className="text-[12px] text-gray-400 mb-5 leading-relaxed">
              Subscribe to get special offers and once-in-a-lifetime deals.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-50 border border-gray-100 p-3.5 text-[12px] focus:outline-none focus:border-black transition-colors rounded-sm"
              />
              {/* globals.css থেকে global-btn ক্লাস ব্যবহার করা হয়েছে */}
              <button className="global-btn !py-3 !text-[10px] !rounded-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* বটম সেকশন */}
        <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium">
            © {currentYear} Glowly. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Image
              src="/assets/payment-methods.png"
              alt="Payments"
              width={180}
              height={30}
              className="opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
