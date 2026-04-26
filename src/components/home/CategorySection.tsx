import React from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton"; 
import { BASE_URL } from "@/helper/BASE_URL";
import { ICategory } from "@/types/type";

async function getCategories(): Promise<ICategory[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 86400 }, 
    });

    if (!res.ok) return [];

    const result = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data.slice(0, 4);
    }
    return [];
  } catch (error) {
    console.error("Category fetch error:", error);
    return [];
  }
}

const CategorySection = async () => {
  const categories = await getCategories();


  const isLoading = !categories || categories.length === 0;

  return (
    <section className="bg-[#F5F2F0] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="section-title mb-10 text-center md:text-left">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.length > 0 ? (
            <>
              {categories.map((cat: ICategory) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.name?.toLowerCase().replace(/\s+/g, "-")}`}
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

              {/* Empty state slots (যদি ৪টির কম ডাটা থাকে) */}
              {categories.length < 4 &&
                [...Array(4 - categories.length)].map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="hidden md:flex aspect-square bg-white/50 border border-dashed border-gray-300 rounded-[8px] items-center justify-center"
                  >
                    <span className="text-gray-400 text-[10px] uppercase font-bold">
                      Coming Soon
                    </span>
                  </div>
                ))}
            </>
          ) : (
            
             [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-[8px] overflow-hidden">
                   <Skeleton height="100%" borderRadius={8} baseColor="#e5e7eb" highlightColor="#f3f4f6" />
                </div>
             ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;