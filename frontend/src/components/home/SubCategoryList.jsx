import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SubCategoryList = ({ subCategories, categoryName }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className='flex flex-col items-center'>
      {subCategories.map((subCategory, index) => {
        const thumbnailUrl = subCategory.attributes.thumbnail?.data[0]?.attributes.url
          ? baseUrl + subCategory.attributes.thumbnail.data[0].attributes.url
          : '/default-thumbnail.jpg'; // Putanja do podrazumevane slike ako thumbnail nije dostupan

        return (
          <Link key={index} href={`/category/${categoryName}/${subCategory.attributes.subCate}`}>
            <div className='text-center p-3'>
              <Image
                src={thumbnailUrl}
                alt={subCategory.attributes.subCate}
                width={200}
                height={200}
                className='rounded-lg shadow-lg object-cover'
              />
              <h2 className='text-[14px] font-medium line-clamp-1 mt-2'>{subCategory.attributes.subCate}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SubCategoryList;
