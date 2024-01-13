import React, { useContext } from 'react';
import Link from "next/link";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from '../../contexts/CartContext';
import { urlFor } from '../../utils/image';
import Image from 'next/image'
import { Store } from '../../contexts/StoreContext';


const Product = ({ product }) => {

  const { _id, image, category, name, price, brand, rating } = product;

  console.log(1 + "Img url: " + image);

  // const cartContext = 

  // if (!cartContext) {
  //   // Handle the case where CartContext is undefined, e.g., show an error message or return null.
  //   return null;
  // }

  const { addToCart } = useContext(Store);

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            {/* <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={image.url} alt="" /> */}
            <Image
              src={urlFor(product.image)}
              width={1000}
              height={1000}
              className='max-h-[160px] group-hover:scale-110 transition duration-300'
              alt={name}
            />
          </div>
        </div>
        <div className='absolute top-6 -right-11 group-hover:right-5  p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <button onClick={() => addToCart(product, _id)}>
            <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
              <BsPlus className='text-3xl' />
            </div>
          </button>
          <Link href={`/product/${_id}`} >
            <div className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'>
              <BsEyeFill />
            </div>
          </Link>
        </div>
      </div>
      <div className='text-sm capitalize text-gray-500 mb-1'>
        {category}
      </div>
      <Link href={`/product/${_id}`}>
        <h2 className='font-semibold mb-1'>
          {name}
        </h2>
      </Link>
      <div className='font-semibold'>$ {price}</div>
    </div>
  );
};

export default Product;
