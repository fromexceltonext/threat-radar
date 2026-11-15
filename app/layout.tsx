import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const gesitSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const gesitMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threat Radar",
  description: "Known exploited vulnerabilities at a glance",
};

const RootLayout =({ children}: LayoutProps<"/">) => {
  return(
    <html
      lang="en"
      className={`dark ${gesitSans.variable} ${gesitMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}

export default RootLayout;