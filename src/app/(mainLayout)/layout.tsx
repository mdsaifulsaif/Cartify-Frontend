import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React, { ReactNode } from 'react';



interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-wrapper">
     <Navbar />
      <main>{children}</main>
     <Footer />
    </div>
  );
}