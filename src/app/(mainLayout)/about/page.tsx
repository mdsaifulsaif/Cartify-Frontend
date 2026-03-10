"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const About = () => {
 
  const fadeInVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="font-raleway text-gray-800 overflow-hidden">
      {/* 1. Our Story Section */}
      <section className="bg-[#F9E4CB] min-h-[500px] flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-0 items-stretch">
          <motion.div
            variants={fadeInVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="py-16 md:py-24 pr-4 md:pr-12 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-gray-900 leading-none">
              Our <span className="text-[#D1A0B0]">Story</span>
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600 max-w-lg">
              Seoul Mirage was born from a passion for Korean skincare
              innovation and a commitment to creating luxury products that
              deliver exceptional results. We bridge the gap between ancient
              rituals and modern science.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <img
              src="/assets/ab1.png"
              alt="Our Story"
              className="w-full h-full min-h-[400px] object-cover rounded-sm grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Our Journey Section */}
      <section className="bg-white min-h-[500px] flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-0 items-stretch">
          <motion.div
            variants={fadeInVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="order-2 md:order-1 w-full h-full"
          >
            <img
              src="/assets/ab2.png"
              alt="Our Journey"
              className="w-full h-full min-h-[400px] object-cover rounded-sm"
            />
          </motion.div>

          <motion.div
            variants={fadeInVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="order-1 md:order-2 py-16 md:py-24 pl-4 md:pl-16 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-gray-900">
              Our Journey
            </h2>
            <div className="space-y-6 text-sm md:text-base text-gray-600 leading-relaxed max-w-lg">
              <p>
                Founded in 2018 by skincare enthusiast and biochemist Dr.
                Ji-Yoon Park, Seoul Mirage began as a small laboratory in the
                heart of Seoul’s beauty district.
              </p>
              <p>
                Today, Seoul Mirage has grown into a global brand, but our
                commitment to purity, efficacy, and luxury remains unchanged.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Philosophy Section */}
      <section className="bg-white border-t border-gray-100 min-h-[600px]">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-0 items-stretch">
          <motion.div
            variants={fadeInVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="py-16 md:py-24 pr-4 md:pr-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight text-gray-900">
              Our Philosophy
            </h2>
            <p className="mb-10 text-[#D1A0B0] italic font-medium">
              Founded in 2018, we strive for purity and innovation.
            </p>

            <div className="space-y-10">
              {[
                {
                  title: "Purity",
                  desc: "We source the highest quality ingredients to ensure our products are free from harmful chemicals.",
                },
                {
                  title: "Innovation",
                  desc: "We continuously research new formulations that harness tradition and science.",
                },
                {
                  title: "Sustainability",
                  desc: "We are committed to ethical practices and eco-friendly packaging.",
                },
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 border-black pl-6 group">
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-widest group-hover:text-[#D1A0B0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <img
              src="/assets/ab3.png"
              alt="Philosophy"
              className="w-full h-full min-h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Our Ingredients Section */}
      <section className="bg-[#F9E4CB] py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
          <motion.div
            variants={fadeInVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-gray-900">
              Ingredients
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
              We believe in the power of nature enhanced by science. Each
              ingredient is selected for its purity and proven skin benefits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop",
                name: "Botanical Extracts",
                text: "From ginseng to green tea, our products harness the power of traditional Korean botanicals.",
              },
              {
                img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1000&auto=format&fit=crop",
                name: "Fermented Ingredients",
                text: "We utilize the ancient Korean practice of fermentation to enhance potency and absorption.",
              },
              {
                img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
                name: "Scientific Compounds",
                text: "Our formulations incorporate cutting-edge compounds like peptides and hyaluronic acid.",
              },
            ].map((ing, i) => (
              <motion.div
                key={i}
                variants={fadeInVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group overflow-hidden rounded-sm cursor-pointer aspect-[3/4]"
              >
                <img
                  src={ing.img}
                  alt={ing.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 text-left">
                  <h4 className="text-xl font-bold mb-3 uppercase tracking-wider text-white">
                    {ing.name}
                  </h4>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 leading-relaxed text-gray-200">
                    {ing.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
