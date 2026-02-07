import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AuthenexChatWidget from "@/components/chat/AuthenexChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authenex | AI-Powered Digital Forensics",
  description: "Government-grade digital content verification platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
          <AuthenexChatWidget />
        </Providers>
      </body>
    </html>
  );
}