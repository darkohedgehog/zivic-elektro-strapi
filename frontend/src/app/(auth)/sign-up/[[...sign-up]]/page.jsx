"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <section className="py-28 mx-2">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex items-end bg-gray-900 lg:col-span-5 xl:col-span-6">
            <Image
              alt="image"
              src="https://res.cloudinary.com/dhkmlqg4o/image/upload/v1712945811/hero4.webp"
              width={800}
              height={800}
              priority={true}
              className="absolute inset-0 h-full w-full object-cover opacity-80 rounded-lg shadow-lg shadow-gray"
            />
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <SignUp path="/sign-up" />
          </main>
        </div>
      </section>
    </>
  );
}
