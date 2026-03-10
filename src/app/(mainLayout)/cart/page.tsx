"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Link from "next/link";

interface ICartItem {
  _id: string;
  name: string;
  thumbnail: string;
  salePrice: number;
  quantity: number;
}

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCartStore() as any;

  const subtotal = cart.reduce((acc: number, item: ICartItem) => acc + item.salePrice * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleQuantity = (item: ICartItem, type: "inc" | "dec") => {
    if (type === "inc") addToCart(item, 1);
    else if (item.quantity > 1) addToCart(item, -1);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#FAF7F2] px-6">
        <div className="text-center">
          <h2 className="section-title !text-3xl mb-4">Your Bag is Empty</h2>
          <p className="content-text mb-8 max-w-xs mx-auto">Time to treat your skin to something special.</p>
          <Link href="/shop" className="global-btn !px-10">Shop All</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-10 md:py-20">
        <h1 className="section-title !text-left !text-3xl md:!text-5xl mb-10 md:mb-16">
          Shopping Bag <span className="text-gray-300 font-light">({cart.length})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          

          <div className="lg:col-span-7 xl:col-span-8 space-y-6 md:space-y-10">
            {cart.map((item: ICartItem) => (
              <div key={item._id} className="flex gap-4 md:gap-8 border-b border-gray-50 pb-6 md:pb-10 relative">
                
              
                <div className="w-24 h-28 md:w-32 md:h-40 bg-[#F9F9F9] flex-shrink-0 rounded-sm">
                  <img src={item.thumbnail} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>

            
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-[11px] md:text-[13px] uppercase tracking-widest font-black text-zinc-900 leading-tight">
                        {item.name}
                      </h3>
                      <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500 transition-colors md:hidden">
                        <FaTrash size={14} />
                      </button>
                    </div>
                    <p className="text-[14px] md:text-[16px] font-bold mt-2">${item.salePrice}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                 
                    <div className="flex items-center border border-gray-100 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-gray-50/50">
                      <button onClick={() => handleQuantity(item, "dec")} className="p-1">
                        <FaMinus size={10} className="text-gray-400" />
                      </button>
                      <span className="font-bold text-xs w-8 text-center">{item.quantity}</span>
                      <button onClick={() => handleQuantity(item, "inc")} className="p-1">
                        <FaPlus size={10} className="text-gray-400" />
                      </button>
                    </div>

                  
                    <button onClick={() => removeFromCart(item._id)} className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-300 hover:text-red-500 transition-colors">
                      <FaTrash size={12} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-[#FAF7F2] p-6 md:p-10 rounded-2xl md:sticky md:top-24">
              <h2 className="text-[12px] uppercase tracking-[0.2em] font-black mb-6 md:mb-10">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold">${shipping.toFixed(2)}</span>
                </div>
                <div className="h-px bg-zinc-200/50 my-4" />
                <div className="flex justify-between items-center text-black">
                  <span className="text-xs uppercase font-black">Total</span>
                  <span className="text-2xl font-black">${total.toFixed(2)}</span>
                </div>
              </div>

             
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="CODE"
                  className="flex-1 bg-white border border-gray-100 px-4 py-3 text-[11px] tracking-widest focus:outline-none rounded-sm"
                />
                <button className="bg-zinc-900 text-white px-5 py-3 text-[10px] uppercase font-bold rounded-sm">
                  Apply
                </button>
              </div>

              <Link href="/checkout" className="block w-full">
                <button className="global-btn !w-full !py-4 md:!py-5 !text-[11px] !rounded-full">
                  Checkout Now
                </button>
              </Link>
              
              <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-medium">
                Free returns on all eligible orders
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;