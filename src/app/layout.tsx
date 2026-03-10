import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "react-hot-toast"; //
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Glowly - Your Premium Store",
  description: "Welcome to Glowly, the best place for your needs.",
};

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
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
