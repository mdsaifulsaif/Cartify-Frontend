/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoBagHandleOutline,
  IoCloseOutline,
  IoMenuOutline,
  IoChevronDownOutline,
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
  const [categories, setCategories] = useState<any[]>([]);
  
  const cart = useCartStore((state) => state.cart || []);
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ক্যাটাগরি ফেচ করা
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Category fetch error", error);
      }
    };
    fetchCategories();
  }, []);

  // সার্চ লজিক
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await axios.get(`${BASE_URL}/products?searchTerm=${searchQuery}`);
          setSearchResults(res.data.data || []);
        } catch (err) {
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
      path: "/shop?category=skincare",
      sub: categories.map((cat) => ({ name: cat.name, id: cat._id })),
    },
    { name: "Shop", path: "/shop", sub: [] },
    { name: "About", path: "/about", sub: [] },
    { name: "Contact", path: "/contact", sub: [] },
  ];

  if (!isMounted) return null;
  return (
    <>
      {isScrolled && <div className="h-[72px] md:h-[84px]"></div>}

      <nav className={`${isScrolled ? "fixed top-0 left-0 shadow-md bg-white/95 backdrop-blur-md py-3" : "relative bg-white py-4"} w-full border-b border-gray-100 px-4 md:px-8 z-[100] transition-all duration-300`}>
        <div className="container mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 lg:gap-10">
            <button className="lg:hidden text-2xl text-gray-700" onClick={() => setIsMobileMenuOpen(true)}>
              <IoMenuOutline />
            </button>
            <Link href="/">
              <Image src={settings?.logo || "/assets/logo.png"} alt="Logo" width={80} height={45} className="w-auto h-auto" priority />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <li 
                  key={item.name} 
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.path} className="uppercase tracking-[0.15em] text-[11px] font-bold text-gray-600 hover:text-black transition-all flex items-center gap-1">
                    {item.name}
                    {item.sub.length > 0 && <IoChevronDownOutline className={`text-[10px] transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />}
                  </Link>

                  <AnimatePresence>
                    {item.sub.length > 0 && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-[-15px] pt-4 z-50"
                      >
                        <div className="bg-white shadow-2xl border border-gray-100 min-w-[220px] py-3 rounded-sm relative">
                          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gray-100"></div>
                          <div className="flex flex-col">
                            {item.sub.map((sub: any) => (
                              <Link
                                key={sub.id}
                                href={`/shop?category=${sub.id}`}
                                className="px-6 py-3 text-[13px] text-gray-700 hover:text-black hover:bg-gray-50 transition-all font-medium"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
            {/* Search Section */}
            <div className="hidden md:flex items-center justify-end relative max-w-[250px] w-full">
                <AnimatePresence>
                    {isSearchOpen ? (
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ width: 0 }} className="relative h-9">
                            <input 
                                type="text" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                placeholder="Search..." 
                                className="w-full border-b border-black py-1 pr-8 text-sm focus:outline-none bg-transparent" 
                                autoFocus
                            />
                            <IoCloseOutline onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="absolute right-0 top-2 cursor-pointer" />
                        </motion.div>
                    ) : (
                        <IoSearchOutline onClick={() => setIsSearchOpen(true)} className="text-xl cursor-pointer hover:scale-110 transition-transform" />
                    )}
                </AnimatePresence>
            </div>

            {/* Profile Section with Dynamic Role Based Menu */}
            <div className="relative group">
              <IoPersonOutline className="text-xl cursor-pointer" />
              <div className="absolute right-0 top-full mt-4 w-48 bg-white shadow-xl border border-gray-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 rounded-sm z-[110]">
                {!user ? (
                  <>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-700">Sign In</Link>
                    <Link href="/register" className="block px-4 py-2 hover:bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-700">Create Account</Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Welcome,</p>
                      <p className="text-[12px] font-bold text-black truncate">{user.firstName}</p>
                    </div>
                    
                    <Link href="/my-account" className="block px-4 py-2 hover:bg-gray-50 text-[11px] font-medium text-gray-700">My Profile</Link>
                    <button 
                      onClick={logoutUser} 
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 text-[11px] font-bold uppercase tracking-tighter"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>

            <Link href="/cart" className="relative">
              <IoBagHandleOutline className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]" />
              <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 left-0 w-[300px] h-screen bg-white z-[160] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-50">
                  <Image src={settings?.logo || "/assets/logo.png"} alt="Logo" width={70} height={35} />
                  <button onClick={() => setIsMobileMenuOpen(false)}><IoCloseOutline className="text-3xl" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <ul className="flex flex-col gap-6">
                    {menuItems.map((item) => (
                      <li key={item.name} className="border-b border-gray-50 pb-4">
                        <div className="flex justify-between items-center" onClick={() => item.sub.length > 0 && setActiveDropdown(activeDropdown === item.name ? null : item.name)}>
                          <Link href={item.path} onClick={() => setIsMobileMenuOpen(false)} className="uppercase tracking-widest text-[12px] font-bold">{item.name}</Link>
                          {item.sub.length > 0 && <span className="text-xl">{activeDropdown === item.name ? "−" : "+"}</span>}
                        </div>
                        {activeDropdown === item.name && (
                          <div className="mt-4 ml-4 flex flex-col gap-4 border-l-2 border-gray-100 pl-4">
                            {item.sub.map((sub: any) => (
                              <Link key={sub.id} href={`/shop?category=${sub.id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-[11px] text-gray-500 uppercase font-medium">{sub.name}</Link>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                    
                    {/* Mobile Account Links */}
                    {user && (
                       <li className="border-b border-gray-50 pb-4">
                        <Link href="/my-account" onClick={() => setIsMobileMenuOpen(false)} className="uppercase tracking-widest text-[12px] font-bold">My Account</Link>
                       </li>
                    )}
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