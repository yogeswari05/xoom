import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import "@stream-io/video-react-sdk/dist/css/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

  export const metadata: Metadata = {
    title: "Xoom",
    description: "Video calling app",
    icons: {
      icon: '/icons/logo.svg'
    }
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: '/icons/yoom-logo.svg',

        },
        variables: {
          colorPrimary: '#0E78F9',
          colorBackground: '#1C1F2E',
          colorInputBackground: '#252A41',
          colorInputText: '#FFFFFF',
        }
      }}
    >
      <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}
          >
          {children}
          <Toaster />
          </body>
      </html>
    </ClerkProvider>
  );
}
