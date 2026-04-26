/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; // TanStack Query ইমপোর্ট
import { 
  Globe, Mail, Phone, MapPin, Share2, Save, Loader2, RefreshCw 
} from 'lucide-react';
import { 
  FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin 
} from "react-icons/fa";

// টাইপ ডেফিনিশন
type Settings = {
  siteName: string;
  tagline: string;
  address: string;
  email: string;
  phone: string;
  currency: string;
  currencySymbol: string;
  socialLinks: { [platform: string]: string };
  _id: string;
  updatedAt: string;
};

// ডাটা ফেচিং ফাংশন
const fetchSettings = async (): Promise<Settings> => {
  const { data } = await axios.get('http://localhost:5001/api/v1/settings');
  return data.data; // API রেসপন্স থেকে সরাসরি data অবজেক্টটি রিটার্ন করা
};

export default function SettingsPage() {
  // TanStack Query ব্যবহার
  const { 
    data: settings, 
    isLoading, 
    isError, 
    error,
    isFetching,
    refetch 
  } = useQuery({
    queryKey: ['siteSettings'], // ইউনিক আইডেন্টিফায়ার
    queryFn: fetchSettings,      // ফেচিং ফাংশন
    refetchOnWindowFocus: true, // উইন্ডো ফোকাস করলে অটো আপডেট হবে
    staleTime: 1000 * 60 * 5,   // ৫ মিনিট পর্যন্ত ডাটা ফ্রেশ থাকবে
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-2 bg-white text-gray-900">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="font-medium tracking-wide">Synchronizing Settings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 shadow-sm text-center">
          <p className="font-bold mb-2">Error Loading Data</p>
          <p className="text-sm">{(error as any)?.message || "Something went wrong"}</p>
          <button 
            onClick={() => refetch()} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Site Configuration</h1>
            {isFetching && <RefreshCw size={16} className="animate-spin text-blue-500" />}
          </div>
          <p className="text-gray-500">Manage your store identity and global links</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => refetch()}
                className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm text-gray-600"
                title="Refresh Data"
            >
                <RefreshCw size={20} className={isFetching ? "animate-spin" : ""} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95">
                <Save size={18} /> Save All Changes
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: General Info & Communication */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800">
              <Globe className="text-blue-500" size={20} /> Store Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase">Site Name</label>
                <input 
                  type="text" 
                  defaultValue={settings?.siteName}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase">Tagline</label>
                <input 
                  type="text" 
                  defaultValue={settings?.tagline}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase">Full Address</label>
                <div className="relative">
                   <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                   <input 
                    type="text" 
                    defaultValue={settings?.address}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800">
              <Mail className="text-orange-500" size={20} /> Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase">Support Email</label>
                <input 
                  type="email" 
                  defaultValue={settings?.email}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 uppercase">Contact Phone</label>
                <input 
                  type="text" 
                  defaultValue={settings?.phone}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Currency & Social */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Currency</h2>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
              <h3 className="text-3xl font-bold text-emerald-700">{settings?.currencySymbol}</h3>
              <p className="text-sm text-emerald-800 font-medium">{settings?.currency}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800">
              <Share2 className="text-purple-500" size={20} /> Social Links
            </h2>
            <div className="space-y-4">
              {settings && Object.entries(settings.socialLinks).map(([platform, url]) => (
                <div key={platform} className="space-y-1">
                  <div className="flex items-center gap-2">
                    {platform === 'facebook' && <FaFacebook className="text-blue-600" />}
                    {platform === 'instagram' && <FaInstagram className="text-pink-600" />}
                    {platform === 'twitter' && <FaTwitter className="text-sky-500" />}
                    {platform === 'youtube' && <FaYoutube className="text-red-600" />}
                    {platform === 'linkedin' && <FaLinkedin className="text-blue-700" />}
                    <span className="text-xs font-bold uppercase text-gray-400">{platform}</span>
                  </div>
                  <input 
                    type="text" 
                    defaultValue={url} 
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-blue-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-between items-center text-gray-400 text-[10px] uppercase tracking-widest">
        <p>Resource ID: {settings?._id}</p>
        <p>Auto-Sync Active • Next.js 16.1.6</p>
      </div>
    </div>
  );
}