import { siteUrl as _siteUrl } from "./src/utils/siteMetaData";

export const siteUrl = _siteUrl;
export const generateRobotsTxt = true;

const fetchDynamicRoutes = async () => {
  const response = await fetch(`${_siteUrl}/api/products`);
  const products = await response.json();

  return products.map(product => ({
    loc: `/products/${product.slug}`,
    changefreq: 'weekly',
    priority: 0.8,
  }));
};

export const additionalPaths = async (config) => {
  const dynamicRoutes = await fetchDynamicRoutes();
  return dynamicRoutes;
};
