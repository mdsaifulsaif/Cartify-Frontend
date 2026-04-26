"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaMinus, FaPlus, FaSearchPlus, FaTag } from "react-icons/fa";
import { BASE_URL } from "@/helper/BASE_URL";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import LoadingPage from "@/components/shared/LoadingPage";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Handpicked from "../_components/Handpicked ";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const { user } = useAuth();

  const [product, setProduct] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

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

  if (loading) return <DetailsSkeleton />;
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest">
          Product Not Found
        </p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-raleway">
      <div className="container mx-auto px-4 py-10 md:py-0 md:pt-16">
        {/* items-start helps prevent image stretch when details expand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          {/* Gallery Section - lg:sticky keeps image in place */}
          <div className="flex flex-col md:flex-row gap-4 lg:sticky lg:top-24">
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto no-scrollbar md:min-w-[80px]">
              {[product.thumbnail, ...(product.images || [])].map(
                (img: string, i: number) => (
                  <div
                    key={i}
                    className={`relative w-20 h-20 flex-shrink-0 cursor-pointer border rounded-sm transition-all ${
                      mainImage === img
                        ? "border-black"
                        : "border-gray-100 opacity-50"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ),
              )}
            </div>

            <div
              style={{
                width: "100%",
                maxWidth: "704px",
                height: "auto",
                aspectRatio: "704/908",
              }}
              className="flex-1 bg-[#F9F9F9] relative overflow-hidden rounded-sm order-1 md:order-2 group"
            >
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 right-6 bg-white/90 p-3 rounded-full shadow-sm">
                <FaSearchPlus className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col pt-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-black text-xs">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < (product.rating || 5) ? "text-black" : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-[12px] font-medium text-gray-500 underline decoration-gray-300">
                {reviews.length} Verified Reviews
              </span>
            </div>

            {/* Price & Savings */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-medium tracking-tight text-black">
                  TK {product.salePrice}
                </span>
                {product.regularPrice > product.salePrice && (
                  <span className="text-gray-400 line-through text-2xl">
                    TK {product.regularPrice}
                  </span>
                )}
              </div>
              {product.discountPercent > 0 && (
                <div className="flex items-center gap-2 text-gray-500 mt-3 uppercase tracking-widest text-[11px] font-bold">
                  <FaTag size={12} className="text-black" />
                  <span>Save {product.discountPercent}% right now</span>
                </div>
              )}
            </div>

            {/* Details with See More & Shadow */}
            <div className="space-y-10 border-t border-gray-100 pt-10">
              <div className="relative">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-black">
                  Details
                </h3>
                <div
                  className={`relative transition-all duration-500 ${!isExpanded ? "max-h-[85px] overflow-hidden" : "max-h-full"}`}
                >
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {product.description}
                  </p>
                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  )}
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-[10px] font-black uppercase tracking-widest border-b border-black pb-0.5"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              </div>

              {product.straight_up && (
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-black">
                    STRAIGHT UP:
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-relaxed italic">
                    {product.straight_up}
                  </p>
                </div>
              )}

              {product.lowdown && (
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-black">
                    THE LOWDOWN:
                  </h3>
                  <ul className="space-y-4">
                    {product.lowdown.map((item: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-gray-600 text-[15px]"
                      >
                        <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* SKU & Tags Above Buttons */}
            <div className="mt-12 mb-6 text-[10px] text-gray-400 uppercase font-bold tracking-widest flex flex-wrap gap-x-8 gap-y-2">
              <span>
                SKU: <span className="text-gray-900">{product.sku}</span>
              </span>
              <span>
                Tags:{" "}
                <span className="text-gray-900">
                  {product.tags?.join(", ") || "N/A"}
                </span>
              </span>
            </div>

            {/* Buttons Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between border border-gray-200 rounded-full px-8 py-4 bg-white min-w-[160px]">
                  <button
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="font-bold text-xl">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)}>
                    <FaPlus size={12} />
                  </button>
                </div>

                {/* <button
                  disabled={product.stock === 0}
                  onClick={() => {
                    addToCart(product, quantity);
                    toast.success("Added to Bag!");
                  }}
                  // flex, items-center, justify-center যোগ করা হয়েছে টেক্সট সেন্টারে আনার জন্য
                  className="flex-1 flex items-center justify-center bg-white border border-black text-black py-4 rounded-full font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-black hover:text-white transition-all disabled:opacity-20 text-center"
                >
                  Add to Shopping Bag
                </button> */}
                <SecondaryButton
                  disabled={product.stock === 0}
                  onClick={() => {
                    addToCart(product, quantity);
                    toast.success("Added to Bag!", {});
                  }}
                  className="flex-1 transition-all"
                >
                  Add to Shopping Bag
                </SecondaryButton>
              </div>
              {/* <button
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product, quantity);
                  router.push("/checkout");
                }}
                className="w-full bg-black text-white py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl disabled:bg-gray-200"
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : "Order Now (সরাসরি অর্ডার)"}
              </button> */}
              <PrimaryButton
                type="button"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product, quantity);
                  router.push("/checkout");
                }}
                className="w-full disabled:bg-gray-200"
              >
                {product.stock === 0 ? (
                  "Out of Stock"
                ) : (
                  <span className="flex items-center gap-2">
                    Order Now{" "}
                    <span className="font-normal text-[13px]">
                      (সরাসরি অর্ডার)
                    </span>
                  </span>
                )}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Ratings and Reviews - Image Based Design */}
      <div className="bg-[#F5D2A899]  p-8 md:p-16 mb-24 font-raleway">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Side: Summary & Write Review */}
            <div className="lg:w-1/3 flex flex-col items-start pt-4">
              <h3 className="md:text-4xl text-xl  font-bold text-gray-900 mb-4 tracking-tight">
                Ratings and Reviews
              </h3>
              <div className="flex items-center gap-3 mb-8 border border-gray-100 bg-white px-4 py-2 rounded-full">
                <div className="flex text-black text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="font-bold text-sm text-gray-600">
                  {reviews.length} Reviews
                </span>
              </div>

              {/* Post/Write Review Form */}
              {user ? (
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-white p-6 rounded-2xl shadow-sm space-y-4 w-full"
                >
                  <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-2">
                    Write a Review
                  </h4>
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
                    className="bg-black text-white py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-full w-full hover:bg-zinc-800 transition-all"
                  >
                    Post Review
                  </button>
                </form>
              ) : (
                <div className="bg-black text-white p-8 rounded-2xl w-full text-center">
                  <p className="text-sm leading-relaxed mb-5">
                    Sign in to share your experience with this product.
                  </p>
                  <Link
                    href="/login"
                    className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all inline-block"
                  >
                    Login Now
                  </Link>
                </div>
              )}
            </div>

            {/* Right Side: Review List (Stacked with Borders) */}
            <div className="lg:w-2/3 space-y-0 max-h-[700px] overflow-y-auto pr-4 no-scrollbar">
              {reviews.length > 0 ? (
                reviews.map((rev, i) => (
                  <div
                    key={i}
                    className={`py-10 ${i !== reviews.length - 1 ? "border-b border-gray-200" : ""}`}
                  >
                    <div className="flex items-start gap-5">
                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                        {rev.user?.firstName?.[0] || "U"}
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex text-black text-[10px]">
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
                          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter">
                            {new Date(rev.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>

                        <p className="text-gray-700 text-[15px] leading-relaxed italic">
                          "{rev.comment}"
                        </p>

                        <h5 className="font-bold text-[14px] text-black pt-1">
                          {rev.user?.firstName || "Verified Buyer"}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-20 ">
                  <p className="text-gray-400 uppercase tracking-widest text-xs">
                    Be the first to review
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" ">
        <Handpicked />
      </div>
    </div>
  );
};

export default ProductDetails;

const DetailsSkeleton = () => (
  <div className="bg-white min-h-screen font-raleway">
    <div className="container mx-auto px-4 py-10 md:pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Gallery Skeleton */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-100 animate-pulse rounded-sm"
              />
            ))}
          </div>
          <div className="flex-1 bg-gray-50 aspect-[704/908] w-full animate-pulse rounded-sm order-1 md:order-2" />
        </div>

        {/* Right: Info Skeleton */}
        <div className="flex flex-col pt-4 space-y-6">
          <div className="space-y-3">
            <div className="h-10 bg-gray-100 animate-pulse w-3/4 rounded-md" />
            <div className="h-4 bg-gray-50 animate-pulse w-1/4 rounded-md" />
          </div>

          <div className="space-y-4 py-6 border-y border-gray-100">
            <div className="h-12 bg-gray-100 animate-pulse w-1/2 rounded-md" />
            <div className="h-4 bg-gray-50 animate-pulse w-1/3 rounded-md" />
          </div>

          <div className="space-y-4">
            <div className="h-4 bg-gray-100 animate-pulse w-full rounded-sm" />
            <div className="h-4 bg-gray-100 animate-pulse w-full rounded-sm" />
            <div className="h-4 bg-gray-100 animate-pulse w-2/3 rounded-sm" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-10">
            <div className="h-[60px] bg-gray-100 animate-pulse flex-1 rounded-full" />
            <div className="h-[60px] bg-gray-100 animate-pulse flex-1 rounded-full" />
          </div>
          <div className="h-[60px] bg-gray-200 animate-pulse w-full rounded-full" />
        </div>
      </div>
    </div>
  </div>
);
