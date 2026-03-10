"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoBagHandleOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";

// ১. প্রোডাক্টের জন্য ইন্টারফেস ডিফাইন করা (টাইপ এরর ফিক্স করবে)
interface ProductProps {
  product: {
    _id: string;
    name: string;
    thumbnail: string;
    salePrice: number;
    categoryID?: {
      name: string;
    };
    rating?: number;
    reviews?: number;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  // ডিফল্ট ভ্যালু সেট করে রাখা যাতে ডাটা না থাকলেও ক্রাশ না করে
  const {
    _id,
    name,
    thumbnail,
    salePrice,
    categoryID,
    rating = 4.9,
    reviews = 186,
  } = product || {};

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product) {
      // @ts-ignore (যদি স্টোর টাইপ করা না থাকে)
      addToCart(product, 1);
      toast.success(`${name} added to cart!`, {
        style: {
          borderRadius: "0px",
          background: "#000",
          color: "#fff",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.1em"
        },
      });
    }
  };

  return (
    <Link href={`/product/${_id}`} className="product-card group">
      <div className="card-image-wrapper bg-[#F9F9F9]">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={name || "Product Image"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="card-image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] uppercase tracking-widest">
            No Image
          </div>
        )}

        {/* Desktop Add to Cart */}
        <div className="absolute inset-0 flex items-end justify-center p-3 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20 hidden md:flex">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-black w-full py-3 flex items-center justify-center gap-2 font-bold shadow-xl text-[10px] uppercase tracking-[0.15em] border border-gray-100"
            onClick={handleAddToCart}
          >
            <IoBagHandleOutline size={16} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
        
        {/* Mobile Quick Add */}
        <button 
          onClick={handleAddToCart}
          className="md:hidden absolute bottom-2 right-2 bg-white/90 p-2 rounded-full shadow-md z-30"
        >
          <IoBagHandleOutline size={16} />
        </button>
      </div>

      <div className="card-content pt-4">
        <span className="card-category">{categoryID?.name || "Skincare"}</span>
        <h3 className="card-title line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between mt-1">
          <p className="card-price">${salePrice}</p>
          <div className="rating-container">
            <span className="text-yellow-500">★</span>
            <span className="font-bold">{rating}</span>
            <span className="text-gray-300">({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;