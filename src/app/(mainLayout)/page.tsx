
"use client"
import BestSellers from '@/components/home/BestSellers';
import { useAuth } from '@/context/authContext';
import React from 'react'

function page() {
  const { user, loading } = useAuth();
  console.log("logged user", user)

  return (
    <div>
      <BestSellers />
    </div>
  )
}

export default page