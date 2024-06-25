import Image from 'next/image';
import React from 'react'


const images = [
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1713901252/kombo_asliwa.png',
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1712945944/status1_sndwez.png',
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1712945903/emporio1_gnm08x.png',
    'https://res.cloudinary.com/dhkmlqg4o/image/upload/v1719336075/razdjelnik_ohlscz.png'
  ];

  const BannerTwo = () => {
    return (
      <div className="flex flex-wrap gap-5 p-20 items-center justify-center">
        {images.map((src, index) => (
          <Image 
            key={index} 
            src={src} 
            width={52}
            height={52}
            alt={`Banner image ${index + 1}`} 
            className="w-52 h-52 object-cover rounded-2xl" 
          />
        ))}
      </div>
    )
  }
  
  export default BannerTwo;