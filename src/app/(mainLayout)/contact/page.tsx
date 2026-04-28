
"use client";

import React, { useState } from "react";
import axios from "axios";
import { FaRegEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/helper/BASE_URL";
import toast from "react-hot-toast"; 

const ContactUsPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    from_name: "", 
    from_email: "", 
    subject: "Customer Inquiry", 
    message: "",
  });

  const faqs = [
    { id: 1, question: "How long will my order take to arrive?", answer: "Orders are typically processed within 1-2 business days. Domestic shipping takes 3-5 business days, while international shipping can take 7-14 business days." },
    { id: 2, question: "Do you offer international shipping?", answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination." },
    { id: 3, question: "What is your return policy?", answer: "We offer a 30-day return policy for unused and unopened products. Please contact our support team to initiate a return." },
    { id: 4, question: "Are your products cruelty-free?", answer: "Absolutely. Seoul Mirage is committed to cruelty-free practices, and we ensure all our partner brands adhere to the same standards." },
    { id: 5, question: "How can I track my order?", answer: "Once your order ships, you will receive an email with a tracking number and a link to monitor your package's progress." },
  ];

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.from_name || !formData.from_email || !formData.message) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);
      
    
      const response = await axios.post(`${BASE_URL}/contact/send-email`, formData);
      
      if (response.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ from_name: "", from_email: "", subject: "Customer Inquiry", message: "" }); 
      }
    } catch (error: any) {
      console.error("Contact Error:", error?.response?.data?.message || error.message);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-raleway">
      {/* --- Header & Form Section --- */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-12 tracking-tight">
          Contact Us
        </h1>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">
              Get in Touch
            </h2>
            <p className="text-gray-500 text-sm mb-10 max-w-md leading-relaxed">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#333]">Full Name</label>
                <input
                  name="from_name" // name প্রপস আপডেট করা হয়েছে
                  value={formData.from_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-[#E5E5E5] p-4 rounded-sm focus:outline-none focus:border-black transition-all text-sm"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#333]">Email Address</label>
                <input
                  name="from_email" 
                  value={formData.from_email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-[#E5E5E5] p-4 rounded-sm focus:outline-none focus:border-black transition-all text-sm"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#333]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full border border-[#E5E5E5] p-4 rounded-sm focus:outline-none focus:border-black transition-all resize-none text-sm"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-12 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-opacity-80 transition-all w-full md:w-auto disabled:bg-gray-400"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="flex-1 hidden lg:flex justify-end items-center">
            <img
              src="/assets/cont2.png"
              alt="Contact Seoul Mirage"
              className="w-full max-w-[550px] aspect-[4/5] object-cover rounded-sm grayscale-[10%]"
            />
          </div>
        </div>
      </div>

      {/* --- Connect Section --- */}
      <div className="bg-[#F2E6D9] py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center md:text-left">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-12 uppercase tracking-wider">
            Connect With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-4 bg-white rounded-full"><FaRegEnvelope className="text-xl text-[#D1A0B0]" /></div>
              <div><h4 className="font-bold text-sm uppercase tracking-tighter">Email</h4><p className="text-sm text-gray-600">support@hr.com</p></div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-4 bg-white rounded-full"><FaPhone className="text-xl text-[#D1A0B0]" /></div>
              <div><h4 className="font-bold text-sm uppercase tracking-tighter">Phone</h4><p className="text-sm text-gray-600">+8801727841588</p></div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-4 bg-white rounded-full"><FaMapMarkerAlt className="text-xl text-[#D1A0B0]" /></div>
              <div><h4 className="font-bold text-sm uppercase tracking-tighter">Location</h4><p className="text-sm text-gray-600">Barisal-8200</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FAQ Section --- */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 hidden lg:block">
            <img src="/assets/cont1.png" className="w-full aspect-square object-cover" alt="FAQ" />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-bold mb-6 uppercase tracking-tighter">FAQs</h2>
            <div className="border-t border-[#EEE]">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-[#EEE]">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex justify-between py-6 text-left"
                  >
                    <span className={`text-sm font-bold ${openFaq === faq.id ? "text-[#D1A0B0]" : "text-gray-800"}`}>{faq.question}</span>
                    {openFaq === faq.id ? <FiChevronUp className="text-[#D1A0B0]" /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="text-sm text-gray-500 pb-8">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;