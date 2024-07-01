import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SubCategoryList = ({ subCategories, categoryName }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-3 justify-items-center'>
      {subCategories.map((subCategory, index) => {
        const thumbnailUrl = subCategory.attributes.thumbnail?.data[0]?.attributes.url
          ? baseUrl + subCategory.attributes.thumbnail.data[0].attributes.url
          : '/default-thumbnail.jpg'; // Putanja do podrazumevane slike ako thumbnail nije dostupan

        return (
          <Link key={index} href={`/category/${categoryName}/${subCategory.attributes.subCate}`}>
            <div className='p-3'>
              <Image
                src={thumbnailUrl}
                alt={subCategory.attributes.subCate}
                width={350}
                height={350}
                className='w-48 h-48 rounded-lg shadow-lg shadow-gray object-cover'
              />
              <h2 className='text-[14px] font-medium line-clamp-1 mt-2 flex ml-3 text-accent dark:text-accentDark'>
                {subCategory.attributes.subCate}
                </h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SubCategoryList;
