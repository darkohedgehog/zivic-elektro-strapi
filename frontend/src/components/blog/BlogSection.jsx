import Image from 'next/image'
import React from 'react'

const BlogSection = () => {
  return (
<article className="overflow-hidden rounded-lg shadow-sm py-20">
  <Image
    alt=""
    src="https://res.cloudinary.com/dhkmlqg4o/image/upload/v1719083738/herobanner1_abbmlz.png"
    width={1920}
    height={1080}
    className="h-80 w-full sm:w-[900px] sm:mx-auto flex items-center justify-center object-cover"
  />

  <div className="p-4 sm:p-6">
    <a href="#">
      <h3 className="text-lg font-medium text-gray-900">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
      pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
      mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
      dignissimos. Molestias explicabo corporis voluptatem?
    </p>

    <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
      Find out more

      <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
        &rarr;
      </span>
    </a>
  </div>
</article>
  )
}

export default BlogSection