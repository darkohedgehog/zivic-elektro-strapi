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
      console.log(response.data.data); // Logovanje podataka
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
      <h1 className='text-[24px] uppercase font-bold mb-4'>Blogovi</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {blogs.map((blog) => {
          const thumbnailUrl = blog?.attributes?.thumbnail?.data?.[0]?.attributes?.url;
          return (
            <div key={blog.id} className='border p-4 rounded-lg shadow-lg'>
              <Link href={`/blog/${blog.attributes.slug}`}>
                {thumbnailUrl ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${thumbnailUrl}`}
                    alt={blog.attributes.title}
                    width={400}
                    height={300}
                    priority
                    className='rounded-lg object-cover'
                  />
                ) : (
                  <div className='w-full h-[300px] bg-gray-200 rounded-lg'></div> // Placeholder for missing images
                )}
                <h2 className='text-[20px] font-semibold mt-4'>{blog.attributes.title}</h2>
                <div className='text-[14px] mt-2'>
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
