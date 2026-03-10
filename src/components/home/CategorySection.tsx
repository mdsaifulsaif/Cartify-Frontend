"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/helper/BASE_URL";


interface ICategory {
  _id: string;
  name: string;
  image: string;
}

const CategorySection = () => {

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        if (response.data.success) {
      
          setCategories(response.data.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-[#F5F2F0] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="section-title mb-10 text-center md:text-left">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 animate-pulse rounded-[8px]"
              ></div>
            ))
          ) : (
            <>
              {categories.map((cat: ICategory) => (
                <Link
                  key={cat._id}
           
                  href={`/category/${cat.name?.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative group cursor-pointer overflow-hidden aspect-square rounded-[8px]"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={false}
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center z-10 p-4">
                    <h3 className="text-white text-sm md:text-lg font-bold tracking-widest uppercase text-center">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}

          
              {categories.length < 4 && 
                [...Array(4 - categories.length)].map((_, i) => (
                  <div key={`empty-${i}`} className="hidden md:flex aspect-square bg-white/50 border border-dashed border-gray-300 rounded-[8px] items-center justify-center">
                    <span className="text-gray-400 text-[10px] uppercase font-bold">Coming Soon</span>
                  </div>
                ))
              }
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;