import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import { cn } from '@/src/lib/utils';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans"});

export const metadata = {
  title: "Eden Mist",
  description: "Hair Care Brand for natural & healthier brand. It gives your hair a shine. it's 100% chemical free & natural. safe hair care solution to the hair problems.",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("bg-white text-black min-h-screen fons-sans antialiased", inter.variable)}>
        {/* <Navbar/> */}
        {children}
      </body>
    </html>
  );
}
