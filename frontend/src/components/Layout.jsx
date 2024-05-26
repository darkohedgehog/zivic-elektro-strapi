"use client"
import { CartContext } from '@/app/context/CartContent';
import React, { useState } from 'react';

const Layout = ({ children }) => {

    const [cart, setCart, clearCart] = useState([]);
    
   
  return (
    <CartContext.Provider value={{cart,setCart, clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default Layout;