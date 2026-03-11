"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  IoAddOutline,
  IoTrashOutline,
  IoCloudUploadOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { BASE_URL } from "@/helper/BASE_URL";
import Swal from "sweetalert2";
import { useModalStore } from "@/store/useModalStore";
import CategoryModal from "@/components/modals/CategoryModal";



interface Category {
  _id: string;
  name: string;
  image: string;
}

interface FetchResponse {
  success: boolean;
  data: Category[];
  totalPages: number;
  totalCategories: number;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { onOpen } = useModalStore();

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCategories, setTotalCategories] = useState<number>(0);

  const [catName, setCatName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchCategories = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await axios.get<FetchResponse>(
        `${BASE_URL}/categories?page=${currentPage}&limit=8`
      );
      if (data.success) {
        setCategories(data.data);
        setTotalPages(data.totalPages);
        setTotalCategories(data.totalCategories);
      }
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

//   const handleCreateCategory = async (e: FormEvent): Promise<void | string> => {
//     e.preventDefault();
//     if (!catName || !selectedImage)
//       return toast.error("Please provide both name and image");

//     setBtnLoading(true);
//     const formData = new FormData();
//     formData.append("name", catName);
//     formData.append("image", selectedImage);

//     try {
//       const { data } = await axios.post<{ success: boolean; message?: string }>(
//         `${BASE_URL}/create-category`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (data.success) {
//         toast.success("Category created successfully!");
//         setCatName("");
//         setSelectedImage(null);
//         setPreview(null);
//         setIsModalOpen(false);
//         fetchCategories();
//       }
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Creation failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

  const handleDelete = async (id: string): Promise<void> => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-2xl" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete<{ success: boolean; message?: string }>(
            `${BASE_URL}/categories/${id}`,
            { withCredentials: true }
          );
          if (data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
              confirmButtonColor: "#000000",
            });
            fetchCategories();
          }
        } catch (err: any) {
          Swal.fire({
            title: "Error!",
            text: err.response?.data?.message || "Delete failed",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-raleway w-full overflow-x-hidden">
      <div className="mx-auto max-w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Category Management
          </h1>
          <button
            // onClick={() => setIsModalOpen(true)}
         onClick={() => onOpen("addCategory")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-all shadow-lg active:scale-95"
          >
            <IoAddOutline size={20} /> Add Category
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 md:p-5 text-[10px] md:text-xs font-bold uppercase text-gray-500 tracking-widest">
                    Image
                  </th>
                  <th className="p-4 md:p-5 text-[10px] md:text-xs font-bold uppercase text-gray-500 tracking-widest">
                    Category Name
                  </th>
                  <th className="p-4 md:p-5 text-[10px] md:text-xs font-bold uppercase text-gray-500 text-right tracking-widest">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-20 text-center text-gray-400 italic">
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50/50 transition-all">
                      <td className="p-4 md:p-5">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover bg-gray-100 shadow-sm border border-gray-100"
                        />
                      </td>
                      <td className="p-4 md:p-5">
                        <span className="font-bold text-gray-800 text-sm md:text-base">
                          {cat.name}
                        </span>
                        <p className="text-[9px] md:text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                          UID: {cat._id.slice(-8)}
                        </p>
                      </td>
                      <td className="p-4 md:p-5 text-right">
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90"
                        >
                          <IoTrashOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-20 text-center text-gray-400 italic">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-5 md:p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between bg-white gap-4">
            <p className="text-xs text-gray-400 order-2 sm:order-1">
              Showing <span className="font-bold text-gray-800">{categories.length}</span> of{" "}
              <span className="font-bold text-gray-800">{totalCategories}</span>
            </p>
            <div className="flex items-center gap-2 order-1 sm:order-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
              >
                <IoChevronBackOutline />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-[#F3E8EC] text-[#8B3D52]"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
              >
                <IoChevronForwardOutline />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-[95%] sm:w-full sm:max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col mx-auto rounded-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-90"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="p-6 space-y-6 overflow-y-auto">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                  Category Name
                </label>
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Skin Care"
                  className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-all text-sm bg-gray-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                  Upload Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-44 md:h-48 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all overflow-hidden relative group">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 text-center">
                      <div className="p-3 bg-gray-50 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <IoCloudUploadOutline size={30} className="text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-400 font-medium">Click to upload or drag</p>
                      <p className="text-[10px] text-gray-300 mt-1">Max. 2MB (PNG, JPG)</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:flex-1 px-6 py-4 border border-gray-200 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={btnLoading}
                  className="w-full sm:flex-1 bg-black text-white px-6 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-black/10 order-1 sm:order-2"
                >
                  {btnLoading ? "Processing..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      <CategoryModal fetchCategories={fetchCategories} />
    </div>
  );
};

export default CategoryPage;