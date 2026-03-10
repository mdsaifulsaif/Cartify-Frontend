

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/helper/BASE_URL";
import ProductCard from "@/components/shared/ProductCard";
import { IoBagHandleOutline } from "react-icons/io5"; 

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [activeCategoryName, setActiveCategoryName] =
    useState<string>("All Product");
  const [sortOption, setSortOption] = useState<string>("-createdAt");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Category fetch error", error);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `${BASE_URL}/products?page=${currentPage}&limit=8&sort=${sortOption}`;

        if (activeCategoryId) {
          url += `&category=${activeCategoryId}`;
        }

        const response = await axios.get(url);
        if (response.data.success) {
          setProducts(response.data.data);
          setTotalPages(response.data.meta?.totalPage || 1);
        }
      } catch (error) {
        console.error("Product fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, activeCategoryId, sortOption]);

  return (
    <div className="bg-white min-h-screen pb-20 font-raleway">
      {/* Header: Category & Sort */}
      <div className="bg-[#F9E4CB] py-4 border-b border-[#e5d8cb]">
        <div className="container mx-auto px-4 md:px-12 flex flex-wrap items-center justify-between gap-4">
          {/* Dynamic Categories */}
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => {
                setActiveCategoryId("");
                setActiveCategoryName("All Product");
                setCurrentPage(1);
              }}
              className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap pb-1 ${
                activeCategoryId === ""
                  ? "text-black border-b border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              All Product
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat._id}
                onClick={() => {
                  setActiveCategoryId(cat._id);
                  setActiveCategoryName(cat.name);
                  setCurrentPage(1);
                }}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap pb-1 ${
                  activeCategoryId === cat._id
                    ? "text-black border-b border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
            <span className="text-gray-500">Sort :</span>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent focus:outline-none cursor-pointer border-none outline-none font-bold"
            >
              <option value="-createdAt">Featured</option>
              <option value="salePrice">Price: Low to High</option>
              <option value="-salePrice">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="container mx-auto px-4 md:px-12 mt-12">
        {loading ? (
          <div className="h-96 flex justify-center items-center text-[10px] font-bold tracking-[0.3em] text-gray-300 uppercase">
            Loading Glowly Collection...
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination  */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => p - 1);
                    window.scrollTo(0, 0);
                  }}
                  className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 transition-all text-xs"
                >
                  {" "}
                  ←{" "}
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, idx) => (
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
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => p + 1);
                    window.scrollTo(0, 0);
                  }}
                  className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 transition-all text-xs"
                >
                  {" "}
                  →{" "}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State*/
          <div className="h-96 flex flex-col justify-center items-center text-center">
            <IoBagHandleOutline size={50} className="text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tighter">
              No products found
            </h3>
            <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-2 max-w-xs">
              Sorry, we couldn't find any products in the "{activeCategoryName}"
              category at this moment.
            </p>
            <button
              onClick={() => {
                setActiveCategoryId("");
                setActiveCategoryName("All Product");
              }}
              className="mt-6 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
            >
              Browse all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
