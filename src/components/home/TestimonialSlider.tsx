"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import Image from "next/image";


import "swiper/css";
import "swiper/css/pagination";
import { ITestimonial } from "@/types/type";



const testimonials: ITestimonial[] = [
  {
    id: 1,
    name: "Devon Lane",
    image: "https://res.cloudinary.com/dme9eydlq/image/upload/v1772953281/BG_2_i2zh3n.png",
    text: "We love Seoul Mirage! The quality of these products is unmatched. My skin has never felt this hydrated and glowing before.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Cooper",
    image: "https://res.cloudinary.com/dme9eydlq/image/upload/v1772881421/glowly_uploads/jgqk2n0fgbnccwfblzqx.png",
    text: "The authentic Korean ingredients make a huge difference. I can truly feel the tradition and science behind every drop.",
    rating: 5,
  },
  {
    id: 3,
    name: "Theresa Webb",
    image: "https://res.cloudinary.com/dme9eydlq/image/upload/v1772953281/BG_2_i2zh3n.png",
    text: "I've tried many brands, but this one stands out. Meticulously crafted formulations that actually deliver visible results.",
    rating: 5,
  },
];

const TestimonialSlider: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden font-raleway">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            3940+ Happy Users
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#A68B77]">
            Don't just take our words
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 2, spaceBetween: 40 },
          }}
          className="testimonial-swiper !pb-20"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col md:flex-row items-center gap-8 bg-[#FDFBF9] p-8 rounded-sm border border-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                
                {/* User Image Wrapper */}
                <div className="relative w-32 h-32 md:w-40 md:h-48 flex-shrink-0 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col text-center md:text-left flex-1">
                  <div className="flex justify-center md:justify-start gap-1 text-[#E6A4B4] mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} size={12} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium italic italic">
                    "{item.text}"
                  </p>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 tracking-tight uppercase">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Swiper Pagination */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #D1C4B9 !important;
          opacity: 1;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #A68B77 !important;
          width: 20px;
          border-radius: 4px;
        }
        .testimonial-swiper .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;