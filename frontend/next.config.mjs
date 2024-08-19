/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "zivic-elektro.shop",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "/dhkmlqg4o/**",
        },
      ],
    },
};

export default nextConfig;
