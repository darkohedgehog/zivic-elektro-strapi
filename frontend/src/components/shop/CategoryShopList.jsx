import React from 'react';
import CategoryItem from '../home/CategoryItem';


const CategoryShopList = ({ categoryShopList }) => {
   

    if (!categoryShopList) {
        return <div>Učitavam proizvode...</div>; // Or handle the undefined state appropriately
    }

    return (
        <div className='grid grid-cols-4 pt-16 mt-16'>
                {categoryShopList.map((item, index) => (
                    <div key={index} >
                        <CategoryItem category={item} />
                        </div>
                ))}
        </div>
    );
};

export default CategoryShopList;
