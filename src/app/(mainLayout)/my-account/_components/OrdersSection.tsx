"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/shared/LoadingPage"; // তোমার প্রজেক্ট অনুযায়ী পাথ ঠিক করে নিও

// ১. TypeScript Interfaces (টাইপ ডিফাইন করা)
interface CartItem {
  name: string;
  qty: number;
  salePrice: number;
}

interface Order {
  _id: string;
  createdAt: string;
  status: "Delivered" | "Pending" | "Processing" | "Shipped" | string;
  totalAmount: number;
  cartItems: CartItem[];
}

interface OrdersTabProps {
  activeTab: string;
  orders: Order[];
  orderLoading: boolean;
}

const OrdersSection: React.FC<OrdersTabProps> = ({ activeTab, orders, orderLoading }) => {
  const router = useRouter();

  return (
    <>
      {activeTab === "orders" && (
        <div className="space-y-6 font-raleway">
          {orderLoading ? (
            <LoadingPage />
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-100 rounded-sm p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-[#1A1A1A] uppercase tracking-tight">
                      Order ORD-{order._id.slice(-5).toUpperCase()}
                    </h3>
                    <p className="text-[11px] md:text-sm text-gray-400 mt-1 uppercase tracking-widest">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider ${
                        order.status === "Delivered"
                          ? "bg-green-50 text-green-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="text-lg font-bold text-[#1A1A1A] mt-2">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Product List Inside Order */}
                <div className="space-y-3 mb-8 border-t border-b border-gray-50 py-4">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-[13px] text-gray-600"
                    >
                      <span className="font-medium">
                        {item.name} <span className="text-gray-400 ml-1">x {item.qty}</span>
                      </span>
                      <span className="font-bold text-gray-900">
                        ${(item.salePrice * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => router.push(`/order-details/${order._id}`)}
                  className="w-full border border-gray-200 py-4 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.98]"
                >
                  View Order Details
                </button>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-gray-50 rounded-sm">
               <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                No orders found in your history
              </p>
              <button 
                onClick={() => router.push('/shop')}
                className="mt-4 text-[10px] border-b border-black font-bold uppercase tracking-widest pb-1"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrdersSection;