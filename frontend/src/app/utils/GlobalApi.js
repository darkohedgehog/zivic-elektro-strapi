const { default: axios } = require("axios");

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

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
const getProductListByCategory = (category) =>axiosClient.get('/products?filters[category] [$eg]='+category+"&populate=*");

//Add to Cart Collection
const addToCart = (data) => axiosClient.post('/carts', data);

//Get User Cart Items
const getUserCartItems = (email) => axiosClient.get('/carts?populate[products] [populate] [0]=gallery&filters[email] [$eq]='+email);

//Delete Cart Items
const deleteCartItem = (id) => axiosClient.delete('/carts/' + id);

// Update Cart Item
const updateCartItem = (id, data) => axiosClient.put('/carts/' + id, { data });

//Orders
const createOrder = (orderData) => axiosClient.post('/orders', { data: orderData });

//Clear Cart
const clearCart = async () => {
    const cartItems = await axiosClient.get('/carts');
    const deleteRequests = cartItems.data.data.map(item => deleteCartItem(item.id));
    await Promise.all(deleteRequests);
};


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
}