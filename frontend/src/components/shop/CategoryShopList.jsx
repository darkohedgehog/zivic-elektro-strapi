import React from 'react';
import CategoryItem from '../home/CategoryItem';


const CategoryShopList = ({ categoryShopList }) => {
   

    if (!categoryShopList) {
        return <div>Učitavam proizvode...</div>;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 text-accent dark:text-accentDark'>
                {categoryShopList.map((item, index) => (
                    <div key={index} >
                        <CategoryItem category={item} />
                        </div>
                ))}
        </div>
    );
};

export default CategoryShopList;
