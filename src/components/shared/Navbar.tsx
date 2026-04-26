/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect } from "react";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoBagHandleOutline,
  IoCloseOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "@/helper/BASE_URL";
import { useAuth } from "@/context/authContext";
import { useCartStore } from "@/store/useCartStore";
import { useSettings } from "@/helper/useSettings";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { data: settings, isLoading } = useSettings();
  const [isMounted, setIsMounted] = useState(false);

  const cart = useCartStore((state) => state.cart || []);
  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // সার্চ লজিক ফিক্স: টাইপ করলে রেজাল্ট নিয়ে আসবে
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await axios.get(
            `${BASE_URL}/products?searchTerm=${searchQuery}`,
          );
          setSearchResults(res.data.data || []);
        } catch (err) {
          console.error("Search Error:", err);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const menuItems = [
    {
      name: "Skincare",
      path: "/skincare",
      sub: ["Cleansers", "Toners", "Serums"],
    },
    { name: "Shop", path: "/shop", sub: [] },
    {
      name: "Collections",
      path: "/collections",
      sub: ["Hydration", "Brightening"],
    },
    { name: "About", path: "/about", sub: [] },
    { name: "Contact", path: "/contact", sub: [] },
  ];

  if (!isMounted) return null;
   if (isLoading) return <div>Loading logo...</div>;

  return (
    <>
      {isScrolled && <div className="h-[72px] md:h-[84px]"></div>}

      <nav
        className={`${isScrolled ? "fixed top-0 left-0 shadow-md bg-white/90 backdrop-blur-md py-3" : "relative bg-white py-4"} w-full border-b border-gray-100 px-4 md:px-8 z-[100] transition-all duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-10">
            <button
              className="lg:hidden text-2xl text-gray-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <IoMenuOutline />
            </button>
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={isScrolled ? 70 : 80}
                height={40}
                className="w-auto h-auto"
                priority
              />
            </Link>
            <ul className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.path}
                    className="uppercase tracking-[0.15em] text-[11px] font-bold text-gray-600 hover:text-black transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center justify-end relative max-w-[300px] w-full">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex items-center w-full relative h-10"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full border rounded-full py-2 pl-4 pr-10 border-gray-200 text-sm focus:outline-none focus:border-black bg-transparent"
                      autoFocus
                    />
                    <IoCloseOutline
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-3 cursor-pointer text-gray-400 hover:text-black"
                    />

                    {/* ডেস্কটপ সার্চ রেজাল্ট ড্রপডাউন - এই অংশটুকু যোগ করা হয়েছে */}
                    {searchQuery.length > 1 && (
                      <div className="absolute top-full right-0 mt-2 w-full bg-white shadow-2xl border border-gray-100 rounded-lg overflow-hidden z-[120]">
                        {isSearching ? (
                          <p className="p-4 text-center text-xs italic text-gray-400">
                            Searching...
                          </p>
                        ) : searchResults.length > 0 ? (
                          <div className="max-h-[350px] overflow-y-auto">
                            {searchResults.map((p) => (
                              <Link
                                key={p._id}
                                href={`/product/${p._id}`}
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                              >
                                <Image
                                  src={p.thumbnail}
                                  alt={p.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                                <div className="flex flex-col">
                                  <span className="text-[12px] font-bold text-gray-800 line-clamp-1">
                                    {p.name}
                                  </span>
                                  <span className="text-[10px] text-gray-400">
                                    {p.salePrice} BDT
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <p className="p-4 text-center text-xs text-gray-400">
                            No products found
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <IoSearchOutline
                    onClick={() => setIsSearchOpen(true)}
                    className="text-xl cursor-pointer text-gray-700 hover:scale-110 transition-transform"
                  />
                )}
              </AnimatePresence>
            </div>

            <button
              className="md:hidden text-xl text-gray-700"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <IoCloseOutline /> : <IoSearchOutline />}
            </button>

            {/* Profile & Cart (design same) */}
            <div className="relative group">
              <IoPersonOutline className="text-xl cursor-pointer text-gray-700" />
              <div className="absolute right-0 top-full mt-4 w-44 bg-white shadow-2xl border border-gray-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 text-[13px] rounded-sm z-[110]">
                {!user ? (
                  <>
                    <Link
                      href="/register"
                      className="block px-4 py-2 hover:bg-gray-50 font-medium"
                    >
                      Create Account
                    </Link>
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-gray-50 font-medium"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="px-4 py-2 border-b border-gray-50 text-gray-400 text-[10px] uppercase font-bold">
                      Hello, {user.firstName}
                    </p>
                    <Link
                      href="/my-account"
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      My Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-50 text-black font-semibold"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </div>

            <Link href="/cart" className="relative group">
              <IoBagHandleOutline className="text-xl text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 px-5 py-4 z-[90] shadow-xl overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-black"
                autoFocus
              />
              {searchQuery.length > 1 && (
                <div className="mt-4 max-h-[50vh] overflow-y-auto">
                  {isSearching ? (
                    <p className="text-center text-[11px] py-4 italic text-gray-400">
                      Searching...
                    </p>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((p) => (
                      <Link
                        key={p._id}
                        href={`/product/${p._id}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 py-3 border-b border-gray-50"
                      >
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={p.thumbnail}
                            alt={p.name}
                            fill
                            className="rounded object-cover bg-gray-50"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-gray-800">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {p.salePrice} BDT
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-[11px] py-4 text-gray-400 uppercase">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* মোবাইল সাইডবার (Drawer) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween" }}
                className="fixed top-0 left-0 w-[280px] h-screen bg-white z-[160] shadow-2xl flex flex-col"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-50">
                  <Image
                    src="/assets/logo.png"
                    alt="Logo"
                    width={70}
                    height={35}
                  />
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <IoCloseOutline className="text-2xl text-gray-400 hover:text-black" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 font-sans">
                  <ul className="flex flex-col gap-6">
                    {menuItems.map((item) => (
                      <li
                        key={item.name}
                        className="border-b border-gray-50 pb-4"
                      >
                        <div className="flex justify-between items-center">
                          <Link
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="uppercase tracking-[0.2em] text-[11px] font-black text-gray-800"
                          >
                            {item.name}
                          </Link>
                          {item.sub.length > 0 && (
                            <button
                              className="text-gray-300 text-xl"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === item.name
                                    ? null
                                    : item.name,
                                )
                              }
                            >
                              {activeDropdown === item.name ? "−" : " a+"}
                            </button>
                          )}
                        </div>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden flex flex-col gap-3 mt-4 ml-4"
                            >
                              {item.sub.map((sub) => (
                                <Link
                                  key={sub}
                                  href={`/category/${sub.toLowerCase()}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="text-[11px] text-gray-500 uppercase tracking-widest"
                                >
                                  {sub}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
