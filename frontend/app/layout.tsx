import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/Theme-provider";
import { ModeToggle } from "./(components)/ModeChanger";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "@/config";
import Web3ModalProvider from "@/context";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState( wagmiConfig , headers().get("cookie"));
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Web3ModalProvider initialState={initialState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex mr-0">
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
