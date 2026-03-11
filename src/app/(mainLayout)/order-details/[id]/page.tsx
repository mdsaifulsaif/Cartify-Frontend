"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/helper/BASE_URL";
import LoadingPage from "@/components/shared/LoadingPage";
import { IoArrowBack } from "react-icons/io5";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeDetailsTab, setActiveDetailsTab] = useState("summary"); // 'summary' or 'shipping'

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/order/my-orders/${id}`, {
          withCredentials: true,
        });
        if (data.success) {
          setOrder(data.data);
        }
      } catch (err) {
        console.error("Error fetching order details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (!order) return <div className="text-center py-20">Order not found</div>;

  return (
    <div className="bg-[#F4EBE2] min-h-screen py-10 md:py-20 font-raleway text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-600 mb-8 hover:text-black transition-colors"
        >
          <IoArrowBack size={16} /> Back to Account
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-sm p-8 md:p-12 shadow-sm animate-in fade-in duration-700">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Order ORD-{order._id.slice(-5).toUpperCase()}
              </h1>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <span className="bg-[#E8F3EE] text-[#2D8A5B] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {order.status || "Shipped"}
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-12">
            <button
              onClick={() => setActiveDetailsTab("summary")}
              className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeDetailsTab === "summary"
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black border border-gray-100 hover:bg-gray-50"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveDetailsTab("shipping")}
              className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeDetailsTab === "shipping"
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-black border border-gray-100 hover:bg-gray-50"
              }`}
            >
              Shipping
            </button>
          </div>

          {/* Content Sections */}
          {activeDetailsTab === "summary" ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50 pb-4 mb-8">
                Order Items
              </h2>
              <div className="space-y-8 mb-12">
                {order.cartItems?.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold capitalize mb-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">
                      $
                      {(
                        Number(item.price) * (Number(item.quantity) || 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-10 border-t border-gray-50 max-w-sm ml-auto space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-medium">
                    $
                    {(order.totalAmount - (order.shippingCost || 0)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-medium">
                    ${Number(order.shippingCost || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span className="opacity-70">Discount (0%)</span>
                  <span className="font-medium">-$0.00</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-gray-100">
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Total
                  </span>
                  <span className="text-2xl font-bold">
                    ${Number(order.totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-12">
              {/* Shipping Address */}
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                  Shipping Address
                </h2>
                <div className="text-sm text-gray-700 space-y-1.5 leading-relaxed">
                  <p className="font-bold text-base text-black mb-1">
                    {order.firstName} {order.lastName}
                  </p>
                  <p className="text-gray-500 mb-2">{order.email}</p>
                  <p>{order.shippingAddress?.address}</p>
                  <p>
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.postalCode}
                  </p>
                  <p>{order.shippingAddress?.country}</p>
                  <p className="pt-3 font-medium text-black">{order.phone}</p>
                </div>
              </section>

              {/* Shipping Method */}
              <section className="pt-8 border-t border-gray-50">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                  Shipping Method
                </h2>
                <p className="text-sm font-medium">
                  Standard Shipping (5-7 business days)
                </p>
              </section>

              {/* Tracking Info */}
              <section className="pt-8 border-t border-gray-50 flex flex-wrap justify-between items-end gap-4">
                <div>
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Tracking Information
                  </h2>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                    Tracking Number:
                  </p>
                  <p className="text-sm font-bold mt-1">
                    {order._id.slice(-12).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                    Estimated Delivery:
                  </p>
                  <p className="text-sm font-bold mt-1">
                    {new Date(
                      new Date(order.createdAt).getTime() +
                        7 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
