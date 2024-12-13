import "../global.css";
import {Inter} from "@next/font/google"
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://hassancissey.vercel.app"),
  title: {
    default: "Hassan Cissey Tijani",
    template: "%s | Hassan Cissey Tijani",
  },
  description: "A Computer and Software Engineer, Graphic Designer, Tech Enthusiast and a servant of Allah.",
  openGraph: {
    title: "Hassan Cissey Tijani",
    description:
      "A Computer and Software Engineer, Graphic Designer, Tech Enthusiast and a servant of the Allah.",
    url: "https://hassancissey.vercel.app",
    siteName: "Hassan Cissey Tijani",
    images: [
      {
        url: "https://hassancissey.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Hassan Cissey Tijani",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

const funnelDisplay = LocalFont({
  src: "../public/fonts/FunnelDisplay-Regular.ttf",
  variable: "--font-funnel"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[ inter.variable, calSans.variable, funnelDisplay.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >     
        {children}
      </body>
    </html>
  );
}
