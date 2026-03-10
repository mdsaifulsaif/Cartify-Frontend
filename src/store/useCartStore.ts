import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ১. প্রডাক্টের জন্য ইন্টারফেস ডিফাইন করা
interface CartItem {
  _id: string;
  name: string;
  salePrice: number;
  thumbnail: string;
  category?: string;
  quantity: number;
}

// ২. স্টোরের স্টেট এবং অ্যাকশনগুলোর জন্য টাইপ ডিফাইন করা
interface CartState {
  cart: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // অ্যাড টু কার্ট লজিক
      addToCart: (product, quantity) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // নতুন আইটেম যোগ করার সময় quantity সেট করা
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },

      // রিমুভ প্রোডাক্ট
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item._id !== id) }),

      // কার্ট ক্লিয়ার করা
      clearCart: () => set({ cart: [] }),
    }),
    { 
      name: 'glowly-cart', // localStorage-এ এই নামে ডাটা সেভ হবে
    }
  )
);