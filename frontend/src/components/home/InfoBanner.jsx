import React from 'react'
import { RiCustomerService2Line } from "react-icons/ri";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import Link from 'next/link';

const InfoBanner = () => {
  return (
    <div className="absolute h-20 bg-transparent left-1/2 -bottom-10 transform -translate-x-1/2 hidden lg:inline-flex items-center gap-x-12 pt-36 mt-32 text-gray text-sm">
    <div className="flex items-center gap-5 w-60">
      <RiCustomerService2Line className="text-accent w-8 h-8" />
      <div>
        <p>Ponedjeljak - Petak</p>
        <p className="font-semibold">7:30 - 19:30</p>
      </div>
    </div>
    <div className="flex items-center gap-5 w-60">
      <FiPhoneCall className="text-accent w-8 h-8" />
      <div>
      <p className="font-semibold">Pozovite nas</p>
        <p>+ 385 32 442 992</p>
      </div>
    </div>
    <div className="flex items-center gap-5 w-60">
      <TbTruckDelivery className="text-accent w-8 h-8" />
      <div>
        <p>Dostava za sve</p>
        <p className="font-semibold"> iznose 4,00€</p>
      </div>
    </div>
    <Link
    href={'mailto:prodaja@zivic-elektro.com'} target='blank'
    className="flex items-center gap-5 w-60">
      <FiMail className="text-accent w-8 h-8" />
      <div>
      <p className="font-semibold">Email</p>
        <p className='text-[12px]'>prodaja@zivic-elektro.com</p>
      </div>
    </Link>
  </div>
  )
}

export default InfoBanner