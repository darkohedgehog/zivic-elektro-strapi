import React from 'react';
import AboutUs from '@/components/about/AboutUs';
import siteMetadata from '../utils/siteMetaData';



export async function generateMetadata() {
  const pageTitle = "O nama";
  const pageDescription = "Saznajte više o našoj kompaniji, našim vrednostima i misiji.";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/about`,
      siteName: siteMetadata.title,
      images: [`${siteMetadata.siteUrl}/social-banner.png`],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${siteMetadata.siteUrl}/social-banner.png`],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/about`,
    },
  };
}

const About = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default About;
