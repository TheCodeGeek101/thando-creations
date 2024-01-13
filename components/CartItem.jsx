import React, { useContext } from 'react';
import  Link  from 'next/link';
import {IoMdClose, IoMdRemove, IoMdAdd} from "react-icons/io";
import { Store } from '../contexts/StoreContext';


const CartItem = ({item}) => {
  // destructure the item
  const {_id, name, image, price, amount } = item;
  const {removeFromCart, increaseAmount, decreaseAmount} = useContext(Store);

  return(
    <div className='flex items-center justify-center gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
      <div className='w-full min-h-[150px] flex items-center 
      gap-x-4'>
        <Link href={`/product/${_id}`} >
          {/* image */}
          <img src={image} className='max-w-[80px]' alt="" />
        </Link>
      </div>
     
      <div className='w-full flex flex-col'>
        {/* title & remove icon */}
        <div className='flex justify-between mb-2'>
          <Link className='text-sm uppercase max-w-[240px] text-primary hover:underline' href={`/product/${_id}`}>
            {name}
          </Link>
        {/* remove icon */}
        <div onClick={() => removeFromCart(_id)} className='text-xl cursor-pointer '>
          <IoMdClose className='text-gray-500 hover:text-red-500 transition duration-300'/>
        </div>
        </div>
        <div className='gap-x-2 h-[36px] text-sm'>
          {/* qty */}
          <div className='flex flex-1 max-w-[100px] items-center h-full vorder text-primary font-medium'>
          {/* minus icon */}
            <div onClick={() => decreaseAmount(_id)} className='bg-red-500 h-full flex-1 flex justify-center items-center cursor-pointer'>
            <IoMdRemove />
          </div>
          {/* amount */}
          <div className='h-full flex justify-center items-center px-2'>{amount}</div>
          {/* plus icon */}
            <div onClick={() => increaseAmount(_id)} className='flex-1 h-full flex justify-center items-center cursor-pointer'>
              <IoMdAdd />
            </div>
          </div>

          {/* item price  */}
          <div className='flex-1 flex items-center justify-around'>$ {price}</div>
          {/* final price */}
          {/* round the price to 2 decimals */}
          <div className='flex-1 flex justify-end items-center text-primary font-medium'>{`$ ${parseFloat(price * amount).toFixed(2)}`}</div>
        </div>
      </div>
    </div>
  ) 
};

export default CartItem;
