import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';
import hrTranslations from "./(auth)/translationHR";
import Layout from "@/components/Layout";
import siteMetadata from "./utils/siteMetaData";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: siteMetadata.siteUrl, 
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`, // Full URL for social banner
        width: 1200, // Default width for social banners
        height: 630, // Default height for social banners
        alt: siteMetadata.title,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`], // Full URL for social banner
    site: '@Zivic_Darko', // Update with your Twitter handle
  },
};

// Lazy load Nav and Footer components
const Nav = dynamic(() => import('@/components/Nav'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={hrTranslations}>
      <html lang={siteMetadata.language} suppressHydrationWarning>
        <head>
          {/* General Meta Tags */}
          <meta name="description" content={metadata.description} />
          
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          <meta property="og:image" content={metadata.openGraph.images[0].url} />
          <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
          <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
          <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
          <meta property="og:locale" content={metadata.openGraph.locale} />
          <meta property="og:type" content={metadata.openGraph.type} />
          
          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta name="twitter:description" content={metadata.twitter.description} />
          <meta name="twitter:image" content={metadata.twitter.images[0]} />
          <meta name="twitter:site" content={metadata.twitter.site} />

          {/* Robots and Google Bot Instructions */}
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

          {/* Canonical URL */}
          <link rel="canonical" href={metadata.metadataBase} />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/icons/site.webmanifest" />
        </head>
        <body className={`${inter.className} min-h-screen transition-colors duration-300 bg-gradient-light dark:bg-gradient-dark`}>
          <ThemeProvider
            attribute="class"
            defaultTheme={siteMetadata.theme}
            enableSystem
            disableTransitionOnChange>
              <Layout>
                <Nav />
                {children}
                <Footer />
              </Layout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
