"use client";
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';

export default function UserLogger() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("logged user from client:", user);
    }
  }, [user]);

  return null; // এটি স্ক্রিনে কিছু দেখাবে না
}