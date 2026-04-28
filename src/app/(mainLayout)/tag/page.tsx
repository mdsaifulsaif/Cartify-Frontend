
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BASE_URL } from "@/helper/BASE_URL";
import ProductCard from "@/components/shared/ProductCard";
import { IoBagHandleOutline, IoPricetagOutline } from "react-icons/io5";

const TagPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();


  const queryPage = Number(searchParams.get("page")) || 1;
  const queryTag = searchParams.get("tag") || "";
  const querySort = searchParams.get("sort") || "-createdAt";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);


  const updateFilters = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };


  useEffect(() => {
    const fetchProducts = async () => {
      if (!queryTag) return;
      
      try {
        setLoading(true);
 
        const url = `${BASE_URL}/products?page=${queryPage}&limit=8&sort=${querySort}&tag=${queryTag}`;

        const response = await axios.get(url);
        if (response.data.success) {
          setProducts(response.data.data);
          setTotalPages(response.data.meta?.totalPage || 1);
        }
      } catch (error) {
        console.error("Tag product fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [queryPage, queryTag, querySort]);

  return (
    <div className="bg-white min-h-screen pb-20 font-raleway">
      {/* Header: Tag Name & Sort */}
      <div className="bg-[#F3F4F6] py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-black">
               <IoPricetagOutline size={24} />
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Tag Collection</p>
                <h1 className="text-2xl font-bold uppercase tracking-tighter text-gray-900">
                   #{queryTag || "No Tag Selected"}
                </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-gray-500">Sort :</span>
            <select
              value={querySort}
              onChange={(e) => updateFilters({ sort: e.target.value, page: 1 })}
              className="bg-transparent focus:outline-none cursor-pointer border-none outline-none font-bold"
            >
              <option value="-createdAt">Newest First</option>
              <option value="salePrice">Price: Low to High</option>
              <option value="-salePrice">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 mt-12">
        {loading ? (
          /* আপনার দেওয়া Skeleton Loading State */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton height={280} borderRadius={8} baseColor="#f9f9f9" />
                <Skeleton width="40%" height={12} />
                <Skeleton width="90%" height={20} />
                <Skeleton width="30%" height={15} />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination: আপনার শপ পেজের স্টাইল অনুযায়ী */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-1">
                <button
                  disabled={queryPage === 1}
                  onClick={() => {
                    updateFilters({ page: queryPage - 1 });
                    window.scrollTo(0, 0);
                  }}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 transition-all text-sm"
                >
                  ←
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        updateFilters({ page: idx + 1 });
                        window.scrollTo(0, 0);
                      }}
                      className={`w-10 h-10 border text-[11px] font-bold transition-all ${
                        queryPage === idx + 1
                          ? "bg-black text-white border-black"
                          : "text-gray-400 border-gray-200 hover:border-black"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={queryPage === totalPages}
                  onClick={() => {
                    updateFilters({ page: queryPage + 1 });
                    window.scrollTo(0, 0);
                  }}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 transition-all text-sm"
                >
                  →
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State: যখন কোনো প্রোডাক্ট পাওয়া যাবে না */
          <div className="h-96 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <IoBagHandleOutline size={40} className="text-gray-200" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tighter">
              No products found
            </h3>
            <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-2 max-w-xs">
              We couldn't find any products tagged with "{queryTag}".
            </p>
            <button
              onClick={() => router.push('/shop')}
              className="mt-6 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
            >
              Back to Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TagPage = () => {
    return (
        <Suspense fallback={<div className="container mx-auto px-12 mt-12 text-xs uppercase tracking-widest">Loading...</div>}>
            <TagPageContent />
        </Suspense>
    );
};

export default TagPage;