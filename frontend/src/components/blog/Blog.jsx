"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/utils/GlobalApi';
import Link from 'next/link';
import Image from 'next/image';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs_();
  }, []);

  const getBlogs_ = async () => {
    try {
      const response = await GlobalApi.getBlogs();
      setBlogs(response.data.data);
      //console.log(response.data.data); // Logovanje podataka
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const renderDescription = (description) => {
    if (Array.isArray(description)) {
      return description.map((descItem, index) => {
        if (descItem.type === 'paragraph') {
          return descItem.children.map((child, childIndex) => (
            <p key={childIndex}>{child.text}</p>
          ));
        }
        return null;
      });
    }
    return description; // If description is a simple string, return it directly
  };

  return (
    <div className='px-10 md:px-20 py-28'>
      <h1 className='text-[24px] uppercase font-bold mb-8 flex items-center justify-center text-accent dark:text-accentDark text-center'>
      Otkrijte Svijet Električnih Instalacija
    </h1>
    <h2 className='text-2xl font-bold mb-8 flex items-center justify-center text-purple-500 text-center'>
    Dobrodošli na naš blog!
    </h2>
    <p className='text-xl mb-10 flex text-gray text-center'>
    Vaša pouzdana destinacija za sve informacije o električnim instalacijama. Bilo da ste profesionalni električar, entuzijastični majstor ili jednostavno želite bolje razumjeti kako vaši uređaji rade, naš blog nudi sveobuhvatne šeme za povezivanje prekidača i utičnica, detaljne opise proizvoda i korisne vodiče za njihovu upotrebu. Pratite naše savjete i trikove kako biste osigurali bezbedan, efikasan i dugotrajan rad vaših električnih sistema. Uronite u svijet električnih instalacija i unapredite svoje vještine sa našim stručno napisanim člancima!
    </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {blogs.map((blog) => {
          const thumbnailUrl = blog?.attributes?.thumbnail?.data?.[0]?.attributes?.url;
          return (
            <div key={blog.id} className='border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray p-5 h-[400px] w-full sm:w-[400px] overflow-auto mx-auto'>
              <Link href={`/blog/${blog.attributes.slug}`}>
                {thumbnailUrl ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${thumbnailUrl}`}
                    alt={blog.attributes.title}
                    width={400}
                    height={300}
                    priority
                    className='rounded-lg object-cover h-60 w-60 mx-auto shadow-md shadow-accent'
                  />
                ) : (
                  <div className='w-full h-[300px] bg-gray-200 rounded-lg'></div> // Placeholder for missing images
                )}
                <h2 className='text-[18px] font-semibold my-8 text-darkpurple dark:text-accentDark flex items-center justify-center mx-auto text-center'>
                    {blog.attributes.title}
                </h2>
                <div className='text-[14px] mt-3 mx-auto text-gray text-clip'>
                  {renderDescription(blog.attributes.description)}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
