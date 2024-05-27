import Image from 'next/image';
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Image
            src="/logo.png"
            className="h-8 w-auto"
            alt="Logo"
            width={80}
            height={40}
            priority={true}
          />
    </div>
  )
}

export default Logo;