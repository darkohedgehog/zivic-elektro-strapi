"use client"
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";


export default function Page() {
  return (
<>
<section className="bg-[#F7F7F7] dark:bg-dark">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt="image"
        src="https://res.cloudinary.com/dhkmlqg4o/image/upload/v1712945786/he3.webp"
        width={800}
        height={800}
        priority={true}
        className="lg:absolute md:absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Dobro došli u Živić-Elektro 🦑
        </h2>
        <p className="mt-4 leading-relaxed text-white/90">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
          quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <SignIn path="/sign-in" />
    </main>
  </div>
</section>
</>
  );
}