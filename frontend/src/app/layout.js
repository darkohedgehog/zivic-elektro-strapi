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
  metadataBase: siteMetadata.siteUrl, // Use plain string instead of URL object
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
    images: [siteMetadata.socialBanner],
    locale: "hr_HR",
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
    images: [siteMetadata.socialBanner],
  },
};

// Lazy load Nav and Footer components
const Nav = dynamic(() => import('@/components/Nav'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
    localization={hrTranslations}
    proxyUrl={process.env.NEXT_PUBLIC_CLERK_PROXY_URL}
    >
      <html lang="hr" suppressHydrationWarning>
      <head>
          <meta name="description" content={metadata.description} />
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
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta name="twitter:description" content={metadata.twitter.description} />
          <meta name="twitter:image" content={metadata.twitter.images[0]} />
          <meta name="twitter:site" content={metadata.twitter.site} />
          <meta name="twitter:creator" content={metadata.twitter.creator} />
          <link rel="manifest" href="/api/manifest" />
          <meta name="theme-color" content="#000000" />
          <link rel="canonical" href={metadata.metadataBase} />
        </head>
        <body className={`${inter.className} min-h-screen transition-colors duration-300 bg-gradient-light dark:bg-gradient-dark`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
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
