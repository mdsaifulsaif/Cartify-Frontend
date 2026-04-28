/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { BASE_URL } from "@/helper/BASE_URL";
import ProductCard from "@/components/shared/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/categories/${id}/products`, {
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      if (res.data.success) {
        setProducts(res.data.data);
        setMeta(res.data.meta);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [id, currentPage]);

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [fetchProducts]);

  return (
    <div className="bg-white min-h-screen font-raleway py-10 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        {/* Header Section - Styled like Bestsellers */}
        <div className="flex flex-col md:flex-row items-baseline md:items-end justify-between gap-4 mb-12">
          {loading ? (
            <div className="space-y-2">
              <Skeleton width={300} height={40} />
              <Skeleton width={150} height={15} />
            </div>
          ) : (
            <>
              <div>
                <h2 className="section-title">
                  {products[0]?.categoryID?.name || "Collection"}
                </h2>
                <p className="content-text !text-[14px] mt-2 max-w-md">
                  {meta.total} Products Found
                </p>
              </div>

              <Link
                href="/shop"
                className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:opacity-70 transition-all border-b border-black pb-1"
              >
                Continue Shopping
                <IoArrowForwardOutline className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {loading ? (
            // ১০টি আলাদা স্কেলেটন কার্ড দেখাবে
            [...Array(10)].map((_, i) => <ProductCardSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((item: any) => (
              <ProductCard key={item._id} product={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-32 border-2 border-dashed border-gray-100 rounded-3xl">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                No products found
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Your Exact Style */}
        {!loading && meta.totalPage > 1 && (
          <div className="mt-20 flex justify-center items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo(0, 0);
              }}
              className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 transition-all text-xs"
            >
              ←
            </button>

            <div className="flex items-center gap-1">
              {[...Array(meta.totalPage)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx + 1);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-8 h-8 border text-[10px] font-bold transition-all ${
                    currentPage === idx + 1
                      ? "bg-black text-white border-black"
                      : "text-gray-400 border-gray-200 hover:border-black"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === meta.totalPage}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo(0, 0);
              }}
              className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 transition-all text-xs"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// সিঙ্গেল কার্ড স্কেলেটন
const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton
      height={280}
      borderRadius={2}
      baseColor="#f3f3f3"
      highlightColor="#ecebeb"
    />
    <Skeleton width="40%" height={10} />
    <Skeleton width="90%" height={18} />
    <Skeleton width="30%" height={14} />
  </div>
);

export default CategoryPage;
