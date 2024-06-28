"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import GlobalApi from '@/app/utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { IoNewspaperOutline } from "react-icons/io5";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      getBlogDetail(slug);
    }
  }, [slug]);

  const getBlogDetail = async (slug) => {
    try {
      const response = await GlobalApi.getBlogBySlug(slug);
      setBlog(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  if (!blog) {
    return <div>Učitavam...</div>;
  }

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = apiUrl + blog.attributes.thumbnail.data[0].attributes.url;

  return (
    <div className='px-10 md:px-20 py-28'>
      <h1 className='text-[24px] uppercase font-bold mb-16 flex items-center justify-center text-accent dark:text-accentDark text-center'>
        {blog.attributes.title}
      </h1>
      <Image
        src={imageUrl}
        alt={blog.attributes.title}
        width={800}
        height={600}
        priority
        className='rounded-lg object-cover h-72 w-72 mx-auto shadow-lg border-y-2 border-accent dark:border-accentDark shadow-slate-500 dark:shadow-accentDark'
      />
      <div className='text-[14px] mt-12 text-gray'>
        {blog.attributes.description.map((descItem, index) => (
          <p key={index}>{descItem.children.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}</p>
        ))}
      </div>
      <div className='flex items-center justify-center flex-col'>
      <h2 className='text-xl my-14 flex items-center justify-center uppercase text-accent dark:text-accentDark text-center'>
        Pročitajte još ...
      </h2>
      <Link 
      href={'/blog'}>
        <button className='button gap-2 uppercase'>
        <IoNewspaperOutline className='w-5 h-5 text-accent dark:text-accentDark' />
       <span className='text-accent dark:text-accentDark'>Blog</span> 
        </button>
      </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
