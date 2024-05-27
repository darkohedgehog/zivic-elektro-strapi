import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';
import hrTranslations from "./(auth)/translationHR";
import Layout from "@/components/Layout";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Živić-Elektro",
  description: "Veleprodaja i maloprodaja elektro materijala",
};



export default function RootLayout({ children }) {

  return (
    <ClerkProvider localization={hrTranslations}>
      <html lang="hr" suppressHydrationWarning>
        <body className={inter.className}>
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
