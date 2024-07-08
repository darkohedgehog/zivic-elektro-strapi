import React from 'react';
import ContactUs from '@/components/contact/ContactUs';
import siteMetadata from '../utils/siteMetaData';



export async function generateMetadata() {
  const pageTitle = "Kontakt";
  const pageDescription = "Kontaktirajte nas za više informacija o našim proizvodima i uslugama.";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/contact`,
      siteName: siteMetadata.title,
      images: [`${siteMetadata.siteUrl}/social-banner.png`],
      locale: "hr_HR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${siteMetadata.siteUrl}/social-banner.png`], 
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/contact`,
    },
  };
}

const Contact = () => {
  return (
    <>
      <ContactUs />
    </>
  );
};

export default Contact;
