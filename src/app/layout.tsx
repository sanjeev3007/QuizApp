import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SupabaseProvider from "./supabase-provider";
import "./globals.css";
import Providers from "@/components/providers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sandbox",
  description: "AI powered quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SupabaseProvider>
      <Providers>
        <html lang="en">
          <head>
            <link
              href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap"
              rel="stylesheet"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
          </head>
          <body className={poppins.className}>
            <main className="flex flex-col h-screen w-full">{children}</main>
          </body>
        </html>
      </Providers>
    </SupabaseProvider>
  );
}
