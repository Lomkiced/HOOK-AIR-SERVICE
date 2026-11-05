import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Thai, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aircon Service Pro | Hospital-Grade Condo & Home Aircon Cleaning in Thailand",
  description:
    "Professional high-pressure air-conditioning deep cleaning and anti-bacterial sanitization for Bangkok condominiums and houses. 30-day water leak warranty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${notoThai.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0F172A]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
