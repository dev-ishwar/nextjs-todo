import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Header from "@/app/components/header/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TODO",
  description: "TODO app built with NextJS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-[--color-text] bg-[--color-background] `}
      >        
          <Header />
          {children}
      </body>
    </html>
  );
}
