import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSection } from "@/lib/cms/repository";
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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSection("site");

  return {
    metadataBase: new URL(metadataBaseUrl),
    title: site.title,
    description: site.description,
    openGraph: {
      title: site.title,
      description: site.description,
      images: [
        {
          url: site.ogImage,
          alt: site.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: [site.ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
