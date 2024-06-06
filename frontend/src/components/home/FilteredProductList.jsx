import React from 'react';
import ProductItem from './ProductItem';

const FilteredProductList = ({ productList }) => {
  if (!productList || productList.length === 0) {
    return <div>Nema proizvoda u ovoj kategoriji...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FilteredProductList;
