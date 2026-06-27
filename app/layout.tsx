import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Adventure Time",
  description: "Leah and Jamie's Adventure Time Wishlist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
          <div className="px-6 py-4">
            <p className="text-center font-semibold text-lg">Adventure Time</p>
          </div>
          {children}
        </body>
    </html>
  );
}
