"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import GlobalApi from '@/app/utils/GlobalApi';
import Image from 'next/image';

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
    return <div>Loading...</div>;
  }

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = apiUrl + blog.attributes.thumbnail.data[0].attributes.url;

  return (
    <div className='px-10 md:px-20 py-10'>
      <h1 className='text-[24px] uppercase font-bold mb-4'>{blog.attributes.title}</h1>
      <Image
        src={imageUrl}
        alt={blog.attributes.title}
        width={800}
        height={600}
        priority
        className='rounded-lg object-cover'
      />
      <div className='text-[16px] mt-4'>
        {blog.attributes.description.map((descItem, index) => (
          <p key={index}>{descItem.children.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
