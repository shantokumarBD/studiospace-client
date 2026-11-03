import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono, Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Layouts/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/Layouts/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "StudioSpace — Peer-to-Peer Creative Workspace Platform",
  description:
    "Discover, filter, and reserve professional creative production studios, photo cyc walls, sound stages, and podcast rooms with transparent pricing.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark", "bg-film-black", "text-text-primary", "antialiased", "min-h-screen", "flex", "flex-col", "selection:bg-[#E04F26]", "selection:text-white", plusJakarta.variable, dmSans.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='light'){document.documentElement.classList.remove('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Toaster position="top-center" />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
