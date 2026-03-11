

"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/helper/BASE_URL";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext"; 

const Register = () => {
  const router = useRouter();
  const { loginUser } = useAuth(); 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const loadId = toast.loading("Creating your account...");

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
        withCredentials: true,
      });

      console.log("Registration Success Data:", response.data);

      if (response.data.success) {
        
        const userData = response.data.data;
        loginUser(userData);

        toast.success("Account created successfully!", { id: loadId });

       
        if (userData.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed!";
      console.error("Registration Error:", error);
      toast.error(errorMessage, { id: loadId });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9E4CB] flex flex-col items-center justify-center py-12 px-4 font-sans">
      <div className="max-w-[500px] w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">
            Create your account
          </h1>
          <p className="text-sm text-gray-600">
            Or{" "}
            <Link
              href="/login"
              className="font-bold text-black border-b border-black"
            >
              sign in
            </Link>{" "}
            to your existing account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 md:p-10 shadow-sm rounded-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="John"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 accent-black"
                required
              />
              <label className="text-[12px] text-gray-600">
                I agree to the{" "}
                <span className="font-bold text-black underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-bold text-black underline cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 mt-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-900 transition-all"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold border-b-2 border-black pb-0.5"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
