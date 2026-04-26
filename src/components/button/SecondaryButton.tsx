"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string; 
}

const SecondaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
}: SecondaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        /* Layout & Colors */
        bg-white 
        text-black 
        border border-black
        rounded-[5px] 
        p-[16px] 
        flex items-center justify-center 
        gap-[10px] 
        
        /* আপনার দেওয়া Inter Font Style */
     
        font-[500]
        text-[16px]
        leading-[24px]
        tracking-[0px]
        
        /* Hover & Interaction - Scale Effect */
        transition-all 
        duration-300 
        ease-out
        hover:scale-[1.03]  
        hover:bg-gray-50   /* হালকা গ্রে শেড মাউস নিলে */
        active:scale-[0.98] 
        
        /* States */
        disabled:opacity-40 
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        
        /* Custom Classes */
        ${className}
      `}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-black" />
      ) : (
        children
      )}
    </button>
  );
};

export default SecondaryButton;