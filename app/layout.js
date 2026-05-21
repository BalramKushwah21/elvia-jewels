import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartSync from "@/components/CartSync";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  icons: {
    icon: "/icons/icon.png",
  },
  title: "Elvia Jewels",
  description:
    "This is a jewelry store website built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ "--font-geist-sans": geistSans.variable, "--font-geist-mono": geistMono.variable }}>
      <body>
         <Providers>
           <CartSync /> 
        <Navbar />
          {children}
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
