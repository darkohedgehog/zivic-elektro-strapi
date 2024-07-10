import React from 'react'

const CostumerForm = ({orderData, handleChange}) => {
  return (
    <div className='mt-5 block w-full h-full border-y-2 border-accent dark:border-accentDark rounded-lg shadow-2xl shadow-slate-500 dark:shadow-gray'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-3 my-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vaše ime</label>
            <input type="text" name="firstName" value={orderData.firstName} onChange={handleChange}required className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vaše prezime</label>
            <input type="text" name="lastName" value={orderData.lastName} onChange={handleChange} required className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={orderData.email} onChange={handleChange} required
             className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Broj mobitela</label>
            <input type="text" name="phoneNumber" value={orderData.phoneNumber} onChange={handleChange} required className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresa za naplatu</label>
            <input type="text" name="billingAddress" value={orderData.billingAddress} onChange={handleChange} required
            className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresa za dostavu</label>
            <input type="text" name="shippingAddress" value={orderData.shippingAddress} onChange={handleChange} required
            className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ime tvrtke (Ukoliko treba R-1)</label>
            <input type="text" name="companyName" value={orderData.companyName} onChange={handleChange} className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">OIB tvrtke (Ukoliko treba R-1)</label>
            <input type="text" name="taxID" value={orderData.taxID} onChange={handleChange} 
            className="mt-1 block w-full border border-accent dark:border-accentDark rounded-lg shadow-md z-20" />
          </div>
        </div>
      </div>
  )
    
}

export default CostumerForm