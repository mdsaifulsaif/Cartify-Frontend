/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCartStore } from "@/store/useCartStore";
import axios from "axios";
import { BASE_URL } from "@/helper/BASE_URL";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { IoCheckmarkCircleOutline, IoChevronDown } from "react-icons/io5";
import ProtectedRoute from "@/components/ProtectedRoute";

interface ICartItem {
  _id: string;
  name: string;
  salePrice: number;
  quantity: number;
  thumbnail: string;
}

const CheckoutPage = () => {
  const { cart, clearCart } = useCartStore() as any;
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shippingCost, setShippingCost] = useState(5.99);

  const subtotal = cart.reduce(
    (acc: number, item: ICartItem) => acc + item.salePrice * item.quantity,
    0,
  );
  const totalAmount = (subtotal + shippingCost).toFixed(2);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Dhaka",
    state: "Dhaka",
    postalCode: "",
    country: "Bangladesh",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOrder = async (e: FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      // ১. ডাটাবেস অনুযায়ী অর্ডার পেলোড
      const orderPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        cartItems: cart.map((item: any) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.salePrice,
          thumbnail: item.thumbnail,
        })),
        shippingCost: shippingCost,
        totalAmount: parseFloat(totalAmount),
      };

      // ২. প্রথমে অর্ডার ক্রিয়েট করা
      const res = await axios.post(`${BASE_URL}/order/create`, orderPayload, {
        withCredentials: true,
      });

      if (res.data.success) {
        // ৩. অর্ডার সাকসেস হলে পেমেন্ট গেটওয়ে ইনিশিয়েট করা
        const paymentRes = await axios.post(`${BASE_URL}/payment/init`, {
          amount: parseFloat(totalAmount),
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }, { withCredentials: true });

        // ৪. পেমেন্ট ইউআরএল পাওয়া গেলে রিডাইরেক্ট করা
        if (paymentRes.data.success && paymentRes.data.data) {
          toast.success("Redirecting to payment gateway...");
          clearCart(); // পেমেন্টে যাওয়ার আগে কার্ট ক্লিয়ার করে দেওয়া নিরাপদ
          window.location.replace(paymentRes.data.data); 
        } else {
          toast.error("Payment initiation failed!");
        }
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
      console.error("Checkout Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // পেমেন্ট সাকসেস মেসেজ (পেমেন্ট গেটওয়ে থেকে ফেরার পর এই স্টেট ব্যবহৃত হবে না, 
  // বরং আলাদা সাকসেস পেজ ব্যবহৃত হবে। তবে আপনার ডিজাইনের জন্য এটি রাখা হলো)
  if (isSuccess) {
    return (
      <div className="bg-[#EFE3D0] min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-[#78A962] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <IoCheckmarkCircleOutline size={50} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Your payment has been <span className="text-[#78A962]">received!</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Please check your email for a payment confirmation & invoice.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-black text-white px-10 py-3 rounded-md font-bold text-xs uppercase tracking-widest"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute allowRoles={["user", "admin"]}>
      <div className="bg-[#EFE3D0] min-h-screen py-12 md:py-20 font-sans text-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl font-medium mb-10 text-gray-900">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* বাম পাশ: শিপিং ফর্ম */}
            <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-sm shadow-sm">
              <h2 className="text-sm font-bold mb-8 uppercase tracking-tight">
                Shipping Information
              </h2>

              <form onSubmit={handleOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">First name</label>
                    <input name="firstName" required onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Last name</label>
                    <input name="lastName" required onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Email</label>
                    <input type="email" name="email" required onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Phone</label>
                    <input name="phone" required onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">Apartment, suite, address</label>
                  <input name="address" required onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">City</label>
                    <select name="city" onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm bg-white focus:outline-none">
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">State</label>
                    <select name="state" onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm bg-white focus:outline-none">
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase">Postal Code</label>
                    <input name="postalCode" required onChange={handleChange} className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400" />
                  </div>
                </div>

                {/* শিপিং মেথড */}
                <div className="pt-8">
                  <h2 className="text-sm font-bold mb-6 uppercase">Shipping Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: "std", label: "Standard Shipping", price: 5.99 },
                      { id: "exp", label: "Express Shipping", price: 12.99 }
                    ].map((method) => (
                      <label key={method.id} className={`flex justify-between items-center p-4 border rounded-md cursor-pointer ${shippingCost === method.price ? "border-black bg-gray-50" : "border-gray-100"}`} onClick={() => setShippingCost(method.price)}>
                        <span className="text-xs font-medium">{method.label}</span>
                        <span className="text-xs font-bold">${method.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button type="submit" disabled={loading} className="bg-black text-white px-10 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400">
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>

            {/* ডান পাশ: অর্ডার সামারি */}
            <div className="lg:col-span-4 bg-white p-6 rounded-sm shadow-sm sticky top-24">
              <h2 className="text-[11px] font-bold mb-6 uppercase tracking-wider text-gray-400">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto no-scrollbar text-black">
                {cart.map((item: ICartItem) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-[#F9F9F9] p-2 flex-shrink-0">
                      <img src={item.thumbnail} className="w-full h-full object-contain" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[12px] font-bold leading-tight">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">${item.salePrice}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100 text-black">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold">${shippingCost}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-100 mt-4">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;