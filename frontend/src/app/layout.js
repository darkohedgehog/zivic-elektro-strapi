import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';
import hrTranslations from "./(auth)/translationHR";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Živić-Elektro",
  description: "Veleprodaja i maloprodaja elektro materijala",
};

// Lazy load Nav and Footer components
const Nav = dynamic(() => import('@/components/Nav'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={hrTranslations}>
      <html lang="hr" suppressHydrationWarning>
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
