"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { BASE_URL } from "@/helper/BASE_URL";
import toast from "react-hot-toast";

// ১. ইউজারের ডাটা টাইপ ডিফাইন করা
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  avatar: { url: string };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (userData: User) => void;
  logoutUser: () => Promise<void>;
  checkUserAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ২. লগইন ফাংশন (স্টেট আপডেট করার জন্য)
  const loginUser = (userData: User) => {
    setUser(userData);
  };

  // ৩. চেক ইউজার (get-me API কল করে)
  const checkUserAuth = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/get-me`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ৪. লগআউট ফাংশন
  const logoutUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUser(null);
        toast.success("Logged out successfully!");
        window.location.href = "/"; // রিফ্রেশ করে লগইন পেজে পাঠানো
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  // ৫. অ্যাপ লোড হওয়ার সময় অটোমেটিক চেক করা
  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, checkUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// কাস্টম হুক
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};