import Terms from '@/components/terms/Terms'
import React from 'react'
import siteMetadata from '../utils/siteMetaData';



export async function generateMetadata() {
  const pageTitle = "Uvjeti kupnje";
  const pageDescription = "Pročitajte uvjete kupnje";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/terms`,
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
      canonical: `${siteMetadata.siteUrl}/terms`,
    },
  };
}

const TermsPage = () => {
  return (
    <>
    <Terms />
    </>
  )
}

export default TermsPage