import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  quantities: {},
  subtotal: 0,
  discount: 0,
  vat: 0,
  total: 0,
  shipping: 4.00,
  discountCode: ''
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    addToCart(state, action) {
      const item = action.payload;
      state.cart.push(item);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    setQuantities(state, action) {
      state.quantities = action.payload;
    },
    setSubtotal(state, action) {
      state.subtotal = action.payload;
    },
    setDiscount(state, action) {
      state.discount = action.payload;
    },
    setVat(state, action) {
      state.vat = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setShipping(state, action) {
      state.shipping = action.payload;
    },
    setDiscountCode(state, action) {
      state.discountCode = action.payload;
    }
  }
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  clearCart,
  setQuantities,
  setSubtotal,
  setDiscount,
  setVat,
  setTotal,
  setShipping,
  setDiscountCode
} = cartSlice.actions;

export default cartSlice.reducer;
