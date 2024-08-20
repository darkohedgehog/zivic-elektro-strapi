const { default: axios } = require("axios");

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.zivic-elektro.shop/api';


const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${apiKey}`,
    }
});

const getLatestProducts = () => axiosClient.get('/products?populate=*');
const getLatestCategories = () => axiosClient.get('/categories?populate=*');
const getProductById = (id) => axiosClient.get('/products/'+id+'?populate=*');

//Get product list by category
const getProductListByCategory = (category) => axiosClient.get('/products?filters[category][$eq]='+category+"&populate=*");

const getProductListByCategoryName = async (categoryName) => {
    const url = `/products?filters[category][$eq]=${categoryName}&populate=*`;
   // console.log(`Fetching products from URL: ${url}`);
    try {
        return await axiosClient.get(url);
    } catch (error) {
        console.error("API call error:", error.response); // Logovanje odgovora sa greškom
        throw error;
    }
}

// Get subCategory

const getSubCategoriesByCategory = (categoryName) => {
    const url = `/subcategories?filters[cate][$eq]=${categoryName}&populate=*`;
   // console.log(`Fetching subcategories from URL: ${url}`); 
    return axiosClient.get(url).catch(error => {
        console.error("API call error:", error.response); // Logovanje odgovora sa greškom
        throw error;
    });
}

const getProductListByCategoryAndSubCategory = async (categoryName, subCategoryName) => {
    const url = `/products?filters[category][$eq]=${categoryName}&filters[subCate][$eq]=${subCategoryName}&populate=*`;
    //console.log(`Fetching products from URL: ${url}`);
    try {
        return await axiosClient.get(url);
    } catch (error) {
        console.error("API call error:", error.response); // Logovanje odgovora sa greškom
        throw error;
    }
}

//Add bestsellers products

const getBestSellers = async () => {
    const url = `/products?filters[bestSeller][$eq]=true&populate=*`;
   // console.log(`Fetching bestsellers from URL: ${url}`); 
    try {
        return await axiosClient.get(url);
    } catch (error) {
        console.error("API call error:", error.response); // Logovanje odgovora sa greškom
        throw error;
    }
}

//Add slug for SEO
const getProductBySlug = (slug) => axiosClient.get(`/products?filters[slug][$eq]=${slug}&populate=*`);

//Add to Cart Collection
const addToCart = (data) => axiosClient.post('/carts', data);

//Get User Cart Items
const getUserCartItems = (email) => axiosClient.get('/carts?populate[products][populate][0]=gallery&filters[email][$eq]='+email);

//Delete Cart Items
const deleteCartItem = (id) => axiosClient.delete('/carts/' + id);

// Update Cart Item
const updateCartItem = (id, data) => axiosClient.put('/carts/' + id, { data });

//Orders
const createOrder = (data) => axiosClient.post('/orders', { data });


//Clear Cart
const clearCart = async () => {
    const cartItems = await axiosClient.get('/carts');
    const deleteRequests = cartItems.data.data.map(item => deleteCartItem(item.id));
    await Promise.all(deleteRequests);
  };

  //Get User Orders
  const getUserOrders = (email) => {
    return axiosClient.get(`/orders?filters[email][$eq]=${email}&populate[products][populate]=gallery&populate[productQuantities][populate]=product`);
  };

  // Blog
  const getBlogs = () => axiosClient.get('/blogs?populate=*');
  const getBlogBySlug = (slug) => axiosClient.get(`/blogs?filters[slug][$eq]=${slug}&populate=*`);
  

export default {
    getLatestProducts,
    getLatestCategories,
    getProductById,
    getProductListByCategory,
    addToCart,
    getUserCartItems,
    deleteCartItem,
    updateCartItem,
    createOrder,
    clearCart,
    getProductListByCategoryName,
    getSubCategoriesByCategory,
    getProductListByCategoryAndSubCategory,
    getBestSellers,
    getProductBySlug,
    getUserOrders,
    getBlogs,
    getBlogBySlug,
};
