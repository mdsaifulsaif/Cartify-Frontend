"use client";

import React, { useState, useEffect } from "react";
import {
  IoPersonOutline,
  IoBagHandleOutline,
  IoCameraOutline,
} from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "@/helper/BASE_URL";
import LoadingPage from "@/components/shared/LoadingPage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const MyAccountPage = () => {
  const router = useRouter();
  const { setUser, logoutUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'orders'
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "Dhaka",
    postalCode: "",
    country: "Bangladesh",
    profileImage: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ১. প্রোফাইল ডাটা ফেচ করা
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/auth/get-me`, {
          withCredentials: true,
        });
        if (data.success) {
          const user = data.data;
          setUserData((prev) => ({
            ...prev,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            addressLine: user.shippingAddress?.addressLine || "",
            city: user.shippingAddress?.city || "",
            state: user.shippingAddress?.state || "Dhaka",
            postalCode: user.shippingAddress?.postalCode || "",
            profileImage: user.avatar?.url || "",
          }));
        }
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // ২. অর্ডার হিস্ট্রি ফেচ করা
  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        setOrderLoading(true);
        try {
          const { data } = await axios.get(`${BASE_URL}/order/my-orders`, {
            withCredentials: true,
          });
          if (data.success) {
            setOrders(data.data || []);
          }
        } catch (err) {
          console.error("Order fetch error:", err);
        } finally {
          setOrderLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // সবকিছুর জন্য কমন আপডেট ফাংশন
  const handleGeneralUpdate = async (
    type: "profile" | "address" | "password",
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (type === "profile") {
        formData.append("firstName", userData.firstName);
        formData.append("lastName", userData.lastName);
        formData.append("phoneNumber", userData.phone);
        if (selectedFile) formData.append("avatar", selectedFile);
      } else if (type === "address") {
        formData.append("addressLine", userData.addressLine);
        formData.append("city", userData.city);
        formData.append("state", userData.state);
        formData.append("postalCode", userData.postalCode);
      } else if (type === "password") {
        if (
          !userData.currentPassword ||
          !userData.newPassword ||
          !userData.confirmPassword
        ) {
          toast.error("Please fill all password fields");
          setLoading(false);
          return;
        }
        if (userData.newPassword !== userData.confirmPassword) {
          toast.error("New passwords do not match!");
          setLoading(false);
          return;
        }
        formData.append("currentPassword", userData.currentPassword);
        formData.append("newPassword", userData.newPassword);
      }

      const { data } = await axios.patch(
        `${BASE_URL}/auth/update-profile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setUser(data.data);
        if (type === "password") {
          setUserData((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }));
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ডিজাইন অনুযায়ী ইনপুট ফিল্ডের স্টাইল
  const inputStyle =
    "w-full border border-[#E5E5E5] p-3 text-sm rounded-md focus:outline-none focus:border-black transition-colors";
  const labelStyle =
    "text-[11px] font-bold text-gray-700 uppercase tracking-widest";
  const buttonStyle =
    "bg-black text-white px-8 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity disabled:bg-gray-400";

  return (
    <div className="bg-white min-h-screen py-10 md:py-20 font-raleway text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6">
        {/* মেইন হেডার */}
        <header className="mb-10">
          <h1 className="text-4xl font-medium mb-1 italic">My Account</h1>
        </header>

        {/* ট্যাব নেভিগেশন (ইমেজ অনুযায়ী) */}
        <div className="flex gap-4 mb-16 border-b border-gray-100 pb-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "profile"
                ? "bg-black text-white shadow-lg"
                : "bg-white text-black border border-gray-200"
            }`}
          >
            <IoPersonOutline size={16} /> Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "orders"
                ? "bg-black text-white shadow-lg"
                : "bg-white text-black border border-gray-200"
            }`}
          >
            <IoBagHandleOutline size={16} /> Order History
          </button>
        </div>

        {/* মেইন কন্টেন্ট এলাকা */}
        {activeTab === "profile" ? (
          <div className="space-y-16 animate-in fade-in duration-500">
            {/* 1. User Information */}
            <section>
              <h2 className="text-xl font-bold mb-8">User Information</h2>
              <div className="relative w-32 h-32 mb-10 group">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : userData.profileImage || "/placeholder-user.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border border-gray-100 shadow-sm"
                />
                <label className="absolute bottom-1 right-1 bg-black text-white p-2.5 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-xl">
                  <IoCameraOutline size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl">
                <div className="space-y-2">
                  <label className={labelStyle}>First name</label>
                  <input
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    type="text"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>Last name</label>
                  <input
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    type="text"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>Email</label>
                  <input
                    name="email"
                    value={userData.email}
                    readOnly
                    type="email"
                    className={`${inputStyle} bg-gray-50 cursor-not-allowed`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>Phone</label>
                  <input
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    type="text"
                    className={inputStyle}
                  />
                </div>
              </div>
              <button
                onClick={() => handleGeneralUpdate("profile")}
                disabled={loading}
                className={`${buttonStyle} mt-8`}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </section>

            {/* 2. Shipping Address */}
            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold mb-8">Shipping Address</h2>
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-2">
                  <label className={labelStyle}>
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    name="addressLine"
                    value={userData.addressLine}
                    onChange={handleChange}
                    type="text"
                    className={inputStyle}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                  <div className="space-y-2">
                    <label className={labelStyle}>City</label>
                    <input
                      name="city"
                      value={userData.city}
                      onChange={handleChange}
                      type="text"
                      className={inputStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelStyle}>State/Province</label>
                    <select
                      name="state"
                      value={userData.state}
                      onChange={handleChange}
                      className={`${inputStyle} bg-white`}
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelStyle}>Postal Code</label>
                    <input
                      name="postalCode"
                      value={userData.postalCode}
                      onChange={handleChange}
                      type="text"
                      className={inputStyle}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleGeneralUpdate("address")}
                  disabled={loading}
                  className={`${buttonStyle} mt-2`}
                >
                  Update Shipping Address
                </button>
              </div>
            </section>

            {/* 3. Change Password */}
            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold mb-8">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 max-w-4xl">
                <div className="space-y-2">
                  <label className={labelStyle}>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={userData.currentPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={inputStyle}
                  />
                </div>
              </div>
              <button
                onClick={() => handleGeneralUpdate("password")}
                disabled={loading}
                className={`${buttonStyle} mt-8`}
              >
                Change Password
              </button>
            </section>

            {/* লগআউট বাটন (ইমেজ অনুযায়ী একদম নিচে) */}
            <div className="pt-8 border-t border-gray-100">
              <button
                onClick={logoutUser}
                className="text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-500 px-6 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          /* অর্ডার হিস্ট্রি ট্যাব */
          <div className="space-y-8 animate-in fade-in duration-500">
            {orderLoading ? (
              <LoadingPage />
            ) : orders.length > 0 ? (
              orders.map((order: any) => (
                <div
                  key={order._id}
                  className="border border-gray-100 rounded-lg p-8 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* অর্ডার আইটেম ডিজাইন আগের মতোই থাকবে */}
                </div>
              ))
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-100 rounded-lg">
                <p className="text-gray-400 uppercase text-[11px] font-bold tracking-widest">
                  No orders found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountPage;
