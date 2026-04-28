import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/src/components/Header";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leegality Marketplace",
  description: "Best E-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
