import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from './context/CartContext'; // Import the CartProvider

export const metadata: Metadata = {
  title: "Our Shop",
  description: "A sample e-commerce application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>  {/* Wrap the children with CartProvider */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
