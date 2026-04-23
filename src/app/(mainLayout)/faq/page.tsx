"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import bannerfaq from "../../../../public/assets/faqbanner.jpg";

const FAQ = () => {
  // স্ক্রিনশটে ২য় আইটেমটি ওপেন দেখাচ্ছে (index 1)
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const faqs = [
    {
      question: "Figma ipsum component variant main layer?",
      answer: "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow. Arrow pen union device share scrolling style.",
    },
    {
      question: "Figma ipsum component variant main layer?",
      answer:
        "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow. Arrow pen union device share scrolling style. Ipsum arrow flows shadow horizontal inspect resizing resizing arrange. Figma layer slice bold invite outline polygon rotate library. Arrange shadow outline undo. Invite distribute draft plugin pencil scale polygon invite pencil pixel. Connection bold component star hand star horizontal.",
    },
    {
      question: "Figma ipsum component variant main layer?",
      answer: "Figma ipsum component variant main layer content goes here.",
    },
    {
      question: "Figma ipsum component variant main layer?",
      answer: "Figma ipsum component variant main layer content goes here.",
    },
    {
      question: "Figma ipsum component variant main layer?",
      answer: "Figma ipsum component variant main layer content goes here.",
    },
    {
      question: "Figma ipsum component variant main layer?",
      answer: "Figma ipsum component variant main layer content goes here.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full py-15 md:py-10 bg-white">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center px-6 md:px-16">
        
        {/* Left Side: Image Container */}
        <div className="relative w-full aspect-[0.7] md:aspect-[684/969] overflow-hidden">
          <Image
            src={bannerfaq}
            alt="Skincare products"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col pt-4">
          <h2 className="text-[20px] md:text-[32px] font-bold text-[#000000CC] leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#000000CC] text-[18px] max-w-[684px] leading-relaxed mb-[40px]">
            Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact us.
          </p>

          {/* Accordion List */}
          <div className="border-t border-[#ADADAD]">
            {faqs.map((item, i) => (
              <div key={i} className="border-b border-[#ADADAD]">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center py-6 text-left group"
                >
                  <span className={`text-[18px] font-medium transition-colors ${openIndex === i ? 'text-black' : 'text-[#1A1A1A]'}`}>
                    {item.question}
                  </span>
                  {openIndex === i ? (
                    <ChevronUp className="w-6 h-6 text-black" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-black" />
                  )}
                </button>

                {/* Animated Answer Section */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === i ? "max-h-[500px] pb-8" : "max-h-0"
                  }`}
                >
                  <p className="text-[#666666] text-[15px] leading-[1.6] max-w-[580px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;