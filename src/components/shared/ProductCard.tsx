// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { IoBagHandleOutline } from "react-icons/io5";
// import Link from "next/link";
// import Image from "next/image";
// import { useCartStore } from "@/store/useCartStore";
// import toast from "react-hot-toast";
// import { ProductProps } from "@/types/type";



// const ProductCard = ({ product }: ProductProps) => {
//   const addToCart = useCartStore((state) => state.addToCart);


//   const {
//     _id,
//     name,
//     thumbnail,
//     salePrice,
//     categoryID,
//     rating = 4.9,
//     reviews = 186,
//   } = product || {};

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (product) {
    
//       addToCart(product, 1);
//       toast.success(`${name} added to cart!`, {
//         style: {
//           borderRadius: "0px",
//           background: "#000",
//           color: "#fff",
//           fontSize: "11px",
//           textTransform: "uppercase",
//           letterSpacing: "0.1em"
//         },
//       });
//     }
//   };

//   return (
//     <Link href={`/product/${_id}`} className="product-card group">
//       <div className="card-image-wrapper bg-[#F9F9F9]">
//         {thumbnail ? (
//           <Image
//             src={thumbnail}
//             alt={name || "Product Image"}
//             fill
//             sizes="(max-width: 768px) 50vw, 25vw"
//             className="card-image"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] uppercase tracking-widest">
//             No Image
//           </div>
//         )}

//         {/* Desktop Add to Cart */}
//         <div className="absolute inset-0 flex items-end justify-center p-3 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20 hidden md:flex">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="bg-white text-black w-full py-3 flex items-center justify-center gap-2 font-bold shadow-xl text-[10px] uppercase tracking-[0.15em] border border-gray-100"
//             onClick={handleAddToCart}
//           >
//             <IoBagHandleOutline size={16} />
//             <span>Add to Cart</span>
//           </motion.button>
//         </div>
        
//         {/* Mobile Quick Add */}
//         <button 
//           onClick={handleAddToCart}
//           className="md:hidden absolute bottom-2 right-2 bg-white/90 p-2 rounded-full shadow-md z-30"
//         >
//           <IoBagHandleOutline size={16} />
//         </button>
//       </div>

//       <div className="card-content pt-4">
//         <span className="card-category">{categoryID?.name || "Skincare"}</span>
//         <h3 className="card-title line-clamp-1">{name}</h3>
//         <div className="flex items-center justify-between mt-1">
//           <p className="card-price">${salePrice}</p>
//           <div className="rating-container">
//             <span className="text-yellow-500">★</span>
//             <span className="font-bold">{rating}</span>
//             <span className="text-gray-300">({reviews})</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;


"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoBagHandleOutline, IoFlashOutline } from "react-icons/io5"; // নতুন আইকন
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";
import { ProductProps } from "@/types/type";
import { useRouter } from "next/navigation"; // রাউটিং এর জন্য

const ProductCard = ({ product }: ProductProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const {
    _id,
    name,
    thumbnail,
    salePrice,
    categoryID,
    rating = 4.9,
    reviews = 186,
  } = product || {};

  // Add to Cart Logic
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product) {
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

  // Direct Order / Buy Now Logic
  const handleDirectOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product) {
      addToCart(product, 1); // কার্টে অ্যাড হবে
      router.push("/checkout"); // সরাসরি চেকআউট পেজে যাবে
    }
  };

  return (
    <Link href={`/product/${_id}`} className="product-card group">
      <div className="card-image-wrapper bg-[#F9F9F9] relative overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={name || "Product Image"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="card-image group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] uppercase tracking-widest">
            No Image
          </div>
        )}

        {/* Desktop Overlay: Two Buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-end p-3 gap-2 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20 hidden md:flex">
          {/* Direct Order Button (Premium Style) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white w-full py-3 flex items-center justify-center gap-2 font-bold shadow-xl text-[10px] uppercase tracking-[0.15em]"
            onClick={handleDirectOrder}
          >
            <IoFlashOutline size={16} className="text-yellow-400" />
            <span>Order Now</span>
          </motion.button>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-black w-full py-3 flex items-center justify-center gap-2 font-bold shadow-sm text-[10px] uppercase tracking-[0.15em] border border-gray-100"
            onClick={handleAddToCart}
          >
            <IoBagHandleOutline size={16} />
            <span>Add to Bag</span>
          </motion.button>
        </div>
        
        {/* Mobile Quick Actions */}
        <div className="md:hidden absolute bottom-2 right-2 flex flex-col gap-2 z-30">
          <button 
            onClick={handleDirectOrder}
            className="bg-black text-white p-2.5 rounded-full shadow-lg"
          >
            <IoFlashOutline size={18} className="text-yellow-400" />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-white/90 p-2.5 rounded-full shadow-md border border-gray-100"
          >
            <IoBagHandleOutline size={18} />
          </button>
        </div>
      </div>

      <div className="card-content pt-4">
        <span className="card-category">{categoryID?.name || "Skincare"}</span>
        <h3 className="card-title line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between mt-1">
          <p className="card-price font-bold text-gray-900">${salePrice}</p>
          <div className="rating-container flex items-center gap-1 text-[11px]">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="font-bold">{rating}</span>
            <span className="text-gray-300">({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;