import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Dodajte ostale reducere ovde
});

export default rootReducer;
