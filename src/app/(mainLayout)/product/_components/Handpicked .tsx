"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

import ProductCard from "@/components/shared/ProductCard"; 
import { BASE_URL } from "@/helper/BASE_URL";


interface IProduct {
  _id: string;
  name: string;
  thumbnail: string;
  salePrice: number;
  isNew?: boolean;
  isBestseller?: boolean;
  categoryID?: {
    name: string;
  };
  rating?: number;
  reviews?: number;
}

const Handpicked: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHandpicked = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/products`);

        if (response.data.success) {
   
          const allData: IProduct[] = response.data.data || response.data.products || [];

          if (allData.length > 0) {
          
            let filtered = allData.filter((item) => item.isNew === true);

        
            const sourceData = filtered.length >= 4 ? filtered : allData;

          
            const shuffled = [...sourceData]
              .sort(() => 0.5 - Math.random())
              .slice(0, 4);

            setProducts(shuffled);
          }
        }
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHandpicked();
  }, []);

  return (
    <section className="mt-16 mb-20">
      <div className="container mx-auto px-4">
        
      

          {/* Header Section */}
        <div className="flex flex-col md:flex-row items-baseline md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">
                   Hand picked for you
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

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-[3/4] bg-gray-100 animate-pulse rounded-sm"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-100 animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 border border-dashed border-gray-100 rounded-lg">
                <p className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.25em]">
                  No products available right now.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Handpicked;