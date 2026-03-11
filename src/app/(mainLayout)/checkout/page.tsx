"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCartStore } from "@/store/useCartStore";
import axios from "axios";
import { BASE_URL } from "@/helper/BASE_URL";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { IoCheckmarkCircleOutline, IoChevronDown } from "react-icons/io5";

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
    country: "Bangladesh", // Default selected
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOrder = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ডাটাবেস ইন্টারফেস অনুযায়ী ডাটা ফরম্যাট করা হচ্ছে
      const orderPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        // shippingAddress অবজেক্ট হিসেবে পাঠাতে হবে
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        // কার্ট আইটেমগুলোর ফিল্ড নেম ডাটাবেস অনুযায়ী ম্যাপিং
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

      const res = await axios.post(`${BASE_URL}/order/create`, orderPayload, {
        withCredentials: true,
      });

      if (res.data.success) {
        clearCart();
        setIsSuccess(true);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Order failed!");
      console.error("Order Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#EFE3D0] min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-[#78A962] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <IoCheckmarkCircleOutline size={50} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Your payment has been{" "}
            <span className="text-[#78A962]">received!</span>
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
    <div className="bg-[#EFE3D0] min-h-screen py-12 md:py-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-medium mb-10 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* বাম পাশ: ফর্ম (ইমেজ অনুযায়ী) */}
          <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-sm shadow-sm">
            <h2 className="text-sm font-bold mb-8 uppercase tracking-tight">
              Shipping Information
            </h2>

            <form onSubmit={handleOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">
                    First name
                  </label>
                  <input
                    name="firstName"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">
                    Phone
                  </label>
                  <input
                    name="phone"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-600 uppercase">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  name="address"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">
                    City
                  </label>
                  <select
                    name="city"
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 text-sm rounded-sm appearance-none bg-white focus:outline-none"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">
                    State/Province
                  </label>
                  <div className="relative">
                    <select
                      name="state"
                      onChange={handleChange}
                      className="w-full border border-gray-200 p-3 text-sm rounded-sm appearance-none bg-white focus:outline-none"
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                    <IoChevronDown className="absolute right-3 top-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-600 uppercase">
                    Postal Code
                  </label>
                  <input
                    name="postalCode"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-600 uppercase">
                  Country
                </label>
                <div className="relative">
                  <select
                    name="country"
                    className="w-full border border-gray-200 p-3 text-sm rounded-sm appearance-none bg-white focus:outline-none cursor-not-allowed"
                    disabled
                  >
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                  <IoChevronDown className="absolute right-3 top-4 text-gray-400" />
                </div>
              </div>

              {/* শিপিং মেথড সেকশন (ইমেজ অনুযায়ী) */}
              <div className="pt-8">
                <h2 className="text-sm font-bold mb-6 uppercase">
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      id: "std",
                      label: "Standard Shipping (5-7 business days)",
                      price: 5.99,
                    },
                    {
                      id: "exp",
                      label: "Express Shipping (2-3 business days)",
                      price: 12.99,
                    },
                    {
                      id: "ovn",
                      label: "Overnight Shipping (1 business day)",
                      price: 24.99,
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex justify-between items-center p-4 border rounded-md cursor-pointer transition-all ${shippingCost === method.price ? "border-black bg-gray-50" : "border-gray-100"}`}
                      onClick={() => setShippingCost(method.price)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${shippingCost === method.price ? "border-black" : "border-gray-300"}`}
                        >
                          {shippingCost === method.price && (
                            <div className="w-2 h-2 bg-black rounded-full" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-800">
                          {method.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold">${method.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-10 py-3 rounded-sm font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all"
                >
                  {loading ? "Processing..." : "Payment"}{" "}
                  <span className="text-lg">›</span>
                </button>
              </div>
            </form>
          </div>

          {/* ডান পাশ: সামারি (ইমেজ অনুযায়ী) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-sm shadow-sm sticky top-24">
            <h2 className="text-[11px] font-bold mb-6 uppercase tracking-wider text-gray-400">
              Order Summary
            </h2>
            <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto no-scrollbar">
              {cart.map((item: ICartItem) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-[#F9F9F9] p-2 flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      className="w-full h-full object-contain"
                      alt={item.name}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[12px] font-bold text-gray-800 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 uppercase mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    ${item.salePrice}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
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
  );
};

export default CheckoutPage;
