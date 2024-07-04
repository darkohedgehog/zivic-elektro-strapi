import React, { memo } from 'react'
import { RiCustomerService2Line, RiRefund2Fill } from "react-icons/ri";
import { 
     MdOutlineCalendarToday,
     MdOutlineAccessTime,
     MdOutlineHighQuality,
     MdOutlineSentimentVerySatisfied,
     MdOutlinePriceCheck,
     MdOutlineSupportAgent
     } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { GiPayMoney } from "react-icons/gi";
import { PiCertificateBold } from "react-icons/pi";

const CardSection = memo( () => {
  return (
    <div className='py-12 flex flex-col md:flex-row items-center justify-evenly my-6 mx-auto gap-8'>
        <div className="card bg-card-bg-light dark:bg-card-bg-dark">
        <p className="flex items-center justify-start gap-2 text-accent dark:text-accentDark font-bold text-sm uppercase">
        <RiCustomerService2Line className="text-accent w-5 h-5" />
         Pozovite nas
         </p>
        <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
        <MdOutlineCalendarToday className="text-accent w-5 h-5" />
         Ponedjeljak - Petak
        </p>
     <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
     <MdOutlineAccessTime className="text-accent w-5 h-5" />
        08:00 - 16:00
    </p>
    <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
     <FiPhoneCall className="text-accent w-5 h-5" />
        032 442-992
    </p>
    </div>
    <div className="card bg-card-bg-light dark:bg-card-bg-dark">
        <p className="flex items-center justify-start gap-2 text-accent dark:text-accentDark font-bold text-sm uppercase">
        <TbTruckDelivery className="text-accent w-5 h-5" />
         Brza isporuka
         </p>
        <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
        <MdOutlineHighQuality className="text-accent w-5 h-5" />
         Kvalitet proizvoda
        </p>
     <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
        <GiPayMoney className="text-accent w-5 h-5" />
        Sigurna kupnja
    </p>
    <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
        <RiRefund2Fill className="text-accent w-5 h-5" />
        Povrat novca
    </p>
    </div>
    <div className="card bg-card-bg-light dark:bg-card-bg-dark">
     <p className="flex items-center justify-start gap-2 text-accent dark:text-accentDark font-bold text-sm uppercase">
       <PiCertificateBold className="text-accent w-5 h-5" />
         Garancija
         </p>
     <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
        <MdOutlineSentimentVerySatisfied className="text-accent w-5 h-5" />
         Pouzdanost
        </p>
     <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
        <MdOutlinePriceCheck className="text-accent w-5 h-5" />
        Povoljne cijene
    </p>
    <p className='flex items-center justify-start text-center text-accent dark:text-accentDark gap-2 text-sm'>
        <MdOutlineSupportAgent className="text-accent w-5 h-5" />
        Korisnička podrška
    </p>
    </div>
    </div>
  )
})

export default CardSection