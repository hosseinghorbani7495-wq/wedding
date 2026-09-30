import type { Metadata, Viewport } from "next";
import { Cinzel, Marhey, Noto_Naskh_Arabic, Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

const marhey = Marhey({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-marhey",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-naskh",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "دعوت‌نامه بله‌برون | حسین و مهدیه",
  description: "دعوت‌نامه دیجیتال جشن بله‌برون حسین و مهدیه",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e8ddf3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} ${marhey.variable} ${naskh.variable} ${cinzel.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
