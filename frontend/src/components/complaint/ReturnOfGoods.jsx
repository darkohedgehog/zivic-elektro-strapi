import Link from 'next/link'
import React from 'react'
import { FiPhoneCall, FiMail } from "react-icons/fi";

const ReturnOfGoods = () => {
  return (
    <div className='container p-4 my-16 text-gray'>
     <h2 className='flex items-center justify-center text-accent font-bold uppercase text-2xl my-8'>
        Povrat robe - reklamacije
    </h2>
    <p className='mt-4 text-xl font-semibold'>
    Povrat robe se vrši najduže u roku 8 dana od primitka robe. Nakon našeg primitka robe i evidencije greške vraćamo iznos uplaćen za robu.
    </p>
    <p className='my-6 text-darkpurple text-xl'> 
      Molimo da tokom pisanja prigovora ispunite sljedeće:
    </p>
    <ul className='list-disc list-outside text-accent dark:text-accentDark'>
      <li>Upišite Vaše ime i prezime</li>
      <li>Upišite Vašu e-mail adresu</li>
      <li>Upišite broj i datum narudžbe</li>
      <li>Naziv proizvoda</li>
      <li>Razlog povrata ili reklamacije</li>
      <li>Količinu proizvoda</li>
    </ul>
    <p className='my-6 flex items-center justify-center text-2xl text-center font-semibold'>
      Vaše prigovore i reklamacije možete poslati na:
    </p>
    <div className='flex items-center justify-center'>
    <Link
    href={'mailto:prodaja@zivic-elektro.com'} target='blank'
    className="flex items-center gap-5">
      <FiMail className="text-accent w-8 h-8" />
      <div>
        <p className='text-xl'>prodaja@zivic-elektro.com</p>
      </div>
    </Link>
    </div>
    <p className='my-10 flex items-center justify-center text-2xl text-center font-semibold'>
      Više informacija možete dobiti pozivom na broj telefona:
    </p>
    <div className='flex items-center justify-center'>
    <div className="flex items-center gap-5">
      <FiPhoneCall className="text-accent w-8 h-8" />
      <div>
        <p className='text-xl'>+ 385 32 442 992</p>
      </div>
    </div>
    </div>
    </div>
  )
}

export default ReturnOfGoods