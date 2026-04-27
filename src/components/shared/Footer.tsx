/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
} from "react-icons/io5";
import { BASE_URL } from "@/helper/BASE_URL";
import { useSettings } from "@/helper/useSettings";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: settings, isLoading } = useSettings();

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // আপনার API এন্ডপয়েন্ট অনুযায়ী URL টি পরিবর্তন করে নিন
      const response = await axios.post(`${BASE_URL}/subscribers/add`, {
        email: email,
      });

      if (response.data.success) {
        toast.success("Thank you for subscribing!");
        setEmail("");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) return <div>Loading logo...</div>;

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <Toaster position="bottom-right" reverseOrder={false} />
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
                href={settings?.socialLinks?.instagram}
                className="hover:text-black transition-all hover:-translate-y-1"
              >
                <IoLogoInstagram size={18} />
              </a>
              <a
                href={settings?.socialLinks?.facebook}
                className="hover:text-black transition-all hover:-translate-y-1"
              >
                <IoLogoFacebook size={18} />
              </a>
              <a
                href={settings?.socialLinks?.twitter}
                className="hover:text-black transition-all hover:-translate-y-1"
              >
                <IoLogoTwitter size={18} />
              </a>
            </div>
          </div>

          {/* ২. শপ লিঙ্কস */}
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

          {/* ৩. সাপোর্ট লিঙ্কস */}
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
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Your email address"
                required
                className="bg-gray-50 border border-gray-100 p-3.5 text-[12px] focus:outline-none focus:border-black transition-colors rounded-sm"
              />

              <button
                type="submit"
                disabled={loading}
                className="global-btn !py-3 !text-[10px] !rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* ফুটার বটম */}
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