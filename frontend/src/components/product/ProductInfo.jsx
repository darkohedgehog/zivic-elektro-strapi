import { CartContext } from '@/app/context/CartContent';
import GlobalApi from '@/app/utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { GiShoppingCart } from "react-icons/gi";

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const onAddToCartClick = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: product.id, // Koristi product.id za postavljanje ID proizvoda
        }
      }
      GlobalApi.addToCart(data).then(resp => {
        if (resp) {
          const newProduct = {
            id: resp.data.id,
            attributes: {
              products: {
                data: [{
                  id: product.id, // Osiguraj da se id proizvoda pravilno postavlja
                  attributes: product.attributes
                }]
              }
            }
          };
          console.log('New product added to cart:', newProduct); // Dodato logovanje za novi proizvod
          setCart(cart => [...cart, newProduct]);
        }
      }, (error) => {
        console.log("Error", error);
      })
    }
  }

  const renderDescription = (descArray) => {
    return descArray.map((item, index) => {
      if (item.type === 'paragraph') {
        return (
          <p key={index}>
            {item.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
    });
  };

  return (
    <div>
      <h2 className='text-[20px] text-darkblue dark:text-darkpurple mb-3'>
        {product?.attributes?.title}
      </h2>
      <h2 className='text-[12px] mb-3'>
        SKU: {product?.attributes?.SKU}
      </h2>
      <h2 className='text-[15px] text-accent dark:text-accentDark mb-2'>
        {product?.attributes?.category}
      </h2>
      <div className='text-[12px] mb-3'>
        {product?.attributes?.description ? renderDescription(product.attributes.description) : 'Nema opisa'}
      </div>
      <div className='text-[20px] text-darkblue dark:text-darkpurple font-medium mb-3'>
        €{product?.attributes?.price}
      </div>
      <button 
        className='flex gap-2 p-4 px-10 mt-5 bg-accent text-light rounded-lg uppercase hover:bg-darkpurple'
        onClick={() => onAddToCartClick()}
      >
        <GiShoppingCart className='w-5 h-5' />
        Košarica
      </button>
    </div>
  )
}

export default ProductInfo;
