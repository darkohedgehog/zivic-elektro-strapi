const { default: axios } = require("axios");

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.zivic-elektro.shop/api';

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${apiKey}`,
    }
});

// Get latest products
const getLatestProducts = () => axiosClient.get('/products?populate=*');

// Get latest categories
const getLatestCategories = () => axiosClient.get('/categories?populate=*');

// Get product by ID
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);

// Get product list by category
const getProductListByCategory = (category) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

// Get product list by category name with pagination
const getProductListByCategoryName = async (categoryName, limit = 24, start = 0) => {
    const url = `/products?filters[category][$eq]=${categoryName}&pagination[pageSize]=${limit}&pagination[page]=${start}&populate=*`;
    return await axiosClient.get(url);
};

// Get subcategories by category
const getSubCategoriesByCategory = (categoryName) => {
    const url = `/subcategories?filters[cate][$eq]=${categoryName}&populate=*`;
    return axiosClient.get(url).catch(error => {
        console.error("API call error:", error.response);
        throw error;
    });
};

// Get product list by category and subcategory
const getProductListByCategoryAndSubCategory = async (categoryName, subCategoryName) => {
    const url = `/products?filters[category][$eq]=${categoryName}&filters[subCate][$eq]=${subCategoryName}&populate=*`;
    try {
        return await axiosClient.get(url);
    } catch (error) {
        console.error("API call error:", error.response);
        throw error;
    }
};

// Get best sellers
const getBestSellers = async () => {
    const url = `/products?filters[bestSeller][$eq]=true&populate=*`;
    try {
        return await axiosClient.get(url);
    } catch (error) {
        console.error("API call error:", error.response);
        throw error;
    }
};

// Get product by slug for SEO
const getProductBySlug = (slug) => axiosClient.get(`/products?filters[slug][$eq]=${slug}&populate=*`);

// Add to cart
const addToCart = (data) => axiosClient.post('/carts', data);

// Get user cart items
const getUserCartItems = (email) => axiosClient.get(`/carts?populate[products][populate][0]=gallery&filters[email][$eq]=${email}`);

// Delete cart item
const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);

// Update cart item
const updateCartItem = (id, data) => axiosClient.put(`/carts/${id}`, { data });

// Create order
const createOrder = (data) => axiosClient.post('/orders', { data });

// Clear cart
const clearCart = async () => {
    const cartItems = await axiosClient.get('/carts');
    const deleteRequests = cartItems.data.data.map(item => deleteCartItem(item.id));
    await Promise.all(deleteRequests);
};

// Get user orders
const getUserOrders = (email) => axiosClient.get(`/orders?filters[email][$eq]=${email}&populate[products][populate]=gallery&populate[productQuantities][populate]=product`);

// Blog
const getBlogs = () => axiosClient.get('/blogs?populate=*');
const getBlogBySlug = (slug) => axiosClient.get(`/blogs?filters[slug][$eq]=${slug}&populate=*`);

// Get products with pagination
const getProducts = async (limit = 24, start = 0) => {
    const url = `/products?pagination[pageSize]=${limit}&pagination[page]=${start}&populate=*`;
    return await axiosClient.get(url);
};

export default {
    getLatestProducts,
    getLatestCategories,
    getProductById,
    getProductListByCategory,
    getProductListByCategoryName,
    getSubCategoriesByCategory,
    getProductListByCategoryAndSubCategory,
    getBestSellers,
    getProductBySlug,
    addToCart,
    getUserCartItems,
    deleteCartItem,
    updateCartItem,
    createOrder,
    clearCart,
    getUserOrders,
    getBlogs,
    getBlogBySlug,
    getProducts,
};
