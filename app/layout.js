import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar"
import ChatRoom from "@/components/ChatRoom"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "我的網站",
  description: "請在此寫入你的網站敘述",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <ChatRoom />
      </body>
    </html>
  );
}
