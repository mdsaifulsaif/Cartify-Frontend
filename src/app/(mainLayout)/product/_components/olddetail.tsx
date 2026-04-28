

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaMinus, FaPlus, FaSearchPlus } from "react-icons/fa";
import { BASE_URL } from "@/helper/BASE_URL";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import LoadingPage from "@/components/shared/LoadingPage";
import { useParams } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import Handpicked from "../_components/Handpicked ";
import { IProduct } from "@/types/type";

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const { user } = useAuth();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [prodRes, revRes] = await Promise.all([
          axios.get(`${BASE_URL}/products/${id}`),
          axios.get(`${BASE_URL}/reviews/${id}`),
        ]);

        if (prodRes.data.success) {
          setProduct(prodRes.data.data);
          setMainImage(prodRes.data.data.thumbnail);
        }
        setReviews(Array.isArray(revRes.data?.data) ? revRes.data.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");

    try {
      const res = await axios.post(
        `${BASE_URL}/reviews/add-review`,
        { productID: id, rating, comment },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success("Review added!");
        setComment("");

        setReviews([
          {
            rating,
            comment,
            user: { firstName: user.firstName },
            createdAt: new Date(),
          },
          ...reviews,
        ]);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading || !product) return <LoadingPage />;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        {/* SECTION 1: Gallery & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails (Left on Desktop) */}
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-y-auto no-scrollbar md:min-w-[80px]">
              {[product.thumbnail, ...product.images].map((img, i) => (
                <div
                  key={i}
                  className={`relative w-20 h-20 flex-shrink-0 cursor-pointer border rounded-sm overflow-hidden transition-all ${
                    mainImage === img
                      ? "border-black shadow-md scale-95"
                      : "border-gray-100 opacity-60"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-50 relative aspect-square md:aspect-auto md:h-[600px] overflow-hidden rounded-sm order-1 md:order-2 group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow-sm">
                <FaSearchPlus className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <span className="text-[12px] uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
              {product.categoryID?.name}
            </span>
            <h1 className="section-title !text-left !text-4xl md:!text-5xl mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-black text-[10px]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="content-text !text-[12px]">
                ({reviews.length} Verified Reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-3xl font-bold tracking-tight">
                ${product.salePrice}
              </span>
              {/* {product.regularPrice > product.salePrice && (
                <span className="text-gray-400 line-through text-lg">${product.regularPrice}</span>
              )} */}
              {product.regularPrice &&
                product.regularPrice > product.salePrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ${product.regularPrice}
                  </span>
                )}
            </div>

            <div className="space-y-8 mb-12 border-t border-gray-100 pt-8">
              {product.description && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-black mb-3">
                    The Lowdown:
                  </h4>
                  <p className="content-text leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {product.lowdown && product.lowdown.length > 0 && (
                <ul className="space-y-2">
                  {product.lowdown.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-gray-600 italic"
                    >
                      <span className="text-black">•</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center justify-between border border-gray-200 rounded-full px-6 py-4 bg-gray-50 min-w-[150px]">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="hover:text-gray-400 transition-colors"
                >
                  <FaMinus size={12} />
                </button>
                <span className="font-bold text-lg px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="hover:text-gray-400 transition-colors"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              <button
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product, quantity);
                  toast.success(`${product.name} added!`, {
                    style: {
                      background: "#000",
                      color: "#fff",
                      borderRadius: "0px",
                      fontSize: "12px",
                    },
                  });
                }}
                className={`flex-1 global-btn !rounded-full !py-5 ${product.stock === 0 ? "bg-gray-300 pointer-events-none" : ""}`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Shopping Bag"}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Reviews - New Layout */}
        <div className="bg-[#FAF7F2] rounded-3xl p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h3 className="section-title !text-left !text-3xl mb-4">
                Customer Stories
              </h3>
              <div className="flex items-center gap-3 mb-10">
                <div className="flex text-black text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="font-bold text-sm">
                  {reviews.length} Reviews
                </span>
              </div>

              {user ? (
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
                >
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar
                        key={n}
                        onClick={() => setRating(n)}
                        className={`cursor-pointer text-xl ${rating >= n ? "text-black" : "text-gray-100"}`}
                      />
                    ))}
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Your thoughts..."
                    className="w-full border-gray-100 border-2 p-4 rounded-xl focus:outline-none focus:border-black text-sm"
                    rows={4}
                    required
                  />
                  <button
                    type="submit"
                    className="global-btn !py-3 !text-[10px] !rounded-sm w-full"
                  >
                    Post Review
                  </button>
                </form>
              ) : (
                <div className="bg-black text-white p-6 rounded-2xl">
                  <p className="text-sm">
                    Sign in to share your experience with this product.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block mt-4 underline text-xs font-bold uppercase tracking-widest"
                  >
                    Login Now
                  </Link>
                </div>
              )}
            </div>

            <div className="lg:col-span-8 space-y-8 max-h-[600px] overflow-y-auto pr-4 no-scrollbar">
              {reviews.length > 0 ? (
                reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="bg-white/50 p-6 rounded-2xl border border-white/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                          {rev.user?.firstName?.[0] || "U"}
                        </div>
                        <div>
                          <div className="flex text-black text-[8px] mb-1">
                            {[...Array(5)].map((_, idx) => (
                              <FaStar
                                key={idx}
                                className={
                                  idx < rev.rating
                                    ? "text-black"
                                    : "text-gray-200"
                                }
                              />
                            ))}
                          </div>
                          <h5 className="font-bold text-[13px]">
                            {rev.user?.firstName || "Verified Buyer"}
                          </h5>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="content-text !text-[14px] italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-20">
                  <p className="text-gray-400 uppercase tracking-widest text-xs">
                    Be the first to review
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <Handpicked />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;