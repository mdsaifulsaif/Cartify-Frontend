import Link from "next/link";
import { IoArrowForwardOutline, IoShieldCheckmarkOutline, IoFlaskOutline, IoLeafOutline } from "react-icons/io5";
import ProductCard from "@/components/shared/ProductCard";
import { BASE_URL } from "@/helper/BASE_URL";
import { IProduct } from "@/types/type";
import Image from "next/image";

async function getNewArrivals(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${BASE_URL}/products/newProducts`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const result = await res.json();
    return result.success && Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <main className="font-raleway overflow-hidden">
      {/* 1. New Arrivals Section (Your Existing Code with refinement) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-baseline md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2 block">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">New Arrivals</h2>
              <p className="text-gray-500 text-[14px] mt-2 max-w-md">
                Experience the latest innovations in Korean skincare technology.
              </p>
            </div>
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-1 hover:pr-4 transition-all duration-300"
            >
              Explore Shop
              <IoArrowForwardOutline className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
              {products.map((product) => product?._id && <ProductCard key={product._id} product={product} />)}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400">Loading new collections...</div>
          )}
        </div>
      </section>

      {/* 2. Feature/Brand Philosophy Section (Adds Depth) */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <IoFlaskOutline className="text-2xl text-gray-800" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Science Driven</h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[250px]">
                Formulated with cutting-edge Korean beauty technology and lab-tested ingredients.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <IoLeafOutline className="text-2xl text-gray-800" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Pure & Natural</h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[250px]">
                Commitment to clean beauty. We use plant-based extracts that are gentle on your skin.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <IoShieldCheckmarkOutline className="text-2xl text-gray-800" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">100% Authentic</h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[250px]">
                Every product is sourced directly from certified manufacturers in South Korea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Promo Banner / CTA (Encourages Purchase) */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
        <Image 
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1600" 
            alt="Skincare Routine" 
            fill 
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
        <div className="relative text-center text-white px-4">
          <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-tight">Your Skin Deserves <br/> The Best Care</h2>
          <p className="mb-8 text-sm md:text-base font-light tracking-wide opacity-90 max-w-xl mx-auto uppercase">
            Get 10% off on your first order. Use code: <span className="font-bold border-b border-white">GLOW10</span>
          </p>
          <Link 
            href="/shop" 
            className="inline-block bg-white text-black px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
          >
            Shop Now
          </Link>
        </div>
      </section>
      
      {/* 4. Instagram / Community Section (Social Proof) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl font-light tracking-widest uppercase">#GlowlySkin</h2>
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Share your glow and get featured</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 px-2">
            {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 relative group cursor-pointer overflow-hidden">
                    <Image 
                        src={`https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=60&w=400&v=${i}`} 
                        alt="Instagram" 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm">
                        View Post
                    </div>
                </div>
            ))}
        </div>
      </section>
    </main>
  );
}