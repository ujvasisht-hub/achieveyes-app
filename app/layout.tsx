import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebas = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas"
});

export const metadata: Metadata = {
  title: "AchieveYes - Achieve Your Goals",
  description: "Track your goals and achieve them with milestone-based progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebas.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}



