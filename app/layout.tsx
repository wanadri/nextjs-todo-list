import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TankStackProvider from '../providers/tanstack-providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Experiment NextJS",
  description: "Learn till success bruhhh...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <TankStackProvider>
            {children}
          </TankStackProvider>
        </body>
      </html>
  );
}
