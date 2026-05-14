import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: "The 6 Garage | Vehicle Detailing & Paint Protection",
  description:
    "Detailing, paint protection film, ceramic coating, and window tint—professional care for your vehicle.",
  openGraph: {
    title: "The 6 Garage | Vehicle Detailing & Paint Protection",
    description:
      "Detailing, paint protection film, ceramic coating, and window tint—professional care for your vehicle.",
    images: [
      {
        url: "/images/sns_01.jpg",
        alt: "The 6 Garage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The 6 Garage | Vehicle Detailing & Paint Protection",
    description:
      "Detailing, paint protection film, ceramic coating, and window tint—professional care for your vehicle.",
    images: ["/images/sns_01.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
