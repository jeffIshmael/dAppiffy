
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/Theme-provider";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "@/config";
import Web3ModalProvider from "@/context";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import  React from "react";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// Inter({ subsets: ["latin"] });
const displayFont = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-display",
});

const baseFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-default",
});

export const metadata: Metadata = {
  title: "dAppify",
  description: "The web 3 dApp store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${baseFont.variable} ${displayFont.variable} scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Web3ModalProvider initialState={initialState}>
              <div className="flex mr-0"></div>
              <Toaster />
              {children}
            </Web3ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
