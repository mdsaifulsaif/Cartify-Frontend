"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EFE3D0] flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <IoCheckmarkCircle className="text-green-600 size-16" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-8">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Transaction ID</p>
          <p className="text-sm font-mono text-gray-800 break-all">{transactionId}</p>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full bg-black text-white py-3 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;