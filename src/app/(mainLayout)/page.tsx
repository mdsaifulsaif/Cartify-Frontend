

// import BestSellers from '@/components/home/BestSellers';
// import CategorySection from '@/components/home/CategorySection';
// import Hero from '@/components/home/Hero';
// import NewArrive from '@/components/home/NewArrive';
// import NewArrivals from '@/components/home/NewArrive';
// import SkincarePhilosophy from '@/components/home/SkincarePhilosophy';
// import TestimonialSlider from '@/components/home/TestimonialSlider';
// import { useAuth } from '@/context/authContext';
// import React from 'react'

// function page() {
//   const { user, loading } = useAuth();
//   console.log("logged user", user)

//   return (
//     <div>
//       <Hero />
//       <BestSellers />
//       <CategorySection />
//       <NewArrive />
//       <SkincarePhilosophy />
//       <TestimonialSlider />
//     </div>
//   )
// }

// export default page



// src/app/(mainLayout)/page.tsx

import BestSellers from '@/components/home/BestSellers';
import CategorySection from '@/components/home/CategorySection';
import Hero from '@/components/home/Hero';
import NewArrive from '@/components/home/NewArrive';
import SkincarePhilosophy from '@/components/home/SkincarePhilosophy';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import UserLogger from '@/components/home/UserLogger'; // নতুন ইম্পোর্ট
import React from 'react';

// এটি এখন একটি Server Component, তাই এখানে useAuth() থাকবে না
export default function Page() {
  return (
    <div>
      {/* ইউজার ডাটা লগ করার জন্য এই কম্পোনেন্টটি কাজ করবে */}
      <UserLogger /> 
      
      <Hero />
      <BestSellers />
      <CategorySection />
      
      {/* এটি এখন সার্ভার সাইড থেকে ডাটা নিয়ে আসবে কোনো এরর ছাড়া */}
      <NewArrive /> 
      
      <SkincarePhilosophy />
      <TestimonialSlider />
    </div>
  );
}