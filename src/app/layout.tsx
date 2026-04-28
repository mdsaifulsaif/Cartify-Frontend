import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "react-hot-toast"; //
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Providers from "@/context/providers";
import { useSettings } from "@/helper/useSettings";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});


// ডায়নামিক মেটাডাটা এবং ফেভিকন আনার জন্য ফাংশন
export async function generateMetadata(): Promise<Metadata> {
  try {
    // সরাসরি API থেকে ডাটা ফেচ করা (সার্ভার সাইড)
    const res = await fetch("http://localhost:5001/api/v1/settings", {
      next: { revalidate: 60 }, // প্রতি ৬০ সেকেন্ড পর পর ডাটা আপডেট হবে
    });
    const { data: settings } = await res.json();

    return {
      title: settings?.siteName || "Glowly - Your Premium Store",
      description: settings?.tagline || "Welcome to Glowly, the best place for your needs.",
      icons: {
        icon: settings?.favicon || "/favicon.ico", // ডাটাবেস থেকে ফেভিকন আসবে
        apple: settings?.favicon || "/apple-touch-icon.png",
      },
    };
  } catch (error) {
    // এরর হলে ডিফল্ট মেটাডাটা
    return {
      title: "Glowly - Your Premium Store",
      icons: { icon: "/favicon.ico" },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} font-sans antialiased`}
      suppressHydrationWarning={true}
      >
       <Providers>
         <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </AuthProvider>
       </Providers>
      </body>
    </html>
  );
}
