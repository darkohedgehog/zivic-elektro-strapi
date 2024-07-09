import Link from 'next/link';
import React, { memo } from 'react'
import { FiFacebook } from "react-icons/fi";
import { RiMessengerLine, RiLinkedinBoxFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";

const ContactUs = memo (() => {
  return (
    <section className="container my-16">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-accent dark:text-accentDark uppercase animate-pulse duration-50">
            Ostanimo u kontaktu
          </h2>
          <p className="mt-4 text-lg text-accent dark:text-darkpurple">
            Posjetite nas i uvjerite se u kvalitetu naših proizvoda
          </p>
        </div>
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4831.210175285545!2d18.997743266709854!3d45.35279852954131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475c8fb963e34a33%3A0x1b603b27797e96a2!2sUl.%20Lokvanjski%20sokak%206%2C%2032000%2C%20Vukovar!5e0!3m2!1shr!2shr!4v1712951137165!5m2!1shr!2shr" width="600" 
            height="450"  
            loading="lazy">
            </iframe>
            </div>
            <div>
              <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-accent dark:text-darkpurple">
                    Naša adresa
                  </h3>
                  <p className="mt-1 text-gray">
                    Maloprodaja: Lokvanjski sokak 6, Vukovar
                  </p>
                  <p className="mt-1 text-gray">
                    Veleprodaja: Županijska 21, Vukovar
                  </p>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-accent dark:text-darkpurple">
                    Radno vrijeme
                  </h3>
                  <p className="mt-1 text-gray">
                    Ponedjeljak - Petak: 07:30h - 19:30h
                  </p>
                  <p className="mt-1 text-gray">
                    Subota: 07:30h - 13:00h
                    </p>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-accent dark:text-darkpurple">
                    Kontakt:
                    </h3>
                  <Link 
                   href={'mailto:prodaja@zivic-elektro.com'} target='blank'
                  className="mt-1 text-gray">
                    Email: prodaja@zivic-elektro.com
                  </Link>
                  <p className="mt-1 text-gray">
                    Telefon: +385 32 442-992
                    </p>
                </div>
                <span className="inline-flex mx-4">
                  <Link 
                  className="text-blue-500" 
                  href={'https://www.facebook.com/?locale=hr_HR'} target='blank'>
                  <FiFacebook className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="text-blue-500 mx-2" 
                  href={'https://business.facebook.com/latest/inbox/messenger?asset_id=137597493551735&business_id=1133499703746344'} target='blank'>
                  <RiMessengerLine className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="mx-2 text-blue-500" 
                  href={'mailto:prodaja@zivic-elektro.com'} target='blank'>
                  <MdOutlineAlternateEmail className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="text-blue-500 mx-2" 
                  href={'https://www.linkedin.com/in/darko-%C5%BEivi%C4%87/'} target='blank'>
                  <RiLinkedinBoxFill className='h-6 w-6' />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default ContactUs;