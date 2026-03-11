

"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  IoCloseOutline,
  IoCloudUploadOutline,
  IoImageOutline,
  IoImagesOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useModalStore } from "@/store/useModalStore";
import { BASE_URL } from "@/helper/BASE_URL";

interface Category {
  _id: string;
  name: string;
}

interface AddProductModalProps {
  categories: Category[];
  refreshProducts: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  categories,
  refreshProducts,
}) => {
  const { isOpen, type, onClose } = useModalStore();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    costPrice: "",
    salePrice: "",
    regularPrice: "",
    stock: "",
    categoryID: "",
  });


  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  if (!isOpen || type !== "addProduct") return null;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };


  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setGalleryImages((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  
  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      costPrice: "",
      salePrice: "",
      regularPrice: "",
      stock: "",
      categoryID: "",
    });
    setThumbnail(null);
    setThumbnailPreview(null);
    setGalleryImages([]);
    setGalleryPreviews([]);
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !thumbnail ||
      !formData.categoryID ||
      !formData.name ||
      !formData.costPrice
    ) {
      return toast.error(
        "Please fill required fields (Name, Category, Cost Price, Thumbnail)",
      );
    }

    setLoading(true);
    const data = new FormData();

 
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    data.append("thumbnail", thumbnail);

   
    galleryImages.forEach((image) => {
      data.append("images", image);
    });

    try {
      const response = await axios.post(`${BASE_URL}/products/create-product`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Product published successfully!");
        refreshProducts();
        handleClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div className="relative bg-white w-full max-w-3xl h-full sm:h-auto max-h-[95vh] shadow-2xl rounded-none sm:rounded-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <IoImageOutline className="text-pink-500" /> New Product Detail
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto space-y-8 no-scrollbar"
        >
          {/* Basic Info & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Product Name *
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. Seoul Glow Serum"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Category *
              </label>
              <select
                required
                name="categoryID"
                value={formData.categoryID}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm outline-none cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing Row (Cost Price Added) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Cost Price (Purchase) *
              </label>
              <input
                required
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleInputChange}
                className="w-full bg-blue-50/50 border-none p-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-blue-400 font-bold text-blue-600"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Regular Price
              </label>
              <input
                type="number"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm outline-none"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Sale Price (Display) *
              </label>
              <input
                required
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-black"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Stock Quantity *
              </label>
              <input
                required
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-black"
                placeholder="0"
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Thumbnail */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <IoImageOutline /> Thumbnail Image *
              </label>
              <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-100 rounded-3xl cursor-pointer hover:bg-gray-50 transition-all overflow-hidden relative group">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <IoCloudUploadOutline
                      size={32}
                      className="text-gray-300 mb-2"
                    />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      Upload Main Photo
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Gallery Images */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <IoImagesOutline /> Gallery Images
              </label>
              <div className="grid grid-cols-3 gap-3">
                {galleryPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square rounded-2xl overflow-hidden group border border-gray-100 shadow-sm"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt="gallery"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IoTrashOutline size={12} />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                  <IoCloudUploadOutline size={20} className="text-gray-300" />
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleGalleryChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm outline-none resize-none"
              placeholder="Brand story and product benefits..."
            />
          </div>

          <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-50">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-4 border border-gray-100 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-black/10"
            >
              {loading ? "Creating..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
