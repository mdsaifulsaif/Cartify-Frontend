
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import ProductCard from "@/components/shared/ProductCard";
import { BASE_URL } from "@/helper/BASE_URL";
import { IProduct } from "@/types/type";

async function getNewArrivals(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${BASE_URL}/products/newProducts`, {
      // এটি প্রতি ১ ঘণ্টায় (৩৬০০ সেকেন্ড) একবার ডাটা আপডেট করবে।
      // বাকি সময় এটি স্ট্যাটিক ফাইল হিসেবে সুপার ফাস্ট লোড হবে।
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const result = await res.json();

    if (result.success && Array.isArray(result.data)) {
      return result.data.slice(0, 4);
    }

    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
export default async function NewArrive() {
  const products = await getNewArrivals();

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white font-raleway">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-baseline md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">New Arrivals</h2>
            <p className="content-text !text-[14px] mt-2 max-w-md">
              Discover our latest Korean skincare additions.
            </p>
          </div>

          <Link
            href="/shop"
            className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:opacity-70 transition-all border-b border-black pb-1"
          >
            View all products
            <IoArrowForwardOutline className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {products.map(
            (product) =>
              // ৩. কী (key) এবং ডাটা চেক
              product?._id && (
                <ProductCard key={product._id} product={product} />
              ),
          )}
        </div>
      </div>
    </section>
  );
}
