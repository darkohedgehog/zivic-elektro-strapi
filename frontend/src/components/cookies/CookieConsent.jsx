"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleConsent = (agree) => {
    localStorage.setItem('cookieConsent', agree ? 'true' : 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray text-accent p-4 flex justify-between items-center border-2">
      <div className="flex items-center space-x-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.65-.41-3.21-1.17-4.58a1 1 0 00-1.51-.27 4.37 4.37 0 01-6.24-1.17 1 1 0 00-.94-.44A4.33 4.33 0 018.5 8.5a1 1 0 00-1.19.95c0 1.25-1.01 2.26-2.26 2.26a1 1 0 00-.95 1.19A4.37 4.37 0 015.5 16.5a1 1 0 00-.27 1.51c1.37.76 2.93 1.17 4.58 1.17 5.52 0 10-4.48 10-10S17.52 2 12 2zM11 14a1 1 0 110 2 1 1 0 010-2zm-2-2a1 1 0 110 2 1 1 0 010-2zm5-1a1 1 0 110 2 1 1 0 010-2zm2-4a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/>
        </svg>
        <p className='flex gap-x-2'>Ova web stranica koristi kolačiće da poboljša vaše korisničko iskustvo. Pročitajte više u našim 
            <Link href={'/terms'} className="underline">
                uvjetima korištenja
            </Link>  i
            <Link href={'/privacy'} className='underline'>
                 pravilima privatnosti.
            </Link>
        </p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => handleConsent(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[9px]">
          Slažem se
        </button>
        <button onClick={() => handleConsent(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-[9px]">
          Ne slažem se
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
