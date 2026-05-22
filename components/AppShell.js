"use client";

import { usePathname } from "next/navigation";
import CartSync from "@/components/CartSync";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth/");

  return (
    <>
      <CartSync />
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
