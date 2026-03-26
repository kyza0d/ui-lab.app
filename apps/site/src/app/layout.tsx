import "./globals.css";

import "@fontsource/geist-sans";
import "@fontsource-variable/karla";
import "@fontsource-variable/geist";
import "@fontsource-variable/inter";
import "@fontsource-variable/work-sans";
import "@fontsource-variable/jetbrains-mono";
import localFont from "next/font/local";
import Script from "next/script";

import { Metadata } from "next";

import { RootLayoutClient } from "./client";
import { generateMetadata } from "@/shared/lib/metadata";
import { getInitialThemeScript } from "@/features/theme/lib/initial-theme-script";
import { generateScrollRestoreScript } from "ui-lab-components/scroll-script";

const ioskeleyMono = localFont({
  src: [
    {
      path: "../../public/assets/fonts/monospace/IoskeleyMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/monospace/IoskeleyMono-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-ioskeley-mono",
  display: "swap",
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script>{getInitialThemeScript()}</script>
        <Script
          id="ui-lab-scroll-restore"
          strategy="beforeInteractive"
        >
          {generateScrollRestoreScript()}
        </Script>
      </head>
      <body className={`antialiased ${ioskeleyMono.variable}`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
