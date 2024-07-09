import OrderSuccess from '@/components/orders/OrderSuccess'
import React from 'react'
import siteMetadata from '../utils/siteMetaData';



export async function generateMetadata() {
  const pageTitle = "Uspješna narudžba";
  const pageDescription = "Ovdje su informacije o uspješno kreiranoj narudžbi.";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/order-success`,
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
      canonical: `${siteMetadata.siteUrl}/order-success`,
    },
  };
}

const CustomerOrders = () => {
  return (
    <>
    <OrderSuccess />
    </>
  )
}

export default CustomerOrders