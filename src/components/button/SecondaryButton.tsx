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
        /* Base Classes */
        bg-white 
        text-black 
        border 
        border-black 
        rounded-[5px] 
        p-[16px] 
        flex 
        items-center 
        justify-center 
        gap-[10px] 
        
        /* Typography Classes */
        font-medium 
        text-[16px] 
        leading-[24px] 
        tracking-[0px] 
        
        /* Interaction & Animation Classes */
        transition-all 
        duration-300 
        ease-out 
        hover:scale-[1.03] 
        hover:bg-gray-50 
        active:scale-[0.98] 
        
        /* State Classes */
        disabled:opacity-40 
        disabled:cursor-not-allowed 
        disabled:hover:scale-100 
        
        /* User Provided Custom Classes */
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