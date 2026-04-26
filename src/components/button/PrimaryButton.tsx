"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string; 
}

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        /* Default Layout & Background */
        bg-black 
        text-white 
        rounded-[5px] 
        p-[16px] 
        flex items-center justify-center 
        gap-[10px] 
        
        /* আপনার দেওয়া Inter Font Style */
        
        font-[500]
        text-[16px]
        leading-[24px]
        tracking-[0px]
        text-right       /* Alignment */
        align-middle     /* Vertical Align */
        
        /* Hover & Interaction - Scale Effect */
        transition-all 
        duration-300 
        ease-out
        hover:scale-[1.03]  /* হালকা বড় হবে */
        active:scale-[0.98] /* ক্লিক করলে একটু দেবে যাবে */
        
        /* States */
        disabled:opacity-50 
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        
        /* Custom Classes (H, W etc.) */
        ${className}
      `}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-white" />
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;