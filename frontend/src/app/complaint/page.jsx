import ReturnOfGoods from '@/components/complaint/ReturnOfGoods'
import React from 'react'
import siteMetadata from '../utils/siteMetaData';



export async function generateMetadata() {
  const pageTitle = "Povrat robe-reklamacije";
  const pageDescription = "Ovdje možete ostaviti svoj prigovor";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/complaint`,
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
      canonical: `${siteMetadata.siteUrl}/complaint`,
    },
  };
}

const ComplaintPage = () => {
  return (
    <>
        <ReturnOfGoods />
    </>
  )
}

export default ComplaintPage