"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { IoArrowForwardOutline } from "react-icons/io5";
import ProductCard from "@/components/shared/ProductCard";
import { BASE_URL } from "@/helper/BASE_URL";

// ১. প্রোডাক্টের জন্য ইন্টারফেস ডিফাইন করা
interface IProduct {
  _id: string;
  name: string;
  thumbnail: string;
  salePrice: number;
  isBestseller?: boolean;
  categoryID?: {
    name: string;
  };
  rating?: number;
  reviews?: number;
}

function BestSellers() {
  // ২. টাইপ জেনেরিক ব্যবহার করা <IProduct[]>
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/products`);
        
        // API রেসপন্স টাইপ সেফটি চেক
        const allData: IProduct[] = response.data?.products || response.data?.data || [];

        if (allData.length > 0) {
          let filtered = allData.filter((item) => item.isBestseller === true);

          if (filtered.length < 4) {
            filtered = allData;
          }

          const randomFour = [...filtered]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

          setProducts(randomFour);
        }
      } catch (error: any) {
        console.error("Fetch Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-baseline md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">
              Bestsellers
            </h2>
            <p className="content-text !text-[14px] mt-2 max-w-md">
              Our community's most-loved Korean skincare essentials.
            </p>
          </div>

          <Link
            href="/shop"
            className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:opacity-70 transition-all border-b border-black pb-1"
          >
            View all products
            <IoArrowForwardOutline className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Grid Section */}
        {loading ? (
          <div className="product-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-50 aspect-square rounded-sm mb-4"></div>
                <div className="h-3 bg-gray-50 w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-50 w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-50 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 py-10 uppercase text-[11px] tracking-widest">
                No bestsellers found at the moment.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default BestSellers;