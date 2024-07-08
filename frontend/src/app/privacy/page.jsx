import CookiesStatement from '@/components/privacy/CookiesStatement'
import Privacy from '@/components/privacy/Privacy'
import TermsOfUse from '@/components/privacy/TermsOfUse'
import React from 'react'
import siteMetadata from '../utils/siteMetaData';



export async function generateMetadata() {
  const pageTitle = "Pravila privatnosti";
  const pageDescription = "Pročitajte o pravilima privatnosti";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/privacy`,
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
      canonical: `${siteMetadata.siteUrl}/privacy`,
    },
  };
}

const PrivacyPage = () => {
  return (
    <>
      <Privacy />
      <CookiesStatement />
      <TermsOfUse />
    </>
  )
}

export default PrivacyPage