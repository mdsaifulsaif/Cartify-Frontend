
"use client"
import BestSellers from '@/components/home/BestSellers';
import CategorySection from '@/components/home/CategorySection';
import Hero from '@/components/home/Hero';
import NewArrivals from '@/components/home/NewArrive';
import SkincarePhilosophy from '@/components/home/SkincarePhilosophy';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import { useAuth } from '@/context/authContext';
import React from 'react'

function page() {
  const { user, loading } = useAuth();
  console.log("logged user", user)

  return (
    <div>
      <Hero />
      <BestSellers />
      <CategorySection />
      <NewArrivals />
      <SkincarePhilosophy />
      <TestimonialSlider />
    </div>
  )
}

export default page