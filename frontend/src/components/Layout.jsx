"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store'; 

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <div>
        {children}
      </div>
    </Provider>
  );
};

export default Layout;
